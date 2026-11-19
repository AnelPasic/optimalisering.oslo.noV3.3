import { legacyDashboard } from '../vendor/medon-dashboard.mjs';

const email = { type: 'email', required: true };
const forms = {
  'gratis-sjekk': { label: 'Gratis sjekk', fields: { email } },
  'pakke-bestilling': { label: 'Pakkebestilling', fields: { email }, order: true },
};
const sites = [
  { site: 'optimalisering.oslo.no', origin: 'https://optimalisering.oslo.no', label: 'Optimalisering Oslo', forms },
  { site: 'openaiads-no', origin: 'https://openaiads.no', label: 'OpenAIAds.no', forms },
  { site: 'chatgptads-no', origin: 'https://chatgptads.no', label: 'ChatGPTAds.no', forms },
];

export function dashboard(request, env) {
  return legacyDashboard(request, {
    ...env, SITE_LABEL: 'Medon', SITE_ORIGIN: 'https://optimalisering.oslo.no',
    TIMEZONE: 'Europe/Oslo', INSTALLATION_MODE: 'medon-shared', SITE_MAP_JSON: JSON.stringify(sites),
    FORMS_JSON: JSON.stringify(forms), PACKAGES_JSON: '[]', HITCOUNT_ENABLED: 'false',
    RETENTION_MODE: 'manual', LEAD_HISTORY_STARTED_AT: '2026-10-24T20:25:28.230Z',
    DASHBOARD_API_BASE: '/admin/dashboard', DASHBOARD_CONNECTIONS_JSON: '["optimalisering.oslo.no"]',
  });
}
