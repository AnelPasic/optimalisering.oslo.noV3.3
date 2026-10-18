import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageSchema } from './lib/content-schema';
import { proofContentSchema } from './lib/proof';
import {readFileSync,readdirSync} from 'node:fs';
import {withContentDependencies} from './lib/content-dependencies';

const pages = defineCollection({
  loader: withContentDependencies(glob({ pattern: '**/*.json', base: './src/content/pages' }),()=>{
    const directory=new URL('./content/global-elements/',import.meta.url);
    return readdirSync(directory).filter(file=>file.endsWith('.json')).sort().map(file=>[file,readFileSync(new URL(file,directory),'utf8')]);
  }),
  schema: pageSchema,
});

const proofCases = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/proof' }),
  schema: proofContentSchema,
});

export const collections = { pages, proofCases };
