import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {getHomepageBlocks,isHomepageSectionVisible,globalElementIds,validateHomepagePublicLinks} from '../src/lib/home-builder.ts';

const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const baseline=JSON.parse(readFileSync('../coordination/evidence/h024a8g/incoming-home.json','utf8'));
const hashes=JSON.parse(readFileSync('../coordination/evidence/h024a8g/incoming-hashes.json','utf8')).files;
const order=['regneeksempel','resultater','priser','sjekk','sporsmal'];
test('D-105 composition B preserves all source fields except approved placements and local visibility',()=>{
 const expected=structuredClone(baseline);
 expected.topSections.find((s:any)=>s.id==='forbehovsvelger').visibility='hidden';
 expected.sections=order.map(id=>baseline.sections.find((s:any)=>s.element===id));
 assert.deepEqual(home,expected);
 assert.deepEqual(getHomepageBlocks(home).filter(isHomepageSectionVisible).map(s=>s.id),order);
 for(const id of globalElementIds){
  const path=`app/src/content/global-elements/${id}.json`;
  if(id==='resultater'){
   // D-107/H-022C permits presentation media changes, never proof authority/copy.
   const {content,...identity}=JSON.parse(readFileSync('../'+path,'utf8'));
   const {featuredVisual,...locked}=content;
   assert.deepEqual(identity,{_block:'proof',uid:'ac0c6119-b0b8-4739-abd0-7ad7833e5556',id:'resultater',name:'Kunderesultater'});
   assert.deepEqual(locked,{publicationApproved:true,caseIds:['eurotents','nysta','helt-opplagt'],eyebrow:'Dokumenterte resultater',heading:'Resultater fra kundearbeid',beforeLabel:'Før',afterLabel:'Etter',changeLabel:'Arbeid'});
   continue;
  }
  assert.equal(createHash('sha256').update(readFileSync('../'+path)).digest('hex'),hashes[path],id);
 }
});
test('B retains actual price/check anchors and rejects missing, hidden and incoming removed-anchor targets',()=>{
 assert.doesNotThrow(()=>validateHomepagePublicLinks(home,[]));
 for(const id of ['priser','sjekk']){
  assert.throws(()=>validateHomepagePublicLinks({...home,sections:home.sections.filter((s:any)=>s.element!==id)},[]));
  assert.throws(()=>validateHomepagePublicLinks({...home,sections:home.sections.map((s:any)=>s.element===id?{...s,visibility:'hidden'}:s)},[]));
 }
 for(const id of ['behov','mekanisme','passer'])assert.throws(()=>validateHomepagePublicLinks(home,[{kind:'service',cta:{href:`/#${id}`}}]));
});
