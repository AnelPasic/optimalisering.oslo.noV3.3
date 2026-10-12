import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const base = 'https://optimalisering-oslo-v33.anel.workers.dev';
const handoff = process.env.QA_HANDOFF || 'h017d';
const source = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
function walk(directory) { return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)]); }
const assets = [];
for (const file of walk(resolve('dist'))) {
  let path = '/' + relative(resolve('dist'), file).split(sep).join('/');
  if (path === '/_headers' || path === '/_redirects') continue;
  if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length);
  const response = await fetch(base + path);
  const actual = Buffer.from(await response.arrayBuffer()), expected = readFileSync(file);
  const byteEqual = actual.equals(expected);
  const lineEndingEquivalent = /\.(?:css|txt|xml)$/.test(path) && actual.toString().replaceAll('\r\n', '\n') === expected.toString().replaceAll('\r\n', '\n');
  assert.equal(response.status, 200, path);
  assert.ok(byteEqual || lineEndingEquivalent, path + ': live assets match tested build');
  const robots = response.headers.get('x-robots-tag');
  if (file.endsWith('.html')) assert.equal(robots, 'noindex, nofollow', path);
  assets.push({ path, status: response.status, noindex: robots, byteEqual, lineEndingEquivalent, bytes: actual.length, sha256: hash(actual) });
}
const api = await fetch(base + '/api/leads');
assert.equal(api.status, 404);
const orderApi = await fetch(base + '/api/orders');
assert.equal(orderApi.status, 404);
const missing = await fetch(base + '/h017c-missing-page/');
assert.equal(missing.status, 404);
assert.equal(missing.headers.get('x-robots-tag'), 'noindex, nofollow');
assert.equal(await missing.text(), readFileSync('dist/404.html', 'utf8'));
const resultsRoute = await fetch(base + '/resultater/');
assert.equal(resultsRoute.status, 404);
const robots = await (await fetch(base + '/robots.txt')).text();
assert.ok(robots.includes('Disallow: /'));
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
assert.ok(!sitemap.includes('<loc>'));
const result = { checkedAt: new Date().toISOString(), source, base, assets, assetCount: assets.length, allTestedAssetsMatch: true, apiGet: api.status, orderApiGet: orderApi.status, custom404: missing.status, standaloneResultsRoute: resultsRoute.status, robotsDisallow: true, emptySitemap: true, realPosts: 0, result: 'PASS' };
if (!process.argv.includes('--no-report')) writeFileSync(`../coordination/evidence/${handoff}/live-assets.json`, JSON.stringify(result, null, 2) + '\n');
console.log(`Proof live PASS: ${assets.length} assets match tested build, HTML noindex, robots disallow, empty sitemap and both intake paths GET404. Zero POST.`);
