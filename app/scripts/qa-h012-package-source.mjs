import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const source = 'src/content/pages/home.json';
const original = readFileSync(source);
const locked = Object.fromEntries(['priser', 'synlighet', 'konvertering'].map(slug => [slug, readFileSync(`src/content/pages/${slug}.json`)]));
try {
  const home = JSON.parse(original);
  home.homepage.packages.items[0].price = 4567;
  home.homepage.packages.items[0].title = 'H012 shared Optimalisering';
  home.homepage.packages.items[1].price = 6789;
  home.homepage.packages.items[1].recommended = false;
  home.homepage.packages.items[1].detailLink.href = '/priser/#vekst';
  home.homepage.packages.items[2].price = 15987;
  home.homepage.packages.items[2].priceNote = 'H012 shared price note';
  home.homepage.packages.items[0].fit = 'H012 shared fit';
  home.homepage.packages.items[0].selectionRule = 'H012 shared selection rule';
  home.homepage.packages.decisionStrip.heading = 'H012 shared decision heading';
  home.homepage.packages.multiplier.body = 'H012 shared multiplier body';
  home.homepage.chrome.navigation = home.homepage.chrome.navigation.filter(link => !['/synlighet/', '/konvertering/'].includes(link.href));
  for (const item of home.homepage.packages.items) item.vatSuffix = 'H012 shared VAT';
  writeFileSync(source, JSON.stringify(home, null, 2) + '\n');
  const build = spawnSync('npm run build', { shell: true, encoding: 'utf8' });
  assert.equal(build.status, 0, build.stdout + build.stderr);
  for (const path of ['dist/index.html', 'dist/priser/index.html', 'dist/synlighet/index.html', 'dist/konvertering/index.html']) {
    const html = readFileSync(path, 'utf8'), normalized = html.replace(/\s+/g, ' ');
    const renderedText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    for (const value of ['4 567 kr/mnd', '6 789 kr/mnd', 'H012 shared Optimalisering', 'H012 shared VAT']) assert.ok(renderedText.includes(value), `${path}: shared value reaches real route: ${value}`);
    assert.ok(!/4 500 kr\/mnd|6 900 kr\/mnd|eks\. mva\./.test(normalized), `${path}: no stale repeated price/VAT`);
    if (path === 'dist/index.html' || path === 'dist/priser/index.html') {
      assert.ok(renderedText.includes('fra 15 987 kr/mnd'), 'Partner from-price follows shared amount');
      assert.ok(renderedText.includes('H012 shared fit') && renderedText.includes('H012 shared selection rule'), 'Shared fit/card and financial FAQ rule follow source');
    }
    if (path === 'dist/index.html') assert.ok(html.includes('href="/priser/#vekst"'), 'Home detail link follows editable fragment');
    if (path === 'dist/priser/index.html') {
      for (const copy of ['H012 shared price note', 'H012 shared decision heading', 'H012 shared multiplier body']) assert.ok(renderedText.includes(copy), 'Full pricing details follow the same source');
      assert.ok(html.includes('<article id="vekst"'), 'Edited Vekst fragment reaches the full card');
      assert.ok(html.includes('<span id="begge" aria-hidden="true"'), 'Legacy Vekst anchor is retained independently');
    }
    if (path.includes('synlighet/') || path.includes('konvertering/')) {
      const name = path.includes('synlighet/') ? 'Synlighet' : 'Konvertering';
      const bridge = html.match(/<section id="service-priser"[^>]*>(.*?)<\/section>/s)?.[1];
      assert.ok(bridge, `${name}: service pricing bridge`);
      assert.ok(bridge.includes(`Når ${name} er det ene prioriterte området.`), `${name}: active service context independent of navigation`);
      assert.ok(bridge.includes(`Når ${name} jobber sammen med et annet område.`));
      const faq = html.match(/<section id="sporsmal"[^>]*>(.*?)<\/section>/s)[1];
      assert.ok(faq.includes('H012 shared Optimalisering til 4 567 kr/mnd H012 shared VAT'), 'Service FAQ also follows the shared source');
      assert.ok(!html.includes('class="package-badge"'), 'Service recommendation follows shared flag');
      const eyebrow = path.includes('synlighet/') ? 'SEO, lokal SEO og AI-synlighet' : 'Fra besøk til henvendelser og kjøp';
      assert.ok(html.includes('<span>' + eyebrow + '</span>'), 'Breadcrumb has a safe locked-content fallback when its menu entry is absent');
    }
    assert.ok(!/Nysta|Oslo Privatklinikk|id="resultater"/.test(html));
  }
  for (const [slug, bytes] of Object.entries(locked)) assert.ok(readFileSync(`src/content/pages/${slug}.json`).equals(bytes), `${slug}: no second source edit`);
  delete home.homepage.packages.items[2].pricePrefix;
  writeFileSync(source, JSON.stringify(home, null, 2) + '\n');
  const withoutPrefix = spawnSync('npm run build', { shell: true, encoding: 'utf8' });
  assert.equal(withoutPrefix.status, 0, withoutPrefix.stdout + withoutPrefix.stderr);
  for (const file of ['dist/index.html', 'dist/priser/index.html']) {
    const html = readFileSync(file, 'utf8');
    assert.ok(!html.includes('class="package-price-prefix"'), 'Optional absent prefix produces no card prefix');
    assert.ok(!html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').includes('fra 15 987 kr/mnd'), 'Absent prefix also clears repeated Partner facts');
  }
  mkdirSync('../coordination/evidence/h012', { recursive: true });
  writeFileSync('../coordination/evidence/h012/package-source-regression.json', JSON.stringify({ checkedAt: new Date().toISOString(), actualAstroRoutes: ['/', '/priser/', '/synlighet/', '/konvertering/'], sharedFieldsChanged: ['three prices', 'name', 'recommendation', 'VAT suffix', 'fit', 'selection rule', 'Partner price note', 'decision heading', 'multiplier body', 'optional prefix', 'Vekst detail anchor'], navigationEntryRemoved: true, safeBreadcrumbFallback: true, bridgeAndServiceFaqUpdated: true, optionalPrefixBothStates: true, editableAnchorWithLegacyAlias: true, secondSourceChanged: false, proofRendered: false, originalHomeBytesRestored: true, result: 'PASS', finalBuild: 'Run npm run verify after this check' }, null, 2) + '\n');
  console.log('H-012 source regression PASS: one CMS source updates all four real routes, including service bridge/FAQ.');
} finally { writeFileSync(source, original); }

