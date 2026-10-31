import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {entryForFile,cmsJsonSave} from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const read=(slug:string)=>JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));

test('service editors hide the obsolete local proof form, keeping global proof and evidence editable',()=>{
  const service=entryForFile(cms,'app/src/content/pages/lokal-seo.json');
  const legacy=service.fields.find((f:any)=>f.name==='proof');
  assert.equal(legacy.hidden,true);
  assert.equal(legacy.required,false);
  assert.equal(read('lokal-seo').proof,undefined,'Lokal SEO uses the global proof placement, not local proof data');
  assert.ok(read('lokal-seo').sections.some((s:any)=>s._block==='global'&&s.element==='resultater'));
  const global=cms.content.find((e:any)=>e.name==='globalElements').items.find((e:any)=>e.name==='globalProof');
  const registry=cms.content.find((e:any)=>e.name==='proofCases');
  assert.ok(global && registry,'global editor and evidence registry remain available');
  assert.ok(global.fields.find((f:any)=>f.name==='content').fields.some((f:any)=>f.name==='displayOverrides'));
});

test('CMS merge preserves existing local proof records when editors omit the hidden field',()=>{
  assert.equal(cms.settings.content.merge,true);
  for(const slug of ['konvertering','nettbutikkoptimalisering']){
    const original=read(slug);
    assert.ok(original.proof,'existing legacy proof must remain in '+slug);
    const form=structuredClone(original);
    delete form.proof; // hidden field is not submitted from service editor
    const entry=entryForFile(cms,`app/src/content/pages/${slug}.json`);
    const saved=JSON.parse(cmsJsonSave(original,form,entry,cms));
    assert.deepEqual(saved.proof,original.proof,slug+' proof survives editor save');
    assert.deepEqual(saved.sections,original.sections);
  }
});
