import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { entryForFile, cmsJsonSave } from './helpers/pages-cms-json.ts';

const config = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
type Field = { name?: string; label?: string; type?: string; required?: boolean; readonly?: boolean; fields?: Field[] };
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
    // Slug lives at the root of the page JSON, but appears immediately
    // beneath the SEO panel before the shared grouped Hero in Pages CMS.
    assert.deepEqual(editor.fields?.slice(0, 3).map(field => field.name), ['seo', 'slug', 'hero'], editor.label);
    const slug = editor.fields?.[1];
    assert.equal(slug?.label, 'URL-slug', editor.label);
    assert.equal(slug?.type, 'string', editor.label);
    assert.equal(slug?.readonly, true, editor.label);
    assert.equal(slug?.required, true, editor.label);
    assert.equal(editor.fields?.filter(field => field.name === 'slug').length, 1, editor.label);
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

test('URL-slug remains the original read-only route value for every published page source', () => {
  const files = readdirSync('src/content/pages').filter(file => file.endsWith('.json'));
  assert.equal(files.length, 17, 'Include new sources when expanding page inventory');
  for (const file of files) {
    const path = `app/src/content/pages/${file}`;
    const entry = entryForFile(config, path);
    assert.ok(entry, file);
    const original = JSON.parse(readFileSync(`src/content/pages/${file}`, 'utf8'));
    assert.equal(typeof original.slug, 'string', file);
    assert.equal(file, original.slug === 'home' ? 'home.json' : original.slug + '.json', file);
    const saved = JSON.parse(cmsJsonSave(original, original, entry, config));
    assert.equal(saved.slug, original.slug, file);
    assert.deepEqual(saved.seo, original.seo, file);
    assert.deepEqual(saved.hero, original.hero, file);
  }
  // Home uses / in the router; its internal source id is "home".
  const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
  assert.equal(home.slug, 'home');
  const routes = readFileSync('src/pages/[...slug].astro','utf8');
  assert.match(routes, /route\.family === 'home' \? undefined : data\.slug/);
});
