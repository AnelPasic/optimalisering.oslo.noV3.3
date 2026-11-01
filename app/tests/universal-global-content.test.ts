import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import {pageFilePaths} from './helpers/page-sources.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { getGlobalElement } from '../src/lib/home-builder.ts';
import { serviceGlobalIds, validateServiceGlobalProof } from '../src/lib/service-sections.ts';
import { cmsJsonSave, entryForFile, resolveField, assertPreservedContent } from './helpers/pages-cms-json.ts';

const cms = YAML.parse(readFileSync('../.pages.yml','utf8'));
const sources = pageFilePaths();
const reference = (element: string, visibility?: 'hidden') => ({ _block: 'global', element, ...(visibility ? { visibility } : {}) });

test('every native page editor offers the same eight canonical global content references', () => {
  assert.equal(sources.length,17);
  for (const file of sources) {
    const entry = entryForFile(cms, 'app/src/content/pages/' + file);
    assert.ok(entry, file);
    const section = entry.fields.find((field: any) => field.name === 'sections');
    assert.ok(section?.type === 'block', file);
    const globalBlock = section.blocks.find((block: any) => block.name === 'global');
    assert.ok(globalBlock, file);
    const fields = resolveField(globalBlock, cms.components).fields;
    const element = fields.find((field: any) => field.name === 'element');
    assert.deepEqual(element.options.values.map((value: any) => value.name).sort(), [...serviceGlobalIds].sort(), file);
    assert.ok(fields.some((field: any) => field.name === 'visibility'), file);
  }
});

test('all seventeen pages save references in the existing section order, without copying masters or changing owned content', () => {
  for (const file of sources) {
    const original = JSON.parse(readFileSync('src/content/pages/' + file,'utf8'));
    const entry = entryForFile(cms, 'app/src/content/pages/' + file);
    const changed = structuredClone(original);
    changed.sections=[...(changed.sections??[]),reference('mekanisme')];
    const saved = JSON.parse(cmsJsonSave(original, changed, entry, cms));
    assertPreservedContent(changed,saved);
    assert.deepEqual(saved.sections.at(-1),reference('mekanisme'),file);
    assert.deepEqual(saved.hero,original.hero,file);
    assert.deepEqual(saved.seo,original.seo,file);
    const parsed = pageSchema.parse(saved);
    if(file==='home.json') assert.equal(parsed.sections.at(-1)?.id,'mekanisme',file);
    else assert.equal(parsed.sections.at(-1)?.globalElement,'mekanisme',file);
    assert.deepEqual(parsed.sections.at(-1)?.heading,getGlobalElement('mekanisme').heading,file);
    assert.deepEqual(parsed.sections.at(-1)?.body,getGlobalElement('mekanisme').body,file);
  }
});

test('every non-home page can hide a placed reference without destroying the source or resurrecting a fallback', () => {
  for (const file of sources.filter(file=>file!=='home.json')) {
    const source = JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));
    const before = structuredClone(source.sections??[]);
    source.sections=[...(source.sections??[]),reference('mekanisme','hidden')];
    const parsed = pageSchema.parse(source);
    assert.equal(parsed.sections.some(section => section.globalElement === 'mekanisme'),false,file);
    assert.deepEqual(source.sections.slice(0,-1),before,file);
  }
});

test('invalid, forged and duplicate global placements fail on pricing and ordinary pages too', () => {
  for (const file of ['priser.json','om.json','innsikt.json','managed-articles/innsikt-google-bedriftsprofil.json','konvertering.json']) {
    const original = JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));
    for (const extra of [
      [reference('invalid')],
      [reference('mekanisme'), reference('mekanisme')],
      [{...getGlobalElement('mekanisme'),globalElement:'mekanisme'}],
      [{_block:'content',id:'mekanisme',heading:'Lokal'},reference('mekanisme')],
    ]) {
      assert.equal(pageSchema.safeParse({...original, sections:[...original.sections,...extra]}).success,false,file);
    }
  }
});

test('global proof on non-service pages retains its independent evidence gate', () => {
  const source = JSON.parse(readFileSync('src/content/pages/priser.json','utf8'));
  const page = pageSchema.parse({...source,sections:[...source.sections.filter((s:any)=>s.element!=='resultater'),reference('resultater')]});
  assert.throws(()=>validateServiceGlobalProof(page,[]),/publiseringsgodkjenning|publiserbare/);
});
