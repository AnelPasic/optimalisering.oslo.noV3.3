import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { serviceGlobalIds, resolveSynlighetSections, hasGlobalServiceProof, validateServiceGlobalProof } from '../src/lib/service-sections.ts';
import { getGlobalElement } from '../src/lib/home-builder.ts';
import { cmsJsonSave, entryForFile, resolveField } from './helpers/pages-cms-json.ts';

const source = JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
const records = readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync('src/content/proof/'+f,'utf8')));
const placement = (element: string, extra = {}) => ({_block:'global',element,...extra});
const withGlobal = (element: string, extra = {}) => ({...structuredClone(source),sections:[...structuredClone(source.sections),placement(element,extra)]});

test('mixed service references resolve current masters and preserve original local proof/config without source copies',()=>{
  for(const id of serviceGlobalIds){
    const raw = withGlobal(id), original = structuredClone(raw);
    const page = pageSchema.parse(raw), global = page.sections.find(s=>s.globalElement===id)!;
    const master=getGlobalElement(id);
    assert.ok(global,id); assert.deepEqual(global.content,'content' in master ? master.content : undefined);
    assert.deepEqual(page.proof,source.proof); assert.deepEqual(page.composition?.service?.pricingBridge,source.composition.service.pricingBridge);
    assert.deepEqual(raw,original); assert.deepEqual(Object.keys(raw.sections.at(-1)).sort(),['_block','element']);
  }
});

test('one visible global proof replaces local display; hiding/removing restores original selection and layout',()=>{
  const page = pageSchema.parse(withGlobal('resultater'));
  assert.equal(hasGlobalServiceProof(page),true); validateServiceGlobalProof(page,records);
  for(const raw of [source,withGlobal('resultater',{visibility:'hidden'})]){
    const parsed = pageSchema.parse(raw); assert.equal(hasGlobalServiceProof(parsed),false);
    assert.deepEqual(parsed.sections,pageSchema.parse(source).sections); assert.deepEqual(parsed.proof,source.proof);
  }
});

test('global selector reversibly substitutes local behov, preserving one actual anchor and source content',()=>{
  const raw = withGlobal('behov'), page = pageSchema.parse(raw);
  assert.equal(page.sections.filter(s=>s.id==='behov').length,1);
  assert.equal(page.sections.find(s=>s.id==='behov')?.globalElement,'behov');
  assert.deepEqual(raw.sections.find((s:any)=>s.id==='behov'),source.sections.find((s:any)=>s.id==='behov'));
  assert.deepEqual(pageSchema.parse(withGlobal('behov',{visibility:'hidden'})).sections,pageSchema.parse(source).sections);
});

test('reject duplicate/unknown/unsupported masters, copied payloads and global/local anchor collisions, including hidden refs',()=>{
  for(const id of ['unknown','sjekk','priser','sporsmal']) assert.equal(pageSchema.safeParse(withGlobal(id)).success,false,id);
  for(const id of serviceGlobalIds){const raw=withGlobal(id);raw.sections.push(placement(id,{visibility:'hidden'}));assert.equal(pageSchema.safeParse(raw).success,false,id);}
  const copied=withGlobal('resultater',{content:getGlobalElement('resultater').content}); assert.equal(pageSchema.safeParse(copied).success,false);
  const collision=withGlobal('regneeksempel');collision.sections.push({_block:'content',id:'regneeksempel',heading:'Duplikat',body:[]});assert.equal(pageSchema.safeParse(collision).success,false);
  const forged={...source,sections:[...source.sections,{...getGlobalElement('resultater'),globalElement:'resultater'}]};assert.equal(pageSchema.safeParse(forged).success,false);
  const other={...withGlobal('resultater'),slug:'konvertering'};assert.equal(pageSchema.safeParse(other).success,false);
});

test('resolved links and protected legacy dependencies fail closed for hidden/removed targets',()=>{
  const raw=withGlobal('regneeksempel');raw.cta.href='/synlighet/#regneeksempel';assert.ok(pageSchema.safeParse(raw).success);
  raw.sections.at(-1).visibility='hidden';assert.equal(pageSchema.safeParse(raw).success,false);
  for(const id of ['sjekk','prioritering','sammenheng']){const raw=withGlobal('resultater');raw.sections.find((s:any)=>s.id===id).visibility='hidden';assert.equal(pageSchema.safeParse(raw).success,false,id);}
  assert.throws(()=>resolveSynlighetSections([placement('resultater',{visibility:'unknown'})]));
  const noFaq={...structuredClone(source),faq:[],cta:{label:'FAQ',href:'/synlighet/#sporsmal'}};
  assert.equal(pageSchema.safeParse(noFaq).success,false);
  const noProof=pageSchema.parse({...structuredClone(source),cta:{label:'Proof',href:'/synlighet/#resultater'}});
  assert.throws(()=>validateServiceGlobalProof(noProof,[]));
});

test('global proof requires actual case evidence and permission; never falls back to unauthorized results',()=>{
  const page=pageSchema.parse(withGlobal('resultater'));
  for(const mutate of [
    (r:any)=>r.publicationApproved=false,
    (r:any)=>r.namingPermission='NEEDS_PERMISSION',
    (r:any)=>r.publicationStatus='WITHDRAWN',
    (r:any)=>r.strategyReviewStatus='READY_FOR_STRATEGY_REVIEW',
    (r:any)=>r.permissionEvidence=null,
  ]){const invalid=structuredClone(records);mutate(invalid.find((r:any)=>r.id==='eurotents'));assert.throws(()=>validateServiceGlobalProof(page,invalid));}
  assert.throws(()=>validateServiceGlobalProof(page,[]));
});

test('native pilot field reuses existing names/visibility; JSON save stores references only and preserves all local fields',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8')), entry=entryForFile(cms,'app/src/content/pages/synlighet.json');
  const sections=entry.fields.find((f:any)=>f.name==='sections'), global=resolveField(sections.blocks.find((b:any)=>b.name==='global'),cms.components);
  assert.deepEqual(global.fields.find((f:any)=>f.name==='element').options.values.map((v:any)=>v.name).sort(),[...serviceGlobalIds].sort());
  assert.equal(global.fields.find((f:any)=>f.name==='visibility').component,'sectionVisibility');
  const raw=withGlobal('resultater'),saved=JSON.parse(cmsJsonSave(source,raw,entry,cms));assert.deepEqual(saved,raw);assert.deepEqual(saved.proof,source.proof);
  assert.ok(pageSchema.safeParse(saved).success);
});
