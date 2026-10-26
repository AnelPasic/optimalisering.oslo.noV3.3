import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

const config = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
type Field = { name?: string; label?: string; type?: string; required?: boolean; fields?: Field[] };
type Entry = { name: string; label: string; type?: string; path?: string; fields?: Field[]; items?: Entry[] };

function sitePageEditors(entries: Entry[]): Entry[] {
  return entries.flatMap(entry => [
    ...(entry.path?.startsWith('app/src/content/pages') && ['file', 'collection'].includes(entry.type ?? '') ? [entry] : []),
    ...sitePageEditors(entry.items ?? []),
  ]);
}

test('SEO is the first native Pages CMS field in every page/article/service editor', () => {
  const editors = sitePageEditors(config.content);
  assert.equal(editors.length, 13, 'Check the inventory when adding new page editor types');
  for (const editor of editors) {
    assert.equal(editor.fields?.[0]?.name, 'seo', `${editor.label}: SEO must appear first`);
    const seo = editor.fields?.[0];
    assert.equal(seo?.type, 'object', editor.label);
    assert.equal(seo?.required, true, editor.label);
    assert.deepEqual(seo.fields?.map(field => field.name), ['title', 'description'], editor.label);
    assert.deepEqual(seo.fields?.map(field => field.label), ['Sidetittel', 'Metabeskrivelse'], editor.label);
    assert.ok(seo.fields?.every(field => field.required === true), editor.label);
    assert.equal(editor.fields?.filter(field => field.name === 'seo').length, 1, editor.label);
  }
});

test('The existing shared layout always emits canonical, SEO metadata and basic Organization JSON-LD', () => {
  const pageLayout = readFileSync('src/layouts/SiteLayout.astro', 'utf8');
  const routes = readFileSync('src/pages/[...slug].astro', 'utf8');
  const glossary = readFileSync('src/pages/begreper.astro', 'utf8');
  const notFound = readFileSync('src/pages/404.astro', 'utf8');
  assert.match(pageLayout, /<title>\{title\}<\/title>/);
  assert.match(pageLayout, /meta name="description" content=\{description\}/);
  assert.match(pageLayout, /link rel="canonical" href=\{canonical\}/);
  assert.match(pageLayout, /'@context': 'https:\/\/schema\.org'/);
  assert.match(pageLayout, /'@type': 'Organization'/);
  assert.match(pageLayout, /script type="application\/ld\+json"/);
  assert.match(pageLayout, /site\.preview \|\| noindex/);
  for (const page of [routes, glossary, notFound]) assert.match(page, /<SiteLayout\b/);
});
