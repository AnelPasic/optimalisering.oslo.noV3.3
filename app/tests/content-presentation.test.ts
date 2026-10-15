import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,resolveField,assertPreservedContent} from './helpers/pages-cms-json.ts';
const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const normal=(p:any)=>p.sections.find((s:any)=>s._block==='content');

test('ordinary layout and box choices survive primary ingestion independently of surfaces',()=>{
 for(const layout of ['default','two-columns','three-columns','stacked'])for(const boxVariant of ['default','plain','card']){
  const p=structuredClone(home),s=normal(p);s.layout=layout;s.items[0].boxVariant=boxVariant;s.surface='mint';s.items[0].surface='dark';
  const parsed=normal(pageSchema.parse(p));assert.equal(parsed.layout,layout);assert.equal(parsed.items[0].boxVariant,boxVariant);assert.equal(parsed.surface,'mint');assert.equal(parsed.items[0].surface,'dark');
 }
 for(const value of ['grid-cols-8','custom','#fff',{},12])for(const field of ['layout','boxVariant']){
  const p=structuredClone(home),s=normal(p);(field==='layout'?s:s.items[0])[field]=value;assert.equal(pageSchema.safeParse(p).success,false);
 }
});

test('new presentation fields preserve automatic rendering defaults and reject protected use',()=>{
 for(const empty of [undefined,null,'','default']){const p=structuredClone(home),s=normal(p);s.layout=empty;s.items[0].boxVariant=empty;const parsed=normal(pageSchema.parse(p));assert.equal(parsed.layout,'default');assert.equal(parsed.items[0].boxVariant,'default');}
 for(const type of ['selector','calculator','packages','proof','assessment','faq']){const p=structuredClone(home);p.sections.find((s:any)=>s._block===type).layout='stacked';assert.equal(pageSchema.safeParse(p).success,false,type);}
 const service=JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
 for(const field of ['layout','boxVariant']){const p=structuredClone(service),s=p.sections.find((s:any)=>s._block==='protected');if(field==='layout')s.layout='stacked';else{s.items=[{title:'Test',text:'Test',boxVariant:'card'}];}assert.equal(pageSchema.safeParse(p).success,false,field);}
});

test('co-located CMS choices expose semantics and round-trip variant/reorder without authority changes',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/home.json'),sections=entry.fields.find((f:any)=>f.name==='sections'),content=sections.blocks.find((b:any)=>b.name==='content');
 const layout=resolveField(content.fields.find((f:any)=>f.name==='layout'),cms.components),items=content.fields.find((f:any)=>f.name==='items'),box=resolveField(items.fields.find((f:any)=>f.name==='boxVariant'),cms.components);
 assert.equal(layout.type,'select');assert.deepEqual(layout.options.values.map((v:any)=>v.name),['default','two-columns','three-columns','stacked']);
 assert.equal(box.type,'select');assert.deepEqual(box.options.values.map((v:any)=>v.name),['default','plain','card']);
 assert.equal(sections.list.min,8);assert.equal(sections.list.max,8);
 for(const b of sections.blocks.filter((b:any)=>b.name!=='content'))assert.ok(!JSON.stringify(b.fields).includes('contentLayoutChoice')&&!JSON.stringify(b.fields).includes('boxVariantChoice'));
 const p=structuredClone(home),s=normal(p);s.layout='stacked';s.items[0].boxVariant='card';p.sections.reverse();
 const saved=JSON.parse(cmsJsonSave(home,p,entry,cms));assertPreservedContent(p,saved);assert.equal(pageSchema.safeParse(saved).success,true);
 const restored=JSON.parse(cmsJsonSave(saved,home,entry,cms));assertPreservedContent(home,restored);
});
