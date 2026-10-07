export type LeadPayload = {
  site: string;
  form: string;
  website: string;
  email: string;
  message: string;
  model: string;
  source: Record<string, string>;
};

export function normalizeWebsite(value: string): string | null {
  try {
    const input = value.trim();
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.') || /\s/.test(input)) return null;
    url.search = '';
    url.hash = '';
    return url.href;
  } catch { return null; }
}

export function createLeadPayload(fields: Record<string, string>, rawSource: Record<string, string>): LeadPayload {
  const website = normalizeWebsite(fields.website ?? '');
  const email = (fields.email ?? '').trim();
  const message = (fields.message ?? '').trim();
  const model = fields.model ?? '';
  if (!website || website.length > 2048) throw new Error('Skriv inn en gyldig nettadresse.');
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Skriv inn en gyldig e-postadresse.');
  if (message.length > 2000) throw new Error('Beskriv behovet med maksimalt 2 000 tegn.');
  if (!['', 'henvendelser', 'nettbutikk', 'annet'].includes(model)) throw new Error('Velg et gyldig alternativ.');
  const source: Record<string, string> = {};
  const page = rawSource.page ?? '/vurdering/';
  source.page = page.startsWith('/') && !page.startsWith('//') ? page.split(/[?#]/)[0].slice(0, 300) : '/vurdering/';
  const landing = rawSource.landing_page;
  if (landing?.startsWith('/') && !landing.startsWith('//')) source.landing_page = landing.split(/[?#]/)[0].slice(0, 300);
  try {
    const referrer = new URL(rawSource.referrer ?? '');
    if (['http:', 'https:'].includes(referrer.protocol)) source.referrer = referrer.origin;
  } catch { /* Referrer is optional. */ }
  for (const field of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = (rawSource[field] ?? '').trim();
    if (value && value.length <= 120 && /^[\p{L}\p{N} _./+-]+$/u.test(value)) source[field] = value;
  }
  return { site: 'optimalisering.oslo.no', form: 'gratis-sjekk', website, email, message, model, source };
}

type SubmitOptions = { transport?: typeof fetch; timeoutMs?: number; idempotencyKey?: string };

export async function submitLead(endpoint: string, payload: LeadPayload, options: SubmitOptions = {}): Promise<void> {
  if (!/^\/(?!\/)[\w/-]+$/.test(endpoint) && !/^https:\/\/[^\s]+$/.test(endpoint)) throw new Error('Innsending er ikke åpnet ennå.');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 12000);
  try {
    const response = await (options.transport ?? fetch)(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(options.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : {}) },
      body: JSON.stringify(payload),
      credentials: 'omit',
      signal: controller.signal,
    });
    const result = await response.json() as { ok?: boolean; id?: string };
    if (!response.ok || result.ok !== true || typeof result.id !== 'string' || !result.id) throw new Error('not-accepted');
  } catch {
    throw new Error('Vi kunne ikke bekrefte innsendingen. Opplysningene står fortsatt i skjemaet. Prøv igjen.');
  } finally { clearTimeout(timer); }
}
