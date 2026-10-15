import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';
const source=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
test('homepage has eight co-located editors after Hero and no old editable section sources',()=>{
 assert.equal(source.sections.length,8);assert.deepEqual(Object.keys(source.homepage),['chrome']);assert.equal(source.faq,undefined);
 for(const block of source.sections)if(block._block!=='content')assert.ok(block.content,block._block);
 const entry=entryForFile(cms,'app/src/content/pages/home.json');assert.deepEqual(entry.fields.map((f:any)=>f.name),['seo','hero','sections','homepage']);
 const sections=entry.fields[2];assert.equal(sections.label,'Seksjoner');assert.equal(sections.list.min,8);assert.equal(sections.list.max,8);
 for(const b of sections.blocks)if(b.name!=='content')assert.ok(b.fields.find((f:any)=>f.name==='content')?.fields?.length,b.name);
});
test('primary page schema rejects each duplicate singleton, UID, anchor and missing required identity',()=>{
 assert.equal(pageSchema.safeParse(source).success,true);
 for(const type of ['selector','calculator','packages','proof','assessment','faq']){
  const p=structuredClone(source),b=structuredClone(p.sections.find((s:any)=>s._block===type));b.uid=randomUUID();p.sections.push(b);
  const result=pageSchema.safeParse(p);assert.equal(result.success,false,type);if(!result.success)assert.match(JSON.stringify(result.error.issues),/Duplicate homepage singleton/);
 }
 for(const change of [(p:any)=>p.sections[1].uid=p.sections[0].uid,(p:any)=>p.sections[5].id=p.sections[4].id,(p:any)=>p.sections.pop(),(p:any)=>p.sections[0]._block='unknown']){const p=structuredClone(source);change(p);assert.equal(pageSchema.safeParse(p).success,false);}
});
test('co-located CMS reorder replaces the array without losing any payload or protected field',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/home.json'),p=structuredClone(source),i=p.sections.findIndex((s:any)=>s._block==='packages');p.sections.unshift(p.sections.splice(i,1)[0]);
 const saved=JSON.parse(cmsJsonSave(source,p,entry,cms));assertPreservedContent(p,saved);assert.equal(pageSchema.safeParse(saved).success,true);
 const restored=JSON.parse(cmsJsonSave(saved,source,entry,cms));assertPreservedContent(source,restored);
 const invalid=structuredClone(source);invalid.sections.push(invalid.sections[0]);assert.throws(()=>cmsJsonSave(source,invalid,entry,cms),/list bounds/);
});
