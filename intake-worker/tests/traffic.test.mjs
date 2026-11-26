import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { database } from './db.mjs';
import siteWorker from '../../app/worker.mjs';
import intake from '../src/worker.mjs';
import { acceptHit, expireTraffic, trafficReport } from '../src/traffic.mjs';
import { renderTraffic } from '../src/traffic-dashboard.mjs';
import { siteOrigin, trafficServiceUrl } from '../../app/traffic-source.mjs';

const site = new URL(siteOrigin).hostname;
const ingress = 'https://ingress.example.test';
const now = Date.parse('2026-11-26T11:00:00Z');
const tagged = '/priser/?utm_source=google&utm_medium=cpc&utm_campaign=sommer&adgroupid=200&creative=300&gclid=opaque-click-token&email=test%40example.test';

function setup() {
  const DB = database();
  DB.sqlite.exec(readFileSync(new URL('../migrations/0002_html_hits.sql', import.meta.url), 'utf8'));
  DB.batch = statements => Promise.all(statements.map(s => s.all()));
  return { DB, SITE_ID: site, SITE_STAGE: 'production', HITCOUNT_ENABLED: 'true', INGRESS_ORIGIN: ingress, ALLOWED_ORIGINS: siteOrigin };
}

function hit(fields = {}) {
  return new Request(trafficServiceUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    page: '/priser/', channel: 'paid_search', source: 'google', medium: 'cpc', campaign: 'sommer', adGroup: '200', ad: '300', ...fields,
  }) });
}

test('the website counts HTML regardless of consent with only aggregate dimensions on the service binding', async () => {
  const env = setup();
  const forwarded = [];
  const jobs = [];
  const website = {
    ASSETS: { fetch: async () => new Response('page', { headers: { 'Content-Type': 'text/html; charset=utf-8' } }) },
    HITCOUNTER: { async fetch(url, init) {
      assert.equal(url, trafficServiceUrl);
      assert.deepEqual(Object.keys(init.headers), ['Content-Type']);
      forwarded.push(JSON.parse(init.body));
      return intake.fetch(new Request(url, init), env, {});
    } },
  };
  for (const cookie of ['', 'attribution_permission=denied']) {
    const request = new Request(siteOrigin + tagged, { headers: { Cookie: cookie, 'Sec-GPC': '1', Referer: 'https://example.test/private?user=test' } });
    const response = await siteWorker.fetch(request, website, { waitUntil: job => jobs.push(job) });
    assert.equal(await response.text(), 'page');
    assert.equal(response.headers.get('Set-Cookie'), null);
  }
  await Promise.all(jobs);
  assert.deepEqual(forwarded, Array(2).fill({ page: '/priser/', channel: 'paid_search', source: 'google', medium: 'cpc', campaign: 'sommer', adGroup: '200', ad: '300' }));
  assert.equal(env.DB.sqlite.prepare('SELECT hits FROM html_hits').get().hits, 2);
});

test('non-pages, robots, previews and redirects do not count; service failure preserves the page', async t => {
  const logged = t.mock.method(console, 'error', () => {});
  const routes = [
    { path: '/priser/', method: 'HEAD' }, { path: '/images/logo.svg' }, { path: '/admin/' },
    { path: '/design-system/' }, { path: '/takk/' }, { path: '/api/example' },
    { path: '/', headers: { 'User-Agent': 'Crawler' } }, { path: '/', headers: { 'Sec-Purpose': 'prefetch' } },
    { path: '/', status: 404 }, { path: '/', type: 'text/plain' },
    { path: '/', origin: 'https://preview.example.test' }, { path: '/', origin: 'https://optimalisering-oslo-v33.anel.workers.dev' },
  ];
  for (const { path, method, headers, type, status, origin } of routes) {
    const request = new Request((origin || siteOrigin) + path, { method, headers });
    await siteWorker.fetch(request, {
      ASSETS: { fetch: () => new Response(null, { status: status || 200, headers: { 'Content-Type': type || 'text/html' } }) },
      HITCOUNTER: { fetch: () => assert.fail('ineligible request counted') },
    }, { waitUntil: () => assert.fail('ineligible background job') });
  }
  const pending = [];
  const response = await siteWorker.fetch(new Request(siteOrigin + '/'), {
    ASSETS: { fetch: () => new Response('ok', { headers: { 'Content-Type': 'text/html' } }) },
    HITCOUNTER: { fetch: () => Promise.reject(new Error('unavailable')) },
  }, { waitUntil: job => pending.push(job) });
  assert.equal(await response.text(), 'ok');
  await Promise.all(pending);
  assert.equal(logged.mock.calls.length, 1);
});

test('public HTTP cannot write hits or read reports; rejected traffic never enters D1', async () => {
  const env = setup();
  assert.equal((await intake.fetch(new Request(ingress + '/count', { method: 'POST', headers: { Origin: 'https://oslo-traffic.internal' } }), env, {})).status, 404);
  assert.equal((await intake.fetch(new Request(ingress + '/api/traffic', { method: 'POST' }), env, {})).status, 404);
  assert.equal((await intake.fetch(new Request(ingress + '/admin/traffic'), env, {})).status, 403);
  assert.equal((await acceptHit(hit(), { ...env, HITCOUNT_ENABLED: 'false' }, now)).status, 503);
  assert.equal((await acceptHit(hit({ page: '/priser/?private=123' }), env, now)).status, 422);
  assert.equal((await acceptHit(hit({ source: 'private@example.test' }), env, now)).status, 422);
  assert.equal(env.DB.sqlite.prepare('SELECT COUNT(*) n FROM html_hits').get().n, 0);
});

test('report groups channels by week, uses Oslo dates, filters ads and expires aggregates', async () => {
  const env = setup();
  await acceptHit(hit(), env, now);
  await acceptHit(hit(), env, now);
  await acceptHit(hit({ channel: 'unknown', source: '', medium: '', campaign: '', adGroup: '', ad: '' }), env, now);
  const result = await trafficReport(env.DB, site, new URLSearchParams(), now);
  assert.equal(result.total.hits, 3);
  assert.deepEqual(result.series.map(r => [r.week, r.channel, r.hits]), [['2026-11-23', 'paid_search', 2], ['2026-11-23', 'unknown', 1]]);
  const params = new URLSearchParams({ channel: 'paid_search', campaign: 'sommer', ad_group: '200', ad: '300' });
  assert.equal((await trafficReport(env.DB, site, params, now)).total.hits, 2);
  assert.equal((await trafficReport(env.DB, 'other.example.test', params, now)).total.hits, 0);

  const response = await renderTraffic(env, new URLSearchParams());
  const html = await response.text();
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.match(html, /<svg viewBox=/);
  assert.match(html, /Sidevisninger per kanal/);
  assert.doesNotMatch(html, /Aktiv tid|Rulledybde|Unike besøkende/);

  await expireTraffic(env, now + 91 * 86400000);
  assert.equal(env.DB.sqlite.prepare('SELECT COUNT(*) n FROM html_hits').get().n, 0);
});

test('capping the number of new daily rows preserves repeated dimensions and total hits', async () => {
  const env = setup();
  const insert = env.DB.sqlite.prepare("INSERT INTO html_hits VALUES (?, '2026-11-26', '/priser/', 'paid_search', 'google', 'cpc', ?, '200', '300', 1)");
  for (let i = 0; i < 1000; i++) insert.run(site, 'kampanje-' + i);
  await acceptHit(hit({ campaign: 'kampanje-0' }), env, now);
  await acceptHit(hit({ campaign: 'overflow' }), env, now);
  const aggregate = env.DB.sqlite.prepare("SELECT COUNT(*) rows, SUM(hits) hits FROM html_hits").get();
  assert.deepEqual({ ...aggregate }, { rows: 1001, hits: 1002 });
  assert.equal(env.DB.sqlite.prepare("SELECT hits FROM html_hits WHERE campaign='kampanje-0'").get().hits, 2);
  assert.equal(env.DB.sqlite.prepare("SELECT hits FROM html_hits WHERE page='/other/'").get().hits, 1);
});
