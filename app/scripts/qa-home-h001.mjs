import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

// H-001 representative-page evidence only; no submission or external send.
const content = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const normalize = text => text.replace(/\s+/g, ' ').trim();
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const directory = resolve('../coordination/evidence/h001');
mkdirSync(directory, { recursive: true });
assert.equal(content.status, 'CONTENT_LOCKED');
assert.equal(content.authority, 'CONTENT_LOCKED / AUTHORITATIVE');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
page.setDefaultTimeout(10000);
page.setDefaultNavigationTimeout(15000);
const errors = [];
const results = [];
page.on('pageerror', error => errors.push(error.message));
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : width === 390 ? 844 : 740 });
    assert.equal((await page.goto(base)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.title(), content.seo.title);
    assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), content.seo.description);
    assert.equal(await page.locator('h1').textContent(), content.title);
    assert.equal(await page.locator('.hero-intro').textContent(), content.intro);
    for (const section of content.sections) {
      const rendered = page.locator(`#${section.id}`);
      const text = normalize(await rendered.textContent());
      for (const value of [section.eyebrow, section.heading, ...section.body, ...(section.items || []).flatMap(item => [item.title, item.text])].filter(Boolean)) {
        assert.ok(text.includes(normalize(value)), `${width}px: locked text missing from ${section.id}: ${value}`);
      }
      for (const link of [...(section.links || []), ...(section.items || []).filter(item => item.href)]) {
        assert.equal(await rendered.getByRole('link', { name: link.label, exact: true }).getAttribute('href'), link.href);
      }
    }
    for (const [index, item] of content.faq.entries()) {
      const detail = page.locator('.faq-list details').nth(index);
      assert.equal(normalize(await detail.locator('summary').textContent()).replace(/\+$/, '').trim(), item.question);
      assert.equal(await detail.locator('p').textContent(), item.answer);
    }
    const heroCta = page.locator('.hero-actions').getByRole('link', { name: content.cta.label, exact: true });
    assert.equal(await heroCta.getAttribute('href'), content.cta.href);
    const ctaBounds = await heroCta.boundingBox();
    assert.ok(ctaBounds && ctaBounds.y + ctaBounds.height <= page.viewportSize().height, `${width}px: primary CTA below initial viewport`);
    assert.equal(await page.locator('#skjema').getAttribute('data-enabled'), 'false');
    assert.ok(await page.locator('#skjema input[name="website"]').isVisible());
    assert.ok(await page.locator('#skjema button[type="submit"]').isVisible());
    assert.equal(await page.locator('[name="visits"]').inputValue(), '1000');
    assert.equal(await page.locator('[name="conversion"]').inputValue(), '1');
    assert.equal(await page.locator('.leverage-result output').textContent(), '10');
    assert.equal(await page.locator('[data-double]').textContent(), '20');
    const layout = await page.evaluate(() => ({
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      clipped: [...document.querySelectorAll('#main h1, #main h2, #main h3, #main p, #main input, #main select, #main textarea')].filter(element => element.getClientRects().length && element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1).map(element => element.className || element.tagName),
      teachingHeadingSize: getComputedStyle(document.querySelector('#regneeksempel h2')).fontSize,
    }));
    assert.ok(layout.scrollWidth <= width, `${width}px: document overflow`);
    assert.deepEqual(layout.clipped, [], `${width}px: clipped text/control`);
    await page.screenshot({ path: resolve(directory, `home-${width}.png`), fullPage: true });
    await page.locator('#regneeksempel').screenshot({ path: resolve(directory, `teaching-${width}.png`) });
    await page.locator('[name="conversion"]').fill('2');
    assert.equal(await page.locator('.leverage-result output').textContent(), '20');
    assert.equal(await page.locator('[data-double]').textContent(), '40');
    results.push({ width, ...layout, exactLockedCopy: true, primaryCtaInInitialViewport: true, formVisible: true, illustrativeMath: true });
  }
  await page.getByRole('button', { name: 'Åpne meny' }).click();
  assert.ok(await page.locator('#mobile-menu').getByRole('link', { name: 'Synlighet', exact: true }).isVisible());
  assert.deepEqual(errors, []);
  writeFileSync(resolve(directory, 'checks.json'), JSON.stringify({ handoff: 'H-001', contentSourceCommit: '55c31b523a50e3e6112fcb5f324adbfa663e21eb', results, errors, menuAt320px: true, leadsEnabled: false, liveEmailsSent: 0 }, null, 2) + '\n');
  console.log('H-001 homepage QA passed: exact locked content, 1440/390/320px fit, first-screen CTA, form visibility, illustrative 1%/2% math and 320px menu. Evidence saved in coordination/evidence/h001/.');
} finally { await browser.close(); }
