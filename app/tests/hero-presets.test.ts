import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {heroLayoutSchema} from '../src/lib/hero-presentation.ts';
import {resolvePageHero,resolveGlossaryHero,resolveNotFoundHero,heroViewSchema} from '../src/lib/page-hero.ts';
import {resolveHomepageContent} from '../src/lib/home-builder.ts';
import {entryForFile,resolveField,cmsJsonSave,assertPreservedContent} from './helpers/pages-cms-json.ts';
const pages=readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(file=>({file,page:JSON.parse(readFileSync(`src/content/pages/${file}`,'utf8'))}));
const home=pages.find(p=>p.page.kind==='home')!.page,service=pages.find(p=>p.page.slug==='konvertering')!.page,pricing=pages.find(p=>p.page.kind==='pricing')!.page;
const commercial=resolveHomepageContent(home),cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const choices=[{name:'split-right',label:'Tekst venstre / bilde høyre'},{name:'split-left',label:'Bilde venstre / tekst høyre'},{name:'centered',label:'Sentrert med bilde'},{name:'centered-none',label:'Sentrert uten bilde'}];

test('every Hero editor offers identical four presets with non-destructive image guidance',()=>{
 const sources=pages.map(p=>`app/src/content/pages/${p.file}`).concat('app/src/content/terminology/glossary.json','app/src/content/presentation/hero-layouts.json');
 assert.equal(sources.length,19);
 for(const path of sources){
  const editor=entryForFile(cms,path),root=editor.fields.find((f:any)=>f.name===(path.includes('/presentation/')?'notFound':'hero')),hero=resolveField(root,cms.components);
  const field=resolveField(hero.fields.find((f:any)=>f.name==='layout'),cms.components);
  assert.deepEqual(field.options.values,choices,path);
  assert.match(field.description,/bevares/i,path);
  assert.match(field.description,/uten bilde/i,path);
 }
});

test('changing Hero layout in Pages CMS preserves all owned text, CTA, image and crop',()=>{
 for(const page of [home,service,pricing]){
  const record=pages.find(p=>p.page===page)!,editor=entryForFile(cms,`app/src/content/pages/${record.file}`);
  const edited=structuredClone(page);edited.hero={...edited.hero,layout:'centered-none'};
  const saved=JSON.parse(cmsJsonSave(page,edited,editor,cms));
  assertPreservedContent(edited,saved);
  const result=pageSchema.safeParse(saved);assert.ok(result.success,record.file+': '+(result.success?'':JSON.stringify(result.error.issues).slice(0,2600)));
  const before=JSON.stringify(saved),view=resolvePageHero(saved,commercial);
  assert.equal(view.layout,'centered');assert.deepEqual(view.visual,{kind:'none'});
  assert.equal(JSON.stringify(saved),before,'Rendering must not mutate CMS content');
  saved.hero.layout=page.hero.layout;
  assert.deepEqual(resolvePageHero(saved,commercial),resolvePageHero(page,commercial));
 }
});

test('centered-no-image works for all page types without erasing supplied source media',()=>{
 for(const {page} of pages){
  const source=structuredClone(page);source.hero.layout='centered-none';
  const before=JSON.stringify(source),view=resolvePageHero(source,commercial);
  assert.equal(view.layout,'centered',page.slug);
  assert.equal(view.visual.kind,'none',page.slug);
  assert.equal(JSON.stringify(source),before,'No mutation '+page.slug);
  const actual=resolvePageHero(page,commercial);
  assert.equal(actual.title,page.hero.title);
  assert.equal(view.primaryCta?.href,actual.primaryCta?.href,page.slug);
 }
});

test('preset defaults and missing-image fallback retain existing semantics',()=>{
 for(const layout of ['split-right','split-left','centered'])assert.equal(heroLayoutSchema.parse(layout),layout);
 for(const value of [undefined,null,''])assert.equal(heroLayoutSchema.parse(value),'split-right');
 assert.equal(heroLayoutSchema.safeParse('raw-css').success,false);
 const original=resolvePageHero(service),hidden=heroViewSchema.parse({...original,layout:'centered-none'});
 assert.deepEqual(hidden.visual,{kind:'none'});
 assert.equal(hidden.layout,'centered');
 const empty=structuredClone(service);empty.hero={...empty.hero,layout:'centered',visual:{kind:'none'}};
 assert.deepEqual(resolvePageHero(empty).visual,{kind:'none'},'No invented placeholder');
 const glossary=JSON.parse(readFileSync('src/content/terminology/glossary.json','utf8'));
 assert.equal(resolveGlossaryHero({...glossary,hero:{...glossary.hero,layout:'centered-none'}}).layout,'centered');
 const notFound=JSON.parse(readFileSync('src/content/presentation/hero-layouts.json','utf8'));
 assert.equal(resolveNotFoundHero({...notFound.hero,layout:'centered-none'}).layout,'centered');
});
