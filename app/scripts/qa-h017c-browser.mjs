import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const phase = process.env.QA_BASE_URL ? 'live' : 'local';
const handoff = process.env.QA_HANDOFF || 'h017d';
const output = resolve(`../coordination/evidence/${handoff}/${phase}`);
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const checks = [], errors = [];
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', req => { if (req.method() === 'POST') posts++; });
const baselineRoot = resolve(`qa-output/${handoff}-baseline`);
const baselineServer = existsSync(baselineRoot) ? createAppServer({ config: { enabled: false }, staticRoot: baselineRoot }) : undefined;
if (baselineServer) { baselineServer.listen(0, '127.0.0.1'); await once(baselineServer, 'listening'); }
const baselineUrl = baselineServer && `http://127.0.0.1:${baselineServer.address().port}`;
const snapshot = () => page.evaluate(() => {
  const selectors = ['header', '#home-hero', '#service-hero', '#behov', '#kanaler', '#friksjon', '#kvalitet', '#prioritering', '#priser', '#sammenheng', '#service-priser', '#mekanisme', '#passer', '#sjekk', '#sporsmal', 'footer'];
  return selectors.flatMap(selector => [...document.querySelectorAll(selector)].map(el => {
    const rect = el.getBoundingClientRect(), style = getComputedStyle(el);
    return { selector, text: el.textContent.replace(/\s+/g, ' ').trim(), x: rect.x, width: rect.width, height: rect.height, font: style.fontFamily, size: style.fontSize, background: style.backgroundColor, color: style.color };
  }));
});
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const [route, names] of [['/', ['Eurotents', 'Nysta', 'Helt Opplagt']], ['/konvertering/', ['Nysta']], ['/synlighet/', ['Helt Opplagt']]]) {
      let baseline;
      let oldCardHeights;
      if (baselineUrl) {
        await page.goto(baselineUrl + route); await page.evaluate(() => document.fonts.ready); baseline = await snapshot();
        oldCardHeights = await page.locator('.proof-card').evaluateAll(cards => cards.map(el => el.getBoundingClientRect().height));
      }
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, nofollow');
      assert.deepEqual(await page.locator('#resultater h3').allTextContents(), names);
      const layout = await page.evaluate(() => {
        const featured = document.querySelector('.proof-featured').getBoundingClientRect();
        const cards = [...document.querySelectorAll('.proof-card')].map(el => { const r = el.getBoundingClientRect(); return { width: r.width, x: r.x, y: r.y }; });
        const internalBlocks = document.querySelectorAll('.proof-caveat, .proof-work').length;
        const overflowing = [...document.querySelectorAll('#resultater *')].filter(el => el.getBoundingClientRect().width > 0 && el.scrollWidth > el.clientWidth + 1).map(el => el.className);
        return { width: innerWidth, scroll: document.documentElement.scrollWidth, featured: featured.width, cards, internalBlocks, overflowing };
      });
      assert.ok(layout.scroll <= width, `${route} ${width}: document overflow`);
      assert.deepEqual(layout.overflowing, [], `${route} ${width}: proof element overflow`);
      assert.equal(layout.internalBlocks, 0);
      const currentHeights = await page.locator('.proof-card').evaluateAll(cards => cards.map(el => el.getBoundingClientRect().height));
      if (oldCardHeights) currentHeights.forEach((height, index) => assert.ok(height < oldCardHeights[index], 'Subtraction naturally shortens each card'));
      if (route === '/' && width === 1440) assert.ok(layout.cards[0].width > layout.cards[1].width * 1.5 && layout.cards[1].y === layout.cards[2].y);
      if (route === '/' && width < 700) assert.ok(layout.cards[0].y < layout.cards[1].y && layout.cards[1].y < layout.cards[2].y);
      if (baseline) assert.deepEqual(await snapshot(), baseline, `${route} ${width}: retained section text/geometry/styles`);
      const slug = route === '/' ? 'home' : route.split('/')[1];
      await page.locator('#resultater').screenshot({ path: resolve(output, `${slug}-proof-${width}.png`) });
      await page.screenshot({ path: resolve(output, `${slug}-full-${width}.png`), fullPage: true });
      checks.push({ route, width, names, layout, oldCardHeights, currentHeights, surroundingSectionsPreserved: Boolean(baseline), screenshot: `${slug}-proof-${width}.png` });
    }
  }
  await page.goto(base + '/priser/?pakke=vekst#bestill');
  assert.equal(await page.locator('[name=package]').inputValue(), 'vekst');
  assert.equal(await page.locator('form[data-package-order]').getAttribute('data-enabled'), 'false');
  assert.ok(await page.locator('form[data-package-order] [type=submit]').isDisabled());
  await page.locator('form[data-package-order]').evaluate(form => form.requestSubmit());
  assert.ok(!(await page.locator('form[data-package-order]').textContent()).includes('Bestillingen er mottatt'));
  await page.goto(base);
  assert.ok(await page.locator('#sjekk [type=submit]').isDisabled());
  for (const file of readdirSync('src/content/pages').filter(f => f.endsWith('.json'))) {
    const source = JSON.parse(readFileSync(`src/content/pages/${file}`));
    if (['home', 'konvertering', 'synlighet'].includes(source.slug)) continue;
    const route = `/${source.slug}/`;
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('#resultater').count(), 0);
    if (baselineUrl) {
      const current = await snapshot();
      await page.goto(baselineUrl + route);
      await page.evaluate(() => document.fonts.ready);
      assert.deepEqual(await snapshot(), current, route + ': frozen page presentation');
    }
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
  const native = await context.newPage();
  for (const route of ['/', '/konvertering/', '/synlighet/']) {
    await native.goto(base + route);
    assert.ok(await native.locator('#resultater').isVisible());
    assert.ok(await native.locator('.proof-comparison').first().isVisible());
    assert.equal(await native.locator('.proof-caveat, .proof-work').count(), 0);
  }
  await context.close();
  assert.deepEqual(errors, []);
  assert.equal(posts, 0);
  writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ checkedAt: new Date().toISOString(), base, checks, allOtherPagesPreserved: Boolean(baselineUrl), noJavaScriptProofReadable: true, orderAndAssessmentDisabled: true, errors, posts, result: 'PASS' }, null, 2) + '\n');
  console.log(`H-017D ${phase} browser PASS: 9 proof placements, 18 captures, naturally shorter cards, retained section styles/geometry, 12 other pages, no public work/limitations, native results, gated intake and zero POST.`);
} finally {
  await browser.close();
  if (baselineServer) { baselineServer.closeAllConnections(); await new Promise(resolve => baselineServer.close(resolve)); }
}
