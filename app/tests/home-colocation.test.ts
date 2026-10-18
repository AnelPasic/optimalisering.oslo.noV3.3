import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';
const source=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
test('fixed homepage has eight co-located object editors after Hero and no duplicated sources',()=>{
 assert.equal(Object.keys(source.sections).length,8);assert.deepEqual(Object.keys(source.homepage),['chrome']);assert.equal(source.faq,undefined);
 for(const block of Object.values<any>(source.sections))if(block._block!=='content')assert.ok(block.content,block._block);
 const entry=entryForFile(cms,'app/src/content/pages/home.json');assert.deepEqual(entry.fields.map((f:any)=>f.name),['seo','hero','sections','optionalSections','homepage']);
 const sections=entry.fields[2];assert.equal(sections.type,'object');assert.equal(sections.list,undefined);
 for(const b of sections.fields)if(!['mekanisme','passer'].includes(b.name))assert.ok(b.fields.find((f:any)=>f.name==='content')?.fields?.length,b.name);
});

test('primary schema rejects every cloned singleton, mutated UID and missing core record',()=>{
 for(const id of Object.keys(source.sections)){
  for(const change of [(p:any)=>delete p.sections[id],(p:any)=>p.sections[id].uid=randomUUID(),(p:any)=>p.sections[id]._block='unknown',(p:any)=>p.sections.clone=p.sections[id]]){const p=structuredClone(source);change(p);assert.equal(pageSchema.safeParse(p).success,false,id);}
 }
});

test('fixed co-located content edits preserve every unrelated payload and protected field',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/home.json'),p=structuredClone(source);p.sections.mekanisme.heading+=' CMS';
 const saved=JSON.parse(cmsJsonSave(source,p,entry,cms));assertPreservedContent(p,saved);assert.equal(pageSchema.safeParse(saved).success,true);
 const restored=JSON.parse(cmsJsonSave(saved,source,entry,cms));assertPreservedContent(source,restored);
 const invalid=structuredClone(source);delete invalid.sections.sjekk;assert.throws(()=>cmsJsonSave(source,invalid,entry,cms),/required/);
});
