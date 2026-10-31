import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageFilePaths} from './helpers/page-sources.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {synlighetHeroSchema} from '../src/lib/synlighet-hero.ts';
import {resolvePageHero} from '../src/lib/page-hero.ts';
import {heroToneOverridesSchema,heroTonePresetValues} from '../src/lib/hero-tone-overrides.ts';
import {entryForFile,cmsJsonSave,resolveField} from './helpers/pages-cms-json.ts';

const text=(path:string)=>readFileSync(path,'utf8');
const cms=YAML.parse(text('../.pages.yml'));
const presets=['inherit','noktern','medon','spiss','spissplus','spisspluskomisk','spisspluskomiskplus'];

test('all normal page Hero editors expose independent optional tone controls',()=>{
 const files=pageFilePaths();
 assert.ok(files.length>=12);
 for(const file of files){
  const source=`app/src/content/pages/${file}`;
  const editor=entryForFile(cms,source);
  const h=resolveField(editor.fields.find((f:any)=>f.name==='hero'),cms.components);
  assert.ok(h,source);
  const toneIndex=h.fields.findIndex((f:any)=>f.name==='toneOverrides');
  const eyebrowIndex=h.fields.findIndex((f:any)=>f.name==='eyebrow');
  assert.equal(toneIndex,eyebrowIndex-1,source+' places tone directly before Overtekst');
  const tone=resolveField(h.fields[toneIndex],cms.components);
  assert.equal(tone.type,'object',source);
  assert.notEqual(tone.required,true,source);
  assert.deepEqual(tone.fields.map((f:any)=>f.name),['eyebrowPreset','titlePreset','supportPreset']);
  for(const field of tone.fields)assert.deepEqual(resolveField(field,cms.components).options.values.map((v:any)=>v.name),presets);
 }
 assert.deepEqual([...heroTonePresetValues],presets);
});

test('five different /seo Hero tone strategies can be saved independently, preserving original text',()=>{
 const page=JSON.parse(text('src/content/pages/seo.json'));
 const editor=entryForFile(cms,'app/src/content/pages/seo.json');
 const baselineHeroView=resolvePageHero(page);
 const candidates=[
  {eyebrowPreset:'noktern',titlePreset:'medon',supportPreset:'noktern'},
  {eyebrowPreset:'noktern',titlePreset:'spiss',supportPreset:'medon'},
  {eyebrowPreset:'medon',titlePreset:'spissplus',supportPreset:'noktern'},
  {eyebrowPreset:'spiss',titlePreset:'spisspluskomisk',supportPreset:'medon'},
  {eyebrowPreset:'spissplus',titlePreset:'spisspluskomiskplus',supportPreset:'spiss'},
 ] as const;
 for(const toneOverrides of candidates){
  const proposed=structuredClone(page);
  proposed.hero.toneOverrides=toneOverrides;
  const saved=JSON.parse(cmsJsonSave(page,proposed,editor,cms));
  assert.deepEqual(saved.hero.toneOverrides,toneOverrides);
  assert.equal(saved.hero.title,page.hero.title);
  assert.equal(saved.hero.eyebrow,page.hero.eyebrow);
  assert.equal(saved.hero.support,page.hero.support);
  assert.deepEqual(saved.hero.primaryCta,page.hero.primaryCta);
  assert.deepEqual(saved.sections,page.sections);
  assert.ok(pageSchema.safeParse(saved).success,'page schema must accept per-part presets');
  assert.ok(synlighetHeroSchema.safeParse(saved.hero).success,'service Hero schema must preserve per-part presets');
  assert.deepEqual(resolvePageHero(saved),baselineHeroView,'editorial tone must never change rendered Hero');
 }
 assert.equal(page.hero.toneOverrides,undefined,'no published page content or settings changed');
});

test('invalid presets rejected; inheritance stays optional and site-specific',()=>{
 assert.ok(heroToneOverridesSchema.safeParse(undefined).success);
 assert.ok(heroToneOverridesSchema.safeParse({titlePreset:'inherit'}).success);
 assert.ok(heroToneOverridesSchema.safeParse({titlePreset:'spiss'}).success);
 assert.equal(heroToneOverridesSchema.safeParse({titlePreset:'garbage'}).success,false);
 assert.equal(heroToneOverridesSchema.safeParse({primaryCtaPreset:'spiss'}).success,false,'CTA uses shared tone, not per-Hero override');
 assert.equal(heroToneOverridesSchema.safeParse({secondaryCtaPreset:'spiss'}).success,false,'CTA uses shared tone, not per-Hero override');
 assert.equal(heroToneOverridesSchema.safeParse({unknownPreset:'spiss'}).success,false);
 const siteTone=JSON.parse(text('../coordination/CONTENT-TONE.json'));
 assert.equal(siteTone.defaultPreset,'medon');
 assert.equal(siteTone.heroPreset,'spiss');
 const instructions=text('../coordination/H1-LAB.md');
 assert.match(instructions,/hero\.toneOverrides/);
 assert.match(instructions,/heroPreset/);
 assert.match(instructions,/defaultPreset/);
 assert.match(instructions,/does not regenerate or publish text/);
});
