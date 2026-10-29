import {getHomepageBlock,getHomepageBlocks,isHomepageSectionVisible} from '../src/lib/home-builder.ts';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { stripTerminologyLinks } from './terminology-markup.mjs';

const pages = readdirSync('src/content/pages').filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(resolve('src/content/pages', f), 'utf8')));
for(const page of pages)if(page.kind==='home'){page.sections=getHomepageBlocks(page).filter(isHomepageSectionVisible);}
const paths = new Map(pages.map(page => [page.slug === 'home' ? '/' : `/${page.slug}/`, page]));
// The editorial glossary has its own structured source, rather than page JSON.
paths.set('/begreper/', { slug: 'begreper', sections: [] });
paths.set('/design-system/', { slug: 'design-system', sections: [] });
paths.set('/design-system/global-elements/', { slug: 'design-system/global-elements', sections: [] });
const documents = new Map();
const titles = new Set();
let linksChecked = 0;
for (const [url, page] of paths) {
  const file = resolve('dist', page.slug === 'home' ? 'index.html' : `${page.slug}/index.html`);
  assert.ok(existsSync(file), `Missing output: ${url}`);
  const html = readFileSync(file, 'utf8');
  documents.set(url, html);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${url}: exactly one H1`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${url}: unique page title`);
  titles.add(title);
  assert.ok(html.includes('name="description"'), `${url}: description`);
  assert.ok(html.includes(`href="https://optimalisering.oslo.no${url}"`), `${url}: canonical`);
  assert.ok(html.includes('lang="nb"'), `${url}: Norwegian document language`);
  if (!['404', 'design-system', 'design-system/global-elements'].includes(page.slug)) assert.ok(!html.includes('content="noindex, nofollow"'), `${url}: no global noindex; Cloudflare owns indexing`);
  if (page.slug === 'design-system') assert.ok(html.includes('content="noindex, nofollow"'), 'Internal design-system always stays noindex');
  assert.ok(!/P10[1-5]|Oslo Privatklinikk|Tankeverksted|Oracles|Beck Maskin|Gram Car Carriers/.test(html), `${url}: no unapproved proof`);
  if (!['home', 'priser', 'synlighet', 'konvertering'].includes(page.slug)) assert.ok(!/4[\s,.]?490|6[\s,.]?990/.test(html), `${url}: frozen exploratory prices`);
  const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" };
  const text = stripTerminologyLinks(html).replace(/<[^>]*>/g, ' ').replace(/&(amp|lt|gt|quot|apos);/g, match => entities[match]).replace(/&#(\d+);/g, (_match, number) => String.fromCodePoint(Number(number))).replace(/\s+/g, ' ');
  for (const section of page.sections) {
    const packages = getHomepageBlock(paths.get('/'),'packages').content;
    const body = page.slug === 'priser' && section.id === 'kostnader' ? [
      `${packages.adBudgetNote} ${packages.externalCostsNote.replace('kommer i tillegg', 'kommer også i tillegg')}`,
      packages.separateWorkNote, packages.capacityNote,
    ] : section.body ?? [];
    for (const paragraph of body) assert.ok(text.includes(paragraph.replace(/\s+/g, ' ')), `${url}: semantic paragraph hidden in ${section.id}`);
  }
}
for (const [url, html] of documents) {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${url}: unique element IDs`);
  for (const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const target = new URL(href.replace(/&amp;/g, '&'), `https://optimalisering.oslo.no${url}`);
    // A canonical page may be linked without its final slash; still verify
    // the actual destination exists. This is not a blanket broken-link exemption.
    const canonical = target.pathname === '/' || target.pathname.endsWith('/') ? target.pathname : target.pathname + '/';
    const resolvedPath = paths.has(target.pathname) ? target.pathname : canonical;
    assert.ok(paths.has(resolvedPath), `${url}: broken link ${href}`);
    if (resolvedPath !== target.pathname) console.warn(`${url}: noncanonical but existing internal link ${href} (prefer ${resolvedPath})`);
    if (target.hash) assert.ok(documents.get(resolvedPath).includes(`id="${target.hash.slice(1)}"`), `${url}: missing anchor ${href}`);
    linksChecked++;
  }
}
assert.ok(existsSync('dist/404.html'));
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes('Allow: /'));
console.log(`Static QA passed: ${paths.size} pages, ${linksChecked} internal links/anchors, titles, canonicals, IDs, Cloudflare-managed indexing and proof/price limits.`);
