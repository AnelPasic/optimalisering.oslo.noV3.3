import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageSchema } from './lib/content-schema';
import { proofContentSchema } from './lib/proof';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: pageSchema,
});

const proofCases = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/proof' }),
  schema: proofContentSchema,
});

export const collections = { pages, proofCases };
