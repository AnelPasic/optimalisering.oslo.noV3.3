import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {homeSectionDataSchema} from '../src/lib/home-section-data.ts';
import {createPackageFocusMessage} from '../src/lib/package-focus.ts';
import {createOrderPayload} from '../src/lib/order.ts';

const master=JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8'));
const source=master.content;
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const flatten=(items:any[]):any[]=>items.flatMap(item=>item.type==='group'?flatten(item.items):[item]);

test('Pricing CMS: one shared owner, navigable under Priser with same package keys, prices and media',()=>{
 const group=cms.content.find((x:any)=>x.name==='priceGroup');
 assert.equal(group.label,'Priser');
 assert.deepEqual(group.items.map((i:any)=>i.name),['pricePage','globalPackages']);
 assert.equal(group.items[0].path,'app/src/content/pages/priser.json');
 assert.equal(group.items[0].operations.delete,false);
 const editors=flatten(cms.content).filter((x:any)=>x.path==='app/src/content/global-elements/priser.json');
 assert.equal(editors.length,1,'no duplicate CMS source which could erase fields on save');
 assert.equal(editors[0].name,'globalPackages');
 assert.deepEqual(editors[0].operations,{create:false,rename:false,delete:false});
 assert.equal(cms.content.find((x:any)=>x.name==='globalElements').items.some((x:any)=>x.name==='globalPackages'),false);
 assert.deepEqual(source.items.map((i:any)=>[i.key,i.title,i.price]),[['optimalisering','Optimalisering',4500],['vekst','Vekst',6900],['partner','Partner',14900]]);
 assert.ok(editors[0].fields.find((x:any)=>x.name==='content').fields.some((x:any)=>x.name==='comparison'));
 assert.equal(homeSectionDataSchema.shape.packages.safeParse(source).success,true);
});

test('Pricing CMS: comparison data is editable without duplicating package price/fit facts',()=>{
 assert.equal(source.comparison.options.length,5);
 assert.equal(new Set(source.comparison.options.map((x:any)=>x.id)).size,5);
 assert.ok(source.comparison.options.every((x:any)=>x.label&&x.description));
 const cmp=cms.content.find((x:any)=>x.name==='priceGroup').items[1].fields.find((x:any)=>x.name==='content').fields.find((x:any)=>x.name==='comparison');
 assert.deepEqual(cmp.fields.map((x:any)=>x.name),['heading','intro','focusHeading','options']);
 for(const forbidden of ['price','priceSuffix','title','recommended','cta'])assert.ok(!cmp.fields.some((x:any)=>x.name===forbidden));
 const cloned=structuredClone(source);cloned.comparison.options[1].id=cloned.comparison.options[0].id;
 assert.equal(homeSectionDataSchema.shape.packages.safeParse(cloned).success,false,'duplicate option identifiers are invalid');
});

test('Pricing focus: one radio for Optimalisering, two Vekst choices, scoped Partner needs',()=>{
 assert.match(createPackageFocusMessage('optimalisering',['SEO'] ),/^Ønsket fokusområde: SEO/);
 assert.equal(createPackageFocusMessage('optimalisering',[]),'');
 assert.throws(()=>createPackageFocusMessage('optimalisering',['SEO','Google Ads']),/maksimalt 1/);
 assert.match(createPackageFocusMessage('vekst',['SEO','Konvertering']),/SEO \+ Konvertering/);
 assert.throws(()=>createPackageFocusMessage('vekst',['SEO','Konvertering','Google Ads']),/maksimalt 2/);
 assert.throws(()=>createPackageFocusMessage('vekst',['SEO','SEO']),/Ugyldige/);
 assert.equal(createPackageFocusMessage('partner',[],'  Flere lokasjoner  '),'Flere lokasjoner');
 assert.throws(()=>createPackageFocusMessage('partner',['SEO']),'Partner does not accept fixed choice');
 assert.throws(()=>createPackageFocusMessage('partner',[],'x'.repeat(651)),/650 tegn/);
 const fields={form:'pakke-bestilling',package:'vekst',website:'example.com',email:'x@example.com',phone:'+4799999999',message:createPackageFocusMessage('vekst',['SEO','Google Ads'])};
 const payload=createOrderPayload(fields,{page:'/priser/'});
 assert.equal(payload.message,fields.message);
 assert.equal(payload.package,'vekst');
 assert.equal('focus' in payload,false,'no new backend fields');
});

test('Pricing comparison is only on pricing page and has correct accessible interaction',()=>{
 const page=readFileSync('src/components/PricingPage.astro','utf8');
 const comparison=readFileSync('src/components/PackageComparison.astro','utf8');
 const order=readFileSync('src/components/PackageOrder.astro','utf8');
 assert.match(page,/<Comparison packages={packages}/);
 assert.match(comparison,/role="region"/);
 assert.match(comparison,/class="radio radio-primary radio-sm" type="radio" name="comparison-optimalisering"/);
 assert.match(comparison,/class="table table-zebra table-md package-comparison-table"/);
 assert.match(comparison,/class="package-comparison-scroll overflow-x-auto rounded-box border border-base-content\/10 bg-base-100"/);
 assert.match(comparison,/class="compare-category bg-base-200"/);
 assert.match(comparison,/class="checkbox checkbox-primary checkbox-sm" type="checkbox" name="comparison-vekst"/);
 assert.match(comparison,/input.disabled=vekst>=2&&!input.checked/);
 assert.match(comparison,/scope="col"/);
 assert.match(order,/createPackageFocusMessage/);
 assert.match(order,/name="partnerNeeds"/);
 assert.match(order,/data-package-focus-summary/);
});

test('daisyUI owns comparison row and zebra styling rather than duplicate author CSS',()=>{
 const css=readFileSync('src/styles/compositions/pricing.css','utf8');
 assert.doesNotMatch(css,/\.package-comparison-table\s+(?:th|td)\s*\{/);
 assert.doesNotMatch(css,/\.package-comparison-table\s+thead\s+th\s*\{/);
 assert.doesNotMatch(css,/\.package-comparison-table\s*\{[^}]*border-collapse/);
 assert.doesNotMatch(css,/\.package-compare-option\s+input\s*\{/);
});
