import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4344';
const output = `../coordination/evidence/terminology/${process.env.QA_LIVE ? 'live' : 'local'}`;
mkdirSync(output, { recursive: true });
const source = JSON.parse(readFileSync('src/content/terminology/glossary.json', 'utf8'));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const report = [], errors = [], posts = [];
const routes = ['/', '/synlighet/', '/konvertering/', '/priser/', '/seo/', '/ai-synlighet/', '/nettbutikkoptimalisering/'];
const open = page => page.locator('[data-term-panel]:not([hidden])');
async function panelFits(page) {
  const rect = await open(page).boundingBox();
  const viewport = page.viewportSize();
  assert.ok(rect.x >= 11 && rect.y >= 11 && rect.x + rect.width <= viewport.width - 11 && rect.y + rect.height <= viewport.height - 11, JSON.stringify(rect));
}
try {
  const coverage = new Set();
  for (const width of [1440, 900, 390, 320]) {
    const mobile = width < 600;
    const context = await browser.newContext({ viewport: { width, height: 1000 }, isMobile: mobile, hasTouch: mobile });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
    for (const route of routes) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const links = page.locator('a[data-term]');
      const ids = await links.evaluateAll(elements => elements.map(e => e.dataset.term));
      assert.equal(new Set(ids).size, ids.length, `${route}: each term once`);
      ids.forEach(id => coverage.add(id));
      assert.ok(ids.length <= 12, `${route}: selective placements`);
      assert.ok(await page.locator('meta[name="robots"]').getAttribute('content') === 'noindex, nofollow');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      for (let index = 0; index < ids.length; index++) {
        const link = links.nth(index), id = ids[index];
        await link.scrollIntoViewIfNeeded();
        const before = await link.boundingBox();
        if (mobile) await link.tap();
        else await link.hover();
        await open(page).waitFor({ state: 'visible' });
        assert.equal(await page.locator('[data-term-description]').textContent(), source.terms.find(term => term.id === id).shortDefinition);
        assert.equal(await page.locator('[data-term-more]').getAttribute('href'), base + '/begreper/#' + id);
        assert.deepEqual(await link.boundingBox(), before, `${route} ${id}: opening does not shift the term`);
        await panelFits(page);
        assert.equal(await link.getAttribute('aria-expanded'), 'true');
        if (mobile) {
          await page.touchscreen.tap(4, 4);
          await page.locator('[data-term-panel][hidden]').waitFor({ state: 'attached' });
          await link.tap();
        } else {
          await page.locator('[data-term-more]').hover();
          await page.waitForTimeout(220);
          assert.equal(await open(page).count(), 1, 'Hover can move into the explanation');
        }
        await page.keyboard.press('Escape');
        assert.equal(await open(page).count(), 0, 'Escape dismisses');
      }
      if (ids.length) {
        const link = links.first();
        await page.mouse.move(4, 4);
        await page.locator('body').click({ position: { x: 4, y: 4 } });
        await link.focus();
        await open(page).waitFor();
        assert.equal(await link.getAttribute('aria-describedby'), 'term-description');
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute('data-term-more')), true, 'Keyboard reaches Les mer');
        await page.keyboard.press('Escape');
        assert.equal(await link.evaluate(e => e === document.activeElement), true);
        assert.equal(await open(page).count(), 0);
        await page.keyboard.press('Space');
        await open(page).waitFor();
        await page.keyboard.press('Escape');
        await page.keyboard.press('Enter');
        await open(page).waitFor();
        await page.mouse.click(4, 4);
        assert.equal(await open(page).count(), 0, 'Outside click dismisses');
      }
      report.push({ width, route, terms: ids, firstOccurrenceOnly: true, viewportFit: true, noOpeningShift: true, hoverOrTap: true, keyboard: true, outsideClick: true, escape: true });
    }
    await page.goto(base);
    const roas = page.locator('a[data-term="roas"]');
    if (mobile) await roas.tap(); else await roas.hover();
    await page.screenshot({ path: `${output}/hero-roas-${width}.png` });
    await page.goto(base + '/begreper/');
    assert.equal(await page.locator('h1').textContent(), source.title);
    assert.equal(await page.locator('.glossary-entry').count(), source.terms.length);
    assert.equal(await page.locator('.glossary-group').count(), 4);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `${output}/glossary-${width}.png`, fullPage: true });
    for (const term of source.terms) {
      await page.goto(base + '/begreper/#' + term.id);
      await page.waitForFunction(() => {
        const rect = document.querySelector('.glossary-entry:target')?.getBoundingClientRect();
        return rect && rect.y >= 0 && rect.y < innerHeight;
      });
      const target = page.locator('.glossary-entry:target');
      assert.equal(await target.getAttribute('id'), term.id);
      assert.equal(await target.locator('h3').textContent(), term.term);
      assert.ok((await target.textContent()).includes(term.fullDefinition));
      const rect = await target.boundingBox();
      assert.ok(rect.y >= 0 && rect.y < 1000, `${term.id}: direct anchor is visible`);
    }
    await context.close();
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 1000 } });
    const fallback = await noJs.newPage();
    await fallback.goto(base);
    const roasFallback = fallback.locator('a[data-term="roas"]');
    assert.equal(await roasFallback.getAttribute('role'), null);
    await roasFallback.click();
    await fallback.waitForURL('**/begreper/#roas');
    assert.equal(await fallback.locator('.glossary-entry:target').getAttribute('id'), 'roas');
    for (const term of source.terms) assert.ok(await fallback.locator('#' + term.id).isVisible());
    assert.equal(await fallback.locator('[data-term-panel]').isVisible(), false);
    await noJs.close();
  }
  for (const required of ['roas', 'seo', 'lokal-seo', 'ai-synlighet', 'cro', 'konverteringsrate', 'relevant-trafikk', 'organisk-trafikk', 'google-ads', 'meta-ads', 'checkout', 'ordreverdi', 'margin']) assert.ok(coverage.has(required), `${required}: priority placement`);
  assert.deepEqual(errors, []);
  assert.deepEqual(posts, []);
  writeFileSync(`${output}/checks.json`, JSON.stringify({ base, checkedAt: new Date().toISOString(), report, coverage: [...coverage], glossaryTerms: source.terms.length, directAnchorsAtFourWidths: true, noJsAtFourWidths: true, errors, posts, result: 'PASS' }, null, 2) + '\n');
  console.log(`Terminology browser PASS: ${report.length} route/width groups; all 25 anchors/no-JS at four widths; ${coverage.size} explained terms; zero errors/POST.`);
} finally { await browser.close(); }
