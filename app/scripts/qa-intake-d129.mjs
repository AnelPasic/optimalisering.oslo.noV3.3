import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { createAppServer } from '../server/http.mjs';
import { openLeadStore } from '../server/store.mjs';

const output = resolve('qa-output/d129'); mkdirSync(output, { recursive: true });
const store = openLeadStore(':memory:');
const server = createAppServer({ store, staticRoot: resolve('dist'), config: { enabled: false, ordersEnabled: false, origins: new Set(), email: {} } });
server.listen(0, '127.0.0.1'); await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const requests = [], errors = [], checks = [];
try {
  const context = await browser.newContext();
  await context.route('**/*', route => {
    const req = route.request(), url = new URL(req.url());
    if (url.origin !== base || !['GET', 'HEAD'].includes(req.method())) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  page.on('request', req => { if (req.method() === 'POST') requests.push({ method: req.method(), path: new URL(req.url()).pathname }); });
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, path, selector] of [['home', '/', '[data-home-assessment]'], ['seo', '/seo/', '[data-home-assessment]'], ['assessment', '/vurdering/', '[data-assessment]'], ['order', '/priser/?pakke=vekst#bestill', '[data-package-key="vekst"] [data-package-order-form]']]) {
      await page.goto(base + path);
      const form = page.locator(selector).first();
      assert.equal(await form.getAttribute('data-enabled'), 'false');
      await form.locator('[name=website]').fill('example.test');
      await form.locator('[name=email]').fill('synthetic@example.test');
      assert.equal(await form.locator('[name=phone]').getAttribute('required'), null);
      assert.equal(await form.locator('[type=submit]').isDisabled(), true);
      if (name === 'home') {
        assert.equal(await form.locator('[name=message]').count(), 0);
        const positions = await Promise.all(['website', 'email', 'phone'].map(field =>
          form.locator('[name=' + field + ']').evaluate(input => input.getBoundingClientRect().top)));
        if (width === 1440) assert.equal(new Set(positions).size, 1, 'desktop inputs share a row');
        else assert.ok(positions[0] < positions[1] && positions[1] < positions[2], 'mobile inputs stack');
      }
      if (name === 'order') {
        assert.equal(await form.locator('[name=company], [name=contact]').count(), 0);
        assert.equal(await form.locator('[type=submit]').isDisabled(), true);
        assert.equal(await page.locator('[data-package-key=vekst]').getAttribute('open'), '');
      }
      await form.evaluate(form => {
        if (!(form instanceof HTMLFormElement)) throw Error('Expected form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        form.submit();
      });
      assert.match(await form.locator('[role=status]').textContent(), /ikke åpnet|Ingen opplysninger/);
      assert.equal(requests.length, 0);
      const overflow = await page.evaluate(() => {
        if (document.documentElement.scrollWidth <= innerWidth) return null;
        return [...document.querySelectorAll('body *')].map(el => {
          const r = el.getBoundingClientRect();
          return { element: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 100),
            left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
        }).filter(x => x.right > innerWidth + 1 || x.left < -1).slice(0, 14);
      });
      assert.equal(overflow, null, `${name} ${width} overflow: ${JSON.stringify(overflow)}`);
      assert.match(await page.locator('meta[name=robots]').getAttribute('content'), /\bnoindex\b/, 'review build must not be indexed');
      await page.screenshot({ path: resolve(output, `${name}-${width}.png`), fullPage: true });
      checks.push(`${name} ${width}px: zero POST, disabled transport, native submit guarded, no overflow, preview noindex`);
    }
  }
  for (const [index, key, focus] of [[0, 'optimalisering', 'Synlighet'], [1, 'optimalisering', 'Konvertering'], [2, 'vekst', 'Synlighet og konvertering']]) {
    await page.goto(base + '/');
    const card = page.locator('[data-home-selector-card]').nth(index);
    await card.focus();
    await page.keyboard.press('Enter');
    const order = page.locator('[data-package-key="' + key + '"]');
    await order.locator('form').waitFor();
    assert.equal(await order.getAttribute('open'), '');
    assert.equal(await order.locator('[data-package-focus-summary]').textContent(), 'Valgt fokus: ' + focus);
    await order.locator('summary:focus').waitFor();
  }
  for (const key of ['optimalisering', 'vekst', 'partner']) {
    await page.goto(base + '/priser/?pakke=' + key + '#bestill');
    const order = page.locator('[data-package-key="' + key + '"]');
    await order.locator('form').waitFor();
    assert.equal(await order.getAttribute('open'), '');
    if (key === 'partner') assert.match(await order.locator('h4').first().textContent(), /Enterprise/);
  }
  checks.push('all three need links and package deep links select the matching order panel');
  const noJs = await browser.newPage({ javaScriptEnabled: false });
  try {
    for (const [path, selector] of [['/', '[data-home-assessment]'], ['/seo/', '[data-home-assessment]'], ['/vurdering/', '[data-assessment]'], ['/priser/?pakke=vekst#bestill', '[data-package-order-form]']]) {
      await noJs.goto(base + path);
      assert.equal(await noJs.locator(selector).first().locator('[type=submit]').isDisabled(), true);
    }
    checks.push('all four form paths have disabled no-JS submit buttons');
  } finally { await noJs.close(); }
  assert.equal(requests.length, 0); assert.deepEqual(errors, []);

  // Enable only the HTML served to this browser context. Intercept every POST locally.
  const synthetic = await browser.newContext();
  const acknowledgements = [];
  try {
    await synthetic.route('**/*', async route => {
      const req = route.request();
      if (new URL(req.url()).origin !== base) return route.abort();
      if (req.method() === 'POST' && new URL(req.url()).pathname === '/api/leads') {
        acknowledgements.push({ key: req.headers()['idempotency-key'], body: req.postDataJSON() });
        const accepted = acknowledgements.length % 2 === 0;
        return route.fulfill({ status: accepted ? 200 : 503, json: accepted ? { ok: true, id: 'synthetic-d1-id' } : { ok: false } });
      }
      if (!['GET', 'HEAD'].includes(req.method())) return route.abort();
      if (!req.isNavigationRequest()) return route.continue();
      const response = await route.fetch();
      const html = (await response.text())
        .replaceAll('data-enabled="false"', 'data-enabled="true"')
        .replace(/data-endpoint="[^"]*"/g, 'data-endpoint="/api/leads"');
      return route.fulfill({ response, body: html });
    });
    const active = await synthetic.newPage();
    for (const [path, selector, success] of [
      ['/', '[data-home-assessment]', 'Da er vi i gang!'],
      ['/priser/?pakke=vekst&fokus=synlighet-konvertering#bestill', '[data-package-key="vekst"] form', 'Bestillingsforespørselen er sendt!'],
    ]) {
      await active.goto(base + path);
      const form = active.locator(selector).first();
      const button = form.locator('[type=submit]');
      const status = form.locator('[role=status]');
      await form.locator('[name=website]').fill('example.test');
      await form.locator('[name=email]').fill('synthetic@example.test');
      await button.click();
      await status.filter({ hasText: 'Vi kunne ikke bekrefte innsendingen' }).waitFor();
      assert.equal(await form.locator('[name=email]').inputValue(), 'synthetic@example.test');
      await button.click();
      await status.filter({ hasText: success }).waitFor();
      const [failed, retried] = acknowledgements.slice(-2);
      assert.ok(failed.key);
      assert.deepEqual(failed, retried, 'retry retains the exact payload and idempotency key');
      assert.equal(retried.body.phone, undefined);
      if (path.startsWith('/priser/')) assert.equal(retried.body.focus, 'synlighet-konvertering');
      assert.equal(await form.locator('[name=email]').inputValue(), '');
    }
    assert.equal(acknowledgements.length, 4);
    checks.push('synthetic 503 and replay 200 verify fields, idempotency key, focus and ACK-only success in both forms');
  } finally { await synthetic.close(); }
  assert.deepEqual(store.counts(), { leads: 0, conversions: 0 });
  writeFileSync(resolve(output, 'browser.json'), JSON.stringify({ checks, postRequests: requests, pageErrors: errors, counts: store.counts(), scope: 'local preview only; no remote POST' }, null, 2));
  console.log(`${checks.length} checks passed; 0 outbound POST, 0 stored leads, 0 page errors.`);
} finally {
  await browser.close(); server.closeAllConnections(); await new Promise(done => server.close(done)); store.close();
}
