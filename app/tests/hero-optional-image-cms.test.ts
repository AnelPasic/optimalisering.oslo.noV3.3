import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { cmsJsonSave, entryForFile, resolveField } from './helpers/pages-cms-json.ts';

const cms = YAML.parse(readFileSync('../.pages.yml','utf8'));
const files = readdirSync('src/content/pages').filter(file=>file.endsWith('.json')).sort();
const load = (file:string) => JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));
const editor = (file:string) => entryForFile(cms,'app/src/content/pages/'+file);
function visualField(file:string) {
  const hero = resolveField(editor(file).fields.find((field:any)=>field.name==='hero'),cms.components);
  return resolveField(hero.fields.find((field:any)=>field.name==='visual'),cms.components);
}

test('every page uses one non-list conditional Hero visual block matching existing kind and image JSON', () => {
  assert.equal(files.length,17);
  for (const file of files) {
    const visual = visualField(file);
    assert.equal(visual.type,'block',file);
    assert.equal(visual.blockKey,'kind',file);
    assert.equal(visual.list,undefined,file);
    assert.equal(visual.required,true,file);
    assert.deepEqual(visual.blocks.map((block:any)=>block.name),['none','image'],file);
    assert.deepEqual(visual.blocks[0].fields,[],file);
    const image = visual.blocks[1].fields.find((field:any)=>field.name==='image');
    assert.equal(image.type,'object',file);
    assert.equal(image.required,true,file);
    assert.ok(image.fields.find((field:any)=>field.name==='src').required,file);
    if (file !== 'home.json') for(const name of ['kind','alt']) {
      assert.equal(image.fields.find((field:any)=>field.name===name).required,true,file);
    }
  }
});

test('pages with no Hero image save unchanged without validation errors in inactive image fields', () => {
  for(const file of files) {
    const page = load(file);
    if (page.hero.visual.kind !== 'none') continue;
    const saved = JSON.parse(cmsJsonSave(page,page,editor(file),cms));
    assert.deepEqual(saved,page,file);
    assert.equal(saved.hero.visual.kind,'none',file);
    assert.ok(pageSchema.safeParse(saved).success,file);
  }
});

test('switching an existing Hero image to Ingen retains prior image, crop and alt for reversible edits', () => {
  for(const file of files) {
    const original = load(file);
    if(original.hero.visual.kind!=='image') continue;
    const changed = structuredClone(original);
    changed.hero.visual = {kind:'none'};
    const saved = JSON.parse(cmsJsonSave(original,changed,editor(file),cms));
    assert.equal(saved.hero.visual.kind,'none',file);
    assert.deepEqual(saved.hero.visual.image,original.hero.visual.image,file);
    assert.deepEqual(saved.seo,original.seo,file);
    assert.deepEqual(saved.sections,original.sections,file);
    assert.ok(pageSchema.safeParse(saved).success,file);
    changed.hero.visual = {kind:'image',image:structuredClone(saved.hero.visual.image)};
    const restored = JSON.parse(cmsJsonSave(saved,changed,editor(file),cms));
    assert.deepEqual(restored.hero.visual,original.hero.visual,file);
  }
});

test('Bilde still requires real image fields and will not save an incomplete Hero', () => {
  for(const file of ['home.json','priser.json','seo.json','synlighet.json']) {
    const original = load(file);
    const changed = structuredClone(original);
    changed.hero.visual={kind:'image',image:{}};
    assert.throws(()=>cmsJsonSave(original,changed,editor(file),cms),/required/,file);
    assert.equal(pageSchema.safeParse(changed).success,false,file);
    const invalid = structuredClone(original);
    invalid.hero.visual={kind:'image',image:{src:'/images/services/example.webp'}};
    if(file!=='home.json') assert.throws(()=>cmsJsonSave(original,invalid,editor(file),cms),/required/,file);
  }
});
