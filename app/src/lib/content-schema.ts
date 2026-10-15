import { z } from 'astro/zod';
import { surfaceSchema, sectionModel } from './surface.ts';
import { headingAlignSchema } from './heading-alignment.ts';
import {contentLayoutSchema,boxVariantSchema} from './content-presentation.ts';
import { listingSchema, pageListSchema } from './page-list.ts';
import { homeSectionDataSchema, proofSlotSchema } from './home-section-data.ts';
import { compositionSchema, resolveRouteFamily, routeKindSchema } from './route-family.ts';

import { heroSchema, homepageBlocksSchema } from './home-builder.ts';

const link = z.object({label:z.string(),href:z.string().startsWith('/')});
export { proofSlotSchema } from './home-section-data.ts';
const homepage = z.object({chrome:homeSectionDataSchema.shape.chrome}).strict();
export const pageSchema = z.preprocess((input,context)=>{
  const raw=input as {kind?:string;sections?:unknown;hero?:unknown};
  if(raw?.kind==='home'){
    const result=homepageBlocksSchema.safeParse(raw.sections);
    if(!result.success)for(const issue of result.error.issues)context.addIssue({...issue,path:['sections',...issue.path]});
    const hero=heroSchema.safeParse(raw.hero);
    if(hero.success)return {...raw,eyebrow:hero.data.eyebrow,title:hero.data.title,intro:hero.data.support,cta:hero.data.primaryCta,sections:result.success?result.data.map(b=>({...b,heading:'heading' in b?b.heading:'',body:'body' in b?b.body:[]})):raw.sections};
  }
  return input;
}, z.object({
    slug: z.string(),
    kind: routeKindSchema,
    composition: compositionSchema.optional(),
    status: z.enum(['REVIEW_REQUIRED', 'CONTENT_LOCKED', 'PUBLISHED']),
    authority: z.enum(['DRAFT / NON-AUTHORITATIVE', 'CONTENT_LOCKED / AUTHORITATIVE']),
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: heroSchema.optional(),
    eyebrow: z.string(), title: z.string(), intro: z.string(),
    listing: listingSchema.optional(),
    sections: z.array(z.object({
      uid: z.string().optional(), name: z.string().optional(), content: z.unknown().optional(),
      _block: z.enum(['content', 'protected', 'pageList', 'selector', 'calculator', 'packages', 'proof', 'assessment', 'faq']).optional(), surface: surfaceSchema,
      pageList: pageListSchema.optional(),
      headingAlign: headingAlignSchema,
      layout: contentLayoutSchema,
      id: z.string(), eyebrow: z.string().optional(), heading: z.string(), body: z.array(z.string()).default([]),
      items: z.array(z.object({ title: z.string(), text: z.string(), href: z.string().startsWith('/').optional(), label: z.string().optional(), surface: surfaceSchema, boxVariant: boxVariantSchema })).optional(),
      links: z.array(link).optional(),
    })),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    cta: link,
    proof: proofSlotSchema.optional(),
    heroVisual: z.object({
      kind: z.enum(['photo', 'illustration']),
      src: z.string().regex(/^\/images\/services\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif|svg)$/),
      alt: z.string().trim().min(1),
      positionX: z.number().min(0).max(100), positionY: z.number().min(0).max(100),
    }).optional(),
    locale: z.enum(['nb', 'en']).optional(),
    translationKey: z.string().trim().min(1).optional(),
    homepage: homepage.optional(),
  }).superRefine((page, context) => {
    try { resolveRouteFamily(page); } catch (error) { context.addIssue({code:'custom',path:['composition'],message:error instanceof Error?error.message:'Invalid composition'}); }
    if (page.kind !== 'home') page.sections.forEach((section, index) => {
      const model = sectionModel(page.slug, section.id);
      const isPageList = section._block === 'pageList';
      if (isPageList && (page.slug !== 'innsikt' || page.kind !== 'index' || model === 'protected' || !section.pageList || section.items || section.links)) context.addIssue({ code: 'custom', path: ['sections', index], message: 'PageList requires Innsikt index configuration without duplicated items/links' });
      if (!isPageList && section.pageList) context.addIssue({ code: 'custom', path: ['sections', index, 'pageList'], message: 'PageList configuration requires its dedicated editor block' });
      if (!isPageList && section._block && section._block !== model) context.addIssue({ code: 'custom', path: ['sections', index, '_block'], message: 'Section editor model must match its protected identity' });
      if (model === 'protected' && (section.surface !== 'default' || section.items?.some(item => item.surface !== 'default'))) context.addIssue({ code: 'custom', path: ['sections', index, 'surface'], message: 'Protected CTA/form surfaces are design-system controlled' });
      if (model === 'protected' && (section.layout !== 'default' || section.items?.some(item => item.boxVariant !== 'default'))) context.addIssue({code:'custom',path:['sections',index,'layout'],message:'Protected CTA/form layout and boxes are design-system controlled'});
    });
    if (['synlighet', 'konvertering'].includes(page.slug) && page.sections.filter(section => section.id === 'sjekk').length !== 1) context.addIssue({ code: 'custom', path: ['sections'], message: 'Protected service CTA identity must remain present' });
    if (page.kind === 'home' && !page.homepage) context.addIssue({ code: 'custom', path: ['homepage'], message: 'Homepage content model is required' });
    if (page.kind === 'home') {
      if (!page.hero) context.addIssue({code:'custom',path:['hero'],message:'Structured homepage Hero is required'});

    }
  }));
