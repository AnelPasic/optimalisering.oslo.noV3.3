import {z} from 'astro/zod';

export const contentLayoutValues=['default','two-columns','three-columns','stacked'] as const;
const automatic=(value:unknown)=>value==null||value===''?'default':value;
export const contentLayoutSchema=z.preprocess(automatic,z.enum(contentLayoutValues));
// Keep validating stored card metadata from earlier CMS versions.
export const boxVariantSchema=z.preprocess(value=>value==='plain'||automatic(value)==='default'?undefined:value,z.literal('card').optional());
export function contentLayoutAttribute(value:unknown,protectedRow=false){
 const parsed=contentLayoutSchema.safeParse(value);
 return !protectedRow&&parsed.success&&parsed.data!=='default'?parsed.data:undefined;
}

/** Paragraphs and option cards each honor the chosen layout independently. */
export function paragraphLayoutAttribute(section:{layout?:unknown;body?:readonly unknown[];items?:readonly unknown[]},protectedRow=false){
 if(protectedRow||!Array.isArray(section.body)||section.body.length<2)return undefined;
 const layout=contentLayoutAttribute(section.layout);
 return layout==='two-columns'||layout==='three-columns'?layout:undefined;
}
