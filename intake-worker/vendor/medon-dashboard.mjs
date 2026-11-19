// Generated from the Medon lead-intake kit. Rebuild with scripts/build-legacy-dashboard.mjs.

// src/domain.mjs
var HttpError = class extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
  }
};
function json(value, status = 200, headers = {}) {
  return new Response(JSON.stringify(value), { status, headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow",
    ...headers
  } });
}
async function readJson(message, maxBytes = 16384, timeoutMs = 5e3) {
  if (Number(message.headers.get("content-length") ?? 0) > maxBytes) throw new HttpError(413, "body-too-large");
  const reader = message.body?.getReader();
  if (!reader) throw new HttpError(400, "invalid-json");
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new HttpError(408, "body-timeout")), timeoutMs);
  });
  const chunks = [];
  let size = 0;
  try {
    for (; ; ) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) throw new HttpError(413, "body-too-large");
      chunks.push(value);
    }
    const bytes2 = new Uint8Array(size);
    let position = 0;
    for (const chunk of chunks) {
      bytes2.set(chunk, position);
      position += chunk.byteLength;
    }
    try {
      return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes2));
    } catch {
      throw new HttpError(400, "invalid-json");
    }
  } finally {
    clearTimeout(timer);
    void reader.cancel().catch(() => {
    });
    reader.releaseLock();
  }
}
function httpsOrigin(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.origin !== value) throw Error("configuration-origin");
  return value;
}
function configuration(env) {
  if (!/^[a-z0-9][a-z0-9.-]{2,99}$/.test(env.SITE_ID ?? "")) throw Error("configuration-site");
  const forms = JSON.parse(env.FORMS_JSON ?? "{}"), packages = JSON.parse(env.PACKAGES_JSON ?? "[]");
  if (!forms || Array.isArray(forms) || Object.keys(forms).length < 1 || Object.keys(forms).length > 20 || !Array.isArray(packages) || packages.length > 100 || packages.some((p) => !/^[a-z0-9_-]{1,80}$/.test(p))) throw Error("configuration-forms");
  for (const [key, form] of Object.entries(forms)) {
    if (!/^[a-z0-9_-]{1,64}$/.test(key) || !form.fields || Object.keys(form.fields).length > 20) throw Error("configuration-form");
    for (const [field, rule] of Object.entries(form.fields)) {
      if (!/^[a-z][a-z0-9_]{0,39}$/.test(field) || ["site", "form", "source", "source_kind", "website_confirmation", "__proto__", "constructor", "prototype"].includes(field) || !["text", "email", "phone", "url", "package", "choice", "multi-choice"].includes(rule.type) || rule.max !== void 0 && (!Number.isSafeInteger(rule.max) || rule.max < 1 || rule.max > 4e3) || ["choice", "multi-choice"].includes(rule.type) && (!Array.isArray(rule.values) || !rule.values.length || rule.values.length > 100 || rule.values.some((v) => typeof v !== "string" || !v || v.length > 254 || /[\x00-\x1f\x7f]/.test(v)) || new Set(rule.values).size !== rule.values.length)) throw Error("configuration-field");
    }
    if (form.fields.email?.type !== "email" || form.fields.email.required !== true) throw Error("configuration-email");
  }
  new Intl.DateTimeFormat("en", { timeZone: env.TIMEZONE });
  return {
    site: env.SITE_ID,
    origin: httpsOrigin(env.SITE_ORIGIN),
    ingress: httpsOrigin(env.INGRESS_ORIGIN),
    forms,
    packages,
    timezone: env.TIMEZONE || "Europe/Oslo"
  };
}
function siteEnvironments(env) {
  if (!env.SITE_MAP_JSON) return [env];
  const sites = JSON.parse(env.SITE_MAP_JSON);
  if (env.INSTALLATION_MODE !== "medon-shared" || !Array.isArray(sites) || !sites.length || sites.length > 20) throw Error("configuration-sites");
  const ids = /* @__PURE__ */ new Set(), origins = /* @__PURE__ */ new Set();
  return sites.map((s) => {
    if (ids.has(s.site) || origins.has(s.origin)) throw Error("configuration-sites");
    ids.add(s.site);
    origins.add(s.origin);
    const scoped = {
      ...env,
      SITE_ID: s.site,
      SITE_ORIGIN: s.origin,
      SITE_LABEL: s.label || s.site,
      FORMS_JSON: JSON.stringify(s.forms),
      PACKAGES_JSON: JSON.stringify(s.packages || []),
      HIT_PATHS_JSON: JSON.stringify(s.hitPaths || []),
      TRACKING_STARTED_AT: s.trackingStartedAt || ""
    };
    configuration(scoped);
    return scoped;
  });
}
function reportSites(env, params) {
  const sites = siteEnvironments(env), selected = params.get("site");
  if (selected && !sites.some((s) => s.SITE_ID === selected)) throw new HttpError(403, "site-binding");
  return selected ? sites.filter((s) => s.SITE_ID === selected) : sites;
}

// src/access.mjs
function bytes(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw Error("jwt");
  return Uint8Array.from(atob(value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=")), (c) => c.charCodeAt(0));
}
function segment(value) {
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes(value)));
}
async function authorize(request, env, permission, network = fetch, now = Date.now()) {
  try {
    const issuer = env.ACCESS_ISSUER;
    if (!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer ?? "") || !env.ACCESS_AUD) return false;
    const token = request.headers.get("Cf-Access-Jwt-Assertion") ?? "";
    if (token.length > 16384) return false;
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const header = segment(parts[0]), claims = segment(parts[1]), seconds = Math.floor(now / 1e3);
    if (header.alg !== "RS256" || typeof header.kid !== "string" || header.crit) return false;
    if (claims.iss !== issuer || !Array.isArray(claims.aud) || !claims.aud.includes(env.ACCESS_AUD) || !Number.isSafeInteger(claims.exp) || claims.exp <= seconds || !Number.isSafeInteger(claims.iat) || claims.iat > seconds + 30 || claims.nbf !== void 0 && (!Number.isSafeInteger(claims.nbf) || claims.nbf > seconds) || typeof claims.sub !== "string" || !claims.sub || typeof claims.email !== "string") return false;
    const grants = JSON.parse(env.ADMIN_GRANTS_JSON ?? "{}")[claims.email];
    if (!Array.isArray(grants) || !grants.some((g) => g.site === env.SITE_ID && Array.isArray(g.permissions) && g.permissions.includes(permission))) return false;
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 3e3);
    try {
      const response = await network(issuer + "/cdn-cgi/access/certs", { signal: controller.signal, redirect: "manual" });
      if (!response.ok) return false;
      const jwks = await readJson(response, 65536, 3e3);
      const jwk = jwks.keys?.find((key2) => key2.kid === header.kid && key2.kty === "RSA" && key2.alg === "RS256" && key2.use === "sig");
      if (!jwk) return false;
      const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
      return await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, bytes(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1]));
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return false;
  }
}

// src/attribution.mjs
var RULE_VERSION = "mws-037g-v1";
var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
var CLICKS = ["gclid", "gbraid", "wbraid", "oppref"];
var safeTag = (value, limit = 100) => typeof value === "string" && value.length <= limit && /^[\p{L}\p{N} _.-]+$/u.test(value) && !/\d{7,}/.test(value) ? value.trim() : "";
function normalize(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) input = {};
  const result = { source: "unknown", medium: "", channel: "unknown", campaign: "", rule_version: RULE_VERSION };
  for (const key of UTM) {
    const value = safeTag(input[key], key === "utm_source" || key === "utm_medium" ? 80 : 100);
    if (value) result[key] = value;
  }
  for (const key of CLICKS) if (typeof input[key] === "string" && /^[A-Za-z0-9_-]{1,512}$/.test(input[key])) result[key] = input[key];
  const source = (result.utm_source || "").toLowerCase(), medium = (result.utm_medium || "").toLowerCase();
  const google = !!(result.gclid || result.gbraid || result.wbraid), openai = !!result.oppref;
  if (google && openai || google && source && source !== "google" || openai && source && !["openai", "chatgpt"].includes(source) || (google || openai) && medium && !["cpc", "ppc", "paid", "paid_search", "paid_ai"].includes(medium)) return { ...result, conflicted: true };
  if (google) return { ...result, source: "google", medium: medium || "cpc", channel: "paid_search", campaign: result.utm_campaign || "" };
  if (openai) return { ...result, source: source || "openai", medium: medium || "paid", channel: "paid_ai", campaign: result.utm_campaign || "" };
  if (!source) return result;
  let channel = "other";
  if (["cpc", "ppc", "paid_search"].includes(medium)) channel = ["google", "bing"].includes(source) ? "paid_search" : ["chatgpt", "openai"].includes(source) ? "paid_ai" : "other";
  else if (["paid_social"].includes(medium)) channel = "paid_social";
  else if (medium === "organic" && ["google", "bing", "duckduckgo", "yahoo"].includes(source)) channel = "organic_search";
  else if (medium === "email") channel = "email";
  else if (medium === "offline") channel = "offline";
  else if (["social", "organic_social"].includes(medium)) channel = "organic_social";
  else if (["chatgpt", "openai", "perplexity", "claude", "copilot"].includes(source)) channel = "ai_referral";
  else if (medium === "referral") channel = "referral";
  return { ...result, source, medium, channel, campaign: result.utm_campaign || "" };
}
function fromUrl(value, referrer = "", origin = "") {
  const url = new URL(value), tags = Object.fromEntries([...UTM, ...CLICKS].map((key) => [key, url.searchParams.getAll(key).length === 1 ? url.searchParams.get(key) : ""]));
  const result = normalize(tags);
  if (result.source !== "unknown" || result.conflicted) return { ...result, tagged: result.source !== "unknown" };
  try {
    const ref = new URL(referrer);
    if (!["https:", "http:"].includes(ref.protocol) || ref.username || ref.password || ref.origin === origin) return result;
    const host = ref.hostname.replace(/^www\./, "");
    const groups = [
      ["google", /(^|\.)google\.[a-z.]+$/],
      ["bing", /(^|\.)bing\.com$/],
      ["duckduckgo", /(^|\.)duckduckgo\.com$/],
      ["chatgpt", /(^|\.)(chatgpt\.com|chat\.openai\.com)$/],
      ["perplexity", /(^|\.)perplexity\.ai$/],
      ["claude", /(^|\.)claude\.ai$/],
      ["facebook", /(^|\.)(facebook\.com|fb\.com)$/],
      ["instagram", /(^|\.)instagram\.com$/],
      ["linkedin", /(^|\.)linkedin\.com$/]
    ];
    const match = groups.find(([, pattern]) => pattern.test(host));
    if (!match) return normalize({ utm_source: "external", utm_medium: "referral" });
    const source = match[0], medium = ["google", "bing", "duckduckgo"].includes(source) ? "organic" : ["facebook", "instagram", "linkedin"].includes(source) ? "social" : "referral";
    return normalize({ utm_source: source, utm_medium: medium });
  } catch {
    return result;
  }
}
function localDate(now, timezone) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(now));
}

// src/reports.mjs
var DAY = 864e5;
var iso = (date) => date.toISOString().slice(0, 10);
var asDate = (value) => /* @__PURE__ */ new Date(value + "T12:00:00Z");
var shiftDays = (value, n) => iso(new Date(asDate(value).getTime() + n * DAY));
function shiftMonths(value, n) {
  const d = asDate(value);
  d.setUTCMonth(d.getUTCMonth() + n, 1);
  return iso(d);
}
function shiftYear(value) {
  const d = asDate(value), month = d.getUTCMonth();
  d.setUTCFullYear(d.getUTCFullYear() - 1);
  if (d.getUTCMonth() !== month) d.setUTCDate(0);
  return iso(d);
}
function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(asDate(value).getTime()) && iso(asDate(value)) === value;
}
function midnight(day, timezone) {
  const target = Date.parse(day + "T00:00:00Z");
  let value = target;
  const format = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
  for (let i = 0; i < 4; i++) {
    const p = Object.fromEntries(format.formatToParts(new Date(value)).map((p2) => [p2.type, p2.value]));
    const represented = Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}Z`);
    const correction = target - represented;
    value += correction;
    if (!correction) break;
  }
  return value;
}
function period(env, params, now = Date.now()) {
  reportSites(env, params);
  const timezone = env.TIMEZONE || "Europe/Oslo", today = localDate(now, timezone), preset = params.get("period") || "30d";
  if (!["30d", "90d", "6m", "1y"].includes(preset)) throw new HttpError(422, "period");
  let start, end, months = 0;
  if (params.get("start") || params.get("end")) {
    start = params.get("start");
    const last = params.get("end");
    if (!validDate(start) || !validDate(last) || start > last || last > today || asDate(last).getTime() - asDate(start).getTime() > 366 * DAY) throw new HttpError(422, "date");
    end = shiftDays(last, 1);
  } else if (preset === "30d" || preset === "90d") {
    start = shiftDays(today, preset === "30d" ? -29 : -89);
    end = shiftDays(today, 1);
  } else {
    months = preset === "6m" ? 6 : 12;
    start = shiftMonths(today, 1 - months);
    end = shiftMonths(today, 1);
  }
  const make = (a, b) => ({ start: a, end: b, startMs: midnight(a, timezone), endMs: midnight(b, timezone), partial: b > today });
  const current = make(start, end), mode = params.get("compare") || "none";
  if (!["none", "previous", "year"].includes(mode)) throw new HttpError(422, "compare");
  let previous = null;
  if (mode === "year") previous = make(shiftYear(start), shiftYear(end));
  if (mode === "previous") previous = make(months ? shiftMonths(start, -months) : shiftDays(start, -Math.round((asDate(end).getTime() - asDate(start).getTime()) / DAY)), start);
  const grain = params.get("grain") || (months ? "month" : "week");
  if (!["week", "month"].includes(grain)) throw new HttpError(422, "grain");
  return { current, previous, timezone, grain, preset, mode, now, comparable: !current.partial, comparison_note: current.partial ? "Dagens eller m\xE5nedens periode er ufullstendig. Daglige tellere gir ikke en sammenligning av samme klokkeslett." : "" };
}
function filters(env, params, leads = true) {
  const sites = reportSites(env, params);
  const clauses = [`site_id IN (${sites.map(() => "?").join(",")})`], values = sites.map((s) => s.SITE_ID);
  for (const field of ["source", "campaign", ...leads ? ["form", "status", "email"] : []]) {
    const value = params.get(field);
    if (!value) continue;
    if (value.length > 254 || /[\x00-\x1f]/.test(value)) throw new HttpError(422, "filter");
    const column = { form: "intent", status: "notification_status", email: "json_extract(payload_json,'$.email')" }[field] || field;
    clauses.push(column + "=?");
    values.push(value);
  }
  return { sql: clauses.join(" AND "), values };
}
function bucket(day, grain) {
  if (grain === "month") return day.slice(0, 7) + "-01";
  const dow = asDate(day).getUTCDay();
  return shiftDays(day, -((dow + 6) % 7));
}
function dateList(window) {
  const days = [];
  for (let d = window.start; d < window.end; d = shiftDays(d, 1)) days.push(d);
  return days;
}
async function nativeWindowRows(env, params, window, now) {
  const hf = filters(env, params, false), lf = filters(env, params, true);
  const [hitResult, leadResult] = await Promise.all([
    env.DB.prepare(`SELECT day,source,medium,channel,campaign,SUM(hits) n FROM html_hits WHERE ${hf.sql} AND day>=? AND day<? GROUP BY day,source,medium,channel,campaign`).bind(...hf.values, window.start, window.end).all(),
    env.DB.prepare(`SELECT day,source,medium,channel,campaign,attribution_method,COUNT(*) n FROM receipts WHERE ${lf.sql} AND created_at_ms>=? AND created_at_ms<? GROUP BY day,source,medium,channel,campaign,attribution_method`).bind(...lf.values, window.startMs, Math.min(window.endMs, now + 1)).all()
  ]);
  return [hitResult, leadResult];
}
async function windowReport(env, params, window, grain, now, readWindowRows) {
  const [hitResult, leadResult] = await readWindowRows(env, params, window, now);
  const tracking = Math.max(...reportSites(env, params).map((s) => Date.parse(s.TRACKING_STARTED_AT || "") || Infinity)), hitDays = Number(env.HIT_RETENTION_DAYS), leadDays = env.RETENTION_MODE === "manual" ? 0 : Number(env.RETENTION_DAYS);
  const hitStart = Math.max(Number.isFinite(tracking) ? tracking : Infinity, hitDays > 0 ? now - hitDays * DAY : -Infinity);
  const declared = Date.parse(env.LEAD_HISTORY_STARTED_AT || "");
  const leadStart = Math.max(Number.isFinite(declared) ? declared : env.RETENTION_MODE === "manual" ? Infinity : -Infinity, leadDays > 0 ? now - leadDays * DAY : -Infinity);
  const available = env.HITCOUNT_ENABLED === "true" && window.startMs >= hitStart;
  const leadComplete = window.startMs >= leadStart;
  const hits = available ? hitResult.results.reduce((n, r) => n + Number(r.n), 0) : null;
  const leads = leadResult.results.reduce((n, r) => n + Number(r.n), 0), sources = /* @__PURE__ */ new Map(), campaigns = /* @__PURE__ */ new Map(), series = /* @__PURE__ */ new Map(), unknownWeeks = /* @__PURE__ */ new Map();
  const today = localDate(now, env.TIMEZONE || "Europe/Oslo"), measuredEnd = window.end < shiftDays(today, 1) ? window.end : shiftDays(today, 1);
  for (const day of dateList({ ...window, end: measuredEnd })) {
    const key = bucket(day, grain), week = bucket(day, "week"), dayMs = midnight(day, env.TIMEZONE || "Europe/Oslo");
    const bucketEnd = grain === "week" ? shiftDays(key, 7) : shiftMonths(key, 1);
    if (!series.has(key)) series.set(key, { date: key, hits: 0, leads: 0, partial: key < window.start || bucketEnd > measuredEnd || key <= today && bucketEnd > today && window.partial });
    if (dayMs < hitStart || env.HITCOUNT_ENABLED !== "true") series.get(key).hits = null;
    if (dayMs < leadStart) series.get(key).leads = null;
    if (!unknownWeeks.has(week)) unknownWeeks.set(week, { date: week, hits: 0 });
    if (dayMs < hitStart || env.HITCOUNT_ENABLED !== "true") unknownWeeks.get(week).hits = null;
  }
  for (const [kind, rows] of [["hits", hitResult.results], ["leads", leadResult.results]]) for (const row of rows) {
    const key = JSON.stringify([row.source, row.medium, row.channel]);
    if (!sources.has(key)) sources.set(key, { source: row.source, medium: row.medium, channel: row.channel, hits: available ? 0 : null, leads: 0, estimated: 0 });
    if (kind !== "hits" || available) sources.get(key)[kind] += Number(row.n);
    if (kind === "leads" && row.attribution_method === "estimated_ip_match") sources.get(key).estimated += Number(row.n);
    const campaignKey = JSON.stringify([row.source, row.medium, row.campaign]);
    if (!campaigns.has(campaignKey)) campaigns.set(campaignKey, { source: row.source, medium: row.medium, campaign: row.campaign || "(ikke satt)", hits: available ? 0 : null, leads: 0 });
    if (kind !== "hits" || available) campaigns.get(campaignKey)[kind] += Number(row.n);
    const point = series.get(bucket(row.day, grain));
    if (point && point[kind] !== null) point[kind] += Number(row.n);
    const unknown = unknownWeeks.get(bucket(row.day, "week"));
    if (kind === "hits" && row.source === "unknown" && unknown?.hits !== null) unknown.hits += Number(row.n);
  }
  const ratio = (n, d) => leadComplete && d > 0 ? n / d * 100 : null;
  const withRatio = (row) => ({ ...row, ratio: ratio(row.leads, row.hits) });
  return {
    ...window,
    hits,
    leads,
    ratio: ratio(leads, hits),
    history_complete: available && leadComplete,
    lead_history_complete: leadComplete,
    unknown_leads: leadResult.results.filter((r) => r.source === "unknown").reduce((n, r) => n + Number(r.n), 0),
    estimated_leads: leadResult.results.filter((r) => r.attribution_method === "estimated_ip_match").reduce((n, r) => n + Number(r.n), 0),
    observed_leads: leadResult.results.filter((r) => String(r.attribution_method).startsWith("observed_")).reduce((n, r) => n + Number(r.n), 0),
    sources: [...sources.values()].map(withRatio),
    campaigns: [...campaigns.values()].map(withRatio),
    series: [...series.values()].map(withRatio),
    unknown_weekly: [...unknownWeeks.values()]
  };
}
function channelShares(sources, total) {
  const definitions = { google_organic: "Google organisk", google_ads: "Google Ads", meta_ads: "Meta Ads", other_organic: "\xD8vrig organisk", other_paid: "\xD8vrige annonser", referral: "Direkte / henvisninger", other: "\xD8vrige kilder", unknown: "Ukjent / ikke dokumentert" };
  const groups = new Map(Object.entries(definitions).map(([key, label]) => [key, { key, label, leads: 0, estimated: 0, share: 0 }]));
  for (const r of sources) {
    const key = r.source === "unknown" ? "unknown" : r.source === "google" && r.channel === "organic_search" ? "google_organic" : r.source === "google" && r.channel === "paid_search" ? "google_ads" : ["facebook", "instagram", "meta"].includes(r.source) && r.channel === "paid_social" ? "meta_ads" : ["organic_search", "organic_social"].includes(r.channel) ? "other_organic" : r.channel.startsWith("paid_") ? "other_paid" : ["direct", "referral", "ai_referral"].includes(r.channel) ? "referral" : "other";
    const group = groups.get(key);
    group.leads += r.leads;
    group.estimated += r.estimated || 0;
  }
  return [...groups.values()].map((g) => ({ ...g, share: total ? g.leads / total * 100 : 0 }));
}
async function report(env, params, now = Date.now(), readWindowRows = nativeWindowRows) {
  const p = period(env, params, now), current = await windowReport(env, params, p.current, p.grain, now, readWindowRows);
  current.channels = channelShares(current.sources, current.leads);
  const previous = p.previous ? await windowReport(env, params, p.previous, p.grain, now, readWindowRows) : null;
  if (previous) previous.channels = channelShares(previous.sources, previous.leads);
  const comparable = p.comparable && current.history_complete && !!previous?.history_complete;
  if (previous) for (const group of ["sources", "campaigns"]) {
    const dimensions = group === "sources" ? ["source", "medium", "channel"] : ["source", "medium", "campaign"];
    const key = (row) => JSON.stringify(dimensions.map((d) => row[d]));
    const before = new Map(previous[group].map((row) => [key(row), row]));
    const combined = new Map(current[group].map((row) => [key(row), row]));
    for (const [id, row] of before) if (!combined.has(id)) combined.set(id, { ...row, hits: current.hits === null ? null : 0, leads: 0, estimated: 0, ratio: null });
    current[group] = [...combined.values()].map((row) => {
      const prior = before.get(key(row));
      const priorHits = previous.hits === null ? null : prior?.hits ?? 0, priorLeads = previous.lead_history_complete ? prior?.leads ?? 0 : null;
      return {
        ...row,
        previous_hits: priorHits,
        previous_leads: priorLeads,
        delta_hits: comparable ? row.hits - priorHits : null,
        delta_leads: comparable ? row.leads - priorLeads : null
      };
    });
  }
  const delta = {};
  for (const key of ["hits", "leads", "ratio"]) delta[key] = comparable ? { absolute: current[key] - previous[key], percent: previous[key] > 0 ? (current[key] - previous[key]) / previous[key] * 100 : null } : null;
  return {
    ...p,
    current,
    previous,
    comparable,
    delta,
    generated_at: new Date(now).toISOString(),
    metric: "html_hits",
    rate_label: "Henvendelser per 100 sidevisninger",
    policy_version: "mws-037g-v1",
    filters: Object.fromEntries(params),
    history_note: current.history_complete ? "" : "Utilstrekkelig historikk eller kortere lagringstid. Manglende tall er ikke null."
  };
}

// src/legacy-reports.mjs
function selection(env, params, window, now) {
  const sites = reportSites(env, params);
  const clauses = [`site_id IN (${sites.map(() => "?").join(",")})`, "created_at_ms>=?", "created_at_ms<?"];
  const values = [...sites.map((site) => site.SITE_ID), window.startMs, Math.min(window.endMs, now + 1)];
  for (const field of ["form", "status", "email", "source", "campaign"]) {
    const value = params.get(field);
    if (!value) continue;
    if (value.length > 254 || /[\x00-\x1f]/.test(value)) throw new HttpError(422, "filter");
    const column = { form: "intent", status: "notification_status", email: "json_extract(payload_json,'$.email')" }[field];
    if (column) {
      clauses.push(column + "=?");
      values.push(value);
    }
  }
  return { sql: clauses.join(" AND "), values };
}
function evidence(raw, origin) {
  const source = raw && typeof raw === "object" ? raw : {};
  const url = new URL(origin);
  const tags = {};
  for (const name of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const value = typeof source[name] === "string" ? source[name].trim() : "";
    if (value && value.length <= 120 && /^[\p{L}\p{N} _./+-]+$/u.test(value)) {
      tags[name] = value;
      url.searchParams.set(name, value);
    }
  }
  const result = tags.utm_source ? normalize(tags) : fromUrl(url.href, source.referrer, origin);
  if (tags.utm_source) {
    result.source = tags.utm_source.toLowerCase();
    result.medium = (tags.utm_medium || "").toLowerCase();
    if (result.channel === "unknown") result.channel = "other";
  }
  result.campaign = tags.utm_campaign || "";
  return { ...result, method: result.source === "unknown" ? "unknown" : "observed_form_tags" };
}
function matches(source, params) {
  return (!params.get("source") || params.get("source") === source.source) && (!params.get("campaign") || params.get("campaign") === source.campaign);
}
function cursor(value) {
  try {
    if (value.length > 200) throw Error();
    const decoded = JSON.parse(atob(value.replaceAll("-", "+").replaceAll("_", "/")));
    if (!Number.isSafeInteger(decoded.time) || !/^[-a-f0-9]{36}$/.test(decoded.id)) throw Error();
    return decoded;
  } catch {
    throw new HttpError(422, "cursor");
  }
}
function nextCursor(row) {
  return btoa(JSON.stringify({ time: row.created_at_ms, id: row.id })).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
async function readLegacyReceipts(env, params, now = Date.now(), limit = 100) {
  const window = period(env, params, now).current;
  const selected = selection(env, params, window, now);
  const rows = [];
  let after = params.get("after") ? cursor(params.get("after")) : null;
  for (; ; ) {
    const clauses = [selected.sql], values = [...selected.values];
    if (after) {
      clauses.push("(created_at_ms<? OR (created_at_ms=? AND id<?))");
      values.push(after.time, after.time, after.id);
    }
    const page = await env.DB.prepare(`SELECT id,site_id,origin,intent,payload_json,created_at_ms,
      notification_status,notification_attempts,resend_message_id,last_error FROM receipts
      WHERE ${clauses.join(" AND ")} ORDER BY created_at_ms DESC,id DESC LIMIT 250`).bind(...values).all();
    for (const row of page.results) {
      const { payload_json, ...metadata } = row;
      const payload = JSON.parse(payload_json), source = evidence(payload.source, row.origin);
      if (matches(source, params)) rows.push({
        ...metadata,
        payload,
        source: source.source,
        medium: source.medium,
        channel: source.channel,
        campaign: source.campaign,
        attribution_method: source.method
      });
      if (rows.length > limit) return { receipts: rows.slice(0, limit), next: nextCursor(rows[limit - 1]) };
    }
    if (page.results.length < 250) return { receipts: rows, next: null };
    const last = page.results.at(-1);
    after = { time: last.created_at_ms, id: last.id };
  }
}
async function legacyWindowRows(env, params, window, now) {
  const selected = selection(env, params, window, now);
  const rows = await env.DB.prepare(`SELECT created_at_ms,origin,json_extract(payload_json,'$.source') evidence,COUNT(*) n
    FROM receipts WHERE ${selected.sql} GROUP BY created_at_ms,origin,evidence`).bind(...selected.values).all();
  const groups = rows.results.flatMap((row) => {
    const source = evidence(JSON.parse(row.evidence || "{}"), row.origin);
    if (!matches(source, params)) return [];
    return [{
      day: localDate(row.created_at_ms, env.TIMEZONE || "Europe/Oslo"),
      source: source.source,
      medium: source.medium,
      channel: source.channel,
      campaign: source.campaign,
      attribution_method: source.method,
      n: row.n
    }];
  });
  return [{ results: [] }, { results: groups }];
}

// src/admin.mjs
var escape = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
var num = (n) => n === null || n === void 0 ? "Ikke m\xE5lt" : new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 2 }).format(n);
var method = (value) => ({ observed_cookie: "Direkte registrert \xB7 cookie", observed_session_storage: "Direkte registrert \xB7 sessionStorage", observed_form_tags: "Direkte registrert \xB7 skjematagger", estimated_ip_match: "Estimert IP-treff", unknown: "Ukjent" })[value] || "Ukjent";
function table(caption, headers, rows) {
  return `<div class="table-scroll" tabindex="0" role="region" aria-label="${escape(caption)}"><table class="table"><caption>${escape(caption)}</caption><thead><tr>${headers.map((h) => `<th scope="col">${escape(h)}</th>`).join("")}</tr></thead><tbody>${rows.length ? rows.map((row) => "<tr>" + row.map((cell) => `<td>${cell}</td>`).join("") + "</tr>").join("") : `<tr><td colspan="${headers.length}">Ingen registrerte data i perioden.</td></tr>`}</tbody></table></div>`;
}
function graph(current, previous, key, title) {
  const values = [...current, ...previous || []].map((p) => p[key]).filter((v) => v !== null), max = Math.max(1, ...values), length = Math.max(2, current.length, previous?.length || 0);
  function lines(points, style) {
    const segments = [];
    let pointsText = [];
    points.forEach((p, i) => {
      if (p[key] === null) {
        if (pointsText.length) segments.push(pointsText.join(" "));
        pointsText = [];
      } else pointsText.push(`${40 + i / (length - 1) * 700},${170 - p[key] / max * 140}`);
    });
    if (pointsText.length) segments.push(pointsText.join(" "));
    return segments.map((s) => `<polyline points="${s}" fill="none" stroke="${style}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
  }
  return `<figure class="card bg-base-100 border border-base-300"><div class="card-body"><h3 class="card-title">${escape(title)}</h3><p class="graph-label">Skala: 0\u2013${escape(num(max))}</p><svg viewBox="0 0 780 190" role="img" aria-label="${escape(title)}. Se datatabellen under grafene."><path d="M40 25V175H750" fill="none" stroke="currentColor" opacity=".2"/>${lines(previous || [], "#8b99a7")}${lines(current, "#146b50")}</svg><div class="graph-dates"><span>${escape(current[0]?.date || "")}</span><span>${escape(current.at(-1)?.date || "")}</span></div></div></figure>`;
}
function renderDashboard(env, data, page, params) {
  const apiBase = env.DASHBOARD_API_BASE || "/admin";
  const sites = siteEnvironments(env);
  const selectedSites = params.get("site") ? sites.filter((s) => s.SITE_ID === params.get("site")) : sites;
  const connections = JSON.parse(env.DASHBOARD_CONNECTIONS_JSON || "null");
  const query = (patch = {}) => {
    const p = new URLSearchParams(params);
    p.delete("after");
    for (const [k, v] of Object.entries(patch)) p.set(k, String(v));
    return escape(p.toString());
  };
  const option = (name, value, label) => `<option value="${escape(value)}"${(params.get(name) || ({ period: "30d", compare: "none", grain: data.grain }[name] || "")) === value ? " selected" : ""}>${escape(label)}</option>`;
  const select = (label, name, options) => `<label class="fieldset"><span class="fieldset-legend">${label}</span><select class="select w-full" name="${name}">${options.map(([v, l]) => option(name, v, l)).join("")}</select></label>`;
  const input = (label, name, type = "text") => `<label class="fieldset"><span class="fieldset-legend">${label}</span><input class="input w-full" name="${name}" type="${type}" value="${escape(params.get(name) || "")}" maxlength="254"></label>`;
  const current = data.current, previous = data.previous;
  const stat = (label, value, detail) => `<div class="stat"><div class="stat-title">${label}</div><div class="stat-value">${escape(num(value))}</div><div class="stat-desc">${escape(detail)}</div></div>`;
  const breakdown = (caption, rows, campaign = false) => {
    const headers = campaign ? ["Kampanje", "Kilde / medium", "Sidevisninger", "Henvendelser", "Per 100 sidevisninger"] : ["Kilde / medium", "Kanal", "Sidevisninger", "Henvendelser", "Estimerte", "Per 100 sidevisninger"];
    if (previous) headers.push("Tidligere sidevisninger", "Tidligere henvendelser", "Endring sidevisninger", "Endring henvendelser");
    return table(caption, headers, rows.map((r) => {
      const cells = campaign ? [escape(r.campaign), escape(r.source + " / " + r.medium), num(r.hits), num(r.leads), num(r.ratio)] : [escape(r.source + " / " + (r.medium || "\u2013")), escape(r.channel), num(r.hits), num(r.leads), num(r.estimated), num(r.ratio)];
      if (previous) cells.push(num(r.previous_hits), num(r.previous_leads), r.delta_hits === null ? "Ikke sammenlignbar" : num(r.delta_hits), r.delta_leads === null ? "Ikke sammenlignbar" : num(r.delta_leads));
      return cells;
    }));
  };
  const next = page.next ? `<a class="btn" href="?${query({ after: page.next })}">Neste side med eldre henvendelser</a>` : "";
  return `<!doctype html><html lang="nb" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Henvendelser \xB7 ${escape(env.SITE_LABEL || env.SITE_ID)}</title><link rel="stylesheet" href="/admin/style.css"></head><body class="bg-base-200 text-base-content"><a class="skip-link" href="#main">G\xE5 til innhold</a>
<header class="border-b border-base-300 bg-base-100"><div class="shell header"><div><p class="eyebrow">Medon \xB7 privat oversikt</p><h1>Henvendelser og sidevisninger</h1><p>${escape(env.SITE_LABEL || env.SITE_ID)} \xB7 ${escape(data.timezone)}</p></div><span class="badge badge-outline">Cloudflare Access</span></div></header>
<main id="main" class="shell">${connections ? `<p class="alert" role="status">${selectedSites.map((s) => `${escape(s.SITE_LABEL)} \xB7 ${connections.includes(s.SITE_ID) ? "Henvendelser og bestillinger tilkoblet" : "Ikke tilkoblet"}`).join("<br>")}<br>Trafikkm\xE5ling er ikke aktivert.</p>` : ""}<form method="get" class="card bg-base-100 border border-base-300"><div class="card-body"><h2 class="card-title">Velg periode og utvalg</h2><div class="filters">
${select("Nettsted", "site", [["", "Alle nettsted i installasjonen"], ...siteEnvironments(env).map((s) => [s.SITE_ID, s.SITE_LABEL || s.SITE_ID])])}
${select("Periode", "period", [["30d", "Siste 30 dager"], ["90d", "Siste 90 dager"], ["6m", "Siste 6 m\xE5neder"], ["1y", "Siste \xE5r"]])}
${select("Sammenlign med", "compare", [["none", "Ingen"], ["previous", "Forrige periode"], ["year", "Samme periode i fjor"]])}
${select("Graf", "grain", [["week", "Uke"], ["month", "M\xE5ned"]])}${input("Kilde", "source")}${input("UTM-kampanje", "campaign")}${select("Skjema", "form", [["", "Alle skjemaer"], ...Object.entries(JSON.parse(env.FORMS_JSON)).map(([key, f]) => [key, f.label || key])])}
${input("Fra dato (valgfritt)", "start", "date")}${input("Til dato (valgfritt)", "end", "date")}${input("E-post (eksakt)", "email")}
${select("E-poststatus", "status", [["", "Alle statuser"], ["pending", "Venter"], ["accepted", "Akseptert av Resend"], ["retry", "Pr\xF8ver igjen"], ["dead_letter", "Avvist"], ["manual_review", "Krever oppf\xF8lging"]])}</div><div class="actions"><button class="btn btn-primary" type="submit">Vis utvalg</button><a class="btn btn-outline" href="${escape(apiBase)}/export?${query({ format: "csv" })}">Last ned CSV (inntil 100)</a><a class="btn btn-ghost" href="/admin/">Nullstill</a></div></div></form>
<p class="period-note">${escape(current.start)} til ${escape(current.end)} (sluttdato eksklusiv). ${current.partial ? "P\xE5g\xE5ende periode er ufullstendig." : ""} Oppdatert ${escape(data.generated_at)}.</p>
${data.history_note ? `<p class="alert" role="status">${escape(data.history_note)}</p>` : ""}
<section aria-label="N\xF8kkeltall" class="stats stats-vertical lg:stats-horizontal shadow-sm w-full">${stat("Sidevisninger", current.hits, "Kvalifiserte HTML-foresp\xF8rsler")}${stat("Henvendelser", current.leads, "Unike lagrede D1-kvitteringer")}${stat("Henvendelser per 100 sidevisninger", current.ratio, "Omtrentlig forholdstall")}${stat("Kilde ukjent", current.unknown_leads, "Henvendelser uten kjent kilde")}</section>
<p class="explanation">Sidevisninger teller HTML-svar. De er ikke unike bes\xF8kende eller \xF8kter. Kjente bots og forh\xE5ndslasting filtreres; ukjent automatisert trafikk kan v\xE6re med. ${params.get("form") ? "Forholdstallet bruker valgt skjema og alle sidevisninger i kildeutvalget." : ""} ${params.get("email") || params.get("status") ? "E-post-/statusfilter avgrenser henvendelser; sidevisninger viser hele kildeutvalget." : ""}</p>
${previous ? `<section class="card bg-base-100 border border-base-300"><div class="card-body"><h2 class="card-title">Sammenligning</h2><p>${escape(data.comparison_note)} ${!data.comparable ? "Endring beregnes bare med fullstendige, sammenlignbare perioder." : ""}</p>${table("Valgt og tidligere periode", ["Periode", "Sidevisninger", "Henvendelser", "Per 100 sidevisninger"], [[escape(current.start + " \u2013 " + current.end), num(current.hits), num(current.leads), num(current.ratio)], [escape(previous.start + " \u2013 " + previous.end), num(previous.hits), num(previous.leads), num(previous.ratio)]])}${data.comparable ? `<p>Endring: ${num(data.delta.hits.absolute)} sidevisninger (${num(data.delta.hits.percent)} %), ${num(data.delta.leads.absolute)} henvendelser (${num(data.delta.leads.percent)} %).</p>` : ""}</div></section>` : ""}
<section aria-labelledby="trend"><h2 id="trend">Utvikling per ${data.grain === "week" ? "uke" : "m\xE5ned"}</h2><p>Gr\xF8nn: valgt periode. Gr\xE5: sammenligningsperiode, med egne datoer i tabellen. F\xF8rste og siste b\xF8tte kan v\xE6re delvise.</p><div class="graphs">${graph(current.series, previous?.series, "hits", "Sidevisninger")}${graph(current.series, previous?.series, "leads", "Henvendelser")}${graph(current.series, previous?.series, "ratio", "Henvendelser per 100 sidevisninger")}</div><details class="collapse collapse-arrow bg-base-100 border border-base-300"><summary class="collapse-title">Vis tallene bak grafene</summary><div class="collapse-content">${table("Utvikling \xB7 valgt periode", ["Start p\xE5 uke / m\xE5ned", "Sidevisninger", "Henvendelser", "Per 100 sidevisninger"], current.series.map((r) => [escape(r.date), num(r.hits), num(r.leads), num(r.ratio)]))}${previous ? table("Utvikling \xB7 sammenligningsperiode", ["Start p\xE5 uke / m\xE5ned", "Sidevisninger", "Henvendelser", "Per 100 sidevisninger"], previous.series.map((r) => [escape(r.date), num(r.hits), num(r.leads), num(r.ratio)])) : ""}</div></details></section>
<section class="card bg-base-100 border border-base-300"><div class="card-body"><h2 class="card-title">Andel registrerte henvendelser per kanal</h2><p>Andel av ${num(current.leads)} unike D1-kvitteringer i utvalget. Registrert kilde dokumenterer ikke hvilket byr\xE5 som skapte henvendelsen. Estimater inng\xE5r og vises separat.</p>${(current.channels || []).map((c) => `<p>${escape(c.label)}: ${num(c.leads)} (${num(c.share)} %) \xB7 estimerte: ${num(c.estimated)}<br><meter min="0" max="100" value="${c.share}" aria-label="${escape(c.label)}: ${num(c.share)} prosent">${num(c.share)} %</meter></p>`).join("")}<h2 class="card-title">Kilder og kampanjer</h2><p>Direkte registrert: ${num(current.observed_leads)}. Estimert IP-treff: ${num(current.estimated_leads)}. Ukjent: ${num(current.unknown_leads)}. Nettleserrapporterte verdier bekrefter ikke betalte klikk eller salg.</p>${breakdown("Kilder", current.sources)}${breakdown("UTM-kampanjer", current.campaigns, true)}${table("Ukjent trafikk per uke", ["Ukestart (mandag)", "Sidevisninger"], current.unknown_weekly.map((r) => [escape(r.date), num(r.hits)]))}</div></section>
<section class="card bg-base-100 border border-base-300"><div class="card-body"><h2 class="card-title">Lagrede henvendelser</h2><p>E-poststatus \xABaccepted\xBB betyr akseptert av Resend. Ikke bekreftet levert i innboksen. Nyeste f\xF8rst; 100 per side.</p>
${table("Henvendelser i utvalget", ["Tidspunkt / nettsted", "Kontakt / skjema", "Kilde / kampanje", "Attribusjon", "E-post / detaljer"], page.receipts.map((row) => [
    escape(new Intl.DateTimeFormat("nb-NO", { timeZone: data.timezone, dateStyle: "short", timeStyle: "short" }).format(new Date(row.created_at_ms))) + "<br>" + escape(row.site_id),
    `${escape(row.payload.name || row.payload.email)}<br>${escape(row.payload.email)}<br>${escape(row.payload.phone || "")}<br>${escape(row.intent)}`,
    `${escape(row.source)} / ${escape(row.medium)}<br>${escape(row.campaign || "Ikke satt")}`,
    `<span class="badge badge-outline">${escape(method(row.attribution_method))}</span>`,
    `${escape(row.notification_status)}<details><summary>Vis henvendelsen</summary><pre>${escape(JSON.stringify(row.payload, null, 2))}</pre><p>Referanse: ${escape(row.id)}. Fors\xF8k: ${num(row.notification_attempts)}. ${escape(row.last_error || "")}</p></details>`
  ]))}${next}</div></section><footer><p>Attribusjonsmodell ${escape(data.policy_version)}. IP-estimater er ikke bekreftede annonseklikk. Ingen konverteringsintegrasjon er aktivert.</p></footer></main></body></html>`;
}

// src/store.mjs
function csv(rows) {
  const fields = ["id", "site_id", "intent", "created_at_ms", "email", "name", "phone", "website", "package", "message", "source", "medium", "channel", "campaign", "attribution_method", "notification_status", "notification_attempts", "resend_message_id", "last_error"];
  const privateFields = /* @__PURE__ */ new Set(["site", "form", "source", "gclid", "gbraid", "wbraid", "oppref"]);
  const extra = [...new Set(rows.flatMap((row) => Object.keys(row.payload || JSON.parse(row.payload_json)).filter((key) => !fields.includes(key) && !privateFields.has(key))))].sort();
  fields.push(...extra);
  const cell = (value) => {
    let text = String(value ?? "");
    if (/^[\s]*[=+@-]|^[\t\r\n]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  return [fields, ...rows.map((row) => {
    const values = { ...row.payload || JSON.parse(row.payload_json), ...row };
    return fields.map((f) => values[f]);
  })].map((row) => row.map(cell).join(",")).join("\r\n") + "\r\n";
}

// generated/admin.css
var admin_default = `/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-black:#000;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}:where(:root),:root:has(input.theme-controller[value=light]:checked),[data-theme=light]{color-scheme:light;--color-base-100:oklch(100% 0 0);--color-base-200:oklch(98% 0 0);--color-base-300:oklch(95% 0 0);--color-base-content:oklch(21% .006 285.885);--color-primary:oklch(45% .24 277.023);--color-primary-content:oklch(93% .034 272.788);--color-secondary:oklch(65% .241 354.308);--color-secondary-content:oklch(94% .028 342.258);--color-accent:oklch(77% .152 181.912);--color-accent-content:oklch(38% .063 188.416);--color-neutral:oklch(14% .005 285.823);--color-neutral-content:oklch(92% .004 286.32);--color-info:oklch(74% .16 232.661);--color-info-content:oklch(29% .066 243.157);--color-success:oklch(76% .177 163.223);--color-success-content:oklch(37% .077 168.94);--color-warning:oklch(82% .189 84.429);--color-warning-content:oklch(41% .112 45.904);--color-error:oklch(71% .194 13.428);--color-error-content:oklch(27% .105 12.094);--radius-selector:.5rem;--radius-field:.25rem;--radius-box:.5rem;--size-selector:.25rem;--size-field:.25rem;--border:1px;--depth:1;--noise:0}:root,[data-theme]{background-color:var(--root-bg);color:var(--color-base-content)}:root{background-color:var(--page-scroll-bg,var(--root-bg))}:where(:root,[data-theme]){--root-bg:var(--color-base-100)}:root{--fx-noise:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.34' numOctaves='4' stitchTiles='stitch'%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23a)' opacity='0.2'%3E%3C/rect%3E%3C/svg%3E");--page-has-backdrop:var(--page-scroll-lock) 1;--page-scroll-bg:var(--page-scroll-lock) var(--root-bg,#0000)}@supports (color:color-mix(in lab, red, red)){:root{--page-scroll-bg:var(--page-scroll-lock) color-mix(in srgb, var(--root-bg,#0000), oklch(0% 0 0) calc(var(--page-has-backdrop,0) * 40%))}}:root{background-image:var(--page-scroll-lock) linear-gradient(var(--root-bg,#0000), var(--root-bg,#0000));transition:var(--page-scroll-lock) background-color .3s ease-out;animation:var(--page-scroll-lock) set-page-has-scroll forwards;animation-timeline:var(--page-scroll-lock) scroll();--page-has-scroll:initial;scrollbar-gutter:var(--page-has-scroll) var(--page-scroll-lock) stable}@keyframes set-page-has-scroll{0%,to{--page-has-scroll: }}@property --radialprogress{syntax:"<percentage>";inherits:true;initial-value:0%}@property --aura-angle{syntax:"<angle>";inherits:false;initial-value:0deg}:root{scrollbar-color:currentColor #0000}@supports (color:color-mix(in lab, red, red)){:root{scrollbar-color:color-mix(in oklch, currentColor 35%, #0000) #0000}}:root{--page-scroll-lock:initial;--page-overflow:var(--page-scroll-lock) hidden}:root:not(span){overflow:var(--page-overflow)}}@layer components;@layer utilities{@layer daisyui.l1.l2.l3{.collapse-title{grid-row-start:1;grid-column-start:1;width:100%;min-height:1lh;padding:1rem;padding-inline-end:3rem;transition:background-color .2s ease-out;position:relative}:where(.btn){width:unset}.btn{--size:calc(var(--size-field,.25rem) * 10);--btn-p:1rem;--btn-fg:var(--color-base-content);cursor:pointer;text-align:center;vertical-align:middle;outline-offset:2px;webkit-user-select:none;-webkit-user-select:none;user-select:none;border-width:var(--border);touch-action:manipulation;--btn-bg:var(--btn-color,var(--color-base-200));--btn-border:var(--btn-color,var(--color-base-200));border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field));flex-wrap:nowrap;flex-shrink:0;justify-content:center;align-items:center;gap:.375rem;font-weight:600;transition-property:color,background-color,border-color,box-shadow,transform;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);display:inline-flex}@supports (color:color-mix(in lab, red, red)){.btn{--btn-border:color-mix(in oklab, var(--btn-color,var(--color-base-200)), #000 calc(var(--depth) * 5%))}}.btn{--btn-soft-bg:initial;--btn-shadow:0 3px 2px -2px var(--btn-bg), 0 4px 3px -2px var(--btn-bg)}@supports (color:color-mix(in lab, red, red)){.btn{--btn-shadow:0 3px 2px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000), 0 4px 3px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000)}}.btn{--btn-inset:0 .5px 0 .5px oklch(100% 0 0 / calc(var(--depth) * 6%));height:var(--size);padding-inline:var(--btn-p);font-size:var(--fontsize,.875rem);background-color:var(--btn-bg);color:var(--btn-fg);border-color:var(--btn-border);border-style:var(--btn-border-style,solid);outline-color:var(--btn-color,var(--color-base-content));--tw-prose-links:var(--btn-fg);background-image:none, var(--fx-noise);background-size:auto, calc(var(--noise,0) * 100%);text-shadow:0 .5px oklch(100% 0 0 / calc(var(--depth) * .15));box-shadow:var(--btn-inset) inset, var(--btn-shadow)}.btn:is([type=checkbox],[type=radio]){appearance:none}.btn:is([type=checkbox],[type=radio])[aria-label]:after{--tw-content:attr(aria-label);content:var(--tw-content)}.btn:where(:checked:not(.filter [type=radio].btn)){--btn-color:var(--color-primary);--btn-fg:var(--color-primary-content)}.collapse-content{--overflow-delay:0s;content-visibility:hidden;min-height:0;cursor:unset;grid-row-start:2;grid-column-start:1;padding-left:1rem;padding-right:1rem;overflow:clip}@supports not (content-visibility:hidden){.collapse-content{visibility:hidden}}@media (prefers-reduced-motion:no-preference){.collapse-content{transition:overflow .2s allow-discrete var(--overflow-delay), content-visibility .2s allow-discrete, visibility .2s allow-discrete, min-height .2s ease-out allow-discrete, padding .1s ease-out 20ms, background-color .2s ease-out}}details>.collapse-content{content-visibility:visible}.input{appearance:none;background-color:var(--color-base-100);vertical-align:middle;white-space:nowrap;--size:calc(var(--size-field,.25rem) * var(--in-size-mul,10));--input-color:var(--color-base-content);flex-shrink:1;align-items:center;gap:.5rem;padding-inline:.75rem;display:inline-flex;position:relative}@supports (color:color-mix(in lab, red, red)){.input{--input-color:color-mix(in oklab, var(--color-base-content) 20%, #0000)}}.input{cursor:text;width:clamp(3rem,20rem,100%);height:var(--size);font-size:max(var(--font-size,0rem), var(--font-size-min,.875rem));touch-action:manipulation;border:var(--border) solid var(--input-color,#0000);box-shadow:0 1px var(--input-color) inset, 0 -1px oklch(100% 0 0 / calc(var(--depth) * .1)) inset;border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field))}@supports (color:color-mix(in lab, red, red)){.input{box-shadow:0 1px color-mix(in oklab, var(--input-color) calc(var(--depth) * 10%), #0000) inset, 0 -1px oklch(100% 0 0 / calc(var(--depth) * .1)) inset}}.input input{appearance:none;background-color:#0000;border:none;width:100%;height:100%}.input input::placeholder{color:var(--color-base-content);opacity:.5}.input input:focus,.input input:focus-within{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.input input:focus,.input input:focus-within{outline-offset:2px;outline:2px solid #0000}}.input input::-webkit-calendar-picker-indicator{inset-inline-end:-.15em}.input::-webkit-inner-spin-button{margin-inline-end:-10px}.input::-webkit-calendar-picker-indicator{inset-inline-end:.75em}input.input{text-align:start;display:inline-flex;position:relative}input.input[type=url],input.input[type=tel],input.input[type=email],input.input[type=number]{direction:ltr}input.input::-webkit-datetime-edit{min-height:100%;text-align:inherit;align-items:center;display:grid}input.input::-webkit-date-and-time-value{min-height:100%;text-align:inherit;align-items:center;display:grid}input.input::-webkit-inner-spin-button{margin-block:calc(.25rem * var(--spin-my,-3))}input.input::-webkit-calendar-picker-indicator{cursor:pointer;width:1em;height:1em;position:absolute}input.input::-webkit-color-swatch-wrapper{padding-block:.25rem}.input input{text-align:start;display:inline-flex;position:relative}.input input[type=url],.input input[type=tel],.input input[type=email],.input input[type=number]{direction:ltr}.input input::-webkit-datetime-edit{min-height:100%;text-align:inherit;align-items:center;display:grid}.input input::-webkit-date-and-time-value{min-height:100%;text-align:inherit;align-items:center;display:grid}.input input::-webkit-inner-spin-button{margin-block:calc(.25rem * var(--spin-my,-3))}.input input::-webkit-calendar-picker-indicator{cursor:pointer;width:1em;height:1em;position:absolute}.input input::-webkit-color-swatch-wrapper{padding-block:.25rem}.input:focus{--input-color:var(--color-base-content);box-shadow:0 1px var(--input-color)}@supports (color:color-mix(in lab, red, red)){.input:focus{box-shadow:0 1px color-mix(in oklab, var(--input-color) calc(var(--depth) * 10%), #0000)}}.input:focus{outline:2px solid var(--input-color);outline-offset:2px}@media (pointer:coarse){@supports (-webkit-touch-callout:none){.input:focus{--font-size:1rem}}}.input:focus-within{--input-color:var(--color-base-content);box-shadow:0 1px var(--input-color)}@supports (color:color-mix(in lab, red, red)){.input:focus-within{box-shadow:0 1px color-mix(in oklab, var(--input-color) calc(var(--depth) * 10%), #0000)}}.input:focus-within{outline:2px solid var(--input-color);outline-offset:2px}@media (pointer:coarse){@supports (-webkit-touch-callout:none){.input:focus-within{--font-size:1rem}}}.table{border-collapse:separate;--tw-border-spacing-x:0px;--tw-border-spacing-y:0px;width:100%;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-radius:var(--radius-box);text-align:left;font-size:.875rem;position:relative}.table:where(:dir(rtl),[dir=rtl],[dir=rtl] *){text-align:right}@media (hover:hover){:is(:is(.table tr.row-hover),.table tr.row-hover:nth-child(2n)):hover{background-color:var(--color-base-200)}}.table :where(th,td){vertical-align:middle;padding-block:.75rem;padding-inline:1rem}.table :where(thead,tfoot){white-space:nowrap;color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.table :where(thead,tfoot){color:color-mix(in oklab, var(--color-base-content) 60%, transparent)}}.table :where(thead,tfoot){font-size:.875rem;font-weight:600}.table :where(tfoot tr:first-child :is(td,th)){border-top:var(--border) solid var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.table :where(tfoot tr:first-child :is(td,th)){border-top:var(--border) solid color-mix(in oklch, var(--color-base-content) 5%, #0000)}}.table :where(.table-pin-rows thead){z-index:1;position:sticky;top:0}.table :where(.table-pin-rows tfoot){z-index:1;position:sticky;bottom:0}.table :where(.table-pin-rows :is(thead,tfoot) tr){background-color:var(--color-base-100)}.table :where(.table-pin-cols tr th){background-color:var(--color-base-100);position:sticky;left:0;right:0}.table :where(thead tr :is(td,th),tbody tr:not(:last-child) :is(td,th)){border-bottom:var(--border) solid var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.table :where(thead tr :is(td,th),tbody tr:not(:last-child) :is(td,th)){border-bottom:var(--border) solid color-mix(in oklch, var(--color-base-content) 5%, #0000)}}.select{appearance:none;background-color:var(--color-base-100);vertical-align:middle;--size:calc(var(--size-field,.25rem) * var(--sl-size-mul,10));--input-color:var(--color-base-content);flex-shrink:1;align-items:center;gap:.375rem;padding-inline:.75rem 1.75rem;display:inline-flex;position:relative}@supports (color:color-mix(in lab, red, red)){.select{--input-color:color-mix(in oklab, var(--color-base-content) 20%, #0000)}}.select{width:clamp(3rem,20rem,100%);height:var(--size);font-size:max(var(--font-size,0rem), var(--font-size-min,.875rem));touch-action:manipulation;white-space:nowrap;text-overflow:ellipsis;border:var(--border) solid var(--input-color,#0000);box-shadow:0 1px var(--input-color) inset, 0 -1px oklch(100% 0 0 / calc(var(--depth) * .1)) inset;background-image:linear-gradient(45deg,#0000 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,#0000 50%);background-position:calc(100% - 20px) calc(1px + 50%),calc(100% - 16.1px) calc(1px + 50%);background-repeat:no-repeat;background-size:4px 4px,4px 4px;border-start-start-radius:var(--join-ss,var(--radius-field));border-start-end-radius:var(--join-se,var(--radius-field));border-end-end-radius:var(--join-ee,var(--radius-field));border-end-start-radius:var(--join-es,var(--radius-field));overflow:hidden}@supports (color:color-mix(in lab, red, red)){.select{box-shadow:0 1px color-mix(in oklab, var(--input-color) calc(var(--depth) * 10%), #0000) inset, 0 -1px oklch(100% 0 0 / calc(var(--depth) * .1)) inset}}[dir=rtl] .select{background-position:12px calc(1px + 50%),16px calc(1px + 50%)}.select[multiple]{background-image:none;height:auto;padding-block:.75rem;padding-inline-end:.75rem;overflow:auto}.select select{appearance:none;width:calc(100% + 2.75rem);height:calc(100% - calc(var(--border) * 2));background:inherit;border-radius:inherit;border-style:none;align-items:center;margin-inline:-.75rem -1.75rem;padding-inline:.75rem 1.75rem}.select select::placeholder{color:var(--color-base-content);opacity:.5}.select select:focus,.select select:focus-within{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.select select:focus,.select select:focus-within{outline-offset:2px;outline:2px solid #0000}}.select select:not(:last-child){background-image:none;margin-inline-end:-1.375rem}.select:focus{--input-color:var(--color-base-content);box-shadow:0 1px var(--input-color)}@supports (color:color-mix(in lab, red, red)){.select:focus{box-shadow:0 1px color-mix(in oklab, var(--input-color) calc(var(--depth) * 10%), #0000)}}.select:focus{outline:2px solid var(--input-color);outline-offset:2px}.select:focus-within{--input-color:var(--color-base-content);box-shadow:0 1px var(--input-color)}@supports (color:color-mix(in lab, red, red)){.select:focus-within{box-shadow:0 1px color-mix(in oklab, var(--input-color) calc(var(--depth) * 10%), #0000)}}.select:focus-within{outline:2px solid var(--input-color);outline-offset:2px}.select:open{--input-color:var(--color-base-content);box-shadow:0 1px var(--input-color)}@supports (color:color-mix(in lab, red, red)){.select:open{box-shadow:0 1px color-mix(in oklab, var(--input-color) calc(var(--depth) * 10%), #0000)}}.select:open{outline:2px solid var(--input-color);outline-offset:2px;background-image:linear-gradient(135deg,#0000 50%,currentColor 50%),linear-gradient(45deg,currentColor 50%,#0000 50%)}@supports (appearance:base-select){:is(.select,.select select){appearance:base-select}:is(.select,.select select)::picker(select){appearance:base-select}}:is(.select,.select select)::picker(select){color:inherit;border:var(--border) solid var(--color-base-200);border-radius:var(--radius-box);background-color:inherit;max-height:min(24rem,70dvh);box-shadow:0 2px calc(var(--depth) * 3px) -2px oklch(0% 0 0/.2);box-shadow:0 20px 25px -5px rgb(0 0 0/calc(var(--depth) * .1)), 0 8px 10px -6px rgb(0 0 0/calc(var(--depth) * .1));margin-block:.5rem;margin-inline:.5rem;padding:.5rem;translate:-.5rem}:is(.select,.select select)::picker-icon{display:none}:is(.select,.select select) selectedcontent{text-overflow:ellipsis;white-space:nowrap;width:100%;overflow:hidden}:is(.select,.select select) optgroup{padding-top:.5em}:is(.select,.select select) optgroup option:first-child{margin-top:.5em}@supports (color:color-mix(in lab, red, red)){:is(.select,.select select) option:not(:disabled):hover,:is(.select,.select select) option:not(:disabled):focus-visible{background-color:color-mix(in oklab, var(--color-base-content) 10%, transparent)}}@media (forced-colors:active){:is(.select,.select select) option:not(:disabled):hover,:is(.select,.select select) option:not(:disabled):focus-visible{outline-offset:2px;outline:2px solid #0000}}:is(.select,.select select) option{border-radius:var(--radius-field);padding-block:.375rem;padding-inline:calc(.25rem * var(--option-px,3));white-space:normal;transition-property:color,background-color;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1)}:is(.select,.select select) option:not(:disabled):hover,:is(.select,.select select) option:not(:disabled):focus-visible{cursor:pointer;background-color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){:is(.select,.select select) option:not(:disabled):hover,:is(.select,.select select) option:not(:disabled):focus-visible{background-color:color-mix(in oklab, var(--color-base-content) 10%, transparent)}}:is(.select,.select select) option:not(:disabled):hover,:is(.select,.select select) option:not(:disabled):focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){:is(.select,.select select) option:not(:disabled):hover,:is(.select,.select select) option:not(:disabled):focus-visible{outline-offset:2px;outline:2px solid #0000}}:is(.select,.select select) option:not(:disabled):active{background-color:var(--color-neutral);color:var(--color-neutral-content);box-shadow:0 2px calc(var(--depth) * 3px) -2px var(--color-neutral)}[dir=rtl] .select::picker(select){translate:.5rem}[dir=rtl] .select select::picker(select){translate:.5rem}.card-body{padding:var(--card-p,1.5rem);font-size:var(--card-fs,.875rem);flex-direction:column;flex:auto;gap:.5rem;display:flex}.card{border-radius:var(--radius-box);outline-offset:2px;outline:2px solid #0000;flex-direction:column;transition:outline .2s ease-in-out;display:flex;position:relative}.card:focus-visible,.card[aria-checked=true],.card:has(>:checked,>:is([type=checkbox],[type=radio]):focus-visible){outline-color:currentColor}.card:has(>:checked:focus-visible),.card[aria-checked=true]:focus-visible,.card[aria-checked=true]:has(>:is([type=checkbox],[type=radio]):focus-visible){outline-width:4px}.card:has(>:is([type=checkbox],[type=radio])){cursor:pointer;-webkit-user-select:none;user-select:none}.card>:is([type=checkbox],[type=radio]){appearance:none}.stats{border-radius:var(--radius-box);grid-auto-flow:column;display:inline-grid;position:relative;overflow-x:auto}.stat-value{white-space:nowrap;grid-column-start:1;font-size:2rem;font-weight:800}.stat-desc{white-space:nowrap;color:var(--color-base-content);grid-column-start:1}@supports (color:color-mix(in lab, red, red)){.stat-desc{color:color-mix(in oklab, var(--color-base-content) 60%, transparent)}}.stat-desc{font-size:.75rem}.stat-title{white-space:nowrap;color:var(--color-base-content);grid-column-start:1}@supports (color:color-mix(in lab, red, red)){.stat-title{color:color-mix(in oklab, var(--color-base-content) 60%, transparent)}}.stat-title{font-size:.75rem}@supports (color:color-mix(in lab, red, red)){.label:is(.input>*,.select>*):first-child{border-inline-end:var(--border) solid color-mix(in oklab, currentColor 10%, #0000)}}@supports (color:color-mix(in lab, red, red)){.label:is(.input>*,.select>*):last-child{border-inline-start:var(--border) solid color-mix(in oklab, currentColor 10%, #0000)}}.label:is(.input>*,.select>*){white-space:nowrap;height:calc(100% - .5rem);font-size:inherit;align-items:center;padding-inline:.75rem;display:flex}.label:is(.input>*,.select>*):first-child{border-inline-end:var(--border) solid currentColor;margin-inline:-.75rem .75rem}@supports (color:color-mix(in lab, red, red)){.label:is(.input>*,.select>*):first-child{border-inline-end:var(--border) solid color-mix(in oklab, currentColor 10%, #0000)}}.label:is(.input>*,.select>*):last-child{border-inline-start:var(--border) solid currentColor;margin-inline:.75rem -.75rem}@supports (color:color-mix(in lab, red, red)){.label:is(.input>*,.select>*):last-child{border-inline-start:var(--border) solid color-mix(in oklab, currentColor 10%, #0000)}}.fieldset-legend{color:var(--color-base-content);margin-bottom:-.25rem;justify-content:space-between;align-items:center;gap:.5rem;margin-inline-end:auto;padding-block:.5rem;font-weight:600;display:flex}.status{aspect-ratio:1;border-radius:var(--radius-selector);background-color:var(--color-base-content);display:inline-block}@supports (color:color-mix(in lab, red, red)){.status{background-color:color-mix(in oklab, var(--color-base-content) 20%, transparent)}}.status{vertical-align:middle;color:#0000004d;background-position:50%;background-repeat:no-repeat}@supports (color:color-mix(in lab, red, red)){.status{color:color-mix(in oklab, var(--color-black) 30%, transparent)}}.status{--size:calc(var(--size-selector,.25rem) * 2);width:var(--size);height:var(--size);background-image:radial-gradient(circle at 35% 30%, oklch(1 0 0 / calc(var(--depth) * .5)), #0000);box-shadow:0 2px 3px -1px}@supports (color:color-mix(in lab, red, red)){.status{box-shadow:0 2px 3px -1px color-mix(in oklab, currentColor calc(var(--depth) * 100%), #0000)}}.badge{border-radius:var(--radius-selector);vertical-align:middle;color:var(--badge-fg);border:var(--border) solid var(--badge-color,var(--color-base-200));background-size:auto, calc(var(--noise) * 100%);background-image:none, var(--fx-noise);background-color:var(--badge-bg);--badge-bg:var(--badge-color,var(--color-base-100));--badge-fg:var(--color-base-content);--size:calc(var(--size-selector,.25rem) * 6);width:fit-content;height:var(--size);padding-inline:calc(var(--size) / 2 - var(--border));flex-shrink:0;justify-content:center;align-items:center;gap:.5rem;font-size:.875rem;display:inline-flex}.stat{grid-template-columns:repeat(1,1fr);column-gap:1rem;width:100%;padding-block:1rem;padding-inline:1.5rem;display:inline-grid}.stat:not(:last-child){border-inline-end:var(--border) dashed currentColor}@supports (color:color-mix(in lab, red, red)){.stat:not(:last-child){border-inline-end:var(--border) dashed color-mix(in oklab, currentColor 10%, #0000)}}.stat:not(:last-child){border-block-end:none}.fieldset{grid-template-columns:1fr;grid-auto-rows:max-content;gap:.375rem;padding-block:.25rem;font-size:.75rem;display:grid}.card-title{font-size:var(--cardtitle-fs,1.125rem);align-items:center;gap:.5rem;font-weight:600;display:flex}.btn-outline{--btn-bg:#0000;color:var(--btn-rest-fg,var(--btn-color,var(--color-base-content)));--btn-border:var(--btn-color,var(--color-base-content));--btn-border-style:solid;--btn-inset:0 0 0 0 oklch(0% 0 0/0);--btn-shadow:0 0 0 0 oklch(0% 0 0/0);background-image:none}.btn-ghost{--btn-bg:#0000;color:var(--btn-rest-fg,var(--btn-color,var(--color-base-content,currentColor)));--btn-border:#0000;--btn-inset:0 0 0 0 oklch(0% 0 0/0);--btn-shadow:0 0 0 0 oklch(0% 0 0/0);background-image:none}.aura:has(>.checkbox,>.toggle,>.badge){--aura-radius:var(--radius-selector)}.aura:has(>.card,>.alert){--aura-radius:var(--radius-box)}.aura:has(>.btn,>.input,>.select){--aura-radius:var(--radius-field)}.collapse:not(td,tr,colgroup){border-radius:var(--radius-box,1rem);isolation:isolate;grid-template-rows:max-content 0fr;grid-template-columns:minmax(0,1fr);width:100%;display:grid;position:relative}@media (prefers-reduced-motion:no-preference){.collapse:not(td,tr,colgroup){transition:grid-template-rows .2s}}.collapse:not(td,tr,colgroup)>input:is([type=checkbox],[type=radio]){appearance:none;opacity:0;z-index:1;grid-row-start:1;grid-column-start:1;width:100%;min-height:1lh;padding:1rem;padding-inline-end:3rem;transition:background-color .2s ease-out}.collapse:not(td,tr,colgroup):is([open],[tabindex]:focus:not(.collapse-close),[tabindex]:focus-within:not(.collapse-close)),.collapse:not(td,tr,colgroup):not(.collapse-close):has(>input:is([type=checkbox],[type=radio]):checked){grid-template-rows:max-content 1fr}.collapse:not(td,tr,colgroup):is([open],[tabindex]:focus:not(.collapse-close),[tabindex]:focus-within:not(.collapse-close))>.collapse-content,.collapse:not(td,tr,colgroup):not(.collapse-close)>:where(input:is([type=checkbox],[type=radio]):checked~.collapse-content){--overflow-delay:.2s;overflow:revert-layer;content-visibility:visible;min-height:fit-content}@supports not (content-visibility:visible){.collapse:not(td,tr,colgroup):is([open],[tabindex]:focus:not(.collapse-close),[tabindex]:focus-within:not(.collapse-close))>.collapse-content,.collapse:not(td,tr,colgroup):not(.collapse-close)>:where(input:is([type=checkbox],[type=radio]):checked~.collapse-content){visibility:visible}}.collapse:not(td,tr,colgroup):focus-visible,.collapse:not(td,tr,colgroup):has(>input:is([type=checkbox],[type=radio]):focus-visible),.collapse:not(td,tr,colgroup):has(summary:focus-visible){outline-color:var(--color-base-content);outline-offset:2px;outline-width:2px;outline-style:solid}.collapse:not(td,tr,colgroup):not(.collapse-close)>input[type=checkbox],.collapse:not(td,tr,colgroup):not(.collapse-close)>input[type=radio]:not(:checked),.collapse:not(td,tr,colgroup):not(.collapse-close)>.collapse-title{cursor:pointer}:is(.collapse:not(td,tr,colgroup)[tabindex]:focus:not(.collapse-close,.collapse[open]),.collapse:not(td,tr,colgroup)[tabindex]:focus-within:not(.collapse-close,.collapse[open]))>.collapse-title{cursor:unset}.collapse:not(td,tr,colgroup):is([open],[tabindex]:focus:not(.collapse-close),[tabindex]:focus-within:not(.collapse-close))>:where(.collapse-content),.collapse:not(td,tr,colgroup):not(.collapse-close)>:where(input:is([type=checkbox],[type=radio]):checked~.collapse-content){padding-bottom:1rem}.collapse:not(td,tr,colgroup):is(details){width:100%}.collapse:not(td,tr,colgroup):is(details)::details-content{--overflow-delay:0s;height:0;overflow:clip}.collapse:not(td,tr,colgroup):is(details):where([open])::details-content{overflow:revert-layer;height:auto}@media (prefers-reduced-motion:no-preference){.collapse:not(td,tr,colgroup):is(details)::details-content{transition:overflow .2s allow-discrete var(--overflow-delay), content-visibility .2s allow-discrete, visibility .2s allow-discrete, min-height .2s ease-out allow-discrete, padding .1s ease-out 20ms, background-color .2s ease-out, height .2s;interpolate-size:allow-keywords}.collapse:not(td,tr,colgroup):is(details):where([open])::details-content{--overflow-delay:.2s}}.collapse:not(td,tr,colgroup):is(details)>summary{outline:none;display:block;position:relative}.collapse:not(td,tr,colgroup):is(details)>summary::-webkit-details-marker{display:none}.alert{--alert-border-color:var(--color-base-200);border-radius:var(--radius-box);color:var(--color-base-content);background-color:var(--alert-color,var(--color-base-200));text-align:start;background-size:auto, calc(var(--noise) * 33%);background-image:none, var(--fx-noise);box-shadow:0 3px 0 -2px oklch(100% 0 0 / calc(var(--depth) * .08)) inset, 0 1px #000, 0 4px 3px -2px oklch(0% 0 0 / calc(var(--depth) * .08));border-style:solid;grid-template-columns:auto;grid-auto-flow:column;justify-content:start;place-items:center start;gap:1rem;padding-block:.75rem;padding-inline:1rem;font-size:.875rem;line-height:1.25rem;display:grid}@supports (color:color-mix(in lab, red, red)){.alert{box-shadow:0 3px 0 -2px oklch(100% 0 0 / calc(var(--depth) * .08)) inset, 0 1px color-mix(in oklab, color-mix(in oklab, #000 20%, var(--alert-color,var(--color-base-200))) calc(var(--depth) * 20%), #0000), 0 4px 3px -2px oklch(0% 0 0 / calc(var(--depth) * .08))}}.alert:has(>:nth-child(2)){grid-template-columns:auto minmax(auto,1fr)}}@layer daisyui.l1.l2{@media (prefers-reduced-motion:no-preference){.collapse-arrow>.collapse-title:after{transition-property:all;transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1)}}.collapse-plus>.collapse-title:after{width:.5rem;height:.5rem;display:block;position:absolute}@media (prefers-reduced-motion:no-preference){.collapse-plus>.collapse-title:after{transition-property:all;transition-duration:.3s;transition-timing-function:cubic-bezier(.4,0,.2,1)}}.collapse-plus>.collapse-title:after{--tw-content:"+";content:var(--tw-content);pointer-events:none;top:.9rem;inset-inline-end:1.4rem}.collapse-arrow>.collapse-title:after{width:.5rem;height:.5rem;display:block;position:absolute;transform:translateY(-100%)rotate(45deg)}@media (prefers-reduced-motion:no-preference){.collapse-arrow>.collapse-title:after{transition-property:all;transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1)}}.collapse-arrow>.collapse-title:after{content:"";transform-origin:75% 75%;pointer-events:none;top:50%;inset-inline-end:1.4rem;box-shadow:2px 2px}.btn:is([aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-bg:var(--btn-color,var(--color-base-200))}@supports (color:color-mix(in lab, red, red)){.btn:is([aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-bg:color-mix(in oklab, var(--btn-color,var(--color-base-200)), #000 5%)}}.btn:is([aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){color:var(--btn-fg,var(--color-base-content));--btn-border:var(--btn-color,var(--color-base-200))}@supports (color:color-mix(in lab, red, red)){.btn:is([aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-border:color-mix(in oklab, var(--btn-color,var(--color-base-200)), #000 7%)}}.btn:is([aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-border-style:solid;--btn-inset:0 0 0 0 oklch(0% 0 0/0);--btn-shadow:0 0 0 0 oklch(0% 0 0/0);isolation:isolate}.collapse-open>.collapse-content{--overflow-delay:.2s;overflow:revert-layer;content-visibility:visible;min-height:fit-content;padding-bottom:1rem}@supports not (content-visibility:visible){.collapse-open>.collapse-content{visibility:visible}}.input:has(>input[disabled]){cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200)}.input:has(>input[disabled]):is(input),.input:has(>input[disabled]) :is(input){color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.input:has(>input[disabled]):is(input),.input:has(>input[disabled]) :is(input){color:color-mix(in oklab, var(--color-base-content) 40%, transparent)}}.input:has(>input[disabled]){box-shadow:none}.input:has(>input[disabled])::placeholder,.input:has(>input[disabled]) ::placeholder{color:var(--color-base-content);opacity:.2}.input:is(:disabled,[disabled]){cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200)}.input:is(:disabled,[disabled]):is(input),.input:is(:disabled,[disabled]) :is(input){color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.input:is(:disabled,[disabled]):is(input),.input:is(:disabled,[disabled]) :is(input){color:color-mix(in oklab, var(--color-base-content) 40%, transparent)}}.input:is(:disabled,[disabled]){box-shadow:none}.input:is(:disabled,[disabled])::placeholder,.input:is(:disabled,[disabled]) ::placeholder{color:var(--color-base-content);opacity:.2}fieldset:disabled .input{cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200)}fieldset:disabled .input:is(input),fieldset:disabled .input :is(input){color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){fieldset:disabled .input:is(input),fieldset:disabled .input :is(input){color:color-mix(in oklab, var(--color-base-content) 40%, transparent)}}fieldset:disabled .input{box-shadow:none}fieldset:disabled .input::placeholder,fieldset:disabled .input ::placeholder{color:var(--color-base-content);opacity:.2}.input:has(>input[disabled])>input[disabled]{cursor:not-allowed}.select:has(>select[disabled]){cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200)}.select:has(>select[disabled]):is(select),.select:has(>select[disabled]) :is(select){color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.select:has(>select[disabled]):is(select),.select:has(>select[disabled]) :is(select){color:color-mix(in oklab, var(--color-base-content) 40%, transparent)}}.select:has(>select[disabled]){box-shadow:none}.select:has(>select[disabled])::placeholder,.select:has(>select[disabled]) ::placeholder{color:var(--color-base-content);opacity:.2}.select:is(:disabled,[disabled]){cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200)}.select:is(:disabled,[disabled]):is(select),.select:is(:disabled,[disabled]) :is(select){color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.select:is(:disabled,[disabled]):is(select),.select:is(:disabled,[disabled]) :is(select){color:color-mix(in oklab, var(--color-base-content) 40%, transparent)}}.select:is(:disabled,[disabled]){box-shadow:none}.select:is(:disabled,[disabled])::placeholder,.select:is(:disabled,[disabled]) ::placeholder{color:var(--color-base-content);opacity:.2}fieldset:disabled .select{cursor:not-allowed;border-color:var(--color-base-200);background-color:var(--color-base-200)}fieldset:disabled .select:is(select),fieldset:disabled .select :is(select){color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){fieldset:disabled .select:is(select),fieldset:disabled .select :is(select){color:color-mix(in oklab, var(--color-base-content) 40%, transparent)}}fieldset:disabled .select{box-shadow:none}fieldset:disabled .select::placeholder,fieldset:disabled .select ::placeholder{color:var(--color-base-content);opacity:.2}.select:has(>select[disabled])>select[disabled]{cursor:not-allowed}.image-full>.card-body{color:var(--color-neutral-content);position:relative}.card-xs .card-body{--card-p:.5rem;--card-fs:.6875rem}.card-sm .card-body{--card-p:1rem;--card-fs:.75rem}.card-md .card-body{--card-p:1.5rem;--card-fs:.875rem}.card-lg .card-body{--card-p:2rem;--card-fs:1rem}.card-xl .card-body{--card-p:2.5rem;--card-fs:1.125rem}.stats-horizontal .stat:not(:last-child){border-inline-end:var(--border) dashed currentColor}@supports (color:color-mix(in lab, red, red)){.stats-horizontal .stat:not(:last-child){border-inline-end:var(--border) dashed color-mix(in oklab, currentColor 10%, #0000)}}.stats-horizontal .stat:not(:last-child){border-block-end:none}@supports (color:color-mix(in lab, red, red)){.stats-vertical .stat:not(:last-child){border-block-end:var(--border) dashed color-mix(in oklab, currentColor 10%, #0000)}}.card-xs .card-title{--cardtitle-fs:.875rem}.card-sm .card-title{--cardtitle-fs:1rem}.card-md .card-title{--cardtitle-fs:1.125rem}.card-lg .card-title{--cardtitle-fs:1.25rem}.card-xl .card-title{--cardtitle-fs:1.375rem}.stats-vertical{grid-auto-flow:row;overflow-y:auto}.stats-vertical .stat:not(:last-child){border-inline-end:none;border-block-end:var(--border) dashed currentColor}@supports (color:color-mix(in lab, red, red)){.stats-vertical .stat:not(:last-child){border-block-end:var(--border) dashed color-mix(in oklab, currentColor 10%, #0000)}}.badge-outline{color:var(--badge-color);--badge-bg:#0000;background-image:none;border-color:currentColor}.btn-primary{--btn-color:var(--color-primary);--btn-fg:var(--color-primary-content);--btn-soft-bg:initial}@media (prefers-reduced-motion:no-preference){.collapse:not(td,tr,colgroup)[open].collapse-arrow>.collapse-title:after,.collapse:not(td,tr,colgroup).collapse-open.collapse-arrow>.collapse-title:after{transform:translateY(-50%)rotate(225deg)}}.collapse:not(td,tr,colgroup).collapse-open.collapse-plus>.collapse-title:after{--tw-content:"\u2212";content:var(--tw-content)}:is(.collapse:not(td,tr,colgroup)[tabindex].collapse-arrow:focus:not(.collapse-close),.collapse:not(td,tr,colgroup).collapse-arrow[tabindex]:focus-within:not(.collapse-close))>.collapse-title:after,.collapse:not(td,tr,colgroup).collapse-arrow:not(.collapse-close)>input:is([type=checkbox],[type=radio]):checked~.collapse-title:after{transform:translateY(-50%)rotate(225deg)}.collapse:not(td,tr,colgroup)[open].collapse-plus>.collapse-title:after,.collapse:not(td,tr,colgroup)[tabindex].collapse-plus:focus:not(.collapse-close)>.collapse-title:after,.collapse:not(td,tr,colgroup).collapse-plus:not(.collapse-close)>input:is([type=checkbox],[type=radio]):checked~.collapse-title:after{--tw-content:"\u2212";content:var(--tw-content)}}.prose :where(a.btn:not(.btn-link)):not(:where([class~=not-prose],[class~=not-prose] *)){text-decoration-line:none}@layer daisyui.l1{@media (hover:hover){.btn:hover{--btn-bg:var(--btn-color,var(--color-base-200))}@supports (color:color-mix(in lab, red, red)){.btn:hover{--btn-bg:color-mix(in oklab, var(--btn-color,var(--color-base-200)), #000 7%)}}.btn:hover{color:var(--btn-fg);--btn-border:var(--btn-bg)}@supports (color:color-mix(in lab, red, red)){.btn:hover{--btn-border:color-mix(in oklab, var(--btn-bg), #000 calc(var(--depth) * 5%))}}.btn:hover{--btn-border-style:solid;--btn-inset:0 .5px 0 .5px oklch(100% 0 0 / calc(var(--depth) * 6%));--btn-shadow:0 3px 2px -2px var(--btn-bg), 0 4px 3px -2px var(--btn-bg)}@supports (color:color-mix(in lab, red, red)){.btn:hover{--btn-shadow:0 3px 2px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000), 0 4px 3px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000)}}}.btn:active:not(.btn-active,[aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-bg:var(--btn-color,var(--color-base-200));translate:0 .5px}@supports (color:color-mix(in lab, red, red)){.btn:active:not(.btn-active,[aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-bg:color-mix(in oklab, var(--btn-color,var(--color-base-200)), #000 5%)}}.btn:active:not(.btn-active,[aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){color:var(--btn-fg,var(--color-base-content));--btn-border:var(--btn-color,var(--color-base-200))}@supports (color:color-mix(in lab, red, red)){.btn:active:not(.btn-active,[aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-border:color-mix(in oklab, var(--btn-color,var(--color-base-200)), #000 7%)}}.btn:active:not(.btn-active,[aria-pressed=true],[aria-checked=true],[aria-current]:not([aria-current=false],[aria-current=""])){--btn-border-style:solid;--btn-inset:0 0 0 0 oklch(0% 0 0/0);--btn-shadow:0 0 0 0 oklch(0% 0 0/0)}.btn:where(:checked:not(.filter [type=radio].btn),:not([type=radio],[type=checkbox]):focus-visible){--btn-bg:var(--btn-color,var(--color-base-200));color:var(--btn-fg,var(--color-base-content));--btn-border:var(--btn-bg)}@supports (color:color-mix(in lab, red, red)){.btn:where(:checked:not(.filter [type=radio].btn),:not([type=radio],[type=checkbox]):focus-visible){--btn-border:color-mix(in oklab, var(--btn-bg), #000 calc(var(--depth) * 5%))}}.btn:where(:checked:not(.filter [type=radio].btn),:not([type=radio],[type=checkbox]):focus-visible){--btn-border-style:solid;--btn-inset:0 .5px 0 .5px oklch(100% 0 0 / calc(var(--depth) * 6%));--btn-shadow:0 3px 2px -2px var(--btn-bg), 0 4px 3px -2px var(--btn-bg)}@supports (color:color-mix(in lab, red, red)){.btn:where(:checked:not(.filter [type=radio].btn),:not([type=radio],[type=checkbox]):focus-visible){--btn-shadow:0 3px 2px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000), 0 4px 3px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000)}}.btn:where(:checked:not(.filter [type=radio].btn),:not([type=radio],[type=checkbox]):focus-visible){isolation:isolate}.btn:focus-visible,.btn:has(:focus-visible){isolation:isolate;outline-width:2px;outline-style:solid}}@layer daisyui{.btn:is(.btn-disabled,:disabled,[disabled],[aria-disabled=true]){pointer-events:none;color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.btn:is(.btn-disabled,:disabled,[disabled],[aria-disabled=true]){color:color-mix(in oklch, var(--color-base-content) 20%, #0000)}}.btn:is(.btn-disabled,:disabled,[disabled],[aria-disabled=true]){--btn-bg:#0000;--btn-border:#0000;--btn-inset:0 0 0 0 oklch(0% 0 0/0);--btn-shadow:0 0 0 0 oklch(0% 0 0/0);background-image:none}.btn:is(.btn-disabled,:disabled,[disabled],[aria-disabled=true]):not(.btn-link,.btn-ghost){background-color:var(--color-base-content)}@supports (color:color-mix(in lab, red, red)){.btn:is(.btn-disabled,:disabled,[disabled],[aria-disabled=true]):not(.btn-link,.btn-ghost){background-color:color-mix(in oklab, var(--color-base-content) 10%, transparent)}}}.collapse:not(td,tr,colgroup){visibility:revert-layer}.collapse{visibility:collapse}:is(.input[type=url],.input[type=tel],.input[type=email],.input[type=number]):dir(rtl){border-start-start-radius:var(--join-se,var(--radius-field));border-start-end-radius:var(--join-ss,var(--radius-field));border-end-end-radius:var(--join-es,var(--radius-field));border-end-start-radius:var(--join-ee,var(--radius-field))}@layer daisyui.l1.l2.l3.l4{.card-body p{flex-grow:1}.card figure:first-child{border-start-start-radius:inherit;border-start-end-radius:inherit;border-end-end-radius:unset;border-end-start-radius:unset;overflow:hidden}.card figure:last-child{border-start-start-radius:unset;border-start-end-radius:unset;border-end-end-radius:inherit;border-end-start-radius:inherit;overflow:hidden}.card figure{justify-content:center;align-items:center;display:flex}}.alert{border-width:var(--border);border-color:var(--alert-border-color,var(--color-base-200))}.table{display:table}.w-full{width:100%}.border{border-style:var(--tw-border-style);border-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-base-300{border-color:var(--color-base-300)}.bg-base-100{background-color:var(--color-base-100)}.bg-base-200{background-color:var(--color-base-200)}.text-base-content{color:var(--color-base-content)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}@media (min-width:64rem){@layer daisyui.l1.l2{.lg\\:stats-horizontal{grid-auto-flow:column;overflow-x:auto}.lg\\:stats-horizontal .stat:not(:last-child){border-inline-end:var(--border) dashed currentColor}@supports (color:color-mix(in lab, red, red)){.lg\\:stats-horizontal .stat:not(:last-child){border-inline-end:var(--border) dashed color-mix(in oklab, currentColor 10%, #0000)}}.lg\\:stats-horizontal .stat:not(:last-child){border-block-end:none}}}}:root{color-scheme:light}body{font-family:ui-sans-serif,system-ui,sans-serif;font-size:1rem}.shell{width:min(100% - 2rem,88rem);margin-inline:auto}.header{justify-content:space-between;align-items:center;gap:1rem;padding-block:1.5rem;display:flex}h1{margin-block:.35rem;font-size:clamp(1.5rem,3vw,2rem);font-weight:700;line-height:1.2}h2{margin-block:1rem;font-size:1.4rem;font-weight:650}.eyebrow{color:#37574c;font-size:.875rem;font-weight:600}main{padding-block:1.5rem}section{margin-block:1.5rem}.filters{grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:.75rem 1rem;display:grid}.fieldset-legend{padding-block:.25rem;font-size:.875rem}.input,.select,.btn{min-height:2.75rem;font-size:1rem}.actions{flex-wrap:wrap;gap:.75rem;margin-top:1rem;display:flex}.period-note,.explanation{margin-block:1rem;line-height:1.6}.stat-title,.stat-desc{white-space:normal;font-size:.875rem}.stat-value{font-size:2rem}.stat{min-width:0}.graphs{grid-template-columns:repeat(auto-fit,minmax(min(100%,23rem),1fr));gap:1rem;display:grid}.table-scroll{max-width:100%;margin-block:1rem;overflow:auto}.table{font-size:.875rem}.table th{color:#35433e;font-size:.875rem}.table td{vertical-align:top}caption{text-align:left;margin-bottom:.5rem;font-size:1rem;font-weight:650}.badge{white-space:normal;height:auto;min-height:1.75rem;font-size:.875rem}.card-body{min-width:0}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f0f3f1;max-width:32rem;padding:1rem;font-size:.875rem}summary{cursor:pointer;padding-block:.5rem}svg{width:100%;min-height:10rem}svg text{font-size:16px}.graph-label,.graph-dates{font-size:.875rem}.graph-dates{flex-wrap:wrap;justify-content:space-between;gap:.5rem;display:flex}.skip-link{z-index:20;background:#fff;padding:1rem;position:absolute;top:-5rem;left:1rem}.skip-link:focus{top:1rem}:focus-visible{outline-offset:3px;outline:3px solid #146b50}footer{padding-block:1rem;font-size:.875rem;line-height:1.6}@media (max-width:640px){.shell{width:calc(100% - 1rem)}.card-body{padding:1rem}.header{flex-direction:column;align-items:start}}@keyframes rotator{89.9999%,to{--first-item-position:0 0%}90%,99.9999%{--first-item-position:0 calc(var(--items) * 100%)}to{translate:0 -100%}}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}@keyframes menu{0%{opacity:0}}@keyframes dropdown{0%{opacity:0}}@keyframes toast{0%{opacity:0;scale:.9}to{opacity:1;scale:1}}@keyframes radio{0%{padding:5px}50%{padding:3px}}@keyframes rating{0%,40%{filter:brightness(1.05)contrast(1.05);scale:1.1}}@keyframes progress{50%{background-position-x:-115%}}@keyframes aura{to{--aura-angle:360deg;transform:translateZ(1px)}}@keyframes aura-glow{20%,80%{opacity:.7;filter:blur(.25rem)}50%{opacity:1;filter:blur(.75rem)}}@keyframes aura-glow-after{20%,80%{opacity:.3;filter:blur(1rem)}50%{opacity:.6;filter:blur(1.5rem)}}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}`;

// src/legacy-dashboard.mjs
async function dashboardReport(env, params) {
  const data = await report(env, params, Date.now(), legacyWindowRows);
  const connected = JSON.parse(env.DASHBOARD_CONNECTIONS_JSON || "[]");
  if (!reportSites(env, params).some((site) => connected.includes(site.SITE_ID))) {
    for (const window of [data.current, data.previous].filter(Boolean)) {
      window.leads = null;
      window.unknown_leads = null;
      for (const point of window.series) point.leads = null;
    }
    data.history_note = "Valgte nettsteder er ikke tilkoblet datainnsamlingen.";
  }
  return data;
}
async function legacyDashboard(request, env) {
  try {
    const url = new URL(request.url);
    if (url.origin !== configuration(env).ingress) return json({ ok: false }, 403);
    if (!await authorize(request, env, "read")) return json({ ok: false }, 403);
    if (request.method !== "GET") return json({ ok: false }, 405, { Allow: "GET" });
    reportSites(env, url.searchParams);
    const headers = {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; style-src 'self'; img-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'"
    };
    if (url.pathname === "/admin/style.css") return new Response(admin_default, { headers: { ...headers, "Content-Type": "text/css; charset=utf-8" } });
    if (url.pathname === "/admin/report") return json(await dashboardReport(env, url.searchParams));
    if (!["/admin/", "/admin/dashboard/receipts", "/admin/dashboard/export"].includes(url.pathname)) return json({ ok: false }, 404);
    const page = await readLegacyReceipts(env, url.searchParams);
    if (url.pathname === "/admin/") {
      const data = await dashboardReport(env, url.searchParams);
      return new Response(renderDashboard(env, data, page, url.searchParams), { headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } });
    }
    if (url.pathname === "/admin/dashboard/export" && url.searchParams.get("format") === "csv") {
      return new Response(csv(page.receipts), { headers: {
        ...headers,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="medon-receipts.csv"',
        ...page.next ? { "X-Next-Cursor": page.next } : {}
      } });
    }
    return json(page);
  } catch (error) {
    return json({ ok: false, error: error instanceof HttpError ? error.message : "unavailable" }, error instanceof HttpError ? error.status : 503);
  }
}
export {
  legacyDashboard
};
