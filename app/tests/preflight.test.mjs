import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assertProductionReady, readinessPlugin } from '../scripts/preflight.mjs';

const safe = {
  SITE_STAGE: 'production', PUBLIC_LEADS_ENABLED: 'true', PRIVACY_APPROVED: 'true', LAUNCH_APPROVED: 'true',
  PUBLIC_LEAD_ENDPOINT: '/api/leads',
  RESEND_API_KEY: 'synthetic-not-a-key', RESEND_FROM: 'test@example.invalid', LEAD_TO_EMAIL: 'test@example.invalid',
};

test('pages and shared copy are treated as live: no CONTENT_LOCKED or draft metadata gate', () => {
  // This check does not require page files, old status values or copy-authority.json.
  assert.doesNotThrow(() => assertProductionReady(safe));
  assert.doesNotThrow(() => assertProductionReady({ ...safe, SITE_STAGE: 'preview' }));
});

test('production continues to enforce intake, privacy, launch and optional order safety', () => {
  for (const key of ['PUBLIC_LEADS_ENABLED', 'PRIVACY_APPROVED', 'LAUNCH_APPROVED',
    'RESEND_API_KEY', 'RESEND_FROM', 'LEAD_TO_EMAIL']) {
    assert.throws(() => assertProductionReady({ ...safe, [key]: '' }), new RegExp(key));
  }
  for (const endpoint of ['', 'http://api.example.test/leads', '//api.example.test/leads',
    'https://user:pass@api.example.test/leads', 'https://api.example.test/leads?email=x',
    'https://api.example.test/leads#x', 'https://']) {
    assert.throws(() => assertProductionReady({ ...safe, PUBLIC_LEAD_ENDPOINT: endpoint }), /PUBLIC_LEAD_ENDPOINT/);
  }
  assert.throws(() => assertProductionReady({ ...safe, PUBLIC_ORDERS_ENABLED: 'true' }), /ORDERS_ENABLED/);
  const orders = { ...safe, PUBLIC_ORDERS_ENABLED: 'true', ORDERS_ENABLED: 'true', ORDERS_DEPLOYMENT_APPROVED: 'true' };
  assert.doesNotThrow(() => assertProductionReady(orders));
  for (const key of ['ORDERS_ENABLED', 'ORDERS_DEPLOYMENT_APPROVED']) {
    assert.throws(() => assertProductionReady({ ...orders, [key]: '' }), new RegExp(key));
  }
});

test('Astro environment files cannot bypass real production configuration checks', () => {
  const root=mkdtempSync(join(tmpdir(),'medon-env-guard-'));
  try {
    writeFileSync(join(root,'.env.production'),'SITE_STAGE=production\n');
    const plugin=readinessPlugin();
    assert.throws(()=>plugin.configResolved({ mode:'production',envDir:root }),/Production blocked/);
    writeFileSync(join(root,'.env.production'),'SITE_STAGE=preview\n');
    assert.doesNotThrow(()=>plugin.configResolved({ mode:'production',envDir:root }));
    writeFileSync(join(root,'.env.local'),'SITE_STAGE=production\n');
    assert.throws(()=>plugin.configResolved({ mode:'development',envDir:root }),/Production blocked/);
  } finally {
    for(const name of ['.env.production','.env.local']) { try { unlinkSync(join(root,name)); } catch {} }
    rmdirSync(root);
  }
});
