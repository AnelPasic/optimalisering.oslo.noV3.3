import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

export function assertProductionReady(env) {
  if (env.SITE_STAGE !== 'production') return;
  const directory = resolve('src/content/pages');
  const drafts = readdirSync(directory).filter(file => file.endsWith('.json')).filter(file => !['CONTENT_LOCKED', 'PUBLISHED'].includes(JSON.parse(readFileSync(resolve(directory, file), 'utf8')).status));
  const missing = [];
  if (drafts.length) missing.push(`${drafts.length} content drafts need owner review`);
  for (const key of ['PUBLIC_LEADS_ENABLED', 'PRIVACY_APPROVED', 'LAUNCH_APPROVED']) if (env[key] !== 'true') missing.push(key);
  for (const key of ['RESEND_API_KEY', 'RESEND_FROM', 'LEAD_TO_EMAIL']) if (!env[key]) missing.push(key);
  if (missing.length) throw new Error(`Production blocked: ${missing.join('; ')}. Local review preview remains available.`);
}

export function readinessPlugin() {
  return {
    name: 'medon-production-readiness',
    enforce: 'pre',
    configResolved(config) {
      // Same Vite mode/envDir resolution Astro uses, including .env.local and mode files.
      assertProductionReady(loadEnv(config.mode, config.envDir, ''));
    },
  };
}
