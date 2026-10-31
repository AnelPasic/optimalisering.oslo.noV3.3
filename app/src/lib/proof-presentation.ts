import { z } from 'astro/zod';
import { realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { getPublishableCases, proofCaseSchema, type PublicProof } from './proof.ts';

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

/** Optional, site-specific copy. Never changes the audited proof registry. */
const optionalLabel=(max:number)=>z.preprocess(
  value=>value==null||value===''?undefined:value,
  z.string().trim().min(1).max(max).optional()
);
export const proofDisplayOverrideSchema=z.object({
  caseId:z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  displayName:optionalLabel(120),
  dominantMetric:optionalLabel(180),
  before:optionalLabel(60),
  after:optionalLabel(60),
  delta:optionalLabel(160),
  periodBefore:optionalLabel(100),
  periodAfter:optionalLabel(100),
  sourceNote:optionalLabel(600),
}).strict().superRefine((value,context)=>{
  const measured=['dominantMetric','before','after','delta','periodBefore','periodAfter'] as const;
  if(measured.some(key=>value[key]!==undefined)&&!value.sourceNote)
    context.addIssue({code:'custom',path:['sourceNote'],message:'Endrede måltall, metrikker eller perioder krever en intern kildehenvisning'});
});
export const proofDisplayOverridesSchema=z.array(proofDisplayOverrideSchema).max(12).default([])
  .superRefine((items,context)=>{
    const seen=new Set<string>();
    items.forEach((item,index)=>{
      if(seen.has(item.caseId))context.addIssue({code:'custom',path:[index,'caseId'],message:'Samme case kan bare overstyres én gang'});
      seen.add(item.caseId);
    });
  });
export type ProofDisplayOverride=z.infer<typeof proofDisplayOverrideSchema>;

/** Apply only after getPublishableCases has approved the original case.
 * Anonymous records must never be renamed or rewritten through presentation.
 */
export function applyProofDisplayOverride(
  original:PublicProof,
  caseId:string,
  overrides:readonly ProofDisplayOverride[]|undefined,
  records:readonly unknown[],
):PublicProof {
  const candidate=overrides?.find(value=>value.caseId===caseId);
  if(!candidate)return original;
  const record=records.find(value=>value&&typeof value==='object'&&'id' in value&&value.id===caseId);
  const parsed=proofCaseSchema.safeParse(record);
  if(!parsed.success||!['GRANTED','NAME_APPROVED'].includes(parsed.data.namingPermission))return original;
  return {
    ...original,
    displayName:candidate.displayName??original.displayName,
    dominantMetric:candidate.dominantMetric??original.dominantMetric,
    before:candidate.before??original.before,
    after:candidate.after??original.after,
    // A changed comparison must not inherit a now-stale delta from the audited record.
    delta:candidate.delta??(candidate.before!==undefined||candidate.after!==undefined||candidate.dominantMetric!==undefined?null:original.delta),
    period:{
      before:candidate.periodBefore??original.period.before,
      after:candidate.periodAfter??original.period.after,
    },
  };
}
