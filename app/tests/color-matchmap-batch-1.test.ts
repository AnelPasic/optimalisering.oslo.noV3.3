import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = (path: string) => readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('OWNER matchmap batch 1 uses only dark→secondary and lavender→info',()=>{
 for(const path of ['src/styles/surfaces.css','src/styles/project.css']){
  const css=read(path);
  assert.match(css,/--surface-dark:\\s*var\\(--color-secondary\\);/);
  assert.match(css,/--surface-lavender:\\s*var\\(--color-info\\);/);
 }
 const card=read('src/components/ContentCard.astro');
 assert.match(card,/dark:'bg-secondary text-secondary-content'/);
 assert.match(card,/lavender:'bg-info text-info-content'/);
 const root=read('src/styles/app.css');
 assert.match(root,/--color-secondary:\\s*oklch\\(/);
 assert.match(root,/--color-info:\\s*oklch\\(/);
});

test('existing CMS choices and stored surface values remain unchanged for visual review',()=>{
 const cms=read('../.pages.yml');
 assert.match(cms,/name: lavender/);
 assert.match(cms,/name: dark/);
 const schema=read('src/lib/surface.ts');
 assert.match(schema,/'mint', 'lavender', 'dark'/);
 const sections=read('src/styles/surfaces.css');
 assert.match(sections,/data-surface="lavender"\\]\\) \\{ background: var\\(--surface-lavender\\);/);
 assert.match(sections,/data-surface="dark"\\]\\) \\{/);
});
