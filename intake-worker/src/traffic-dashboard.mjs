import { channelLabels, trafficReport } from './traffic.mjs';

const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const count = new Intl.NumberFormat('nb-NO');
const colors = ['#16755b', '#2563eb', '#7c3aed', '#a03673', '#0e7490', '#a55007', '#b22d40', '#556277', '#52391a', '#305169', '#222c42'];
const monday = value => {
  const date = new Date(value + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  return date.getTime();
};

function graph(data) {
  if (!data.series.length) return '<p>Ingen registrerte sidevisninger i dette utvalget.</p>';
  const map = new Map(), totals = new Map();
  for (const row of data.series) {
    map.set(row.week + row.channel, row.hits);
    totals.set(row.week, (totals.get(row.week) || 0) + row.hits);
  }
  const first = data.firstDay > data.start ? data.firstDay : data.start;
  const dates = [], channels = Object.keys(channelLabels).filter(channel => data.series.some(row => row.channel === channel));
  for (let date = monday(first); date <= monday(data.end); date += 7 * 86_400_000) {
    dates.push(new Date(date).toISOString().slice(0, 10));
  }
  const max = Math.max(1, ...totals.values());
  const position = (i, y) => `${12 + 736 * i / Math.max(1, dates.length - 1)},${204 - y * 186 / max}`;
  let previous = dates.map(() => 0);
  const polygons = channels.map(channel => {
    const top = dates.map((date, i) => previous[i] + (map.get(date + channel) || 0));
    const color = colors[Object.keys(channelLabels).indexOf(channel)];
    const points = top.map((value, i) => position(i, value)).concat(previous.map((value, i) => position(i, value)).reverse());
    previous = top;
    return dates.length === 1
      ? `<rect x="12" width="736" y="${204 - top[0] * 186 / max}" height="${186 * (map.get(dates[0] + channel) || 0) / max}" fill="${color}"/>`
      : `<polygon points="${points.join(' ')}" fill="${color}" stroke="${color}" stroke-width="0.5"/>`;
  });
  const legend = channels.map(channel => `<li><svg width="10" height="10" aria-hidden="true"><circle cx="5" cy="5" r="5" fill="${colors[Object.keys(channelLabels).indexOf(channel)]}"/></svg> ${escape(channelLabels[channel])}</li>`).join('');
  const columns = channels.map(channel => '<th scope="col">' + escape(channelLabels[channel]) + '</th>').join('');
  const rows = dates.map(date => `<tr><th scope="row">${escape(date)}</th>${channels.map(channel => '<td>' + count.format(map.get(date + channel) || 0) + '</td>').join('')}</tr>`).join('');
  return `<figure><svg viewBox="0 0 760 215" width="100%" role="img" aria-label="Sidevisninger per uke og kanal">${polygons.join('')}</svg>
    <figcaption>${escape(first)} – ${escape(data.end)}. Første og siste uke kan være ufullstendige.</figcaption>
    <ul class="actions">${legend}</ul></figure>
    <details><summary>Se uketall per kanal</summary><div class="table-scroll" tabindex="0"><table class="table"><thead><tr><th scope="col">Ukestart</th>${columns}</tr></thead><tbody>${rows}</tbody></table></div></details>`;
}

export async function renderTraffic(env, params) {
  const data = await trafficReport(env.DB, env.SITE_ID, params);
  const keys = ['channel', 'campaign', 'ad_group', 'ad'];
  const dimensions = ['Kanal', 'Kampanje', 'Annonsegruppe', 'Annonse'];
  const controls = keys.map((key, i) => {
    const active = params.get(key) || '';
    const values = [...new Set([active, ...data.dimensions.map(row => row[key])])].filter(Boolean);
    if (key !== 'channel') return `<label class="fieldset"><span class="fieldset-legend">${dimensions[i]}</span>
      <input class="input w-full" name="${key}" list="choices-${key}" value="${escape(active)}" placeholder="Alle" maxlength="100">
      <datalist id="choices-${key}">${values.map(value => `<option value="${escape(value)}"></option>`).join('')}</datalist></label>`;
    return `<label class="fieldset"><span class="fieldset-legend">${dimensions[i]}</span><select class="select w-full" name="${key}">
      <option value="">Alle</option>${values.map(value => `<option value="${escape(value)}"${value === active ? ' selected' : ''}>${escape(channelLabels[value] && key === 'channel' ? channelLabels[value] : value)}</option>`).join('')}</select></label>`;
  });
  const rows = data.pages.map(row => `<tr><th scope="row">${escape(row.page)}</th><td>${escape(channelLabels[row.channel])}</td>
    <td>${escape([row.source, row.medium].filter(Boolean).join(' / ') || '–')}</td>
    <td>${escape(row.campaign || '–')}</td><td>${escape(row.ad_group || '–')}</td><td>${escape(row.ad || '–')}</td>
    <td>${count.format(row.hits)}</td></tr>`);
  const html = `<!doctype html><html lang="nb" data-theme="light"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"><title>Trafikk · Medon</title><link rel="stylesheet" href="/admin/style.css"></head>
    <body class="bg-base-200 text-base-content"><header class="border-b border-base-300 bg-base-100"><div class="shell header">
      <div><h1>Trafikk · Optimalisering Oslo</h1></div><a class="btn btn-outline" href="/admin/">Henvendelser</a>
    </div></header><main class="shell">
      <form class="card bg-base-100 border border-base-300"><div class="card-body"><div class="filters">
        <label class="fieldset"><span class="fieldset-legend">Periode</span><select class="select w-full" name="days">
        ${[7, 30, 90].map(days => `<option value="${days}"${data.days === days ? ' selected' : ''}>Siste ${days} dager</option>`).join('')}</select></label>
        ${controls.join('')}</div><div class="actions"><button class="btn btn-primary">Vis utvalg</button><a class="btn btn-ghost" href="/admin/traffic">Nullstill</a></div>
      </div></form>
      <section class="card bg-base-100 border border-base-300"><div class="card-body">
        <h2 class="card-title">Sidevisninger per kanal</h2><p>${count.format(data.total.hits)} sidevisninger i utvalget</p>
        <p>Hvert kvalifiserte HTML-svar telles én gang. Kjente roboter og forhåndslasting filtreres.</p>${graph(data)}</div></section>
      <section class="card bg-base-100 border border-base-300"><div class="card-body">
        <h2 class="card-title">Sider og kampanjer</h2>
        <p>Kampanje, annonsegruppe og annonse vises når lenken har tilsvarende merking. Tabellen viser opptil de 200 mest viste radene i utvalget.</p>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Sidevisninger etter side og kampanje"><table class="table">
          <thead><tr><th scope="col">Side</th><th scope="col">Kanal</th><th scope="col">Kilde / medium</th>${dimensions.slice(1).map(name => '<th scope="col">' + name + '</th>').join('')}<th scope="col">Sidevisninger</th></tr></thead>
          <tbody>${rows.length ? rows.join('') : '<tr><td colspan="7">Ingen registrerte sidevisninger i utvalget.</td></tr>'}</tbody>
        </table></div></div></section></main></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'none'; style-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'" } });
}
