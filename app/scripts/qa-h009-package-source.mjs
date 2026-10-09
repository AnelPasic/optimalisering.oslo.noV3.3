import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const source = 'src/content/pages/home.json';
const original = readFileSync(source);
const locked = Object.fromEntries(['priser', 'synlighet'].map(slug => [slug, readFileSync(`src/content/pages/${slug}.json`)]));
try {
  const home = JSON.parse(original);
  home.homepage.packages.items[0].price = 4567;
  home.homepage.packages.items[0].title = 'H009 shared Optimalisering';
  home.homepage.packages.items[1].price = 6789;
  home.homepage.packages.items[1].recommended = false;
  home.homepage.chrome.navigation = home.homepage.chrome.navigation.filter(link => link.href !== '/synlighet/');
  for (const item of home.homepage.packages.items) item.vatSuffix = 'H009 shared VAT';
  writeFileSync(source, JSON.stringify(home, null, 2) + '\n');
  const build = spawnSync('npm run build', { shell: true, encoding: 'utf8' });
  assert.equal(build.status, 0, build.stdout + build.stderr);
  for (const path of ['dist/index.html', 'dist/priser/index.html', 'dist/synlighet/index.html']) {
    const html = readFileSync(path, 'utf8'), normalized = html.replace(/\s+/g, ' ');
    const renderedText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    for (const value of ['4 567 kr/mnd', '6 789 kr/mnd', 'H009 shared Optimalisering', 'H009 shared VAT']) assert.ok(renderedText.includes(value), `${path}: shared value reaches real route: ${value}`);
    assert.ok(!/4 500 kr\/mnd|6 900 kr\/mnd|eks\. mva\./.test(normalized), `${path}: no stale repeated price/VAT`);
    if (path.includes('synlighet/')) {
      const faq = html.match(/<section id="sporsmal"[^>]*>(.*?)<\/section>/s)[1];
      assert.ok(faq.includes('H009 shared Optimalisering til 4 567 kr/mnd H009 shared VAT'), 'Service FAQ also follows the shared source');
      assert.ok(!html.includes('class="package-badge"'), 'Service recommendation follows shared flag');
      assert.ok(html.includes('<span>SEO, lokal SEO og AI-synlighet</span>'), 'Breadcrumb has a safe locked-content fallback when its menu entry is absent');
    }
    assert.ok(!/Nysta|Oslo Privatklinikk|id="resultater"/.test(html));
  }
  for (const [slug, bytes] of Object.entries(locked)) assert.ok(readFileSync(`src/content/pages/${slug}.json`).equals(bytes), `${slug}: no second source edit`);
  mkdirSync('../coordination/evidence/h009', { recursive: true });
  writeFileSync('../coordination/evidence/h009/package-source-regression.json', JSON.stringify({ checkedAt: new Date().toISOString(), actualAstroRoutes: ['/', '/priser/', '/synlighet/'], sharedFieldsChanged: ['two prices', 'name', 'recommendation', 'VAT suffix'], navigationEntryRemoved: true, safeBreadcrumbFallback: true, bridgeAndServiceFaqUpdated: true, secondSourceChanged: false, proofRendered: false, originalHomeBytesRestored: true, result: 'PASS', finalBuild: 'Run npm run verify after this check' }, null, 2) + '\n');
  console.log('H-009 source regression PASS: one CMS source updates all three real routes, including service bridge/FAQ.');
} finally { writeFileSync(source, original); }
