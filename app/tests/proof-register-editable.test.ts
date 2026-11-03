import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';
import {proofCaseSchema,proofContentSchema,getPublishableCases} from '../src/lib/proof.ts';

const config=YAML.parse(readFileSync('../.pages.yml','utf8'));
const editor=config.content.find((x:any)=>x.name==='proofCases');
const read=(id:string)=>JSON.parse(readFileSync('src/content/proof/'+id+'.json','utf8'));

test('every Proof Register field is editable, including nested evidence and publication controls',()=>{
  assert.ok(editor);
  const visit=(fields:any[])=>fields.forEach(field=>{
    assert.notEqual(field.readonly,true,'Read-only proof register field: '+field.name);
    if(field.fields)visit(field.fields);
  });
  visit(editor.fields);
  assert.equal(editor.operations.create,true);
  assert.equal(editor.operations.rename,false,'identity changes need coordinated reference updates');
  assert.equal(editor.operations.delete,false,'existing proof refs must remain resolvable');
  assert.ok(editor.fields.find((f:any)=>f.name==='id'));
  assert.ok(editor.fields.find((f:any)=>f.name==='publicationApproved'));
  assert.ok(editor.fields.find((f:any)=>f.name==='publicationStatus'));
});

test('CMS can override actual case values, metadata and add an optional origin thread key',()=>{
  const source=read('eurotents'),edited=structuredClone(source);
  edited.clientName='Ny kundeoverskrift';
  edited.dominantMetric='Ny og dokumentert måledefinisjon';
  edited.before='5x';
  edited.after='18x';
  edited.period.before='før';
  edited.period.after='etter';
  edited.period.comparable=true;
  edited.source='Redigert kilde og underlag';
  edited.originKey='H017C / https://example.com/case-trad';
  edited.artifactReferences=['coordination/H017C-PROOF-PUBLISH.md'];
  edited.evidenceMetrics=[{metric:'syntetisk tall',before:'1',after:'2',delta:null,nextPeriod:null,timeframe:null}];
  edited.publicationStatus='PUBLISHABLE';
  edited.publicationApproved=true;
  const persisted=JSON.parse(cmsJsonSave(source,edited,entryForFile(config,'app/src/content/proof/eurotents.json'),config));
  assert.deepEqual(proofContentSchema.parse(persisted),proofContentSchema.parse(edited));
  assert.equal(proofCaseSchema.safeParse(persisted).success,true);
  const visible=getPublishableCases({publicationApproved:true,caseIds:['eurotents']},[persisted]);
  assert.equal(visible[0].displayName,'Ny kundeoverskrift');
  assert.equal(visible[0].before,'5x');
  assert.equal(visible[0].after,'18x');
  assert.ok(!JSON.stringify(visible[0]).includes(edited.originKey),'origin metadata is never public');
  const original=read('eurotents');
  assert.equal(original.before,'4,3x','test never writes actual approved proof');
});

test('an editable register cannot bypass existing publication and permission gates',()=>{
  const original=read('eurotents');
  for(const override of [
    {publicationApproved:false},
    {publicationStatus:'WITHDRAWN'},
    {namingPermission:'NEEDS_PERMISSION'},
    {strategyReviewStatus:'READY_FOR_STRATEGY_REVIEW'},
    {before:null},
    {period:{...original.period,comparable:false}},
  ]){
    const edited={...original,...override,originKey:'original-tråd'};
    const result=JSON.parse(cmsJsonSave(original,edited,entryForFile(config,'app/src/content/proof/eurotents.json'),config));
    assert.deepEqual(getPublishableCases({publicationApproved:true,caseIds:['eurotents']},[result]),[],JSON.stringify(override));
  }
});

test('originKey is optional for every existing proof; global case selections remain unchanged',()=>{
  for(const id of ['eurotents','nysta','helt-opplagt','oslo-privatklinikk']){
    const data=read(id);
    assert.equal(proofCaseSchema.safeParse(data).success,true);
    assert.equal(Object.hasOwn(data,'originKey'),false);
  }
  const global=JSON.parse(readFileSync('src/content/global-elements/resultater.json','utf8'));
  assert.deepEqual(global.content.caseIds,['eurotents','nysta','helt-opplagt']);
});
