import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';
import { resolvePackageAsset } from '../src/lib/package-visual.ts';
import { getH014Compact } from './h014-contract.mjs';
const snapshot = process.argv.includes('--baseline');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve(process.env.QA_EVIDENCE_DIR || '../coordination/evidence/h014');
const baselineFile = resolve('../coordination/evidence/h014/baseline.json');
const root = resolve('..'), frozen = {};
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const routes = ['/', '/priser/', '/synlighet/', '/konvertering/'];
function collect(directory, include = () => true) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) collect(path, include);
    else if (include(path)) frozen[relative(root, path).replaceAll('\\', '/')] = hash(readFileSync(path));
  }
}
for (const directory of ['system', 'project', 'app/src/config']) collect(resolve(root, directory));
collect(resolve('src/content'), path => path !== resolve('src/content/pages/home.json'));
collect(resolve('server'), path => path.endsWith('.mjs'));
for (const file of ['copy-authority.json']) frozen[`app/src/config/${file}`] = hash(readFileSync(`src/config/${file}`));
collect(resolve('dist'), path => path.endsWith('.html') && !['/', '/priser/'].some(route => path === resolve('dist', route === '/' ? 'index.html' : route.slice(1) + 'index.html')));
collect(resolve('dist/_astro'), path => path.endsWith('.css'));
for (const file of ['home-invite.css', 'pricing-invite.css', 'service-invite.css']) frozen[`app/dist/styles/${file}`] = hash(readFileSync(`dist/styles/${file}`));
const homeOutsidePackages = JSON.parse(readFileSync('src/content/pages/home.json'));
delete homeOutsidePackages.homepage.packages;
const baseline = snapshot ? { source: 'ffa87852fd0a69683bd387607a82f9fdae6e4647', layoutSource: 'bd09da8d2b237707d88c9add8bb193f4c43a5f27', frozen, homeOutsidePackages, preserved: {}, cardHeights: {}, serviceCss: readFileSync('dist/styles/service-invite.css', 'utf8') } : JSON.parse(readFileSync(baselineFile));
if (snapshot) {
  const delivered = JSON.parse(readFileSync('../coordination/evidence/h013-live/deployment.json'));
  for (const route of routes) assert.equal(hash(readFileSync(resolve('dist', route === '/' ? 'index.html' : route.slice(1) + 'index.html'))), delivered.assets.find(asset => asset.path === route).sha256, 'Baseline uses actual delivered H-013 HTML');
} else {
  assert.deepEqual(homeOutsidePackages, baseline.homeOutsidePackages, 'Home source unchanged outside shared packages');
  assert.deepEqual(frozen, baseline.frozen, 'All incoming content/proof/protected/backend and frozen HTML/CSS hashes match');
  assert.ok(readFileSync('dist/styles/service-invite.css', 'utf8').startsWith(baseline.serviceCss), 'Existing service styling unchanged; only scoped visual rules appended');
}
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage(), errors = [], checks = [], cardHeights = {}, compactCopy = getH014Compact();
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (request.method() === 'POST') posts++; });
async function geometry(selector) {
  return page.locator(selector).evaluate(root => {
    const anchor = root.getBoundingClientRect();
    return [root, ...root.querySelectorAll('*')].filter(el => !['SCRIPT', 'STYLE'].includes(el.tagName)).map(el => {
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      return { rect: [r.x - anchor.x, r.y - anchor.y, r.width, r.height], style: Object.fromEntries(['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','padding','gap','borderRadius'].map(key => [key, s[key]])) };
    });
  });
}
// Hidden zero-size elements have no visible position. Their browser rect is
// the document origin, so an authorized preceding text-height change shifts
// its relative coordinate. Preserve styles/counts, normalize only that rect.
const visibleGeometry = entries => entries.map(entry => entry.rect[2] === 0 && entry.rect[3] === 0 ? { ...entry, rect: [0, 0, 0, 0] } : entry);
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of routes) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      // Package section/pricing hero-financial FAQ are scoped deltas. All
      // retained blocks, including complete service copy, preserve local geometry.
      const selectors = route === '/' ? ['.site-header', '.site-footer', '.home-hero', '#behov', '#regneeksempel', '#mekanisme', '#passer', '#sjekk'] : route === '/priser/' ? ['.site-header', '.site-footer', '#arbeidsomrader', '#kostnader', '#gratis'] : ['.site-header', '.site-footer', '#service-hero', ...(route === '/synlighet/' ? ['#behov', '#kanaler'] : ['#friksjon', '#kvalitet']), '#prioritering', '#sammenheng', '#sjekk', '#sporsmal'];
      for (const selector of selectors) {
        const key = `${route}:${width}:${selector}`, current = await geometry(selector);
        if (snapshot) baseline.preserved[key] = current;
        else assert.deepEqual(visibleGeometry(current), visibleGeometry(baseline.preserved[key]), `${key}: preserved geometry/styles`);
      }
      if (route === '/' || route === '/priser/') {
        const key = `${route}:${width}`;
        cardHeights[key] = await page.locator('#priser .package-card').evaluateAll(cards => cards.map(card => Math.round(card.getBoundingClientRect().height * 100) / 100));
        if (snapshot) baseline.cardHeights[key] = cardHeights[key];
      }
      if (snapshot) continue;
      const body = await page.locator('body').innerText();
      assert.equal((body.match(/Medon/g) ?? []).length, 1);
      assert.equal(await page.locator('.site-footer p').innerText(), 'Tjenesten drives av Medon AS.');
      assert.ok(!/Om Medon|En tjeneste fra Medon/.test(body));
      assert.equal(await page.locator('a[href^="/en/"], .language-switch').count(), 0);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}:${width}: no overflow`);
      assert.equal(await page.locator('#resultater, .proof-section').count(), 0);
      if (route === '/') {
        const home = JSON.parse(readFileSync('src/content/pages/home.json'));
        const fit = home.sections.find(section => section.id === 'passer');
        assert.equal(await page.locator('#passer h2').innerText(), fit.heading);
        assert.deepEqual(await page.locator('#passer h3').allTextContents(), fit.items.map(item => item.title));
        assert.deepEqual(await page.locator('#passer .info-item p').allTextContents(), fit.items.map(item => item.text));
        assert.equal(await page.locator('#medon').count(), 0);
        assert.equal(await page.locator('.hero-intro').innerText(), home.intro);
      } else if (route !== '/priser/') {
        assert.equal(await page.locator('.service-hero img, .service-hero-visual').count(), 0);
        assert.equal(await page.locator('.service-hero .button').getAttribute('href'), '/#sjekk');
      }
      if (route === '/' || route === '/priser/') {
        const cards = page.locator('#priser .package-card');
        const heights = cardHeights[`${route}:${width}`];
        heights.forEach((height, index) => assert.ok(height < baseline.cardHeights[`${route}:${width}`][index] * .75, 'Each default card is materially shorter than actual H-013'));
        if (route === '/priser/' && width === 1440) {
          heights.forEach(height => assert.ok(height >= 680 && height <= 780, 'Locked desktop default height target'));
          assert.ok(Math.max(...heights) - Math.min(...heights) < 3, 'Favored Vekst is not oversized');
        }
        assert.equal(await cards.count(), 3);
        const packageSource = JSON.parse(readFileSync('src/content/pages/home.json')).homepage.packages.items;
        for (const [index, item] of packageSource.entries()) {
          const asset = resolvePackageAsset(item.visualAsset), card = cards.nth(index);
          assert.equal(await card.locator('.package-fit').innerText(), compactCopy[index].fit);
          const visualHeight = (await card.locator('.package-visual-area').boundingBox()).height;
          assert.ok(visualHeight >= 100 && visualHeight <= (width === 1440 ? 150 : 130), 'Horizontal compact visual');
          if (route === '/priser/') {
            assert.deepEqual(await card.locator('.package-situations li').allTextContents(), compactCopy[index].situations);
            assert.deepEqual(await card.locator('.package-icon-items span').allTextContents(), compactCopy[index].iconLabels);
            const detail = card.locator('.package-details');
            assert.equal(await detail.getAttribute('open'), null, 'Native details collapsed by default, including direct anchors');
            assert.equal(await detail.locator('.package-detail').isVisible(), false);
            await detail.locator('summary').focus(); await page.keyboard.press('Enter');
            assert.equal(await detail.locator('.package-detail').isVisible(), true, 'Keyboard reads full package without a custom toggle');
            for (const copy of [item.fit, item.scope, item.distinction, item.typicalBusiness, item.priceNote, item.selectionRule, ...item.situations, ...item.iconItems.flatMap(icon => [icon.label, icon.description])].filter(Boolean)) assert.ok((await detail.innerText()).includes(copy));
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Expanded detail also fits');
            if (index === 0 && width !== 320) await card.screenshot({animations:'disabled', path:resolve(output,`detail-expanded-${width}.png`)});
            await detail.locator('summary').focus(); await page.keyboard.press('Space');
            assert.equal(await detail.locator('.package-detail').isVisible(), false);
            await detail.locator('summary').evaluate(el => el.blur());
          }
          assert.equal(await card.locator('.package-curve').count(), asset ? 0 : index === 2 ? 3 : 1);
          assert.equal(await card.locator('.package-visual-asset').count(), asset ? 1 : 0);
          if (asset) assert.equal(await card.locator('.package-visual-asset').getAttribute('src'), asset.src);
        }
        assert.equal(await cards.nth(0).locator('.package-price-prefix').count(), 0);
        assert.equal(await cards.nth(1).locator('.package-price-prefix').count(), 0);
        assert.equal((await cards.nth(2).locator('.package-price-prefix').innerText()).trim(), 'fra');
        assert.equal(await cards.locator('.package-badge').innerText(), 'Anbefalt');
        assert.ok(!/Mest valgt|\d+(?:[.,]\d+)?\s*%/.test(await cards.allInnerTexts().then(text => text.join(' '))));
        assert.equal(await cards.locator('a.button').count(), 3);
        for (const [index, link] of (await cards.locator('a.button').all()).entries()) {
          assert.equal(await link.getAttribute('href'), `/priser/?pakke=${['optimalisering','vekst','partner'][index]}#bestill`);
          assert.ok((await link.innerText()).startsWith(`Bestill ${['Optimalisering','Vekst','Partner'][index]}`));
        }
        if (route === '/') {
          assert.equal(await cards.locator('.package-detail').count(), 0);
          assert.deepEqual(await cards.locator('a.package-detail-link').allTextContents(), ['Se pakken', 'Se pakken', 'Se pakken']);
        } else {
          assert.equal(await page.locator('#pricing-decision, #pricing-multiplier').count(), 2);
          assert.equal(await page.locator('#begge').count(), 1);
          assert.equal(await cards.locator('.package-icon-items').count(), 3);
          assert.equal(await page.locator('.multiplier-detail').getAttribute('open'), null);
          assert.equal(await page.locator('.multiplier-detail .body-copy').first().isVisible(), false);
          assert.equal(await page.locator('[data-package-order]').count(), 1);
          assert.equal(await page.locator('[data-package-order] button').isDisabled(), true);
        }
      }
      if (width !== 320) {
        const options = { animations: 'disabled' };
        if (route === '/') await page.locator('#priser').screenshot({ ...options, path: resolve(output, `home-packages-${width}.png`) });
        else if (route === '/priser/') {
          await page.screenshot({ ...options, fullPage: true, path: resolve(output, `pricing-${width}.png`) });
          await page.locator('#priser').screenshot({ ...options, path: resolve(output, `cards-${width}.png`) });
          if (width === 1440) {
            for (const [index, key] of ['optimalisering','vekst','partner'].entries()) {
              await page.locator('.package-visual-area').nth(index).screenshot({ ...options, path: resolve(output, `visual-${key}.png`) });
              await page.locator('.package-focus').nth(index).screenshot({ ...options, path: resolve(output, `focus-${key}.png`) });
            }
            await page.locator('#priser .package-card').nth(1).locator('.button').screenshot({ ...options, path: resolve(output, 'direct-order-cta.png') });
          }
          await page.evaluate(() => window.scrollTo(0, 0));
          const a = await page.locator('#pricing-decision').boundingBox(), b = await page.locator('#pricing-multiplier').boundingBox();
          await page.screenshot({ ...options, fullPage: true, path: resolve(output, `decision-multiplier-${width}.png`), clip: { x: 0, y: a.y, width, height: b.y + b.height - a.y } });
        }
      }
      if (width < 901) {
        await page.locator('.menu-toggle').click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
      }
      checks.push({ route, width, providerAndLocale: true, preserved: true, noOverflow: true });
    }
  }
  if (!snapshot) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const key of ['optimalisering','vekst','partner']) {
      await page.goto(`${base}/priser/?pakke=${key}#bestill`);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('#order-package').inputValue(), key);
      assert.equal(await page.locator('#partner-order-note').isVisible(), key === 'partner');
      assert.ok((await page.locator('#order-selection').innerText()).replace(/\s/g, ' ').includes(key === 'partner' ? 'fra 14 900' : key === 'vekst' ? '6 900' : '4 500'));
      await page.locator('#bestill').screenshot({ animations: 'disabled', path: resolve(output, `order-${key}-1440.png`) });
      await page.goto(base + '/');
      await page.locator(`a[href="/priser/?pakke=${key}#bestill"]`).click();
      await expect(page.locator('#order-package')).toHaveValue(key);
      await page.locator('#priser .package-card').nth(2).locator('.button').click();
      await expect(page.locator('#order-package')).toHaveValue('partner');
    }
    await page.goto(`${base}/priser/?pakke=invalid#bestill`);
    assert.equal(await page.locator('#order-package').inputValue(), '', 'Unknown query is not accepted or reflected');
    await page.locator('#order-package').selectOption('optimalisering');
    assert.equal(new URL(page.url()).searchParams.get('pakke'),'optimalisering');
    await page.locator('#priser .package-card').nth(1).locator('.button').click();
    assert.equal(await page.locator('#order-package').inputValue(),'vekst');
    await page.goBack(); await expect(page.locator('#order-package')).toHaveValue('optimalisering');
    for (const [name,value] of Object.entries({company:'Synthetic AS',website:'example.test',contact:'Synthetic Buyer',email:'synthetic@example.test'})) await page.locator(`[name="${name}"]`).fill(value);
    await page.locator('[data-package-order]').evaluate(form => {
      form.querySelector('button').disabled = false;
      form.requestSubmit();
      form.querySelector('button').disabled = true;
    });
    assert.equal(await page.locator('[data-package-order]').getAttribute('data-enabled'),'false');
    assert.ok(!/Bestillingen er (sendt|mottatt)|Takk!/.test(await page.locator('#bestill').innerText()), 'No false order acknowledgement');
    await page.setViewportSize({width:390,height:844});
    await page.locator('#order-package').selectOption('partner');
    await page.locator('#bestill').screenshot({animations:'disabled',path:resolve(output,'order-partner-390.png')});
    const noJs = await browser.newPage({ javaScriptEnabled: false });
    noJs.on('request',request=>{if(request.method()==='POST')posts++;});
    await noJs.goto(`${base}/priser/?pakke=partner#bestill`);
    for (const detail of await noJs.locator('.package-details').all()) {
      assert.equal(await detail.locator('.package-detail').isVisible(),false);
      await detail.locator('summary').click();
      assert.equal(await detail.locator('.package-detail').isVisible(),true,'Full detail is readable without JavaScript');
    }
    await noJs.locator('.multiplier-detail summary').click();
    assert.equal(await noJs.locator('.multiplier-detail .body-copy').first().isVisible(),true,'Multiplier logic also works without JS');
    assert.equal(await noJs.locator('[data-package-order] button').isDisabled(),true);
    await noJs.locator('#order-package').selectOption('partner');
    for (const [name,value] of Object.entries({company:'Synthetic AS',website:'example.test',contact:'Synthetic Buyer',email:'synthetic@example.test'})) await noJs.locator(`[name="${name}"]`).fill(value);
    await noJs.locator('#order-email').press('Enter');
    assert.equal(await noJs.locator('[data-package-order]').count(),1);
    await noJs.close();
  }
  assert.deepEqual(errors, []); assert.equal(posts, 0);
  if (snapshot) writeFileSync(baselineFile, JSON.stringify(baseline, null, 2) + '\n');
  else writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ base, checkedAt: new Date().toISOString(), baselineSource: baseline.source, layoutSource: baseline.layoutSource, frozenFilesChecked: Object.keys(frozen).length, checks, cardHeights: {before: baseline.cardHeights, after: cardHeights}, compact: {exactCopy:true,desktop680to780:true,nativeCollapsedDetails:true,fullCopyAccessible:true,keyboardAndNoJs:true,horizontalVisuals:true,noExpandedOverflow:true,multiplierCollapsed:true}, order: {allThreeQueryAndHomeCtas:true,pricingCtas:true,historyAndInvalidQuery:true,disabledSubmitIncludingProgrammaticAndNoJs:true,noFalseSuccess:true}, errors, posts, liveEmailsSent: 0 }, null, 2) + '\n');
  console.log(`H-014 ${snapshot ? 'baseline' : 'QA'} PASS: ${Object.keys(frozen).length} frozen files, four accepted pages, 1440/390/320, authorized deltas only.`);
} finally { await browser.close(); }
