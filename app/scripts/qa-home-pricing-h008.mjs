import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';

const snapshot = process.argv.includes('--baseline');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve(process.env.QA_EVIDENCE_DIR || '../coordination/evidence/h008');
const baselineFile = resolve('../coordination/evidence/h008/baseline.json');
const root = resolve('..');
const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const pricing = JSON.parse(readFileSync('src/content/pages/priser.json', 'utf8'));
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const frozen = {};
function collect(directory, include = () => true) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) collect(path, include);
    else if (include(path)) frozen[relative(root, path).replaceAll('\\', '/')] = hash(readFileSync(path));
  }
}
for (const directory of ['system', 'project', 'app/src/content/proof', 'app/src/config']) collect(resolve(root, directory));
collect(resolve('server'), path => path.endsWith('.mjs'));
collect(resolve('src/content/pages'), path => !['home.json', 'priser.json'].some(file => path.endsWith(file)));
collect(resolve('dist'), path => path.endsWith('.html') && ![resolve('dist/index.html'), resolve('dist/priser/index.html')].includes(path));
collect(resolve('dist/_astro'), path => path.endsWith('.css'));
const contentHashes = Object.fromEntries(['home', 'priser'].map(slug => [slug, hash(readFileSync(`src/content/pages/${slug}.json`, 'utf8').replaceAll('\r\n', '\n'))]));
const baseline = snapshot ? { source: '73ce60d8789ba0b44661ce5222adff53a4831127', frozen, contentHashes, homepage: {} } : JSON.parse(readFileSync(baselineFile, 'utf8'));
if (!snapshot) {
  assert.deepEqual(frozen, baseline.frozen, 'Other 13 pages, reference inputs, proof, backend/config and shared CSS unchanged');
  assert.deepEqual(contentHashes, baseline.contentHashes, 'D-024 input files unchanged');
}
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const errors = [], checks = [];
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (request.method() === 'POST') posts++; });
async function homeSnapshot() {
  const blocks = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll('.invite-home > section, .site-header, .site-footer')].map((block, index) => [block.id || block.className || String(index), {
    html: block.outerHTML.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim(),
    elements: [block, ...block.querySelectorAll('*')].map(element => {
      const r = element.getBoundingClientRect(), s = getComputedStyle(element);
      return { rect: [r.x, r.y, r.width, r.height], style: Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'padding', 'gap', 'borderRadius'].map(key => [key, s[key]])) };
    }),
  }])));
  for (const block of Object.values(blocks)) { block.htmlHash = hash(block.html); delete block.html; }
  return blocks;
}
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    assert.equal((await page.goto(base + '/')).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const current = await homeSnapshot();
    if (snapshot) { baseline.homepage[width] = current; continue; }
    assert.deepEqual(current, baseline.homepage[width], `${width}: homepage DOM, computed styles and geometry unchanged`);
    const homeCards = await page.locator('.package-card').allTextContents();
    for (const route of ['/', '/priser/']) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, nofollow');
      const body = normalize(await page.locator('body').innerText());
      assert.ok(!/Nysta|Oslo Privatklinikk|Sprint|ubegrenset|bindingstid|oppsigelsestid|minimumsperiode|oppstartsgebyr|onboarding|fakturavilkår|\d+\s*timer/i.test(body));
      assert.equal(await page.locator('#resultater, .proof-section, blockquote, .logo-wall').count(), 0);
      assert.deepEqual((await page.locator('.package-card').allTextContents()).map(normalize), homeCards.map(normalize));
      const cards = page.locator('.package-card');
      assert.equal(await cards.count(), 3);
      for (const [index, item] of home.homepage.packages.items.entries()) {
        assert.equal(normalize(await cards.nth(index).locator('.package-price').innerText()), ['4 500 kr/mnd eks. mva.', '6 900 kr/mnd eks. mva.', '14 900 kr/mnd eks. mva.'][index]);
        assert.match(await cards.nth(index).locator('.package-price-amount').evaluate(element => getComputedStyle(element).fontFamily), /Instrument Sans/);
        assert.equal(await cards.nth(index).locator('.package-badge').count(), item.recommended ? 1 : 0);
        assert.equal(await cards.nth(index).locator('a').getAttribute('href'), item.cta.href);
      }
      assert.ok(body.includes(home.homepage.form.promise));
      for (const field of ['adBudgetNote', 'externalCostsNote', 'separateWorkNote', 'capacityNote']) {
        const value = home.homepage.packages[field];
        assert.ok(body.includes(value) || body.includes(value.replace('kommer i tillegg', 'kommer også i tillegg')));
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width} ${route}: no horizontal overflow`);
      const clipped = await page.locator('main h1, main h2, main h3, main p, main a, main dd, main dt, main .package-badge').evaluateAll(elements => elements.filter(element => {
        const r = element.getBoundingClientRect();
        return r.width && (r.left < -1 || r.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 2);
      }).map(element => element.textContent));
      assert.deepEqual(clipped, [], `${width} ${route}: no clipped copy/prices/CTA`);
      if (route === '/priser/') {
        assert.equal(normalize(await page.locator('h1').innerText()), pricing.title);
        assert.deepEqual(await page.locator('.invite-pricing > section').evaluateAll(sections => sections.map(section => section.id)), ['pricing-hero', 'priser', 'arbeidsomrader', 'kostnader', 'gratis', 'sporsmal']);
        assert.equal(await page.locator('form').count(), 0, 'Use the locked homepage free-check link, no new intake');
        for (const section of pricing.sections) for (const value of [section.heading, ...section.body]) assert.ok(body.includes(value), `Exact approved pricing supporting copy: ${value}`);
        assert.equal(await page.locator('#gratis a').getAttribute('href'), '/#sjekk');
        assert.equal(await page.locator('body').getAttribute('class'), 'invite-homepage');
      } else assert.ok(await page.locator('[data-home-assessment] button').isDisabled());
      if (width !== 320) {
        await page.screenshot({ path: resolve(output, `${route === '/' ? 'home' : 'pricing'}-${width}.png`), fullPage: true });
        if (route === '/priser/') await page.locator('#priser').screenshot({ path: resolve(output, `packages-${width}.png`) });
      }
      const faq = page.locator('.faq-list details').first();
      await faq.locator('summary').click();
      assert.equal(await faq.getAttribute('open'), '');
      if (width !== 1440) {
        await page.locator('[data-home-menu]').click();
        assert.equal(await page.locator('#mobile-menu').getAttribute('hidden'), null);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('[data-home-menu]').getAttribute('aria-expanded'), 'false');
      }
      checks.push({ route, width, sharedPackages: true, exactSupportingCopy: true, noOverflow: true, proofRendered: false, noindex: true });
    }
  }
  assert.equal(posts, 0);
  assert.deepEqual(errors, []);
  if (snapshot) writeFileSync(baselineFile, JSON.stringify(baseline, null, 2) + '\n');
  else writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ base, checkedAt: new Date().toISOString(), sourceBaseline: baseline.source, frozenFilesChecked: Object.keys(frozen).length, checks, errors, posts, liveEmailsSent: 0 }, null, 2) + '\n');
  console.log(`H-008 ${snapshot ? 'baseline saved' : 'QA PASS'}: ${Object.keys(frozen).length} frozen files; unchanged D-024 input/home; 1440/390/320${snapshot ? '' : '; shared packages, supporting copy, menu/FAQ/noindex/hidden proof; six screenshots'}.`);
} finally { await browser.close(); }
