import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {entryForFile,cmsJsonSave} from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const read=(slug:string)=>JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));

test('all service types use one section builder; no obsolete top-level proof editor',()=>{
 const editor=entryForFile(cms,'app/src/content/pages/lokal-seo.json');
 assert.equal(editor.fields.some((f:any)=>f.name==='proof'),false);
 const blocks=editor.fields.find((f:any)=>f.name==='sections').blocks.map((b:any)=>b.name);
 for(const expected of ['content','protected','pageList','global','sharedContent','proof','pricingBridge','pageFaq','closingCta'])assert.ok(blocks.includes(expected));
 assert.equal(read('lokal-seo').proof,undefined);
 assert.ok(read('lokal-seo').sections.some((s:any)=>s._block==='global'&&s.element==='resultater'));
 const global=cms.content.find((e:any)=>e.name==='globalElements').items.find((e:any)=>e.name==='globalProof');
 const registry=cms.content.find((e:any)=>e.name==='proofCases');
 assert.ok(global&&registry);
 assert.ok(global.fields.find((f:any)=>f.name==='content').fields.some((f:any)=>f.name==='displayOverrides'));
});

test('existing approved and draft local cases move into movable blocks without changing evidence',()=>{
 assert.equal(cms.settings.content.merge,true);
 const approved=read('konvertering'),draft=read('nettbutikkoptimalisering');
 const oldValues=[['konvertering','nysta',true],['nettbutikkoptimalisering','eurotents',false]];
 for(const [slug,id,isApproved] of oldValues){
  const current=read(String(slug)),proof=current.sections.find((s:any)=>s._block==='proof');
  assert.ok(proof,slug);
  assert.equal(proof.presentation.caseIds.includes(id),true);
  assert.equal(proof.presentation.publicationApproved,isApproved);
  assert.equal(current.proof,undefined);
  const editor=entryForFile(cms,`app/src/content/pages/${slug}.json`);
  const saved=JSON.parse(cmsJsonSave(current,current,editor,cms));
  assert.deepEqual(saved,current,'CMS roundtrip must preserve all migrated values');
 }
 assert.equal(draft.sections.find((s:any)=>s._block==='proof').visibility,'hidden');
 assert.equal(approved.sections.find((s:any)=>s._block==='proof').visibility,undefined);
});
