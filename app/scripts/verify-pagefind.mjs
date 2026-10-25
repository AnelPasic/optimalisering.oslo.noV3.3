import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Keep the review deployment honest: a visible search icon must never ship
// without the static Pagefind search engine and component assets.
const root = resolve('dist');
for (const name of [
  'pagefind/pagefind.js',
  'pagefind/pagefind-component-ui.js',
  'pagefind/pagefind-component-ui.css',
]) {
  assert.ok(existsSync(resolve(root, name)), `Missing generated Pagefind asset: ${name}`);
}
const home = readFileSync(resolve(root, 'index.html'), 'utf8');
assert.ok(home.includes('data-pagefind-body'), 'Homepage main content must be indexed');
assert.ok(home.includes('pagefind-modal-trigger'), 'Missing header search trigger');
assert.ok(home.includes('pagefind-modal'), 'Missing search modal');
assert.ok(readdirSync(resolve(root, 'pagefind')).some(name => name.endsWith('.pf_meta') || name === 'pagefind-entry.json'),
  'Missing generated Pagefind index metadata');
console.log('Pagefind: static index and Norwegian search UI assets are present.');
