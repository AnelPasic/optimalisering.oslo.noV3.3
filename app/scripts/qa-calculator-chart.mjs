import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const phase = process.env.QA_BASE_URL ? 'live' : 'local';
const handoff = process.env.QA_HANDOFF || 'calculator-year';
const output = resolve(`../coordination/evidence/${handoff}/${phase}`);
mkdirSync(output, { recursive: true });
const servers = [];
async function serve(root) {
  const server = createAppServer({ config: { enabled: false }, staticRoot: resolve(root) });
  server.listen(0, '127.0.0.1'); await once(server, 'listening'); servers.push(server);
  return `http://127.0.0.1:${server.address().port}`;
}
const baseline = await serve(`qa-output/${handoff}-baseline`);
const base = process.env.QA_BASE_URL || await serve('dist');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const errors = [], checks = [];
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (request.method() === 'POST') posts++; });
const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8')).homepage;
const format = new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 1 });
const compact = new Intl.NumberFormat('nb-NO', { notation: 'compact', maximumFractionDigits: 1 });
const percent = new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 });
const snapshot = () => page.evaluate(() => {
  const describe = element => {
    const r = element.getBoundingClientRect(), s = getComputedStyle(element);
    return { html: element.outerHTML, x: r.x, y: r.y, width: r.width, height: r.height, font: s.fontFamily, size: s.fontSize, color: s.color, background: s.backgroundColor };
  };
  return {
    section: describe(document.querySelector('#regneeksempel')),
    outside: [...document.querySelectorAll('header, .invite-home > section:not(#regneeksempel), footer')].map(describe),
    copy: [...document.querySelectorAll('#regneeksempel .eyebrow, #regneeksempel h2, #regneeksempel .body-copy, #regneeksempel .calculator-formula')].map(el => el.outerHTML.replace(/ data-astro-cid-[a-z0-9]+=""/g, '')).sort().join(''),
    resultLabels: [...document.querySelectorAll('.math-results > div > span:first-child, .math-results .outcome-label')].map(el => el.textContent),
    caveat: document.querySelector('.calculator-caveat')?.textContent ?? null,
  };
});
async function open(url) {
  const response = await page.goto(url); assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => !document.querySelector('[data-scenario-chart]')?.hidden);
}
async function setNumbers(values) {
  for (const [name, value] of Object.entries(values)) await page.locator(`[data-leverage] input[name=${name}]`).fill(String(value));
}
async function assertScenario(visits, conversion, traffic, next) {
  const current = visits * conversion / 100, scenario = visits * (1 + traffic / 100) ** 12 * next / 100;
  const difference = scenario - current;
  assert.equal(await page.locator('[data-current]').textContent(), format.format(current));
  assert.equal(await page.locator('[data-scenario]').textContent(), format.format(scenario));
  const ratio = current === 0 ? null : scenario / current;
  assert.equal(await page.locator('[data-multiplier]').textContent(), ratio === null ? '–' : `${format.format(ratio)}X`);
  assert.equal(await page.locator('[data-percentage]').textContent(), ratio === null ? home.calculator.labels.undefinedIncrease : `(${percent.format(ratio * 100)}%)`);
  for (const [name, value] of [['current', current], ['improved', scenario]]) {
    const label = page.locator(`[data-chart-${name}-value]`);
    const full = format.format(value);
    assert.equal(await label.textContent(), full.length > 10 ? compact.format(value) : full);
    assert.equal(await label.getAttribute('aria-label'), full);
  }
  for (const name of ['conversion', 'newConversion']) assert.equal(Number(await page.locator(`[data-slider=${name}]`).inputValue()), Number(await page.locator(`input[name=${name}]`).inputValue()));
  const currentPath = await page.locator('[data-chart-current]').getAttribute('d');
  const improvedPath = await page.locator('[data-chart-improved]').getAttribute('d');
  const parse = path => [...path.matchAll(/[ML] ([\d.-]+) ([\d.-]+)/g)].map(match => ({ x: Number(match[1]), y: Number(match[2]) }));
  const a = parse(currentPath), b = parse(improvedPath);
  assert.equal(a.length, 12); assert.equal(b.length, 12);
  assert.ok(a.every(point => point.y === a[0].y));
  const monthly = Array.from({ length: 12 }, (_, index) => visits * (1 + traffic / 100) ** (index + 1) * next / 100);
  const peak = Math.max(current, ...monthly, 1);
  const height = await page.locator('.scenario-chart svg').evaluate(svg => svg.getBoundingClientRect().height);
  b.forEach((point, index) => assert.ok(Math.abs(point.y - (height - 40 - monthly[index] / peak * (height - 60))) <= .0051, `Month ${index + 1}: matches compound growth at actual chart height`));
  if (scenario > current) assert.ok(b[11].y < a[11].y);
  if (scenario < current) assert.ok(b[11].y > a[11].y);
  if (scenario === current) assert.deepEqual(a, b);
  const overflow = await page.locator('#regneeksempel').evaluate(section => [...section.querySelectorAll('*')].filter(el => el instanceof HTMLElement && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1).map(el => el.className));
  assert.deepEqual(overflow, [], 'No overflow even at maximum compounded outcomes');
  return { current, scenario, difference, ratio, monthly, currentPath, improvedPath };
}
try {
  for (const width of [1440, 900, 390, 320]) {
    await page.setViewportSize({ width, height: width > 650 ? 1000 : 844 });
    await page.goto(baseline); await page.evaluate(() => document.fonts.ready); const before = await snapshot();
    await open(base); const after = await snapshot();
    assert.equal(after.copy, before.copy); assert.deepEqual(after.resultLabels, before.resultLabels); assert.equal(after.caveat, null);
    assert.equal(await page.locator('.calculator-caveat, [data-difference]').count(), 0);
    assert.equal((await page.locator('.calculator-multiplier').textContent()).split(':')[0], 'X');
    const introduction = await page.locator('.calculator-introduction').boundingBox(), fields = await page.locator('.calculator-inputs').boundingBox(), chart = await page.locator('.scenario-chart').boundingBox();
    assert.ok(introduction.y + introduction.height < fields.y && introduction.y + introduction.height < chart.y, 'All introductory text appears above the fields and chart');
    assert.equal(await page.locator('.leverage-copy h2, .leverage-copy .body-copy').count(), 0);
    assert.equal(await page.locator('.calculator-introduction h2').textContent(), home.calculator.heading);
    assert.equal(await page.locator('.calculator-introduction .body-copy').textContent(), home.calculator.intro);
    for (const selector of ['.eyebrow', 'h2', '.body-copy', '.calculator-formula']) {
      const text = page.locator(`.calculator-introduction ${selector}`), bounds = await text.boundingBox();
      assert.equal(await text.evaluate(el => getComputedStyle(el).textAlign), 'center');
      assert.ok(Math.abs(bounds.x + bounds.width / 2 - width / 2) <= 1, `${selector}: centered across the section`);
    }
    assert.equal(await page.locator('.calculator-introduction .calculator-formula').evaluate(el => getComputedStyle(el).borderLeftWidth), '0px');
    const addedHeight = after.section.height - before.section.height;
    assert.ok(addedHeight < 200, `${width}: centered introduction keeps calculator compact (height delta ${addedHeight})`);
    after.outside.forEach((item, index) => {
      const original = before.outside[index];
      const expectedY = original.y >= before.section.y + before.section.height ? original.y + addedHeight : original.y;
      assert.ok(Math.abs(item.y - expectedY) <= 1, 'Only calculator height shifts later section positions');
      assert.deepEqual({ ...item, y: 0 }, { ...original, y: 0 }, 'All outside calculator content/styles/size remain exact');
    });
    assert.equal(await page.locator('.leverage-copy .calculator-inputs input[type=number]').count(), 4);
    assert.equal(await page.locator('.leverage-tool input').count(), 0);
    assert.equal(await page.locator('.leverage-copy .calculator-results .math-results > div').count(), 2);
    assert.equal(await page.locator('.leverage-tool .calculator-results').count(), 0);
    const results = await page.locator('.calculator-results').boundingBox();
    assert.ok(results.y >= fields.y + fields.height, 'Cards stay below the input grid');
    assert.equal((await page.locator('label[for=calc-traffic]').textContent()).trim(), 'Mer relevant trafikk per måned (%)');
    assert.equal(await page.locator('.scenario-period').textContent(), 'Måned 12');
    if (width > 900) {
      const left = await page.locator('.calculator-inputs').boundingBox(), right = await page.locator('.leverage-tool').boundingBox();
      assert.ok(left.x + left.width <= right.x, 'Desktop fields stay in the left column under the text');
      const column = await page.locator('.leverage-copy').boundingBox();
      assert.ok(Math.abs(chart.y - column.y) <= 1 && Math.abs(chart.height - column.height) <= 1, 'Desktop chart fills the full height alongside fields and results');
    }
    const initial = await assertScenario(2000, 1, 10, 2);
    assert.equal(await page.locator('.scenario-chart figcaption').textContent(), 'Illustrasjon - ikke prognose 12 måneder');
    assert.deepEqual(await page.locator('[data-chart-month]').allTextContents(), Array.from({ length: 12 }, (_, index) => String(index + 1)));
    assert.deepEqual(await page.locator('.scenario-legend span').allTextContents(), ['Uten optimalisering', 'Med optimalisering']);
    const cases = [];
    for (const [visits, conversion, traffic, next] of [[1000, 1, 0, 2], [1000, 1, 0, 5.5], [1500, 1.25, 20, 2.75], [1000, 2, 0, 1], [1000, 2, 0, 2], [1000, 2, 10, 0], [0, 1, 50, 2], [1000, 0, 50, 2], [10000000, 100, 1000, 100]]) {
      await setNumbers({ visits, conversion, trafficIncrease: traffic, newConversion: next });
      cases.push(await assertScenario(visits, conversion, traffic, next));
      assert.ok(await page.locator('[data-scenario-chart]').isVisible());
    }
    await setNumbers({ visits: 1000, conversion: 1, trafficIncrease: 0, newConversion: 2 });
    for (const [name, value] of [['conversion', '1.5'], ['newConversion', '3']]) {
      await page.locator(`[data-slider=${name}]`).evaluate((slider, value) => { slider.value = value; slider.dispatchEvent(new Event('input', { bubbles: true })); }, value);
      assert.equal(await page.locator(`input[name=${name}]`).inputValue(), value);
    }
    await assertScenario(1000, 1.5, 0, 3);
    await page.locator('[data-slider=newConversion]').focus();
    await page.keyboard.press('ArrowRight');
    const keyboardValue = Number(await page.locator('[data-slider=newConversion]').inputValue());
    assert.ok(keyboardValue > 3); await assertScenario(1000, 1.5, 0, keyboardValue);
    for (const invalid of ['', '-1', '101']) {
      await page.locator('input[name=conversion]').fill(invalid);
      assert.ok(await page.locator('#calculator-error').isVisible());
      assert.ok(await page.locator('[data-scenario-chart]').isHidden());
      assert.equal(await page.locator('[data-current]').textContent(), '–');
    }
    await page.locator('[data-slider=conversion]').evaluate(slider => { slider.value = '2'; slider.dispatchEvent(new Event('input', { bubbles: true })); });
    await assertScenario(1000, 2, 0, keyboardValue);
    await setNumbers({ visits: 2000, conversion: 1, trafficIncrease: 10, newConversion: 2 });
    await assertScenario(2000, 1, 10, 2);
    await page.locator('.scenario-chart figcaption').click();
    await page.waitForTimeout(180);
    const layout = await page.evaluate(() => {
      const chart = document.querySelector('.scenario-chart'), rect = chart.getBoundingClientRect();
      const overflow = [...document.querySelectorAll('#regneeksempel *')].filter(el => el instanceof HTMLElement && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1).map(el => el.className);
      const labels = [...chart.querySelectorAll('text')].map(el => { const box = el.getBoundingClientRect(); return { text: el.textContent, size: getComputedStyle(el).fontSize, x: box.x, right: box.right, y: box.y, bottom: box.bottom }; });
      return { scroll: document.documentElement.scrollWidth, overflow, chart: { x: rect.x, right: rect.right, y: rect.y, bottom: rect.bottom, height: rect.height }, labels, sliderHeights: [...document.querySelectorAll('[data-slider]')].map(el => el.getBoundingClientRect().height) };
    });
    assert.ok(layout.scroll <= width); assert.deepEqual(layout.overflow, []);
    assert.ok(layout.sliderHeights.every(height => height >= 24 && height <= 30));
    for (const label of layout.labels) { assert.equal(label.size, '12px'); assert.ok(label.x >= layout.chart.x && label.right <= layout.chart.right + 1 && label.bottom <= layout.chart.bottom + 1); }
    const monthLabels = layout.labels.slice(2);
    for (let index = 1; index < monthLabels.length; index++) assert.ok(monthLabels[index].x > monthLabels[index - 1].right, 'Month labels remain separate and readable');
    await page.locator('#regneeksempel').screenshot({ path: resolve(output, `calculator-${width}.png`) });
    checks.push({ width, initial, cases, sliderNumericAndKeyboardSync: true, invalidChartHiddenAndSliderRecovery: true, addedHeight, outsideCalculatorPreserved: true, layout });
  }
  const otherPages = [];
  for (const file of readdirSync('src/content/pages').filter(file => file.endsWith('.json') && file !== 'home.json')) {
    const { slug } = JSON.parse(readFileSync(`src/content/pages/${file}`, 'utf8'));
    await page.goto(`${baseline}/${slug}/`); const original = await page.locator('body').innerHTML();
    await page.goto(`${base}/${slug}/`); assert.equal(await page.locator('body').innerHTML(), original, `${slug}: body exact`);
    otherPages.push(slug);
  }
  await page.goto(base); assert.ok(await page.locator('#sjekk [type=submit]').isDisabled());
  await page.goto(`${base}/priser/?pakke=vekst#bestill`); assert.equal(await page.locator('form[data-package-order]').getAttribute('data-enabled'), 'false');
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
  const native = await context.newPage(); await native.goto(base);
  assert.equal(await native.locator('[data-current]').textContent(), '20'); assert.equal(await native.locator('[data-scenario]').textContent(), format.format(2000 * 1.1 ** 12 * .02));
  assert.equal(await native.locator('[data-multiplier]').textContent(), '6,3X'); assert.equal(await native.locator('[data-percentage]').textContent(), '(628%)');
  assert.equal(await native.locator('.scenario-period').textContent(), 'Måned 12');
  assert.ok(await native.evaluate(() => document.documentElement.scrollWidth <= 320), 'Native result cards fit mobile without JavaScript');
  assert.equal(await native.locator('.calculator-caveat').count(), 0);
  assert.ok(await native.locator('[data-scenario-chart]').isHidden());
  assert.ok(await native.locator('[data-slider=conversion]').isDisabled());
  await context.close();
  await page.emulateMedia({ reducedMotion: 'reduce' }); await open(base);
  assert.equal(await page.locator('[data-chart-improved]').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  assert.deepEqual(errors, []); assert.equal(posts, 0);
  writeFileSync(resolve(output, 'checks.json'), JSON.stringify({ checkedAt: new Date().toISOString(), base, checks, otherPages, nativeDefaultResultsPreserved: true, reducedMotionSupported: true, intakeDisabled: true, errors, posts, result: 'PASS' }, null, 2) + '\n');
  console.log(`Calculator twelve-month ${phase} PASS: 4 widths, cards below inputs, full-height desktop chart, 12 legible months, independent month-12 math/ratio, retained centered copy/sliders, 14 pages preserved, reduced motion, no overflow/errors/POST.`);
} finally {
  await browser.close();
  for (const server of servers) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
