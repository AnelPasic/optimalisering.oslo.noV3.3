import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {pageSchema} from '../src/lib/content-schema.ts';
import {getHomepageBlocks,isHomepageSectionVisible,validateHomepagePublicLinks,resolveHomepageSections} from '../src/lib/home-builder.ts';
import {localHomeFixture} from './helpers/pages-cms-json.ts';
const input=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
test('Top and Bottom accept independent native local/reference lists with no before/after controls',()=>{
 const p=localHomeFixture();p.bottomSections=[{...p.topSections[0],id:'bunn',uid:randomUUID()}];
 assert.deepEqual(getHomepageBlocks(pageSchema.parse(p)).map(b=>b.id),['cms-local-fixture','forbehovsvelger',...input.sections.map((r:any)=>r.element),'bunn']);
 assert.equal(p.optionalSections,undefined);
});
test('all zones share UUID/anchor and interactive reference collision guards, including hidden entries',()=>{
 const p=localHomeFixture();p.bottomSections=[{...p.topSections[0],visibility:'hidden'}];assert.equal(pageSchema.safeParse(p).success,false);
 const q=structuredClone(input);q.bottomSections=[{...q.sections[1],visibility:'hidden'}];assert.equal(pageSchema.safeParse(q).success,false);
});
test('visibility is reversible and typed; linked price/contact placements need their actual targets',()=>{
 for(const id of ['behov','regneeksempel','resultater','mekanisme','passer','sporsmal']){
  const p=structuredClone(input);if(!p.sections.some((r:any)=>r.element===id))p.sections.push({_block:'global',element:id});p.sections.find((r:any)=>r.element===id).visibility='hidden';const block=getHomepageBlocks(pageSchema.parse(p)).find(b=>b.id===id);assert.equal(isHomepageSectionVisible(block),false);
 }
 for(const id of ['sjekk','priser']){const p=structuredClone(input);p.sections.find((r:any)=>r.element===id).visibility='hidden';assert.equal(pageSchema.safeParse(p).success,false);}
 for(const value of ['published','draft',false,{}]){const p=structuredClone(input);p.sections[0].visibility=value;assert.equal(pageSchema.safeParse(p).success,false);}
});
test('missing/hidden incoming anchors are rejected across routes; hidden outgoing content is not published',()=>{
 const p=localHomeFixture();p.topSections[0].visibility='hidden';const home=pageSchema.parse(p);
 assert.doesNotThrow(()=>validateHomepagePublicLinks(home,[]));
 assert.throws(()=>validateHomepagePublicLinks(home,[{cta:{href:'/#cms-local-fixture'}}]),/cms-local-fixture/);
 const q=structuredClone(input);q.sections=q.sections.filter((r:any)=>r.element!=='regneeksempel');
 assert.throws(()=>validateHomepagePublicLinks(q,[{cta:{href:'/#regneeksempel'}}]),/regneeksempel/);
});
test('all non-Hero modules may be absent without deleting their library masters',()=>{
 assert.deepEqual(resolveHomepageSections({sections:[]}),[]);
 const p=structuredClone(input);p.sections=[];assert.equal(pageSchema.safeParse(p).success,false,'actual inbound price/contact CTAs still require valid targets');
});
