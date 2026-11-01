import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {pageFilePaths} from './helpers/page-sources.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {glossarySchema} from '../src/lib/terminology.ts';
import {entryForFile,resolveField,cmsJsonSave,assertPreservedContent} from './helpers/pages-cms-json.ts';
import {resolvePageHero,resolveGlossaryHero,resolveNotFoundHero,heroViewSchema} from '../src/lib/page-hero.ts';
import {specialHeroSourceSchema} from '../src/lib/page-hero.ts';
import {resolveHomepageContent} from '../src/lib/home-builder.ts';
const pages=pageFilePaths().map(file=>({file,page:JSON.parse(readFileSync(`src/content/pages/${file}`,'utf8'))}));
const home=pages.find(p=>p.page.kind==='home')!.page;
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const normal=pages.filter(p=>p.page.kind!=='home'&&p.page.slug!=='synlighet');
const expectedHeroFields=['layout','toneOverrides','eyebrow','title','support','primaryCta','secondaryCta','featuredProofCaseId','visual'];

test('all ordinary pages have one canonical editable Hero, with no duplicated persisted text or image keys',()=>{
 assert.equal(normal.length,15);
 for(const {page} of normal){
  assert.equal(pageSchema.safeParse(page).success,true,page.slug);
  assert.deepEqual(Object.keys(page.hero).filter(k=>['layout','eyebrow','title','support','primaryCta','secondaryCta','visual','toneOverrides','featuredProofCaseId'].includes(k)),
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
 const expected=expectedHeroFields;
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
  const visual=resolveField(hero.fields.find((f:any)=>f.name==='visual'),cms.components);
  assert.equal(visual.type,'block',file+' must keep conditional image validation');
  assert.equal(visual.blockKey,'kind',file);
  assert.deepEqual(visual.blocks.map((b:any)=>b.name),['none','image'],file);
  assert.deepEqual(visual.blocks.map((b:any)=>b.label),[
    'Ingen – bare tekst (velg Bilde for bildevalg)',
    'Bilde – velg eller endre bilde',
  ],file);
  assert.match(visual.description,/Velg Bilde under Visuelt innhold/,file);
  const visualImage=visual.blocks.find((block:any)=>block.name==='image').fields.find((f:any)=>f.name==='image');
  assert.deepEqual(visualImage.fields.map((f:any)=>f.name),['kind','src','alt','positionX','positionY'],file+' image controls must match the shared Hero');

  assert.equal(editor.fields.find((f:any)=>f.name==='sections')?.label,'Innholdsseksjoner',file);
  assert.ok(editor.fields.find((f:any)=>f.name==='faq'),file+' owns its FAQ');
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
  assert.deepEqual(saved.sections??[],page.sections??[],file);
  assert.deepEqual(saved.hero.visual,page.hero.visual,file);
  const result=pageSchema.safeParse(saved);assert.ok(result.success,file+': '+(result.success?'':JSON.stringify(result.error.issues).slice(0,2600)));
  const restored=JSON.parse(cmsJsonSave(saved,page,editor,cms));
  // Native Pages CMS has no editor for the retired empty home chrome stub.
  // That obsolete {} is not a source of visible page content anymore.
  if(page.kind==='home'){
    const {homepage:retired, ...actual}=restored;
    const {homepage:retiredSource, ...expected}=page;
    assert.ok(retired===undefined||Object.keys(retired).length===0,file);
    assert.deepEqual(actual,expected,file);
  }
  else assert.deepEqual({...restored,sections:restored.sections??[],faq:restored.faq??[]},{...page,sections:page.sections??[],faq:page.faq??[]},file);
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
   assert.equal(view.primaryCta?.href,page.kind==='assessment'?undefined:(page.hero.primaryCta.suggestedHref||page.hero.primaryCta.href),page.slug);
   if(view.visual.kind==='image'){
    const image=page.hero.visual.image;
    assert.equal(view.visual.image.src,image.src,page.slug);
    assert.equal(view.visual.image.alt,page.kind==='home'?'':image.alt,page.slug);
    assert.equal(view.visual.image.positionY,image.positionY,page.slug);
   }
  }
 }
});

test('Begreper and 404 use the full shared Hero editor and guarded source schema',()=>{
 const glossary=JSON.parse(readFileSync('src/content/terminology/glossary.json','utf8'));
 assert.equal(glossarySchema.safeParse({...glossary,hero:{...glossary.hero,layout:'centered'}}).success,true);
 const editor=entryForFile(cms,'app/src/content/terminology/glossary.json');
 const hero=resolveField(editor.fields.find((f:any)=>f.name==='hero'),cms.components);
 assert.deepEqual(hero.fields.map((f:any)=>f.name),expectedHeroFields);
 assert.equal(resolveGlossaryHero(glossary).title,glossary.hero.title);
 assert.ok(!Object.hasOwn(glossary,'title')&&!Object.hasOwn(glossary,'intro'),'no duplicate editable glossary copy');
 const source=JSON.parse(readFileSync('src/content/presentation/hero-layouts.json','utf8'));
 assert.equal(specialHeroSourceSchema.safeParse(source).success,true);
 assert.equal(specialHeroSourceSchema.safeParse({hero:{...source.hero,layout:'raw-class'}}).success,false);
 const errEditor=entryForFile(cms,'app/src/content/presentation/hero-layouts.json');
 const errHero=resolveField(errEditor.fields.find((f:any)=>f.name==='hero'),cms.components);
 assert.deepEqual(errHero.fields.map((f:any)=>f.name),expectedHeroFields);
 for(const {record,entry,schema} of [
   {record:glossary,entry:editor,schema:glossarySchema},
   {record:source,entry:errEditor,schema:specialHeroSourceSchema},
 ]){
   const edited=structuredClone(record);edited.hero.title+=' – CMS-test';
   edited.hero.featuredProofCaseId='eurotents';
   const saved=JSON.parse(cmsJsonSave(record,edited,entry,cms));
   assert.deepEqual(saved,edited,'special Hero roundtrip must retain all source fields');
   assert.equal(schema.safeParse(saved).success,true);
   const cleared=structuredClone(record);cleared.hero.featuredProofCaseId='';
   assert.deepEqual(JSON.parse(cmsJsonSave(saved,cleared,entry,cms)),record);
 }
 const error=resolveNotFoundHero(source.hero);
 assert.equal(error.primaryCta?.href,'/');
 assert.equal(error.title,'Her var det\ningen vei videre.');
 assert.equal(heroViewSchema.safeParse({...error,layout:'raw-class'}).success,false);
});
test('Pricing page Hero is independently editable but does not rewrite global package content',()=>{
 const pricing=pages.find(({page})=>page.kind==='pricing')!.page;
 const editor=entryForFile(cms,'app/src/content/pages/priser.json');
 assert.deepEqual(editor.fields.slice(0,3).map((f:any)=>f.name),['slug','seo','hero']);
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
