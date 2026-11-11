// All authored pages and shared customer-facing copy are treated as live content.
// Privacy, intake, deployment and search indexing are separate operational controls.
import { isLeadEndpoint } from '../lib/lead';

// Search indexing and contact-form availability are independent decisions.
// This site is hosted as static assets on Cloudflare: a relative /api/leads path
// is NOT an intake Worker and must never activate the customer-facing forms.
const endpoint = import.meta.env.PUBLIC_LEAD_ENDPOINT ?? '';
const hasIntake = endpoint.startsWith('https://') && isLeadEndpoint(endpoint) &&
  new URL(endpoint).pathname === '/api/leads';
const buildBranch = import.meta.env.WORKERS_CI_BRANCH;
// Cloudflare builds previews for non-main branches using the same site repository.
const branchPreview = Boolean(buildBranch && buildBranch !== 'main');
const leadsEnabled = !branchPreview && import.meta.env.PUBLIC_LEADS_ENABLED === 'true' && hasIntake;
export const site = {
  name: 'Optimalisering Oslo',
  provider: 'Medon AS',
  providerUrl: 'https://medon.no',
  url: 'https://optimalisering.oslo.no',
  branchPreview,
  preview: import.meta.env.SITE_STAGE !== 'production',
  leadsEnabled,
  ordersEnabled: leadsEnabled && import.meta.env.PUBLIC_ORDERS_ENABLED === 'true',
  leadEndpoint: endpoint || '/api/leads',
};

export const navigation = [
  { label: 'Synlighet', href: '/synlighet/' },
  { label: 'Konvertering', href: '/konvertering/' },
  { label: 'Priser', href: '/priser/' },
  { label: 'Innsikt', href: '/innsikt/' },
];
