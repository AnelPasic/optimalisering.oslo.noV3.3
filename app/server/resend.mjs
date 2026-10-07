const active = new Map();

export async function notifyLead(store, id, config) {
  if (active.has(id)) return active.get(id);
  const pending = send();
  active.set(id, pending);
  try { await pending; } finally { active.delete(id); }

  async function send() {
    const lead = store.get(id);
    if (!lead || lead.notification_status === 'sent') return;
    if (!config.apiKey || !config.from || !config.to) { store.failed(id, 'not-configured'); return; }
    // Resend idempotency keys expire after 24 hours. Older uncertain sends need manual review.
    if (lead.first_attempt_at && Date.now() - Date.parse(lead.first_attempt_at) > 23 * 60 * 60 * 1000) { store.failed(id, 'manual-review-required'); return; }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      store.attempt(id);
      const p = lead.payload;
      const text = [
        'Ny forespørsel om gratis sjekk', `Nettside: ${p.website}`, `E-post: ${p.email}`,
        `Behov: ${p.model || 'Ikke oppgitt'}`, `Melding: ${p.message || 'Ikke oppgitt'}`,
        `Mottatt: ${lead.created_at}`, `Referanse: ${id}`,
        `Kilde: ${JSON.stringify(p.source)}`,
      ].join('\n\n');
      const response = await (config.transport ?? fetch)('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `lead/${id}` },
        body: JSON.stringify({ from: config.from, to: [config.to], reply_to: p.email, subject: 'Gratis sjekk – Optimalisering Oslo', text }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || typeof result.id !== 'string' || !result.id) { store.failed(id, `resend-${response.status}`); return; }
      store.sent(id, result.id);
    } catch { store.failed(id, 'resend-network-or-response'); }
    finally { clearTimeout(timer); }
  }
}
