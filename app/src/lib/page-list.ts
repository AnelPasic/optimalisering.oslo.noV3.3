import { z } from 'astro/zod';
import { listingVisualFieldSchema, resolveListingVisual, type ListingVisual } from './listing-visual.ts';
import { getPublishableCases } from './proof.ts';

const optionalText = z.preprocess(value => typeof value === 'string' && !value.trim() ? undefined : value, z.string().optional());
export const listingSchema = z.object({
  title: optionalText, summary: optionalText, label: optionalText,
  order: z.number().int().optional(), visible: z.boolean().default(true),
  visual: listingVisualFieldSchema.optional(),
});
const articleReference = z.object({slug:z.string().regex(/^innsikt\/[a-z0-9]+(?:[a-z0-9/-]*[a-z0-9])?$/).refine(slug=>!slug.includes('//'),'Invalid article slug')}).strict();
const articleReferences = z.array(articleReference).default([]).refine(rows => new Set(rows.map(row=>row.slug)).size===rows.length,'Duplicate article references');
const pageSlug=z.string().regex(/^(?:home|[a-z0-9]+(?:[a-z0-9/-]*[a-z0-9])?)$/).refine(value=>!value.includes('//'),'Invalid page slug');
const internalOrHttps = z.string().trim().min(1).refine(value=>{
  if(/[\u0000-\u001f\u007f]/.test(value))return false;
  if(value.startsWith('/'))return !value.startsWith('//') && !value.includes('\\');
  try{const url=new URL(value);return (url.protocol==='https:'||url.protocol==='http:')&&!url.username&&!url.password;}catch{return false;}
},'Use a root-relative path or an http(s) URL');
const pageEntry=z.object({_block:z.literal('page'),slug:pageSlug}).strict();
const caseEntry=z.object({_block:z.literal('case'),caseId:z.string().regex(/^[a-z0-9][a-z0-9-]*$/)}).strict();
const urlEntry=z.object({_block:z.literal('url'),href:internalOrHttps,title:z.string().trim().min(1),summary:z.string().default(''),label:z.string().default('Les mer')}).strict();
export const pageListEntrySchema=z.discriminatedUnion('_block',[pageEntry,caseEntry,urlEntry]);
export const pageListSchema = z.object({
  // Missing source/entries are intentional for already published H-021 PageLists.
  source:z.enum(['articles','pages','cases']).default('articles'),
  mode: z.enum(['automatic','manual']).default('automatic'),
  sort: z.enum(['editorial','title']).default('editorial'),
  limit: z.number().int().min(1).max(12).default(6),
  layout: z.enum(['cards','mediaCards','alternating','compact','links']).default('cards'),
  selected: articleReferences,
  excluded: articleReferences,
  entries:z.array(pageListEntrySchema).max(9).default([]).refine(entries=>{
    const keys=entries.map(entry=>entry._block==='page'?'page:'+entry.slug:entry._block==='case'?'case:'+entry.caseId:'url:'+entry.href);
    return new Set(keys).size===keys.length;
  },'Duplicate manual PageList entries'),
}).strict();
export type PageListConfig=z.infer<typeof pageListSchema>;
export interface ListPage {
  slug:string;kind:string;title:string;intro:string;
  listing?:z.input<typeof listingSchema>;
}
export interface PageListItem {slug:string;title:string;summary:string;label:string;href?:string;visual?:ListingVisual;}
const normalizeSlug=(slug:string)=>slug.replace(/^\/+|\/+$/g,'');
const collator=new Intl.Collator('nb',{usage:'sort',sensitivity:'variant'});
const sortPages=(pages:ListPage[],mode:'editorial'|'title')=>pages.sort((a,b)=>{
  if(mode==='editorial'){
    const aOrder=a.listing?.order??Infinity,bOrder=b.listing?.order??Infinity;
    if(aOrder!==bOrder)return aOrder<bOrder?-1:1;
  }
  return collator.compare(listingSchema.parse({...a.listing,visual:undefined}).title??a.title,listingSchema.parse({...b.listing,visual:undefined}).title??b.title)||collator.compare(a.slug,b.slug);
});
const publicPage=(page:ListPage,publicDirectory:string):PageListItem=>{
  const listing=listingSchema.parse({...page.listing,visual:undefined});
  const visual=resolveListingVisual(page.listing?.visual,publicDirectory);
  const slug=normalizeSlug(page.slug);
  return {slug,title:listing.title??page.title,summary:listing.summary??page.intro,label:listing.label??'Les mer',href:slug==='home'?'/':`/${slug}/`,...(visual?{visual}:{})};
};
type CaseRecord={id?:unknown;clientName?:unknown};
function publicCases(records:readonly unknown[]):PageListItem[]{
  const ids=records.flatMap(record=>record&&typeof record==='object'&&'id' in record&&typeof record.id==='string'?[record.id]:[]);
  const unique=[...new Set(ids)];
  return unique.flatMap(id=>{
    const publicEntry=getPublishableCases({publicationApproved:true,caseIds:[id]},records)[0];
    return publicEntry?[{slug:'case:'+id,title:publicEntry.displayName,summary:publicEntry.dominantMetric,label:'',}]:[];
  });
}
/** Resolves existing CMS content at build time. The PageList is never a second page authority. */
export function resolvePageList(input:unknown,pages:readonly ListPage[],publicDirectory='public',caseRecords:readonly unknown[]=[]):PageListItem[]{
  const config=pageListSchema.parse(input);
  const normalized=pages.map(page=>({...page,slug:normalizeSlug(page.slug)}));
  const articles=normalized.filter(page=>page.kind==='article'&&articleReference.safeParse({slug:page.slug}).success);
  const pageScope=config.source==='pages'||(config.mode==='manual'&&config.entries.some(entry=>entry._block==='page'));
  const chosenScope=pageScope?normalized:articles;
  if(new Set(chosenScope.map(page=>page.slug)).size!==chosenScope.length)throw new Error('PageList: duplicate page slugs');
  const bySlug=new Map(normalized.map(page=>[page.slug,page]));
  const cases=publicCases(caseRecords);
  const casesById=new Map(cases.map(c=>[c.slug.slice(5),c]));
  if(config.mode==='manual'){
    if(config.entries.length){
      return config.entries.flatMap(entry=>{
        if(entry._block==='url')return [{slug:'url:'+entry.href,title:entry.title,summary:entry.summary,label:entry.label,href:entry.href}];
        if(entry._block==='case')return casesById.has(entry.caseId)?[casesById.get(entry.caseId)!]:[];
        const page=bySlug.get(entry.slug);
        if(!page)throw new Error(`PageList: missing page reference "${entry.slug}"`);
        if(page.listing?.visible===false)return [];
        return [publicPage(page,publicDirectory)];
      });
    }
    // Preserve the older article-only manual configuration (H-021).
    const articleBySlug=new Map(articles.map(page=>[page.slug,page]));
    return config.selected.flatMap(({slug})=>{
      const page=articleBySlug.get(slug);
      if(!page)throw new Error(`PageList: missing Innsikt article reference "${slug}"`);
      return page.listing?.visible===false?[]:[publicPage(page,publicDirectory)];
    });
  }
  if(config.source==='cases'){
    return (config.sort==='title'?cases.sort((a,b)=>collator.compare(a.title,b.title)):cases).slice(0,config.limit);
  }
  const source=config.source==='pages'?normalized.filter(page=>page.kind!=='home'):articles;
  const excluded=new Set(config.excluded.map(row=>row.slug));
  return sortPages(source.filter(page=>page.listing?.visible!==false&&!excluded.has(page.slug)),config.sort).slice(0,config.limit).map(page=>publicPage(page,publicDirectory));
}
