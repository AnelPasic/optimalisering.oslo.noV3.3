import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const phase = process.env.QA_BASE_URL ? 'live' : 'local';
const output = resolve(`../coordination/evidence/h017e/${phase}`);
mkdirSync(output, { recursive: true });
const servers = [];
async function serve(root) {
  const server = createAppServer({ config: { enabled: false }, staticRoot: resolve(root) });
  server.listen(0, '127.0.0.1'); await once(server, 'listening'); servers.push(server);
  return `http://127.0.0.1:${server.address().port}`;
}
const baseline = await serve('qa-output/h017e-baseline');
const base = process.env.QA_BASE_URL || await serve('dist');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const errors = [], checks = [];
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (request.method() === 'POST') posts++; });
const snapshot = () => page.evaluate(() => {
  const details = selector => [...document.querySelectorAll(selector)].map(el => {
    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    return { text: el.textContent.replace(/\s+/g, ' ').trim(), x: r.x, y: r.y, width: r.width, height: r.height, font: s.fontFamily, size: s.fontSize, color: s.color, background: s.backgroundColor };
  });
  const image = document.querySelector('.hero-photo img');
  return {
    hero: details('.home-hero').map(({ text, ...geometry }) => geometry),
    copy: details('.hero-copy, .hero-copy h1, .hero-intro, .hero-actions'),
    links: [...document.querySelectorAll('.hero-actions a')].map(a => ({ text: a.textContent, href: a.getAttribute('href') })),
    photo: details('.hero-photo, .hero-photo img'),
    crop: { src: image.getAttribute('src'), position: getComputedStyle(image).objectPosition, fit: getComputedStyle(image).objectFit, natural: [image.naturalWidth, image.naturalHeight] },
    preserved: details('header, .invite-home > section:not(.home-hero), footer'),
    lowerProof: document.querySelector('#resultater').outerHTML,
  };
});
async function open(url) {
  const response = await page.goto(url); assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.hero-photo img').evaluate(image => image.decode());
}
try {
  for (const width of [1440, 900, 390, 320]) {
    await page.setViewportSize({ width, height: width > 650 ? 1000 : 844 });
    await open(baseline); const before = await snapshot();
    await open(base); const after = await snapshot();
    assert.deepEqual(after, before, `${width}: hero geometry/copy/crop, lower proof and surrounding sections preserved`);
    assert.equal(await page.locator('.hero-proof').count(), 1);
    assert.equal((await page.locator('.hero-proof-result').textContent()).replace(/\s+/g, ' ').trim(), 'ROAS 4,3x -> 17,2x');
    assert.equal(await page.locator('.hero-proof-support').textContent(), 'Eurotents · Google Ads');
    assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, nofollow');
    const layout = await page.evaluate(() => {
      const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom }; };
      const panel = rect('.hero-proof'), photo = rect('.hero-photo'), metric = rect('.hero-proof-result');
      const spans = [...document.querySelectorAll('.hero-proof-result span')].map(el => el.getBoundingClientRect().y);
      const overflowing = [...document.querySelectorAll('.hero-visual *')].filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.className);
      return { panel, photo, metric, spans, overflowing, scroll: document.documentElement.scrollWidth, resultSize: parseFloat(getComputedStyle(document.querySelector('.hero-proof-result')).fontSize), h1Size: parseFloat(getComputedStyle(document.querySelector('h1')).fontSize), supportSize: parseFloat(getComputedStyle(document.querySelector('.hero-proof-support')).fontSize) };
    });
    assert.ok(layout.scroll <= width);
    assert.deepEqual(layout.overflowing, []);
    assert.equal(layout.spans[0], layout.spans[1], 'Current metric stays on one line');
    assert.ok(layout.panel.x >= layout.photo.x && layout.panel.x + layout.panel.width <= layout.photo.x + layout.photo.width);
    assert.ok(layout.panel.y >= layout.photo.y + layout.photo.height * .55, 'Panel stays along lower image edge');
    assert.ok(layout.resultSize < layout.h1Size * .75 && layout.resultSize > layout.supportSize);
    if (width > 650) {
      assert.ok(layout.panel.bottom <= layout.photo.bottom);
      const ratio = layout.panel.width / layout.photo.width;
      assert.ok(ratio >= .35 && ratio <= .5, 'Desktop panel stays approximately 35-50% of photo width');
    } else assert.ok(layout.panel.bottom - layout.photo.bottom <= 17, 'Only slight mobile bottom overlap');
    await page.locator('.home-hero').screenshot({ path: resolve(output, `hero-${width}.png`) });
    checks.push({ width, layout, heroCopyPhotoCropAndHeightPreserved: true, lowerProofAndSurroundingsExact: true, screenshot: `hero-${width}.png` });
  }
  const otherPages = [];
  for (const file of readdirSync('src/content/pages').filter(file => file.endsWith('.json') && file !== 'home.json')) {
    const { slug } = JSON.parse(readFileSync(`src/content/pages/${file}`, 'utf8'));
    await page.goto(`${baseline}/${slug}/`); const original = await page.locator('body').innerHTML();
    await page.goto(`${base}/${slug}/`);
    assert.equal(await page.locator('body').innerHTML(), original, `${slug}: body HTML remains exact`);
    assert.equal(await page.locator('.hero-proof').count(), 0);
    otherPages.push(slug);
  }
  await page.goto(base); assert.ok(await page.locator('#sjekk [type=submit]').isDisabled());
  await page.goto(`${base}/priser/?pakke=vekst#bestill`);
  assert.equal(await page.locator('form[data-package-order]').getAttribute('data-enabled'), 'false');
  assert.ok(await page.locator('form[data-package-order] [type=submit]').isDisabled());
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
  const native = await context.newPage(); await native.goto(base);
  assert.ok(await native.locator('.hero-proof').isVisible());
  assert.equal(await native.locator('.hero-proof-support').textContent(), 'Eurotents · Google Ads');
  await context.close();
  assert.deepEqual(errors, []); assert.equal(posts, 0);
  writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ checkedAt: new Date().toISOString(), base, checks, otherPages, noJavaScriptProofReadable: true, orderAndAssessmentDisabled: true, errors, posts, result: 'PASS' }, null, 2) + '\n');
  console.log(`H-017E ${phase} PASS: 4 hero widths/captures, unchanged hero height/copy/photo/crop and lower proof, 14 other page bodies exact, no wrap/overflow/errors/POST, native proof and disabled intake.`);
} finally {
  await browser.close();
  for (const server of servers) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
