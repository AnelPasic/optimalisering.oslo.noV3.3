import test from 'node:test';
import assert from 'node:assert/strict';
import { authorize } from '../src/access.mjs';
import { csv, readReceipts, saveReceipt } from '../src/store.mjs';
import { readJson } from '../src/domain.mjs';
import worker from '../src/worker.mjs';
import { database } from './db.mjs';

const now = Date.now(), seconds = Math.floor(now / 1000);
const keys = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
const jwk = { ...await crypto.subtle.exportKey('jwk', keys.publicKey), kid: 'synthetic-signing-key', alg: 'RS256', use: 'sig' };
const env = { SITE_ID: 'optimalisering.oslo.no', INGRESS_ORIGIN: 'https://ingress.example.test', ALLOWED_ORIGINS: 'https://site.example.test', ACCESS_ISSUER: 'https://synthetic.cloudflareaccess.com', ACCESS_AUD: 'synthetic-application-aud', ADMIN_GRANTS_JSON: JSON.stringify({ 'operator@example.test': [{ site: 'optimalisering.oslo.no', permissions: ['read'] }] }) };
const claims = { iss: env.ACCESS_ISSUER, aud: [env.ACCESS_AUD], sub: 'synthetic-subject', email: 'operator@example.test', iat: seconds, exp: seconds + 3600 };
const encode = obj => Buffer.from(JSON.stringify(obj)).toString('base64url');
async function token(patch = {}, header = {}) {
  const unsigned = encode({ alg: 'RS256', kid: jwk.kid, ...header }) + '.' + encode({ ...claims, ...patch });
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', keys.privateKey, new TextEncoder().encode(unsigned));
  return unsigned + '.' + Buffer.from(signature).toString('base64url');
}
const request = jwt => new Request('https://ingress.example.test/admin/receipts', { headers: { 'Cf-Access-Jwt-Assertion': jwt } });
const certs = async url => { assert.equal(url, env.ACCESS_ISSUER + '/cdn-cgi/access/certs'); return Response.json({ keys: [jwk] }); };

test('Access verifies real RSA signature, issuer, audience, expiry and explicit per-site/action grants', async () => {
  assert.equal(await authorize(request(await token()), env, 'read', certs, now), true);
  assert.equal(await authorize(request(await token()), env, 'retry', certs, now), false);
  for (const patch of [{ iss: 'https://evil.example.test' }, { aud: ['wrong'] }, { exp: seconds - 1 }, { exp: '9999999999' }, { iat: seconds + 60 }, { nbf: seconds + 60 }, { sub: '' }, { email: 'unlisted@example.test' }]) {
    assert.equal(await authorize(request(await token(patch)), env, 'read', certs, now), false);
  }
  for (const header of [{ alg: 'none' }, { kid: 'wrong-key' }, { crit: ['unknown'] }]) assert.equal(await authorize(request(await token({}, header)), env, 'read', certs, now), false);
  const valid = await token(), parts = valid.split('.');
  parts[1] = encode({ ...claims, exp: seconds + 7200 });
  assert.equal(await authorize(request(parts.join('.')), env, 'read', certs, now), false);
  assert.equal(await authorize(request(valid), { ...env, SITE_ID: 'other.example.test' }, 'read', certs, now), false);
  assert.equal(await authorize(request(valid), env, 'read', async () => { throw Error('offline'); }, now), false);
});

test('authenticated JSON/CSV export stays in site, is uncached and never enables CORS for PII', async () => {
  const DB = database();
  const payload = { site: env.SITE_ID, form: 'gratis-sjekk', website: 'https://example.test/', email: 'synthetic@example.test', message: '=HYPERLINK("https://evil.example.test")', source: {} };
  await saveReceipt(DB, payload, 'https://site.example.test', 'synthetic-export-key');
  await saveReceipt(DB, { ...payload, site: 'other.example.test', email: 'other@example.test' }, 'https://other.example.test', 'synthetic-export-key');
  const jwt = await token(), originalFetch = globalThis.fetch;
  globalThis.fetch = certs;
  try {
    for (const path of ['/admin/receipts', '/admin/export?format=json', '/admin/export?format=csv']) {
      const response = await worker.fetch(new Request('https://ingress.example.test' + path, { headers: { 'Cf-Access-Jwt-Assertion': jwt, Origin: 'https://evil.example.test' } }), { ...env, DB }, {});
      assert.equal(response.status, 200); assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
      const text = await response.text(); assert.ok(text.includes('synthetic@example.test')); assert.equal(text.includes('other@example.test'), false);
      if (path.endsWith('csv')) assert.ok(text.includes("'=HYPERLINK"));
    }
    const crossSite = await worker.fetch(new Request('https://ingress.example.test/admin/export?site=other.example.test', { headers: { 'Cf-Access-Jwt-Assertion': jwt } }), { ...env, DB }, {});
    assert.equal(crossSite.status, 403);
    const retry = await worker.fetch(new Request('https://ingress.example.test/admin/retry', { method: 'POST', headers: { 'Cf-Access-Jwt-Assertion': jwt } }), { ...env, DB }, {});
    assert.equal(retry.status, 403);
  } finally { globalThis.fetch = originalFetch; }
});

test('bounded keyset exports visit each record once; CSV escapes quotes, newlines and formula prefixes', async () => {
  const DB = database();
  for (let i = 0; i < 5; i++) await saveReceipt(DB, { site: env.SITE_ID, form: 'gratis-sjekk', website: 'https://example.test/', email: 'synthetic@example.test', source: {} }, 'https://site.example.test', `synthetic-page-${i}`);
  const ids = []; let after = '';
  do { const page = await readReceipts(DB, env.SITE_ID, after, 2); ids.push(...page.receipts.map(r => r.id)); after = page.next; } while (after);
  assert.equal(ids.length, 5); assert.equal(new Set(ids).size, 5);
  for (const message of ['=1+1', '+1', '-1', '@SUM(1)', '  =1', '\t1']) {
    assert.ok(csv([{ payload: { source: {}, message } }]).includes('"\'' + message + '"'));
  }
  assert.ok(csv([{ payload: { source: {}, message: 'line1\n"line2",' } }]).includes('"line1\n""line2"",'));
});

test('body deadline, streamed overflow and malformed UTF-8 fail without unbounded reading', async () => {
  const slow = new Response(new ReadableStream({ start() {} }));
  await assert.rejects(readJson(slow, 100, 10), error => error.status === 408);
  await assert.rejects(readJson(new Response('x'.repeat(101)), 100), error => error.status === 413);
  await assert.rejects(readJson(new Response(new Uint8Array([255]))), error => error.status === 400);
});
