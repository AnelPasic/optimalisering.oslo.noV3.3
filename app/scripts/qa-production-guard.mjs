import { writeFileSync, unlinkSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const file = resolve('.env.guard-qa');
assert.equal(existsSync(file), false, 'Do not overwrite an existing environment file');
writeFileSync(file, 'SITE_STAGE=production\n', { flag: 'wx' });
try {
  const pkg = JSON.parse(readFileSync(resolve('node_modules/astro/package.json'), 'utf8'));
  const cli = resolve('node_modules/astro', typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.astro);
  const result = spawnSync(process.execPath, [cli, 'build', '--mode', 'guard-qa'], { encoding: 'utf8', timeout: 30000 });
  assert.notEqual(result.status, 0, 'Unapproved production build must fail');
  assert.match(result.stdout + result.stderr, /Production blocked/);
  console.log('Actual Astro build refused production environment mode with draft content, as intended.');
} finally { unlinkSync(file); }
