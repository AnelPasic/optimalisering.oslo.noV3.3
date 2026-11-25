import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const origin = 'https://optimalisering.oslo.no';
const endpoint = 'https://optimalisering-oslo-intake.anel.workers.dev/api/traffic';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 850 } });
    const received = [];
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.href === endpoint) {
        received.push(route.request().postDataJSON());
        return route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': origin } });
      }
      if (url.origin !== origin) return route.abort();
      const file = resolve('dist', url.pathname.slice(1), ...(url.pathname.endsWith('/') ? ['index.html'] : []));
      try { return await route.fulfill({ path: file, body: await readFile(file) }); }
      catch { return route.fulfill({ status: 404, body: '' }); }
    });
    const params = '?utm_source=google&utm_medium=cpc&utm_campaign=example&campaignid=100&adgroupid=200&creative=300';
    await page.goto(origin + '/' + params);
    const allow = page.getByRole('button', { name: 'Tillat statistikk' });
    const deny = page.getByRole('button', { name: 'Avslå statistikk' });
    const open = page.getByRole('button', { name: 'Innstillinger for besøksstatistikk' });
    await allow.waitFor();
    assert.equal(await page.evaluate(() => localStorage.getItem('medon-oslo-traffic-preference')), null);
    assert.equal(received.length, 0);
    const bounds = await allow.boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width);
    await deny.click();
    await page.reload();
    await open.waitFor();
    assert.equal(await allow.isVisible(), false);
    assert.equal(received.length, 0);
    await open.click();
    const firstRequest = page.waitForRequest(endpoint);
    await allow.click();
    await firstRequest;
    assert.deepEqual([received[0].channel, received[0].campaign, received[0].adGroup, received[0].ad], ['google_ads', '100', '200', '300']);
    const secondRequest = page.waitForRequest(r => r.url() === endpoint && r.postDataJSON().page === '/priser/');
    await page.goto(origin + '/priser/?utm_source=google&utm_medium=cpc&utm_campaign=example&source_page=%2F');
    await secondRequest;
    const next = received.find(row => row.page === '/priser/');
    assert.deepEqual([next.campaign, next.adGroup, next.ad, next.visitor], ['100', '200', '300', received[0].visitor]);
    await open.click();
    await deny.click();
    assert.equal(await page.evaluate(() => 'visitor' in JSON.parse(localStorage.getItem('medon-oslo-traffic-preference'))), false);
    const before = received.length;
    await page.reload();
    await open.waitFor();
    assert.equal(received.length, before);
    await page.close();
    console.log('Verified consent and campaign navigation at ' + width + 'px');
  }
} finally { await browser.close(); }
