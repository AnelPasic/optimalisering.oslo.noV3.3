import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {homeSectionDataSchema} from '../src/lib/home-section-data.ts';

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
 assert.deepEqual(source.items.map((i:any)=>[i.key,i.title,i.price]),[['optimalisering','Optimalisering',4500],['vekst','Vekst',6900],['partner','Enterprise',14900]]);
 assert.ok(editors[0].fields.find((x:any)=>x.name==='content').fields.some((x:any)=>x.name==='comparison'));
 assert.equal(homeSectionDataSchema.shape.packages.safeParse(source).success,true);
});

test('Pricing CMS: comparison data is editable without duplicating package price/fit facts',()=>{
 assert.equal(new Set(source.comparison.options.map((x:any)=>x.id)).size,source.comparison.options.length);
 assert.ok(source.comparison.options.every((x:any)=>x.label));
 const cmp=cms.content.find((x:any)=>x.name==='priceGroup').items[1].fields.find((x:any)=>x.name==='content').fields.find((x:any)=>x.name==='comparison');
 assert.deepEqual(cmp.fields.map((x:any)=>x.name),['heading','intro','focusHeading','options']);
 for(const forbidden of ['price','priceSuffix','title','recommended','cta'])assert.ok(!cmp.fields.some((x:any)=>x.name===forbidden));
 const cloned=structuredClone(source);cloned.comparison.options[1].id=cloned.comparison.options[0].id;
 assert.equal(homeSectionDataSchema.shape.packages.safeParse(cloned).success,false,'duplicate option identifiers are invalid');
});

test('Pricing comparison is only on pricing page and has correct accessible interaction',()=>{
 const page=readFileSync('src/components/PricingPage.astro','utf8');
 const comparison=readFileSync('src/components/PackageComparison.astro','utf8');
 const order=readFileSync('src/components/PackageOrder.astro','utf8');
 assert.match(page,/<Comparison packages={packages}/);
 assert.match(comparison,/role="region"/);
 assert.match(comparison,/class="table table-zebra table-md package-comparison-table"/);
 assert.match(comparison,/class="package-comparison-scroll overflow-x-auto rounded-box border border-base-content\/10 bg-base-100"/);
 assert.match(comparison,/scope="col"/);
 assert.doesNotMatch(comparison,/<(?:input|select|textarea)\b/);
 assert.doesNotMatch(order,/data-package-focus|name="(?:focus|partnerNeeds)"/);
 assert.match(order,/name="website"[^>]+required/);
 assert.match(order,/name="email"[^>]+required/);
 const footer=comparison.match(/<tfoot>([\s\S]*?)<\/tfoot>/)?.[1];
 assert.ok(footer,'Package buttons must be inside table footer');
 assert.match(footer,/<th scope="row">Velg pakke<\/th>/);
 assert.match(footer,/packages\.items\.map\(item=><td><a class="btn btn-outline"/);
 assert.match(footer,/data-open-package-order={item\.key}/);
 assert.equal((comparison.match(/data-open-package-order={item\.key}/g)??[]).length,1,'Buttons rendered once, only inside table');
 for(const obsolete of ['comparison-notes','comparison-actions','data-compare-count','Optimalisering: ikke valgt ennå','Vekst: 0 av 2 valgt','Partner prioriterer flere kundereiser']) assert.ok(!comparison.includes(obsolete),obsolete);
});

test('daisyUI owns comparison row and zebra styling rather than duplicate author CSS',()=>{
 const css=readFileSync('src/styles/compositions/pricing.css','utf8');
 assert.doesNotMatch(css,/\.package-comparison-table\s+(?:th|td)\s*\{/);
 assert.doesNotMatch(css,/\.package-comparison-table\s+thead\s+th\s*\{/);
 assert.doesNotMatch(css,/\.package-comparison-table\s*\{[^}]*border-collapse/);
});
