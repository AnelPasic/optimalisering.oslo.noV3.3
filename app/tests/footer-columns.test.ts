import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const appDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(appDir, '..');
const read = (path: string) => readFileSync(path, 'utf8');
const footer = JSON.parse(read(join(appDir, 'src/content/site-chrome/footer.json')));

test('footer keeps Synlighet / Optimalisering / Kom i gang as independent CMS groups', () => {
  assert.deepEqual(footer.footerGroups.map((g: {heading: string}) => g.heading),
    ['Synlighet', 'Optimalisering', 'Kom i gang']);
  assert.ok(footer.footerGroups.every((g: {links: unknown[]}) => g.links.length >= 2));
  assert.deepEqual(footer.footerGroups.map((g: {headingHref?: string}) => g.headingHref ?? null),
    ['/synlighet/', '/konvertering/', null]);
  for (const path of ['/personvern/', '/vilkar/', '/begreper/']) {
    assert.ok(footer.footerLegalLinks.some((x: {href:string}) => x.href === path));
  }
});

test('all CMS footer links and category heading URLs point at existing local pages', () => {
  for (const group of footer.footerGroups) for (const url of
    [...group.links.map((l: {href:string}) => l.href), ...(group.headingHref ? [group.headingHref] : [])]) {
    assert.ok(url.startsWith('/') && !url.startsWith('//'), 'Unsafe footer URL: ' + url);
    if (url === '/#sjekk') continue;
    const slug = url.replace(/^\/+|\/+$/g, '').split('/').at(-1);
    assert.ok(existsSync(join(appDir, 'src/content/pages', slug + '.json')),
      'Missing CMS route for footer destination: ' + url);
  }
});

test('footer links render from dedicated global JSON and work with stock Pages CMS', () => {
  const view = read(join(appDir, 'src/components/HomeFooter.astro'));
  const css = read(join(appDir, 'src/styles/shared.css'));
  const cms = read(join(root, '.pages.yml'));
  assert.match(view, /footerGroups\.map/);
  assert.match(view, /footerLegalLinks/);
  assert.match(view, /group\.headingHref/);
  assert.doesNotMatch(view, /preview-tag|previewLabel/);
  assert.match(css, /footer-grid--columns/);
  assert.match(css, /footer-group-title a/);
  assert.match(cms, /label: Globale Elementer/);
  assert.match(cms, /label: Global Innhold/);
  assert.match(cms, /name: headingHref/);
  assert.match(cms, /name: footerLegalLinks/);
});
