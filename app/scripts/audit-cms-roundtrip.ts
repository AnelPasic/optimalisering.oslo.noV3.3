import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { proofContentSchema, getPublishableCases } from '../src/lib/proof.ts';
import { cmsJsonSave, entryForFile } from '../tests/helpers/pages-cms-json.ts';

// Read-only JSON simulation; authenticated UI saves are recorded separately.
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
assert.equal(cms.settings.content.merge, true);
const hash = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex');
const records = ['pages', 'proof'].flatMap(directory => readdirSync(`src/content/${directory}`)
  .filter(file => file.endsWith('.json')).map(file => ({ directory, file: `src/content/${directory}/${file}` })));
const snapshots = records.map(record => ({ ...record, bytes: readFileSync(record.file) }));
const checks = snapshots.map(record => {
  const original = JSON.parse(record.bytes.toString());
  const form = structuredClone(original);
  const field = record.directory === 'pages' ? 'title' : 'source';
  form[field] = 'H017B harmless in-memory round-trip';
  const entry = entryForFile(cms, `app/${record.file}`);
  assert.ok(entry, record.file);
  const serialized = cmsJsonSave(original, form, entry, cms);
  const saved = JSON.parse(serialized);
  const expected = { ...original, [field]: form[field] };
  const schema = record.directory === 'pages' ? pageSchema : proofContentSchema;
  assert.deepEqual(schema.parse(saved), schema.parse(expected), record.file);
  return { file: `app/${record.file}`, originalSha256: hash(record.bytes), serializedFixtureSha256: hash(serialized), editor: entry.name, editedField: field, semanticOnlyExpectedEdit: true };
});
const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const form = structuredClone(home);
const originalLabel = home.homepage.selector.items[1].title;
form.homepage.selector.items[1].title = originalLabel + ' (CMS-test)';
const saved = JSON.parse(cmsJsonSave(home, form, entryForFile(cms, 'app/src/content/pages/home.json'), cms));
assert.deepEqual(pageSchema.parse(saved), pageSchema.parse(form));
assert.deepEqual(getPublishableCases(saved.homepage.proof, snapshots.filter(record => record.directory === 'proof').map(record => proofContentSchema.parse(JSON.parse(record.bytes.toString())))), []);
for (const snapshot of snapshots) assert.equal(hash(readFileSync(snapshot.file)), hash(snapshot.bytes), snapshot.file + ' remains byte-identical');
const report = {
  checkedAt: new Date().toISOString(), mode: 'read-only Pages-CMS-equivalent JSON fixture; not an authenticated save',
  upstreamRevision: '6f4e860a35d934406580287e7042e5e111e207a1', merge: true,
  normalization: 'Declared fields; deep object merge; array replacement; null/empty value sanitization; two-space JSON. Empty optional values normalize through actual application schemas. Nonempty unmodeled object/root fields survive merge; array item fields must be modeled.',
  checks, representative: { field: 'homepage.selector.items[1].title', before: originalLabel, after: form.homepage.selector.items[1].title, semanticOnlyExpectedEdit: true, publishableCases: 0 },
  allSourceFilesByteUnchanged: true,
};
const reportArg = process.argv.indexOf('--report');
if (reportArg !== -1) writeFileSync(process.argv[reportArg + 1], JSON.stringify(report, null, 2) + '\n');
console.log(`CMS round-trip PASS: ${checks.length} content JSON hashes, schema-equivalent edits, representative selector edit, zero published proof; all source bytes unchanged.`);
