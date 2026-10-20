import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {synlighetHeroSchema,migrateSynlighetHero,legacyHeroKeys} from '../src/lib/synlighet-hero.ts';
import {resolvePageHero} from '../src/lib/page-hero.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {entryForFile,resolveField,cmsJsonSave,assertPreservedContent} from './helpers/pages-cms-json.ts';
const source=JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));

test('migration is lossless and idempotent, retaining mixed sections and derived legacy CTA exactly',()=>{
  const legacy={...structuredClone(source),hero:{layout:'split-right'},eyebrow:'Eksisterende overtekst',title:'Eksisterende tittel',intro:'Eksisterende ingress',cta:{label:'Sjekk',href:'/#sjekk'},heroVisual:{kind:'illustration',src:'/images/services/discoveringlocalfavorite-1.png',alt:'Bli funnet',positionX:50,positionY:50}};
  const before=resolvePageHero(legacy),migrated=migrateSynlighetHero(legacy,before);
  assert.deepEqual(resolvePageHero(migrated),before);
  assert.deepEqual(migrated.sections,legacy.sections);
  assert.deepEqual(migrateSynlighetHero(migrated),migrated);
  assert.deepEqual(migrateSynlighetHero(source),source);
  for(const key of legacyHeroKeys)assert.ok(!Object.hasOwn(migrated,key));
  assert.throws(()=>migrateSynlighetHero({...legacy,slug:'konvertering'},before));
});

test('canonical source projects compatibility fields only in parsed data, with one explicit secondary CTA authority',()=>{
  const page=pageSchema.parse(source);
  assert.equal(page.title,source.hero.title);assert.equal(page.intro,source.hero.support);assert.deepEqual(page.cta,source.hero.primaryCta);
  for(const key of legacyHeroKeys)assert.ok(!Object.hasOwn(source,key));
  const custom=structuredClone(source);custom.hero.secondaryCta={label:'Eksisterende priser',href:'/priser/'};
  assert.deepEqual(resolvePageHero(custom).secondaryCta,custom.hero.secondaryCta);
  delete custom.hero.secondaryCta;assert.equal(resolvePageHero(custom).secondaryCta,undefined);
});

test('partial saves, dual authority, invalid image and invalid CTA fail; no-image layout retains saved image',()=>{
  for(const key of ['title','support','primaryCta','visual']){const raw=structuredClone(source);delete raw.hero[key];assert.equal(pageSchema.safeParse(raw).success,false,key);}
  for(const key of legacyHeroKeys)assert.equal(pageSchema.safeParse({...source,[key]:'duplicate'}).success,false,key);
  for(const change of [{src:'/images/home/wrong.webp'},{src:'https://example.com/image.png'},{alt:''},{positionX:101},{kind:'custom'}])assert.equal(synlighetHeroSchema.safeParse({...source.hero,visual:{kind:'image',image:{...source.hero.visual.image,...change}}}).success,false);
  const hidden=structuredClone(source);hidden.hero.layout='centered-none';const bytes=JSON.stringify(hidden);
  assert.equal(resolvePageHero(hidden).visual.kind,'none');assert.equal(JSON.stringify(hidden),bytes);
});

test('one Hero first uses homepage field names/order/shared labels and retains a service-specific image editor',()=>{
  const entry=entryForFile(cms,'app/src/content/pages/synlighet.json'),home=entryForFile(cms,'app/src/content/pages/home.json');
  assert.equal(entry.fields[0].name,'hero');
  const hero=resolveField(entry.fields[0],cms.components),homeHero=resolveField(home.fields.find((f:any)=>f.name==='hero'),cms.components);
  assert.deepEqual(hero.fields.map((f:any)=>f.name),homeHero.fields.map((f:any)=>f.name));
  for(const field of hero.fields.filter((f:any)=>f.name!=='visual'))assert.deepEqual(field,homeHero.fields.find((f:any)=>f.name===field.name));
  for(const key of legacyHeroKeys)assert.ok(!entry.fields.some((f:any)=>f.name===key));
  const visual=hero.fields.find((f:any)=>f.name==='visual'),image=visual.fields.find((f:any)=>f.name==='image');
  assert.equal(image.fields.find((f:any)=>f.name==='src').options.media,'serviceHeroImages');assert.ok(image.fields.some((f:any)=>f.name==='alt'));
});

test('nested CMS saves preserve all unmigrated content, local/global order, image and CTA and restore precisely',()=>{
  const entry=entryForFile(cms,'app/src/content/pages/synlighet.json');
  for(const field of ['eyebrow','title','support']){const edit=structuredClone(source);edit.hero[field]+=' (CMS-test)';const saved=JSON.parse(cmsJsonSave(source,edit,entry,cms));assertPreservedContent(edit,saved);assert.ok(pageSchema.safeParse(saved).success);assert.deepEqual(saved.sections,source.sections);assert.deepEqual(saved.hero.visual,source.hero.visual);assert.deepEqual(saved.hero.primaryCta,source.hero.primaryCta);const restore=JSON.parse(cmsJsonSave(saved,source,entry,cms));assert.deepEqual(restore,source);}
  assert.deepEqual(source.sections.at(-1),{_block:'global',element:'regneeksempel'});
  const topics=source.sections.find((s:any)=>s.id==='kanaler').items;
  assert.deepEqual(topics.map((t:any)=>t.title),['SEO','Lokal SEO','AI-synlighet']);assert.equal(topics[0].href,'/seo/');assert.equal(topics[1].href,undefined);assert.equal(topics[2].href,'/ai-synlighet/');
});
