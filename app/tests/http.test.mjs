import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';
import { openLeadStore } from '../server/store.mjs';

const origin = 'http://127.0.0.1:4321';
const body = { site: 'optimalisering.oslo.no', form: 'gratis-sjekk', website: 'example.test', email: 'synthetic@example.test', message: 'Synthetic only', model: '', source: { page: '/vurdering/', utm_source: 'qa', referrer: 'https://example.test/search?pii=x' } };
async function withServer(enabled, callback) {
  const store = openLeadStore(':memory:');
  const config = { enabled, origins: new Set([origin]), site: body.site, sourceCapture: true, email: { apiKey: '', from: '', to: '' } };
  const server = createAppServer({ store, config });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try { await callback(`http://127.0.0.1:${server.address().port}`, store); }
  finally { await new Promise(resolve => server.close(resolve)); store.close(); }
}
const options = (value = body, key = 'synthetic-request-1') => ({ method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(value) });

test('HTTP accepted enquiry is stored once with source, conversion and pending email', () => withServer(true, async (base, store) => {
  const first = await fetch(`${base}/api/leads`, options());
  assert.equal(first.status, 201);
  const acknowledgement = await first.json();
  assert.equal(acknowledgement.ok, true);
  const duplicate = await fetch(`${base}/api/leads`, options());
  assert.equal((await duplicate.json()).id, acknowledgement.id);
  assert.deepEqual(store.counts(), { leads: 1, conversions: 1 });
  assert.equal(store.get(acknowledgement.id).payload.source.referrer, 'https://example.test');
  assert.equal(store.get(acknowledgement.id).notification_status, 'pending');
}));

test('unconfigured server and invalid/origin-mismatched submissions save no data', () => withServer(false, async (base, store) => {
  assert.equal((await fetch(`${base}/api/leads`, options())).status, 503);
  const badOrigin = options(); badOrigin.headers.Origin = 'https://attacker.example';
  assert.equal((await fetch(`${base}/api/leads`, badOrigin)).status, 403);
  assert.equal(store.counts().leads, 0);
}));

test('validation, oversized body, conflict and honeypot fail before creating a new lead', () => withServer(true, async (base, store) => {
  assert.equal((await fetch(`${base}/api/leads`, options({ ...body, email: 'invalid' }))).status, 422);
  assert.equal((await fetch(`${base}/api/leads`, options({ ...body, website_confirmation: 'bot' }))).status, 422);
  assert.equal((await fetch(`${base}/api/leads`, options({ ...body, message: 'x'.repeat(20000) }))).status, 413);
  assert.equal(store.counts().leads, 0);
  assert.equal((await fetch(`${base}/api/leads`, options())).status, 201);
  assert.equal((await fetch(`${base}/api/leads`, options({ ...body, message: 'changed' }))).status, 409);
  assert.equal(store.counts().conversions, 1);
}));
