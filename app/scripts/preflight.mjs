import { loadEnv } from 'vite';
import { isLeadEndpoint } from '../src/lib/lead.ts';

// All pages are live content. Site copy has no draft/status or approval metadata.
// Production safety checks concern real intake, privacy and deployment only.
export function assertProductionReady(env) {
  if (env.SITE_STAGE !== 'production') return;
  const missing = [];
  for (const key of ['PUBLIC_LEADS_ENABLED', 'PRIVACY_APPROVED', 'LAUNCH_APPROVED'])
    if (env[key] !== 'true') missing.push(key);
  for (const key of ['RESEND_API_KEY', 'RESEND_FROM', 'LEAD_TO_EMAIL'])
    if (!env[key]) missing.push(key);
  if (!isLeadEndpoint(env.PUBLIC_LEAD_ENDPOINT ?? '')) missing.push('PUBLIC_LEAD_ENDPOINT');
  if (env.PUBLIC_ORDERS_ENABLED === 'true') {
    for (const key of ['ORDERS_ENABLED', 'ORDERS_DEPLOYMENT_APPROVED'])
      if (env[key] !== 'true') missing.push(key);
  }
  if (missing.length) throw new Error(`Production blocked: ${missing.join('; ')}. Check operational configuration.`);
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
