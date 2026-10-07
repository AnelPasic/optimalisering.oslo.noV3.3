export function captureAttribution(urlValue: string, referrerValue: string): Record<string, string> {
  const url = new URL(urlValue);
  const result: Record<string, string> = {};
  for (const field of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = url.searchParams.get(field) ?? '';
    if (value && value.length <= 120 && /^[\p{L}\p{N} _./+-]+$/u.test(value)) result[field] = value;
  }
  const landing = url.searchParams.get('source_page');
  if (landing?.startsWith('/') && !landing.startsWith('//')) result.landing_page = landing.split(/[?#]/)[0].slice(0, 300);
  try {
    const referrer = new URL(url.searchParams.get('source_referrer') || referrerValue);
    if (['https:', 'http:'].includes(referrer.protocol) && referrer.origin !== url.origin) result.referrer = referrer.origin;
  } catch { /* No external referrer. */ }
  if (Object.keys(result).length && !result.landing_page) result.landing_page = url.pathname;
  return result;
}

export function forwardAttribution(href: string, locationUrl: string, referrer: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const source = captureAttribution(locationUrl, referrer);
  if (!Object.keys(source).length) return href;
  const target = new URL(href, locationUrl);
  for (const [key, value] of Object.entries(source)) {
    const field = key === 'landing_page' ? 'source_page' : key === 'referrer' ? 'source_referrer' : key;
    if (!target.searchParams.has(field)) target.searchParams.set(field, value);
  }
  return target.pathname + target.search + target.hash;
}
