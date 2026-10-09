import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { isLeadEndpoint } from '../src/lib/lead.ts';

export function assertProductionReady(env) {
  if (env.SITE_STAGE !== 'production') return;
  const directory = resolve('src/content/pages');
  const drafts = readdirSync(directory).filter(file => file.endsWith('.json')).filter(file => {
    const page = JSON.parse(readFileSync(resolve(directory, file), 'utf8'));
    return !['CONTENT_LOCKED', 'PUBLISHED'].includes(page.status) || page.authority !== 'CONTENT_LOCKED / AUTHORITATIVE';
  });
  const sharedCopy = JSON.parse(readFileSync(resolve('src/config/copy-authority.json'), 'utf8'));
  const missing = [];
  if (drafts.length) missing.push(`${drafts.length} content drafts need owner review`);
  if (sharedCopy.authority !== 'CONTENT_LOCKED / AUTHORITATIVE') missing.push('shared customer-facing copy needs review');
  for (const key of ['PUBLIC_LEADS_ENABLED', 'PRIVACY_APPROVED', 'LAUNCH_APPROVED']) if (env[key] !== 'true') missing.push(key);
  for (const key of ['RESEND_API_KEY', 'RESEND_FROM', 'LEAD_TO_EMAIL']) if (!env[key]) missing.push(key);
  if (!isLeadEndpoint(env.PUBLIC_LEAD_ENDPOINT ?? '')) missing.push('PUBLIC_LEAD_ENDPOINT');
  if (env.PUBLIC_ORDERS_ENABLED === 'true') {
    for (const key of ['ORDERS_ENABLED', 'ORDERS_DEPLOYMENT_APPROVED']) if (env[key] !== 'true') missing.push(key);
  }
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
