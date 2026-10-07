import { resolve } from 'node:path';
import { getConfig } from './config.mjs';
import { openLeadStore } from './store.mjs';
import { notifyLead } from './resend.mjs';

const config = getConfig();
if (!config.enabled) throw new Error('Configure Resend and approve privacy before notification retries.');
const store = openLeadStore(resolve(config.dataDir, 'leads.sqlite'));
try {
  for (const id of store.pending()) await notifyLead(store, id, config.email);
  console.log(`Notifications still pending: ${store.pending().length}. No enquiry data printed.`);
} finally { store.close(); }
