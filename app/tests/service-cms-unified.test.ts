import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const group=cms.content.find((e:any)=>e.name==='serviceGroup');
const collection=group.items[0];
const roots=readdirSync('src/content/pages').filter(f=>f.endsWith('.json'));
const serviceFiles=roots.filter(file=>JSON.parse(readFileSync('src/content/pages/'+file,'utf8')).kind==='service');

test('All services is the only service menu and has exactly six existing sites',()=>{
 assert.equal(group.items.length,1);
 assert.equal(collection.name,'services');
 assert.equal(collection.label,'Alle tjenester');
 assert.equal(collection.path,'app/src/content/pages');
 assert.deepEqual(collection.operations,{create:true,rename:false,delete:true});
 assert.deepEqual(collection.filename,{template:'{fields.slug}.json',field:false});
 assert.equal(serviceFiles.length,6);
 for(const file of serviceFiles){
  assert.ok(!collection.exclude.includes(file),file);
  const editors=cms.content.flatMap((e:any)=>e.type==='group'?e.items:[e]).filter((e:any)=>e.type==='file'&&e.path==='app/src/content/pages/'+file);
  assert.equal(editors.length,0,'No duplicate dedicated service editor: '+file);
  const entry=entryForFile(cms,'app/src/content/pages/'+file);
  assert.equal(entry?.name,'services',file);
 }
 for(const file of roots.filter(file=>!serviceFiles.includes(file))){
  assert.ok(collection.exclude.includes(file),'Do not allow deleting non-services: '+file);
 }
});

test('All six service sources roundtrip in native CMS model without losing content, global placements, proof or visibility',()=>{
 assert.equal(cms.settings.content.merge,true);
 for(const file of serviceFiles){
  const original=JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));
  const entry=entryForFile(cms,'app/src/content/pages/'+file);
  const saved=JSON.parse(cmsJsonSave(original,structuredClone(original),entry,cms));
  assertPreservedContent(original,saved);
  assert.equal(pageSchema.safeParse(saved).success,true,file);
  assert.deepEqual(saved.sections,original.sections,file+' sections unchanged');
  assert.deepEqual(saved.hero,original.hero,file+' hero unchanged');
  if(original.proof)assert.deepEqual(saved.proof,original.proof,file+' proof remains intact');
  if(original.composition)assert.deepEqual(saved.composition,original.composition,file+' special composition remains intact');
 }
});

test('Create uses existing SEO/Hero/Sections editor, fixed service kind and validated unique slug',()=>{
 const fields=collection.fields;
 assert.deepEqual(fields.slice(0,3).map((f:any)=>f.name),['slug','seo','hero']);
 const slug=fields[0];
 assert.equal(slug.readonly,undefined,'Create requires writable slug');
 assert.equal(slug.required,true);
 assert.equal(fields.find((f:any)=>f.name==='kind').default,'service');
 assert.equal(fields.find((f:any)=>f.name==='kind').hidden,true);
 const section=fields.find((f:any)=>f.name==='sections');
 const names=section.blocks.map((b:any)=>b.name);
 for(const name of ['content','global','protected','pageList','sharedContent'])assert.ok(names.includes(name));
 const content=cms.components.synlighetSectionContent;
 assert.ok(content.fields.some((f:any)=>f.name==='visibility'),'Preserve Synlighet visibility in a single editor');
 const base=JSON.parse(readFileSync('src/content/pages/seo.json','utf8'));
 const page={...base,slug:'example-new-service',seo:{...base.seo,title:'Example new service'}};
 assert.equal(pageSchema.safeParse(page).success,true);
});
