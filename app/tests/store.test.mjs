import test from 'node:test';
import assert from 'node:assert/strict';
import { openLeadStore } from '../server/store.mjs';
import { notifyLead } from '../server/resend.mjs';

const payload = { site: 'optimalisering.oslo.no', form: 'gratis-sjekk', email: 'synthetic@example.test', website: 'https://example.test/', model: '', message: 'Synthetic test only', source: { page: '/vurdering/', utm_source: 'synthetic' } };

test('durable enquiry and one conversion are atomic and idempotent', () => {
  const store = openLeadStore(':memory:');
  try {
    const first = store.save(payload, 'test-idempotency-1');
    const second = store.save(payload, 'test-idempotency-1');
    assert.equal(first.id, second.id);
    assert.equal(store.counts().leads, 1);
    assert.equal(store.counts().conversions, 1);
    assert.equal(store.get(first.id).payload.source.utm_source, 'synthetic');
    assert.throws(() => store.save({ ...payload, message: 'changed' }, 'test-idempotency-1'), /conflict/);
  } finally { store.close(); }
});

test('email failure leaves the enquiry and a retryable notification intact', async () => {
  const store = openLeadStore(':memory:');
  try {
    const lead = store.save(payload, 'test-idempotency-2');
    await notifyLead(store, lead.id, { apiKey: 'synthetic', from: 'noreply@example.test', to: 'recipient@example.test', transport: async () => new Response('{"message":"failure"}', { status: 503 }) });
    assert.equal(store.counts().leads, 1);
    assert.equal(store.get(lead.id).notification_status, 'pending');
    let request;
    await notifyLead(store, lead.id, { apiKey: 'synthetic', from: 'noreply@example.test', to: 'recipient@example.test', transport: async (url, options) => { request = { url, options }; return new Response('{"id":"synthetic-message-id"}', { status: 200 }); } });
    assert.equal(store.get(lead.id).notification_status, 'sent');
    assert.equal(request.url, 'https://api.resend.com/emails');
    assert.equal(request.options.headers['Idempotency-Key'], `lead/${lead.id}`);
    assert.equal(JSON.parse(request.options.body).reply_to, payload.email);
    assert.equal(store.counts().conversions, 1);
  } finally { store.close(); }
});

test('ambiguous email response remains pending and sent messages are not resent', async () => {
  const store = openLeadStore(':memory:');
  try {
    const lead = store.save(payload, 'test-idempotency-3');
    const config = { apiKey: 'synthetic', from: 'noreply@example.test', to: 'recipient@example.test' };
    await notifyLead(store, lead.id, { ...config, transport: async () => new Response('{}') });
    assert.equal(store.get(lead.id).notification_status, 'pending');
    await notifyLead(store, lead.id, { ...config, transport: async () => new Response('{"id":"synthetic-message-id"}') });
    await notifyLead(store, lead.id, { ...config, transport: async () => assert.fail('already sent') });
    assert.equal(store.get(lead.id).notification_status, 'sent');
  } finally { store.close(); }
});
