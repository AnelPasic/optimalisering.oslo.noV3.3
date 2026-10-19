import { z } from 'astro/zod';
import { realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { getPublishableCases } from './proof.ts';

// Presentation only. The proof registry and public projection remain authoritative.
export const featuredProofVisualSchema = z.object({
  caseId: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  src: z.string().regex(/^\/images\/proof\/[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif)$/),
  alt: z.string().trim().min(1),
  positionX: z.number().min(0).max(100).default(50),
  positionY: z.number().min(0).max(100).default(50),
}).strict();
// CMS can clear individual optional fields. Incomplete media is omitted at render.
export const featuredProofVisualFieldSchema = featuredProofVisualSchema.partial();
export const proofLayoutSchema = z.preprocess(value => value == null || value === '' ? 'alternating' : value, z.enum(['alternating', 'mediaCards']));
const caseVisualFieldSchema = featuredProofVisualFieldSchema.omit({caseId:true});
// Fixed case keys prevent duplicate bindings and a second Eurotents image source.
export const proofCaseVisualsSchema = z.object({nysta:caseVisualFieldSchema.optional(),'helt-opplagt':caseVisualFieldSchema.optional()}).strict();

function resolveNamedProofVisual(input:unknown, slot:{publicationApproved:boolean;caseIds:string[]},records:readonly unknown[],publicDirectory:string){
  const parsed=featuredProofVisualSchema.safeParse(input);
  if(!parsed.success)return undefined;
  const visual=parsed.data;
  if(!slot.caseIds.includes(visual.caseId)||!getPublishableCases({...slot,caseIds:[visual.caseId]},records).length)return undefined;
  const record=records.find((r):r is {id:string;namingPermission:string}=>!!r&&typeof r==='object'&&'id' in r&&r.id===visual.caseId&&'namingPermission' in r);
  if(!record||!['GRANTED','NAME_APPROVED'].includes(record.namingPermission))return undefined;
  try{
    const directory=realpathSync(resolve(publicDirectory,'images/proof'));
    const file=realpathSync(resolve(publicDirectory,visual.src.slice(1)));
    if(!file.startsWith(directory+sep)||!statSync(file).isFile()||statSync(file).size===0)return undefined;
    return visual;
  }catch{return undefined;}
}

export function resolveProofCaseVisual(caseId:string, presentation:{featuredVisual?:unknown;caseVisuals?:z.infer<typeof proofCaseVisualsSchema>},slot:{publicationApproved:boolean;caseIds:string[]},records:readonly unknown[],publicDirectory='public'){
  if(caseId==='nysta'||caseId==='helt-opplagt'){
    const value=presentation.caseVisuals?.[caseId];
    return value?resolveNamedProofVisual({...value,caseId},slot,records,publicDirectory):undefined;
  }
  const parsed=featuredProofVisualSchema.safeParse(presentation.featuredVisual);
  return parsed.success&&parsed.data.caseId===caseId?resolveNamedProofVisual(parsed.data,slot,records,publicDirectory):undefined;
}

export function resolveFeaturedProofVisual(input: unknown, slot: { publicationApproved: boolean; caseIds: string[] }, records: readonly unknown[], publicDirectory = 'public'): z.infer<typeof featuredProofVisualSchema> | undefined {
  const parsed = featuredProofVisualSchema.safeParse(input);
  if (!parsed.success) return undefined;
  const visual = parsed.data;
  const first = slot.caseIds.find(id => getPublishableCases({ ...slot, caseIds: [id] }, records).length > 0);
  if (first !== visual.caseId) return undefined;
  return resolveNamedProofVisual(visual,slot,records,publicDirectory);
}
