import { z } from 'astro/zod';
import { heroSchema } from './home-builder.ts';
import { heroPresentationSchema } from './hero-presentation.ts';

export const synlighetHeroImageSchema = z.object({
  kind: z.enum(['photo', 'illustration']),
  src: z.string().regex(/^\/images\/services\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif|svg)$/),
  alt: z.string().trim().min(1),
  positionX: z.number().min(0).max(100), positionY: z.number().min(0).max(100),
}).strict();

/** Same logical Hero as home, retaining the service's actual image/alt/type. */
export const synlighetHeroSchema = heroSchema.extend({
  visual: z.discriminatedUnion('kind', [
    z.object({kind:z.literal('none'),image:synlighetHeroImageSchema.optional()}).strict(),
    z.object({kind:z.literal('image'),image:synlighetHeroImageSchema}).strict(),
  ]),
}).strict();

export const legacyHeroKeys = ['eyebrow', 'title', 'intro', 'cta', 'heroVisual'] as const;

/** Run only against the current Synlighet source; never migrate another page. */
export function migrateSynlighetHero(source: Record<string, any>, legacyView?: {
  layout: string; eyebrow: string; title: string; support: string;
  primaryCta?: {label:string;href:string}; secondaryCta?: {label:string;href:string};
}): Record<string, any> & {slug:'synlighet';kind:'service';sections:any[];hero:z.input<typeof synlighetHeroSchema>} {
  if (source.slug !== 'synlighet' || source.kind !== 'service') throw new Error('Hero migration is limited to Synlighet');
  const page = structuredClone(source) as Record<string, any> & {slug:'synlighet';kind:'service';sections:any[];hero:z.input<typeof synlighetHeroSchema>};
  if (source.hero && 'primaryCta' in source.hero) {
    synlighetHeroSchema.parse(source.hero);
    if (legacyHeroKeys.some(key => Object.hasOwn(source,key))) throw new Error('Remove duplicate Hero authorities before saving Synlighet');
    return page;
  }
  if (!legacyView?.primaryCta) throw new Error('Migration requires the existing rendered Hero, including its primary and derived secondary CTA');
  heroPresentationSchema.parse(source.hero ?? {});
  page.hero = {
    layout: source.hero?.layout ?? legacyView.layout,
    eyebrow: legacyView.eyebrow, title: legacyView.title, support: legacyView.support,
    primaryCta: legacyView.primaryCta,
    ...(legacyView.secondaryCta ? {secondaryCta:legacyView.secondaryCta} : {}),
    visual: source.heroVisual ? {kind:'image',image:structuredClone(source.heroVisual)} : {kind:'none'},
  };
  synlighetHeroSchema.parse(page.hero);
  for (const key of legacyHeroKeys) delete page[key];
  return page;
}
