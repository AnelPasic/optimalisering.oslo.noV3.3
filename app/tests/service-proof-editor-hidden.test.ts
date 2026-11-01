import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {entryForFile,cmsJsonSave} from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const read=(slug:string)=>JSON.parse(readFileSync(`src/content/pages/${slug}.json`,'utf8'));

test('service editor has no local proof fields, keeps global master and evidence register',()=>{
 const editor=entryForFile(cms,'app/src/content/pages/konvertering.json');
 assert.equal(editor.fields.some((f:any)=>f.name==='proof'),false);
 const blocks=editor.fields.find((f:any)=>f.name==='sections').blocks.map((b:any)=>b.name);
 for(const expected of ['content','protected','pageList','global','sharedContent','pricingBridge','pageFaq','closingCta'])
   assert.ok(blocks.includes(expected));
 assert.equal(blocks.includes('proof'),false);
 const global=cms.content.find((e:any)=>e.name==='globalElements').items.find((e:any)=>e.name==='globalProof');
 const registry=cms.content.find((e:any)=>e.name==='proofCases');
 assert.ok(global&&registry);
 assert.ok(global.fields.find((f:any)=>f.name==='content').fields.some((f:any)=>f.name==='displayOverrides'));
});

test('CMS saves services without creating or restoring local proof',()=>{
 assert.equal(cms.settings.content.merge,true);
 for(const slug of ['konvertering','nettbutikkoptimalisering','seo','synlighet','ai-synlighet']){
  const current=read(slug),entry=entryForFile(cms,`app/src/content/pages/${slug}.json`);
  const saved=JSON.parse(cmsJsonSave(current,current,entry,cms));
  assert.deepEqual(saved,current);
  assert.equal(Object.hasOwn(saved,'proof'),false);
  assert.equal(saved.sections.some((s:any)=>s._block==='proof'),false);
 }
});
