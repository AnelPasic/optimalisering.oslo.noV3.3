import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeadPayload } from '../src/lib/lead.ts';
import { createOrderPayload } from '../src/lib/order.ts';
const fields = { form: 'pakke-bestilling', package: 'partner', company: ' Example AS ', contact: ' Synthetic Buyer ', website: 'example.test', email: 'synthetic@example.test', phone: '+47 12345678', message: 'Synthetic only' };
test('order intent and selected package survive the shared intake payload without arbitrary fields', () => {
  const payload = createOrderPayload({ ...fields, extra: 'discard' }, { page: '/priser/?pakke=partner&email=x#bestill' });
  assert.equal(payload.form, 'pakke-bestilling');
  assert.equal(payload.package, 'partner');
  assert.equal(payload.company, 'Example AS');
  assert.equal(payload.contact, 'Synthetic Buyer');
  assert.equal(payload.phone, '+47 12345678');
  assert.equal(payload.source.page, '/priser/');
  assert.equal('extra' in payload, false);
});
test('orders reject unknown intent/package and missing or excessive business-contact fields', () => {
  for (const changes of [{ form: 'checkout' }, { package: 'sprint' }, { package: '' }, { company: '' }, { contact: '' }, { company: 'x'.repeat(201) }, { phone: 'x'.repeat(41) }]) assert.throws(() => createOrderPayload({ ...fields, ...changes }, {}));
  const assessment = createLeadPayload({ website: 'example.test', email: fields.email }, {});
  assert.equal(assessment.form, 'gratis-sjekk');
  assert.equal('package' in assessment, false);
});
