import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { getConfig } from './config.mjs';
import { openLeadStore } from './store.mjs';
import { createAppServer } from './http.mjs';

const config = getConfig();
mkdirSync(config.dataDir, { recursive: true, mode: 0o700 });
const store = openLeadStore(resolve(config.dataDir, 'leads.sqlite'));
const apiOnly = process.argv.includes('--api-only');
const port = Number(apiOnly ? process.env.API_PORT || 4322 : process.env.PORT || 4321);
const server = createAppServer({ store, config, staticRoot: apiOnly ? undefined : resolve('dist') });
server.listen(port, '127.0.0.1', () => {
  console.log(`Local ${apiOnly ? 'lead API' : 'website'}: http://127.0.0.1:${port}`);
  console.log(`Lead intake: ${config.enabled ? 'configured' : 'disabled pending Resend and privacy configuration'}`);
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => { store.close(); process.exit(0); }));
}
