import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {surfaceValues,surfaceSchema,surfaceAttribute} from '../src/lib/surface.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {sharedContentSchema} from '../src/lib/shared-content.ts';
import {localHomeFixture,cmsJsonSave,entryForFile,resolveField,sectionRecords} from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const semantic=["base-100","base-200","base-300","primary","secondary","accent","neutral","info","success","warning","error"];
const legacy=['lavender'];
test('one Pages CMS surface picker for both section and box, including remaining legacy choices',()=>{
 const values=cms.components.surfaceChoice.options.values.map((x:any)=>x.name);
 assert.deepEqual(values,['default',...semantic,...legacy]);
 assert.deepEqual(values,[...surfaceValues]);
 const page=entryForFile(cms,'app/src/content/pages/home.json');
 const content=page.fields.find((f:any)=>f.name==='sections').blocks.find((b:any)=>b.name==='content');
 const sectionSurface=resolveField(content.fields.find((f:any)=>f.name==='surface'),cms.components);
 const boxSurface=resolveField(content.fields.find((f:any)=>f.name==='items').fields.find((f:any)=>f.name==='surface'),cms.components);
 assert.deepEqual(sectionSurface.options.values,boxSurface.options.values);
 for(const value of values){assert.equal(surfaceSchema.parse(value),value);assert.equal(surfaceAttribute(value),value==='default'?undefined:value);}
 assert.equal(surfaceAttribute('primary',true),undefined,'protected rows may not be recolored');
 assert.equal(surfaceSchema.safeParse('info-green').success,false);
 for(const retired of ['mint','base','soft','dark','secondary-200']) assert.equal(surfaceSchema.safeParse(retired).success,false,`${retired} is not a supported semantic surface`);
});
test('all new daisyUI tokens roundtrip locally and globally without changing owner data',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/home.json');
 for(const color of semantic){
  const home=localHomeFixture(),s=sectionRecords(home).find((row:any)=>row.id==='cms-local-fixture');
  s.surface=color;s.items[0].surface=color;
  const saved=JSON.parse(cmsJsonSave(home,home,entry,cms));
  const section=sectionRecords(pageSchema.parse(saved)).find((row:any)=>row.id==='cms-local-fixture');
  assert.equal(section.surface,color);assert.equal(section.items[0].surface,color);
  const shared={_block:'content',uid:'cb918cbe-fb45-4f6b-9d78-0b83e1b11111',id:'surface-qa',name:'Test',heading:'Test',body:[],surface:color,items:[{title:'Kort',text:'Tekst',surface:color}]};
  const g=sharedContentSchema.parse(shared);
  assert.equal(g.surface,color);assert.equal(g.items?.[0].surface,color);
 }
});
test('OSLO section full-bleed, only inner cards/text are constrained',()=>{
 for(const path of ['src/components/ContentSection.astro','src/components/HomeSection.astro']){
  const source=readFileSync(path,'utf8');
  const i=source.indexOf('<section ');
  assert.ok(i>=0);
  assert.ok(source.indexOf('<div class="shell">',i)>i);
  assert.ok(source.indexOf('data-surface={surfaceAttribute(section.surface',i)>i);
 }
 const shared=readFileSync('src/styles/shared.css','utf8');
 assert.ok(shared.includes('.shell { width: min(1200px, calc(100% - 96px))'));
 const css=readFileSync('src/styles/surfaces.css','utf8');
 for(const color of semantic) {
  assert.ok(css.includes(`[data-surface="${color}"]`),color);
  assert.ok(css.includes(`var(--color-${color})`),color);
 }
 const card=readFileSync('src/components/ContentCard.astro','utf8');
 for(const color of semantic)assert.ok(card.includes(`'bg-${color} text-`),color);
});
