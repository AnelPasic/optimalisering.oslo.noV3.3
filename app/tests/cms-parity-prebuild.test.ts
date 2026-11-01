import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkPageSources, prepareCleanBuild } from '../scripts/prepare-clean-build.mjs';

test('clean build takes only generated cache, preserving page sources and evidence', () => {
  const root = mkdtempSync(join(tmpdir(), 'cms-parity-prebuild-'));
  const pageDir = join(root, 'src', 'content', 'pages');
  const file = join(pageDir, 'service.json');
  try {
    mkdirSync(pageDir, { recursive: true });
    mkdirSync(join(root, '.astro'));
    mkdirSync(join(root, 'dist'));
    mkdirSync(join(root, 'node_modules', '.vite'), {recursive:true});
    const original = JSON.stringify({ slug:'service',kind:'service',sections:[{_block:'closingCta',id:'avslutning'}] });
    writeFileSync(file, original);
    assert.equal(checkPageSources(root), 1);
    assert.equal(prepareCleanBuild(root),1);
    assert.equal(readFileSync(file,'utf8'),original);
    for(const generated of ['.astro','dist','node_modules/.vite'])assert.equal(existsSync(join(root,generated)),false);
  } finally { rmSync(root,{recursive:true,force:true}); }
});

test('old auto insertion fields are rejected with an exact source path', () => {
  const root = mkdtempSync(join(tmpdir(), 'cms-parity-legacy-'));
  const dir = join(root, 'src', 'content', 'pages', 'nested');
  try {
    mkdirSync(dir,{recursive:true});
    const path = join(dir,'legacy.json');
    for(const field of ['closingCta','proofAfter','pricingBridge']){
      writeFileSync(path, JSON.stringify({kind:'service',composition:{service:{[field]:false}},sections:[]}));
      assert.throws(()=>checkPageSources(root),error=>error instanceof Error &&
        error.message.includes('nested/legacy.json') && error.message.includes(field));
    }
  } finally { rmSync(root,{recursive:true,force:true}); }
});

test('current Oslo page content has no retired composition flags',()=>{
  assert.equal(checkPageSources()>=17,true,'OWNER-deleted Lokal SEO is not recreated');
});

test('Astro rebuild refreshes the Content Layer independently of provider cache', () => {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(packageJson.scripts.build, 'astro build --force && npm run search:index');
});
