import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { getConfig } from '../server/config.mjs';
import { createAppServer } from '../server/http.mjs';
import { openLeadStore } from '../server/store.mjs';

const body = { site: 'optimalisering.oslo.no', form: 'pakke-bestilling', package: 'vekst', company: 'Synthetic AS', contact: 'Synthetic Buyer', website: 'example.test', email: 'synthetic@example.test', phone: '', message: '', source: { page: '/priser/?email=remove', landing_page: '/synlighet/?email=remove', referrer: 'https://search.example.test/private?q=remove', utm_source: 'synthetic', utm_medium: 'test', utm_campaign: 'h017a', utm_content: 'order' } };
async function withServer(overrides, run) {
  const store = openLeadStore(':memory:');
  const notifications = [];
  const config = { enabled: true, ordersEnabled: true, sourceCapture: true, site: body.site, origins: new Set(), email: { apiKey: 'synthetic-not-a-key', from: 'sender@example.test', to: 'recipient@example.test', transport: async (_url, options) => { notifications.push(JSON.parse(options.body)); return new Response('{"id":"synthetic-notification"}'); } }, ...overrides };
  const server = createAppServer({ store, config });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`; config.origins.add(base);
  const send = (input, key) => fetch(base + '/api/leads', { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(input) });
  try { await run({ base, store, notifications, send }); }
  finally { server.closeAllConnections(); await new Promise(done => server.close(done)); store.close(); }
}

test('backend intake prerequisites cannot be bypassed by the public order flag', () => {
  const env = { PUBLIC_ORDERS_ENABLED: 'true', ORDERS_ENABLED: 'true', PUBLIC_LEADS_ENABLED: 'true', PRIVACY_APPROVED: 'true', RESEND_API_KEY: 'synthetic', RESEND_FROM: 'sender@example.test', LEAD_TO_EMAIL: 'recipient@example.test' };
  assert.equal(getConfig(env).enabled, true);
  for (const key of ['PUBLIC_LEADS_ENABLED', 'PRIVACY_APPROVED', 'RESEND_API_KEY', 'RESEND_FROM', 'LEAD_TO_EMAIL']) assert.equal(getConfig({ ...env, [key]: '' }).enabled, false, key);
  assert.equal(getConfig({ PUBLIC_LEADS_ENABLED: 'true' }).ordersEnabled, false);
});

test('all package keys persist explicit order intent and normalized attribution exactly once', () => withServer({}, async ({ store, send, notifications }) => {
  for (const packageKey of ['optimalisering', 'vekst', 'partner']) {
    const payload = { ...body, package: packageKey };
    const first = await send(payload, `synthetic-${packageKey}`); assert.equal(first.status, 201);
    const { id } = await first.json();
    const persisted = store.get(id);
    assert.equal(persisted.payload.intent, 'order');
    assert.equal(persisted.payload.package, packageKey);
    assert.deepEqual(persisted.payload.source, { page: '/priser/', landing_page: '/synlighet/', referrer: 'https://search.example.test', utm_source: 'synthetic', utm_medium: 'test', utm_campaign: 'h017a', utm_content: 'order' });
    assert.equal((await (await send(payload, `synthetic-${packageKey}`)).json()).id, id);
  }
  assert.deepEqual(store.counts(), { leads: 3, conversions: 3 });
  assert.equal(notifications.length, 3);
  assert.ok(notifications.every(mail => mail.subject.startsWith('Bestilling') && mail.text.includes('Pakke:')));
}));

test('unknown package, filled honeypot and invalid required or excessive fields create no record', () => withServer({}, async ({ store, send, notifications }) => {
  const invalid = [{ package: 'unknown' }, { website_confirmation: 'bot' }, { company: '' }, { contact: '' }, { email: 'invalid' }, { website: 'javascript:alert(1)' }, { phone: 'x'.repeat(41) }, { message: 'x'.repeat(2001) }];
  for (const [index, changes] of invalid.entries()) assert.equal((await send({ ...body, ...changes }, `synthetic-invalid-${index}`)).status, 422);
  assert.deepEqual(store.counts(), { leads: 0, conversions: 0 }); assert.equal(notifications.length, 0);
}));

test('order gate mismatch and disabled shared intake both fail without storing or notifying', async () => {
  for (const overrides of [{ ordersEnabled: false }, { enabled: false }]) await withServer(overrides, async ({ store, send, notifications }) => {
    assert.equal((await send(body, 'synthetic-disabled')).status, 503);
    assert.deepEqual(store.counts(), { leads: 0, conversions: 0 }); assert.equal(notifications.length, 0);
  });
});

test('storage failure never acknowledges acceptance or attempts email', () => withServer({}, async ({ store, send, notifications }) => {
  store.save = () => { throw new Error('synthetic-storage-failure'); };
  const response = await send(body, 'synthetic-storage'); assert.equal(response.status, 500);
  assert.equal((await response.json()).ok, false);
  assert.equal(notifications.length, 0); assert.deepEqual(store.counts(), { leads: 0, conversions: 0 });
}));

test('order conflict and rate limiting remain authoritative', () => withServer({}, async ({ store, send }) => {
  assert.equal((await send(body, 'synthetic-conflict')).status, 201);
  assert.equal((await send({ ...body, company: 'Changed AS' }, 'synthetic-conflict')).status, 409);
  for (let i = 0; i < 8; i++) await send(body, 'synthetic-conflict');
  assert.equal((await send(body, 'synthetic-rate-limit')).status, 429);
  assert.deepEqual(store.counts(), { leads: 1, conversions: 1 });
}));

test('enabled API still requires an allowed Origin and JSON content type', () => withServer({}, async ({ base, store, notifications }) => {
  for (const origin of ['', 'https://attacker.example.test']) {
    const response = await fetch(base + '/api/leads', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    assert.equal(response.status, 403);
  }
  assert.equal((await fetch(base + '/api/leads', { method: 'POST', headers: { Origin: base, 'Content-Type': 'text/plain' }, body: JSON.stringify(body) })).status, 415);
  assert.deepEqual(store.counts(), { leads: 0, conversions: 0 }); assert.equal(notifications.length, 0);
}));
