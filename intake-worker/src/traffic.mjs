import { channelLabels, safeAdId, safePage, safeTag } from '../../app/traffic-source.mjs';
import { readJson } from './domain.mjs';

export { channelLabels };
const retentionDays = 90;
const dayMs = 86_400_000;
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Oslo', year: 'numeric', month: '2-digit', day: '2-digit' });
const day = now => date.format(new Date(now));
const offsetDay = (iso, days) => new Date(Date.parse(iso + 'T00:00:00Z') + days * dayMs).toISOString().slice(0, 10);

export function trafficEnabled(env) {
  return env.HITCOUNT_ENABLED === 'true' && env.SITE_STAGE === 'production' && Boolean(env.DB);
}

export async function acceptHit(request, env, now = Date.now()) {
  if (!trafficEnabled(env)) return new Response(null, { status: 503 });
  if (request.method !== 'POST') return new Response(null, { status: 405 });
  if (request.headers.get('Content-Type') !== 'application/json') return new Response(null, { status: 415 });

  const event = await readJson(request, 1024);
  if (!event || !Object.hasOwn(channelLabels, event.channel) || event.page !== safePage(event.page) ||
      event.source !== safeTag(event.source) || event.medium !== safeTag(event.medium) ||
      event.campaign !== (safeTag(event.campaign) || safeAdId(event.campaign)) ||
      event.adGroup !== safeAdId(event.adGroup) || event.ad !== safeAdId(event.ad)) return new Response(null, { status: 422 });

  // Decide the bounded campaign bucket and increment it in one SQLite statement.
  // A full day continues to count both existing dimensions and new traffic.
  await env.DB.prepare(`WITH desired(site_id, day, page, channel, source, medium, campaign, ad_group, ad) AS (VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)),
    candidate AS (
      SELECT d.*, (NOT EXISTS (
        SELECT 1 FROM html_hits h WHERE (h.site_id,h.day,h.page,h.channel,h.source,h.medium,h.campaign,h.ad_group,h.ad)
          = (d.site_id,d.day,d.page,d.channel,d.source,d.medium,d.campaign,d.ad_group,d.ad)
      ) AND (SELECT count(*) FROM html_hits WHERE site_id=d.site_id AND day=d.day) >= 1000) AS overflow
      FROM desired d
    )
    INSERT INTO html_hits (site_id, day, page, channel, source, medium, campaign, ad_group, ad, hits)
    SELECT site_id, day, IIF(overflow, '/other/', page), IIF(overflow, 'other', channel),
      IIF(overflow, '', source), IIF(overflow, '', medium),
      IIF(overflow, '', campaign), IIF(overflow, '', ad_group), IIF(overflow, '', ad), 1 FROM candidate WHERE true
    ON CONFLICT(site_id,day,page,channel,source,medium,campaign,ad_group,ad) DO UPDATE SET hits=hits+1`)
    .bind(env.SITE_ID, day(now), event.page, event.channel, event.source, event.medium, event.campaign, event.adGroup, event.ad).run();
  return new Response(null, { status: 204 });
}

export async function trafficReport(db, site, params, now = Date.now()) {
  const selected = Number(params.get('days'));
  const days = [7, 30, 90].includes(selected) ? selected : 30;
  const end = day(now), start = offsetDay(end, 1 - days);
  const clauses = ['site_id=?', 'day BETWEEN ? AND ?'];
  const args = [site, start, end];
  for (const key of ['channel', 'campaign', 'ad_group', 'ad']) {
    const value = params.get(key);
    if (!value) continue;
    if (value.length > 100) throw new RangeError('Traffic filter is too long');
    clauses.push(key + '=?');
    args.push(value);
  }
  const where = clauses.join(' AND ');
  const [series, total, pages, dimensions, observed] = await db.batch([
    db.prepare(`SELECT date(day, '-6 days', 'weekday 1') AS week, channel, SUM(hits) AS hits
      FROM html_hits WHERE ${where} GROUP BY week,channel ORDER BY week,channel`).bind(...args),
    db.prepare(`SELECT COALESCE(SUM(hits),0) AS hits FROM html_hits WHERE ${where}`).bind(...args),
    db.prepare(`SELECT page,channel,source,medium,campaign,ad_group,ad,SUM(hits) AS hits
      FROM html_hits WHERE ${where} GROUP BY page,channel,source,medium,campaign,ad_group,ad ORDER BY hits DESC,page LIMIT 200`).bind(...args),
    db.prepare(`SELECT channel,campaign,ad_group,ad,SUM(hits) AS hits FROM html_hits
      WHERE site_id=? AND day BETWEEN ? AND ? GROUP BY channel,campaign,ad_group,ad ORDER BY hits DESC LIMIT 200`).bind(site, start, end),
    db.prepare('SELECT MIN(day) AS first_day FROM html_hits WHERE site_id=? AND day>=?')
      .bind(site, offsetDay(end, 1 - retentionDays)),
  ]);
  return { days, start, end, series: series.results, total: total.results[0], pages: pages.results,
    dimensions: dimensions.results, firstDay: observed.results[0].first_day };
}

export async function expireTraffic(env, now = Date.now()) {
  if (!trafficEnabled(env)) return;
  await env.DB.prepare('DELETE FROM html_hits WHERE site_id=? AND day<?')
    .bind(env.SITE_ID, offsetDay(day(now), 1 - retentionDays)).run();
}
