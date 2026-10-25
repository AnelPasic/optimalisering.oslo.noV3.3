import { z } from 'astro/zod';
import { featuredProofVisualFieldSchema,proofLayoutSchema,proofCaseVisualsSchema } from './proof-presentation.ts';
import {navigationLinkSchema} from './navigation.ts';
const link = z.object({ label: z.string(), href: z.string().startsWith('/') });
export const proofSlotSchema = z.object({ publicationApproved: z.boolean(), caseIds: z.array(z.string()).default([]), eyebrow: z.string(), heading: z.string(), beforeLabel: z.string(), afterLabel: z.string(), changeLabel: z.string() });
export const homeSectionDataSchema = z.object({
  assessmentSection: z.object({ _block: z.literal('protected'), id: z.literal('sjekk'), eyebrow: z.string().optional(), heading: z.string(), body: z.array(z.string()).default([]) }),
  selector: z.object({ heading: z.string(), items: z.array(z.object({ title: z.string(), discipline: z.string(), description: z.string(), link })).length(3) }),
  calculator: z.object({
    eyebrow: z.string(), heading: z.string(), intro: z.string(), formula: z.string(), caveat: z.string(),
    labels: z.object({ visits: z.string(), conversion: z.string(), trafficIncrease: z.string(), newConversion: z.string(), current: z.string(), scenario: z.string(), difference: z.string(), outcome: z.string(), increase: z.string(), undefinedIncrease: z.string(), invalid: z.string() }),
    defaults: z.object({ visits: z.number().int().min(0).max(10000000), conversion: z.number().min(0).max(100), trafficIncrease: z.number().min(0).max(1000), newConversion: z.number().min(0).max(100) }),
  }),
  packages: z.object({
    eyebrow: z.string(), heading: z.string(), intro: z.string(), orderIntro: z.string().trim().min(1), orderSubmitLabel: z.string().trim().min(1), fitLabel: z.string(), scopeLabel: z.string(),
    labels: z.object({ situations: z.string().trim().min(1), typicalBusiness: z.string().trim().min(1), focus: z.string().trim().min(1), combinations: z.string().trim().min(1), workAreas: z.string().trim().min(1), uncertain: z.string().trim().min(1) }),
    areasLabel: z.string(), areas: z.array(z.string()).length(4), foundationNote: z.string(),
    adBudgetNote: z.string(), externalCostsNote: z.string(), separateWorkNote: z.string(), capacityNote: z.string(),
    decisionStrip: z.object({ heading: z.string(), items: z.array(z.string()).length(3) }),
    multiplier: z.object({ eyebrow: z.string(), heading: z.string(), body: z.string(), conceptualRow: z.string(), support: z.string() }),
    items: z.array(z.object({
      title: z.string(), descriptor: z.string(), fit: z.string(), scope: z.string().optional(),
      price: z.number().int().positive().max(100000000), pricePrefix: z.literal('fra').optional(), priceSuffix: z.string(), vatSuffix: z.string(),
      recommended: z.boolean(), badge: z.string().default(''), cta: link.extend({ label: z.string().trim().min(1) }), detailLink: link.extend({ label: z.string().trim().min(1) }),
      key: z.enum(['optimalisering', 'vekst', 'partner']),
      visualAsset: z.object({
        src: z.string().regex(/^\/images\/pricing\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:svg|webp|png)$/),
        alt: z.string().trim().min(1), positionX: z.number().min(0).max(100).optional(), positionY: z.number().min(0).max(100).optional(),
      }).optional(),
      iconItems: z.array(z.object({ icon: z.enum(['search', 'conversion', 'local', 'paid-search', 'social-paid', 'analytics', 'page', 'route']), label: z.string().trim().min(1), compactLabel: z.string().trim().min(1), description: z.string().optional() })).min(1),
      compact: z.object({ fit: z.string().trim().min(1), situations: z.array(z.string().trim().min(1)).min(1).max(3) }),
      visual: z.enum(['controlled', 'accelerating', 'tracks']),
      visualCaption: z.object({ label: z.string().trim().min(1), support: z.string().trim().min(1).optional() }).optional(),
      typicalBusiness: z.string().optional(), situations: z.array(z.string()).min(1), focusAreas: z.array(z.string()).optional(),
      combinations: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      selectionRule: z.string(), distinction: z.string().optional(), priceNote: z.string().optional(),
    })).length(3),
  }).superRefine((packages, context) => {
    packages.items.forEach((item, index) => {
      if (index !== 2 && item.pricePrefix) context.addIssue({ code: 'custom', path: ['items', index, 'pricePrefix'], message: 'Only Partner may have a from-price' });
      if (item.key !== ['optimalisering', 'vekst', 'partner'][index] || item.cta.href !== `/priser/?pakke=${item.key}#bestill`) context.addIssue({ code: 'custom', path: ['items', index, 'cta'], message: 'Order key and route must identify the same package in the approved order' });
      if (item.detailLink.href !== ['/priser/#optimalisering', '/priser/#begge', '/priser/#partner'][index]) context.addIssue({ code: 'custom', path: ['items', index, 'detailLink', 'href'], message: 'Package detail anchors are protected; edit the label only' });
    });
  }),
  // Section approval never substitutes for a case's independent publication guard.
  proof: proofSlotSchema.extend({ featuredVisual: featuredProofVisualFieldSchema.optional(),layout:proofLayoutSchema,caseVisuals:proofCaseVisualsSchema.optional() }),
  form: z.object({ promise: z.string(), heading: z.string(), websiteLabel: z.string(), websitePlaceholder: z.string(), emailLabel: z.string(), emailPlaceholder: z.string(), messageLabel: z.string(), optional: z.string(), messagePlaceholder: z.string(), sensitiveNotice: z.string(), previewNotice: z.string(), submitLabel: z.string(), privacyText: z.string(), privacyLink: link, disabledStatus: z.string() }),
  faqHeading: z.string(), faqEyebrow: z.string(),
  chrome: z.object({
    brand: z.string(), brandLocation: z.string(), homeLabel: z.string(), skipLabel: z.string(),
    navigationLabel: z.string(), mobileNavigationLabel: z.string(), openMenu: z.string(), closeMenu: z.string(),
    headerOptions: z.object({
      sticky: z.boolean(),
      showLanguageSwitch: z.boolean(),
      showSearch: z.boolean(),
      showCta: z.boolean(),
    }).strict(),
    assessmentLink: link.extend({
      variant: z.enum(['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error']),
    }),
    navigation: z.array(navigationLinkSchema), providerText: z.string(), previewLabel: z.string(),
    serviceNavigationLabel: z.string(), informationNavigationLabel: z.string(), storeLink: link,
    informationLinks: z.array(link), copyrightProvider: z.string(), footerNote: z.string(),
  }),
});

// faqVisible is derived presentation state, never another commercial source.
export type HomepageContent = z.infer<typeof homeSectionDataSchema> & {faq:{question:string;answer:string}[];faqVisible?:boolean};
