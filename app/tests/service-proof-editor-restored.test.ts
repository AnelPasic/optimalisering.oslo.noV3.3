import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {entryForFile,cmsJsonSave} from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const read=(slug:string)=>JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));

test('OWNER-restored local proof editor uses the original optional field and preserved evidence references',()=>{
  const service=entryForFile(cms,'app/src/content/pages/konvertering.json');
  const field=service.fields.find((f:any)=>f.name==='proof');
  assert.ok(field,'local service proof editor is restored');
  assert.equal(field.type,'object');
  assert.equal(field.required,false);
  assert.notEqual(field.hidden,true);
  assert.deepEqual(field.fields.map((f:any)=>f.name),[
    'publicationApproved','caseIds','eyebrow','heading','beforeLabel','afterLabel','changeLabel'
  ]);
  assert.equal(field.fields.find((f:any)=>f.name==='publicationApproved').readonly,true);
  const picker=field.fields.find((f:any)=>f.name==='caseIds');
  assert.equal(picker.type,'reference');
  assert.equal(picker.options.collection,'proofCases');
  assert.equal(picker.options.multiple,true);
  const global=cms.content.find((e:any)=>e.name==='globalElements').items.find((e:any)=>e.name==='globalProof');
  const registry=cms.content.find((e:any)=>e.name==='proofCases');
  assert.ok(global&&registry,'global proof and internal evidence editors remain available');
  assert.ok(global.fields.find((f:any)=>f.name==='content').fields.some((f:any)=>f.name==='displayOverrides'));
});

test('restoring the editor does not modify approved and unapproved proof records',()=>{
  assert.equal(cms.settings.content.merge,true);
  for(const slug of ['konvertering','nettbutikkoptimalisering']){
    const original=read(slug);
    assert.ok(original.proof,'pre-existing local proof expected: '+slug);
    const editor=entryForFile(cms,`app/src/content/pages/${slug}.json`);
    const roundtrip=JSON.parse(cmsJsonSave(original,original,editor,cms));
    assert.deepEqual(roundtrip.proof,original.proof,slug+' proof must survive CMS serialization');
    assert.deepEqual(roundtrip.sections,original.sections);
  }
  assert.deepEqual(read('konvertering').proof.caseIds,['nysta']);
  assert.equal(read('konvertering').proof.publicationApproved,true);
  assert.equal(read('nettbutikkoptimalisering').proof.publicationApproved,false);
  assert.equal(read('lokal-seo').proof,undefined,'no dummy proof inserted into empty service');
  assert.deepEqual(read('lokal-seo').sections,[]);
});
