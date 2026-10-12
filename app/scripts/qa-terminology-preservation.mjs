import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import YAML from 'yaml';
const base = process.argv[2];
assert.ok(base, 'Pass the incoming main revision');
const git = args => execFileSync('git', args, { cwd: '..', encoding: 'utf8' }).trim();
const polish = process.argv.includes('--polish');
const allowed = polish ? ['app/src/pages/begreper.astro'] : [
  '.pages.yml', 'app/src/layouts/SiteLayout.astro', 'app/src/pages/sitemap.xml.ts',
  ...['ContentSection', 'Footer', 'HomeFooter', 'HomeHeroPhoto', 'HomeLeverage', 'HomePage', 'HomeProof', 'HomeSection', 'PackageSection'].map(name => `app/src/components/${name}.astro`),
];
const entries = git(['ls-tree', '-r', base, '--', 'system', 'project', 'app/src', 'app/public', 'app/server', '.pages.yml', 'app/wrangler.jsonc', 'app/package.json', 'app/package-lock.json']).split('\n');
let frozenBlobs = 0;
for (const entry of entries) {
  const [metadata, path] = entry.split('\t');
  if (allowed.includes(path)) continue;
  assert.equal(git(['hash-object', path]), metadata.split(' ')[2], path);
  frozenBlobs++;
}
const before = YAML.parse(git(['show', `${base}:.pages.yml`]));
const after = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
assert.equal(after.content.filter(entry => entry.name === 'terminology').length, 1);
if (!polish) after.content = after.content.filter(entry => entry.name !== 'terminology');
assert.deepEqual(after, before, 'Existing CMS configuration is preserved');
const directory = `../coordination/evidence/${polish ? 'terminology-polish' : 'terminology'}`;
mkdirSync(directory, { recursive: true });
writeFileSync(`${directory}/preservation.json`, JSON.stringify({ checkedAt: new Date().toISOString(), base, frozenBlobs, allExistingContentJSONUnchanged: true, existingCMSConfigurationUnchanged: true, mathChartRatioProofGatesPricingBackendReferencesAssetsDependenciesAndNoindexIntakeUnchanged: true, allowedExistingRuntimeFiles: allowed, result: 'PASS' }, null, 2) + '\n');
console.log(`Terminology preservation PASS: ${frozenBlobs} protected Git blobs, every existing content JSON and existing CMS configuration unchanged.`);
