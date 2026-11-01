import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { serviceGlobalIds, resolveSynlighetSections, hasGlobalServiceProof, validateServiceGlobalProof, visibleServiceSections } from '../src/lib/service-sections.ts';
import { getGlobalElement } from '../src/lib/home-builder.ts';
import { cmsJsonSave, entryForFile, resolveField } from './helpers/pages-cms-json.ts';

const source = JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
const records = readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync('src/content/proof/'+f,'utf8')));
const placement = (element: string, extra = {}) => ({_block:'global',element,...extra});
const withGlobal = (element: string, extra = {}) => ({...structuredClone(source),sections:[...structuredClone(source.sections).filter((row:any)=>row._block!=='global'||row.element!==element),placement(element,extra)]});

test('explicit references resolve canonical masters without copying source or adding fallback content',()=>{
  for(const id of serviceGlobalIds){
    const raw = withGlobal(id), original = structuredClone(raw);
    if(id==='behov') raw.sections.find((s:any)=>s.id==='behov').visibility='hidden';
    const page = pageSchema.parse(raw), global = page.sections.find(s=>s.globalElement===id)!;
    const master=getGlobalElement(id);
    assert.ok(global,id); assert.deepEqual(global.content,'content' in master ? master.content : undefined);
    assert.equal(page.proof,undefined); assert.equal(page.composition?.service?.sectionVisuals.length,source.composition.service.sectionVisuals.length);
    assert.deepEqual(raw.hero,original.hero); assert.deepEqual(Object.keys(raw.sections.at(-1)).sort(),['_block','element']);
  }
});

test('only explicitly placed visible proof renders; hiding/removing never restores local proof',()=>{
  const page = pageSchema.parse(withGlobal('resultater'));
  assert.equal(hasGlobalServiceProof(page),true); validateServiceGlobalProof(page,records);
  for(const raw of [source,withGlobal('resultater',{visibility:'hidden'})]){
    const parsed = pageSchema.parse(raw); assert.equal(hasGlobalServiceProof(parsed),false);
    assert.deepEqual(parsed.sections,pageSchema.parse(source).sections); assert.deepEqual(parsed.proof,source.proof);
  }
});

test('visible local/global conflict rejects; hidden local stays stored and never automatically reappears',()=>{
  const raw = withGlobal('behov');assert.equal(pageSchema.safeParse(raw).success,false);
  const local=raw.sections.find((s:any)=>s.id==='behov');local.visibility='hidden';
  const page=pageSchema.parse(raw);
  assert.equal(visibleServiceSections(page).filter(s=>s.id==='behov').length,1);
  assert.equal(visibleServiceSections(page).find(s=>s.id==='behov')?.globalElement,'behov');
  assert.deepEqual(page.sections.find(s=>s.id==='behov'&&!s.globalElement),{...pageSchema.parse(source).sections.find(s=>s.id==='behov'),visibility:'hidden'});
  raw.sections.pop();assert.equal(visibleServiceSections(pageSchema.parse(raw)).some(s=>s.id==='behov'),false);
  raw.sections=raw.sections.filter((s:any)=>s.id!=='behov');raw.sections.push(placement('behov'));
  assert.ok(pageSchema.safeParse(raw).success,'removed local visual annotation must not force a section');
  assert.deepEqual(pageSchema.parse(withGlobal('behov',{visibility:'hidden'})).sections,pageSchema.parse(source).sections);
});

test('reject duplicate/unknown/unsupported masters, copied payloads and global/local anchor collisions, including hidden refs',()=>{
  assert.equal(pageSchema.safeParse(withGlobal('unknown')).success,false,'unknown');
  const conflicting=structuredClone(source);conflicting.sections.push({_block:'protected',id:'sjekk',heading:'Lokalt skjema i tillegg',body:[]});
  assert.equal(pageSchema.safeParse(conflicting).success,false,'local and global sjekk duplicate');
  for(const id of serviceGlobalIds){const raw=withGlobal(id);raw.sections.push(placement(id,{visibility:'hidden'}));assert.equal(pageSchema.safeParse(raw).success,false,id);}
  const copied=withGlobal('resultater',{content:getGlobalElement('resultater').content}); assert.equal(pageSchema.safeParse(copied).success,false);
  const collision=withGlobal('regneeksempel');collision.sections.push({_block:'content',id:'regneeksempel',heading:'Duplikat',body:[]});assert.equal(pageSchema.safeParse(collision).success,false);
  const forged={...source,sections:[...source.sections,{...getGlobalElement('resultater'),globalElement:'resultater'}]};assert.equal(pageSchema.safeParse(forged).success,false);
  const other=JSON.parse(readFileSync('src/content/pages/konvertering.json','utf8'));other.sections.push(placement('resultater'));
  assert.equal(pageSchema.safeParse(other).success,false,'explicit local and global proof may not share resultater anchor');
  other.sections.find((s:any)=>s._block==='proof').visibility='hidden';
  assert.equal(pageSchema.safeParse(other).success,true,'a hidden local proof may coexist with a visible global proof');
});

test('live fragment links require visible targets; protected local sjekk cannot be hidden',()=>{
  const raw=withGlobal('regneeksempel');raw.hero.primaryCta.href='/synlighet/#regneeksempel';assert.ok(pageSchema.safeParse(raw).success);
  raw.sections.at(-1).visibility='hidden';assert.equal(pageSchema.safeParse(raw).success,false);
  const hiddenCheck=withGlobal('resultater');hiddenCheck.sections.find((s:any)=>s.element==='sjekk').visibility='hidden';assert.equal(pageSchema.safeParse(hiddenCheck).success,false);
  assert.throws(()=>resolveSynlighetSections([placement('resultater',{visibility:'unknown'})]));
  const noFaq=structuredClone(source);noFaq.sections=noFaq.sections.filter((s:any)=>s.element!=='sporsmal');noFaq.hero.primaryCta={label:'FAQ',href:'/synlighet/#sporsmal'};
  assert.equal(pageSchema.safeParse(noFaq).success,false);
  const proofLink=structuredClone(source);proofLink.hero.primaryCta={label:'Proof',href:'/synlighet/#resultater'};
  assert.equal(pageSchema.safeParse(proofLink).success,false);
});

test('proof, prices and FAQ follow explicit position/visibility/removal without fallback',()=>{
  for(const id of ['resultater','priser','sporsmal']){
    const base=structuredClone(source);base.sections=base.sections.filter((s:any)=>s.element!==id);
    const raw=structuredClone(base);raw.sections.splice(1,0,placement(id));
    assert.equal(visibleServiceSections(pageSchema.parse(raw))[1].id,id);
    validateServiceGlobalProof(pageSchema.parse(raw),records);
    raw.hero.primaryCta.href='/synlighet/?test=1#'+id;assert.ok(pageSchema.safeParse(raw).success);
    raw.sections[1].visibility='hidden';assert.equal(pageSchema.safeParse(raw).success,false,'live target hidden');
    raw.hero.primaryCta=source.hero.primaryCta;
    assert.equal(visibleServiceSections(pageSchema.parse(raw)).some((s:any)=>s.id===id),false);
    raw.sections.splice(1,1);assert.deepEqual(pageSchema.parse(raw).sections,pageSchema.parse(base).sections);
    assert.equal(pageSchema.parse(raw).proof,undefined);
  }
});

test('other-route links and hidden draft links remain valid; ghost local sources are rejected',()=>{
  for(const href of ['/#sjekk','/priser/']){const raw=structuredClone(source);raw.hero.primaryCta.href=href;assert.ok(pageSchema.safeParse(raw).success);}
  const raw=structuredClone(source),row=raw.sections.find((s:any)=>s.id==='behov');
  row.visibility='hidden';row.links=[{label:'Skjult utkast',href:'/synlighet/#finnes-ikke'}];assert.ok(pageSchema.safeParse(raw).success);
  delete row.visibility;assert.equal(pageSchema.safeParse(raw).success,false);
  assert.equal(pageSchema.safeParse({...source,proof:{}}).success,false,'proof');
  assert.equal(pageSchema.safeParse({...source,faq:[{question:'Lokalt spørsmål?',answer:'Lokalt svar.'}]}).success,true,'native local FAQ is now allowed');
  for(const key of ['proofAfter','pricingBridge','closingCta']){
    const raw=structuredClone(source);raw.composition.service[key]=key==='closingCta'?false:'prioritering';
    assert.equal(pageSchema.safeParse(raw).success,false,key);
  }
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


test('global Gratis sjekk replaces the local callout with a single CMS master reference',()=>{
  const row=source.sections.filter((s:any)=>s._block==='global'&&s.element==='sjekk');
  assert.deepEqual(row,[placement('sjekk')]);
  assert.equal(source.sections.some((s:any)=>s.id==='sjekk'),false);
  const parsed=pageSchema.parse(source),visible=visibleServiceSections(parsed).filter((s:any)=>s.id==='sjekk');
  assert.equal(visible.length,1);
  assert.equal(visible[0].globalElement,'sjekk');
  assert.deepEqual(visible[0].content,getGlobalElement('sjekk').content);
  assert.equal(visible[0].content.form.disabledStatus.includes('ikke åpnet'),true);
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),entry=entryForFile(cms,'app/src/content/pages/synlighet.json');
  assert.deepEqual(JSON.parse(cmsJsonSave(source,source,entry,cms)),source);
  const removed=structuredClone(source);removed.sections=removed.sections.filter((s:any)=>s.element!=='sjekk');
  assert.equal(pageSchema.safeParse(removed).success,false);
  const duplicate=structuredClone(source);duplicate.sections.push(placement('sjekk'));
  assert.equal(pageSchema.safeParse(duplicate).success,false);
});
