import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Integration regression: changing only the shared CMS source must update both
// actual Astro routes. The temporary values are never committed or published.
const source = 'src/content/pages/home.json';
const original = readFileSync(source);
const pricingOriginal = readFileSync('src/content/pages/priser.json');
try {
  const edited = JSON.parse(original.toString());
  edited.homepage.packages.items[0].price = 4567;
  edited.homepage.packages.items[1].recommended = false;
  edited.homepage.packages.items[0].fit = 'H008 temporary source regression';
  edited.homepage.packages.capacityNote = 'H008 temporary capacity regression';
  edited.homepage.packages.areas[0] = 'H008 temporary area regression';
  edited.homepage.packages.externalCostsNote = 'H008 temporary external-cost regression';
  edited.homepage.packages.separateWorkNote = 'H008 temporary separate-work regression';
  writeFileSync(source, JSON.stringify(edited, null, 2) + '\n');
  const build = spawnSync('npm run build', { shell: true, encoding: 'utf8' });
  assert.equal(build.status, 0, build.stdout + build.stderr);
  for (const path of ['dist/index.html', 'dist/priser/index.html']) {
    const html = readFileSync(path, 'utf8');
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    for (const value of ['4 567 kr/mnd', 'H008 temporary source regression', 'H008 temporary capacity regression', 'H008 temporary area regression', 'H008 temporary external-cost regression', 'H008 temporary separate-work regression']) assert.ok(text.includes(value), `${path}: edited shared field reaches the real renderer`);
    assert.ok(!html.replace(/\s+/g, ' ').includes('4 500 kr/mnd'), `${path}: no stale original price in FAQ, metadata or structured data`);
    if (path.includes('priser/')) assert.match(html, /<meta name="description" content="[^"]*4 567 kr\/mnd/, 'Shared price reaches pricing metadata');
    if (path.includes('priser/')) assert.equal((html.match(/id="begge"/g) ?? []).length, 1, 'Legacy anchor survives recommendation changes');
    assert.ok(!/Nysta|Oslo Privatklinikk|id="resultater"/.test(html), 'Proof remains non-public during source regression');
  }
  assert.ok(readFileSync('src/content/pages/priser.json').equals(pricingOriginal), 'No second content edit required');
  mkdirSync('../coordination/evidence/h008', { recursive: true });
  writeFileSync('../coordination/evidence/h008/package-source-regression.json', JSON.stringify({ checkedAt: new Date().toISOString(), actualAstroRoutes: ['/', '/priser/'], changedSharedFields: ['price', 'fit', 'capacityNote', 'areas', 'externalCostsNote', 'separateWorkNote', 'recommended'], staleOriginalPriceInFaqOrMetadata: false, legacyAnchorIndependentOfRecommendation: true, secondPricingSourceChanged: false, proofRendered: false, originalHomeBytesRestored: true, result: 'PASS', finalBuild: 'Run npm run verify after this check' }, null, 2) + '\n');
  console.log('H-008 source regression PASS: one CMS edit updates both actual routes; no second editable package source.');
} finally { writeFileSync(source, original); }
