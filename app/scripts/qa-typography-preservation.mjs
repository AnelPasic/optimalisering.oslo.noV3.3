import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const baseline = process.env.QA_BASELINE || 'e0adeec';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', cwd: '..' });
const original = path => git('show', `${baseline}:${path}`);
const styles = ['app/src/styles/global.css', 'app/src/styles/terminology.css', ...['home-invite', 'service-invite', 'pricing-invite', 'package-offer'].map(n => `app/public/styles/${n}.css`)];
const components = ['HomeProof', 'HomeHeroPhoto', 'HomeLeverage'].map(n => `app/src/components/${n}.astro`);
const changed = new Set([...styles, ...components, 'app/src/layouts/SiteLayout.astro', 'app/package.json', 'coordination/CODEX-TO-CHATGPT.md', 'coordination/PROJECT-STATE.md', 'coordination/REVIEW-QUEUE.md']);
const normalize = s => s.replaceAll('\r\n', '\n');
const protectedFiles = git('ls-tree', '-r', baseline).trim().split('\n').map(line => {
  const [entry, path] = line.split('\t');
  return { path, blob: entry.split(' ')[2] };
}).filter(p => !changed.has(p.path));
for (const { path, blob } of protectedFiles) assert.equal(git('hash-object', `--path=${path}`, path).trim(), blob, `${path} preserved`);
// Preserve every non-typographic declaration, in order. No box/card/layout exceptions.
const declarations = source => [...source.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([\w-]+):\s*([^;{}]+);/g)]
  .filter(m => !/^(font(?:-[\w-]+)?|line-height|letter-spacing|color|fill|white-space|overflow-wrap)$/.test(m[1]))
  .map(m => [m[1], m[2].trim()]);
const styleChecks = [];
for (const path of [...styles, ...components]) {
  const before = original(path), after = readFileSync(`../${path}`, 'utf8');
  const css = s => path.endsWith('.astro') ? s.match(/<style>([\s\S]*?)<\/style>/)[1] : s;
  assert.deepEqual(declarations(css(after)), declarations(css(before)), `${path}: every non-typographic declaration exact`);
  if (path.endsWith('.astro')) {
    const strip = s => normalize(s.replace(/<style>[\s\S]*?<\/style>/, '').replace(/^\s*\[current, scenario\]\.forEach\(output => output\.style\.setProperty\('--result-size'.*\n/m, '').replace(/^const resultSize = .*\n/m, '').replace(/ style=\{resultSize\(result\.(current|scenario)\)\}/g, ''));
    assert.equal(strip(after), strip(before), `${path}: markup/copy/script exact except presentation-only font shrinking removal`);
  }
  styleChecks.push({ path, nonTypographicDeclarations: declarations(css(after)).length, exact: true });
}
const layout = 'app/src/layouts/SiteLayout.astro';
assert.equal(normalize(readFileSync(`../${layout}`, 'utf8').replace("import '../styles/typography.css';\n", '')), normalize(original(layout)), 'Only shared typography import in layout');
const report = { baseline, protectedFiles: protectedFiles.length, styleChecks, copyCmsPricesProofMathChartArtIntakeNoindexExact: true, surfaceLayoutDeclarationsExact: true };
writeFileSync('../coordination/evidence/typography/preservation.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
