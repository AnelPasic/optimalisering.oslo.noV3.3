import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const server = process.env.QA_BASE_URL ? null : createAppServer({ config: { enabled: false }, staticRoot: resolve('dist') });
if (server) { server.listen(0, '127.0.0.1'); await once(server, 'listening'); }
const base = process.env.QA_BASE_URL || `http://127.0.0.1:${server.address().port}`;
const phase = process.env.QA_PHASE || 'after';
const auditOnly = phase === 'before';
const output = resolve(process.env.QA_OUTPUT_DIR || `../coordination/evidence/typography/${phase}`);
mkdirSync(output, { recursive: true });
// Deliberately empty. Hidden accessibility text and non-text glyphs are excluded by visibility/semantics.
const belowMinimumAllowlist = [];
const routes = ['/', ...readdirSync('src/content/pages').filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(readFileSync(`src/content/pages/${f}`, 'utf8')).slug)
  .filter(slug => slug !== 'home').map(slug => `/${slug}/`), '/begreper/'];
const representative = new Set(['/', '/synlighet/', '/priser/', '/begreper/', '/vurdering/']);
const localChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || (existsSync(localChrome) ? localChrome : undefined), headless: true });
const report = [], errors = [], posts = [];

function inspectText() {
  const failures = { small: [], contrast: [], clipping: [], buttons: [], overflow: [] };
  const inventory = {}, headings = [], longLines = [], gradients = [];
  const describe = e => `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${typeof e.className === 'string' ? '.' + e.className.trim().replaceAll(' ', '.') : ''}`;
  const rgba = c => {
    const n = c.match(/[\d.]+/g)?.map(Number);
    return n?.length >= 3 ? [n[0], n[1], n[2], n[3] ?? 1] : [0, 0, 0, 0];
  };
  const composite = (fg, bg) => [0, 1, 2].map(i => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1);
  const luminance = c => c.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
  const ratio = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
  function visible(e, rects) {
    if (!rects.length || e.closest('[hidden], [inert], script, style, template, .honeypot')) return false;
    for (let p = e; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (p.tagName === 'DETAILS' && !p.open && !p.querySelector(':scope > summary')?.contains(e)) return false;
      if (s.display === 'none' || s.visibility !== 'visible' || +s.opacity === 0 || s.clipPath === 'inset(50%)' || (s.position === 'absolute' && p.getBoundingClientRect().width <= 1)) return false;
    }
    return rects.some(r => r.width > 0 && r.height > 0 && r.right > 0 && r.left < innerWidth);
  }
  function record(e, text, rects) {
    if (!text.trim() || !visible(e, rects) || (e.closest('[aria-hidden="true"]') && /^[+×→←↗−–\s<>-]+$/.test(text))) return;
    const s = getComputedStyle(e), size = parseFloat(s.fontSize);
    const item = { selector: describe(e), text: text.trim().slice(0, 100), size, weight: s.fontWeight, lineHeight: s.lineHeight, color: s.color };
    inventory[size] = (inventory[size] || 0) + 1;
    if (size < 14 - .01) failures.small.push(item);
    if (rects.some(r => r.width > 0 && (r.left < -1 || r.right > innerWidth + 1))) failures.clipping.push({ ...item, reason: 'text outside page width' });
    for (let p = e; p && p !== document.body; p = p.parentElement) {
      const ps = getComputedStyle(p), pr = p.getBoundingClientRect();
      if (['hidden', 'clip'].includes(ps.overflowX) || ['hidden', 'clip'].includes(ps.overflowY)) {
        if (rects.some(r => (['hidden', 'clip'].includes(ps.overflowX) && (r.left < pr.left - 2 || r.right > pr.right + 2)) || (['hidden', 'clip'].includes(ps.overflowY) && (r.top < pr.top - 2 || r.bottom > pr.bottom + 2)))) failures.clipping.push({ ...item, ancestor: describe(p), reason: 'text clipped by ancestor' });
      }
    }
    if (e.closest('button, .button')) {
      const b = e.closest('button, .button').getBoundingClientRect();
      if (rects.some(r => r.left < b.left - 1 || r.right > b.right + 1 || r.top < b.top - 1 || r.bottom > b.bottom + 1)) failures.buttons.push(item);
    }
    const chain = [];
    for (let p = e; p; p = p.parentElement) chain.unshift(p);
    let backgrounds = [[255, 255, 255, 1]];
    for (const p of chain) {
      const ps = getComputedStyle(p), bg = rgba(ps.backgroundColor);
      backgrounds = backgrounds.map(b => composite(bg, b));
      if (ps.backgroundImage !== 'none') {
        const stops = ps.backgroundImage.match(/rgba?\([^)]+\)/g);
        if (stops) backgrounds = backgrounds.flatMap(b => stops.map(c => composite(rgba(c), b)));
        else gradients.push({ selector: describe(p), background: ps.backgroundImage });
      }
    }
    // Disabled controls are WCAG contrast-exempt; still subject to the 14px rule.
    if (!e.closest(':disabled')) {
      let fg = rgba(e instanceof SVGElement ? s.fill : s.color);
      const opacity = chain.reduce((n, p) => n * Number(getComputedStyle(p).opacity), 1);
      fg[3] *= opacity;
      const contrast = Math.min(...backgrounds.map(bg => ratio(composite(fg, bg), bg)));
      const minimum = size >= 24 || (size >= 18.666 && Number(s.fontWeight) >= 700) ? 3 : 4.5;
      if (contrast < minimum - .01) failures.contrast.push({ ...item, ratio: +contrast.toFixed(2), minimum });
    }
    if (e.tagName === 'P' && e.getBoundingClientRect().width / size > 45) longLines.push({ ...item, width: e.getBoundingClientRect().width });
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode, e = n.parentElement;
    const range = document.createRange(); range.selectNodeContents(n);
    record(e, n.textContent, [...range.getClientRects()]);
  }
  for (const e of document.querySelectorAll('input:not([type="range"]):not([type="hidden"]), textarea, select')) {
    record(e, e.value || e.getAttribute('placeholder') || '', [e.getBoundingClientRect()]);
    if (e.getAttribute('placeholder') && !e.value) {
      const ps = getComputedStyle(e, '::placeholder');
      const bg = rgba(getComputedStyle(e).backgroundColor);
      const contrast = ratio(composite(rgba(ps.color), bg), bg);
      if (contrast < 4.49) failures.contrast.push({ selector: describe(e) + '::placeholder', text: e.getAttribute('placeholder'), ratio: +contrast.toFixed(2), minimum: 4.5 });
    }
  }
  for (const e of document.querySelectorAll('h1, h2, h3, h4')) {
    const range = document.createRange(); range.selectNodeContents(e);
    const rects = [...range.getClientRects()];
    if (visible(e, rects)) headings.push({ selector: describe(e), text: e.textContent.trim(), size: parseFloat(getComputedStyle(e).fontSize), width: e.getBoundingClientRect().width, lines: new Set(rects.filter(r => r.width).map(r => Math.round(r.top))).size });
  }
  if (document.documentElement.scrollWidth > innerWidth) failures.overflow.push({ scrollWidth: document.documentElement.scrollWidth, viewport: innerWidth });
  const ticks = [...document.querySelectorAll('[data-chart-month]')];
  for (const e of document.querySelectorAll('[data-chart-current-value], [data-chart-improved-value]')) {
    const rect = e.getBoundingClientRect(), surface = e.closest('figure').getBoundingClientRect();
    if (visible(e, [rect]) && (rect.left < surface.left - 1 || rect.right > surface.right + 1)) failures.clipping.push({ selector: describe(e), text: e.textContent, reason: 'graph value outside its contrasting surface' });
  }
  for (let i = 1; i < ticks.length; i++) {
    const previous = ticks[i - 1].getBoundingClientRect(), current = ticks[i].getBoundingClientRect();
    if (previous.right > current.left) failures.clipping.push({ selector: '[data-chart-month]', reason: 'overlapping ticks', month: i + 1 });
  }
  return { failures, inventory, headings, longLines, gradients: [...new Map(gradients.map(g => [g.selector, g])).values()] };
}

try {
  // Prove the guard catches regressions and excludes genuinely invisible/glyph content.
  const fixture = await browser.newPage({ viewport: { width: 390, height: 1000 } });
  await fixture.setContent(`<style>body{color:#000;background:#fff;font-size:16px} .tiny{font-size:13px} .low{color:#aaa} .clip{width:24px;overflow:hidden;white-space:nowrap} .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);font-size:10px}</style>
    <p class="tiny">Visible small text</p><p class="low">Low contrast</p><div class="clip">Clipped useful text</div>
    <p hidden style="font-size:9px">Hidden</p><span class="sr">Accessible label</span><span aria-hidden="true" style="font-size:10px">+</span>
    <details><summary>Read details</summary><p style="font-size:11px">Closed details</p></details>`);
  const fixtureResult = await fixture.evaluate(inspectText);
  assert.deepEqual(fixtureResult.failures.small.map(x => x.text), ['Visible small text']);
  assert.ok(fixtureResult.failures.contrast.some(x => x.text === 'Low contrast'));
  assert.ok(fixtureResult.failures.clipping.some(x => x.text === 'Clipped useful text'));
  await fixture.close();
  for (const width of [1440, 900, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (r.method() === 'POST') posts.push(r.url()); });
    async function scan(route, state) {
      const result = await page.evaluate(inspectText);
      report.push({ route, width, state, ...result });
    }
    for (const route of [...new Set(routes)]) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      await scan(route, 'default');
      if (representative.has(route)) {
        const name = route === '/' ? 'home' : route.replaceAll('/', '');
        await page.screenshot({ path: `${output}/${name}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `${output}/${name}-top-${width}.png` });
        if (route === '/') for (const [name, selector] of Object.entries({ calculator: '[data-leverage]', proof: '#resultater', form: '#sjekk', footer: '.site-footer' })) {
          await page.locator(selector).screenshot({ path: `${output}/${name}-${width}.png` });
        }
      }
      await page.evaluate(() => document.querySelectorAll('details').forEach(e => e.open = true));
      await scan(route, 'expanded-details');
      if (route === '/begreper/') await page.screenshot({ path: `${output}/glossary-expanded-${width}.png`, fullPage: true });
      if (width <= 900 && await page.locator('.menu-toggle').isVisible()) {
        await page.locator('.menu-toggle').click();
        await scan(route, 'open-menu');
      }
      if (route === '/vurdering/') {
        assert.equal(await page.locator('[data-assessment]').getAttribute('data-enabled'), 'false');
        await page.locator('[name="email"]').fill('synthetic@example.test');
        await page.locator('[name="website"]').fill('not a url');
        await page.locator('[data-assessment] [type="submit"]').click();
        await page.locator('#website-error:not([hidden])').waitFor();
        await scan(route, 'form-validation-error');
        await page.locator('[name="website"]').fill('example.test');
        await page.locator('[data-assessment] [type="submit"]').click();
        await page.locator('.form-status:not([hidden])').waitFor();
        await scan(route, 'disabled-intake-status');
      }
      if (route === '/') {
        for (const [name, value] of [['visits', '10000000'], ['newConversion', '100'], ['trafficIncrease', '1000']]) await page.locator(`[data-leverage] [name="${name}"]`).fill(value);
        await scan(route, 'large-calculator-values');
        await page.locator('[data-leverage] [name="visits"]').fill('');
        await scan(route, 'calculator-error');
        const term = page.locator('a[data-term]').first();
        await term.focus();
        await page.locator('[data-term-panel]:not([hidden])').waitFor();
        await scan(route, 'tooltip');
        await page.keyboard.press('Escape');
      }
    }
    await page.close();
  }
} finally { await browser.close(); if (server) await new Promise(resolve => server.close(resolve)); }
writeFileSync(`${output}/checks.json`, JSON.stringify({ base, phase, belowMinimumAllowlist, report, errors, posts }, null, 2));
const counts = Object.fromEntries(['small', 'contrast', 'clipping', 'buttons', 'overflow'].map(key => [key, report.reduce((n, r) => n + r.failures[key].length, 0)]));
console.log(JSON.stringify({ phase, groups: report.length, counts, errors, posts }, null, 2));
assert.equal(errors.length, 0, 'No browser errors');
assert.equal(posts.length, 0, 'No public POST');
if (!auditOnly) for (const [key, count] of Object.entries(counts)) assert.equal(count, 0, `${key}: inspect ${output}/checks.json`);
