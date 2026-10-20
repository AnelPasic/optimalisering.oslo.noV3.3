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
test('all normal page families accept presentation-only Hero variants without copied content',()=>{
 for(const {page} of pages.filter(p=>p.page.kind!=='home'&&p.page.slug!=='synlighet'))for(const layout of ['split-right','split-left','centered']){
  const parsed=pageSchema.parse({...page,hero:{layout}});assert.deepEqual(parsed.hero,{layout});assert.equal(parsed.title,page.title);assert.deepEqual(parsed.heroVisual,page.heroVisual);
 }
});
test('primary schema rejects invalid layouts and duplicated editable Hero copy outside home',()=>{
 for(const {page} of pages.filter(p=>p.page.kind!=='home'&&p.page.slug!=='synlighet')){
  for(const hero of [{layout:'custom'},{layout:'centered',title:'Duplicate'},{...home.hero}])assert.equal(pageSchema.safeParse({...page,hero}).success,false,page.slug);
 }
 assert.equal(pageSchema.safeParse({...home,hero:{layout:'centered'}}).success,false);
});
test('every actual page editor exposes the same real typed layout choices beside existing copy',()=>{
 for(const {file,page} of pages){
  const entry=entryForFile(cms,`app/src/content/pages/${file}`),definition=entry.fields.find((f:any)=>f.name==='hero');assert.ok(definition,file);
  const hero=resolveField(definition,cms.components),layout=resolveField(hero.fields.find((f:any)=>f.name==='layout'),cms.components);
  assert.equal(hero.label,'Hero');assert.equal(layout.label,'Oppsett');assert.equal(layout.type,'select');assert.deepEqual(layout.options.values.map((v:any)=>v.name),['split-right','split-left','centered','centered-none']);
  if(page.kind!=='home'&&page.slug!=='synlighet')assert.deepEqual(hero.fields.map((f:any)=>f.name),['layout']);
  if(page.kind==='pricing')for(const key of ['eyebrow','title','intro'])assert.ok(!entry.fields.some((f:any)=>f.name===key&&!f.hidden&&!f.readonly),'Inactive pricing Hero copy is not an editable competing source');
 }
});
test('layout CMS saves preserve every source field and never clear the image or crop',()=>{
 for(const {file,page} of pages){const entry=entryForFile(cms,`app/src/content/pages/${file}`),p=structuredClone(page);p.hero={...p.hero,layout:'centered'};
  const saved=JSON.parse(cmsJsonSave(page,p,entry,cms));assertPreservedContent(p,saved);assert.equal(pageSchema.safeParse(saved).success,true);assert.deepEqual(saved.heroVisual,page.heroVisual);
 }
});
test('glossary exposes presentation only beside its existing owned text and anchors',()=>{
 const glossary=JSON.parse(readFileSync('src/content/terminology/glossary.json','utf8'));
 assert.equal(glossarySchema.safeParse({...glossary,hero:{layout:'centered'}}).success,true);
 const entry=entryForFile(cms,'app/src/content/terminology/glossary.json'),hero=resolveField(entry.fields.find((f:any)=>f.name==='hero'),cms.components);assert.deepEqual(hero.fields.map((f:any)=>f.name),['layout']);
});
test('one-way family adapters preserve owned media/copy, shared pricing and missing CTA semantics',()=>{
 const commercial=resolveHomepageContent(home);
 for(const {page} of pages){const view=resolvePageHero(page,commercial);assert.equal(view.family,page.kind);assert.equal(view.layout,page.hero?.layout==='centered-none'?'centered':page.hero?.layout??'split-right');
  if(page.kind==='pricing'){assert.equal(view.title,commercial.packages.heading);assert.equal(resolvePageHero({...page,title:'Unused legacy title'},commercial).title,commercial.packages.heading);assert.throws(()=>resolvePageHero(page),/shared Packages/);}
  else if(page.kind==='home'||page.slug==='synlighet'){assert.equal(view.title,page.hero.title);assert.equal(view.primaryCta?.href,page.hero.primaryCta.href);}
  else{assert.equal(view.title,page.title);assert.equal(view.support,page.intro);assert.equal(view.primaryCta?.href,page.kind==='assessment'?undefined:page.cta.href);}
  if(page.kind!=='home'&&view.visual.kind==='image'){const image=page.slug==='synlighet'?page.hero.visual.image:page.heroVisual;assert.equal(view.visual.image.src,image.src);assert.equal(view.visual.image.alt,image.alt);assert.equal(view.visual.image.positionY,image.positionY);}
 }
});
test('dedicated glossary/error presentation uses the same contract and no invented CTA or source',()=>{
 const glossary=JSON.parse(readFileSync('src/content/terminology/glossary.json','utf8'));
 assert.equal(resolveGlossaryHero(glossary).primaryCta,undefined);assert.equal(resolveGlossaryHero(glossary).title,glossary.title);
 const source=JSON.parse(readFileSync('src/content/presentation/hero-layouts.json','utf8'));
 assert.equal(specialHeroPresentationSchema.safeParse(source).success,true);assert.equal(specialHeroPresentationSchema.safeParse({notFound:{layout:'raw-class'}}).success,false);
 const error=resolveNotFoundHero(source.notFound);assert.equal(error.primaryCta?.href,'/');assert.equal(error.title,'Her var det\ningen vei videre.');
 const entry=entryForFile(cms,'app/src/content/presentation/hero-layouts.json');assert.ok(entry);assert.equal(resolveField(entry.fields[0],cms.components).label,'Hero');
 assert.equal(heroViewSchema.safeParse({...error,layout:'raw-class'}).success,false);
});
