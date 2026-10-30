import {readFileSync} from 'node:fs';
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
test('new three-field inline order preserves the selected package and source page', () => {
  const payload = createOrderPayload({form:'pakke-bestilling',package:'vekst',website:'example.test',email:'synthetic@example.test',phone:'+47 901 02 345'}, {page:'/synlighet/'});
  assert.equal(payload.intent,'order');
  assert.equal(payload.package,'vekst');
  assert.equal(payload.phone,'+47 901 02 345');
  assert.equal(payload.source.page,'/synlighet/');
  assert.equal('company' in payload,false);
  assert.equal('contact' in payload,false);
});
test('orders reject invalid intent, package, phone and excessive optional legacy fields', () => {
  for (const changes of [{form:'checkout'},{package:'sprint'},{package:''},{company:'x'.repeat(201)},{contact:'x'.repeat(201)},{phone:''},{phone:'abcde'},{phone:'x'.repeat(41)}])
    assert.throws(()=>createOrderPayload({...fields,...changes},{}));
  const assessment=createLeadPayload({website:'example.test',email:fields.email},{});
  assert.equal(assessment.form,'gratis-sjekk');
  assert.equal('package' in assessment,false);
});

test('global package cards own the order form; there is no second order area on the pricing page',()=>{
  const cards=readFileSync('src/components/PackageSection.astro','utf8');
  const inline=readFileSync('src/components/PackageOrder.astro','utf8');
  const page=readFileSync('src/components/PricingPage.astro','utf8');
  assert.match(cards,/<PackageOrder item={item}/);
  assert.doesNotMatch(page,/<PackageOrder/);
  for(const field of ['website','email','phone']) assert.match(inline,new RegExp('name="'+field+'"'));
  assert.match(inline,/name="package" value={item.key}/);
  assert.match(inline,/const enabled = site.ordersEnabled/);
  assert.match(inline,/orderSubmitLabel/);
  const master=JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8'));
  assert.equal(master.content.orderSubmitLabel,'Send bestilling');
});

test('order text is editable ONLY under the global pricing master in Pages CMS',()=>{
  const yaml=readFileSync('../.pages.yml','utf8');
  const packages=yaml.slice(yaml.indexOf('      - name: globalPackages'),yaml.indexOf('  - name: insight'));
  const calculator=yaml.slice(yaml.indexOf('      - name: globalCalculator'),yaml.indexOf('      - name: globalAssessment'));
  assert.match(packages,/name: orderIntro/);
  assert.match(packages,/name: orderSubmitLabel/);
  assert.doesNotMatch(calculator,/name: orderIntro/);
  assert.doesNotMatch(calculator,/name: orderSubmitLabel/);
});
