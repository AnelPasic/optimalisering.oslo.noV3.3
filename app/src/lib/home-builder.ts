import { z } from 'astro/zod';
import { surfaceSchema } from './surface.ts';
import { homeSectionDataSchema } from './home-section-data.ts';
import { headingAlignSchema } from './heading-alignment.ts';
import {contentLayoutSchema,boxVariantSchema} from './content-presentation.ts';
import {heroLayoutSchema} from './hero-presentation.ts';
import {assessmentLayoutSchema} from './assessment-layout.ts';
import calculatorMaster from '../content/global-elements/regneeksempel.json' with {type:'json'};

const link=z.object({label:z.string().trim().min(1),href:z.string().startsWith('/')});
export const heroPhotoSchema=z.object({src:z.string().regex(/^\/images\/home\/[a-z0-9][a-z0-9-]*\.webp$/),positionX:z.number().min(0).max(100),positionY:z.number().min(0).max(100)});
export const heroSchema=z.object({
 layout:heroLayoutSchema,
 eyebrow:z.string(),title:z.string().trim().min(1),support:z.string(),primaryCta:link,secondaryCta:link.optional(),
 visual:z.discriminatedUnion('kind',[z.object({kind:z.literal('none'),image:heroPhotoSchema.optional()}).strict(),z.object({kind:z.literal('image'),image:heroPhotoSchema}).strict()]),
 // A single typed project treatment, never arbitrary inline rich styling.
 titleEmphasis:z.enum(['none','first-sentence']).default('none'),
}).strict();
export type CommercialHero=z.infer<typeof heroSchema>;
export const homepageCoreIds=['behov','regneeksempel','sjekk','priser','resultater','mekanisme','passer','sporsmal'] as const;
const coreUids:Record<string,string>={behov:'31bd8ddb-5a47-4bc4-99b5-a5461e6103f6',regneeksempel:'dc92cca5-b95c-487c-b2a2-08e296972a65',sjekk:'d6ff367f-a926-4ee2-bdcb-7731ce43c183',priser:'7b687594-17f4-4266-adf5-12b710f563af',resultater:'ac0c6119-b0b8-4739-abd0-7ad7833e5556',mekanisme:'42fceeca-61eb-49cd-b250-95060a060aa9',passer:'e46130c0-de3c-40ef-815d-c16039346d6f',sporsmal:'75bcd975-20e4-433d-809e-b43d2b104f47'};
export const sectionVisibilitySchema=z.preprocess(value=>value==null||value===''?undefined:value,z.literal('hidden').optional());
export const homepagePlacementSchema=z.enum(homepageCoreIds.flatMap(id=>[`before:${id}`,`after:${id}`]) as [string,...string[]]);
const identity={uid:z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),id:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),name:z.string().trim().min(1),visibility:sectionVisibilitySchema};
const singleton=<T extends string,I extends string,S extends z.ZodType>(type:T,id:I,content:S)=>z.object({...identity,_block:z.literal(type),id:z.literal(id),content}).strict();
export const homepageBlockSchema=z.discriminatedUnion('_block',[
 singleton('selector','behov',homeSectionDataSchema.shape.selector),
 singleton('calculator','regneeksempel',homeSectionDataSchema.shape.calculator),
 singleton('packages','priser',homeSectionDataSchema.shape.packages),
 singleton('proof','resultater',homeSectionDataSchema.shape.proof),
 singleton('assessment','sjekk',z.object({layout:assessmentLayoutSchema,section:homeSectionDataSchema.shape.assessmentSection,form:homeSectionDataSchema.shape.form}).strict()),
 singleton('faq','sporsmal',z.object({eyebrow:z.string(),heading:z.string(),items:z.array(z.object({question:z.string(),answer:z.string()}))}).strict()),
 z.object({...identity,_block:z.literal('content'),eyebrow:z.string().optional(),heading:z.string().trim().min(1),body:z.array(z.string()).default([]),surface:surfaceSchema,headingAlign:headingAlignSchema,layout:contentLayoutSchema,
 items:z.array(z.object({title:z.string(),text:z.string(),href:z.string().startsWith('/').optional(),label:z.string().optional(),surface:surfaceSchema,boxVariant:boxVariantSchema})).optional(),links:z.array(link).optional()}).strict(),
]);
export const homepageBlocksSchema=z.array(homepageBlockSchema).max(24).superRefine((blocks,ctx)=>{
 for(const id of homepageCoreIds){const core=blocks.find(b=>b.id===id);if(!core&&id!=='regneeksempel')ctx.addIssue({code:'custom',message:`Missing required homepage block: ${id}`});else if(core&&core.uid!==coreUids[id])ctx.addIssue({code:'custom',message:`Protected homepage UUID: ${id}`});}
 const ids=new Set<string>(),uids=new Set<string>(),types=new Set<string>();
 // A content anchor also shares the DOM namespace with controls and ARIA targets.
 const reserved=new Set(['behov','regneeksempel','priser','resultater','sjekk','sporsmal','skjema','main','mobile-menu','site-menu','order-package','website','email','message','calc-visits','calc-conversion-label','calc-conversion','calc-traffic','calc-new-conversion-label','calc-new-conversion','calculator-error','scenario-illustration-label','scenario-current-label','scenario-improved-label','scenario-current-value','scenario-improved-value']);
 blocks.forEach((b,i)=>{
  if(ids.has(b.id)||uids.has(b.uid.toLowerCase()))ctx.addIssue({code:'custom',path:[i],message:'Block UUID and anchor must be unique'});
  if(b._block==='content'&&(reserved.has(b.id)||/^(?:package-home-|term-)/.test(b.id)))ctx.addIssue({code:'custom',path:[i,'id'],message:'Content cannot take a protected section, control or ARIA identity'});
  if(b._block!=='content'&&types.has(b._block))ctx.addIssue({code:'custom',path:[i,'_block'],message:'Duplicate homepage singleton'});
  if(['sjekk','priser'].includes(b.id)&&!isHomepageSectionVisible(b))ctx.addIssue({code:'custom',path:[i,'visibility'],message:'Sjekk og priser må være publisert: eksisterende lenker trenger disse målene'});
  ids.add(b.id);uids.add(b.uid.toLowerCase());types.add(b._block);
 });
});
export type HomepageBlock=z.infer<typeof homepageBlockSchema>;
export const globalPlacementSchema=z.object({_block:z.literal('global'),element:z.literal('regneeksempel'),uid:identity.uid,visibility:sectionVisibilitySchema}).strict();
export function getGlobalElement(id:string){
 if(id!=='regneeksempel')throw new Error(`Unknown global element: ${id}`);
 const master=homepageBlockSchema.parse(calculatorMaster);
 if(master._block!=='calculator'||master.id!==id||master.uid!==coreUids[id]||master.visibility!==undefined)throw new Error(`Invalid global master identity: ${id}`);
 return master as Extract<HomepageBlock,{_block:'calculator'}>;
}
export function resolveGlobalPlacement(value:unknown):HomepageBlock{
 const placement=globalPlacementSchema.parse(value);
 return {...getGlobalElement(placement.element),...(placement.visibility?{visibility:placement.visibility}:{})};
}
const ordinarySchema=homepageBlockSchema.options.find(s=>s.shape._block.value==='content')!;
export const optionalHomepageSectionSchema=ordinarySchema.extend({placement:homepagePlacementSchema});
const fixedShape=Object.fromEntries(homepageCoreIds.map(id=>[id,homepageBlockSchema.refine(b=>b.id===id&&b.uid===coreUids[id],'Protected section identity must match its fixed object')]));
fixedShape.regneeksempel=z.array(globalPlacementSchema).max(1).optional() as any;
export const homepageSourceSchema=z.object({sections:z.object(fixedShape).strict(),optionalSections:z.array(optionalHomepageSectionSchema).max(16).optional()}).strict();
export function isHomepageSectionVisible(section:{visibility?:unknown}){return section.visibility!=='hidden';}
type Source={sections:unknown;optionalSections?:unknown};
/** One source representation; derive a render-order array without storing duplicates. */
export function resolveHomepageSections(page:Source){
 const source=homepageSourceSchema.parse({sections:page.sections,optionalSections:page.optionalSections});
 const optional=source.optionalSections??[];
 const at=(placement:string)=>optional.filter(s=>s.placement===placement).map(({placement,...section})=>section);
 return homepageBlocksSchema.parse(homepageCoreIds.flatMap(id=>[...at(`before:${id}`),...(id==='regneeksempel'?((source.sections[id]??[]) as unknown as unknown[]).map(resolveGlobalPlacement):[source.sections[id]]),...at(`after:${id}`)]));
}
export function assertNever(value:never):never{throw new Error(`Unknown homepage block: ${JSON.stringify(value)}`);}

/** Resolve the primary-schema validated blocks after shared section defaults. */
export function getHomepageBlocks(page:Source){
 if(!Array.isArray(page.sections))return resolveHomepageSections(page);
 return homepageBlocksSchema.parse(page.sections.map((value)=>{
  const s=value as Record<string,unknown>;
  if(s._block==='content')return s;
  const {_block,uid,id,name,content,...rest}=s;
  for(const key of ['heading','body','surface','headingAlign','layout'])delete rest[key];
  return {...rest,_block,uid,id,name,content};
 }));
}
export function getHomepageBlock<T extends HomepageBlock['_block']>(page:Source,type:T):Extract<HomepageBlock,{_block:T}>{
 if(type==='calculator'){
  const placement=getHomepageBlocks(page).find(b=>b._block===type);
  return (placement??{...getGlobalElement('regneeksempel'),visibility:'hidden'}) as Extract<HomepageBlock,{_block:T}>;
 }
 const sections=Array.isArray(page.sections)?page.sections:Object.values(page.sections as Record<string,unknown>);
 const matches=sections.filter(value=>(value as {_block?:string})._block===type);
 if(matches.length!==1)throw new Error(`Homepage requires exactly one ${type} block`);
 return matches[0] as Extract<HomepageBlock,{_block:T}>;
}
/** Fail the build before deployment if published source links target a hidden section. */
export function validateHomepagePublicLinks(home:Source,pages:readonly unknown[]){
 const blocks=getHomepageBlocks(home),hidden=new Set(blocks.filter(b=>!isHomepageSectionVisible(b)).map(b=>b.id));
 const scan=(value:unknown,path:string)=>{
  if(!value||typeof value!=='object')return;
  for(const [key,item] of Object.entries(value)){
   if(key==='href'&&typeof item==='string'&&(item.startsWith('/')||item.startsWith('#'))){
    const url=new URL(item,'https://homepage.invalid/');
    const anchor=decodeURIComponent(url.hash.slice(1));
    if(url.origin==='https://homepage.invalid'&&url.pathname==='/'&&hidden.has(anchor))throw new Error(`Skjult seksjon #${anchor} har en publisert lenke (${path}). Vis seksjonen eller endre lenkemålet før publisering.`);
   }else scan(item,`${path}.${key}`);
  }
 };
 scan({...home,sections:blocks.filter(isHomepageSectionVisible),optionalSections:undefined},'home');
 for(const [index,page] of pages.entries())if((page as {kind?:string}).kind!=='home')scan(page,`pages.${index}`);
}
/** A derived view for existing commercial consumers; no second stored source. */
export function resolveHomepageContent(page:Source&{homepage?:{chrome:unknown}}){
 const blocks=getHomepageBlocks(page);
 const get=<T extends HomepageBlock['_block']>(type:T)=>(blocks.find(b=>b._block===type) as Extract<HomepageBlock,{_block:T}>);
 const assessment=get('assessment').content,faq=get('faq').content;
 return {selector:get('selector').content,calculator:getGlobalElement('regneeksempel').content,packages:get('packages').content,proof:get('proof').content,assessmentSection:assessment.section,form:assessment.form,faqHeading:faq.heading,faqEyebrow:faq.eyebrow,faq:faq.items,faqVisible:isHomepageSectionVisible(get('faq')),chrome:homeSectionDataSchema.shape.chrome.parse(page.homepage?.chrome)};
}
