import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('..');
const output = resolve('qa-output/h004-baseline.json');
const files = [];
function collect(directory, include = () => true) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) collect(path, include);
    else if (include(path)) files.push(path);
  }
}
collect(resolve(root, 'system'));
collect(resolve(root, 'project'));
collect(resolve('src/content/pages'), path => !path.endsWith('home.json'));
collect(resolve('dist'), path => path.endsWith('.html') && path !== resolve('dist/index.html'));
collect(resolve('dist/_astro'), path => path.endsWith('.css'));
const hashes = Object.fromEntries(files.sort().map(path => [relative(root, path).replaceAll('\\', '/'), createHash('sha256').update(readFileSync(path)).digest('hex')]));
if (process.argv[2] === 'snapshot') {
  mkdirSync(resolve('qa-output'), { recursive: true });
  writeFileSync(output, JSON.stringify(hashes, null, 2));
  console.log(`Baseline: ${files.length} protected input, other-page content/HTML and shared CSS files.`);
} else {
  assert.deepEqual(hashes, JSON.parse(readFileSync(output, 'utf8')), 'Frozen pages/reference inputs/shared CSS must stay byte-for-byte unchanged');
  console.log(`Preservation PASS: ${files.length} files match the fresh pre-H-004 build.`);
}
