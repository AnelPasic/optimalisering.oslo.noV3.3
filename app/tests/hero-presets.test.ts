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

test('all 17 editors show the four exact Hero presets with a media-preserving fallback description',()=>{
 const sources=pages.map(p=>`app/src/content/pages/${p.file}`).concat('app/src/content/terminology/glossary.json','app/src/content/presentation/hero-layouts.json');
 assert.equal(sources.length,17);
 for(const path of sources){const entry=entryForFile(cms,path),root=entry.fields.find((f:any)=>f.name===(path.includes('/presentation/')?'notFound':'hero')),hero=resolveField(root,cms.components),field=resolveField(hero.fields.find((f:any)=>f.name==='layout'),cms.components);assert.deepEqual(field.options.values,choices,path);assert.match(field.description,/bevares/i,path);assert.match(field.description,/uten bilde/i,path);}
});

test('no-image CMS preset round-trips without clearing any home/service/pricing source data',()=>{
 for(const page of [home,service,pricing]){const record=pages.find(p=>p.page===page)!,entry=entryForFile(cms,`app/src/content/pages/${record.file}`),edited=structuredClone(page);edited.hero={...edited.hero,layout:'centered-none'};
  const saved=JSON.parse(cmsJsonSave(page,edited,entry,cms));assertPreservedContent(edited,saved);assert.equal(pageSchema.safeParse(saved).success,true);const sourceBefore=JSON.stringify(saved),view=resolvePageHero(saved,commercial);assert.equal(view.layout,'centered');assert.deepEqual(view.visual,{kind:'none'});assert.equal(JSON.stringify(saved),sourceBefore,'resolver cannot mutate saved source');
  saved.hero.layout=page.hero?.layout??'split-right';const restored=resolvePageHero(saved,commercial),original=resolvePageHero(page,commercial);assert.deepEqual(restored,original,'image/type/alt/crop/CTA/copy and family authority restored');
 }
});

test('fourth preset hides supplied images for every normal family while preserving sources and CTA semantics',()=>{
 for(const {page} of pages)for(const withImage of [true,false]){const source=structuredClone(page);source.hero={...source.hero,layout:'centered-none'};if(source.kind==='home')source.hero.visual.kind=withImage?'image':'none';else if(withImage)source.heroVisual=structuredClone(service.heroVisual);else delete source.heroVisual;
  const before=JSON.stringify(source),view=resolvePageHero(source,commercial);assert.equal(view.layout,'centered');assert.equal(view.visual.kind,'none');assert.equal(JSON.stringify(source),before);assert.equal(view.primaryCta?.href,page.kind==='home'?page.hero.primaryCta.href:page.kind==='assessment'?undefined:page.cta.href);assert.equal(view.title,page.kind==='home'?page.hero.title:page.kind==='pricing'?commercial.packages.heading:page.title);
 }
});

test('legacy presets/defaults and centered missing-image fallback retain their exact meaning',()=>{
 for(const layout of ['split-right','split-left','centered'])assert.equal(heroLayoutSchema.parse(layout),layout);
 for(const value of [undefined,null,''])assert.equal(heroLayoutSchema.parse(value),'split-right');
 assert.equal(heroLayoutSchema.safeParse('raw-css').success,false);
 const original=resolvePageHero(service),hidden=heroViewSchema.parse({...original,layout:'centered-none'});assert.deepEqual(hidden.visual,{kind:'none'});assert.equal(hidden.layout,'centered');
 const empty=structuredClone(service);delete empty.heroVisual;empty.hero={layout:'centered'};assert.deepEqual(resolvePageHero(empty).visual,{kind:'none'},'No asset or placeholder invented');
 const glossary=JSON.parse(readFileSync('src/content/terminology/glossary.json','utf8'));assert.equal(resolveGlossaryHero({...glossary,hero:{layout:'centered-none'}}).layout,'centered');assert.equal(resolveNotFoundHero({layout:'centered-none'}).layout,'centered');
});
