import {homepageBlockEditor} from './helpers/pages-cms-json.ts';
import {getHomepageBlock} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { proofCaseSchema, proofContentSchema, getPublishableCases } from '../src/lib/proof.ts';
import { cmsJsonSave, entryForFile, resolveField, assertPreservedContent } from './helpers/pages-cms-json.ts';

const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const records = ['pages', 'proof'].flatMap(directory => readdirSync(`src/content/${directory}`).filter(file => file.endsWith('.json')).map(file => ({
  path: `app/src/content/${directory}/${file}`, bytes: readFileSync(`src/content/${directory}/${file}`), directory,
})));
const hash = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex');

test('customer workflow maps each existing page to its dedicated file or correct service/editorial collection', () => {
  for (const name of ['home', 'priser', 'om', 'vurdering', 'kontakt', 'personvern', 'vilkar']) {
    assert.equal(entryForFile(cms, `app/src/content/pages/${name}.json`)?.type, 'file', name);
  }
  const services = cms.content.find((entry: any) => entry.label === 'Tjenester');
  assert.equal(services?.type, 'collection');
  const visible = records.filter(record => record.directory === 'pages' && entryForFile(cms, record.path) === services).map(record => JSON.parse(record.bytes.toString()));
  assert.deepEqual(visible.map(page => page.slug).sort(), ['ai-synlighet', 'konvertering', 'nettbutikkoptimalisering', 'seo', 'synlighet']);
  for (const record of records.filter(record => record.directory === 'pages')) {
    const entry = entryForFile(cms, record.path);
    assert.ok(entry, record.path);
    assert.equal(cms.content.filter((candidate: any) => entryForFile({ ...cms, content: [candidate] }, record.path)).length, 1, 'No ambiguous page editor');
    for (const field of entry.fields) assert.ok(!['slug', 'kind', 'status', 'authority', 'locale', 'translationKey'].includes(field.name) || field.hidden === true || (field.name === 'slug' && field.readonly === true), field.name);
    for (const operation of ['create', 'rename', 'delete']) assert.equal(entry.operations?.[operation], false, 'Existing page identity remains protected');
  }
});

test('object repeaters start collapsed with meaningful summaries supported by Pages CMS', () => {
  let count = 0;
  function check(fields: any[]) {
    for (const definition of fields) {
      const field = resolveField(definition, cms.components);
      if (field.list && field.type === 'object') {
        count++;
        assert.equal(field.list.collapsible?.collapsed, true, field.name);
        assert.match(field.list.collapsible?.summary ?? '', /\{(?:fields\.)?(?:heading|question|title|label|metric|index|term|slug)\}/, field.name);
      }
      if (field.fields) check(field.fields);
    }
  }
  function checkEntries(entries: any[]) {
    for (const entry of entries) entry.type === 'group' ? checkEntries(entry.items) : check(entry.fields);
  }
  checkEntries(cms.content);
  assert.ok(count > 0);
});

test('the multiple case reference retains a flat array without an outer list wrapper', () => {
  const proof=homepageBlockEditor(cms,'proof');
  const reference = proof.fields.find((field: any) => field.name === 'caseIds');
  assert.equal(reference.type, 'reference');
  assert.equal(reference.options.multiple, true);
  assert.equal(reference.list, undefined, 'multiple references already serialize as a flat array');
});

test('CMS-equivalent edit preserves every current JSON record semantically and untouched file hashes', () => {
  assert.equal(cms.settings.content.merge, true);
  for (const edited of records) {
    const original = JSON.parse(edited.bytes.toString()), form = structuredClone(original);
    const field = edited.directory === 'pages' ? 'title' : 'source';
    if(form.kind==='pricing')form.seo.description='H017B harmless memory-only edit';
    else (form.kind==='home'?form.hero:form)[field] = 'H017B harmless memory-only edit';
    const entry = entryForFile(cms, edited.path);
    assert.ok(entry, edited.path);
    const after = JSON.parse(cmsJsonSave(original, form, entry, cms));
    const expected = structuredClone(form);
    assertPreservedContent(expected, after);
    const schema = edited.directory === 'pages' ? pageSchema : proofContentSchema;
    const normalizedExpected = edited.directory === 'proof' && expected.publicationApproved === true && !proofCaseSchema.safeParse(after).success ? { ...expected, publicationApproved: false } : expected;
    assert.deepEqual(schema.parse(after), schema.parse(normalizedExpected), edited.path + ': only the chosen field changes; incomplete proof stays fail-closed');
    for (const record of records.filter(record => record !== edited)) assert.equal(hash(readFileSync(record.path.slice(4))), hash(record.bytes), record.path);
  }
});

test('CMS rejects clearing mandatory text before it can create a broken content commit', () => {
  for (const [name, path] of [['home', ['seo', 'title']], ['seo', ['eyebrow']], ['seo', ['sections', 0, 'heading']], ['seo', ['faq', 0, 'question']]] as const) {
    const original = JSON.parse(records.find(record => record.path.endsWith('/' + name + '.json'))!.bytes.toString());
    const form = structuredClone(original);
    let object = form;
    for (const key of path.slice(0, -1)) object = object[key];
    object[path.at(-1)!] = '';
    assert.throws(() => cmsJsonSave(original, form, entryForFile(cms, `app/src/content/pages/${name}.json`), cms), /required/);
  }
});

test('initialized optional internal links accept blank input while rejecting an external route', () => {
  const original = JSON.parse(records.find(record => record.path.endsWith('/seo.json'))!.bytes.toString());
  const form = structuredClone(original);
  const item = form.sections.flatMap((section: any) => section.items ?? []).find((item: any) => item.href === undefined);
  assert.ok(item);
  item.href = ''; // Pages CMS initializeState supplies empty strings for missing scalars
  const entry = entryForFile(cms, 'app/src/content/pages/seo.json');
  const after = JSON.parse(cmsJsonSave(original, form, entry, cms));
  assert.deepEqual(pageSchema.parse(after), pageSchema.parse(original));
  item.href = 'https://example.invalid/';
  assert.throws(() => cmsJsonSave(original, form, entry, cms), /pattern/);
});

test('raw preservation checks expose nonempty unmodeled repeater data loss', () => {
  const original = JSON.parse(records.find(record => record.path.endsWith('/home.json'))!.bytes.toString());
  (getHomepageBlock(original,'packages').content.items[0] as any).futureInternalMetadata = { token: 'must-survive' };
  const form = structuredClone(original);
  form.title = 'H017B harmless memory-only edit';
  const after = JSON.parse(cmsJsonSave(original, form, entryForFile(cms, 'app/src/content/pages/home.json'), cms));
  assert.throws(() => assertPreservedContent(form, after), /futureInternalMetadata.*nonempty content lost/);
});

test('merge preserves omitted nonempty metadata without promoting authority or proof', () => {
  const record = records.find(record => record.path.endsWith('/home.json'))!;
  const original = JSON.parse(record.bytes.toString());
  original.unmodeled = { token: 'preserve', nested: [1, 2] };
  original.homepage.unmodeled = { token: 'preserve nested object' };
  const form = structuredClone(original);
  for (const field of ['slug', 'kind', 'status', 'authority', 'unmodeled']) delete form[field];
  delete form.homepage.unmodeled;
  form.title = 'H017B harmless memory-only edit';
  const after = JSON.parse(cmsJsonSave(original, form, entryForFile(cms, record.path), cms));
  for (const field of ['slug', 'kind', 'status', 'authority', 'unmodeled']) assert.deepEqual(after[field], original[field], field);
  assert.deepEqual(after.homepage.unmodeled, original.homepage.unmodeled);
  const proof = records.filter(record => record.directory === 'proof').map(record => JSON.parse(record.bytes.toString()));
  assert.deepEqual(getPublishableCases(getHomepageBlock(after,'proof').content, proof), getPublishableCases(getHomepageBlock(original,'proof').content, proof));
});

test('omitted unknown evidence values stay null and cannot make a case publishable', () => {
  const record = records.find(record => record.directory === 'proof')!;
  const original = JSON.parse(record.bytes.toString());
  const edited = structuredClone(original);
  delete edited.before; delete edited.after; delete edited.permissionEvidence;
  edited.publicationStatus = 'PUBLISHABLE'; edited.publicationApproved = true;
  edited.namingPermission = 'NAME_APPROVED'; edited.strategyReviewStatus = 'CONTENT_LOCKED';
  const parsed = proofContentSchema.parse(edited);
  assert.equal(parsed.before, null); assert.equal(parsed.after, null); assert.equal(parsed.permissionEvidence, null);
  assert.deepEqual(getPublishableCases({ publicationApproved: true, caseIds: [parsed.id] }, [parsed]), []);
});
