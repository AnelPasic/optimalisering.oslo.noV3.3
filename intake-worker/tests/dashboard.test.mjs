import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const require = createRequire(new URL('../../app/package.json', import.meta.url));
const { Miniflare, convertV4MiniflareOptions } = require('miniflare');
const { build } = require('esbuild');

test('shared dashboard reads pilot D1 with Access, site isolation and unchanged legacy API', { timeout: 60000 }, async () => {
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/worker.mjs', import.meta.url))],
    bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022' });
  const keys = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
  const jwk = { ...await crypto.subtle.exportKey('jwk', keys.publicKey), kid: 'synthetic', alg: 'RS256', use: 'sig' };
  const origin = 'https://intake.example.test';
  const bindings = { SITE_ID: 'optimalisering.oslo.no', INGRESS_ORIGIN: origin, ALLOWED_ORIGINS: 'https://optimalisering.oslo.no',
    ACCESS_ISSUER: 'https://synthetic.cloudflareaccess.com', ACCESS_AUD: 'synthetic-audience',
    ADMIN_GRANTS_JSON: JSON.stringify({ 'operator@example.test': [{ site: 'optimalisering.oslo.no', permissions: ['read'] }] }) };
  const seconds = Math.floor(Date.now() / 1000), encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  async function sign(email = 'operator@example.test') {
    const unsigned = encode({ alg: 'RS256', kid: 'synthetic' }) + '.' + encode({ iss: bindings.ACCESS_ISSUER,
      aud: [bindings.ACCESS_AUD], sub: 'synthetic-user', email, iat: seconds, exp: seconds + 3600 });
    return unsigned + '.' + Buffer.from(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', keys.privateKey,
      new TextEncoder().encode(unsigned))).toString('base64url');
  }
  const auth = { 'Cf-Access-Jwt-Assertion': await sign() };
  const mf = new Miniflare(convertV4MiniflareOptions({ cf: false, modules: true, script: bundle.outputFiles[0].text,
    compatibilityDate: '2026-10-06', d1Databases: ['DB'], bindings,
    outboundService: async request => {
      assert.equal(request.url, bindings.ACCESS_ISSUER + '/cdn-cgi/access/certs');
      return Response.json({ keys: [jwk] });
    } }));
  const fetch = (path, options = {}) => mf.dispatchFetch(origin + path, { headers: auth, ...options });
  try {
    const db = await mf.getD1Database('DB');
    const migration = await readFile(new URL('../migrations/0001_receipts.sql', import.meta.url), 'utf8');
    for (const sql of migration.split(';').map(s => s.trim()).filter(Boolean)) await db.prepare(sql).run();
    const id = crypto.randomUUID(), now = Date.now() - 100;
    await db.prepare(`INSERT INTO receipts (id,site_id,origin,idempotency_key,intent,payload_json,created_at_ms,due_at_ms)
      VALUES (?,?,?,?,?,?,?,?)`).bind(id, bindings.SITE_ID, 'https://optimalisering.oslo.no', 'synthetic-dashboard-key',
      'pakke-bestilling', JSON.stringify({ email: 'synthetic@example.test', package: 'vekst', source: { utm_source: 'google' } }), now, now).run();
    const before = await db.prepare('SELECT * FROM receipts').all();
    for (const path of ['/admin/', '/admin/style.css', '/admin/report', '/admin/dashboard/receipts', '/admin/dashboard/export?format=csv']) {
      assert.equal((await fetch(path, { headers: {} })).status, 403);
      assert.equal((await fetch(path, { headers: { 'Cf-Access-Jwt-Assertion': 'forged' } })).status, 403);
    }
    assert.equal((await fetch('/admin/', { headers: { 'Cf-Access-Jwt-Assertion': await sign('outsider@example.test') } })).status, 403);
    const dashboard = await fetch('/admin/');
    assert.equal(dashboard.status, 200);
    assert.equal(dashboard.headers.get('Cache-Control'), 'no-store');
    assert.ok(dashboard.headers.get('Content-Security-Policy').includes("frame-ancestors 'none'"));
    const html = await dashboard.text();
    assert.ok(html.includes('synthetic@example.test'));
    assert.ok(html.includes('OpenAIAds.no · Ikke tilkoblet'));
    assert.ok(html.includes('/admin/dashboard/export?'));
    assert.equal((await fetch('/admin/style.css')).status, 200);
    const data = await (await fetch('/admin/report')).json();
    assert.equal(data.current.leads, 1);
    assert.equal(data.current.hits, null);
    const unconnected = await (await fetch('/admin/report?site=openaiads-no')).json();
    assert.equal(unconnected.current.leads, null);
    assert.equal((await fetch('/admin/report?site=external-customer')).status, 403);
    assert.equal((await fetch('/admin/', { method: 'POST', headers: auth })).status, 405);
    assert.equal((await (await fetch('/admin/receipts')).json()).receipts[0].id, id);
    assert.equal((await fetch('/admin/export?format=csv')).status, 200);
    assert.equal((await fetch('/admin/dashboard/export?format=csv')).status, 200);
    assert.deepEqual((await db.prepare('SELECT * FROM receipts').all()).results, before.results);
    if (process.env.DASHBOARD_BROWSER_CHECK === 'true') {
      const { chromium } = require('@playwright/test');
      const browser = await chromium.launch({ channel: 'chrome', headless: true });
      try {
        const page = await browser.newPage();
        await page.route('**/*', async route => {
          const requested = new URL(route.request().url());
          const response = await fetch(requested.pathname + requested.search);
          await route.fulfill({ status: response.status, headers: Object.fromEntries(response.headers), body: Buffer.from(await response.arrayBuffer()) });
        });
        for (const width of [1440, 390]) {
          await page.setViewportSize({ width, height: 950 });
          await page.goto(origin + '/admin/');
          await page.getByRole('heading', { name: 'Henvendelser og sidevisninger' }).waitFor();
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
          await page.locator('select[name=site]').selectOption('openaiads-no');
          await page.getByRole('button', { name: 'Vis utvalg' }).click();
          await page.getByText('Valgte nettsteder er ikke tilkoblet datainnsamlingen.').waitFor();
          assert.equal(await page.getByText('synthetic@example.test', { exact: true }).count(), 0);
          console.log('Dashboard browser verified at ' + width + 'px');
        }
      } finally { await browser.close(); }
    }
  } finally { await mf.dispose(); }
});
