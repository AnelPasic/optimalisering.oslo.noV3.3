import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { getPublishableCases, proofContentSchema } from '../src/lib/proof.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { cmsJsonSave, entryForFile, assertPreservedContent, resolveField } from './helpers/pages-cms-json.ts';

const read = (file: string) => JSON.parse(readFileSync(file, 'utf8'));
const records = readdirSync('src/content/proof').filter(f => f.endsWith('.json')).map(f => read(`src/content/proof/${f}`));
const home = read('src/content/pages/home.json');
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));

test('D-075-D-076 selects the final guarded proof placements in order', () => {
  assert.deepEqual(getPublishableCases(home.homepage.proof, records).map(p => p.displayName), ['Eurotents', 'Nysta', 'Helt Opplagt']);
  for (const [slug, name] of [['konvertering', 'Nysta'], ['synlighet', 'Helt Opplagt']]) {
    const page = read(`src/content/pages/${slug}.json`);
    assert.deepEqual(getPublishableCases(page.proof, records).map(p => p.displayName), [name]);
  }
  assert.deepEqual(getPublishableCases({ publicationApproved: true, caseIds: ['oslo-privatklinikk'] }, records), []);
  for (const id of ['eurotents', 'nysta', 'helt-opplagt']) {
    const record = records.find(p => p.id === id);
    assert.ok(record);
    for (const mutation of [{ period: { ...record.period, comparable: false } }, { publicationApproved: false }, { namingPermission: 'NEEDS_PERMISSION' }, { strategyReviewStatus: 'READY_FOR_STRATEGY_REVIEW' }, { before: null }]) {
      assert.deepEqual(getPublishableCases({ publicationApproved: true, caseIds: [id] }, [proofContentSchema.parse({ ...record, ...mutation })]), []);
    }
  }
});

test('safe home/service CMS presentation edits preserve authority and case gates', () => {
  for (const slug of ['home', 'konvertering', 'synlighet']) {
    const original = read(`src/content/pages/${slug}.json`);
    const form = structuredClone(original);
    const slot = slug === 'home' ? form.homepage.proof : form.proof;
    assert.ok(slot);
    slot.heading = 'Resultater fra kundearbeid';
    slot.eyebrow = 'Dokumenterte resultater';
    slot.beforeLabel = 'Før tiltakene'; slot.afterLabel = 'Etter tiltakene'; slot.changeLabel = 'Arbeidet';
    slot.caseIds = ['nysta'];
    const entry = entryForFile(cms, `app/src/content/pages/${slug}.json`);
    const saved = readFromSave(cmsJsonSave(original, form, entry, cms));
    assertPreservedContent(form, saved);
    assert.deepEqual(pageSchema.parse(saved), pageSchema.parse(form));
    const savedSlot = slug === 'home' ? saved.homepage.proof : saved.proof;
    assert.equal(savedSlot.heading, slot.heading);
    assert.deepEqual(getPublishableCases(savedSlot, records).map(p => p.displayName), ['Nysta']);
    assert.equal(saved.authority, original.authority);
    const definitions = slug === 'home' ? entry.fields.find((f: any) => f.name === 'homepage').fields : entry.fields;
    const proof = resolveField(definitions.find((f: any) => f.name === 'proof'), cms.components);
    assert.equal(proof.fields.find((f: any) => f.name === 'publicationApproved').readonly, true);
    slot.caseIds = [];
    const cleared = pageSchema.parse(readFromSave(cmsJsonSave(original, form, entry, cms)));
    const clearedSlot = slug === 'home' ? cleared.homepage!.proof : cleared.proof;
    assert.deepEqual(getPublishableCases(clearedSlot, records), [], 'Empty CMS reference selection removes proof');
  }
  const registry = cms.content.find((e: any) => e.name === 'proofCases');
  const check = (fields: any[]) => fields.forEach(f => { assert.equal(f.readonly, true, f.name); if (f.fields) check(f.fields); });
  check(registry.fields);
  for (const op of ['create', 'delete', 'rename']) assert.equal(registry.operations[op], false);
});

function readFromSave(value: string) { return JSON.parse(value); }
