import { z } from 'astro/zod';
import { surfaceSchema } from './surface.ts';
import { homeSectionDataSchema } from './home-section-data.ts';
import { headingAlignSchema } from './heading-alignment.ts';
import {contentLayoutSchema,boxVariantSchema} from './content-presentation.ts';

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
const singleton=<T extends string,I extends string,S extends z.ZodType>(type:T,id:I,content:S)=>z.object({...identity,_block:z.literal(type),id:z.literal(id),content}).strict();
export const homepageBlockSchema=z.discriminatedUnion('_block',[
 singleton('selector','behov',homeSectionDataSchema.shape.selector),
 singleton('calculator','regneeksempel',homeSectionDataSchema.shape.calculator),
 singleton('packages','priser',homeSectionDataSchema.shape.packages),
 singleton('proof','resultater',homeSectionDataSchema.shape.proof),
 singleton('assessment','sjekk',z.object({section:homeSectionDataSchema.shape.assessmentSection,form:homeSectionDataSchema.shape.form}).strict()),
 singleton('faq','sporsmal',z.object({eyebrow:z.string(),heading:z.string(),items:z.array(z.object({question:z.string(),answer:z.string()}))}).strict()),
 z.object({...identity,_block:z.literal('content'),eyebrow:z.string().optional(),heading:z.string().trim().min(1),body:z.array(z.string()).default([]),surface:surfaceSchema,headingAlign:headingAlignSchema,layout:contentLayoutSchema,
 items:z.array(z.object({title:z.string(),text:z.string(),href:z.string().startsWith('/').optional(),label:z.string().optional(),surface:surfaceSchema,boxVariant:boxVariantSchema})).optional(),links:z.array(link).optional()}).strict(),
]);
export const homepageBlocksSchema=z.array(homepageBlockSchema).superRefine((blocks,ctx)=>{
 if(blocks.length!==8)ctx.addIssue({code:'custom',message:'Homepage pilot requires exactly eight sections'});
 for(const id of ['behov','regneeksempel','priser','resultater','mekanisme','passer','sjekk','sporsmal'])if(!blocks.some(b=>b.id===id))ctx.addIssue({code:'custom',message:`Missing required homepage block: ${id}`});
 const ids=new Set<string>(),uids=new Set<string>(),types=new Set<string>();
 // A content anchor also shares the DOM namespace with controls and ARIA targets.
 const reserved=new Set(['behov','regneeksempel','priser','resultater','sjekk','sporsmal','skjema','main','mobile-menu','site-menu','order-package','website','email','message','calc-visits','calc-conversion-label','calc-conversion','calc-traffic','calc-new-conversion-label','calc-new-conversion','calculator-error','scenario-illustration-label','scenario-current-label','scenario-improved-label','scenario-current-value','scenario-improved-value']);
 blocks.forEach((b,i)=>{
  if(ids.has(b.id)||uids.has(b.uid.toLowerCase()))ctx.addIssue({code:'custom',path:[i],message:'Block UUID and anchor must be unique'});
  if(b._block==='content'&&(reserved.has(b.id)||/^(?:package-home-|term-)/.test(b.id)))ctx.addIssue({code:'custom',path:[i,'id'],message:'Content cannot take a protected section, control or ARIA identity'});
  if(b._block!=='content'&&types.has(b._block))ctx.addIssue({code:'custom',path:[i,'_block'],message:'Duplicate homepage singleton'});
  ids.add(b.id);uids.add(b.uid.toLowerCase());types.add(b._block);
 });
});
export type HomepageBlock=z.infer<typeof homepageBlockSchema>;
export function assertNever(value:never):never{throw new Error(`Unknown homepage block: ${JSON.stringify(value)}`);}

/** Resolve the primary-schema validated blocks after shared section defaults. */
export function getHomepageBlocks(page:{sections:unknown[]}){
 return homepageBlocksSchema.parse(page.sections.map((value)=>{
  const s=value as Record<string,unknown>;
  if(s._block==='content')return s;
  const {_block,uid,id,name,content,...rest}=s;
  for(const key of ['heading','body','surface','headingAlign','layout'])delete rest[key];
  return {...rest,_block,uid,id,name,content};
 }));
}
export function getHomepageBlock<T extends HomepageBlock['_block']>(page:{sections:unknown[]},type:T):Extract<HomepageBlock,{_block:T}>{
 const matches=page.sections.filter(value=>(value as {_block?:string})._block===type);
 if(matches.length!==1)throw new Error(`Homepage requires exactly one ${type} block`);
 return matches[0] as Extract<HomepageBlock,{_block:T}>;
}
/** A derived view for existing commercial consumers; no second stored source. */
export function resolveHomepageContent(page:{sections:unknown[];homepage?:{chrome:unknown}}){
 const blocks=getHomepageBlocks(page);
 const get=<T extends HomepageBlock['_block']>(type:T)=>(blocks.find(b=>b._block===type) as Extract<HomepageBlock,{_block:T}>);
 const assessment=get('assessment').content,faq=get('faq').content;
 return {selector:get('selector').content,calculator:get('calculator').content,packages:get('packages').content,proof:get('proof').content,assessmentSection:assessment.section,form:assessment.form,faqHeading:faq.heading,faqEyebrow:faq.eyebrow,faq:faq.items,chrome:homeSectionDataSchema.shape.chrome.parse(page.homepage?.chrome)};
}
