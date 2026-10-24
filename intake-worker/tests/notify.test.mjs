import test from 'node:test';
import assert from 'node:assert/strict';
import { database } from './db.mjs';
import { saveReceipt } from '../src/store.mjs';
import { notifyOne, retryDue } from '../src/notify.mjs';

async function fixture() {
  const DB = database(), now = 1800000000000;
  const payload = { site: 'optimalisering.oslo.no', form: 'pakke-bestilling', intent: 'order', package: 'vekst', phone: '90000000', website: 'https://example.test/', email: 'synthetic@example.test', message: '', model: '', source: {} };
  const { id } = await saveReceipt(DB, payload, 'https://site.example.test', 'synthetic-notify-key', now);
  const env = { DB, SITE_ID: payload.site, SITE_STAGE: 'production', PRIVACY_APPROVED: 'true', SEND_NOTIFICATIONS: 'true', RESEND_API_KEY: 'synthetic-not-a-key', RESEND_FROM: 'sender@example.test', LEAD_TO_EMAIL: 'recipient@example.test' };
  const row = () => DB.sqlite.prepare('SELECT * FROM receipts WHERE id=?').get(id);
  return { env, DB, id, now, row };
}
const accepted = async () => new Response('{"id":"synthetic-resend-id"}');

test('Resend acknowledgement is accepted, never delivered; duplicate claims send one immutable template', async () => {
  const { env, id, now, row } = await fixture(); let calls = 0;
  const transport = async (_url, options) => {
    calls++; const mail = JSON.parse(options.body);
    assert.match(mail.subject, /Bestilling/); assert.match(mail.text, /Pakke: vekst/);
    assert.equal(mail.text.includes('undefined'), false);
    assert.equal(options.headers['Idempotency-Key'], `receipt/${id}`);
    return accepted();
  };
  await Promise.all([notifyOne(env, id, { now, transport }), notifyOne(env, id, { now, transport })]);
  assert.equal(calls, 1); assert.equal(row().notification_status, 'accepted');
  assert.equal(row().resend_message_id, 'synthetic-resend-id'); assert.equal(row().notification_attempts, 1);
  await notifyOne(env, id, { now: now + 60000, transport }); assert.equal(calls, 1);
});

test('transient error and uncertainty retain receipt and retry exact original body after config changes', async () => {
  for (const first of [async () => new Response('{}', { status: 503 }), async () => { throw Error('synthetic private network detail'); }, async () => new Response('not json')]) {
    const { env, id, now, row } = await fixture(); let original;
    await notifyOne(env, id, { now, transport: async (url, opts) => { original = opts.body; return first(url, opts); } });
    assert.equal(row().notification_status, 'retry'); assert.ok(row().last_error);
    assert.equal(row().last_error.includes('private'), false);
    const calls = []; env.RESEND_FROM = 'changed@example.test'; env.LEAD_TO_EMAIL = 'changed@example.test';
    await retryDue(env, { now: now + 61000, transport: async (_u, opts) => { calls.push(opts.body); return accepted(); } });
    assert.deepEqual(calls, [original]); assert.equal(row().notification_status, 'accepted');
  }
});

test('slow Resend is aborted and marked uncertain; a 202 or malformed acknowledgement is not accepted', async () => {
  const { env, id, now, row } = await fixture();
  await notifyOne(env, id, { now, timeoutMs: 10, transport: (_url, opts) => new Promise((_resolve, reject) => opts.signal.addEventListener('abort', () => reject(Error('aborted')))) });
  assert.equal(row().last_error, 'resend-uncertain'); assert.equal(row().notification_status, 'retry');
  await notifyOne(env, id, { now: now + 61000, transport: async () => new Response('{"id":"not-confirmed"}', { status: 202 }) });
  assert.equal(row().notification_status, 'manual_review'); assert.equal(row().resend_message_id, null);
});

test('definitive rejection is dead-lettered; retry count and idempotency window are bounded', async () => {
  const first = await fixture();
  await notifyOne(first.env, first.id, { now: first.now, transport: async () => new Response('{}', { status: 422 }) });
  assert.equal(first.row().notification_status, 'dead_letter');
  const second = await fixture();
  for (let attempt = 0; attempt < 5; attempt++) await notifyOne(second.env, second.id, { now: second.now + attempt * 3600000, transport: async () => new Response('{}', { status: 503 }) });
  assert.equal(second.row().notification_attempts, 5); assert.equal(second.row().notification_status, 'manual_review');
  const third = await fixture();
  await notifyOne(third.env, third.id, { now: third.now, transport: async () => { throw Error('unknown'); } });
  let calls = 0;
  await retryDue(third.env, { now: third.now + 24 * 3600000, transport: async () => { calls++; return accepted(); } });
  assert.equal(calls, 0); assert.equal(third.row().notification_status, 'manual_review');
});

test('save interruption and expired claims recover; final interrupted attempt requires manual review', async () => {
  const { env, DB, id, now, row } = await fixture();
  // No waitUntil job ran after commit; the next sweep must discover the pending row.
  await retryDue(env, { now, transport: accepted }); assert.equal(row().notification_status, 'accepted');
  DB.sqlite.prepare("UPDATE receipts SET notification_status='sending',notification_attempts=2,lease_until_ms=?,lease_token='old' WHERE id=?").run(now - 1, id);
  await retryDue(env, { now, transport: accepted }); assert.equal(row().notification_status, 'accepted');
  DB.sqlite.prepare("UPDATE receipts SET notification_status='sending',notification_attempts=5,lease_until_ms=? WHERE id=?").run(now - 1, id);
  await retryDue(env, { now, transport: accepted }); assert.equal(row().notification_status, 'manual_review');
});

test('old worker completion cannot overwrite a newer lease', async () => {
  const { env, DB, id, now, row } = await fixture(); let release, started;
  const ready = new Promise(resolve => { started = resolve; });
  const old = notifyOne(env, id, { now, transport: async () => { started(); return new Promise(resolve => { release = resolve; }); } });
  await ready;
  DB.sqlite.prepare("UPDATE receipts SET lease_token='new-owner',notification_status='sending',lease_until_ms=? WHERE id=?").run(now + 120000, id);
  release(await accepted()); await old;
  assert.equal(row().notification_status, 'sending'); assert.equal(row().lease_token, 'new-owner');
});

test('preview gates and unconfigured sender send nothing; sweep and claims cannot cross site', async () => {
  for (const patch of [{ SEND_NOTIFICATIONS: 'false' }, { SITE_STAGE: 'preview' }, { PRIVACY_APPROVED: 'false' }, { RESEND_API_KEY: '' }, { SITE_ID: 'another.example.test' }]) {
    const { env, id, now, row } = await fixture(); Object.assign(env, patch); let calls = 0;
    await notifyOne(env, id, { now, transport: async () => { calls++; return accepted(); } });
    assert.equal(calls, 0); assert.equal(row().notification_attempts, 0);
  }
});

test('lease lost before body freeze never sends stale recipient or template', async () => {
  const { env, DB, id, now, row } = await fixture();
  let release, started, blockFirst = true;
  const ready = new Promise(resolve => { started = resolve; });
  const originalPrepare = DB.prepare.bind(DB);
  DB.prepare = sql => {
    const statement = originalPrepare(sql);
    if (!sql.startsWith('SELECT * FROM receipts')) return statement;
    return { bind(...values) {
      const bound = statement.bind(...values);
      return { ...bound, async first() {
        const result = await bound.first();
        if (blockFirst) { blockFirst = false; started(); await new Promise(resolve => { release = resolve; }); }
        return result;
      } };
    } };
  };
  const messages = [], transport = async (_url, opts) => { messages.push(JSON.parse(opts.body)); return accepted(); };
  const stale = notifyOne({ ...env, LEAD_TO_EMAIL: 'old@example.test' }, id, { now, transport });
  await ready;
  await notifyOne({ ...env, LEAD_TO_EMAIL: 'new@example.test' }, id, { now: now + 61000, transport });
  release(); await stale;
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to[0], 'new@example.test');
  assert.equal(row().notification_status, 'accepted');
});
