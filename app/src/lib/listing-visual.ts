import { z } from 'astro/zod';
import { realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';

export const listingIcons = ['search', 'conversion', 'analytics', 'trend', 'page', 'route'] as const;
export const listingVisualSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('none') }).strict(),
  z.object({ kind: z.literal('icon'), icon: z.enum(listingIcons) }).strict(),
  z.object({
    kind: z.literal('image'),
    src: z.string().regex(/^\/images\/listing\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif)$/),
    alt: z.string().trim().min(1),
    positionX: z.number().min(0).max(100).default(50),
    positionY: z.number().min(0).max(100).default(50),
  }).strict(),
]);
export type ListingVisual = Exclude<z.infer<typeof listingVisualSchema>, { kind: 'none' }>;
// Pages CMS merge:true replaces arrays, but deep-merges objects across block kinds.
// A max-one block list makes switching/clearing atomic; plain objects remain valid inputs.
export const listingVisualFieldSchema = z.union([listingVisualSchema, z.array(listingVisualSchema).max(1)])
  .transform(value => Array.isArray(value) ? value[0] : value);

/** Same local-file boundary as service/package media; never render a missing src. */
export function resolveListingVisual(input: unknown, publicDirectory = 'public'): ListingVisual | undefined {
  const parsed = listingVisualFieldSchema.safeParse(input);
  if (!parsed.success || !parsed.data || parsed.data.kind === 'none') return undefined;
  if (parsed.data.kind === 'icon') return parsed.data;
  try {
    const directory = realpathSync(resolve(publicDirectory, 'images/listing'));
    const file = realpathSync(resolve(publicDirectory, parsed.data.src.slice(1)));
    if (!file.startsWith(directory + sep) || !statSync(file).isFile() || statSync(file).size === 0) return undefined;
    return parsed.data;
  } catch { return undefined; }
}
