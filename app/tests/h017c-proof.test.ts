import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {getPublishableCases,proofContentSchema} from '../src/lib/proof.ts';
import {getHomepageBlock} from '../src/lib/home-builder.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';

const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const cases=readdirSync('src/content/proof').filter(p=>p.endsWith('.json')).map(p=>read('src/content/proof/'+p));
const global=read('src/content/global-elements/resultater.json');
const home=read('src/content/pages/home.json');
const conversion=read('src/content/pages/konvertering.json');
const netshop=read('src/content/pages/nettbutikkoptimalisering.json');

test('approved global and conversion cases retain their exact original public projection',()=>{
  assert.deepEqual(getPublishableCases(getHomepageBlock(home,'proof').content,cases).map(c=>c.displayName),['Eurotents','Nysta','Helt Opplagt']);
  const local=conversion.sections.find((s:any)=>s._block==='proof');
  assert.ok(local);
  assert.equal(local.id,'resultater');
  assert.deepEqual(getPublishableCases(local.presentation,cases).map(c=>c.displayName),['Nysta']);
  assert.equal(local.presentation.beforeLabel,'Før');
  assert.equal(local.presentation.heading,'Fullført checkout økte fra 7,1 % til 43,6 %');
  assert.equal(Object.hasOwn(conversion,'proof'),false,'no competing top-level proof');
  assert.deepEqual(getPublishableCases(netshop.sections.find((s:any)=>s._block==='proof').presentation,cases),[]);
  assert.equal(netshop.sections.find((s:any)=>s._block==='proof').visibility,'hidden');
  assert.ok(global.content.publicationApproved);
});

test('proof gate rejects invalid, unauthorized and non-comparable records after relocation',()=>{
 const slot=conversion.sections.find((s:any)=>s._block==='proof').presentation;
 for(const id of ['eurotents','nysta','helt-opplagt']){
  const record=cases.find(r=>r.id===id);
  for(const mutation of [{period:{...record.period,comparable:false}},{publicationApproved:false},{namingPermission:'NEEDS_PERMISSION'},{strategyReviewStatus:'READY_FOR_STRATEGY_REVIEW'},{before:null}]){
   assert.deepEqual(getPublishableCases({...slot,caseIds:[id]},[proofContentSchema.parse({...record,...mutation})]),[]);
  }
 }
 assert.equal(pageSchema.safeParse({...conversion,proof:slot}).success,false);
});

test('Pages CMS presents the local approved proof solely inside the ordered section list',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const editor=entryForFile(cms,'app/src/content/pages/konvertering.json');
 assert.equal(editor.fields.some((f:any)=>f.name==='proof'),false);
 const sections=editor.fields.find((f:any)=>f.name==='sections');
 const proof=sections.blocks.find((block:any)=>block.name==='proof');
 assert.ok(proof);
 assert.equal(proof.fields.find((f:any)=>f.name==='presentation').fields.find((f:any)=>f.name==='publicationApproved').readonly,true);
 const saved=JSON.parse(cmsJsonSave(conversion,conversion,editor,cms));
 assert.deepEqual(saved,conversion);
 assert.equal(pageSchema.safeParse(saved).success,true);
 const registry=cms.content.find((entry:any)=>entry.name==='proofCases');
 for(const op of ['create','rename','delete'])assert.equal(registry.operations[op],false);
});
