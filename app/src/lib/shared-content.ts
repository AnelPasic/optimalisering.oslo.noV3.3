import {z} from 'astro/zod';
import {readFileSync,readdirSync} from 'node:fs';
import {resolve,basename} from 'node:path';
import {surfaceSchema} from './surface.ts';
import {headingAlignSchema} from './heading-alignment.ts';
import {contentLayoutSchema,boxVariantSchema} from './content-presentation.ts';
// Keep the shared library independent of home-builder to avoid circular imports.
const sectionVisibilitySchema=z.preprocess(value=>value==null||value===''?undefined:value,z.literal('hidden').optional());

// One editable JSON section, never a copied Page section or a protected commercial master.
const key=z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const reserved=new Set(['behov','regneeksempel','sjekk','priser','resultater','mekanisme','passer','sporsmal','skjema','main','mobile-menu','site-menu','order-package','website','email','message']);
export const sharedContentSchema=z.object({
 _block:z.literal('content'),uid:z.string().uuid(),id:key,name:z.string().trim().min(1),
 eyebrow:z.string().optional(),heading:z.string().trim().min(1),body:z.array(z.string()).default([]),
 headingAlign:headingAlignSchema,layout:contentLayoutSchema,surface:surfaceSchema,
 items:z.array(z.object({title:z.string(),text:z.string(),href:z.string().startsWith('/').optional(),label:z.string().optional(),surface:surfaceSchema,boxVariant:boxVariantSchema})).optional(),
 links:z.array(z.object({label:z.string(),href:z.string().startsWith('/')})).optional(),
}).strict().superRefine((section,ctx)=>{
 if(reserved.has(section.id)||/^(?:calc-|scenario-|package-home-|term-|header-(?:desktop|mobile)-submenu-)/.test(section.id))
  ctx.addIssue({code:'custom',path:['id'],message:'Reservert eller beskyttet lenkeanker'});
});
export const sharedContentPlacementSchema=z.object({
 _block:z.literal('sharedContent'),entry:key,visibility:sectionVisibilitySchema,
}).strict();
const defaultDirectory=()=>resolve(process.cwd(),'src/content/global-content');
export function readSharedContent(id:string,directory=defaultDirectory()){
 const safeId=key.parse(id);
 const path=resolve(directory,safeId+'.json');
 const data=sharedContentSchema.parse(JSON.parse(readFileSync(path,'utf8')));
 if(data.id!==safeId)throw new Error('Global seksjon har forskjellig filnavn og ID: '+safeId);
 return data;
}
export function readSharedContentSources(directory=defaultDirectory()){
 return readdirSync(directory).filter(file=>file.endsWith('.json')).sort().map(file=>{
  const id=basename(file,'.json');
  // Also validate every existing global entry, not only currently referenced entries.
  const data=readSharedContent(id,directory);
  return [file,JSON.stringify(data)] as const;
 });
}
export function resolveSharedContentPlacement(value:unknown,directory=defaultDirectory()){
 const placement=sharedContentPlacementSchema.parse(value);
 const source=readSharedContent(placement.entry,directory);
 return {...source,...(placement.visibility?{visibility:placement.visibility}:{})};
}
