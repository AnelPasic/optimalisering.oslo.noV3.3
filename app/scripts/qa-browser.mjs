import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { openLeadStore } from '../server/store.mjs';
import { createAppServer } from '../server/http.mjs';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve('qa-output');
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
page.setDefaultTimeout(10000);
page.setDefaultNavigationTimeout(15000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const routes = readdirSync('src/content/pages').filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(resolve('src/content/pages', f), 'utf8')).slug).map(slug => slug === 'home' ? '/' : `/${slug}/`);
let checks = 0;
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of routes) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length }));
      assert.equal(layout.h1, 1);
      assert.ok(layout.scroll <= layout.width, `${width}px ${route}: horizontal overflow ${layout.scroll}`);
      checks++;
    }
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: resolve(output, width === 1440 ? 'desktop.png' : 'mobile.png') });
    await page.screenshot({ path: resolve(output, width === 1440 ? 'desktop-full.png' : 'mobile-full.png'), fullPage: true });
  }
  console.log('Desktop/mobile route and screenshot checks passed.');
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto(base);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '320px homepage');
  await page.getByRole('button', { name: 'Åpne meny' }).click();
  await page.locator('#mobile-menu').getByRole('link', { name: 'Synlighet' }).click();
  assert.ok(page.url().includes('/synlighet/'));
  checks += 2;
  await page.goto(`${base}/vurdering/`);
  await page.locator('[name=website]').fill('example.test');
  await page.locator('[name=email]').fill('synthetic@example.test');
  await page.locator('[type=submit]').click();
  await page.getByRole('status').filter({ hasText: 'Ingen opplysninger er sendt' }).waitFor();
  await page.locator('[name=website]').fill('not a url');
  await page.locator('[type=submit]').click();
  assert.equal(await page.locator('[name=website]').getAttribute('aria-invalid'), 'true');
  checks += 2;
  await page.goto(base);
  await page.locator('[name=conversion]').fill('2');
  assert.equal(await page.locator('.leverage-result output').textContent(), '20');
  assert.equal(await page.locator('[data-double]').textContent(), '40');
  checks++;
  console.log('Menu, calculator and preview form checks passed.');
  await page.getByRole('link', { name: 'Hopp til innhold' }).focus();
  assert.ok(await page.getByRole('link', { name: 'Hopp til innhold' }).isVisible());
  checks++;

  // Synthetic end-to-end browser submission against a separate in-memory server.
  const store = openLeadStore(':memory:');
  const config = { enabled: true, origins: new Set(), site: 'optimalisering.oslo.no', sourceCapture: true, email: { apiKey: 'synthetic', from: 'sender@example.test', to: 'recipient@example.test', transport: async () => new Response('{"id":"synthetic-email"}') } };
  const synthetic = createAppServer({ store, config, staticRoot: resolve('dist') });
  synthetic.listen(0, '127.0.0.1');
  await once(synthetic, 'listening');
  const syntheticBase = `http://127.0.0.1:${synthetic.address().port}`;
  config.origins.add(syntheticBase);
  try {
    await page.goto(`${syntheticBase}/seo/?utm_source=synthetic&utm_campaign=browser-qa`);
    await page.getByRole('link', { name: 'Gratis sjekk', exact: true }).first().click();
    await page.locator('[data-assessment]').evaluate(form => form.dataset.enabled = 'true');
    await page.locator('[name=website]').fill('example.test');
    await page.locator('[name=email]').fill('synthetic@example.test');
    await page.locator('[name=message]').fill('Synthetic browser QA only');
    await page.locator('[type=submit]').click();
    await page.getByRole('status').filter({ hasText: 'Forespørselen er mottatt' }).waitFor();
    assert.deepEqual(store.counts(), { leads: 1, conversions: 1 });
    assert.equal(store.export()[0].payload.source.utm_source, 'synthetic');
    assert.equal(store.export()[0].payload.source.landing_page, '/seo/');
    checks++;
    await page.route('**/api/leads', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' }));
    await page.locator('[name=website]').fill('example.test');
    await page.locator('[name=email]').fill('synthetic@example.test');
    await page.locator('[name=message]').fill('Must remain after error');
    await page.locator('[type=submit]').click();
    await page.getByRole('status').filter({ hasText: 'Vi kunne ikke bekrefte' }).waitFor();
    assert.equal(await page.locator('[name=message]').inputValue(), 'Must remain after error');
    assert.equal(await page.locator('[type=submit]').isDisabled(), false);
    checks++;
  } finally { synthetic.closeAllConnections(); await new Promise(done => synthetic.close(done)); store.close(); }
  assert.deepEqual(errors, [], 'browser JavaScript errors');
  const result = { checks, widths: [1440, 390, 320], routes: routes.length, errors, liveEmailsSent: 0, syntheticOnly: true };
  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.goto(`${base}/vurdering/`);
  assert.equal(await noScript.locator('form').getAttribute('method'), 'post', 'no JavaScript must not leak form data into URL');
  assert.equal(await noScript.locator('[type=submit]').isDisabled(), true, 'submission disabled before JavaScript attaches');
  await noScript.close();
  result.checks += 2;
  writeFileSync(resolve(output, 'browser-results.json'), JSON.stringify(result, null, 2));
  console.log(`Browser QA passed: ${result.checks} checks; ${routes.length} pages; desktop, mobile, menu, calculator, validation, synthetic persistence, no-JavaScript privacy and error recovery. No live emails.`);
} finally { await browser.close(); }
