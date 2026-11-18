import { z } from 'astro/zod';
import { realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';

const imageSchema = z.object({
  src: z.string().regex(/^\/images\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif|svg)$/),
  alt: z.string().trim().min(1),
  positionX: z.number().min(0).max(100).default(50),
  positionY: z.number().min(0).max(100).default(50),
}).strict();

// A max-one list lets Pages CMS clear an image with content.merge enabled.
// Accept an object as well for existing or hand-authored content.
export const cardImageSchema = z.preprocess(
  value => value == null || value === '' ? [] : value,
  z.union([imageSchema, z.array(imageSchema).max(1)]),
).transform(value => Array.isArray(value) ? value[0] : value).optional();
export type CardImage = z.infer<typeof imageSchema>;

export function resolveCardImage(input: unknown, publicDirectory = 'public'): CardImage | undefined {
  const parsed = cardImageSchema.safeParse(input);
  if (!parsed.success || !parsed.data) return undefined;
  try {
    const directory = realpathSync(resolve(publicDirectory, 'images'));
    const file = realpathSync(resolve(publicDirectory, parsed.data.src.slice(1)));
    const metadata = statSync(file);
    if (!file.startsWith(directory + sep) || !metadata.isFile() || metadata.size === 0) return undefined;
    return parsed.data;
  } catch { return undefined; }
}
