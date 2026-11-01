import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';

const slugs=['konvertering','synlighet','seo','lokal-seo','ai-synlighet','nettbutikkoptimalisering'];
const read=(slug:string)=>JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));
const config=YAML.parse(readFileSync('../.pages.yml','utf8'));

test('one page builder across six services without automatic invisible service components',()=>{
 const entry=entryForFile(config,'app/src/content/pages/konvertering.json');
 assert.deepEqual(entry.fields.filter((f:any)=>f.name==='proof'),[]);
 const editor=entry.fields.find((f:any)=>f.name==='sections');
 assert.ok(editor);
 for(const kind of ['content','global','sharedContent','proof','pricingBridge','pageFaq','closingCta']){
  assert.ok(editor.blocks.some((b:any)=>b.name===kind),kind);
 }
 for(const slug of slugs){
  const page=read(slug);
  assert.equal(Object.hasOwn(page,'proof'),false,slug+' root proof removed');
  for(const field of ['proofAfter','pricingBridge','closingCta'])assert.equal(Object.hasOwn(page.composition?.service??{},field),false,slug+' auto '+field+' removed');
  assert.equal(pageSchema.safeParse(page).success,true,slug);
  const saved=JSON.parse(cmsJsonSave(page,page,entry,config));
  assert.deepEqual(saved,page,slug+' CMS roundtrip without missing/rewritten OWNER fields');
  const localFaq=page.sections.some((s:any)=>s._block==='pageFaq'&&s.visibility!=='hidden');
  const globalFaq=page.sections.some((s:any)=>s._block==='global'&&s.element==='sporsmal'&&s.visibility!=='hidden');
  assert.ok(localFaq||globalFaq,slug+' FAQ explicit and movable');
  assert.equal(page.sections.filter((s:any)=>s._block==='pageFaq').length<=1,true);
 }
});

test('conversion proof, price bridge and FAQ preserve prior positions and source values',()=>{
 const page=read('konvertering'),sections=page.sections;
 const idx=(id:string)=>sections.findIndex((s:any)=>s.id===id);
 assert.equal(idx('resultater'),idx('prioritering')+1);
 assert.equal(idx('service-priser'),idx('sammenheng')+1);
 const proof=sections.find((s:any)=>s._block==='proof').presentation;
 assert.deepEqual(proof.caseIds,['nysta']);assert.equal(proof.publicationApproved,true);
 assert.equal(proof.heading,'Fullført checkout økte fra 7,1 % til 43,6 %');
 const bridge=sections.find((s:any)=>s._block==='pricingBridge');
 assert.equal(bridge.serviceName,'Konvertering');
 assert.deepEqual(bridge.link,{label:'Se pakker og priser',href:'/priser/'});
 assert.equal(sections.at(-1)._block,'pageFaq');
 assert.equal(sections.some((s:any)=>s._block==='closingCta'),false);
});

test('draft store proof is retained only as hidden data, never silently approved',()=>{
 const source=read('nettbutikkoptimalisering');
 const block=source.sections.find((s:any)=>s._block==='proof');
 assert.ok(block);assert.equal(block.visibility,'hidden');
 assert.equal(block.presentation.publicationApproved,false);
 assert.deepEqual(block.presentation.caseIds,['eurotents','nysta']);
 const illegal={...source,sections:source.sections.map((s:any)=>s._block==='proof'?{...s,presentation:{...s.presentation,caseIds:[]}}:s)};
 assert.equal(pageSchema.safeParse(illegal).success,true,'empty nonpublic selection is safe');
});

test('explicit CMS placements cannot duplicate proof, FAQ or injected configuration',()=>{
 const conversion=read('konvertering');
 assert.equal(pageSchema.safeParse({...conversion,proof:{}}).success,false);
 assert.equal(pageSchema.safeParse({...conversion,composition:{...conversion.composition,service:{...conversion.composition.service,proofAfter:'prioritering'}}}).success,false);
 const dup={...conversion,sections:[...conversion.sections,{_block:'global',element:'resultater'}]};
 assert.equal(pageSchema.safeParse(dup).success,false);
});
