import { z } from 'astro/zod';
import { surfaceSchema, sectionModel } from './surface.ts';
import { headingAlignSchema } from './heading-alignment.ts';
import {contentLayoutSchema,boxVariantSchema} from './content-presentation.ts';
import { listingSchema, pageListSchema } from './page-list.ts';
import { homeSectionDataSchema, proofSlotSchema } from './home-section-data.ts';
import { compositionSchema, resolveRouteFamily, routeKindSchema } from './route-family.ts';

import { heroSchema, resolveHomepageSections, sectionVisibilitySchema, validateHomepagePublicLinks } from './home-builder.ts';
import {heroPresentationSchema} from './hero-presentation.ts';
import { validateSynlighetSections, resolveSynlighetSections, serviceGlobalIds } from './service-sections.ts';
import {synlighetHeroSchema,legacyHeroKeys} from './synlighet-hero.ts';

const link = z.object({label:z.string(),href:z.string().startsWith('/')});
export { proofSlotSchema } from './home-section-data.ts';
const homepage = z.object({}).strict(); // Header/footer have independent global CMS sources.
export const pageSchema = z.preprocess((input,context)=>{
  const raw=input as {slug?:string;kind?:string;sections:unknown;hero?:unknown};
  // Native CMS Hero is now a single authored object. Legacy projections are
  // runtime-only for existing commercial/section components; they are never
  // written back as duplicate CMS fields.
  if(raw?.kind!=='home'&&raw?.slug!=='synlighet'&&raw?.kind!=='pricing'&&raw?.hero&&typeof raw.hero==='object'&&'primaryCta' in raw.hero){
    const hero=synlighetHeroSchema.safeParse(raw.hero);
    if(!hero.success)for(const issue of hero.error.issues)context.addIssue({...issue,path:['hero',...issue.path]});
    if(legacyHeroKeys.some(key=>Object.hasOwn(raw,key)))context.addIssue({code:'custom',path:['hero'],message:'Hero is a single CMS authority; do not save duplicate top-level Hero fields'});
    if(hero.success) {
      const v=hero.data;
      return {...raw,hero:v,eyebrow:v.eyebrow,title:v.title,intro:v.support,cta:v.primaryCta,
        ...(v.visual.kind==='image'?{heroVisual:v.visual.image}:{})};
    }
  }
  if(raw?.kind!=='home'&&raw?.slug!=='synlighet'&&raw?.hero!==undefined){const hero=heroPresentationSchema.safeParse(raw.hero);if(!hero.success)for(const issue of hero.error.issues)context.addIssue({...issue,path:['hero',...issue.path]});}
  if(raw?.kind!=='home'&&Array.isArray(raw?.sections)&&raw.sections.some(section=>section&&typeof section==='object'&&'globalElement' in section)) context.addIssue({code:'custom',path:['sections'],message:'Use a global reference, not resolved master fields'});
  if(raw?.slug==='synlighet'&&raw.kind==='service') {
    try {
      const hub=raw as typeof raw&{proof?:unknown;faq?:unknown;composition?:{service?:Record<string,unknown>}};
      if(Object.hasOwn(hub,'proof')||Object.hasOwn(hub,'faq')||['proofAfter','pricingBridge','closingCta'].some(key=>Object.hasOwn(hub.composition?.service??{},key))) throw new Error('Synlighet viser bare CMS-plasserte seksjoner; fjern lokal proof/faq og automatisk proofAfter/pricingBridge/closingCta');
      if(legacyHeroKeys.some(key=>Object.hasOwn(raw,key))) throw new Error('Synlighet Hero must have one nested source; remove legacy top-level Hero fields');
      const hero=synlighetHeroSchema.parse(raw.hero);
      // Compatibility projections exist only in parsed collection data, never in CMS JSON.
      return {...raw,hero,eyebrow:hero.eyebrow,title:hero.title,intro:hero.support,cta:hero.primaryCta,heroVisual:hero.visual.image,sections:resolveSynlighetSections(raw.sections)};
    }
    catch(error) { context.addIssue({code:'custom',path:['sections'],message:error instanceof Error?error.message:'Invalid service placements'}); }
  }
  if(raw?.slug==='seo' && raw.kind==='service') {
    try { return { ...raw, sections: resolveSynlighetSections(raw.sections, 'seo') }; }
    catch(error) { context.addIssue({code:'custom',path:['sections'],message:error instanceof Error?error.message:'Invalid SEO section placement'}); }
  }
  if(raw?.kind==='home'){
    let blocks:ReturnType<typeof resolveHomepageSections>|undefined;
    try{blocks=resolveHomepageSections(raw);}catch(error){if(error instanceof z.ZodError)for(const issue of error.issues)context.addIssue({...issue});else context.addIssue({code:'custom',path:['sections'],message:error instanceof Error?error.message:'Invalid homepage sections'});}
    if(blocks)try{validateHomepagePublicLinks({...raw,sections:blocks},[]);}catch(error){context.addIssue({code:'custom',path:['sections'],message:error instanceof Error?error.message:'Invalid homepage anchor'});}
    const hero=heroSchema.safeParse(raw.hero);
    if(!hero.success)for(const issue of hero.error.issues)context.addIssue({...issue,path:['hero',...issue.path]});
    if(hero.success)return {...raw,eyebrow:hero.data.eyebrow,title:hero.data.title,intro:hero.data.support,cta:hero.data.primaryCta,sections:blocks?blocks.map(b=>({...b,heading:'heading' in b?b.heading:'',body:'body' in b?b.body:[]})):raw.sections};
  }
  return input;
}, z.object({
    slug: z.string(),
    kind: routeKindSchema,
    composition: compositionSchema.optional(),
    status: z.enum(['REVIEW_REQUIRED', 'CONTENT_LOCKED', 'PUBLISHED']),
    authority: z.enum(['DRAFT / NON-AUTHORITATIVE', 'CONTENT_LOCKED / AUTHORITATIVE']),
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: z.union([heroSchema,synlighetHeroSchema,heroPresentationSchema]).optional(),
    eyebrow: z.string(), title: z.string(), intro: z.string(),
    listing: listingSchema.optional(),
    sections: z.array(z.object({
      uid: z.string().optional(), name: z.string().optional(), content: z.unknown().optional(), visibility: sectionVisibilitySchema,
      globalElement: z.enum(serviceGlobalIds).optional(),
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
    try { const route = resolveRouteFamily(page); validateSynlighetSections(page, route); } catch (error) { context.addIssue({code:'custom',path:['composition'],message:error instanceof Error?error.message:'Invalid composition'}); }
    if (page.kind !== 'home') page.sections.forEach((section, index) => {
      if ((page.slug === 'synlighet' || page.slug === 'seo') && section.globalElement) return;
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
