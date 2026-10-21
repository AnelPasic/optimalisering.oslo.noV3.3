import type { RouteFamily } from './route-family.ts';
import { globalPlacementSchema, resolveGlobalPlacement, getGlobalElement } from './home-builder.ts';
import { getPublishableCases } from './proof.ts';

export const serviceGlobalIds = ['resultater', 'regneeksempel', 'sjekk', 'behov', 'mekanisme', 'passer', 'priser', 'sporsmal'] as const;
export const serviceGlobalPlacementSchema = globalPlacementSchema.refine(placement => serviceGlobalIds.some(id => id === placement.element), 'Dette globale elementet er ikke tilgjengelig i Synlighet-piloten');
type Section = { id: string; visibility?: 'hidden'; globalElement?: typeof serviceGlobalIds[number] };
type ServicePage = { slug: string; sections: Section[] };
const fixedAnchors = ['service-hero', 'resultater', 'priser', 'service-priser', 'sporsmal', 'main', 'mobile-menu'];

/** Resolve references only in memory; CMS continues to store reference + visibility. */
export function resolveSynlighetSections(value: unknown) {
  if (!Array.isArray(value)) throw new Error('Synlighet krever en seksjonsliste');
  const globals = new Map<string, ReturnType<typeof resolveGlobalPlacement>>();
  const localIds = new Set<string>();
  for (const row of value) {
    if (!row || typeof row !== 'object' || 'globalElement' in row) throw new Error('Ugyldig seksjon; bruk Globalt element for bibliotekreferanser');
    if (row._block === 'global') {
      const placement = serviceGlobalPlacementSchema.parse(row);
      if (globals.has(placement.element)) throw new Error(`Globalt element er allerede plassert: ${placement.element}`);
      globals.set(placement.element, resolveGlobalPlacement(placement));
    } else {
      if (localIds.has(row.id)) throw new Error(`Duplisert lokalt anker: ${row.id}`);
      localIds.add(row.id);
    }
  }
  for (const [id, block] of globals) {
    if (block.visibility !== 'hidden' && value.some(row => row._block !== 'global' && row.id === id && row.visibility !== 'hidden')) {
      throw new Error(`Globalt og lokalt element deler synlig anker: ${id}. Skjul eller fjern den lokale raden eksplisitt.`);
    }
  }
  return value.flatMap(row => {
    if (row._block !== 'global') return [row];
    const block = globals.get(row.element)!;
    if (block.visibility === 'hidden') return [];
    return [{ ...block, globalElement: row.element, heading: 'heading' in block ? block.heading : '', body: 'body' in block ? block.body : [] }];
  });
}

export function hasGlobalServiceProof(page: { slug: string; sections: Section[] }): boolean {
  return page.slug === 'synlighet' && visibleServiceSections(page).some(section => section.globalElement === 'resultater');
}

/** A selected global proof must pass the existing evidence gates when explicitly placed. */
export function validateServiceGlobalProof(page: ServicePage, records: readonly unknown[]): void {
  if (page.slug !== 'synlighet') return;
  const global = hasGlobalServiceProof(page), slot = getGlobalElement('resultater').content;
  if (global && (!slot.publicationApproved || !slot.caseIds.length || slot.caseIds.some(id => getPublishableCases({ ...slot, caseIds: [id] }, records).length !== 1))) {
    throw new Error('Globale Kunderesultater krever publiseringsgodkjenning og publiserbare case med gyldig evidens/tillatelse');
  }
  checkServiceLinks(page, liveAnchors(page));
}

/** Pilot only: other service renderers keep their established behavior. */
export function visibleServiceSections<T extends Section>(page: { slug: string; sections: T[] }): T[] {
  return page.slug === 'synlighet' ? page.sections.filter(section => section.visibility !== 'hidden') : page.sections;
}

export function validateSynlighetSections(page: ServicePage, _route: RouteFamily): void {
  if (page.slug !== 'synlighet') return;
  const ids = new Set<string>();
  for (const section of page.sections) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || (!section.globalElement && (['hero', ...fixedAnchors].includes(section.id) || /^(?:calc-|scenario-|term-|package-home-)/.test(section.id))) || (section.visibility !== 'hidden' && ids.has(section.id))) {
      throw new Error('Synlighet sections require unique visible valid anchors, excluding reserved module anchors');
    }
    if (section.visibility !== 'hidden') ids.add(section.id);
  }
  if (page.sections.filter(section => section.id === 'sjekk' && section.visibility !== 'hidden').length !== 1) {
    throw new Error('Synlighet krever én synlig sjekk-seksjon, lokal eller global');
  }
  checkServiceLinks(page, liveAnchors(page));
}

function liveAnchors(page: ServicePage): Set<string> {
  return new Set(['service-hero', 'main', 'mobile-menu', ...visibleServiceSections(page).map(section => section.id)]);
}

function checkServiceLinks(page: ServicePage, visibleIds: Set<string>): void {
  function checkLinks(value: unknown): void {
    if (!value || typeof value !== 'object') return;
    const href = (value as { href?: unknown }).href;
    if (typeof href === 'string') {
      const url = new URL(href, 'https://synlighet.invalid/synlighet/');
      if (url.origin === 'https://synlighet.invalid' && /^\/synlighet\/?$/.test(url.pathname) && url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (!visibleIds.has(id)) throw new Error(`Synlighet link requires a visible section: ${href}`);
      }
    }
    for (const child of Object.values(value)) checkLinks(child);
  }
  checkLinks({ ...page, sections: visibleServiceSections(page) });
}
