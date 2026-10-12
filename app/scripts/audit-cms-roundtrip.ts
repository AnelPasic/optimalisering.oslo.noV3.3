import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { proofCaseSchema, proofContentSchema, getPublishableCases } from '../src/lib/proof.ts';
import { cmsJsonSave, entryForFile, assertPreservedContent } from '../tests/helpers/pages-cms-json.ts';
import { glossarySchema } from '../src/lib/terminology.ts';

// Read-only JSON simulation; authenticated UI saves are recorded separately.
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
assert.equal(cms.settings.content.merge, true);
const hash = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex');
const records = ['pages', 'proof', 'terminology'].flatMap(directory => readdirSync(`src/content/${directory}`)
  .filter(file => file.endsWith('.json')).map(file => ({ directory, file: `src/content/${directory}/${file}` })));
const snapshots = records.map(record => ({ ...record, bytes: readFileSync(record.file) }));
const checks = snapshots.map(record => {
  const original = JSON.parse(record.bytes.toString());
  const form = structuredClone(original);
  const field = record.directory === 'proof' ? null : 'title';
  if (field) form[field] = 'H017B harmless in-memory round-trip';
  const entry = entryForFile(cms, `app/${record.file}`);
  assert.ok(entry, record.file);
  const serialized = cmsJsonSave(original, form, entry, cms);
  const saved = JSON.parse(serialized);
  const expected = field ? { ...original, [field]: form[field] } : original;
  assertPreservedContent(expected, saved);
  const schema = record.directory === 'pages' ? pageSchema : record.directory === 'terminology' ? glossarySchema : proofContentSchema;
  const normalizedExpected = record.directory === 'proof' && expected.publicationApproved === true && !proofCaseSchema.safeParse(saved).success ? { ...expected, publicationApproved: false } : expected;
  assert.deepEqual(schema.parse(saved), schema.parse(normalizedExpected), record.file);
  return { file: `app/${record.file}`, originalSha256: hash(record.bytes), serializedFixtureSha256: hash(serialized), editor: entry.name, editedField: field, semanticOnlyExpectedEdit: true };
});
const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const form = structuredClone(home);
const originalLabel = home.homepage.selector.items[2].title;
if (process.argv.includes('--expect-smoke-label')) assert.equal(originalLabel, 'Ja takk - Begge deler');
form.homepage.selector.items[2].title = originalLabel + ' (CMS-test)';
const saved = JSON.parse(cmsJsonSave(home, form, entryForFile(cms, 'app/src/content/pages/home.json'), cms));
assert.deepEqual(pageSchema.parse(saved), pageSchema.parse(form));
assertPreservedContent(form, saved);
const proofRecords = snapshots.filter(record => record.directory === 'proof').map(record => proofContentSchema.parse(JSON.parse(record.bytes.toString())));
const publicCases = getPublishableCases(home.homepage.proof, proofRecords);
assert.deepEqual(getPublishableCases(saved.homepage.proof, proofRecords), publicCases);
for (const snapshot of snapshots) assert.equal(hash(readFileSync(snapshot.file)), hash(snapshot.bytes), snapshot.file + ' remains byte-identical');
const report = {
  checkedAt: new Date().toISOString(), mode: 'read-only Pages-CMS-equivalent JSON fixture; not an authenticated save',
  upstreamRevision: '6f4e860a35d934406580287e7042e5e111e207a1', merge: true,
  normalization: 'Declared fields; deep object merge; array replacement; null/empty value sanitization; two-space JSON. Empty optional values normalize through actual application schemas. Nonempty unmodeled object/root fields survive merge; array item fields must be modeled.',
  checks, representative: { field: 'homepage.selector.items[2].title', before: originalLabel, after: form.homepage.selector.items[2].title, semanticOnlyExpectedEdit: true, publishableCases: publicCases.length },
  allSourceFilesByteUnchanged: true,
};
const reportArg = process.argv.indexOf('--report');
if (reportArg !== -1) writeFileSync(process.argv[reportArg + 1], JSON.stringify(report, null, 2) + '\n');
console.log(`CMS round-trip PASS: ${checks.length} content JSON hashes, schema-equivalent edits, representative selector edit, unchanged proof publication; all source bytes unchanged.`);
