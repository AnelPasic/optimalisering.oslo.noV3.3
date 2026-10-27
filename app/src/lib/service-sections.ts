import type { RouteFamily } from './route-family.ts';
import { globalPlacementSchema, resolveGlobalPlacement, getGlobalElement } from './home-builder.ts';
import { getPublishableCases } from './proof.ts';
import {resolveSharedContentPlacement,sharedContentPlacementSchema} from './shared-content.ts';

export const serviceGlobalIds = ['resultater', 'regneeksempel', 'sjekk', 'behov', 'mekanisme', 'passer', 'priser', 'sporsmal'] as const;
export const serviceGlobalPlacementSchema = globalPlacementSchema.refine(placement => serviceGlobalIds.some(id => id === placement.element), 'Dette globale elementet er ikke tilgjengelig i tjenestebyggeren');
// The same eight catalogue entries are available in every page editor.
export const seoGlobalIds = serviceGlobalIds;
const mixedServiceSlugs = new Set(['synlighet', 'seo']);
type Section = { id: string; visibility?: 'hidden'; globalElement?: typeof serviceGlobalIds[number] };
type ServicePage = { slug: string; sections: Section[]; faq?: readonly { question: string; answer: string }[] };
const fixedAnchors = ['service-hero', 'resultater', 'priser', 'service-priser', 'sporsmal', 'main', 'mobile-menu'];

/** Resolve references only in memory; CMS continues to store reference + visibility. */
export function resolvePageSections(value: unknown) {
 if(!Array.isArray(value))throw new Error('Tjenestesiden krever en seksjonsliste');
 const globals=new Map<string,ReturnType<typeof resolveGlobalPlacement>>();
 const shared=new Map<string,ReturnType<typeof resolveSharedContentPlacement>>();
 const localIds=new Set<string>();
 for(const row of value){
  if(!row||typeof row!=='object'||'globalElement' in row)throw new Error('Ugyldig seksjon; bruk en bibliotekreferanse');
  if(row._block==='global'){
   const placement=serviceGlobalPlacementSchema.parse(row);
   if(globals.has(placement.element))throw new Error('Globalt element er allerede plassert: '+placement.element);
   globals.set(placement.element,resolveGlobalPlacement(placement));
  }else if(row._block==='sharedContent'){
   const placement=sharedContentPlacementSchema.parse(row);
   if(shared.has(placement.entry))throw new Error('Global innholdsseksjon er allerede plassert: '+placement.entry);
   shared.set(placement.entry,resolveSharedContentPlacement(placement));
  }else{
   if(localIds.has(row.id))throw new Error('Duplisert lokalt anker: '+row.id);
   localIds.add(row.id);
  }
 }
 const placements=[...globals.values(),...shared.values()];
 const active=new Set<string>();
 for(const block of placements){
  if(block.visibility==='hidden')continue;
  if(active.has(block.id)||value.some(row=>row._block!=='global'&&row._block!=='sharedContent'&&row.id===block.id&&row.visibility!=='hidden'))
   throw new Error('Global og lokal seksjon deler synlig anker: '+block.id);
  active.add(block.id);
 }
 return value.flatMap(row=>{
  if(row._block==='global'){
   const block=globals.get(row.element)!;
   return block.visibility==='hidden'?[]:[{...block,globalElement:row.element,heading:'heading' in block?block.heading:'',body:'body' in block?block.body:[]}];
  }
  if(row._block==='sharedContent'){
   const block=shared.get(row.entry)!;
   return block.visibility==='hidden'?[]:[block];
  }
  return [row];
 });
}

/** All non-home page families can reference the same approved global blocks. */
export function resolveSynlighetSections(value: unknown, _slug: 'synlighet' | 'seo' = 'synlighet') {
  return resolvePageSections(value);
}

export function hasGlobalServiceProof(page: { slug: string; sections: Section[] }): boolean {
  return visibleServiceSections(page).some(section => section.globalElement === 'resultater');
}

/** A selected global proof must pass the existing evidence gates when explicitly placed. */
export function validateServiceGlobalProof(page: ServicePage, records: readonly unknown[]): void {
  const global = hasGlobalServiceProof(page), slot = getGlobalElement('resultater').content;
  if (global && (!slot.publicationApproved || !slot.caseIds.length || slot.caseIds.some(id => getPublishableCases({ ...slot, caseIds: [id] }, records).length !== 1))) {
    throw new Error('Globale Kunderesultater krever publiseringsgodkjenning og publiserbare case med gyldig evidens/tillatelse');
  }
  if (mixedServiceSlugs.has(page.slug)) checkServiceLinks(page, liveAnchors(page));
}

/** Shared visibility semantics across all page types. */
export function visibleServiceSections<T extends Section>(page: { slug: string; sections: T[] }): T[] {
  return page.sections.filter(section => section.visibility !== 'hidden');
}

export function validateSynlighetSections(page: ServicePage, _route: RouteFamily): void {
  if (!mixedServiceSlugs.has(page.slug)) return;
  const ids = new Set<string>();
  for (const section of page.sections) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || (!section.globalElement && (['hero', ...fixedAnchors].includes(section.id) || /^(?:calc-|scenario-|term-|package-home-|header-(?:desktop|mobile)-submenu-)/.test(section.id))) || (section.visibility !== 'hidden' && ids.has(section.id))) {
      throw new Error('Tjenestesidens seksjoner krever unike, gyldige ankre, og kan ikke bruke reserverte module-ID-er');
    }
    if (section.visibility !== 'hidden') ids.add(section.id);
  }
  if (page.slug === 'synlighet' && page.sections.filter(section => section.id === 'sjekk' && section.visibility !== 'hidden').length !== 1) {
    throw new Error('Synlighet krever én synlig sjekk-seksjon, lokal eller global');
  }
  checkServiceLinks(page, liveAnchors(page));
}

function liveAnchors(page: ServicePage): Set<string> {
  return new Set(['service-hero', 'main', 'mobile-menu', ...(page.faq?.length ? ['sporsmal'] : []), ...visibleServiceSections(page).map(section => section.id)]);
}

function checkServiceLinks(page: ServicePage, visibleIds: Set<string>): void {
  function checkLinks(value: unknown): void {
    if (!value || typeof value !== 'object') return;
    const href = (value as { href?: unknown }).href;
    if (typeof href === 'string') {
      const url = new URL(href, `https://service.invalid/${page.slug}/`);
      if (url.origin === 'https://service.invalid' && url.pathname === `/${page.slug}/` && url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (!visibleIds.has(id)) throw new Error(`Synlighet link requires a visible section: ${href}`);
      }
    }
    for (const child of Object.values(value)) checkLinks(child);
  }
  checkLinks({ ...page, sections: visibleServiceSections(page) });
}
