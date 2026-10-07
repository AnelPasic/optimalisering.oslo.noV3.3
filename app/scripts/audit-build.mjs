import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const pages = readdirSync('src/content/pages').filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(resolve('src/content/pages', f), 'utf8')));
const paths = new Map(pages.map(page => [page.slug === 'home' ? '/' : `/${page.slug}/`, page]));
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
  if (process.env.SITE_STAGE !== 'production') assert.ok(html.includes('content="noindex, nofollow"'), `${url}: preview noindex`);
  assert.ok(!/4[\s,.]?490|6[\s,.]?990|P10[1-5]|Eurotents|Helt Opplagt|Beck Maskin|Gram Car Carriers/.test(html), `${url}: no unapproved prices/proof`);
  const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" };
  const text = html.replace(/<[^>]*>/g, ' ').replace(/&(amp|lt|gt|quot|apos);/g, match => entities[match]).replace(/&#(\d+);/g, (_match, number) => String.fromCodePoint(Number(number))).replace(/\s+/g, ' ');
  for (const section of page.sections) {
    for (const paragraph of section.body) assert.ok(text.includes(paragraph.replace(/\s+/g, ' ')), `${url}: semantic paragraph hidden in ${section.id}`);
  }
}
for (const [url, html] of documents) {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${url}: unique element IDs`);
  for (const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const target = new URL(href.replace(/&amp;/g, '&'), `https://optimalisering.oslo.no${url}`);
    assert.ok(paths.has(target.pathname), `${url}: broken link ${href}`);
    if (target.hash) assert.ok(documents.get(target.pathname).includes(`id="${target.hash.slice(1)}"`), `${url}: missing anchor ${href}`);
    linksChecked++;
  }
}
assert.ok(existsSync('dist/404.html'));
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes(process.env.SITE_STAGE === 'production' ? 'Allow: /' : 'Disallow: /'));
console.log(`Static QA passed: ${paths.size} pages, ${linksChecked} internal links/anchors, titles, canonicals, IDs, preview indexing and proof/price limits.`);
