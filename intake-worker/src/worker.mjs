import { configuration, HttpError, json, readJson, validate } from './domain.mjs';
import { saveReceipt, readReceipts, csv } from './store.mjs';
import { authorize } from './access.mjs';
import { notifyOne, retryDue } from './notify.mjs';
import { dashboard } from './dashboard.mjs';
import { acceptHit, expireTraffic, trafficEnabled } from './traffic.mjs';
import { renderTraffic } from './traffic-dashboard.mjs';
import { trafficServiceUrl } from '../../app/traffic-source.mjs';

async function admin(request, env, url) {
  if (['/admin/', '/admin/style.css', '/admin/report', '/admin/dashboard/receipts', '/admin/dashboard/export'].includes(url.pathname)) {
    const response = await dashboard(request, env);
    if (!response.ok || url.pathname !== '/admin/' || !trafficEnabled(env)) return response;
    const html = (await response.text()).replace('Trafikkmåling er ikke aktivert.',
      '<a class="btn btn-outline" href="/admin/traffic">Se trafikkmålingen for Optimalisering Oslo</a>');
    return new Response(html, { headers: response.headers });
  }
  const retry = url.pathname === '/admin/retry';
  if (!await authorize(request, env, retry ? 'retry' : 'read')) return json({ ok: false }, 403);
  if ((retry && request.method !== 'POST') || (!retry && request.method !== 'GET')) return json({ ok: false }, 405);
  if (url.searchParams.has('site') && url.searchParams.get('site') !== env.SITE_ID) return json({ ok: false }, 403);
  if (url.pathname === '/admin/traffic') {
    if (!trafficEnabled(env)) return json({ ok: false }, 404);
    if ([...url.searchParams.values()].some(value => value.length > 100)) return json({ ok: false }, 422);
    return renderTraffic(env, url.searchParams);
  }
  if (retry) {
    if (request.headers.has('Origin') && request.headers.get('Origin') !== url.origin) return json({ ok: false }, 403);
    await retryDue(env); return json({ ok: true });
  }
  if (!['/admin/receipts', '/admin/export'].includes(url.pathname)) return json({ ok: false }, 404);
  const after = url.searchParams.get('after') ?? '';
  if (after && !/^[a-f0-9-]{36}$/.test(after)) return json({ ok: false }, 422);
  const page = await readReceipts(env.DB, env.SITE_ID, after);
  if (url.pathname === '/admin/export' && url.searchParams.get('format') === 'csv') {
    return new Response(csv(page.receipts), { headers: {
      'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="receipts.csv"',
      'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow',
      ...(page.next ? { 'X-Next-Cursor': page.next } : {}),
    } });
  }
  return json(page);
}

export default {
  async fetch(request, env, ctx) {
    let cors = {};
    try {
      const url = new URL(request.url);
      // This synthetic origin has no public route. The website Worker reaches
      // it through the account-local service binding with fresh headers.
      if (url.href === trafficServiceUrl) return await acceptHit(request, env);
      const config = configuration(env);
      if (url.origin !== config.ingress) return json({ ok: false }, 403);
      if (url.pathname.startsWith('/admin/')) return await admin(request, env, url);
      if (url.pathname !== '/api/leads') return json({ ok: false }, 404);
      const origin = request.headers.get('Origin');
      if (!origin || !config.origins.has(origin)) return json({ ok: false }, 403);
      cors = { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' };
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: {
        ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key', 'Cache-Control': 'no-store',
      } });
      if (request.method !== 'POST') return json({ ok: false }, 405, { ...cors, Allow: 'POST, OPTIONS' });
      if (!env.DB || !env.RATE_LIMITER || env.SITE_STAGE !== 'production' || env.PRIVACY_APPROVED !== 'true' || env.PUBLIC_LEADS_ENABLED !== 'true') return json({ ok: false, error: 'disabled' }, 503, cors);
      const ip = request.headers.get('CF-Connecting-IP');
      if (!ip) return json({ ok: false }, 403, cors);
      if (!(await env.RATE_LIMITER.limit({ key: config.site + ':' + ip })).success) return json({ ok: false }, 429, { ...cors, 'Retry-After': '60' });
      if (!/^application\/json(?:;|$)/i.test(request.headers.get('Content-Type') ?? '')) throw new HttpError(415, 'content-type');
      const key = request.headers.get('Idempotency-Key');
      if (!key || !/^[A-Za-z0-9_-]{8,100}$/.test(key)) throw new HttpError(422, 'idempotency-required');
      const payload = validate(await readJson(request), config.site);
      if (payload.form === 'pakke-bestilling' && env.PUBLIC_ORDERS_ENABLED !== 'true') return json({ ok: false, error: 'orders-disabled' }, 503, cors);
      const receipt = await saveReceipt(env.DB, payload, origin, key);
      if (receipt.conflict) return json({ ok: false, error: 'idempotency-conflict' }, 409, cors);
      ctx.waitUntil(notifyOne(env, receipt.id).catch(() => console.error('notification-sweep-required')));
      return json({ ok: true, id: receipt.id, receipt_status: 'stored' }, receipt.created ? 201 : 200, cors);
    } catch (error) {
      return json({ ok: false, error: error instanceof HttpError ? error.message : 'unavailable' }, error instanceof HttpError ? error.status : 503, cors);
    }
  },
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(retryDue(env).catch(() => console.error('notification-sweep-failed')));
    if (new Date(controller.scheduledTime).getUTCMinutes() === 13) {
      ctx.waitUntil(expireTraffic(env).catch(() => console.error('traffic-retention-failed')));
    }
  },
};
