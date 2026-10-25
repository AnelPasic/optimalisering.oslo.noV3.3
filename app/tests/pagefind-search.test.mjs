import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = file => readFileSync(resolve(file), 'utf8');

test('static Pagefind index follows Astro build with a pinned CLI version', () => {
  const { scripts } = JSON.parse(read('package.json'));
  assert.match(scripts.build, /astro build && npm run search:index/);
  assert.match(scripts['search:index'], /pagefind@1\.5\.2 --site dist/);
  assert.match(scripts['search:index'], /verify-pagefind\.mjs/);
});

test('header exposes search for both desktop and mobile without editing CMS copy', () => {
  const header = read('src/components/HomeHeader.astro');
  const search = read('src/components/SiteSearch.astro');
  assert.match(header, /<SiteSearch mode="desktop" \/>/);
  assert.match(header, /<SiteSearch mode="mobile" \/>/);
  assert.match(search, /pagefind-modal-trigger/);
  assert.match(search, /compact=\{mode === 'desktop'\}/);
  assert.match(search, /Søk på nettstedet/);
});

test('Pagefind indexes page content only and does not expose internal visual review pages', () => {
  const layout = read('src/layouts/SiteLayout.astro');
  assert.match(layout, /data-pagefind-body=\{!noindex/);
  assert.match(layout, /startsWith\("\/design-system\/"\)/);
  assert.match(layout, /pagefind-component-ui\.css/);
  assert.match(layout, /pagefind-component-ui\.js/);
  assert.match(layout, /<SiteSearch mode="modal" \/>/);
});

test('search uses native site theme and no extra backend or script from a vendor CDN', () => {
  const css = read('src/styles/header-navigation.css');
  assert.match(css, /pagefind-modal/);
  assert.match(css, /--pf-font: var\(--body\)/);
  assert.match(css, /site-search-trigger--mobile/);
  const layout = read('src/layouts/SiteLayout.astro');
  assert.doesNotMatch(layout, /https:\/\/.*pagefind/);
});
