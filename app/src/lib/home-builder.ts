import { z } from 'astro/zod';
import { surfaceSchema } from './surface.ts';
import { headingAlignSchema } from './heading-alignment.ts';

const link=z.object({label:z.string().trim().min(1),href:z.string().startsWith('/')});
export const heroPhotoSchema=z.object({src:z.string().regex(/^\/images\/home\/[a-z0-9][a-z0-9-]*\.webp$/),positionX:z.number().min(0).max(100),positionY:z.number().min(0).max(100)});
export const heroSchema=z.object({
 layout:z.enum(['split-right','split-left','centered']).default('split-right'),
 eyebrow:z.string(),title:z.string().trim().min(1),support:z.string(),primaryCta:link,secondaryCta:link.optional(),
 visual:z.discriminatedUnion('kind',[z.object({kind:z.literal('none'),image:heroPhotoSchema.optional()}).strict(),z.object({kind:z.literal('image'),image:heroPhotoSchema}).strict()]),
 // A single typed project treatment, never arbitrary inline rich styling.
 titleEmphasis:z.enum(['none','first-sentence']).default('none'),
}).strict();
export type CommercialHero=z.infer<typeof heroSchema>;
const identity={uid:z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),id:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),name:z.string().trim().min(1)};
const singleton=<T extends string,I extends string>(type:T,id:I)=>z.object({...identity,_block:z.literal(type),id:z.literal(id)}).strict();
export const homepageBlockSchema=z.discriminatedUnion('_block',[
 singleton('selector','behov'),singleton('calculator','regneeksempel'),singleton('packages','priser'),singleton('proof','resultater'),singleton('assessment','sjekk'),singleton('faq','sporsmal'),
 z.object({...identity,_block:z.literal('content'),eyebrow:z.string().optional(),heading:z.string().trim().min(1),body:z.array(z.string()).default([]),surface:surfaceSchema,headingAlign:headingAlignSchema,
 items:z.array(z.object({title:z.string(),text:z.string(),href:z.string().startsWith('/').optional(),label:z.string().optional(),surface:surfaceSchema})).optional(),links:z.array(link).optional()}).strict(),
]);
export const homepageBlocksSchema=z.array(homepageBlockSchema).superRefine((blocks,ctx)=>{
 const ids=new Set<string>(),uids=new Set<string>(),types=new Set<string>();
 // A content anchor also shares the DOM namespace with controls and ARIA targets.
 const reserved=new Set(['behov','regneeksempel','priser','resultater','sjekk','sporsmal','skjema','main','mobile-menu','site-menu','order-package','website','email','message','calc-visits','calc-conversion-label','calc-conversion','calc-traffic','calc-new-conversion-label','calc-new-conversion','calculator-error','scenario-illustration-label','scenario-current-label','scenario-improved-label','scenario-current-value','scenario-improved-value']);
 blocks.forEach((b,i)=>{
  if(ids.has(b.id)||uids.has(b.uid))ctx.addIssue({code:'custom',path:[i],message:'Block UUID and anchor must be unique'});
  if(b._block==='content'&&(reserved.has(b.id)||/^(?:package-home-|term-)/.test(b.id)))ctx.addIssue({code:'custom',path:[i,'id'],message:'Content cannot take a protected section, control or ARIA identity'});
  if(b._block!=='content'&&types.has(b._block))ctx.addIssue({code:'custom',path:[i,'_block'],message:'Duplicate homepage singleton'});
  ids.add(b.id);uids.add(b.uid);types.add(b._block);
 });
});
export type HomepageBlock=z.infer<typeof homepageBlockSchema>;
export function assertNever(value:never):never{throw new Error(`Unknown homepage block: ${JSON.stringify(value)}`);}
