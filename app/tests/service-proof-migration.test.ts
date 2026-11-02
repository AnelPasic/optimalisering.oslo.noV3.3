import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {entryForFile,cmsJsonSave} from './helpers/pages-cms-json.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {resolveRouteFamily} from '../src/lib/route-family.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const read=(slug:string)=>JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));

test('only one case editor remains: global Kunderesultater plus internal evidence registry',()=>{
 const service=entryForFile(cms,'app/src/content/pages/konvertering.json');
 assert.ok(!service.fields.some((field:any)=>field.name==='proof'),'no local proof form, including invisible readonly fields');
 assert.ok(service.fields.find((field:any)=>field.name==='sections').blocks.some((block:any)=>block.name==='proofList'));
 const global=cms.content.find((entry:any)=>entry.name==='globalElements').items.find((entry:any)=>entry.name==='globalProof');
 const registry=cms.content.find((entry:any)=>entry.name==='proofCases');
 assert.ok(global&&registry,'master and internal registry preserved');
 assert.ok(global.fields.find((field:any)=>field.name==='content').fields.some((field:any)=>field.name==='displayOverrides'));
});

test('Konvertering proof migrated to its approved Nysta ProofList, no automatic duplicate',()=>{
 const page=read('konvertering');
 assert.equal(Object.hasOwn(page,'proof'),false);
 assert.equal(Object.hasOwn(page.composition.service,'proofAfter'),false);
 const sections=page.sections.filter((section:any)=>section._block==='proofList');
 assert.equal(sections.length,1);
 assert.deepEqual(sections[0].proofList.entries,[{caseId:'nysta'}]);
 assert.equal(resolveRouteFamily(page).service.proofAfter,undefined);
 assert.equal(pageSchema.safeParse(page).success,true);
 const entry=entryForFile(cms,'app/src/content/pages/konvertering.json');
 const saved=JSON.parse(cmsJsonSave(page,page,entry,cms));
 assert.equal(saved.proof,undefined);
 assert.deepEqual(saved.sections,page.sections);
 assert.deepEqual(saved.composition,page.composition);
});

test('Nettbutikkoptimalisering retains its chosen public ProofList and removes unpublished legacy draft',()=>{
 const page=read('nettbutikkoptimalisering');
 assert.equal(Object.hasOwn(page,'proof'),false);
 assert.deepEqual(page.sections.filter((section:any)=>section._block==='proofList').map((section:any)=>section.proofList),[
   {layout:'mediaCards',entries:[{caseId:'helt-opplagt'},{caseId:'eurotents'}]}
 ]);
 assert.equal(pageSchema.safeParse(page).success,true);
 const entry=entryForFile(cms,'app/src/content/pages/nettbutikkoptimalisering.json');
 const saved=JSON.parse(cmsJsonSave(page,page,entry,cms));
 assert.equal(saved.proof,undefined);
 assert.deepEqual(saved.sections,page.sections);
});

test('no remaining service acquires a blank/read-only proof on save',()=>{
 assert.equal(cms.settings.content.merge,true);
 for(const slug of ['synlighet','seo','ai-synlighet','lokal-seo','konvertering','nettbutikkoptimalisering']){
  const original=read(slug);
  assert.equal(original.proof,undefined,slug+' has no local proof');
  const editor=entryForFile(cms,`app/src/content/pages/${slug}.json`);
  const saved=JSON.parse(cmsJsonSave(original,original,editor,cms));
  assert.equal(saved.proof,undefined,slug+' save does not reintroduce proof');
  assert.deepEqual(saved.sections??[],original.sections??[]);
 }
 assert.deepEqual(read('lokal-seo').sections,[]);
});
