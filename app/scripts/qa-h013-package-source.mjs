import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { resolve, sep } from 'node:path';
const fixtureFiles = ['public/images/pricing/h013-test-0.svg','public/images/pricing/h013-test-1.svg','public/images/pricing/h013-test-2.png'];
for (const file of fixtureFiles) assert.ok(!existsSync(file), 'No existing asset overwritten');
const source = 'src/content/pages/home.json';
const original = readFileSync(source);
const locked = Object.fromEntries(['priser', 'synlighet', 'konvertering'].map(slug => [slug, readFileSync(`src/content/pages/${slug}.json`)]));
try {
  const home = JSON.parse(original);
  home.homepage.packages.items[0].price = 4567;
  home.homepage.packages.items[0].title = 'H013 shared Optimalisering';
  home.homepage.packages.items[1].price = 6789;
  home.homepage.packages.items[1].recommended = false;
  home.homepage.packages.items[1].detailLink.href = '/priser/#vekst';
  home.homepage.packages.items[2].price = 15987;
  home.homepage.packages.items[2].priceNote = 'H013 shared price note';
  home.homepage.packages.items[0].iconItems[0] = {icon:'local',label:'H013 shared focus'};
  home.homepage.packages.items.forEach((item,index)=>{item.visualAsset={src:`/images/pricing/h013-missing-${index}.svg`,alt:'Conceptual package fixture'};});
  home.homepage.packages.items[0].fit = 'H013 shared fit';
  home.homepage.packages.items[0].selectionRule = 'H013 shared selection rule';
  home.homepage.packages.decisionStrip.heading = 'H013 shared decision heading';
  home.homepage.packages.multiplier.body = 'H013 shared multiplier body';
  home.homepage.chrome.navigation = home.homepage.chrome.navigation.filter(link => !['/synlighet/', '/konvertering/'].includes(link.href));
  for (const item of home.homepage.packages.items) item.vatSuffix = 'H013 shared VAT';
  writeFileSync(source, JSON.stringify(home, null, 2) + '\n');
  const build = spawnSync('npm run build', { shell: true, encoding: 'utf8' });
  assert.equal(build.status, 0, build.stdout + build.stderr);
  for (const path of ['dist/index.html', 'dist/priser/index.html', 'dist/synlighet/index.html', 'dist/konvertering/index.html']) {
    const html = readFileSync(path, 'utf8'), normalized = html.replace(/\s+/g, ' ');
    const renderedText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    for (const value of ['4 567 kr/mnd', '6 789 kr/mnd', 'H013 shared Optimalisering', 'H013 shared VAT']) assert.ok(renderedText.includes(value), `${path}: shared value reaches real route: ${value}`);
    assert.ok(!/4 500 kr\/mnd|6 900 kr\/mnd|eks\. mva\./.test(normalized), `${path}: no stale repeated price/VAT`);
    if (path === 'dist/index.html' || path === 'dist/priser/index.html') {
      if (path === 'dist/priser/index.html') assert.ok(html.includes('H013 shared focus'), 'Structured focus comes from shared CMS in full view only');
      assert.equal((html.match(/data-supplied="false"/g)??[]).length,3,'All missing assets use clean fallback');
      assert.ok(!html.includes('class="package-visual-asset"'),'No broken image for missing file');
      assert.ok(renderedText.includes('fra 15 987 kr/mnd'), 'Partner from-price follows shared amount');
      assert.ok(renderedText.includes('H013 shared fit') && renderedText.includes('H013 shared selection rule'), 'Shared fit/card and financial FAQ rule follow source');
    }
    if (path === 'dist/index.html') assert.ok(html.includes('href="/priser/#vekst"'), 'Home detail link follows editable fragment');
    if (path === 'dist/priser/index.html') {
      for (const copy of ['H013 shared price note', 'H013 shared decision heading', 'H013 shared multiplier body']) assert.ok(renderedText.includes(copy), 'Full pricing details follow the same source');
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
      assert.ok(faq.includes('H013 shared Optimalisering til 4 567 kr/mnd H013 shared VAT'), 'Service FAQ also follows the shared source');
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
  mkdirSync('public/images/pricing',{recursive:true});
  for(const file of fixtureFiles.slice(0,2)) writeFileSync(file,'<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="transparent"/></svg>');
  writeFileSync(fixtureFiles[2],Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=','base64'));
  const suppliedHome = JSON.parse(original);
  suppliedHome.homepage.packages.items.forEach((item,index)=>{item.visualAsset={src:fixtureFiles[index].replace('public',''),alt:`Conceptual fixture ${index}`,positionX:20,positionY:80};});
  writeFileSync(source,JSON.stringify(suppliedHome,null,2)+'\n');
  const supplied=spawnSync('npm run verify',{shell:true,encoding:'utf8'}); assert.equal(supplied.status,0,supplied.stdout+supplied.stderr);
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    const page=await browser.newPage();
    for(const width of [1440,390,320]) for(const route of ['/','/priser/']) {
      await page.setViewportSize({width,height:844}); await page.goto('http://127.0.0.1:4321'+route);
      const images=page.locator('.package-visual-asset'); assert.equal(await images.count(),3);
      assert.equal(await page.locator('svg.package-visual').count(),0,'Supplied asset replaces fallback');
      for(const [index,img] of (await images.all()).entries()) {
        await img.scrollIntoViewIfNeeded(); await img.evaluate(el=>el.decode());
        assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Valid supplied image loads');
        assert.equal(await img.getAttribute('alt'),`Conceptual fixture ${index}`);
        assert.equal(await img.getAttribute('src'),fixtureFiles[index].replace('public',''));
        assert.equal(await img.evaluate(el=>getComputedStyle(el).objectFit),index===2?'cover':'contain');
        assert.equal(await img.evaluate(el=>getComputedStyle(el).objectPosition),'20% 80%');
      }
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Supplied assets preserve width');
    }
  } finally {await browser.close();}
  mkdirSync('../coordination/evidence/h013', { recursive: true });
  writeFileSync('../coordination/evidence/h013/package-source-regression.json', JSON.stringify({ checkedAt: new Date().toISOString(), actualAstroRoutes: ['/', '/priser/', '/synlighet/', '/konvertering/'], sharedFieldsChanged: ['three prices', 'name', 'recommendation', 'VAT suffix', 'fit', 'selection rule', 'Partner price note', 'decision heading', 'multiplier body', 'optional prefix', 'Vekst detail anchor'], navigationEntryRemoved: true, safeBreadcrumbFallback: true, bridgeAndServiceFaqUpdated: true, optionalPrefixBothStates: true, independentSuppliedAssetBranches: true, missingVisualFallback: true, structuredIconSource: true, suppliedSvgAndPngAtAllWidths: true, editableAnchorWithLegacyAlias: true, secondSourceChanged: false, proofRendered: false, originalHomeBytesRestored: true, result: 'PASS', finalBuild: 'Run npm run verify after this check' }, null, 2) + '\n');
  console.log('H-013 source regression PASS: one CMS source updates all four real routes, including service bridge/FAQ.');
} finally { writeFileSync(source, original); for(const file of fixtureFiles) { assert.ok(resolve(file).startsWith(resolve('public/images/pricing')+sep)); if(existsSync(file))unlinkSync(file); } }

