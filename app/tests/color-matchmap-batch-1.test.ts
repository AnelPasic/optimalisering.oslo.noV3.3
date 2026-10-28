import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = (path: string) => readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('OWNER batch 1: dark→secondary and lavender→info in both live scopes and cards',()=>{
 for (const path of ['src/styles/surfaces.css','src/styles/project.css']) {
  const css=read(path);
  assert.ok(css.includes('--surface-dark: var(--color-secondary);'),path+' dark');
  assert.ok(css.includes('--surface-lavender: var(--color-info);'),path+' lavender');
 }
 const card=read('src/components/ContentCard.astro');
 assert.ok(card.includes("dark:'bg-secondary text-secondary-content'"));
 assert.ok(card.includes("lavender:'bg-info text-info-content'"));
 const theme=read('src/styles/app.css');
 assert.ok(theme.includes('--color-secondary: oklch('));
 assert.ok(theme.includes('--color-info: oklch('));
});

test('pilot CMS and current stored sections remain on legacy names until visual approval',()=>{
 const cms=read('../.pages.yml');
 assert.ok(cms.includes('name: lavender'));
 assert.ok(cms.includes('name: dark'));
 assert.ok(read('src/lib/surface.ts').includes("'mint', 'lavender', 'dark'"));
 const css=read('src/styles/surfaces.css');
 assert.ok(css.includes('background: var(--surface-lavender);'));
 assert.ok(css.includes('background: var(--surface-dark);'));
});
