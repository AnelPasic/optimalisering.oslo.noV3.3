import { HttpError, json, readJson } from './domain.mjs';

export const retentionDays = 90;
const dayMs = 86_400_000;
const oslo = 'https://optimalisering.oslo.no';
const localDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Oslo', year: 'numeric', month: '2-digit', day: '2-digit' });
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
const labels = {
  organic: 'Organisk søk', google_ads: 'Google Ads', meta_ads: 'Meta Ads', paid: 'Andre annonser',
  social: 'Sosiale medier', email: 'E-post', referral: 'Henvisninger', direct: 'Direkte / ukjent', other: 'Annet',
};
export const channelLabels = Object.freeze(labels);

export async function collectTraffic(request, env, now = Date.now()) {
  if (request.headers.get('Origin') !== oslo) return json({ ok: false }, 403);
  const cors = { 'Access-Control-Allow-Origin': oslo, Vary: 'Origin' };
  if (request.method !== 'POST') return json({ ok: false }, 405, { ...cors, Allow: 'POST' });
  if (env.TRAFFIC_ENABLED !== 'true' || env.SITE_STAGE !== 'production' || !env.DB || !env.RATE_LIMITER) {
    return json({ ok: false }, 503, cors);
  }
  try {
    if (!/^text\/plain(?:;|$)/i.test(request.headers.get('Content-Type') ?? '')) throw new HttpError(415, 'content-type');
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) throw new HttpError(403, 'origin');
    if (!(await env.RATE_LIMITER.limit({ key: 'traffic:' + ip })).success) throw new HttpError(429, 'rate');
    const event = await readJson(request, 2048);
    if (!event || event.consent !== true ||
        typeof event.view !== 'string' || !uuid.test(event.view) ||
        typeof event.visitor !== 'string' || !uuid.test(event.visitor) ||
        typeof event.page !== 'string' || !/^\/(?:[a-z0-9-]+\/)*$/.test(event.page) || event.page.length > 160 ||
        typeof event.channel !== 'string' || !Object.hasOwn(labels, event.channel) ||
        ![event.campaign, event.adGroup, event.ad].every(value => typeof value === 'string' && /^[\p{L}\p{N} _./+-]{0,100}$/u.test(value)) ||
        !Number.isSafeInteger(event.elapsedMs) || event.elapsedMs < 0 || event.elapsedMs > dayMs ||
        !Number.isSafeInteger(event.activeMs) || event.activeMs < 0 || event.activeMs > dayMs ||
        !Number.isSafeInteger(event.scroll) || event.scroll < 0 || event.scroll > 100) throw new HttpError(422, 'event');

    const result = await env.DB.prepare(`INSERT INTO traffic_views
      (site_id,view_id,visitor_id,started_at_ms,local_day,page,channel,campaign,ad_group,ad,active_ms,scroll_percent)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(site_id,view_id) DO UPDATE SET
      active_ms=MAX(traffic_views.active_ms,excluded.active_ms),
      scroll_percent=MAX(traffic_views.scroll_percent,excluded.scroll_percent)
      WHERE traffic_views.visitor_id=excluded.visitor_id`)
      .bind(env.SITE_ID, event.view, event.visitor, now, localDay.format(now), event.page, event.channel,
        event.campaign, event.adGroup, event.ad, Math.min(event.elapsedMs, event.activeMs), event.scroll).run();
    if (!result.success) throw Error('traffic-storage');
    return new Response(null, { status: 204, headers: { ...cors, 'Cache-Control': 'no-store' } });
  } catch (error) {
    return json({ ok: false, error: error instanceof HttpError ? error.message : 'unavailable' },
      error instanceof HttpError ? error.status : 503, cors);
  }
}

export async function trafficReport(db, site, params, now = Date.now()) {
  const days = Number(params.get('days') || '30');
  if (![7, 30, 90].includes(days)) throw new HttpError(422, 'days');
  const end = localDay.format(now);
  const start = new Date(Date.parse(end + 'T00:00:00Z') - (days - 1) * dayMs).toISOString().slice(0, 10);
  const dimensions = ['channel', 'campaign', 'ad_group', 'ad'];
  const values = dimensions.map(key => params.get(key) || '');
  if (values.some(value => value.length > 100)) throw new HttpError(422, 'dimension');
  const criteria = ['site_id=?', 'local_day BETWEEN ? AND ?', 'started_at_ms>=?'];
  const args = [site, start, end, now - retentionDays * dayMs];
  dimensions.forEach((key, index) => {
    if (values[index]) { criteria.push(key + '=?'); args.push(values[index]); }
  });
  const where = criteria.join(' AND ');
  const [series, totals, detail, channels, coverage] = await db.batch([
    db.prepare(`WITH ranked AS (
      SELECT local_day,channel,ROW_NUMBER() OVER (PARTITION BY local_day,visitor_id ORDER BY started_at_ms,view_id) AS position
      FROM traffic_views WHERE ${where}
    ) SELECT local_day,channel,COUNT(*) AS visitors FROM ranked WHERE position=1 GROUP BY local_day,channel ORDER BY local_day`).bind(...args),
    db.prepare(`SELECT COUNT(DISTINCT visitor_id) AS visitors,COUNT(*) AS views,AVG(active_ms) AS average_ms FROM traffic_views WHERE ${where}`).bind(...args),
    db.prepare(`SELECT page,channel,campaign,ad_group,ad,COUNT(*) AS views,AVG(active_ms) AS average_ms,AVG(scroll_percent) AS average_scroll
      FROM traffic_views WHERE ${where} GROUP BY page,channel,campaign,ad_group,ad ORDER BY views DESC,page LIMIT 200`).bind(...args),
    db.prepare(`SELECT channel,campaign,ad_group,ad,COUNT(*) AS views FROM traffic_views WHERE ${where}
      GROUP BY channel,campaign,ad_group,ad ORDER BY views DESC LIMIT 100`).bind(...args),
    db.prepare('SELECT MIN(local_day) AS first_day FROM traffic_views WHERE site_id=? AND started_at_ms>=?')
      .bind(site, now - retentionDays * dayMs),
  ]);
  return { days, start, end, firstDay: coverage.results[0].first_day, total: totals.results[0],
    series: series.results, pages: detail.results, dimensions: channels.results };
}

export async function expireTraffic(env, now = Date.now()) {
  await env.DB.prepare('DELETE FROM traffic_views WHERE site_id=? AND started_at_ms<?')
    .bind(env.SITE_ID, now - retentionDays * dayMs).run();
}
