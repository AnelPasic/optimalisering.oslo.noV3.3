import { z } from 'astro/zod';

const optionalText = z.preprocess(value => typeof value === 'string' && !value.trim() ? undefined : value, z.string().optional());
export const listingSchema = z.object({
  title: optionalText, summary: optionalText, label: optionalText,
  order: z.number().int().optional(), visible: z.boolean().default(true),
});
const reference = z.object({ slug: z.string().regex(/^innsikt\/[a-z0-9]+(?:[a-z0-9/-]*[a-z0-9])?$/).refine(slug => !slug.includes('//'), 'Invalid article slug') }).strict();
const references = z.array(reference).default([]).refine(rows => new Set(rows.map(row => row.slug)).size === rows.length, 'Duplicate article references');
export const pageListSchema = z.object({
  mode: z.enum(['automatic', 'manual']).default('automatic'),
  sort: z.enum(['editorial', 'title']).default('editorial'),
  limit: z.number().int().min(1).max(12).default(6),
  layout: z.enum(['cards', 'compact', 'links']).default('cards'),
  selected: references, excluded: references,
}).strict();
export type PageListConfig = z.infer<typeof pageListSchema>;
export interface ListPage {
  slug: string; kind: string; title: string; intro: string;
  listing?: z.input<typeof listingSchema>;
}
export interface PageListItem { slug: string; title: string; summary: string; label: string; href: string; }
const normalizeSlug = (slug: string) => slug.replace(/^\/+|\/+$/g, '');
const collator = new Intl.Collator('nb', { usage: 'sort', sensitivity: 'variant' });

/** Build-time pilot scope. No query strings, page copies or routing authority in config. */
export function resolvePageList(input: unknown, pages: readonly ListPage[]): PageListItem[] {
  const config = pageListSchema.parse(input);
  const articles = pages.filter(page => page.kind === 'article' && reference.safeParse({ slug: normalizeSlug(page.slug) }).success)
    .map(page => ({ ...page, slug: normalizeSlug(page.slug), listing: listingSchema.parse(page.listing ?? {}) }));
  const bySlug = new Map(articles.map(page => [page.slug, page]));
  if (bySlug.size !== articles.length) throw new Error('PageList: duplicate article slugs');
  const title = (page: typeof articles[number]) => page.listing.title ?? page.title;
  let selected: typeof articles;
  if (config.mode === 'manual') {
    selected = config.selected.map(({ slug }) => {
      const article = bySlug.get(slug);
      if (!article) throw new Error(`PageList: missing Innsikt article reference "${slug}"`);
      return article;
    }).filter(page => page.listing.visible);
  } else {
    const excluded = new Set(config.excluded.map(row => row.slug));
    selected = articles.filter(page => page.listing.visible && !excluded.has(page.slug)).sort((a, b) => {
      if (config.sort === 'editorial') {
        const aOrder = a.listing.order ?? Infinity, bOrder = b.listing.order ?? Infinity;
        if (aOrder !== bOrder) return aOrder < bOrder ? -1 : 1;
      }
      return collator.compare(title(a), title(b)) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0);
    }).slice(0, config.limit);
  }
  return selected.map(page => ({ slug: page.slug, title: title(page), summary: page.listing.summary ?? page.intro, label: page.listing.label ?? 'Les mer', href: `/${page.slug}/` }));
}
