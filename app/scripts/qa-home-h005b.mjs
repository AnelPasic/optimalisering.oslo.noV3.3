import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';
import { captureHomepage, compareLower } from './qa-home-preservation.mjs';
const snapshot = process.argv.includes('--snapshot');
const baselineFile = resolve(process.env.QA_HOME_BASELINE_FILE || '../coordination/evidence/h005b/h004-baseline.json');
const baseline = snapshot ? {} : JSON.parse(readFileSync(baselineFile, 'utf8'));
const baselineChecks = {};

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve(process.env.QA_EVIDENCE_DIR || '../coordination/evidence/h005b');
const pageData = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const home = pageData.homepage;
const config = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const editor = config.content.find(entry => entry.name === 'homepage');
assert.equal(editor.type, 'file');
assert.equal(editor.path, 'app/src/content/pages/home.json');
assert.ok(config.content.find(entry => entry.name === 'pages').exclude.includes('home.json'));
let cmsFields = 0;
function coverage(data, fields, path = '') {
  for (const [name, value] of Object.entries(data)) {
    const field = fields.find(field => field.name === name);
    assert.ok(field, `CMS field missing: ${path}${name}`);
    cmsFields++;
    const children = field.component ? config.components[field.component].fields : field.fields;
    if (Array.isArray(value)) value.filter(item => typeof item === 'object').forEach(item => coverage(item, children, `${path}${name}[].`));
    else if (value && typeof value === 'object') coverage(value, children, `${path}${name}.`);
  }
}
coverage(pageData, editor.fields);
assert.ok(editor.fields.find(field => field.name === 'authority').readonly);
assert.ok(editor.fields.find(field => field.name === 'homepage').fields.find(field => field.name === 'proof').readonly);
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
page.setDefaultTimeout(10000);
page.setDefaultNavigationTimeout(20000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const checks = [];
const normalize = text => text.replace(/\s+/g, ' ').trim();

async function fit(width) {
  const layout = await page.evaluate(() => {
    const overflow = [...document.querySelectorAll('main a, main h1, main h2, main h3, main p, main label, main input, main textarea, main output')].filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width && (rect.left < -1 || rect.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 2);
    }).map(element => ({ tag: element.tagName, text: element.textContent.slice(0, 80), width: element.clientWidth, scroll: element.scrollWidth }));
    return { scroll: document.documentElement.scrollWidth, width: innerWidth, overflow };
  });
  assert.ok(layout.scroll <= width, `${width}: horizontal overflow ${layout.scroll}`);
  assert.deepEqual(layout.overflow, [], `${width}: clipped controls/text`);
}

try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : width === 390 ? 844 : 740 });
    const response = await page.goto(base + '/');
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const current = await captureHomepage(page, pageData);
    if (snapshot) { baselineChecks[width] = current; continue; }
    const preservation = compareLower(assert, current, baseline[width]);
    assert.ok(current.heroHeight < baseline[width].heroHeight * 0.85, 'Hero is materially shorter than H-004');
    assert.ok(current.selectorY < baseline[width].selectorY, 'Selector arrives earlier');
    assert.equal(await page.locator('.hero-copy > p').count(), 2, 'Only eyebrow and support paragraph');
    assert.equal(await page.locator('.hero-copy > .eyebrow').innerText(), 'For bedrifter som konkurrerer om kundene');
    assert.equal(await page.locator('.hero-actions a').count(), 2);
    assert.equal(await page.locator('.home-hero [role=img]').count(), 1, 'One outcome visual');
    assert.ok(await page.locator('.outcome-art').isVisible());
    assert.equal(await page.locator('.hero-display, .hero-note, .journey-card').count(), 0);
    const visualText = normalize(await page.locator('.outcome-art').innerText());
    assert.ok(!/Bli funnet|Gjør flere besøk|henvendelser og salg|%|\d/.test(visualText), 'Visual has no repeated headline, metrics or case numbers');
    assert.equal(await page.locator('.outcome-art a, .outcome-art button, .outcome-art input').count(), 0, 'Illustration has no fake controls');
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(normalize(await page.locator('h1').innerText()), pageData.title);
    assert.equal(normalize(await page.locator('h1').innerText()), 'Bli funnet. Gjør flere besøk til henvendelser og salg.');
    assert.ok(/SEO/.test(pageData.intro) && /AI-synlighet/.test(pageData.intro) && /konverteringsoptimalisering/.test(pageData.intro) && /Oslo og resten av Norge/.test(pageData.intro) && /Medon/.test(pageData.intro) && /kundereisen stopper/.test(pageData.intro));
    const publicText = (await page.locator('body').innerText()) + (await page.locator('[aria-label]').evaluateAll(elements => elements.map(element => element.getAttribute('aria-label')).join(' ')));
    assert.ok(!/Så må de velge deg|Bli valgt|velge deg|Se tjenestene/i.test(publicText), 'retired wording');
    assert.equal(await page.title(), pageData.seo.title);
    assert.equal(await page.locator('meta[name=description]').getAttribute('content'), pageData.seo.description);
    assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, nofollow');
    assert.equal(await page.locator('.hero-actions .button').getAttribute('href'), pageData.cta.href);
    assert.equal(await page.locator('.hero-actions .text-link').getAttribute('href'), '/#priser');
    const sequence = await page.locator('.invite-home > section').evaluateAll(sections => sections.map(section => section.id || 'hero'));
    assert.deepEqual(sequence, ['hero', 'behov', 'regneeksempel', 'priser', 'mekanisme', 'passer', 'sjekk', 'medon', 'sporsmal']);
    assert.equal(await page.locator('.need-card').count(), 3);
    assert.deepEqual(home.selector.items.map(item => item.description), [
      'SEO, AI-synlighet og lokal synlighet når kundene leter etter det du tilbyr.',
      'Konverteringsoptimalisering for nettsider, landingssider og nettbutikker.',
      'Vi finner flaskehalsen og starter der det kan gi mest effekt.',
    ]);
    for (const [index, item] of home.selector.items.entries()) {
      const card = page.locator('.need-card').nth(index);
      assert.equal(await card.getAttribute('href'), item.link.href);
      assert.equal(normalize(await card.locator('h3').innerText()), item.title);
      assert.ok(normalize(await card.innerText()).includes(item.description));
    }
    assert.equal(await page.locator('.package-card').count(), 3);
    for (const card of await page.locator('.package-card').all()) {
      assert.ok((await card.innerText()).includes('Pris avklares før publisering'));
      assert.equal(await card.locator('a').count(), 1);
      assert.ok(!/\d[\d\s]*\s*(kr|NOK)|4\s?490|6\s?990/i.test(await card.innerText()));
    }
    assert.equal(home.proof.publicationApproved, false);
    assert.equal(home.proof.case, null);
    assert.equal(await page.locator('[data-proof], .proof-section, .logo-wall, blockquote').count(), 0);
    assert.equal(await page.locator('.mechanism-steps article').count(), 4);
    assert.equal(await page.locator('[data-home-assessment] input').count(), 2);
    assert.equal(await page.locator('[data-home-assessment] select').count(), 0);
    assert.equal(await page.locator('[name=message]').getAttribute('required'), null);
    assert.ok(await page.locator('[data-home-assessment] button').isDisabled());
    assert.ok(await page.locator('.form-notice').isVisible());
    assert.equal(await page.locator('[data-current]').innerText(), '10');
    assert.equal(await page.locator('[data-scenario]').innerText(), '30');
    assert.equal(await page.locator('[data-difference]').innerText(), '+20');
    assert.equal(await page.locator('[data-percentage]').innerText(), '+200 % endring');
    assert.equal(await page.locator('.calculator-caveat').innerText(), home.calculator.caveat);
    assert.equal(home.calculator.caveat, 'Hypotetisk regneeksempel – ikke et kundecase eller en resultatgaranti.');
    const fonts = await page.evaluate(() => ({
      h1: getComputedStyle(document.querySelector('h1')).fontFamily,
      metric: getComputedStyle(document.querySelector('[data-current]')).fontFamily,
      body: getComputedStyle(document.querySelector('.hero-intro')).fontFamily,
      label: getComputedStyle(document.querySelector('.calculator-inputs label')).fontFamily,
      nav: getComputedStyle(document.querySelector('.desktop-nav a')).fontFamily,
      footer: getComputedStyle(document.querySelector('.site-footer')).backgroundColor,
    }));
    ['h1', 'metric'].forEach(key => assert.ok(fonts[key].includes('Instrument Sans'), `${key} font`));
    ['body', 'label', 'nav'].forEach(key => assert.ok(fonts[key].includes('Figtree'), `${key} font`));
    assert.equal(fonts.footer, 'rgb(50, 12, 67)');
    await fit(width);
    await page.screenshot({ path: resolve(output, `home-${width}.png`), fullPage: true });
    const hero = await page.locator('.home-hero').boundingBox();
    const selector = await page.locator('#behov').boundingBox();
    await page.screenshot({ path: resolve(output, `hero-selector-${width}.png`), fullPage: true, clip: { x: 0, y: hero.y, width, height: selector.y + selector.height - hero.y } });


    await page.locator('[name=trafficIncrease]').fill('0');
    assert.equal(await page.locator('[data-scenario]').innerText(), '20', 'conversion only');
    await page.locator('[name=newConversion]').fill('1');
    await page.locator('[name=trafficIncrease]').fill('50');
    assert.equal(await page.locator('[data-scenario]').innerText(), '15', 'traffic only');
    await page.locator('[name=newConversion]').fill('2');
    assert.equal(await page.locator('[data-scenario]').innerText(), '30', 'both together');
    await page.locator('[name=conversion]').fill('1.25');
    assert.equal(await page.locator('[data-current]').innerText(), '12,5');
    assert.equal(normalize(await page.locator('[data-current-equation]').innerText()), '1 000 × 1,25 %', 'equation preserves the input rate');
    await page.locator('[name=conversion]').fill('0.04');
    assert.equal(await page.locator('[data-current]').innerText(), '0,4');
    assert.equal(normalize(await page.locator('[data-current-equation]').innerText()), '1 000 × 0,04 %');
    await page.locator('[name=conversion]').fill('1e-308');
    assert.ok(!(await page.locator('[data-percentage]').innerText()).includes('∞'));
    await page.locator('[name=conversion]').fill('0');
    assert.equal(await page.locator('[data-current]').innerText(), '0');
    assert.equal(await page.locator('[data-percentage]').innerText(), home.calculator.labels.undefinedIncrease);
    await page.locator('[name=visits]').fill('');
    assert.equal(await page.locator('[data-current]').innerText(), '–');
    assert.ok(await page.locator('#calculator-error').isVisible());
    await page.locator('[name=visits]').fill('1000');
    await page.locator('[name=newConversion]').fill('101');
    assert.equal(await page.locator('[data-scenario]').innerText(), '–');
    await page.locator('[name=conversion]').fill('100');
    await page.locator('[name=newConversion]').fill('100');
    await page.locator('[name=visits]').fill('10000000');
    await page.locator('[name=trafficIncrease]').fill('1000');
    assert.equal(normalize(await page.locator('[data-scenario]').innerText()), '110 000 000');
    await fit(width);
    await page.locator('[name=visits]').fill('1000');
    await page.locator('[name=trafficIncrease]').fill('0');
    await page.locator('[name=conversion]').fill('2');
    await page.locator('[name=newConversion]').fill('1');
    assert.equal(await page.locator('[data-difference]').innerText(), '−10');
    assert.equal(await page.locator('[data-percentage]').innerText(), '−50 % endring');
    await page.locator('details').first().locator('summary').click();
    assert.ok(await page.locator('details').first().locator('p').isVisible());
    let leadRequests = 0;
    const trackRequest = request => { if (request.method() === 'POST') leadRequests++; };
    page.on('request', trackRequest);
    await page.locator('[data-home-assessment]').evaluate(form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    assert.equal(await page.locator('.form-status').innerText(), home.form.disabledStatus);
    assert.equal(leadRequests, 0, 'preview must not send personal data');
    page.off('request', trackRequest);
    if (width < 901) {
      await page.getByRole('button', { name: home.chrome.openMenu }).click();
      assert.ok(await page.locator('#mobile-menu').isVisible());
      await page.keyboard.press('Escape');
      assert.ok(await page.locator('#mobile-menu').isHidden());
      await page.getByRole('button', { name: home.chrome.openMenu }).click();
      await page.locator('#mobile-menu').getByRole('link', { name: 'Priser', exact: true }).click();
      assert.ok(page.url().endsWith('#priser'));
      assert.ok(await page.locator('#mobile-menu').isHidden());
    }
    checks.push({ width, heroHeight: current.heroHeight, previousHeroHeight: baseline[width].heroHeight, selectorY: current.selectorY, previousSelectorY: baseline[width].selectorY, preservation, sequence, fonts, overflow: false, calculator: 'traffic / conversion / combined / zero / invalid / maximum / decrease PASS', form: 'disabled, three fields, no POST', cmsFieldCoverage: cmsFields });
  }
  if (snapshot) { writeFileSync(baselineFile, JSON.stringify(baselineChecks)); console.log('H-004 baseline captured at 1440/390/320px.'); process.exitCode = 0; } else {
  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.goto(base);
  assert.ok(await noScript.locator('[data-home-assessment] button').isDisabled());
  assert.equal(await noScript.locator('[data-home-assessment]').getAttribute('method'), 'post');
  assert.equal(await noScript.locator('[data-current]').innerText(), '10');
  assert.equal(await noScript.locator('[data-scenario]').innerText(), '30');
  await noScript.close();
  assert.deepEqual(errors, []);
  writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ base, browser: browser.version(), checkedAt: new Date().toISOString(), baselineSource: baseline.source, checks, errors, noScript: 'static outputs visible, intake disabled', proofPublished: false, liveEmailsSent: 0 }, null, 2));
  console.log(`H-005B browser QA PASS: 1440/390/320px, CMS coverage, exact sequence, calculator cases, disabled intake; six screenshots; lower DOM/style/geometry preservation. ${base}`);
  }
} finally { await browser.close(); }
