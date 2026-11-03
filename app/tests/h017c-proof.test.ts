import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {getHomepageBlock} from '../src/lib/home-builder.ts';
import {getPublishableCases,proofContentSchema} from '../src/lib/proof.ts';
import {resolveProofListContent} from '../src/lib/proof-list.ts';
import {homepageBlockSchema} from '../src/lib/home-builder.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,resolveField,homepageBlockEditor} from './helpers/pages-cms-json.ts';

const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const registry=readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>read(`src/content/proof/${f}`));
const global=read('src/content/global-elements/resultater.json');
const home=read('src/content/pages/home.json');
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));

test('public proofs are rendered from global evidence and per-page ProofList selection',()=>{
 assert.deepEqual(getPublishableCases(getHomepageBlock(home,'proof').content,registry).map(p=>p.displayName),['Eurotents','Nysta','Helt Opplagt']);
 for(const [slug,expected] of [
  ['konvertering',['Nysta']],
  ['nettbutikkoptimalisering',['Helt Opplagt','Eurotents']]
 ] as const){
  const page=read(`src/content/pages/${slug}.json`);
  assert.equal(page.proof,undefined,'old local proof must be absent');
  const sections=page.sections.filter((row:any)=>row._block==='proofList');
  assert.equal(sections.length,1,'one new proof placement');
  const effective=resolveProofListContent(global.content,sections[0].proofList,registry);
  assert.deepEqual(getPublishableCases(effective,registry).map(p=>p.displayName),expected);
 }
 assert.deepEqual(getPublishableCases({publicationApproved:true,caseIds:['oslo-privatklinikk']},registry),[]);
});

test('proof evidence gates block withdrawn/incomplete/nameless data',()=>{
 for(const id of ['eurotents','nysta','helt-opplagt']){
  const source=registry.find(x=>x.id===id);
  assert.ok(source);
  for(const mutation of [{period:{...source.period,comparable:false}},{publicationApproved:false},{namingPermission:'NEEDS_PERMISSION'},{strategyReviewStatus:'READY_FOR_STRATEGY_REVIEW'},{before:null}]){
   assert.deepEqual(getPublishableCases({publicationApproved:true,caseIds:[id]},[proofContentSchema.parse({...source,...mutation})]),[]);
  }
 }
});

test('Pages CMS saves ordered ProofList without an editable old local proof object',()=>{
 for(const slug of ['konvertering','nettbutikkoptimalisering']){
  const original=read(`src/content/pages/${slug}.json`);
  const editor=entryForFile(cms,`app/src/content/pages/${slug}.json`);
  assert.equal(editor.fields.some((f:any)=>f.name==='proof'),false);
  const saved=JSON.parse(cmsJsonSave(original,structuredClone(original),editor,cms));
  assert.deepEqual(saved.sections,original.sections);
  assert.equal(saved.proof,undefined);
  assert.equal(pageSchema.safeParse(saved).success,true,slug);
 }
 const original=structuredClone(global);
 const form=structuredClone(global);
 form.content.heading='Dokumenterte resultater';
 form.content.caseIds=['nysta'];
 const entry=entryForFile(cms,'app/src/content/global-elements/resultater.json');
 const saved=JSON.parse(cmsJsonSave(original,form,entry,cms));
 assert.deepEqual(getPublishableCases(saved.content,registry).map(p=>p.displayName),['Nysta']);
 assert.equal(homepageBlockSchema.safeParse(saved).success,true);
 const localProof=entryForFile(cms,'app/src/content/pages/konvertering.json').fields.find((f:any)=>f.name==='proof');
 assert.equal(localProof,undefined);
 const master=resolveField(homepageBlockEditor(cms,'proof'),cms.components);
 assert.equal(master.fields.find((f:any)=>f.name==='publicationApproved').readonly,true);
 const evidence=cms.content.find((c:any)=>c.name==='proofCases');
 const editable=(rows:any[])=>rows.forEach(f=>{
   assert.notEqual(f.readonly,true,'proof register must allow editing '+f.name);
   if(f.fields)editable(f.fields);
 });
 editable(evidence.fields);
 assert.equal(evidence.operations.create,true,'new cases may be added directly in CMS');
 assert.equal(evidence.operations.rename,false,'renaming an ID needs updating existing references');
 assert.equal(evidence.operations.delete,false,'deleting approved evidence needs explicit migration');
 assert.equal(evidence.fields.find((f:any)=>f.name==='originKey').required,false);
});
