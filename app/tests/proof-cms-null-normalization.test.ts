import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getPublishableCases,proofCaseSchema,proofContentSchema} from '../src/lib/proof.ts';
import {resolveProofListContent} from '../src/lib/proof-list.ts';

const read=(name:string)=>JSON.parse(readFileSync('src/content/proof/'+name+'.json','utf8'));
const ids=['eurotents','nysta','helt-opplagt','oslo-privatklinikk'];
const records=ids.map(read);
const master=JSON.parse(readFileSync('src/content/global-elements/resultater.json','utf8')).content;

test('CMS-omitted optional nulls and arrays do not silently revoke approved evidence',()=>{
 for(const id of ids){
  const raw=read(id);
  const normal=proofContentSchema.parse(raw);
  assert.equal(normal.publicationApproved,raw.publicationApproved,id+' retains explicit approval');
  assert.equal(normal.artifactReferences.length,raw.artifactReferences?.length??0);
  assert.equal(normal.evidenceMetrics.length,raw.evidenceMetrics?.length??0);
  assert.equal(proofCaseSchema.safeParse(normal).success,true,id+' becomes structurally complete after normalization');
  const selected={publicationApproved:true,caseIds:[id]};
  const expected=id==='oslo-privatklinikk'?0:1;
  assert.equal(getPublishableCases(selected,[raw]).length,expected,id+' raw source');
  assert.equal(getPublishableCases(selected,[normal]).length,expected,id+' Astro collection schema');
 }
});

test('the real noindex ProofList demo selects valid cases under the current CMS saved data',()=>{
 const configurations=[
  {layout:'inherit',entries:[]},
  {layout:'mediaCards',entries:[{caseId:'nysta'},{caseId:'eurotents'}]},
  {layout:'alternating',entries:[{caseId:'helt-opplagt'},{caseId:'nysta'}]},
  {layout:'mediaCards',entries:[{caseId:'nysta'}]},
 ];
 for(const config of configurations){
  const resolved=resolveProofListContent(master,config,records);
  const expected=config.entries.length?config.entries.map(e=>e.caseId):master.caseIds;
  assert.deepEqual(resolved.caseIds,expected);
  assert.equal(getPublishableCases(resolved,records).length,expected.length);
 }
});

test('missing required evidence or consent still blocks public proof after normalization',()=>{
 const approved=read('eurotents');
 for(const mutation of [
   {publicationApproved:false},{publicationStatus:'WITHDRAWN'},
   {namingPermission:'NEEDS_PERMISSION'},{strategyReviewStatus:'READY_FOR_STRATEGY_REVIEW'},
   {source:''},{before:undefined},{after:null},{permissionEvidence:null},
   {period:{...approved.period,comparable:false}}
 ]){
  const modified={...approved,...mutation};
  const parsed=proofContentSchema.safeParse(modified);
  assert.equal(getPublishableCases({publicationApproved:true,caseIds:['eurotents']},parsed.success?[parsed.data]:[modified]).length,0,JSON.stringify(mutation));
 }
});
