import {z} from 'astro/zod';

const href=z.string().regex(/^\/(?![\/\\])(?:[a-z0-9-]+\/)*(?:#[a-z0-9-]+)?$/,'Use an internal page or section');
const text=z.string().trim().min(1).max(180);
export const navigationChildSchema=z.object({label:text,href,description:text}).strict();
const megaColumn=z.object({
 heading:text,links:z.array(navigationChildSchema).min(1).max(8),
}).strict();
export const navigationMegaSchema=z.object({
 columns:z.array(megaColumn).min(2).max(4),
 promo:z.object({
  heading:text,body:text,cta:z.object({label:text,href}).strict(),
 }).strict().optional(),
}).strict();
export const navigationLinkSchema=z.object({
 label:text,href,
 submenuLabel:text.optional(),
 children:z.array(navigationChildSchema).max(6).optional(),
 presentation:z.enum(['dropdown','mega']).optional(),
 mega:navigationMegaSchema.optional(),
}).strict().superRefine((link,context)=>{
 if(link.presentation==='mega'){
  if(!link.mega)context.addIssue({code:'custom',path:['mega'],message:'Mega menu needs columns'});
  if(link.children?.length)context.addIssue({code:'custom',path:['children'],message:'Use mega columns, not dropdown children'});
  if(!link.submenuLabel)context.addIssue({code:'custom',path:['submenuLabel'],message:'Mega menu needs a button description'});
 }else{
  if(link.mega)context.addIssue({code:'custom',path:['mega'],message:'Mega content requires mega presentation'});
  if(link.children?.length&&!link.submenuLabel)context.addIssue({code:'custom',path:['submenuLabel'],message:'Submenu needs a descriptive button label'});
 }
 const targets=link.presentation==='mega'
  ?link.mega?.columns.flatMap(col=>col.links.map(item=>item.href))??[]
  :link.children?.map(child=>child.href)??[];
 const seen=new Set<string>();
 targets.forEach((destination,index)=>{
  if(seen.has(destination))context.addIssue({code:'custom',path:['navigation',index,'href'],message:'Duplicate navigation destination'});
  seen.add(destination);
 });
});
type Link={
 href:string;
 children?:readonly {href:string}[];
 presentation?:'dropdown'|'mega';
 mega?:{columns:readonly {links:readonly {href:string}[]}[]};
};
const path=(value:string)=>value.replace(/\/$/,'')||'/';
export function navigationState(link:Link,pathname:string){
 const current=!link.href.includes('#')&&path(link.href)===path(pathname);
 const targets=link.presentation==='mega'
  ?link.mega?.columns.flatMap(col=>col.links)??[]
  :link.children??[];
 const within=targets.some(child=>path(child.href.split('#')[0])===path(pathname));
 return {current,within};
}
