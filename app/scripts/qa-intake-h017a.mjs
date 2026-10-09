import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { createAppServer } from '../server/http.mjs';
import { openLeadStore } from '../server/store.mjs';

const output = resolve('qa-output/h017a'); mkdirSync(output, { recursive: true });
const checks = []; const requests = []; const errors = []; const notifications = [];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const context = await browser.newContext(); const page = await context.newPage();
page.setDefaultTimeout(8000);
page.on('pageerror', error => errors.push(error.message));
page.on('request', req => requests.push({ method: req.method(), origin: new URL(req.url()).origin }));
const check = name => { checks.push(name); console.log('PASS ' + name); };
async function serverFor(root, enabled, run) {
  const store = openLeadStore(':memory:');
  const config = { enabled, ordersEnabled: enabled, site: 'optimalisering.oslo.no', sourceCapture: true, origins: new Set(), email: { apiKey: 'synthetic-not-a-key', from: 'sender@example.test', to: 'recipient@example.test', transport: async (_url, options) => { notifications.push(JSON.parse(options.body)); return new Response('{"id":"synthetic-email"}'); } } };
  const server = createAppServer({ store, config, staticRoot: resolve(root) });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`; config.origins.add(base);
  try { await run({ base, store, config }); }
  finally { server.closeAllConnections(); await new Promise(done => server.close(done)); store.close(); }
}
async function fillOrder() {
  for (const [name, value] of Object.entries({ company: 'Synthetic AS', website: 'example.test', contact: 'Synthetic Buyer', email: 'synthetic@example.test', phone: '', message: 'Synthetic only' })) await page.locator(`[data-package-order] [name="${name}"]`).fill(value);
}
async function submitProgrammatically(selector) {
  await page.locator(selector).evaluate(form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
}
async function review(base) {
  const before = requests.filter(r => r.method === 'POST').length;
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 950 });
    for (const key of ['optimalisering', 'vekst', 'partner']) {
      await page.goto(`${base}/priser/?pakke=${key}#bestill`);
      const form = page.locator('[data-package-order]');
      assert.equal(await form.getAttribute('data-enabled'), 'false');
      assert.equal(await form.locator('[type=submit]').isDisabled(), true);
      assert.equal(await form.locator('[name=package]').inputValue(), key);
      assert.match(await form.locator('#order-preview').textContent(), /Ingen opplysninger blir sendt/);
      await submitProgrammatically('[data-package-order]');
      assert.ok(!/mottatt|sendt bestilling/i.test(await form.innerText()));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      check(`review ${width}px ${key}: disabled, preselected, programmatic submit blocked`);
    }
  }
  await page.goto(base + '/');
  await page.locator('[data-home-assessment] [name=website]').fill('example.test');
  await page.locator('[data-home-assessment] [name=email]').fill('synthetic@example.test');
  await submitProgrammatically('[data-home-assessment]');
  assert.match(await page.locator('[data-home-assessment] [role=status]').textContent(), /Ingen opplysninger/);
  await page.goto(base + '/vurdering/');
  assert.equal(await page.locator('[data-assessment]').getAttribute('data-enabled'), 'false');
  await page.locator('[name=website]').fill('example.test'); await page.locator('[name=email]').fill('synthetic@example.test');
  await submitProgrammatically('[data-assessment]');
  assert.match(await page.locator('[role=status]').textContent(), /Ingen opplysninger er sendt/);
  assert.equal(requests.filter(r => r.method === 'POST').length, before);
  // Ordinary form.submit() bypasses submit listeners unless routed through
  // the validation/event path. Block network defensively while testing it.
  await page.goto(base + '/priser/?pakke=vekst#bestill'); await fillOrder();
  await page.route('**/api/leads', route => route.abort());
  await page.locator('[data-package-order]').evaluate(form => form.submit());
  await page.waitForTimeout(150);
  assert.equal(requests.filter(r => r.method === 'POST').length, before, 'Native programmatic order submit must send zero POST');
  await page.unroute('**/api/leads');
  const noJs = await browser.newPage({ javaScriptEnabled: false });
  try { await noJs.goto(base + '/priser/'); assert.equal(await noJs.locator('[data-package-order] [type=submit]').isDisabled(), true); } finally { await noJs.close(); }
  check('review: both assessment locations + order send zero POST, no false success, no-JS disabled');
}
function buildFixture(name, publicLeads, publicOrders, endpoint = '/api/leads') {
  const root = resolve('qa-output', name);
  const built = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', root], { env: { ...process.env, SITE_STAGE: 'preview', PUBLIC_LEADS_ENABLED: publicLeads, PUBLIC_ORDERS_ENABLED: publicOrders, PUBLIC_LEAD_ENDPOINT: endpoint, PRIVACY_APPROVED: 'false', ORDERS_ENABLED: 'false', ORDERS_DEPLOYMENT_APPROVED: 'false', RESEND_API_KEY: '', RESEND_FROM: '', LEAD_TO_EMAIL: '' }, encoding: 'utf8', timeout: 60000 });
  writeFileSync(resolve(output, name + '-build.log'), built.stdout + built.stderr);
  assert.equal(built.status, 0, built.stderr); return root;
}
try {
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    const allowed = url.hostname === '127.0.0.1' || (process.env.QA_BASE_URL && url.origin === new URL(process.env.QA_BASE_URL).origin && route.request().method() === 'GET');
    if (!allowed) { errors.push('Blocked unexpected network origin'); return route.abort(); }
    return route.continue();
  });
  if (!process.argv.includes('--enabled-only')) {
    if (process.env.QA_BASE_URL) await review(process.env.QA_BASE_URL);
    else await serverFor('dist', false, async ({ base, store }) => { await review(base); assert.deepEqual(store.counts(), { leads: 0, conversions: 0 }); });
  }
  if (!process.argv.includes('--review-only')) {
    const root = buildFixture('h017a-orders-enabled', 'false', 'true');
    await serverFor(root, true, async ({ base, store, config }) => {
      const status = page.locator('[data-order-status]'); const button = page.locator('[data-package-order] [type=submit]');
      for (const key of ['optimalisering', 'vekst', 'partner']) {
        await page.goto(`${base}/priser/?pakke=${key}&utm_source=synthetic&utm_medium=test&utm_campaign=h017a&utm_content=order&source_page=/synlighet/&source_referrer=https://search.example.test/private#bestill`);
        assert.equal(await button.isDisabled(), false, 'Dedicated public gate must connect the existing transport');
        assert.equal(await page.locator('[data-package-order] [name=package]').inputValue(), key);
        await fillOrder();
        await button.click();
        await status.filter({ hasText: 'Forespørselen er mottatt' }).waitFor();
        const stored = store.export().at(-1);
        assert.equal(stored.payload.intent, 'order'); assert.equal(stored.payload.package, key);
        assert.deepEqual(stored.payload.source, { page: '/priser/', landing_page: '/synlighet/', referrer: 'https://search.example.test', utm_source: 'synthetic', utm_medium: 'test', utm_campaign: 'h017a', utm_content: 'order' });
        assert.ok(!page.url().includes('synthetic@example.test'));
        check(`enabled ${key}: durable accept, explicit intent, normalized attribution, no PII in URL`);
      }
      assert.deepEqual(store.counts(), { leads: 3, conversions: 3 });
      await page.goto(base + '/priser/?pakke=unknown#bestill'); await fillOrder();
      let before = requests.filter(r => r.method === 'POST').length;
      await submitProgrammatically('[data-package-order]'); assert.equal(requests.filter(r => r.method === 'POST').length, before);
      await page.locator('[name=package]').selectOption('vekst');
      await page.locator('[data-package-order] [name=website]').fill('not a website'); await button.click();
      assert.equal(await page.locator('#order-website').getAttribute('aria-invalid'), 'true');
      assert.equal(requests.filter(r => r.method === 'POST').length, before);
      await fillOrder(); await page.locator('[data-package-order] [name=company]').fill('');
      await submitProgrammatically('[data-package-order]'); assert.equal(requests.filter(r => r.method === 'POST').length, before);
      await fillOrder();
      await page.locator('[data-package-order] [name=website_confirmation]').evaluate(input => input.value = 'bot');
      await submitProgrammatically('[data-package-order]'); assert.equal(requests.filter(r => r.method === 'POST').length, before);
      await page.locator('[data-package-order] [name=website_confirmation]').evaluate(input => input.value = '');
      check('invalid package/website/required field and honeypot never reach transport');

      config.ordersEnabled = false;
      await button.click(); await status.filter({ hasText: 'Vi kunne ikke bekrefte' }).waitFor();
      assert.equal(await page.locator('[name=company]').inputValue(), 'Synthetic AS'); assert.deepEqual(store.counts(), { leads: 3, conversions: 3 });
      config.ordersEnabled = true;
      const keys = []; let release; const delayed = new Promise(done => release = done);
      let intercepted; const arrived = new Promise(done => intercepted = done);
      await page.route('**/api/leads', async route => {
        keys.push(route.request().headers()['idempotency-key']);
        const response = await route.fetch();
        if (keys.length === 1) { intercepted(); await delayed; await route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' }); }
        else await route.fulfill({ response });
      });
      await button.click(); await arrived;
      assert.deepEqual(store.counts(), { leads: 4, conversions: 4 });
      assert.equal(await button.isDisabled(), true); assert.equal(await button.getAttribute('aria-busy'), 'true');
      assert.ok(!/mottatt/.test(await status.textContent()));
      await submitProgrammatically('[data-package-order]'); assert.equal(keys.length, 1);
      release(); await status.filter({ hasText: 'Vi kunne ikke bekrefte' }).waitFor();
      await button.click(); await status.filter({ hasText: 'Forespørselen er mottatt' }).waitFor();
      assert.equal(keys.length, 2); assert.equal(keys[0], keys[1]); assert.deepEqual(store.counts(), { leads: 4, conversions: 4 });
      check('backend mismatch, double-submit and lost acknowledgement: stable retry stores once; success waits for durable acknowledgement');
      await page.unroute('**/api/leads');
      assert.ok(notifications.every(mail => mail.subject.startsWith('Bestilling')));
      assert.equal(notifications.length, 4);
    });
    const assessmentRoot = buildFixture('h017a-assessment-only', 'true', 'false');
    await serverFor(assessmentRoot, true, async ({ base }) => {
      await page.goto(base + '/priser/?pakke=vekst#bestill'); assert.equal(await page.locator('[data-package-order] [type=submit]').isDisabled(), true);
      const before = requests.filter(r => r.method === 'POST').length; await submitProgrammatically('[data-package-order]'); assert.equal(requests.filter(r => r.method === 'POST').length, before);
      check('PUBLIC_LEADS_ENABLED alone never enables order');
    });
    const missingEndpointRoot = buildFixture('h017a-missing-endpoint', 'false', 'true', '');
    await serverFor(missingEndpointRoot, true, async ({ base }) => {
      await page.goto(base + '/priser/?pakke=partner#bestill');
      assert.equal(await page.locator('[data-package-order] [type=submit]').isDisabled(), true);
      const before = requests.filter(r => r.method === 'POST').length; await submitProgrammatically('[data-package-order]'); assert.equal(requests.filter(r => r.method === 'POST').length, before);
      check('public order flag with missing endpoint remains disabled and sends zero POST');
    });
  }
  assert.deepEqual(errors, []);
  const result = { checks, requests, errors, syntheticEmails: notifications.length, realEmails: 0, realLeads: 0, storage: 'in-memory only', reviewOnly: process.argv.includes('--review-only') };
  writeFileSync(resolve(output, process.argv.includes('--review-only') ? 'review-browser.json' : 'intake-browser.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(`H-017A browser PASS: ${checks.length} checks, ${notifications.length} synthetic notifications, zero real leads/emails.`);
} finally { await browser.close(); }
