import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const base = process.argv[2];
assert.ok(base, 'Pass the incoming main revision');
const git = args => execFileSync('git', args, { cwd: '..', encoding: 'utf8' }).trim();
const entries = git(['ls-tree', '-r', base, '--', 'system', 'project', 'app/src', 'app/public', 'app/server', '.pages.yml', 'app/wrangler.jsonc', 'app/package.json', 'app/package-lock.json']).split('\n');
let frozenBlobs = 0;
for (const entry of entries) {
  const [metadata, path] = entry.split('\t');
  if (path === 'app/src/components/HomeLeverage.astro') continue;
  assert.equal(git(['hash-object', path]), metadata.split(' ')[2], path);
  frozenBlobs++;
}
mkdirSync('../coordination/evidence/calculator-chart', { recursive: true });
writeFileSync('../coordination/evidence/calculator-chart/preservation.json', JSON.stringify({
  checkedAt: new Date().toISOString(), base: git(['rev-parse', base]), frozenBlobs,
  allContentCmsMathHeroProofPricingChromeAssetsBackendAndReferencesUnchanged: true,
  dependenciesAndNoindexIntakeConfigurationUnchanged: true,
  allowedExistingRuntimeFile: 'app/src/components/HomeLeverage.astro', result: 'PASS',
}, null, 2) + '\n');
console.log(`Calculator chart preservation PASS: ${frozenBlobs} protected Git blobs match incoming main; calculator math/content/CMS/hero/proof/pricing/chrome/assets/backend/reference inputs and dependencies unchanged.`);
