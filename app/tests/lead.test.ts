import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeWebsite, createLeadPayload, submitLead } from '../src/lib/lead.ts';

test('website accepts a bare domain and rejects unsafe schemes and credentials', () => {
  assert.equal(normalizeWebsite('eksempel.no'), 'https://eksempel.no/');
  assert.equal(normalizeWebsite(' https://eksempel.no/tjenester/ '), 'https://eksempel.no/tjenester/');
  for (const url of ['javascript:alert(1)', 'ftp://example.no', 'https://a:b@example.no', 'not a website', 'http://localhost']) {
    assert.equal(normalizeWebsite(url), null);
  }
});

test('payload is minimal, validates email and removes personal/URL query data from source', () => {
  const payload = createLeadPayload({ website: 'eksempel.no', email: ' buyer@example.no ', message: ' Hei ', model: 'henvendelser', extra: 'ignored' }, { page: '/vurdering/?email=x', referrer: 'https://search.example/path?token=x', utm_source: 'google', utm_campaign: 'test' });
  assert.equal(payload.website, 'https://eksempel.no/');
  assert.equal(payload.email, 'buyer@example.no');
  assert.equal(payload.message, 'Hei');
  assert.equal(payload.source.page, '/vurdering/');
  assert.equal(payload.source.referrer, 'https://search.example');
  assert.equal(payload.source.utm_source, 'google');
  assert.equal('extra' in payload, false);
  assert.throws(() => createLeadPayload({ website: 'example.no', email: 'invalid' }, {}));
});

const payload = { site: 'optimalisering.oslo.no', form: 'gratis-sjekk', website: 'https://example.no/', email: 'test@example.no', message: '', model: '', source: { page: '/vurdering/' } };

test('only an explicit persisted acknowledgement is success', async () => {
  await submitLead('/api/leads', payload, { transport: async () => new Response(JSON.stringify({ ok: true, id: 'lead-1' }), { status: 201 }) });
  for (const response of [new Response('{}'), new Response('not json'), new Response('{"ok":false}', { status: 200 }), new Response('{"ok":true}', { status: 201 }), new Response('{"ok":true,"id":"x"}', { status: 500 })]) {
    await assert.rejects(submitLead('/api/leads', payload, { transport: async () => response }));
  }
});

test('empty and insecure endpoints never call the transport', async () => {
  for (const endpoint of ['', 'http://external.example/api', '//external.example/api', 'javascript:alert(1)']) {
    await assert.rejects(submitLead(endpoint, payload, { transport: async () => { throw new Error('transport called unexpectedly'); } }));
  }
});

test('network failure and abort preserve a retryable error', async () => {
  await assert.rejects(submitLead('/api/leads', payload, { transport: async () => { throw new TypeError('network'); } }));
  await assert.rejects(submitLead('/api/leads', payload, { timeoutMs: 5, transport: (_url, options) => new Promise((_resolve, reject) => options?.signal?.addEventListener('abort', () => reject(new Error('aborted')))) }));
});

test('malformed endpoints, credentials and query data are rejected before any transport', async () => {
  let calls = 0;
  const transport = async () => { calls++; return new Response('{"ok":true,"id":"synthetic"}', { status: 201 }); };
  for (const endpoint of ['https://', 'https://user:pass@api.example.test/leads', 'https://api.example.test/leads?email=x', 'https://api.example.test/leads#x', 'https://api.example.test\\other/leads']) {
    await assert.rejects(submitLead(endpoint, payload, { transport }));
  }
  assert.equal(calls, 0);
});
