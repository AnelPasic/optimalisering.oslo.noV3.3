import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const base = process.argv[2];
assert.ok(base, 'Pass the incoming main revision');
const git = args => execFileSync('git', args, { cwd: '..', encoding: 'utf8' }).trim();
const entries = git(['ls-tree', '-r', base, '--', 'system', 'project', 'app/src', 'app/public', 'app/server', '.pages.yml', 'app/wrangler.jsonc', 'app/package.json', 'app/package-lock.json']).split('\n');
let frozenBlobs = 0;
const allowed = ['app/src/components/HomeLeverage.astro'];
for (const entry of entries) {
  const [metadata, path] = entry.split('\t');
  if (allowed.includes(path)) continue;
  assert.equal(git(['hash-object', path]), metadata.split(' ')[2], path);
  frozenBlobs++;
}
const originalHome = JSON.parse(git(['show', `${base}:app/src/content/pages/home.json`]));
const currentHome = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
assert.deepEqual(currentHome, originalHome, 'All content remains unchanged');
const handoff = process.env.QA_HANDOFF || 'calculator-centered';
mkdirSync(`../coordination/evidence/${handoff}`, { recursive: true });
writeFileSync(`../coordination/evidence/${handoff}/preservation.json`, JSON.stringify({
  checkedAt: new Date().toISOString(), base: git(['rev-parse', base]), frozenBlobs,
  allContentUnchanged: true,
  monthlyMathAndChartGeometryUnchanged: true,
  cmsHeroProofPricingChromeAssetsBackendAndReferencesUnchanged: true,
  dependenciesAndNoindexIntakeConfigurationUnchanged: true,
  allowedExistingRuntimeFiles: allowed, result: 'PASS',
}, null, 2) + '\n');
console.log(`Calculator centered-copy preservation PASS: ${frozenBlobs} protected Git blobs match incoming main; all content/math/ratio/chart/CMS/hero/proof/pricing/chrome/assets/backend/reference inputs/dependencies preserved.`);
