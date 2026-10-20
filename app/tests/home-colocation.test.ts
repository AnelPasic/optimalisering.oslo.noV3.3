import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {globalElementIds} from '../src/lib/home-builder.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent,localHomeFixture} from './helpers/pages-cms-json.ts';
const source=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
test('stock CMS has Hero then one native draggable list and one protected typed library',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/home.json');
 assert.deepEqual(entry.fields.map((f:any)=>f.name),['hero','sections','seo','homepage']);
 for(const name of ['sections']){
  const zone=entry.fields.find((f:any)=>f.name===name);assert.equal(zone.type,'block');assert.ok(zone.list);assert.equal(zone.list.min,undefined);assert.equal(zone.list.max,56);assert.equal(zone.label,'Innholdsseksjoner');assert.equal(zone.blockKey,'_block');
  const ref=zone.blocks.find((b:any)=>b.name==='global');assert.deepEqual(ref.fields.find((f:any)=>f.name==='element').options.values.map((v:any)=>v.name),globalElementIds);
  assert.ok(!ref.fields.some((f:any)=>['content','uid','id'].includes(f.name)));
 }
 for(const file of cms.content.find((e:any)=>e.name==='globalElements').items){assert.deepEqual(file.operations,{create:false,rename:false,delete:false});for(const id of ['uid','id','_block'])assert.equal(file.fields.find((f:any)=>f.name===id).readonly,true);}
});
test('raw page schema rejects duplicate, unknown and copied modules while allowing removal of unlinked instances',()=>{
 for(const edit of [(p:any)=>p.sections.push(p.sections[0]),(p:any)=>p.sections[0].element='unknown',(p:any)=>p.sections[0].content={heading:'copy'}]){
  const p=structuredClone(source);edit(p);assert.equal(pageSchema.safeParse(p).success,false);
 }
 const p=structuredClone(source);p.sections=p.sections.filter((s:any)=>s.element!=='regneeksempel');assert.ok(pageSchema.safeParse(p).success);
});
test('local co-located content edits and native row order survive CMS save/restore without changing any master',()=>{
 const original=localHomeFixture(),form=structuredClone(original),entry=entryForFile(cms,'app/src/content/pages/home.json');
 const snapshots=globalElementIds.map(id=>readFileSync('src/content/global-elements/'+id+'.json'));
 form.sections[0].heading+=' CMS';form.sections.reverse();
 const saved=JSON.parse(cmsJsonSave(original,form,entry,cms));assertPreservedContent(form,saved);assert.ok(pageSchema.safeParse(saved).success);
 const restored=JSON.parse(cmsJsonSave(saved,original,entry,cms));assertPreservedContent(original,restored);
 globalElementIds.forEach((id,i)=>assert.ok(readFileSync('src/content/global-elements/'+id+'.json').equals(snapshots[i])));
});
