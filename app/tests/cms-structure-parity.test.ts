import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';

const config=YAML.parse(readFileSync('../.pages.yml','utf8'));
const slugs=['konvertering','synlighet','seo','ai-synlighet','nettbutikkoptimalisering'];
const read=(slug:string)=>JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));

test('one ordered section editor without local proof across all remaining service pages',()=>{
 const editor=entryForFile(config,'app/src/content/pages/konvertering.json');
 const blocks=editor.fields.find((f:any)=>f.name==='sections').blocks.map((b:any)=>b.name);
 for(const kind of ['content','global','sharedContent','pricingBridge','pageFaq','closingCta'])assert.ok(blocks.includes(kind),kind);
 assert.equal(blocks.includes('proof'),false);
 assert.equal(editor.fields.some((f:any)=>f.name==='proof'),false);
 for(const slug of slugs){
  const page=read(slug);
  assert.equal(Object.hasOwn(page,'proof'),false,slug+' root proof');
  assert.equal(page.sections.some((s:any)=>s._block==='proof'),false,slug+' local proof');
  for(const field of ['proofAfter','pricingBridge','closingCta'])
   assert.equal(Object.hasOwn(page.composition?.service??{},field),false,slug+' implicit '+field);
  assert.equal(pageSchema.safeParse(page).success,true,slug+' schema valid');
  const saved=JSON.parse(cmsJsonSave(page,page,editor,config));
  assert.deepEqual(saved,page,slug+' CMS round-trip preserves OWNER content');
  const localFaq=page.sections.some((s:any)=>s._block==='pageFaq'&&s.visibility!=='hidden');
  const globalFaq=page.sections.some((s:any)=>s._block==='global'&&s.element==='sporsmal'&&s.visibility!=='hidden');
  assert.ok(localFaq||globalFaq,slug+' FAQ explicit and movable');
 }
});

test('konvertering keeps approved price bridge after dropping local Nysta proof',()=>{
 const page=read('konvertering'),sections=page.sections;
 const idx=(id:string)=>sections.findIndex((s:any)=>s.id===id);
 assert.equal(idx('resultater'),-1);
 assert.equal(idx('service-priser'),idx('sammenheng')+1);
 const bridge=sections.find((s:any)=>s._block==='pricingBridge');
 assert.equal(bridge.serviceName,'Konvertering');
 assert.deepEqual(bridge.link,{label:'Se pakker og priser',href:'/priser/'});
 assert.equal(sections.at(-1)._block,'pageFaq');
 assert.equal(page.hero.toneOverrides.eyebrowPreset,'inherit','latest OWNER CMS edit retained');
});

test('non-global proof is eliminated, and new placements require the global master',()=>{
 const page=read('nettbutikkoptimalisering');
 assert.equal(page.sections.some((s:any)=>s._block==='proof'),false);
 assert.equal(page.sections.some((s:any)=>s._block==='global'&&s.element==='resultater'),false);
 const conversion=read('konvertering');
 assert.equal(pageSchema.safeParse({...conversion,proof:{}}).success,false);
 assert.equal(pageSchema.safeParse({...conversion,composition:{...conversion.composition,service:{...conversion.composition.service,proofAfter:'prioritering'}}}).success,false);
 assert.equal(pageSchema.safeParse({...conversion,sections:[...conversion.sections,{_block:'proof',id:'resultater',presentation:{}}]}).success,false);
 const global={...conversion,sections:[...conversion.sections,{_block:'global',element:'resultater'}]};
 assert.equal(pageSchema.safeParse(global).success,true,'approved global Kunderesultater may be placed explicitly');
});

test('deleted OWNER service page stays deleted and cannot return via branch migration',()=>{
 const files=readdirSync('src/content/pages');
 assert.equal(files.includes('lokal-seo.json'),false);
});
