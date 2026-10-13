import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';
import { shellInventory } from './surface-inventory.mjs';

const phase = process.env.QA_PHASE || 'after';
const output = resolve(`../coordination/evidence/h018/${phase}`);
mkdirSync(output, { recursive: true });
writeFileSync(`${output}/source-inventory.json`, JSON.stringify(shellInventory(), null, 2));
const server = process.env.QA_BASE_URL ? null : createAppServer({ config: { enabled: false }, staticRoot: resolve('dist') });
if (server) { server.listen(0, '127.0.0.1'); await once(server, 'listening'); }
const base = process.env.QA_BASE_URL || `http://127.0.0.1:${server.address().port}`;
const localChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || (existsSync(localChrome) ? localChrome : undefined), headless: true });
const routes = ['/', '/synlighet/', '/konvertering/', '/priser/', '/begreper/', '/vurdering/', '/kontakt/'];
const packages = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8')).homepage.packages.items;
const shells = '.need-card,.hero-proof,.hero-photo,.service-hero-visual,.info-item,.proof-card,.leverage-section,.leverage-result,.leverage-comparison,.scenario-chart,.package-card,.assessment-form,.package-order-form,.term-panel,.glossary-navigation a,.glossary-entry details,.glossary-example,.faq-list details,.pricing-multiplier,.closing-cta,.footer-grid,.package-badge,.preview-tag,input:not([type=range]):not([type=hidden]),select,textarea,.button';
const checks = [], errors = [], posts = [];
try {
  for (const width of [1440, 900, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (r.method() === 'POST') posts.push(r.url()); });
    for (const route of routes) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const snapshot = await page.evaluate(selector => {
        const style = e => {
          const s = getComputedStyle(e), r = e.getBoundingClientRect();
          return { selector: e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className : ''), background: s.backgroundColor, border: s.border, radius: s.borderRadius, shadow: s.boxShadow, padding: s.padding, gap: s.gap, outline: s.outline, outlineOffset: s.outlineOffset, width: r.width, height: r.height, x: r.x, y: r.y };
        };
        const nodes = [...document.querySelectorAll('main *, .site-header *, .site-footer *')];
        const fonts = nodes.filter(e => [...e.childNodes].some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())).map(e => {
          const s = getComputedStyle(e);
          return { text: [...e.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent).join('').replace(/\s+/g, ' ').trim(), family: s.fontFamily, size: s.fontSize, weight: s.fontWeight, lineHeight: s.lineHeight, tracking: s.letterSpacing, color: s.color };
        });
        const images = [...document.querySelectorAll('.hero-photo img,.service-hero-visual img')].map(e => {
          const s = getComputedStyle(e), r = e.getBoundingClientRect();
          return { src: e.getAttribute('src'), alt: e.getAttribute('alt'), fit: s.objectFit, position: s.objectPosition, width: r.width, height: r.height };
        });
        return { text: document.querySelector('main').textContent.replace(/\s+/g, ' ').trim(), fonts, images, sections: [...document.querySelector('main').children].flatMap(e => e.matches('section') ? [e.id] : [...e.children].filter(c => c.matches('section')).map(c => c.id)), shells: [...document.querySelectorAll(selector)].map(style), scrollWidth: document.documentElement.scrollWidth, viewport: innerWidth };
      }, shells);
      assert.ok(snapshot.scrollWidth <= width, `${route} ${width}: overflow`);
      if (phase !== 'before') {
        const before = JSON.parse(readFileSync('../coordination/evidence/h018/before/checks.json', 'utf8')).checks.find(c => c.route === route && c.width === width).snapshot;
        assert.equal(snapshot.text, before.text, `${route} ${width}: exact source text`);
        assert.deepEqual(snapshot.fonts, before.fonts, `${route} ${width}: typography exact`);
        assert.deepEqual(snapshot.images, before.images, `${route} ${width}: image/crop exact`);
        assert.deepEqual(snapshot.sections, before.sections, `${route} ${width}: section order exact`);
      }
      const name = route === '/' ? 'home' : route.replaceAll('/', '');
      await page.screenshot({ path: `${output}/${name}-${width}.png`, fullPage: true });
      await page.screenshot({ path: `${output}/${name}-top-${width}.png` });
      if (route === '/') for (const [name, selector] of Object.entries({ hero: '.home-hero', proof: '#resultater', calculator: '[data-leverage]', packages: '#priser', form: '#sjekk', footer: '.site-footer' })) {
        const locator = page.locator(selector);
        assert.equal(await locator.count(), 1, `${name}: required evidence target`);
        await locator.screenshot({ path: `${output}/${name}-${width}.png` });
      }
      const button = page.locator('.button:not(:disabled)').first();
      await button.focus();
      const focus = await button.evaluate(e => ({ outline: getComputedStyle(e).outline, offset: getComputedStyle(e).outlineOffset }));
      await button.hover();
      const hover = await button.evaluate(e => ({ background: getComputedStyle(e).backgroundColor, border: getComputedStyle(e).border }));
      const behavior = {};
      if (route === '/' || route === '/priser/') {
        const details = page.locator('.package-details');
        assert.equal(await details.count(), packages.length);
        assert.equal(await page.locator('.package-details[open]').count(), route === '/' ? 0 : packages.length);
        const summary = details.first().locator('summary');
        await summary.focus(); await page.keyboard.press('Enter');
        assert.equal(await details.first().getAttribute('open') !== null, route === '/');
        await page.keyboard.press('Enter');
        behavior.nativePackageDisclosure = true;
        assert.equal(await page.locator('.package-card.is-recommended').count(), packages.filter(p => p.recommended).length);
      }
      if (route === '/priser/') {
        const form = page.locator('[data-package-order]');
        assert.equal(await form.getAttribute('data-enabled'), 'false');
        assert.equal(await form.locator('[type=submit]').isDisabled(), true);
        for (const item of packages) {
          await page.goto(`${base}/priser/?pakke=${item.key}#bestill`);
          assert.equal(await page.locator('#order-package').inputValue(), item.key);
          assert.ok((await page.locator('#order-selection').textContent()).includes(item.title));
          assert.equal(await page.locator('#partner-order-note').isVisible(), item.key === 'partner');
        }
        await form.evaluate(e => { if (!(e instanceof HTMLFormElement)) throw new Error('Order form missing'); e.submit(); });
        assert.equal(await form.locator('[type=submit]').isDisabled(), true);
        behavior.packagePreselectionAndDisabledNativeSubmit = true;
      }
      if (route === '/begreper/') {
        await page.evaluate(() => document.querySelectorAll('.glossary-entry details').forEach(e => e.open = true));
        await page.locator('.glossary-entry').first().screenshot({ path: `${output}/glossary-row-expanded-${width}.png` });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      }
      checks.push({ route, width, snapshot, button: { focus, hover }, behavior });
    }
    await page.close();
  }
} finally { await browser.close(); if (server) await new Promise(resolve => server.close(resolve)); }
assert.equal(errors.length, 0); assert.equal(posts.length, 0);
writeFileSync(`${output}/checks.json`, JSON.stringify({ base, phase, checks, errors, posts }, null, 2));
console.log(`H-018 ${phase} PASS: ${checks.length} shell/page/width groups; exact text/type/image/crop/order, zero overflow/errors/POST.`);
