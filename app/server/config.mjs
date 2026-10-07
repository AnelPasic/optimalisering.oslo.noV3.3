import { resolve } from 'node:path';

export function getConfig(env = process.env) {
  const email = { apiKey: env.RESEND_API_KEY ?? '', from: env.RESEND_FROM ?? '', to: env.LEAD_TO_EMAIL ?? '' };
  return {
    email,
    enabled: env.PRIVACY_APPROVED === 'true' && env.PUBLIC_LEADS_ENABLED === 'true' && Boolean(email.apiKey && email.from && email.to),
    site: env.LEAD_SITE || 'optimalisering.oslo.no',
    sourceCapture: env.SOURCE_CAPTURE_ENABLED !== 'false',
    origins: new Set((env.ALLOWED_ORIGINS || 'http://127.0.0.1:4321,http://localhost:4321').split(',').map(s => s.trim()).filter(Boolean)),
    dataDir: resolve(env.LEAD_DATA_DIR || './var'),
  };
}
