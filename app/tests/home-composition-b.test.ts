import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getHomepageBlocks,isHomepageSectionVisible,globalElementIds,getGlobalElement,validateHomepagePublicLinks} from '../src/lib/home-builder.ts';

const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
test('composition B shared authority survives OWNER placements and single-list migration',()=>{
 // OWNER may reorder/add placements; B preserves its shared content authority.
 assert.deepEqual(getHomepageBlocks(home).filter(isHomepageSectionVisible).map(s=>s.id),home.sections.filter((s:any)=>s.visibility!=='hidden').map((s:any)=>s.element??s.id));
 assert.ok(!Object.hasOwn(home,'topSections')&&!Object.hasOwn(home,'bottomSections'));
 for(const id of globalElementIds){
  const instance=getHomepageBlocks(home).find(block=>block.id===id);
  if(instance)assert.deepEqual({...instance,visibility:undefined},{...getGlobalElement(id),visibility:undefined},id);
 }
});
test('B retains actual price/check anchors and rejects missing, hidden and incoming removed-anchor targets',()=>{
 assert.doesNotThrow(()=>validateHomepagePublicLinks(home,[]));
 for(const id of ['priser','sjekk']){
  assert.throws(()=>validateHomepagePublicLinks({...home,sections:home.sections.filter((s:any)=>s.element!==id)},[]));
  assert.throws(()=>validateHomepagePublicLinks({...home,sections:home.sections.map((s:any)=>s.element===id?{...s,visibility:'hidden'}:s)},[]));
 }
 for(const id of ['mekanisme','passer'])assert.throws(()=>validateHomepagePublicLinks(home,[{kind:'service',cta:{href:`/#${id}`}}]));
});
