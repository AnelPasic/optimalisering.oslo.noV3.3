import {z} from 'astro/zod';

const href=z.string().regex(/^\/(?![\/\\])(?:[a-z0-9-]+\/)*(?:#[a-z0-9-]+)?$/,'Use an internal page or section');
const text=z.string().trim().min(1).max(180);
export const navigationChildSchema=z.object({label:text,href,description:text}).strict();
export const navigationLinkSchema=z.object({
 label:text,href,submenuLabel:text.optional(),children:z.array(navigationChildSchema).max(6).optional(),
}).strict().superRefine((link,context)=>{
 if(link.children?.length&&!link.submenuLabel)context.addIssue({code:'custom',path:['submenuLabel'],message:'Submenu needs a descriptive button label'});
 const seen=new Set<string>();
 link.children?.forEach((child,index)=>{if(seen.has(child.href))context.addIssue({code:'custom',path:['children',index,'href'],message:'Duplicate navigation destination'});seen.add(child.href);});
});
type Link={href:string;children?:readonly {href:string}[]};
const path=(value:string)=>value.replace(/\/$/,'')||'/';
export function navigationState(link:Link,pathname:string){
 const current=!link.href.includes('#')&&path(link.href)===path(pathname);
 const within=!!link.children?.some(child=>path(child.href.split('#')[0])===path(pathname));
 return {current,within};
}
