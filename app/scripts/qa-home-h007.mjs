import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import YAML from 'yaml';

const snapshot = process.argv.includes('--baseline');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve(process.env.QA_EVIDENCE_DIR || '../coordination/evidence/h007');
const baselineFile = resolve('../coordination/evidence/h007/accepted-baseline.json');
const data = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const baseline = snapshot ? { source: '7b98ff8184e7a8063682877b1edfcff3d4941f20', content: JSON.parse(readFileSync('qa-output/h007-baseline-content.json', 'utf8')) } : JSON.parse(readFileSync(baselineFile, 'utf8'));
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
let cmsFieldCount = 0;
function coverage(data, fields) {
  for (const [name, value] of Object.entries(data)) {
    const field = fields.find(field => field.name === name);
    assert.ok(field, `Missing CMS field ${name}`);
    cmsFieldCount++;
    const children = field.component ? cms.components[field.component].fields : field.fields;
    if (value && typeof value === 'object' && !Array.isArray(value)) coverage(value, children);
    if (Array.isArray(value)) value.filter(item => item && typeof item === 'object').forEach(item => coverage(item, children));
  }
}
coverage(data, cms.content.find(entry => entry.name === 'homepage').fields);
const proofEditor = cms.content.find(entry => entry.name === 'proofCases');
assert.equal(proofEditor.type, 'collection');
assert.equal(proofEditor.path, 'app/src/content/proof');
const proofFields = cms.content.find(entry => entry.name === 'homepage').fields.find(field => field.name === 'homepage').fields.find(field => field.name === 'proof').fields;
assert.deepEqual(proofFields.find(field => field.name === 'caseIds').options, { collection: 'proofCases', multiple: true, value: '{fields.id}', label: '{fields.clientName} ({fields.publicationStatus})', search: 'id,clientName,anonymizedLabel' });
assert.equal(proofFields.find(field => field.name === 'publicationApproved').default, false);
mkdirSync(output, { recursive: true });

function permittedContent(page) {
  const copy = structuredClone(page);
  delete copy.homepage.packages;
  delete copy.homepage.proof;
  delete copy.homepage.form.promise;
  copy.faq = copy.faq.filter(item => !['Hva koster videre arbeid?', 'Er annonsebudsjett og eksterne kostnader inkludert?'].includes(item.question));
  return copy;
}
if (!snapshot) assert.deepEqual(permittedContent(data), permittedContent(baseline.content), 'No content changes outside commercial/proof/free-check promise and two conflicting FAQ answers');

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const errors = [], checks = [];
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (request.method() === 'POST') posts++; });
const normalize = value => value.replace(/\s+/g, ' ').trim();

async function unchangedBlocks() {
  const blocks = await page.evaluate(() => {
    const selectors = ['.home-hero', '#behov', '#regneeksempel', '#mekanisme', '#passer', '#medon', '.assessment-form', '.site-header', '.site-footer'];
    return Object.fromEntries(selectors.map(selector => {
      const block = document.querySelector(selector), outer = block.getBoundingClientRect();
      const elements = [block, ...block.querySelectorAll('*')].map(element => {
        const rect = element.getBoundingClientRect(), styles = getComputedStyle(element);
        const properties = Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'padding', 'gap', 'borderRadius'].map(key => [key, styles[key]]));
        return { tag: element.tagName, x: rect.x - outer.x, y: rect.y - outer.y, width: rect.width, height: rect.height, properties };
      });
      return [selector, { html: block.outerHTML, elements }];
    }));
  });
  for (const block of Object.values(blocks)) {
    block.htmlHash = createHash('sha256').update(block.html).digest('hex');
    delete block.html;
  }
  return blocks;
}

try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    assert.equal((await page.goto(base)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const blocks = await unchangedBlocks();
    if (snapshot) { baseline[width] = blocks; continue; }
    for (const [selector, block] of Object.entries(blocks)) {
      const previous = baseline[width][selector];
      assert.equal(block.htmlHash, previous.htmlHash, `${width} ${selector}: unchanged DOM`);
      assert.equal(block.elements.length, previous.elements.length);
      for (const [index, element] of block.elements.entries()) {
        const before = previous.elements[index];
        assert.deepEqual(element.properties, before.properties, `${width} ${selector} ${index}: unchanged computed styles`);
        // A display:none node returns viewport (0,0), not section-relative
        // geometry. Pricing may move later sections without moving their children.
        const geometry = value => value.width || value.height ? [value.x, value.y, value.width, value.height] : [0, 0, 0, 0];
        assert.deepEqual(geometry(element), geometry(before), `${width} ${selector} ${index}: unchanged visible relative geometry`);
      }
    }
    const sequence = await page.locator('.invite-home > section').evaluateAll(sections => sections.map(section => section.id || 'hero'));
    assert.deepEqual(sequence, ['hero', 'behov', 'regneeksempel', 'priser', 'mekanisme', 'passer', 'sjekk', 'medon', 'sporsmal']);
    const cards = page.locator('.package-card');
    assert.equal(await cards.count(), 3);
    const prices = [];
    for (const [index, item] of data.homepage.packages.items.entries()) {
      const card = cards.nth(index);
      assert.equal(normalize(await card.locator('h3').innerText()), item.title);
      assert.equal(normalize(await card.locator('.package-descriptor').innerText()), item.descriptor);
      const price = normalize(await card.locator('.package-price').innerText());
      assert.equal(price, ['4 500 kr/mnd eks. mva.', '6 900 kr/mnd eks. mva.', '14 900 kr/mnd eks. mva.'][index]);
      const font = await card.locator('.package-price-amount').evaluate(element => getComputedStyle(element).fontFamily);
      assert.match(font, /Instrument Sans/);
      assert.equal(await card.locator('.package-badge').count(), item.recommended ? 1 : 0);
      if (item.recommended) assert.equal(await card.locator('.package-badge').innerText(), 'Anbefalt');
      assert.equal(await card.locator('a').getAttribute('href'), item.cta.href);
      prices.push({ text: price, font, recommended: item.recommended });
    }
    assert.equal(await page.locator('.package-budget-note').innerText(), 'Annonsebudsjett kommer i tillegg.');
    assert.equal(await page.locator('.assessment-promise').innerText(), 'Få våre 3 viktigste funn innen 2 virkedager.');
    assert.equal(await page.locator('[data-home-assessment] input').count(), 2);
    assert.equal(await page.locator('[data-home-assessment] textarea').count(), 1);
    assert.ok(await page.locator('[data-home-assessment] button').isDisabled());
    assert.equal(await page.locator('#resultater, .proof-section, blockquote, .logo-wall').count(), 0);
    const visible = await page.locator('body').innerText();
    assert.ok(!/Nysta|Oslo Privatklinikk|Sprint|ubegrenset|bindingstid|oppsigelsestid|minimumsperiode|oppstartsgebyr|onboarding|fakturavilkår|\d+\s*timer/i.test(visible));
    assert.ok(visible.includes('avgrenset, manuell vurdering. Ingen automatisk poengsum, full revisjon, prognose eller gratis gjennomføring.'));
    assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, nofollow');
    const overflow = await page.evaluate(() => ({ page: document.documentElement.scrollWidth > innerWidth, elements: [...document.querySelectorAll('main a, main h1, main h2, main h3, main p, main dt, main dd, main .discipline, main .package-badge, main label, main input, main textarea, main output')].filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width && (rect.left < -1 || rect.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 2);
    }).map(element => element.textContent.slice(0, 80)) }));
    assert.deepEqual(overflow, { page: false, elements: [] }, `${width}: no clipped prices, badges or text`);
    if (width !== 320) {
      await page.locator('#priser').screenshot({ path: resolve(output, `packages-${width}.png`) });
      await page.locator('#sjekk').screenshot({ path: resolve(output, `free-check-${width}.png`) });
    }
    checks.push({ width, prices, noOverflow: true, acceptedBlocks: 'exact DOM/styles/relative geometry preserved', proofRendered: false, formFields: 3, intake: 'disabled', sectionSequence: sequence });
  }
  if (snapshot) {
    writeFileSync(baselineFile, JSON.stringify(baseline, null, 2) + '\n');
    console.log('Accepted pre-H-007 homepage captured at 1440/390/320px.');
  } else {
    assert.equal(posts, 0);
    assert.deepEqual(errors, []);
    writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ base, sourceBaseline: baseline.source, checkedAt: new Date().toISOString(), browser: browser.version(), cmsFieldCount, checks, errors, posts, liveEmailsSent: 0 }, null, 2) + '\n');
    console.log('H-007 focused QA PASS: exact prices/VAT/recommendation, safeguards, no proof, CMS and accepted blocks; 1440/390/320; four screenshots.');
  }
} finally { await browser.close(); }
