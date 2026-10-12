import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const base = process.argv[2];
assert.ok(base, 'Pass the incoming main revision');
const git = args => execFileSync('git', args, { cwd: '..', encoding: 'utf8' }).trim();
const allowed = new Set(['app/src/components/HomePage.astro', 'app/src/components/HomeHeroPhoto.astro', 'app/package.json']);
const entries = git(['ls-tree', '-r', base, '--', 'system', 'project', 'app/src', 'app/public', 'app/server', '.pages.yml', 'app/wrangler.jsonc', 'app/package.json']).split('\n');
let frozenBlobs = 0;
for (const entry of entries) {
  const [metadata, path] = entry.split('\t');
  if (allowed.has(path)) continue;
  const expected = metadata.split(' ')[2];
  assert.equal(git(['hash-object', path]), expected, path);
  frozenBlobs++;
}
mkdirSync('../coordination/evidence/h017e', { recursive: true });
writeFileSync('../coordination/evidence/h017e/preservation.json', JSON.stringify({
  checkedAt: new Date().toISOString(), base: git(['rev-parse', base]), frozenBlobs,
  allContentProofRegistryCmsAndGatesUnchanged: true,
  lowerProofComponentPublicStylesAssetsBackendAndReferencesUnchanged: true,
  allowedExistingFiles: [...allowed], result: 'PASS',
}, null, 2) + '\n');
console.log(`H-017E preservation PASS: ${frozenBlobs} frozen Git blobs match incoming main; all content/CMS/proof gates/lower proof/public styles/assets/backend/reference inputs preserved.`);
