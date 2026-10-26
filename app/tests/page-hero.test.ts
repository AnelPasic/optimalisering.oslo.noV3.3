import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {glossarySchema} from '../src/lib/terminology.ts';
import {entryForFile,resolveField,cmsJsonSave,assertPreservedContent} from './helpers/pages-cms-json.ts';
import {resolvePageHero,resolveGlossaryHero,resolveNotFoundHero,heroViewSchema} from '../src/lib/page-hero.ts';
import {specialHeroPresentationSchema} from '../src/lib/hero-presentation.ts';
import {resolveHomepageContent} from '../src/lib/home-builder.ts';
const pages=readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(file=>({file,page:JSON.parse(readFileSync(`src/content/pages/${file}`,'utf8'))}));
const home=pages.find(p=>p.page.kind==='home')!.page;
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const normal=pages.filter(p=>p.page.kind!=='home'&&p.page.slug!=='synlighet');

test('all ordinary pages have one canonical editable Hero, with no duplicated persisted text or image keys',()=>{
 assert.equal(normal.length,15);
 for(const {page} of normal){
  assert.equal(pageSchema.safeParse(page).success,true,page.slug);
  assert.deepEqual(Object.keys(page.hero).filter(k=>['layout','eyebrow','title','support','primaryCta','secondaryCta','visual'].includes(k)),
    Object.keys(page.hero));
  assert.ok(page.hero.title&&page.hero.eyebrow&&page.hero.support&&page.hero.primaryCta);
  for(const key of ['eyebrow','title','intro','cta','heroVisual'])assert.ok(!Object.hasOwn(page,key),page.slug+' duplicated '+key);
  for(const layout of ['split-right','split-left','centered','centered-none'])
   assert.equal(pageSchema.safeParse({...page,hero:{...page.hero,layout}}).success,true,page.slug+' '+layout);
 }
});

test('canonical Hero rejects invalid presets, missing content, untrusted images and duplicate authored top-level sources',()=>{
 for(const {page} of normal){
  for(const bad of [{...page.hero,layout:'custom'},{...page.hero,primaryCta:undefined},{...page.hero,title:''},{...page.hero,visual:{kind:'image',image:{...page.hero.visual.image,src:'https://other.test/img.png'}}}]){
   assert.equal(pageSchema.safeParse({...page,hero:bad}).success,false,page.slug);
  }
  for(const key of ['eyebrow','title','intro','cta','heroVisual'])assert.equal(pageSchema.safeParse({...page,[key]:'duplicated source'}).success,false,page.slug+' '+key);
 }
});

test('every ordinary page editor reuses the canonical Synlighet Hero field names and layout options',()=>{
 const syn=entryForFile(cms,'app/src/content/pages/synlighet.json');
 const homeEditor=entryForFile(cms,'app/src/content/pages/home.json');
 const expected=['layout','eyebrow','title','support','primaryCta','secondaryCta','visual'];
 const synHero=resolveField(syn.fields.find((f:any)=>f.name==='hero'),cms.components);
 const homeHero=resolveField(homeEditor.fields.find((f:any)=>f.name==='hero'),cms.components);
 assert.deepEqual(synHero.fields.map((f:any)=>f.name),expected);
 assert.deepEqual(homeHero.fields.map((f:any)=>f.name),expected);
 for(const {file,page} of pages){
  const editor=entryForFile(cms,`app/src/content/pages/${file}`);
  const definition=editor.fields.find((f:any)=>f.name==='hero');
  assert.ok(definition,file);
  const hero=resolveField(definition,cms.components);
  assert.equal(hero.label,'Hero',file);
  const layout=resolveField(hero.fields.find((f:any)=>f.name==='layout'),cms.components);
  assert.deepEqual(layout.options.values.map((v:any)=>v.name),['split-right','split-left','centered','centered-none'],file);
  assert.deepEqual(hero.fields.map((f:any)=>f.name),expected,file);
  assert.ok(!editor.fields.some((f:any)=>['eyebrow','title','intro','cta','heroVisual'].includes(f.name)),file);
 }
});

test('Pages CMS edits one nested Hero; restores all sections, media and CTA without new authorities',()=>{
 for(const {file,page} of pages){
  const editor=entryForFile(cms,`app/src/content/pages/${file}`);
  const edited=structuredClone(page);
  edited.hero.layout='centered-none';
  edited.hero.eyebrow+=' CMS-test';
  edited.hero.title+=' CMS-test';
  const saved=JSON.parse(cmsJsonSave(page,edited,editor,cms));
  assertPreservedContent(edited,saved);
  assert.deepEqual(saved.sections,page.sections,file);
  assert.deepEqual(saved.hero.visual,page.hero.visual,file);
  const result=pageSchema.safeParse(saved);assert.ok(result.success,file+': '+(result.success?'':JSON.stringify(result.error.issues).slice(0,2600)));
  const restored=JSON.parse(cmsJsonSave(saved,page,editor,cms));
  // Native Pages CMS has no editor for the retired empty home chrome stub.
  // That obsolete {} is not a source of visible page content anymore.
  if(page.kind==='home')assert.deepEqual({...restored,homepage:{}},page,file);
  else assert.deepEqual(restored,page,file);
 }
});

test('all rendered Hero families preserve copy, CTA, image crop and separate Package authority',()=>{
 const commercial=resolveHomepageContent(home);
 for(const {page} of pages){
  const view=resolvePageHero(page,commercial);
  assert.equal(view.family,page.kind,page.slug);
  assert.equal(view.layout,page.hero?.layout==='centered-none'?'centered':page.hero?.layout??'split-right');
  {
   assert.equal(view.title,page.hero.title,page.slug);
   assert.equal(view.support,page.hero.support,page.slug);
   assert.equal(view.primaryCta?.href,page.kind==='assessment'?undefined:page.hero.primaryCta.href,page.slug);
   if(view.visual.kind==='image'){
    const image=page.hero.visual.image;
    assert.equal(view.visual.image.src,image.src,page.slug);
    assert.equal(view.visual.image.alt,page.kind==='home'?'':image.alt,page.slug);
    assert.equal(view.visual.image.positionY,image.positionY,page.slug);
   }
  }
 }
});

test('glossary and error pages keep their separate presentation-only Hero contract',()=>{
 const glossary=JSON.parse(readFileSync('src/content/terminology/glossary.json','utf8'));
 assert.equal(glossarySchema.safeParse({...glossary,hero:{layout:'centered'}}).success,true);
 const editor=entryForFile(cms,'app/src/content/terminology/glossary.json');
 assert.deepEqual(resolveField(editor.fields.find((f:any)=>f.name==='hero'),cms.components).fields.map((f:any)=>f.name),['layout']);
 assert.equal(resolveGlossaryHero(glossary).title,glossary.title);
 const source=JSON.parse(readFileSync('src/content/presentation/hero-layouts.json','utf8'));
 assert.equal(specialHeroPresentationSchema.safeParse(source).success,true);
 assert.equal(specialHeroPresentationSchema.safeParse({notFound:{layout:'raw-class'}}).success,false);
 const error=resolveNotFoundHero(source.notFound);
 assert.equal(error.primaryCta?.href,'/');
 assert.equal(error.title,'Her var det\ningen vei videre.');
 assert.equal(heroViewSchema.safeParse({...error,layout:'raw-class'}).success,false);
});

test('Pricing page Hero is independently editable but does not rewrite global package content',()=>{
 const pricing=pages.find(({page})=>page.kind==='pricing')!.page;
 const editor=entryForFile(cms,'app/src/content/pages/priser.json');
 assert.deepEqual(editor.fields.slice(0,3).map((f:any)=>f.name),['seo','slug','hero']);
 const commercial=resolveHomepageContent(home);
 const originalPackages=structuredClone(commercial.packages);
 const edited=structuredClone(pricing);
 edited.hero.title='Test: nytt Hero-budskap';
 edited.hero.support='Test: ny ingress';
 edited.hero.primaryCta={label:'Test knapp',href:'/kontakt/'};
 const saved=JSON.parse(cmsJsonSave(pricing,edited,editor,cms));
 assert.deepEqual(saved.hero,edited.hero);
 assert.equal(pageSchema.safeParse(saved).success,true);
 assert.equal(resolvePageHero(saved,commercial).title,edited.hero.title);
 assert.equal(resolvePageHero(saved,commercial).primaryCta?.href,'/kontakt/');
 assert.deepEqual(commercial.packages,originalPackages);
 assert.deepEqual(JSON.parse(cmsJsonSave(saved,pricing,editor,cms)),pricing);
});
