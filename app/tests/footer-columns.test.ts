import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const appDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(appDir, '..');
const read = (path: string) => readFileSync(path, 'utf8');
const chrome = JSON.parse(read(join(appDir, 'src/content/pages/home.json'))).homepage.chrome;

test('footer has exactly two service groups plus a separate next-step column', () => {
  assert.deepEqual(chrome.footerGroups.map((g: { heading: string }) => g.heading), [
    'Synlighet', 'Optimalisering', 'Kom i gang',
  ]);
  assert.ok(chrome.footerGroups.every((g: { links: unknown[] }) => g.links.length >= 2));
  assert.ok(chrome.footerLegalLinks.some((x: { href: string }) => x.href === '/personvern/'));
  assert.ok(chrome.footerLegalLinks.some((x: { href: string }) => x.href === '/vilkar/'));
  assert.ok(chrome.footerLegalLinks.some((x: { href: string }) => x.href === '/begreper/'));
});

test('every CMS footer link has a real published-route source or the approved home anchor', () => {
  for (const group of chrome.footerGroups) for (const link of group.links) {
    assert.ok(link.href.startsWith('/'), `Non-local footer URL: ${link.href}`);
    if (link.href === '/#sjekk') continue;
    const slug = link.href.replace(/^\/+|\/+$/g, '').split('/').at(-1);
    assert.ok(existsSync(join(appDir, 'src/content/pages', slug + '.json')),
      `Missing CMS route for footer link ${link.href}`);
  }
});

test('real daisyUI footer and responsive four-part grouping stay editable in stock Pages CMS', () => {
  const view = read(join(appDir, 'src/components/HomeFooter.astro'));
  const styles = read(join(appDir, 'src/styles/shared.css'));
  const cms = read(join(root, '.pages.yml'));
  assert.match(view, /class="footer footer-grid footer-grid--columns footer-vertical/);
  assert.match(view, /footerGroups\.map/);
  assert.match(view, /footerLegalLinks/);
  assert.match(view, /footer-bottom--columns/);
  assert.match(styles, /repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(styles, /max-width: 480px/);
  assert.match(cms, /name: footerGroups/);
  assert.match(cms, /name: footerLegalLinks/);
});
