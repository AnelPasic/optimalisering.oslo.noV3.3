import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.mjs';
import { database } from './db.mjs';

export const sample = { site: 'optimalisering.oslo.no', form: 'gratis-sjekk', website: 'example.test', email: 'synthetic@example.test', message: '', model: '', source: { page: '/vurdering/?private=remove', referrer: 'https://search.example.test/private' } };
export function setup(extra = {}) {
  const DB = database();
  const env = { DB, SITE_ID: sample.site, INGRESS_ORIGIN: 'https://ingress.example.test', ALLOWED_ORIGINS: 'https://site.example.test', SITE_STAGE: 'production', PRIVACY_APPROVED: 'true', PUBLIC_LEADS_ENABLED: 'true', PUBLIC_ORDERS_ENABLED: 'true', RATE_LIMITER: { async limit() { return { success: true }; } }, ...extra };
  const jobs = [];
  const ctx = { waitUntil(promise) { jobs.push(promise); } };
  const send = (body = sample, key = 'synthetic-key-0001', headers = {}, url = 'https://ingress.example.test/api/leads') => worker.fetch(new Request(url, { method: 'POST', headers: { Origin: 'https://site.example.test', 'CF-Connecting-IP': '192.0.2.1', 'Content-Type': 'application/json', 'Idempotency-Key': key, ...headers }, body: JSON.stringify(body) }), env, ctx);
  return { DB, env, ctx, jobs, send };
}

test('save before ACK: unique receipt, canonical retry, conflict, no PII in acknowledgement', async () => {
  const { DB, send } = setup();
  const response = await send(); assert.equal(response.status, 201);
  const receipt = await response.json(); assert.deepEqual(Object.keys(receipt).sort(), ['id', 'ok', 'receipt_status']);
  assert.equal(receipt.receipt_status, 'stored');
  const row = DB.sqlite.prepare('SELECT * FROM receipts').get();
  assert.equal(row.id, receipt.id); assert.equal(row.notification_status, 'pending');
  assert.equal(row.leadproof_status, 'not_configured');
  assert.equal(JSON.parse(row.payload_json).source.page, '/vurdering/');
  assert.equal(JSON.parse(row.payload_json).source.referrer, 'https://search.example.test');
  const duplicate = await send(); assert.equal(duplicate.status, 200); assert.equal((await duplicate.json()).id, receipt.id);
  assert.equal((await send({ ...sample, email: 'changed@example.test' })).status, 409);
  assert.equal(DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 1);
});

test('concurrent retries store exactly one receipt and one stable ID', async () => {
  const { DB, send } = setup();
  const responses = await Promise.all(Array.from({ length: 12 }, () => send()));
  const bodies = await Promise.all(responses.map(r => r.json()));
  assert.ok(responses.every(r => [200, 201].includes(r.status)));
  assert.equal(new Set(bodies.map(r => r.id)).size, 1);
  assert.equal(DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 1);
});

test('three-field package contract and legacy optional names are supported', async () => {
  const { send, DB } = setup();
  for (const key of ['optimalisering', 'vekst', 'partner']) {
    assert.equal((await send({ ...sample, form: 'pakke-bestilling', package: key, phone: '+47 900 00 000' }, `synthetic-${key}`)).status, 201);
  }
  assert.equal(DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 3);
});

test('disabled/missing prerequisites, storage failure and write uncertainty never ACK', async () => {
  for (const extra of [{ SITE_STAGE: 'preview' }, { PRIVACY_APPROVED: 'false' }, { PUBLIC_LEADS_ENABLED: 'false' }, { RATE_LIMITER: undefined }, { DB: undefined }]) {
    const { send } = setup(extra); assert.equal((await send()).status, 503);
  }
  const { send, DB } = setup({ DB: { prepare() { throw Error('synthetic private storage detail'); } } });
  const response = await send(); assert.equal(response.status, 503); assert.equal((await response.text()).includes('private'), false);
  assert.equal(DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 0);
  const orders = setup({ PUBLIC_ORDERS_ENABLED: 'false' });
  assert.equal((await orders.send({ ...sample, form: 'pakke-bestilling', package: 'vekst', phone: '90000000' })).status, 503);
});

test('site identity is bound by server configuration and ingress, not caller body or Origin alone', async () => {
  const { send, DB } = setup();
  for (const [body, headers, url] of [[{ ...sample, site: 'other.example.test' }, {}], [sample, { Origin: 'https://evil.example.test' }], [sample, { Origin: '' }], [sample, {}, 'https://other-ingress.example.test/api/leads']]) {
    assert.equal((await send(body, 'synthetic-bound-site', headers, url)).status, 403);
  }
  assert.equal(DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 0);
});

test('strict validation, honeypot, body size, content type and distributed rate limiter', async () => {
  const { send, DB } = setup();
  for (const patch of [{ email: 'invalid' }, { email: 12 }, { website: 'javascript:alert(1)' }, { website_confirmation: 'bot' }, { message: 'x'.repeat(2001) }, { source: [] }, { source: { page: 12 } }, { form: 'other' }, { form: 'pakke-bestilling', package: 'unknown', phone: '90000000' }, { form: 'pakke-bestilling', package: 'vekst', phone: '' }]) {
    assert.equal((await send({ ...sample, ...patch })).status, 422, JSON.stringify(patch));
  }
  assert.equal((await send(sample, '')).status, 422);
  assert.equal((await send(sample, 'synthetic-type', { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await send({ ...sample, extra: 'x'.repeat(17000) })).status, 413);
  const limited = setup({ RATE_LIMITER: { async limit() { return { success: false }; } } });
  const response = await limited.send(); assert.equal(response.status, 429); assert.equal(response.headers.get('Retry-After'), '60');
  assert.equal(DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 0);
});

test('shared D1 isolates idempotency per site and never allows caller-selected tenant', async () => {
  const first = setup(), second = setup({ DB: first.DB, SITE_ID: 'second.example.test' });
  const a = await (await first.send()).json();
  const b = await (await second.send({ ...sample, site: 'second.example.test' })).json();
  assert.ok(a.id && b.id); assert.notEqual(a.id, b.id);
  assert.equal((await first.send({ ...sample, site: 'second.example.test' })).status, 403);
  assert.equal(first.DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 2);
});

test('unauthenticated admin/export and unexpected methods never expose records', async () => {
  const { env, ctx, send } = setup(); await send();
  for (const path of ['/admin/receipts', '/admin/export?format=csv', '/admin/retry']) {
    const response = await worker.fetch(new Request('https://ingress.example.test' + path), env, ctx);
    assert.equal(response.status, 403); assert.equal((await response.text()).includes(sample.email), false);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
  }
});

test('uncertain write result returns failure but retry recovers the committed receipt ID', async () => {
  const { env, DB, send } = setup();
  let interrupt = true;
  const original = DB.prepare.bind(DB);
  env.DB = { prepare(sql) {
    const statement = original(sql);
    if (!sql.startsWith('INSERT INTO receipts')) return statement;
    return { bind(...values) {
      const bound = statement.bind(...values);
      return { ...bound, async run() {
        const result = await bound.run();
        if (interrupt) { interrupt = false; throw Error('synthetic lost database acknowledgement'); }
        return result;
      } };
    } };
  } };
  assert.equal((await send()).status, 503);
  const stored = DB.sqlite.prepare('SELECT id FROM receipts').get(); assert.ok(stored.id);
  const response = await send(); assert.equal(response.status, 200);
  assert.equal((await response.json()).id, stored.id);
  assert.equal(DB.sqlite.prepare('SELECT count(*) n FROM receipts').get().n, 1);
});
