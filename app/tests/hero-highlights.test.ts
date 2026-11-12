import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {resolvePageHero} from '../src/lib/page-hero.ts';
import {cmsJsonSave,entryForFile,resolveField} from './helpers/pages-cms-json.ts';

const read=(path:string)=>readFileSync(new URL(path,import.meta.url),'utf8');
const page=JSON.parse(read('../src/content/pages/chatgpt-ads.json'));
const cms=YAML.parse(read('../../.pages.yml'));

test('All package-level Hero checks are source-owned and commercial facts match the shared packages',()=>{
 const result=pageSchema.parse(page);
 const view=resolvePageHero(result);
 assert.deepEqual(view.highlights,page.hero.highlights);
 assert.equal(view.highlights?.length,4);
 assert.match(page.hero.eyebrow,/INNGÅR I ALLE PAKKER/);
 assert.match(page.hero.highlights[0],/alle pakker/);
 assert.match(page.hero.highlights[1],/4 500 kr\/mnd eks\. mva\./);
 assert.match(page.hero.highlights[2],/Ett, to eller flere fokusområder/);
 assert.match(page.hero.highlights[3],/Annonsebudsjett kommer i tillegg/);
 const packages=JSON.parse(read('../src/content/global-elements/priser.json')).content;
 assert.deepEqual(packages.items.map((x:any)=>x.price),[4500,6900,14900]);
 assert.match(packages.adBudgetNote,/Annonsebudsjett kommer i tillegg/);
 assert.equal(pageSchema.safeParse({...page,hero:{...page.hero,highlights:['']}}).success,false);
 assert.equal(pageSchema.safeParse({...page,hero:{...page.hero,highlights:Array(5).fill('Lovnad')}}).success,false);
 assert.equal(pageSchema.safeParse({...page,hero:{...page.hero,highlights:['x'.repeat(111)]}}).success,false);
});

test('CMS checklist is optional and roundtrips without mutating approved Hero text',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/chatgpt-ads.json');
 const hero=resolveField(entry.fields.find((f:any)=>f.name==='hero'),cms.components);
 for (const path of ['chatgpt-ads.json', 'home.json']) {
  const pageEntry=entryForFile(cms,'app/src/content/pages/'+path);
  const fields=resolveField(pageEntry.fields.find((f:any)=>f.name==='hero'),cms.components).fields;
  const secondary=fields.findIndex((f:any)=>f.name==='secondaryCta');
  assert.ok(secondary>0,path);
  assert.deepEqual(fields.slice(secondary-1,secondary+2).map((f:any)=>f.name),['primaryCta','secondaryCta','highlights'],path);
 }
 const highlights=hero.fields.find((f:any)=>f.name==='highlights');
 assert.equal(highlights.type,'string');
 assert.equal(highlights.list.max,4);
 assert.notEqual(highlights.required,true);
 const edited=structuredClone(page);edited.hero.highlights=['Med i valgt pakke'];
 const saved=JSON.parse(cmsJsonSave(page,edited,entry,cms));
 assert.deepEqual(saved.hero.highlights,edited.hero.highlights);
 assert.equal(saved.hero.title,page.hero.title);
 assert.equal(saved.hero.support,page.hero.support);
 const without=structuredClone(page);delete without.hero.highlights;
 assert.equal(pageSchema.safeParse(without).success,true);
});

test('CommercialHero renders checks after buttons with accessible decorative SVG and no hardcoded prices',()=>{
 const html=read('../src/components/CommercialHero.astro');
 const css=read('../src/styles/compositions/hero.css');
 assert.match(html,/highlights/);
 assert.match(html,/hero-checklist/);
 assert.match(html,/aria-hidden="true"/);
 assert.match(css,/\.commercial-hero \.hero-checklist/);
 assert.doesNotMatch(html,/4 500|ChatGPT Ads inngår/);
});
