// Shared customer-facing wording is DRAFT / NON-AUTHORITATIVE.
// Scope and review record: ./copy-authority.json and /coordination/DECISIONS.md.
import { isLeadEndpoint } from '../lib/lead';
export const site = {
  name: 'Optimalisering Oslo',
  provider: 'Medon AS',
  providerUrl: 'https://medon.no',
  url: 'https://optimalisering.oslo.no',
  preview: import.meta.env.SITE_STAGE !== 'production',
  leadsEnabled: import.meta.env.PUBLIC_LEADS_ENABLED === 'true',
  ordersEnabled: import.meta.env.PUBLIC_ORDERS_ENABLED === 'true' && isLeadEndpoint(import.meta.env.PUBLIC_LEAD_ENDPOINT ?? ''),
  leadEndpoint: import.meta.env.PUBLIC_LEAD_ENDPOINT || '/api/leads',
};

export const navigation = [
  { label: 'Synlighet', href: '/synlighet/' },
  { label: 'Konvertering', href: '/konvertering/' },
  { label: 'Priser', href: '/priser/' },
  { label: 'Innsikt', href: '/innsikt/' },
];
