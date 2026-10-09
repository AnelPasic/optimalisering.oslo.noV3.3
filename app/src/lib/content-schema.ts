import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string().startsWith('/') });
const homepage = z.object({
  secondaryCta: link,
  heroPhoto: z.object({ src: z.string().regex(/^\/images\/home\/[a-z0-9][a-z0-9-]*\.webp$/), positionX: z.number().min(0).max(100), positionY: z.number().min(0).max(100) }),
  selector: z.object({ heading: z.string(), items: z.array(z.object({ title: z.string(), discipline: z.string(), description: z.string(), link })).length(3) }),
  calculator: z.object({
    eyebrow: z.string(), heading: z.string(), intro: z.string(), formula: z.string(), caveat: z.string(),
    labels: z.object({ visits: z.string(), conversion: z.string(), trafficIncrease: z.string(), newConversion: z.string(), current: z.string(), scenario: z.string(), difference: z.string(), outcome: z.string(), increase: z.string(), undefinedIncrease: z.string(), invalid: z.string() }),
    defaults: z.object({ visits: z.number().int().min(0).max(10000000), conversion: z.number().min(0).max(100), trafficIncrease: z.number().min(0).max(1000), newConversion: z.number().min(0).max(100) }),
  }),
  packages: z.object({
    eyebrow: z.string(), heading: z.string(), intro: z.string(), fitLabel: z.string(), scopeLabel: z.string(),
    areasLabel: z.string(), areas: z.array(z.string()).length(4), foundationNote: z.string(),
    adBudgetNote: z.string(), externalCostsNote: z.string(), separateWorkNote: z.string(), capacityNote: z.string(),
    decisionStrip: z.object({ heading: z.string(), items: z.array(z.string()).length(3) }),
    multiplier: z.object({ eyebrow: z.string(), heading: z.string(), body: z.string(), conceptualRow: z.string(), support: z.string() }),
    items: z.array(z.object({
      title: z.string(), descriptor: z.string(), fit: z.string(), scope: z.string().optional(),
      price: z.number().int().positive().max(100000000), pricePrefix: z.literal('fra').optional(), priceSuffix: z.string(), vatSuffix: z.string(),
      recommended: z.boolean(), badge: z.string(), cta: link, detailLink: link,
      visual: z.enum(['controlled', 'accelerating', 'tracks']),
      typicalBusiness: z.string().optional(), situations: z.array(z.string()).min(1), focusAreas: z.array(z.string()).optional(),
      combinations: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      selectionRule: z.string(), distinction: z.string().optional(), priceNote: z.string().optional(),
    })).length(3),
  }).superRefine((packages, context) => {
    packages.items.forEach((item, index) => {
      if (index !== 2 && item.pricePrefix) context.addIssue({ code: 'custom', path: ['items', index, 'pricePrefix'], message: 'Only Partner may have a from-price' });
    });
  }),
  // Section approval never substitutes for a case's independent publication guard.
  proof: z.object({ publicationApproved: z.boolean(), caseIds: z.array(z.string()), eyebrow: z.string(), heading: z.string(), beforeLabel: z.string(), afterLabel: z.string(), changeLabel: z.string() }),
  form: z.object({ promise: z.string(), heading: z.string(), websiteLabel: z.string(), websitePlaceholder: z.string(), emailLabel: z.string(), emailPlaceholder: z.string(), messageLabel: z.string(), optional: z.string(), messagePlaceholder: z.string(), sensitiveNotice: z.string(), previewNotice: z.string(), submitLabel: z.string(), privacyText: z.string(), privacyLink: link, disabledStatus: z.string() }),
  faqHeading: z.string(), faqEyebrow: z.string(),
  chrome: z.object({ brand: z.string(), brandLocation: z.string(), homeLabel: z.string(), skipLabel: z.string(), navigationLabel: z.string(), mobileNavigationLabel: z.string(), openMenu: z.string(), closeMenu: z.string(), assessmentLink: link, navigation: z.array(link), providerText: z.string(), previewLabel: z.string(), serviceNavigationLabel: z.string(), informationNavigationLabel: z.string(), storeLink: link, informationLinks: z.array(link), copyrightProvider: z.string(), footerNote: z.string() }),
});
export const pageSchema = z.object({
    slug: z.string(),
    kind: z.enum(['home', 'service', 'article', 'index', 'utility', 'assessment', 'pricing']),
    status: z.enum(['REVIEW_REQUIRED', 'CONTENT_LOCKED', 'PUBLISHED']),
    authority: z.enum(['DRAFT / NON-AUTHORITATIVE', 'CONTENT_LOCKED / AUTHORITATIVE']),
    seo: z.object({ title: z.string(), description: z.string() }),
    eyebrow: z.string(), title: z.string(), intro: z.string(),
    sections: z.array(z.object({
      id: z.string(), eyebrow: z.string().optional(), heading: z.string(), body: z.array(z.string()),
      items: z.array(z.object({ title: z.string(), text: z.string(), href: z.string().startsWith('/').optional(), label: z.string().optional() })).optional(),
      links: z.array(link).optional(),
    })),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })),
    cta: link,
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
    if (page.kind === 'home' && !page.homepage) context.addIssue({ code: 'custom', path: ['homepage'], message: 'Homepage content model is required' });
    if (page.kind === 'home') for (const id of ['mekanisme', 'passer', 'sjekk']) {
      if (page.sections.filter(section => section.id === id).length !== 1) context.addIssue({ code: 'custom', path: ['sections'], message: `Homepage requires exactly one ${id} section` });
    }
    if (page.kind === 'home' && page.sections.map(section => section.id).join(',') !== 'mekanisme,passer,sjekk') context.addIssue({ code: 'custom', path: ['sections'], message: 'Homepage sections must retain the D-037 render order' });
  });
