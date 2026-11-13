import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {homepageBlockSchema} from '../src/lib/home-builder.ts';
import {entryForFile, resolveField} from './helpers/pages-cms-json.ts';

const src=JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8'));
const values=src.content.items;

test('Each current package has a customer-facing delivery summary',()=>{
  assert.equal(homepageBlockSchema.options[2].safeParse(src).success,true);
  assert.deepEqual(values.map((item:any)=>item.key),['optimalisering','vekst','partner']);
  assert.ok(values.every((item:any)=>item.price>0));
  assert.ok(values.every((item:any)=>item.deliverySummary?.trim().length>40));
  assert.ok(values.every((item:any)=>item.deliveryLabel==='Dette får du'));
  assert.ok(values.every((item:any)=>item.servicesLabel==='Tjenester vi kan jobbe med'));
});

test('New CMS delivery summary remains editable and legacy content parses',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const entry=entryForFile(cms,'app/src/content/global-elements/priser.json');
  const fields=resolveField(entry.fields.find((field:any)=>field.name==='content'),cms.components).fields.find((field:any)=>field.name==='items').fields;
  const names=['deliveryLabel','deliverySummary','servicesLabel','servicesNote'];
  const index=fields.findIndex((f:any)=>f.name==='descriptor');
  assert.deepEqual(fields.slice(index+1,index+5).map((f:any)=>f.name),names,'Four fields immediately after Pakkeoppsummering');
  for (const name of names) {
    const f=fields.find((field:any)=>field.name===name);
    assert.ok(f,name);
    assert.notEqual(f.required,true,name);
    assert.notEqual(f.readonly,true,name);
  }
  const absent=structuredClone(src);
  for(const name of names)delete absent.content.items[0][name];
  assert.equal(homepageBlockSchema.options[2].safeParse(absent).success,true,'Omitted fields are allowed');
  const blank=structuredClone(src);
  for(const name of names)blank.content.items[0][name]='';
  assert.equal(homepageBlockSchema.options[2].safeParse(blank).success,true,'Blank fields are allowed');
});

test('Plan-specific delivery, selection price and next action come from current package source',()=>{
  const card=readFileSync('src/components/PackageSection.astro','utf8');
  const order=readFileSync('src/components/PackageOrder.astro','utf8');
  const comparison=readFileSync('src/components/PackageComparison.astro','utf8');
  assert.ok(card.includes('item.deliveryLabel'));
  assert.ok(card.includes('item.deliverySummary'));
  assert.ok(card.includes('item.servicesLabel'));
  assert.ok(card.includes('item.servicesNote'));
  assert.ok(comparison.includes('item.deliverySummary'));
  assert.ok(order.includes('Valgt pakke:') && order.includes('formatPrice(item.price)'));
  assert.ok(order.includes('item.pricePrefix') && order.includes('item.vatSuffix'));
  assert.ok(order.includes('orderIntro') && order.includes('orderSubmitLabel'));
  assert.ok(src.content.orderSubmitLabel.trim().length>3);
  assert.ok(src.content.orderIntro.trim().length>20);
  assert.match(order,/name="website"[^>]*required/);
  assert.match(order,/name="email"[^>]*required/);
});
