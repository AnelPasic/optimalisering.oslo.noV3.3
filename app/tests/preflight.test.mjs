import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assertProductionReady, readinessPlugin } from '../scripts/preflight.mjs';

test('locked status cannot publish draft page or shared copy authority', () => {
  // Entirely synthetic approval fixtures; this does not promote project content.
  const root = mkdtempSync(join(tmpdir(), 'medon-authority-guard-'));
  const previousDirectory = process.cwd();
  const pages = join(root, 'src', 'content', 'pages');
  const config = join(root, 'src', 'config');
  const pageFile = join(pages, 'sample.json');
  const sharedFile = join(config, 'copy-authority.json');
  const env = {
    SITE_STAGE: 'production', PUBLIC_LEADS_ENABLED: 'true', PRIVACY_APPROVED: 'true', LAUNCH_APPROVED: 'true',
    RESEND_API_KEY: 'synthetic-not-a-key', RESEND_FROM: 'test@example.invalid', LEAD_TO_EMAIL: 'test@example.invalid',
  };
  try {
    mkdirSync(pages, { recursive: true });
    mkdirSync(config);
    process.chdir(root);
    writeFileSync(sharedFile, JSON.stringify({ authority: 'CONTENT_LOCKED / AUTHORITATIVE' }));
    writeFileSync(pageFile, JSON.stringify({ status: 'CONTENT_LOCKED', authority: 'DRAFT / NON-AUTHORITATIVE' }));
    assert.throws(() => assertProductionReady(env), /content drafts need owner review/);
    writeFileSync(pageFile, JSON.stringify({ status: 'CONTENT_LOCKED' }));
    assert.throws(() => assertProductionReady(env), /content drafts need owner review/);
    writeFileSync(pageFile, JSON.stringify({ status: 'CONTENT_LOCKED', authority: 'CONTENT_LOCKED / AUTHORITATIVE' }));
    writeFileSync(sharedFile, JSON.stringify({ authority: 'DRAFT / NON-AUTHORITATIVE' }));
    assert.throws(() => assertProductionReady(env), /shared customer-facing copy needs review/);
    writeFileSync(sharedFile, JSON.stringify({ authority: 'CONTENT_LOCKED / AUTHORITATIVE' }));
    assert.doesNotThrow(() => assertProductionReady(env));
  } finally {
    process.chdir(previousDirectory);
    for (const file of [pageFile, sharedFile]) { try { unlinkSync(file); } catch {} }
    for (const directory of [pages, join(root, 'src', 'content'), config, join(root, 'src'), root]) {
      try { rmdirSync(directory); } catch {}
    }
  }
});

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
