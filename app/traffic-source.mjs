// Aggregate landing evidence follows MWS-037B/G. Never pass the request URL
// or browser headers through the service binding.
export const trafficServiceUrl = 'https://oslo-traffic.internal/count';
export const siteOrigin = 'https://optimalisering.oslo.no';
export const channelLabels = Object.freeze({
  paid_search: 'Betalt søk',
  paid_ai: 'Betalt AI',
  paid_social: 'Betalt sosialt',
  organic_search: 'Organisk søk',
  organic_social: 'Organisk sosialt',
  ai_referral: 'AI-henvisning',
  referral: 'Henvisning',
  email: 'E-post',
  offline: 'Offline',
  other: 'Andre kilder',
  unknown: 'Ukjent kilde',
});

const search = ['google', 'bing', 'duckduckgo', 'yahoo'];
const ai = ['openai', 'chatgpt', 'perplexity', 'claude', 'copilot'];
const social = ['facebook', 'instagram', 'linkedin', 'meta', 'tiktok'];
const referrers = [
  ['google', /(^|\.)google\.(?:[a-z]{2,3}|co\.[a-z]{2})$/],
  ['bing', /(^|\.)bing\.com$/], ['duckduckgo', /(^|\.)duckduckgo\.com$/],
  ['yahoo', /(^|\.)yahoo\.com$/], ['chatgpt', /(^|\.)(chatgpt\.com|chat\.openai\.com)$/],
  ['perplexity', /(^|\.)perplexity\.ai$/], ['claude', /(^|\.)claude\.ai$/],
  ['facebook', /(^|\.)(facebook\.com|fb\.com)$/], ['instagram', /(^|\.)instagram\.com$/],
  ['linkedin', /(^|\.)linkedin\.com$/], ['tiktok', /(^|\.)tiktok\.com$/],
];

export function safeTag(value) {
  return typeof value === 'string' && value.length <= 100 && /^[\p{L}\p{N} _.-]+$/u.test(value) && !/\d{7,}/.test(value) ? value.trim() : '';
}

export function safeAdId(value) {
  return typeof value === 'string' && /^[0-9]{1,20}$/.test(value) ? value : '';
}

export function safePage(value) {
  return typeof value === 'string' && /^\/(?:[a-z0-9-]+\/){0,6}$/.test(value) && value.length <= 160 && !/\d{7,}/.test(value) ? value : '/other/';
}

function tag(params, keys, normalize = safeTag) {
  for (const key of keys) {
    const values = params.getAll(key);
    if (values.length) return values.length === 1 ? normalize(values[0]) : '';
  }
  return '';
}

function referrerSource(value) {
  try {
    const ref = new URL(value);
    if (!['https:', 'http:'].includes(ref.protocol) || ref.username || ref.password || ref.hostname.replace(/^www\./, '') === 'optimalisering.oslo.no') return {};
    const source = referrers.find(([, pattern]) => pattern.test(ref.hostname))?.[0];
    if (search.includes(source)) return { source, medium: 'organic', channel: 'organic_search' };
    if (social.includes(source)) return { source, medium: 'social', channel: 'organic_social' };
    if (ai.includes(source)) return { source, medium: 'referral', channel: 'ai_referral' };
    return { source: 'external', medium: 'referral', channel: 'referral' };
  } catch {
    return {};
  }
}

export function landing(url, referrer) {
  const params = url.searchParams;
  const source = tag(params, ['utm_source']).toLowerCase();
  const medium = tag(params, ['utm_medium']).toLowerCase();
  const googleHint = ['gclid', 'gbraid', 'wbraid'].some(key => params.has(key));
  const openAiHint = params.has('oppref');
  const paid = ['cpc', 'ppc', 'paid', 'paid_search', 'paid_social', 'paid_ai'].includes(medium);
  let channel = 'unknown';
  if ((googleHint && openAiHint) || (googleHint && source && source !== 'google') || (openAiHint && source && !ai.includes(source)) || ((googleHint || openAiHint) && medium && !paid)) {
    return { channel, source: '', medium: '', campaign: '', adGroup: '', ad: '' };
  }
  if (googleHint || (paid && search.includes(source))) channel = 'paid_search';
  else if (openAiHint || (paid && ai.includes(source))) channel = 'paid_ai';
  else if (medium === 'paid_social' || (paid && social.includes(source))) channel = 'paid_social';
  else if (medium === 'organic' && search.includes(source)) channel = 'organic_search';
  else if (['social', 'organic_social'].includes(medium) && source) channel = 'organic_social';
  else if (['offline', 'email'].includes(medium) && source) channel = medium;
  else if (ai.includes(source)) channel = 'ai_referral';
  else if (medium === 'referral' && source) channel = 'referral';
  else if (source) channel = 'other';
  const referred = channel === 'unknown' ? referrerSource(referrer) : {};
  channel = referred.channel ?? channel;
  const ads = ['paid_search', 'paid_ai', 'paid_social'].includes(channel);
  return {
    channel,
    source: safeTag(source) || (googleHint ? 'google' : openAiHint ? 'openai' : referred.source || ''),
    medium: safeTag(medium) || (googleHint ? 'cpc' : openAiHint ? 'paid' : referred.medium || ''),
    campaign: channel === 'unknown' ? '' : tag(params, ['utm_campaign']) || tag(params, ['campaignid', 'campaign_id', 'utm_id'], safeAdId),
    adGroup: ads ? tag(params, ['adgroupid', 'adgroup_id', 'adset_id'], safeAdId) : '',
    ad: ads ? tag(params, ['creative', 'ad_id'], safeAdId) : '',
  };
}

export function eligible(request, response, url) {
  return url.origin === siteOrigin && request.method === 'GET' && response.status === 200 &&
    /^text\/html(?:;|$)/i.test(response.headers.get('content-type') || '') &&
    !/^\/(api|admin|cdn-cgi|design-system)(\/|$)/i.test(url.pathname) && url.pathname !== '/takk/' &&
    !/\.[a-z0-9]{1,8}$/i.test(url.pathname) &&
    !/bot|crawler|spider|slurp|headless|healthcheck|uptime|monitor|preview/i.test(request.headers.get('user-agent') || '') &&
    !/prefetch|prerender/i.test(['purpose', 'sec-purpose', 'x-purpose'].map(name => request.headers.get(name)).join(' '));
}
