import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string().startsWith('/') });
const homepage = z.object({
  displayHook: z.array(z.string()).length(2), secondaryCta: link, heroNote: z.string(),
  illustration: z.object({ label: z.string(), ariaLabel: z.string(), steps: z.array(z.object({ title: z.string(), caption: z.string() })).length(2), footer: z.string() }),
  selector: z.object({ heading: z.string(), items: z.array(z.object({ title: z.string(), discipline: z.string(), description: z.string(), link })).length(3) }),
  calculator: z.object({
    eyebrow: z.string(), heading: z.string(), intro: z.string(), formula: z.string(), caveat: z.string(),
    labels: z.object({ visits: z.string(), conversion: z.string(), trafficIncrease: z.string(), newConversion: z.string(), current: z.string(), scenario: z.string(), difference: z.string(), outcome: z.string(), increase: z.string(), undefinedIncrease: z.string(), invalid: z.string() }),
    defaults: z.object({ visits: z.number().int().min(0).max(10000000), conversion: z.number().min(0).max(100), trafficIncrease: z.number().min(0).max(1000), newConversion: z.number().min(0).max(100) }),
  }),
  packages: z.object({ eyebrow: z.string(), heading: z.string(), intro: z.string(), fitLabel: z.string(), scopeLabel: z.string(), items: z.array(z.object({ title: z.string(), fit: z.string(), scope: z.string(), priceState: z.string(), externalCosts: z.string(), cta: link })).length(3) }),
  // Reserved before/change/after slot. This handoff grants no proof-publication authority.
  proof: z.object({ publicationApproved: z.literal(false), case: z.object({ heading: z.string(), before: z.string(), change: z.string(), after: z.string(), evidence: z.string() }).nullable() }),
  form: z.object({ heading: z.string(), websiteLabel: z.string(), websitePlaceholder: z.string(), emailLabel: z.string(), emailPlaceholder: z.string(), messageLabel: z.string(), optional: z.string(), messagePlaceholder: z.string(), sensitiveNotice: z.string(), previewNotice: z.string(), submitLabel: z.string(), privacyText: z.string(), privacyLink: link, disabledStatus: z.string() }),
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
    homepage: homepage.optional(),
  }).superRefine((page, context) => {
    if (page.kind === 'home' && !page.homepage) context.addIssue({ code: 'custom', path: ['homepage'], message: 'Homepage content model is required' });
    if (page.kind === 'home') for (const id of ['mekanisme', 'passer', 'sjekk', 'medon']) {
      if (page.sections.filter(section => section.id === id).length !== 1) context.addIssue({ code: 'custom', path: ['sections'], message: `Homepage requires exactly one ${id} section` });
    }
    if (page.kind === 'home' && page.sections.map(section => section.id).join(',') !== 'mekanisme,passer,sjekk,medon') context.addIssue({ code: 'custom', path: ['sections'], message: 'Homepage sections must retain the H-004 render order' });
  });
