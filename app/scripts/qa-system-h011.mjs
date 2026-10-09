import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';
const snapshot = process.argv.includes('--baseline');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve(process.env.QA_EVIDENCE_DIR || '../coordination/evidence/h011');
const baselineFile = resolve('../coordination/evidence/h011/baseline.json');
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
for (const directory of ['system', 'project', 'app/src/content']) collect(resolve(root, directory));
collect(resolve('server'), path => path.endsWith('.mjs'));
for (const file of ['copy-authority.json']) frozen[`app/src/config/${file}`] = hash(readFileSync(`src/config/${file}`));
collect(resolve('dist'), path => path.endsWith('.html') && !routes.some(route => path === resolve('dist', route === '/' ? 'index.html' : route.slice(1) + 'index.html')));
collect(resolve('dist/_astro'), path => path.endsWith('.css'));
for (const file of ['home-invite.css', 'pricing-invite.css']) frozen[`app/dist/styles/${file}`] = hash(readFileSync(`dist/styles/${file}`));
const baseline = snapshot ? { source: '5b527b9d26a7a4209dc84444a3a2faa89413f48d', layoutSource: '282bc60a69d8a14cd473334b5ea3e8374ad77a31', frozen, preserved: {}, serviceCss: readFileSync('dist/styles/service-invite.css', 'utf8') } : JSON.parse(readFileSync(baselineFile));
if (snapshot) {
  const delivered = JSON.parse(readFileSync('../coordination/evidence/h010-live/deployment.json'));
  for (const route of routes) assert.equal(hash(readFileSync(resolve('dist', route === '/' ? 'index.html' : route.slice(1) + 'index.html'))), delivered.assets.find(asset => asset.path === route).sha256, 'Baseline uses actual delivered H-010 HTML');
} else {
  assert.deepEqual(frozen, baseline.frozen, 'All incoming content/proof/protected/backend and frozen HTML/CSS hashes match');
  assert.ok(readFileSync('dist/styles/service-invite.css', 'utf8').startsWith(baseline.serviceCss), 'Existing service styling unchanged; only scoped visual rules appended');
}
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage(), errors = [], checks = [];
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
      // Explicit exceptions: home intro/fit/provider removal/FAQ wording and
      // shared footer/provider labels. Retained blocks are compared locally so
      // authorized text-height changes do not erase preservation evidence.
      const selectors = route === '/' ? ['.site-header', '.home-hero h1', '.hero-photo', '#behov', '#regneeksempel', '#priser', '#mekanisme', '#sjekk'] : ['.site-header', 'main'];
      for (const selector of selectors) {
        const key = `${route}:${width}:${selector}`, current = await geometry(selector);
        if (snapshot) baseline.preserved[key] = current;
        else assert.deepEqual(visibleGeometry(current), visibleGeometry(baseline.preserved[key]), `${key}: preserved geometry/styles`);
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
      if (width !== 320) {
        const options = { animations: 'disabled' };
        if (route === '/') {
          await page.locator('#passer').screenshot({ ...options, path: resolve(output, `home-fit-${width}.png`) });
          await page.locator('.site-header').screenshot({ ...options, path: resolve(output, `header-${width}.png`) });
          await page.locator('.site-footer').screenshot({ ...options, path: resolve(output, `footer-${width}.png`) });
        } else if (route !== '/priser/') await page.locator('#service-hero').screenshot({ ...options, path: resolve(output, `${route.split('/')[1]}-hero-${width}.png`) });
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
  assert.deepEqual(errors, []); assert.equal(posts, 0);
  if (snapshot) writeFileSync(baselineFile, JSON.stringify(baseline, null, 2) + '\n');
  else writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ base, checkedAt: new Date().toISOString(), baselineSource: baseline.source, layoutSource: baseline.layoutSource, frozenFilesChecked: Object.keys(frozen).length, checks, errors, posts, liveEmailsSent: 0 }, null, 2) + '\n');
  console.log(`H-011 ${snapshot ? 'baseline' : 'QA'} PASS: ${Object.keys(frozen).length} frozen files, four accepted pages, 1440/390/320, authorized deltas only.`);
} finally { await browser.close(); }
