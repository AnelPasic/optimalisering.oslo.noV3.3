import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const baseline = '9354087';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', cwd: '..' });
const normalize = s => s.replaceAll('\r\n', '\n');
const original = path => git('show', `${baseline}:${path}`);
const styles = ['app/src/styles/global.css','app/src/styles/terminology.css', ...['home-invite','service-invite','pricing-invite','package-offer'].map(n => `app/public/styles/${n}.css`), ...['HomeProof','HomeHeroPhoto','HomeLeverage'].map(n => `app/src/components/${n}.astro`)];
const allowed = new Set([...styles, 'app/src/layouts/SiteLayout.astro','app/package.json','app/scripts/qa-typography.mjs','coordination/CODEX-TO-CHATGPT.md','coordination/PROJECT-STATE.md','coordination/REVIEW-QUEUE.md']);
const protectedFiles = git('ls-tree','-r',baseline).trim().split('\n').map(line => { const [entry,path] = line.split('\t'); return { path, blob: entry.split(' ')[2] }; }).filter(p => !allowed.has(p.path));
for (const { path, blob } of protectedFiles) assert.equal(git('hash-object',`--path=${path}`,path).trim(),blob,`${path} preserved`);
const css = (s,path) => path.endsWith('.astro') ? s.match(/<style>([\s\S]*?)<\/style>/)[1] : s;
const frozenDeclarations = source => [...source.replace(/\/\*[\s\S]*?\*\//g,'').matchAll(/([\w-]+):\s*([^;{}]+);/g)].filter(m => !/^(?:border(?:-[\w-]+)?|background(?:-[\w-]+)?|box-shadow|padding(?:-[\w-]+)?|(?:row-|column-)?gap|outline(?:-[\w-]+)?|min-height)$/.test(m[1])).map(m => [m[1],m[2].trim()]);
const checks = [];
for (const path of styles) {
  const before=original(path), after=readFileSync(`../${path}`,'utf8');
  assert.deepEqual(frozenDeclarations(css(after,path)),frozenDeclarations(css(before,path)),`${path}: typography/macro layout/position/crop unchanged`);
  if (path.endsWith('.astro')) assert.equal(normalize(after.replace(/<style>[\s\S]*?<\/style>/,'')),normalize(before.replace(/<style>[\s\S]*?<\/style>/,'')),`${path}: exact markup/script/copy`);
  checks.push({ path, frozenDeclarations: frozenDeclarations(css(after,path)).length, exact: true });
}
const layout = 'app/src/layouts/SiteLayout.astro';
assert.equal(normalize(readFileSync(`../${layout}`,'utf8').replace("import '../styles/surfaces.css';\n",'')),normalize(original(layout)));
const guard = 'app/scripts/qa-typography.mjs';
assert.equal(normalize(readFileSync(`../${guard}`,'utf8').replace("process.env.QA_OUTPUT_DIR || ",'')),normalize(original(guard)), 'Only output routing changes in typography guard');
writeFileSync('../coordination/evidence/h018/preservation.json',JSON.stringify({ baseline, protectedFiles: protectedFiles.length, typographyTokensExact: true, contentCmsMathProofPricesMediaBackendReferencesExact: true, checks },null,2));
console.log(`H-018 preservation PASS: ${protectedFiles.length} protected blobs; markup/scripts and non-shell declarations exact.`);
