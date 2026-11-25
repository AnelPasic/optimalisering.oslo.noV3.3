import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { database } from './db.mjs';
import worker from '../src/worker.mjs';
import { collectTraffic, expireTraffic, trafficReport } from '../src/traffic.mjs';
import { renderTraffic } from '../src/traffic-dashboard.mjs';

const site = 'optimalisering.oslo.no', origin = 'https://' + site;
const endpoint = 'https://ingress.example.test/api/traffic';
const now = Date.parse('2026-11-26T11:00:00Z');
const visitor = '20000000-0000-4000-8000-000000000001';
const first = '20000000-0000-4000-8000-000000000002';
function setup() {
  const DB = database();
  DB.sqlite.exec(readFileSync(new URL('../migrations/0002_traffic_views.sql', import.meta.url), 'utf8'));
  DB.batch = statements => Promise.all(statements.map(s => s.all()));
  return { DB, SITE_ID: site, SITE_STAGE: 'production', TRAFFIC_ENABLED: 'true', INGRESS_ORIGIN: new URL(endpoint).origin,
    ALLOWED_ORIGINS: origin, RATE_LIMITER: { limit: async ({ key }) => {
      assert.match(key, /^traffic:/); return { success: true };
    } } };
}
function request(patch = {}, from = origin) {
  return new Request(endpoint, { method: 'POST', headers: { Origin: from, 'Content-Type': 'text/plain', 'CF-Connecting-IP': '192.0.2.1' },
    body: JSON.stringify({ view: first, visitor, page: '/priser/', channel: 'google_ads', campaign: '100', adGroup: '200', ad: '300',
      consent: true, activeMs: 0, elapsedMs: 20_000, scroll: 0, ...patch }) });
}

test('traffic requires consent, production enablement and the Oslo origin; report requires authorization', async () => {
  const env = setup();
  assert.equal((await collectTraffic(request({ consent: false }), env, now)).status, 422);
  assert.equal((await collectTraffic(request({}, 'https://external.example.test'), env, now)).status, 403);
  assert.equal((await collectTraffic(request(), { ...env, TRAFFIC_ENABLED: 'false' }, now)).status, 503);
  assert.equal((await collectTraffic(request({ page: '/priser/?email=private@example.test' }), env, now)).status, 422);
  assert.equal((await worker.fetch(new Request(env.INGRESS_ORIGIN + '/admin/traffic'), env, {})).status, 403);
  assert.equal(env.DB.sqlite.prepare('SELECT COUNT(*) n FROM traffic_views').get().n, 0);
});

test('traffic deduplicates views, attributes distinct visitors daily and reports active time under ad filters', async () => {
  const env = setup();
  for (const [delta, patch] of [
    [0, { activeMs: 12_000, scroll: 75 }], [15_000, {}], [16_000, { activeMs: 5_000, scroll: 25 }],
    [18_000, { view: '20000000-0000-4000-8000-000000000003', channel: 'organic', campaign: '', adGroup: '', ad: '' }],
    [19_000, { view: '20000000-0000-4000-8000-000000000004', visitor: '20000000-0000-4000-8000-000000000005', channel: 'meta_ads' }],
  ]) assert.equal((await collectTraffic(request(patch), env, now + delta)).status, 204);
  const result = await trafficReport(env.DB, site, new URLSearchParams(), now + 20_000);
  assert.equal(result.total.views, 3);
  assert.equal(result.total.visitors, 2);
  assert.deepEqual(result.series.map(r => [r.channel, r.visitors]), [['google_ads', 1], ['meta_ads', 1]]);
  const params = new URLSearchParams({ channel: 'google_ads', campaign: '100', ad_group: '200', ad: '300' });
  const filtered = await trafficReport(env.DB, site, params, now + 20_000);
  assert.equal(filtered.total.average_ms, 12_000);
  assert.equal(filtered.pages[0].average_scroll, 75);
  const dayShift = 86_400_000 * 91;
  assert.equal((await trafficReport(env.DB, site, params, now + dayShift)).total.views, 0);
  await expireTraffic(env, now + dayShift);
  assert.equal(env.DB.sqlite.prepare('SELECT COUNT(*) n FROM traffic_views').get().n, 0);
});

test('the report page exposes the protected navigation and all campaign filter levels', async () => {
  const env = setup();
  await collectTraffic(request({ campaign: 'sommer/2026' }), env);
  const response = await renderTraffic(env, new URLSearchParams());
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  const html = await response.text();
  assert.match(html, /<svg viewBox=/);
  assert.match(html, /name="ad_group"/);
  assert.match(html, /sommer\/2026/);
  assert.doesNotMatch(html, new RegExp(visitor));
});
