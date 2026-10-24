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
      if (name === 'order') {
        await form.locator('[name=phone]').fill('90000000');
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
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name} ${width} overflow`);
      assert.match(await page.locator('meta[name=robots]').getAttribute('content'), /noindex/);
      await page.screenshot({ path: resolve(output, `${name}-${width}.png`), fullPage: true });
      checks.push(`${name} ${width}px: zero POST, disabled transport, native submit guarded, no overflow, noindex`);
    }
  }
  const noJs = await browser.newPage({ javaScriptEnabled: false });
  try {
    for (const [path, selector] of [['/', '[data-home-assessment]'], ['/seo/', '[data-home-assessment]'], ['/vurdering/', '[data-assessment]'], ['/priser/?pakke=vekst#bestill', '[data-package-order-form]']]) {
      await noJs.goto(base + path);
      assert.equal(await noJs.locator(selector).first().locator('[type=submit]').isDisabled(), true);
    }
    checks.push('all four form paths have disabled no-JS submit buttons');
  } finally { await noJs.close(); }
  assert.equal(requests.length, 0); assert.deepEqual(errors, []);
  assert.deepEqual(store.counts(), { leads: 0, conversions: 0 });
  writeFileSync(resolve(output, 'browser.json'), JSON.stringify({ checks, postRequests: requests, pageErrors: errors, counts: store.counts(), scope: 'local preview only; no remote POST' }, null, 2));
  console.log(`${checks.length} checks passed; 0 POST, 0 stored leads, 0 page errors.`);
} finally {
  await browser.close(); server.closeAllConnections(); await new Promise(done => server.close(done)); store.close();
}
