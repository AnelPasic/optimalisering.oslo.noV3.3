import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readinessPlugin } from '../scripts/preflight.mjs';

test('Astro production-mode env files cannot make draft output indexable', () => {
  const root = mkdtempSync(join(tmpdir(), 'medon-env-guard-'));
  try {
    writeFileSync(join(root, '.env.production'), 'SITE_STAGE=production\n');
    const plugin = readinessPlugin();
    assert.throws(() => plugin.configResolved({ mode: 'production', envDir: root }), /Production blocked/);
    writeFileSync(join(root, '.env.production'), 'SITE_STAGE=preview\n');
    assert.doesNotThrow(() => plugin.configResolved({ mode: 'production', envDir: root }));
    writeFileSync(join(root, '.env.local'), 'SITE_STAGE=production\n');
    assert.throws(() => plugin.configResolved({ mode: 'development', envDir: root }), /Production blocked/);
  } finally {
    for (const name of ['.env.production', '.env.local']) { try { unlinkSync(join(root, name)); } catch {} }
    rmdirSync(root);
  }
});
