import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const base = 'https://optimalisering-oslo-v33.anel.workers.dev';
const source = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const assets = [];
const sha = data => createHash('sha256').update(data).digest('hex');
async function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await scan(path);
    else if (!['_headers', '_redirects'].includes(entry.name)) {
      const relative = path.slice('dist'.length);
      const route = relative.replace(/index\.html$/, '');
      const response = await fetch(`${base}${route}?typography=${source}`);
      const actual = Buffer.from(await response.arrayBuffer()), expected = readFileSync(path);
      const byteEqual = actual.equals(expected);
      const lineEndingEquivalent = !byteEqual && /\.(css|html|js|txt|xml)$/.test(path) && actual.toString().replaceAll('\r\n', '\n') === expected.toString().replaceAll('\r\n', '\n');
      assert.equal(response.status, 200, route);
      assert.ok(byteEqual || lineEndingEquivalent, `${route}: live asset differs from verified build`);
      const noindex = response.headers.get('x-robots-tag');
      if (path.endsWith('.html')) {
        assert.equal(noindex, 'noindex, nofollow', `${route}: preview header`);
        assert.match(actual.toString(), /<meta name="robots" content="noindex, nofollow"/);
      }
      assets.push({ path: route, status: response.status, noindex, byteEqual, lineEndingEquivalent, bytes: actual.length, sha256: sha(actual) });
    }
  }
}
await scan('dist');
const safety = [];
for (const path of ['/api/leads', '/api/orders', '/resultater/', '/typography-missing-page/']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, `${path}: stays unavailable`);
  safety.push({ path, status: response.status });
}
assert.match(readFileSync('dist/robots.txt', 'utf8'), /Disallow: \/\s/);
assert.ok(!readFileSync('dist/sitemap.xml', 'utf8').includes('<url>'));
writeFileSync('../coordination/evidence/typography/live-assets.json', JSON.stringify({ source, base, checkedAt: new Date().toISOString(), assets, safety }, null, 2));
console.log(`Native review Worker PASS: ${assets.length} verified assets; noindex, robots/empty sitemap, disabled APIs and custom 404.`);
