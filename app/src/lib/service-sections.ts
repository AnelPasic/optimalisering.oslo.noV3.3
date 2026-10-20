import type { RouteFamily } from './route-family.ts';

type Section = { id: string; visibility?: 'hidden' };
const fixedAnchors = ['service-hero', 'resultater', 'service-priser', 'sporsmal'];

/** Pilot only: other service renderers keep their established behavior. */
export function visibleServiceSections<T extends Section>(page: { slug: string; sections: T[] }): T[] {
  return page.slug === 'synlighet' ? page.sections.filter(section => section.visibility !== 'hidden') : page.sections;
}

export function validateSynlighetSections(page: { slug: string; sections: Section[] }, route: RouteFamily): void {
  if (page.slug !== 'synlighet') return;
  const ids = new Set<string>();
  for (const section of page.sections) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || ['hero', ...fixedAnchors].includes(section.id) || ids.has(section.id)) {
      throw new Error('Synlighet sections require unique valid anchors, excluding Hero and FAQ anchors');
    }
    ids.add(section.id);
  }
  const required = ['sjekk', route.service.proofAfter, route.service.pricingBridge?.after].filter((id): id is string => !!id);
  for (const id of required) {
    if (page.sections.filter(section => section.id === id && section.visibility !== 'hidden').length !== 1) {
      throw new Error(`Synlighet requires one visible dependency section: ${id}`);
    }
  }
  const visibleIds = new Set([...visibleServiceSections(page).map(section => section.id), ...fixedAnchors]);
  function checkLinks(value: unknown): void {
    if (!value || typeof value !== 'object') return;
    const href = (value as { href?: unknown }).href;
    if (typeof href === 'string' && href.startsWith('/synlighet/#') && !visibleIds.has(href.slice('/synlighet/#'.length))) {
      throw new Error(`Synlighet link requires a visible section: ${href}`);
    }
    for (const child of Object.values(value)) checkLinks(child);
  }
  checkLinks(page);
}
