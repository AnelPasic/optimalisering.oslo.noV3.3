const endpoint = 'https://optimalisering-oslo-intake.anel.workers.dev/api/traffic';
const preferenceKey = 'medon-oslo-traffic-preference';
const sessionKey = 'medon-oslo-traffic-source';
const choiceLifetime = 90 * 86_400_000;
const attributionLifetime = 30 * 60_000;

type Preference = { allow: boolean; until: number; visitor?: string };
type Source = { channel: string; campaign: string; adGroup: string; ad: string };

function readPreference(): Preference | undefined {
  try {
    const choice = JSON.parse(localStorage.getItem(preferenceKey) || 'null');
    if (choice?.until > Date.now() && typeof choice.allow === 'boolean') return choice;
    if (choice) {
      localStorage.removeItem(preferenceKey);
      sessionStorage.removeItem(sessionKey);
    }
  } catch { /* Storage is optional. */ }
}

function trafficSource(): Source {
  const params = new URLSearchParams(location.search);
  function tag(...names: string[]) {
    for (const name of names) {
      const value = params.get(name)?.trim() || '';
      if (/^[\p{L}\p{N} _./+-]{1,100}$/u.test(value)) return value;
    }
    return '';
  }
  const source = tag('utm_source').toLowerCase(), medium = tag('utm_medium').toLowerCase();
  const campaign = tag('campaign_id', 'campaignid', 'utm_id', 'utm_campaign');
  const adGroup = tag('ad_group_id', 'adgroupid', 'adset_id', 'utm_adgroup');
  const ad = tag('ad_id', 'creative', 'utm_content');
  const attributedLink = /^\/(?!\/)/.test(params.get('source_page') || '');
  const click = ['gclid', 'gbraid', 'wbraid', 'oppref'].some(key => params.has(key));
  const newAdIds = tag('campaign_id', 'campaignid', 'utm_id', 'ad_group_id', 'adgroupid', 'adset_id', 'utm_adgroup', 'ad_id', 'creative');
  let host = '';
  try {
    const referrer = new URL(attributedLink && params.get('source_referrer') || document.referrer);
    if (/^https?:$/.test(referrer.protocol) && referrer.origin !== location.origin) host = referrer.hostname;
  } catch { /* Direct visit. */ }
  const paid = /^(cpc|ppc|paid|paid_search|paid_social|paid_ai|display)$/.test(medium);
  const google = !!source && /^(google|googleads|google_ads)$/.test(source);
  const meta = /^(meta|facebook|instagram|fb|ig)$/.test(source);
  let channel = 'direct';
  if (['gclid', 'gbraid', 'wbraid'].some(key => params.has(key)) || (paid && google)) channel = 'google_ads';
  else if (paid && meta) channel = 'meta_ads';
  else if (paid || params.has('oppref')) channel = 'paid';
  else if (medium === 'organic' || /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com)$/.test(host)) channel = 'organic';
  else if (medium === 'email') channel = 'email';
  else if (meta || /(^|\.)(facebook\.com|instagram\.com|linkedin\.com)$/.test(host) || /^(social|organic_social)$/.test(medium)) channel = 'social';
  else if (host || medium === 'referral') channel = 'referral';
  else if (source || medium || campaign || adGroup || ad) channel = 'other';

  let result = { channel, campaign, adGroup, ad };
  try {
    const previous = JSON.parse(sessionStorage.getItem(sessionKey) || 'null');
    const continuation = attributedLink && !click && !newAdIds ||
      !source && !medium && !campaign && !adGroup && !ad && channel === 'direct';
    if (continuation && previous?.until > Date.now()) {
      result = previous.source;
    }
    sessionStorage.setItem(sessionKey, JSON.stringify({ source: result, until: Date.now() + attributionLifetime }));
  } catch { /* The current landing remains measurable. */ }
  return result;
}

function measureView(visitor: string, until: number) {
  const view = crypto.randomUUID(), source = trafficSource();
  const viewStarted = performance.now();
  const page = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';
  let activeMs = 0, scroll = 0, tracking = true, start: number | undefined;
  let lastTime = -1, lastScroll = -1;
  const updateTime = () => {
    const now = performance.now();
    if (start !== undefined) activeMs += now - start;
    start = document.visibilityState === 'visible' && document.hasFocus() ? now : undefined;
  };
  const updateScroll = () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    if (range > 0) scroll = Math.max(scroll, Math.min(100, Math.round(scrollY / range * 100)));
  };
  const send = () => {
    if (!tracking) return;
    if (Date.now() >= until) { stop(); readPreference(); return; }
    updateTime();
    updateScroll();
    const time = Math.min(86_400_000, Math.round(activeMs));
    if (lastTime === time && lastScroll === scroll) return;
    lastTime = time;
    lastScroll = scroll;
    const elapsedMs = Math.min(86_400_000, Math.round(performance.now() - viewStarted));
    const body = JSON.stringify({ ...source, view, visitor, page, activeMs: time, elapsedMs, scroll, consent: true });
    void fetch(endpoint, { method: 'POST', body, keepalive: true, credentials: 'omit', referrerPolicy: 'no-referrer' })
      .then(response => { if (!response.ok && lastTime === time && lastScroll === scroll) lastTime = -1; })
      .catch(() => { if (lastTime === time && lastScroll === scroll) lastTime = -1; });
  };
  const abort = new AbortController(), options = { signal: abort.signal };
  updateTime();
  send();
  const interval = window.setInterval(send, 20_000);
  document.addEventListener('visibilitychange', () => { updateTime(); if (document.hidden) send(); }, options);
  window.addEventListener('focus', updateTime, options);
  window.addEventListener('blur', updateTime, options);
  window.addEventListener('scroll', updateScroll, { ...options, passive: true });
  window.addEventListener('pagehide', send, options);
  function stop() {
    tracking = false;
    window.clearInterval(interval);
    abort.abort();
  }
  return stop;
}

export function mountTraffic(root: HTMLElement) {
  if (location.origin !== 'https://optimalisering.oslo.no') return;
  const chooser = root.querySelector<HTMLElement>('[data-traffic-choice]');
  const open = root.querySelector<HTMLButtonElement>('[data-traffic-open]');
  if (!chooser || !open) return;
  let stop: (() => void) | undefined;
  function apply(choice: Preference | undefined) {
    if (!chooser) return;
    chooser.hidden = !!choice;
    stop?.();
    stop = choice?.allow && choice.visitor && root.dataset.measure === 'true' ? measureView(choice.visitor, choice.until) : undefined;
  }
  open.hidden = false;
  apply(readPreference());
  open.addEventListener('click', () => {
    chooser.hidden = false;
    chooser.querySelector<HTMLElement>('h2')?.focus();
  });
  chooser.querySelectorAll<HTMLButtonElement>('[data-traffic-answer]').forEach(button => {
    button.addEventListener('click', () => {
      const allow = button.dataset.trafficAnswer === 'yes';
      const old = readPreference();
      if (old?.allow === allow) { chooser.hidden = true; open.focus(); return; }
      const choice: Preference = { allow, until: Date.now() + choiceLifetime };
      if (allow) choice.visitor = crypto.randomUUID();
      try {
        localStorage.setItem(preferenceKey, JSON.stringify(choice));
        if (!allow) sessionStorage.removeItem(sessionKey);
      } catch { /* Apply to the current page if storage is unavailable. */ }
      apply(choice);
      open.focus();
    });
  });
  window.addEventListener('storage', event => {
    if (event.key === null || event.key === preferenceKey) {
      const next = readPreference();
      if (!next?.allow) { try { sessionStorage.removeItem(sessionKey); } catch {} }
      apply(next);
    }
  });
}
