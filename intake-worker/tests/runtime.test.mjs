import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Use the already locked Wrangler toolchain; no second runtime dependency tree.
const require = createRequire(new URL('../../app/package.json', import.meta.url));
const { Miniflare, convertV4MiniflareOptions } = require('miniflare');
const { build } = require('esbuild');

test('workerd + real local D1: migration, racing POSTs, write failure, default gates, and isolated Resend fetch', { timeout: 60000 }, async () => {
  const bundle = await build({ entryPoints: [fileURLToPath(new URL('../src/worker.mjs', import.meta.url))], bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022' });
  let mails = 0; const outboundErrors = [], subjects = [];
  const options = {
    cf: false, modules: true, script: bundle.outputFiles[0].text, compatibilityDate: '2026-10-06',
    d1Databases: ['DB'], ratelimits: { RATE_LIMITER: { namespace_id: '129', simple: { limit: 100, period: 60 } } },
    bindings: { SITE_ID: 'optimalisering.oslo.no', INGRESS_ORIGIN: 'https://ingress.example.test', ALLOWED_ORIGINS: 'https://site.example.test', SITE_STAGE: 'production', PRIVACY_APPROVED: 'true', PUBLIC_LEADS_ENABLED: 'true', PUBLIC_ORDERS_ENABLED: 'true', SEND_NOTIFICATIONS: 'true', RESEND_API_KEY: 'synthetic-not-a-key', RESEND_FROM: 'sender@example.test', LEAD_TO_EMAIL: 'recipient@example.test' },
    outboundService: async request => {
      try {
        assert.equal(request.url, 'https://api.resend.com/emails');
        const payload = await request.json(); assert.equal(payload.to[0], 'recipient@example.test');
        subjects.push(payload.subject); mails++; return Response.json({ id: 'synthetic-runtime-resend' });
      } catch (error) { outboundErrors.push(error.message); throw error; }
    },
  };
  const mf = new Miniflare(convertV4MiniflareOptions(options));
  try {
    const db = await mf.getD1Database('DB');
    const sql = await readFile(new URL('../migrations/0001_receipts.sql', import.meta.url), 'utf8');
    // Execute the actual migration statements, not a duplicated test schema.
    for (const statement of sql.split(';').map(s => s.trim()).filter(Boolean)) await db.prepare(statement).run();
    const payload = { site: options.bindings.SITE_ID, form: 'gratis-sjekk', website: 'example.test', email: 'synthetic@example.test', source: {} };
    const send = (key, input = payload) => mf.dispatchFetch('https://ingress.example.test/api/leads', {
      method: 'POST', headers: { Origin: 'https://site.example.test', 'Content-Type': 'application/json', 'Idempotency-Key': key, 'CF-Connecting-IP': '192.0.2.1' }, body: JSON.stringify(input),
    });
    const responses = await Promise.all(Array.from({ length: 6 }, () => send('synthetic-runtime-race')));
    assert.ok(responses.every(r => [200, 201].includes(r.status)));
    const bodies = await Promise.all(responses.map(r => r.json())); assert.equal(new Set(bodies.map(r => r.id)).size, 1);
    // dispatchFetch's waitUntil is independent of receipt ACK; poll local storage only.
    let stored;
    for (let i = 0; i < 100; i++) {
      stored = await db.prepare('SELECT * FROM receipts').first();
      if (stored.notification_status === 'accepted') break;
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    assert.equal(stored.notification_status, 'accepted', JSON.stringify({ error: stored.last_error, mails, outboundErrors })); assert.equal(mails, 1);
    assert.equal(stored.leadproof_status, 'not_configured');
    assert.equal((await send('synthetic-runtime-order', { ...payload, form: 'pakke-bestilling', package: 'vekst', phone: '90000000' })).status, 201);
    for (let i = 0; i < 100; i++) {
      const count = await db.prepare("SELECT count(*) n FROM receipts WHERE notification_status='accepted'").first();
      if (count.n === 2) break;
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    assert.equal((await db.prepare("SELECT count(*) n FROM receipts WHERE notification_status='accepted'").first()).n, 2);
    assert.deepEqual(subjects.sort(), ['Bestilling – Optimalisering Oslo', 'Gratis sjekk – Optimalisering Oslo']);
    await db.prepare('DROP TABLE receipts').run();
    assert.equal((await send('synthetic-runtime-failure')).status, 503);
    assert.equal(mails, 2);
    await mf.setOptions(convertV4MiniflareOptions({ ...options, bindings: { ...options.bindings, SITE_STAGE: 'preview' } }));
    assert.equal((await send('synthetic-runtime-preview')).status, 503); assert.equal(mails, 2);
  } finally { await mf.dispose(); }
});
