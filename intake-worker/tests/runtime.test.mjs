import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { validate } from '../src/domain.mjs';

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
    bindings: { SITE_ID: 'optimalisering.oslo.no', INGRESS_ORIGIN: 'https://ingress.example.test', ALLOWED_ORIGINS: 'https://site.example.test', SITE_STAGE: 'production', PRIVACY_APPROVED: 'true', PUBLIC_LEADS_ENABLED: 'true', PUBLIC_ORDERS_ENABLED: 'true', SEND_NOTIFICATIONS: 'true', SEND_CUSTOMER_CONFIRMATIONS: 'true', RESEND_REPLY_TO: 'staff@example.test', RESEND_API_KEY: 'synthetic-not-a-key', RESEND_FROM: 'sender@example.test', LEAD_TO_EMAIL: 'recipient@example.test' },
    outboundService: async request => {
      try {
        assert.equal(request.url, 'https://api.resend.com/emails');
        const payload = await request.json();
        const customer = request.headers.get('Idempotency-Key').endsWith('/customer');
        assert.equal(payload.to[0], customer ? 'synthetic@example.test' : 'recipient@example.test');
        if (customer) assert.equal(payload.reply_to, 'staff@example.test');
        subjects.push(payload.subject); mails++; return Response.json({ id: 'synthetic-runtime-resend' });
      } catch (error) { outboundErrors.push(error.message); throw error; }
    },
  };
  const mf = new Miniflare(convertV4MiniflareOptions(options));
  try {
    const db = await mf.getD1Database('DB');
    const payload = { site: options.bindings.SITE_ID, form: 'gratis-sjekk', website: 'example.test', email: 'synthetic@example.test', source: {} };
    // Execute the real migration chain around a previously acknowledged legacy receipt.
    async function apply(name) {
      const sql = await readFile(new URL('../migrations/' + name, import.meta.url), 'utf8');
      for (const statement of sql.split(';').map(s => s.trim()).filter(Boolean)) await db.prepare(statement).run();
    }
    await apply('0001_receipts.sql');
    await db.prepare(`INSERT INTO receipts
      (id,site_id,origin,idempotency_key,intent,payload_json,created_at_ms,due_at_ms,notification_status,resend_message_id)
      VALUES (?,?,?,?,?,?,0,0,'accepted','legacy-internal-id')`)
      .bind('legacy-id', payload.site, 'https://site.example.test', 'synthetic-legacy',
        payload.form, JSON.stringify(validate(payload, payload.site))).run();
    await apply('0002_customer_confirmations.sql');
    const send = (key, input = payload) => mf.dispatchFetch('https://ingress.example.test/api/leads', {
      method: 'POST', headers: { Origin: 'https://site.example.test', 'Content-Type': 'application/json', 'Idempotency-Key': key, 'CF-Connecting-IP': '192.0.2.1' }, body: JSON.stringify(input),
    });
    assert.equal((await send('synthetic-legacy')).status, 200);
    const legacy = await db.prepare("SELECT lifecycle,resend_message_id FROM receipts WHERE id='legacy-id'").first();
    assert.equal(legacy.lifecycle, 'review_required');
    assert.equal(legacy.resend_message_id, 'legacy-internal-id');
    assert.equal(await db.prepare("SELECT id FROM customer_confirmations WHERE id='legacy-id'").first(), null);
    const responses = await Promise.all(Array.from({ length: 6 }, () => send('synthetic-runtime-race')));
    assert.ok(responses.every(r => [200, 201].includes(r.status)));
    const bodies = await Promise.all(responses.map(r => r.json())); assert.equal(new Set(bodies.map(r => r.id)).size, 1);
    // dispatchFetch's waitUntil is independent of receipt ACK; poll local storage only.
    async function waitForAccepted(table, expected) {
      for (let i = 0; i < 100; i++) {
        const count = await db.prepare("SELECT count(*) n FROM " + table + " WHERE notification_status='accepted'").first();
        if (count.n === expected) return;
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      assert.fail(JSON.stringify({ table, expected, mails, outboundErrors }));
    }
    await waitForAccepted('receipts', 2);
    await waitForAccepted('customer_confirmations', 1);
    const stored = await db.prepare('SELECT * FROM receipts WHERE id=?').bind(bodies[0].id).first();
    assert.equal(mails, 2);
    assert.equal(stored.leadproof_status, 'not_configured');
    assert.equal((await send('synthetic-runtime-order', { ...payload, form: 'pakke-bestilling', package: 'vekst', phone: '90000000' })).status, 201);
    await waitForAccepted('receipts', 3);
    await waitForAccepted('customer_confirmations', 2);
    assert.deepEqual(subjects.sort(), ['Bestilling – Optimalisering Oslo', 'Bra valg. Vi tar det herfra.',
      'Gratis sjekk – Optimalisering Oslo', 'Vi ser etter mulighetene du går glipp av']);
    // A missing customer table fails the entire D1 batch, including the new receipt.
    await db.prepare("DELETE FROM receipts WHERE id=?").bind(stored.id).run();
    assert.equal((await db.prepare("SELECT count(*) n FROM customer_confirmations WHERE id=?").bind(stored.id).first()).n, 0);
    await db.prepare('DROP TABLE customer_confirmations').run();
    assert.equal((await send('synthetic-runtime-failure')).status, 503);
    assert.equal((await db.prepare("SELECT count(*) n FROM receipts").first()).n, 2);
    assert.equal(mails, 4);
    await mf.setOptions(convertV4MiniflareOptions({ ...options, bindings: { ...options.bindings, SITE_STAGE: 'preview' } }));
    assert.equal((await send('synthetic-runtime-preview')).status, 503); assert.equal(mails, 4);
  } finally { await mf.dispose(); }
});
