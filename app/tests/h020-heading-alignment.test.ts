import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { headingAlignAttribute, headingAlignValues } from '../src/lib/heading-alignment.ts';
import { cmsJsonSave, entryForFile, resolveField, assertPreservedContent } from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const load=(name:string)=>JSON.parse(readFileSync(`src/content/pages/${name}.json`,'utf8'));

test('safe mapping emits only a validated left override and leaves the homepage form model unchanged',()=>{
  assert.deepEqual(headingAlignValues,['center','left']);assert.equal(headingAlignAttribute('left'),'left');
  for(const value of ['center',undefined,null,'','right','left extra',{},0])assert.equal(headingAlignAttribute(value),undefined);
  const entry=entryForFile(cms,'app/src/content/pages/home.json'),sections=entry.fields.find((f:any)=>f.name==='sections');
  const model=resolveField(sections.blocks.find((b:any)=>b.name==='protected'),cms.components);
  assert.ok(!model.fields.some((f:any)=>['headingAlign','surface'].includes(f.name)));
});

test('section heading alignment accepts center/left; missing and cleared values default to center',()=>{
  for(const value of ['center','left',undefined,'',null]){
    const home=load('home');home.sections[0].headingAlign=value;
    assert.equal(pageSchema.parse(home).sections[0].headingAlign,value==='left'?'left':'center');
  }
  for(const value of ['right','justify','left extra','text-left','#fff',0,{},[]]){
    const home=load('home');home.sections[0].headingAlign=value;
    assert.equal(pageSchema.safeParse(home).success,false,JSON.stringify(value));
  }
});

test('ordinary and protected CMS heading models use the same select directly after the heading',()=>{
  for(const name of ['sectionContent','sectionProtected']){
    const fields=cms.components[name].fields, index=fields.findIndex((f:any)=>f.name==='heading');
    const field=resolveField(fields[index+1],cms.components);
    assert.equal(field.name,'headingAlign');assert.equal(field.type,'select');assert.equal(field.label,'Overskriftsjustering');
    assert.equal(field.description,'Sentrert er standard. Velg Venstrejustert når seksjonen leses bedre som en vanlig tekstseksjon.');
    assert.deepEqual(field.options.values,[{name:'center',label:'Sentrert (standard)'},{name:'left',label:'Venstrejustert'}]);
  }
  assert.ok(!cms.components.sectionProtected.fields.some((f:any)=>f.name==='surface'));
  assert.ok(!JSON.stringify(cms.components.sectionProtected).includes('Boksfarge'));
});

test('CMS Center/Left save and restore preserve unrelated section, card, surface and commercial fields',()=>{
  for(const name of ['home','synlighet','seo']){
    const original=load(name),entry=entryForFile(cms,`app/src/content/pages/${name}.json`);
    for(const index of name==='synlighet'?[0,original.sections.length-1]:[0]){
      const form=structuredClone(original);form.sections[index].headingAlign='left';
      const saved=JSON.parse(cmsJsonSave(original,form,entry,cms));assertPreservedContent(form,saved);assert.deepEqual(pageSchema.parse(saved),pageSchema.parse(form));
      form.sections[index].headingAlign='center';const restored=JSON.parse(cmsJsonSave(saved,form,entry,cms));assertPreservedContent(form,restored);
      assert.equal(pageSchema.parse(restored).sections[index].headingAlign,'center');
      delete restored.sections[index].headingAlign;assertPreservedContent(original,restored);
      const invalid=structuredClone(original);invalid.sections[index].headingAlign='justify';assert.throws(()=>cmsJsonSave(original,invalid,entry,cms));
    }
  }
});

test('protected heading alignment does not grant surface overrides',()=>{
  const service=load('synlighet'),section=service.sections.find((s:any)=>s._block==='protected');section.headingAlign='left';
  assert.equal(pageSchema.safeParse(service).success,true);
  section.surface='mint';assert.equal(pageSchema.safeParse(service).success,false);
});
