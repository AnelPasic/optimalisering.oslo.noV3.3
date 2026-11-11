import { readJson } from './domain.mjs';
import { customerMail, orderFocus, packageName } from './customer-mail.mjs';
import { assessmentDueDate } from './business-days.mjs';

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 23 * 60 * 60 * 1000;
const BACKOFF = [60000, 300000, 900000, 3600000, 14400000];

function ready(env) {
  return env.DB && env.SITE_ID && env.SITE_STAGE === 'production' && env.PRIVACY_APPROVED === 'true' &&
    env.SEND_NOTIFICATIONS === 'true' && env.RESEND_API_KEY && env.RESEND_FROM && env.LEAD_TO_EMAIL;
}

export function customerConfirmationEnabled(env) {
  return Boolean(ready(env) && env.SEND_CUSTOMER_CONFIRMATIONS === 'true' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.RESEND_REPLY_TO ?? ''));
}

function notification(lead, env) {
  const p = JSON.parse(lead.payload_json), order = p.form === 'pakke-bestilling';
  return JSON.stringify({ from: env.RESEND_FROM, to: [env.LEAD_TO_EMAIL], reply_to: p.email,
    subject: order ? 'Bestilling – Optimalisering Oslo' : 'Gratis sjekk – Optimalisering Oslo',
    text: [order ? 'Ny bestilling' : 'Ny forespørsel om gratis sjekk',
      ...(order ? [`Pakke: ${packageName(p.package)}`, `Fokus: ${orderFocus(p)}`,
        ...(p.company ? [`Bedrift: ${p.company}`] : []), ...(p.contact ? [`Kontaktperson: ${p.contact}`] : [])] : []),
      ...(p.phone ? [`Telefon: ${p.phone}`] : []),
      ...(!order ? [`Leveringsfrist: ${assessmentDueDate(lead.created_at_ms)} kl. 16.00 (Europe/Oslo)`] : []),
      `Nettside: ${p.website}`, `E-post: ${p.email}`, `Behov: ${p.model || 'Ikke oppgitt'}`,
      `Melding: ${p.message || 'Ikke oppgitt'}`, `Mottatt: ${new Date(lead.created_at_ms).toISOString()}`,
      `Nettsted: ${p.site}`, `Referanse: ${lead.id}`, `Kilde: ${JSON.stringify(p.source)}`].join('\n\n'),
  });
}

const INTERNAL = 'receipts';
const CUSTOMER = 'customer_confirmations';

export async function notifyOne(env, id, options) {
  if (ready(env)) await notifyJob(env, id, INTERNAL, options);
}

export async function notifyReceipt(env, id, options) {
  const jobs = [notifyOne(env, id, options)];
  if (customerConfirmationEnabled(env)) jobs.push(notifyJob(env, id, CUSTOMER, options));
  const results = await Promise.allSettled(jobs);
  if (results.some(result => result.status === 'rejected')) throw Error('notification-sweep-required');
}

async function notifyJob(env, id, table, { now = Date.now(), transport = fetch, timeoutMs = 8000, clock = () => performance.now() } = {}) {
  const internal = table === INTERNAL;
  const started = clock();
  const currentTime = () => now + Math.floor(clock() - started);
  const token = crypto.randomUUID();
  const claimed = await env.DB.prepare(`UPDATE ${table} SET notification_status='sending',lease_token=?,
    lease_until_ms=?,notification_attempts=notification_attempts+1,first_attempt_at_ms=COALESCE(first_attempt_at_ms,?)
    WHERE site_id=? AND id=? AND notification_attempts<? AND
    EXISTS (SELECT 1 FROM receipts r WHERE r.id=${table}.id AND r.site_id=${table}.site_id AND r.lifecycle<>'erasure_pending') AND
    (notification_status='pending' OR (notification_status='retry' AND due_at_ms<=?) OR
    (notification_status='sending' AND lease_until_ms<=?))`)
    .bind(token, now + 60000, now, env.SITE_ID, id, MAX_ATTEMPTS, now, now).run();
  if (claimed.meta.changes !== 1) return;
  const select = internal ? 'SELECT * FROM receipts WHERE site_id=? AND id=? AND lease_token=?' :
    'SELECT c.*,r.payload_json,r.created_at_ms FROM customer_confirmations c JOIN receipts r ON r.id=c.id AND r.site_id=c.site_id WHERE c.site_id=? AND c.id=? AND c.lease_token=?';
  const lead = await env.DB.prepare(select).bind(env.SITE_ID, id, token).first();
  if (!lead) return;
  const finish = (status, error, resendId = null, due = now) => env.DB.prepare(`UPDATE ${table} SET
    notification_status=?,last_error=?,resend_message_id=?,due_at_ms=?,lease_until_ms=0,lease_token=NULL
    WHERE site_id=? AND id=? AND notification_status='sending' AND lease_token=?`)
    .bind(status, error, resendId, due, env.SITE_ID, id, token).run();
  if (now - lead.first_attempt_at_ms >= WINDOW_MS) {
    await finish('manual_review', 'idempotency-window-expired'); return;
  }
  // Freeze exact request bytes before the first network call. Retries retain sender/recipient/template.
  const body = lead.notification_json ?? (internal
    ? notification(lead, env) : JSON.stringify(customerMail(JSON.parse(lead.payload_json), env)));
  const freezeAt = currentTime();
  const leaseUntil = freezeAt + 60000;
  const frozen = await env.DB.prepare(`UPDATE ${table} SET notification_json=?,lease_until_ms=?
    WHERE site_id=? AND id=? AND lease_token=? AND lease_until_ms>? AND notification_status='sending'
    AND EXISTS (SELECT 1 FROM receipts r WHERE r.id=${table}.id AND r.site_id=${table}.site_id AND r.lifecycle<>'erasure_pending')`)
    .bind(body, leaseUntil, env.SITE_ID, id, token, freezeAt).run();
  if (frozen.meta.changes !== 1 || currentTime() + timeoutMs >= leaseUntil) return;
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeoutMs);
  let status = 'retry', code = 'resend-uncertain', resendId = null;
  let delay = BACKOFF[Math.min(lead.notification_attempts - 1, BACKOFF.length - 1)];
  try {
    const response = await transport('https://api.resend.com/emails', {
      method: 'POST', redirect: 'manual', signal: controller.signal,
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': internal ? `receipt/${id}` : `receipt/${id}/customer` }, body,
    });
    if (response.status === 200 || response.status === 201) {
      const result = await readJson(response, 16384, timeoutMs);
      if (typeof result.id === 'string' && /^[a-zA-Z0-9_-]{1,200}$/.test(result.id)) {
        status = 'accepted'; code = null; resendId = result.id;
      }
    } else if (response.status === 429 || response.status >= 500 || response.status === 408 || response.status === 409) {
      code = `resend-${response.status}`;
      const seconds = Number(response.headers.get('Retry-After'));
      if (Number.isFinite(seconds) && seconds > 0) delay = Math.max(delay, Math.min(seconds * 1000, WINDOW_MS));
    } else if (response.status >= 400 && response.status < 500) {
      status = 'dead_letter'; code = `resend-${response.status}`;
    } else { status = 'manual_review'; code = 'resend-unexpected-status'; }
    if (response.body && !response.body.locked) await response.body.cancel();
  } catch { /* Acceptance is uncertain; retry only with the same provider key and request bytes. */ }
  finally { clearTimeout(timer); }
  if (status === 'retry' && lead.notification_attempts >= MAX_ATTEMPTS) status = 'manual_review';
  await finish(status, code, resendId, now + delay);
}

export async function retryDue(env, options = {}) {
  if (!ready(env)) return;
  const now = options.now ?? Date.now();
  const tables = customerConfirmationEnabled(env) ? [INTERNAL, CUSTOMER] : [INTERNAL];
  const results = await Promise.allSettled(tables.map(async table => {
    await env.DB.prepare(`UPDATE ${table} SET notification_status='manual_review',last_error='final-attempt-interrupted',
      lease_until_ms=0,lease_token=NULL WHERE site_id=? AND notification_status='sending' AND
      notification_attempts>=? AND lease_until_ms<=?`).bind(env.SITE_ID, MAX_ATTEMPTS, now).run();
    // Independent bounded sweeps prevent either queue from starving the other.
    const due = await env.DB.prepare(`SELECT id FROM ${table} WHERE site_id=? AND notification_attempts<? AND
      EXISTS (SELECT 1 FROM receipts r WHERE r.id=${table}.id AND r.site_id=${table}.site_id AND r.lifecycle<>'erasure_pending') AND
      (notification_status='pending' OR (notification_status='retry' AND due_at_ms<=?) OR
      (notification_status='sending' AND lease_until_ms<=?)) ORDER BY due_at_ms LIMIT 3`)
      .bind(env.SITE_ID, MAX_ATTEMPTS, now, now).all();
    for (const row of due.results) await notifyJob(env, row.id, table, { ...options, now });
  }));
  if (results.some(result => result.status === 'rejected')) throw Error('notification-sweep-failed');
}
