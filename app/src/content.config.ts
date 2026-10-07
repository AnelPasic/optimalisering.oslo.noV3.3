import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string().startsWith('/') });
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    slug: z.string(),
    kind: z.enum(['home', 'service', 'article', 'index', 'utility', 'assessment', 'pricing']),
    status: z.enum(['REVIEW_REQUIRED', 'CONTENT_LOCKED', 'PUBLISHED']),
    seo: z.object({ title: z.string(), description: z.string() }),
    eyebrow: z.string(), title: z.string(), intro: z.string(),
    sections: z.array(z.object({
      id: z.string(), eyebrow: z.string().optional(), heading: z.string(), body: z.array(z.string()),
      items: z.array(z.object({ title: z.string(), text: z.string(), href: z.string().startsWith('/').optional(), label: z.string().optional() })).optional(),
      links: z.array(link).optional(),
    })),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })),
    cta: link,
  }),
});

export const collections = { pages };
