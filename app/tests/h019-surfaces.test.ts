import {sectionRecords} from './helpers/pages-cms-json.ts';
import {homepageBlockEditor} from './helpers/pages-cms-json.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { surfaceAttribute, surfaceValues } from '../src/lib/surface.ts';
import { cmsJsonSave, entryForFile, resolveField, assertPreservedContent, localHomeFixture } from './helpers/pages-cms-json.ts';

const values = ['default','base','soft','mint','lavender','dark'];
const labels = ['Standard','Hvit','Lys','Mint','Lavendel','Plomme'];
const cms = YAML.parse(readFileSync('../.pages.yml','utf8'));
const pages = readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(file=>({file, page:file==='home.json'?localHomeFixture():JSON.parse(readFileSync(`src/content/pages/${file}`,'utf8'))}));
const home = pages.find(p=>p.file==='home.json')!.page;
const model = (entry:any, name:string) => resolveField(entry.fields.find((f:any)=>f.name===name),cms.components);

test('renderer mapping validates the shared enum and suppresses default/protected/invalid values',()=>{
  assert.deepEqual(surfaceValues,values);
  for(const value of values)assert.equal(surfaceAttribute(value),value==='default'?undefined:value);
  for(const value of [undefined,null,'','#fff','surface-dark','dark extra',{},42])assert.equal(surfaceAttribute(value),undefined);
  for(const value of values)assert.equal(surfaceAttribute(value,true),undefined);
});

test('ordinary section and item surfaces accept only the six approved values',()=>{
  for(const value of values){const p=structuredClone(home);sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture').surface=value;sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture').items[0].surface=value;const parsed=pageSchema.parse(p);assert.equal(sectionRecords(parsed).find(s=>s.id==='cms-local-fixture')!.surface,value);assert.equal(sectionRecords(parsed).find(s=>s.id==='cms-local-fixture')!.items![0].surface,value);}
  for(const value of ['#ffffff','surface-dark','dark extra','mint; color:red',42,{},[]]){
    for(const level of ['section','item']){const p=structuredClone(home);(level==='section'?sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture'):sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture').items[0]).surface=value;assert.equal(pageSchema.safeParse(p).success,false,`${level}: ${JSON.stringify(value)}`);}
  }
});

test('missing, cleared and explicit default choices preserve automatic styling',()=>{
  for(const value of [undefined,null,'','default']){const p=structuredClone(home);sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture').surface=value;sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture').items[0].surface=value;const parsed=pageSchema.parse(p);assert.equal(sectionRecords(parsed).find(s=>s.id==='cms-local-fixture')!.surface,'default');assert.equal(sectionRecords(parsed).find(s=>s.id==='cms-local-fixture')!.items![0].surface,'default');}
});

test('all page editors have separate ordinary/protected models and one reusable select',()=>{
  const select=cms.components.surfaceChoice;
  assert.equal(select.type,'select');assert.deepEqual(select.options.values.map((v:any)=>v.name),values);assert.deepEqual(select.options.values.map((v:any)=>v.label),labels);
  for(const {file,page} of pages){
    const entry=entryForFile(cms,`app/src/content/pages/${file}`),field=model(entry,'sections');
    if(page.kind==='home'){
      const normal=resolveField(field.blocks.find((b:any)=>b.name==='content'),cms.components);
      assert.equal(model(normal,'surface').type,'select');assert.equal(model(model(normal,'items'),'surface').label,'Boksfarge');
      const form=homepageBlockEditor(cms,'assessment').fields.find((f:any)=>f.name==='section');
      assert.ok(!form.fields.some((f:any)=>['surface','headingAlign'].includes(f.name)));
      continue;
    }
    assert.equal(field.type,'block');assert.equal(field.blockKey,'_block');assert.deepEqual(field.blocks.map((b:any)=>b.name),page.slug==='innsikt'?['content','pageList']:['content','protected']);
    const normal=resolveField(field.blocks[0],cms.components),protectedModel=resolveField(field.blocks[1],cms.components);
    assert.equal(model(normal,'surface').label,'Seksjonsfarge');assert.equal(model(normal,'surface').type,'select');
    assert.equal(model(model(normal,'items'),'surface').label,'Boksfarge');
    if(page.slug==='innsikt') {
      assert.equal(model(protectedModel,'surface').label,'Seksjonsfarge');
      assert.ok(!protectedModel.fields.some((f:any)=>f.name==='items'));
    } else {
      assert.ok(!protectedModel.fields.some((f:any)=>f.name==='surface'));
      assert.ok(!model(protectedModel,'items').fields.some((f:any)=>f.name==='surface'));
    }
    assert.equal(model(normal,'id').readonly,true);assert.equal(model(protectedModel,'id').readonly,true);
    for(const section of sectionRecords(page)) assert.equal(section._block, page.slug==='innsikt'&&section.id==='guider'?'pageList':['home','synlighet','konvertering'].includes(page.slug)&&section.id==='sjekk'?'protected':'content');
  }
  for(const entry of cms.content.filter((e:any)=>['proofCases','terminology'].includes(e.name))) assert.ok(!JSON.stringify(entry).includes('surfaceChoice'));
  assert.ok(!JSON.stringify(cms.content.find((e:any)=>e.name==='homepage').fields.find((f:any)=>f.name==='homepage')).includes('surfaceChoice'));
});

test('protected CTA/form rows cannot acquire a surface or be retyped as content',()=>{
  for(const slug of ['home','synlighet','konvertering']){
    const original=pages.find(p=>p.page.slug===slug)!.page;
    const target=(p:any)=>slug==='home'?p.sections.find((s:any)=>s.element==='sjekk'):sectionRecords(p).find((s:any)=>s.id==='sjekk');
    for(const value of ['base','soft','mint','lavender','dark']){const p=structuredClone(original);target(p).surface=value;assert.equal(pageSchema.safeParse(p).success,false);}
    const p=structuredClone(original);target(p)._block='content';assert.equal(pageSchema.safeParse(p).success,false);
  }
  const p=structuredClone(home);sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture')._block='protected';assert.equal(pageSchema.safeParse(p).success,false);
});

test('CMS surface save and restore preserve every unrelated field, ID, order and link',()=>{
  for(const {file,page} of pages){
    const entry=entryForFile(cms,`app/src/content/pages/${file}`);
    for(const value of values){
      const form=structuredClone(page),section=sectionRecords(form).find((s:any)=>s.id==='cms-local-fixture');
      if(!section)continue;section.surface=value;if(section.items?.length)section.items[0].surface=value;
      const saved=JSON.parse(cmsJsonSave(page,form,entry,cms));assertPreservedContent(form,saved);assert.deepEqual(pageSchema.parse(saved),pageSchema.parse(form));
      const restored=JSON.parse(cmsJsonSave(saved,structuredClone(page),entry,cms));assertPreservedContent(page,restored);assert.deepEqual(pageSchema.parse(restored),pageSchema.parse(page));
    }
    const form=structuredClone(page),section=sectionRecords(form).find((s:any)=>s.id==='cms-local-fixture');if(section){section.surface='#fff';assert.throws(()=>cmsJsonSave(page,form,entry,cms));}
  }
});

test('historical H-019 migration adds only editor metadata; subsequent OWNER content edits remain allowed',()=>{
  for(const {file} of pages){const original=JSON.parse(execFileSync('git',['show',`188478e:app/src/content/pages/${file}`],{encoding:'utf8',cwd:'..'}));const migrated=JSON.parse(execFileSync('git',['show',`59b52bd:app/src/content/pages/${file}`],{encoding:'utf8',cwd:'..'}));for(const s of migrated.sections)delete s._block;assert.deepEqual(migrated,original,file);}
});
