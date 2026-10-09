import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';
const snapshot = process.argv.includes('--baseline');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve(process.env.QA_EVIDENCE_DIR || '../coordination/evidence/h010');
const baselineFile = resolve('../coordination/evidence/h010/baseline.json');
const root = resolve('..'), frozen = {};
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const content = JSON.parse(readFileSync('src/content/pages/konvertering.json', 'utf8'));
const packages = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8')).homepage.packages;
function collect(directory, include = () => true) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) collect(path, include);
    else if (include(path)) frozen[relative(root, path).replaceAll('\\', '/')] = hash(readFileSync(path));
  }
}
for (const directory of ['system', 'project', 'app/src/content', 'app/src/config']) collect(resolve(root, directory));
collect(resolve('server'), path => path.endsWith('.mjs'));
collect(resolve('dist'), path => path.endsWith('.html') && path !== resolve('dist/konvertering/index.html'));
collect(resolve('dist/_astro'), path => path.endsWith('.css'));
for (const file of ['home-invite.css', 'pricing-invite.css', 'service-invite.css']) frozen[`app/dist/styles/${file}`] = hash(readFileSync(`dist/styles/${file}`));
const baseline = snapshot ? { source: 'cbd7e18ff29c1aff01421df81048eb66c3b3c8ba', frozen, preserved: {} } : JSON.parse(readFileSync(baselineFile, 'utf8'));
const acceptedSynlighet = JSON.parse(readFileSync('../coordination/evidence/h009-live/deployment.json', 'utf8')).assets.find(asset => asset.path === '/synlighet/');
assert.equal(hash(readFileSync('dist/synlighet/index.html')), acceptedSynlighet.sha256, 'Synlighet HTML matches delivered H-009/D-030 baseline');
if (!snapshot) assert.deepEqual(frozen, baseline.frozen, 'All JSON/authority/proof/backend/reference inputs, other route HTML and accepted CSS unchanged');
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const errors = [], checks = [];
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (request.method() === 'POST') posts++; });
async function geometry() {
  return page.evaluate(() => [...document.querySelectorAll('body, body *')].filter(element => !['SCRIPT', 'STYLE'].includes(element.tagName)).map(element => {
    const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
    return { rect: [rect.x, rect.y, rect.width, rect.height], style: Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'padding', 'gap', 'borderRadius'].map(key => [key, style[key]])) };
  }));
}
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of ['/', '/priser/', '/synlighet/']) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const key = `${route}:${width}`, current = await geometry();
      if (snapshot) baseline.preserved[key] = current;
      else assert.deepEqual(current, baseline.preserved[key], `${key}: unchanged accepted DOM geometry and computed styles`);
    }
    if (snapshot) continue;
    assert.equal((await page.goto(base + '/konvertering/')).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('h1').innerText(), content.title);
    assert.equal(await page.locator('.service-hero .eyebrow').innerText(), content.eyebrow);
    assert.equal(await page.locator('.service-hero .hero-intro').innerText(), content.intro);
    assert.deepEqual(await page.locator('#service-priser .service-package > p').allTextContents(), ['Når Konvertering er det ene prioriterte området.', 'Når Konvertering jobber sammen med et annet område.']);
    assert.deepEqual(await page.locator('.invite-service > section').evaluateAll(elements => elements.map(element => element.id)), ['service-hero', 'friksjon', 'kvalitet', 'prioritering', 'sammenheng', 'service-priser', 'sjekk', 'sporsmal']);
    for (const section of content.sections) {
      const rendered = page.locator(`#${section.id}`);
      assert.equal(await rendered.locator('h2').innerText(), section.heading);
      assert.deepEqual(await rendered.locator('.body-copy > p').allTextContents(), section.body);
      assert.deepEqual(await rendered.locator('h3').allTextContents(), (section.items ?? []).map(item => item.title));
    }
    assert.deepEqual(await page.locator('.faq-list details > p').allTextContents(), content.faq.map(item => item.answer));
    const bridge = page.locator('#service-priser');
    assert.equal(await bridge.locator('.service-package').count(), 2);
    for (const [index, item] of packages.items.slice(0, 2).entries()) {
      const card = bridge.locator('.service-package').nth(index);
      assert.equal(await card.locator('h3').innerText(), item.title);
      assert.equal(normalize(await card.locator('.package-price').innerText()), normalize(`${new Intl.NumberFormat('nb-NO').format(item.price)} ${item.priceSuffix} ${item.vatSuffix}`));
      assert.match(await card.locator('.package-price-amount').evaluate(element => getComputedStyle(element).fontFamily), /Instrument Sans/);
    }
    assert.equal(await page.locator('form, img, #resultater, .proof-section').count(), 0);
    assert.ok(!/Nysta|Oslo Privatklinikk|Sprint|\d+\s*timer/.test(await page.locator('body').innerText()));
    for (const href of ['/synlighet/', '/priser/', '/#sjekk']) assert.ok(await page.locator(`main a[href="${href}"]`).count());
    assert.equal(await page.locator('a[href="/lokal-seo/"]').count(), 0);
    assert.equal(await page.locator('.service-hero a.button').getAttribute('href'), '/#sjekk');
    assert.equal(await page.locator('.service-hero a.text-link').getAttribute('href'), '/priser/');
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    assert.match(await page.locator('h1').evaluate(element => getComputedStyle(element).fontFamily), /Instrument Sans/);
    assert.match(await page.locator('.hero-intro').evaluate(element => getComputedStyle(element).fontFamily), /Figtree/);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}: no horizontal overflow`);
    const outside = await page.evaluate(() => [...document.querySelectorAll('main *')].filter(element => { const r = element.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1); }).map(element => element.tagName));
    assert.deepEqual(outside, [], `${width}: no overflowing elements`);
    if (width !== 320) {
      const options = { animations: 'disabled' };
      await page.screenshot({ ...options, path: resolve(output, `konvertering-${width}.png`), fullPage: true });
      for (const [name, first, last] of [['hero-first', '#service-hero', '#friksjon'], ['quality-priority', '#kvalitet', '#prioritering'], ['relationship-bridge-check', '#sammenheng', '#sjekk']]) {
        const a = await page.locator(first).boundingBox(), b = await page.locator(last).boundingBox();
        await page.screenshot({ ...options, fullPage: true, path: resolve(output, `${name}-${width}.png`), clip: { x: 0, y: a.y, width, height: b.y + b.height - a.y } });
      }
    }
    await page.locator('.faq-list summary').first().click();
    assert.equal(await page.locator('.faq-list details').first().getAttribute('open'), '');
    if (width < 901) {
      await page.locator('.menu-toggle').click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    }
    checks.push({ route: '/konvertering/', width, exactCopyAndOrder: true, sharedPricing: true, preservedHomePricingAndSynlighet: true, noOverflow: true, proofRendered: false, noindex: true });
  }
  assert.deepEqual(errors, []); assert.equal(posts, 0);
  if (snapshot) writeFileSync(baselineFile, JSON.stringify(baseline, null, 2) + '\n');
  else writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ base, checkedAt: new Date().toISOString(), baselineSource: baseline.source, frozenFilesChecked: Object.keys(frozen).length, checks, errors, posts, liveEmailsSent: 0 }, null, 2) + '\n');
  console.log(`H-010 ${snapshot ? 'baseline' : 'QA'} PASS: ${Object.keys(frozen).length} frozen files; unchanged home/pricing/synlighet; 1440/390/320${snapshot ? '' : '; exact service copy, shared prices, eight captures'}.`);
} finally { await browser.close(); }
