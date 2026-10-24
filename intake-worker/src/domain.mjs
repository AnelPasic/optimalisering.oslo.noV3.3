import { createLeadPayload } from '../../app/src/lib/lead.ts';
import { createOrderPayload } from '../../app/src/lib/order.ts';

export class HttpError extends Error {
  constructor(status, code) { super(code); this.status = status; }
}
export function json(value, status = 200, headers = {}) {
  return new Response(JSON.stringify(value), { status, headers: {
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', ...headers,
  } });
}
export function configuration(env) {
  const validOrigin = value => {
    const url = new URL(value);
    if (url.origin !== value || url.protocol !== 'https:') throw Error('configuration');
    return value;
  };
  if (!/^[a-z0-9][a-z0-9.-]{2,199}$/.test(env.SITE_ID ?? '')) throw Error('configuration');
  return { site: env.SITE_ID, ingress: validOrigin(env.INGRESS_ORIGIN),
    origins: new Set((env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean).map(validOrigin)) };
}

// Bound both streamed bytes and wall time, even if Content-Length is absent or false.
export async function readJson(message, maxBytes = 16384, timeoutMs = 5000) {
  if (Number(message.headers.get('content-length') ?? 0) > maxBytes) throw new HttpError(413, 'body-too-large');
  const reader = message.body?.getReader();
  if (!reader) throw new HttpError(400, 'invalid-json');
  let timer;
  const timeout = new Promise((_, reject) => { timer = setTimeout(() => reject(new HttpError(408, 'body-timeout')), timeoutMs); });
  const chunks = []; let size = 0;
  try {
    for (;;) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw new HttpError(413, 'body-too-large');
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let position = 0;
    for (const chunk of chunks) { bytes.set(chunk, position); position += chunk.byteLength; }
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
    catch { throw new HttpError(400, 'invalid-json'); }
  } finally {
    clearTimeout(timer);
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export function validate(input, site) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new HttpError(422, 'validation');
  if (input.site !== site) throw new HttpError(403, 'site-binding');
  if (!['gratis-sjekk', 'pakke-bestilling'].includes(input.form)) throw new HttpError(422, 'validation');
  for (const field of ['website', 'email', 'model', 'message', 'phone', 'company', 'contact', 'package', 'website_confirmation']) {
    if (input[field] !== undefined && typeof input[field] !== 'string') throw new HttpError(422, 'validation');
  }
  if (input.website_confirmation) throw new HttpError(422, 'validation');
  const source = input.source ?? {};
  if (typeof source !== 'object' || Array.isArray(source) || Object.values(source).some(v => typeof v !== 'string')) throw new HttpError(422, 'validation');
  try {
    const payload = (input.form === 'pakke-bestilling' ? createOrderPayload : createLeadPayload)(input, source);
    return { ...payload, site };
  } catch { throw new HttpError(422, 'validation'); }
}
