import { z } from 'astro/zod';

export const routeKindSchema=z.enum(['home','service','index','article','pricing','assessment','utility']);
const anchor=z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const compositionSchema=z.object({
  commercialText:z.boolean().optional(),
  service:z.object({
    sectionVisuals:z.array(z.object({section:anchor,visual:z.enum(['behov','kanaler'])}).strict()).default([]),
    sectionSurfaces:z.array(z.object({section:anchor,surface:z.literal('secondary')}).strict()).default([]),
  }).strict().optional(),
}).strict();
type Source={slug?:string;kind:string;composition?:unknown;sections:{id:string;links?:{href:string;label:string}[]}[]};

/** Presentation metadata selects composition only; proof and prices retain their independent authority. */
export function resolveRouteFamily(page:Source){
  const family=routeKindSchema.parse(page.kind);
  const composition=compositionSchema.parse(page.composition??{});
  if(composition.service&&family!=='service')throw new Error('Service capabilities require the service family');
  if(composition.commercialText&&family!=='service'&&family!=='home'&&family!=='pricing')throw new Error('Commercial binding requires an explicit commercial family');
  const service=composition.service??{sectionVisuals:[],sectionSurfaces:[]};
  const cmsOnly=page.slug==='synlighet';
  function section(id:string){
    const matches=page.sections.filter(s=>s.id===id);
    if(matches.length!==1)throw new Error(`Composition requires exactly one section: ${id}`);
    return matches[0];
  }
  const seen=new Set<string>();
  for(const visual of service.sectionVisuals){if(!cmsOnly)section(visual.section);if(seen.has(visual.section))throw new Error('Duplicate section visual');seen.add(visual.section);}
  const surfaces=new Set<string>();
  for(const surface of service.sectionSurfaces){if(!cmsOnly)section(surface.section);if(surfaces.has(surface.section))throw new Error('Duplicate section surface');surfaces.add(surface.section);}
  return {
    family,
    bindCommercialText:family==='home'||family==='pricing'||composition.commercialText===true,
    service,
  };
}
export type RouteFamily=ReturnType<typeof resolveRouteFamily>;
