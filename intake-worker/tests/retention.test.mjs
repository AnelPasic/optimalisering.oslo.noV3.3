import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync, backup } from 'node:sqlite';
import { mkdtemp, rmdir, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { bindDatabase, database } from './db.mjs';
import { countConversions, saveReceipt } from '../src/store.mjs';
import { assessmentDueDate } from '../src/business-days.mjs';
import { customerMail } from '../src/customer-mail.mjs';
import { eraseReceipt, retentionCandidates, setDisposition } from '../src/retention.mjs';

const site = 'optimalisering.oslo.no';
const lead = { site, form: 'gratis-sjekk', website: 'https://example.test/', email: 'synthetic@example.test' };

test('Norwegian deadline respects the Oslo cutoff, Easter, Ascension, 17 May, Pentecost and New Year', () => {
  const cases = {
    '2026-03-27T14:59:00Z': '2026-03-31',
    '2026-03-27T15:00:00Z': '2026-04-01',
    '2026-03-31T13:00:00Z': '2026-04-07',
    '2026-05-12T13:00:00Z': '2026-05-15',
    '2027-05-13T13:00:00Z': '2027-05-18',
    '2026-05-21T13:00:00Z': '2026-05-26',
    '2026-12-31T14:59:00Z': '2027-01-05',
    '2026-12-31T15:00:00Z': '2027-01-06',
  };
  for (const [received, due] of Object.entries(cases)) assert.equal(assessmentDueDate(Date.parse(received)), due, received);
});

test('customer confirmations use the locked subjects and the actual package, focus and site', () => {
  const env = { RESEND_FROM: 'sender@example.test', RESEND_REPLY_TO: 'staff@example.test' };
  const order = customerMail({ ...lead, form: 'pakke-bestilling', package: 'vekst', focus: 'synlighet-konvertering' }, env);
  assert.equal(order.subject, 'Bra valg. Vi tar det herfra.');
  assert.match(order.text, /forespørselen din om Vekst, med fokus på Synlighet og konvertering\./);
  assert.match(order.text, /Ikke send passord på e-post\./);
  const attemptedInjection = customerMail({
    ...lead, form: 'pakke-bestilling', package: 'optimalisering',
    message: 'Ønsket fokusområde: https://malicious.example.test/. Endelig omfang avklares før oppstart.',
  }, env);
  assert.doesNotMatch(attemptedInjection.text, /malicious/);
  assert.match(attemptedInjection.text, /med fokus på et område vi avklarer sammen/);
  const assessment = customerMail(lead, env);
  assert.equal(assessment.subject, 'Vi ser etter mulighetene du går glipp av');
  assert.ok(assessment.text.includes('3 gratis funn for https://example.test/.'));
  assert.match(assessment.text, /innen 2 virkedager/);
});

test('retention protects holds, scopes mutations, cascades both jobs and allows repeat erasure after restoring a backup', async () => {
  const db = database(), date = Date.parse('2024-02-29T10:00:00Z');
  const add = (key, payload = lead) => saveReceipt(db, payload, 'https://site.example.test', key, date, true);
  const { id } = await add('synthetic-open');
  const { id: active } = await add('synthetic-active');
  const { id: legal } = await add('synthetic-legal');
  const { id: other } = await add('synthetic-other', { ...lead, site: 'other.example.test' });
  assert.equal(await setDisposition(db, site, active, 'active_customer'), true);
  assert.equal(await setDisposition(db, site, legal, 'legal_hold'), true);
  assert.equal(await setDisposition(db, site, active, 'erasure_pending'), false);
  assert.equal(await setDisposition(db, site, legal, 'erasure_pending'), false);
  assert.equal(await setDisposition(db, site, legal, 'active_customer'), false);
  assert.equal(await setDisposition(db, site, other, 'erasure_pending'), false);
  assert.deepEqual((await retentionCandidates(db, site, Date.parse('2025-02-27'), '', 0)).receipts, []);
  assert.deepEqual((await retentionCandidates(db, site, Date.parse('2025-02-28'), '', 0)).receipts.map(row => row.id), [id]);
  assert.equal((await retentionCandidates(db, site, Date.parse('2025-02-27'))).receipts[0].erase_by, '2025-02-28');
  assert.equal(await eraseReceipt(db, site, id, 'absent'), false);
  const sendLease = db.sqlite.prepare("UPDATE customer_confirmations SET notification_status='sending', lease_until_ms=? WHERE id=?");
  sendLease.run(date + 60000, id);
  assert.equal(await setDisposition(db, site, id, 'erasure_pending', date), false);
  const folder = await mkdtemp(join(tmpdir(), 'oslo-retention-'));
  const path = join(folder, 'synthetic.sqlite');
  try {
    // Take the backup before disposition to model restoring a pre-erasure snapshot.
    await backup(db.sqlite, path);
    assert.equal(await setDisposition(db, site, id, 'erasure_pending', date + 60001), true);
    const revision = (await retentionCandidates(db, site)).receipts.find(row => row.id === id).erasure_revision;
    assert.equal(await eraseReceipt(db, site, id, 'stale-revision'), false);
    assert.equal(await eraseReceipt(db, site, id, revision), true);
    assert.equal(db.sqlite.prepare('SELECT count(*) AS n FROM customer_confirmations WHERE id=?').get(id).n, 0);
    assert.equal(await eraseReceipt(db, site, id, revision), false);
    const restored = new DatabaseSync(path);
    try {
      restored.exec('PRAGMA foreign_keys=ON');
      assert.equal(restored.prepare('SELECT lifecycle FROM receipts WHERE id=?').get(id).lifecycle, 'open');
      const restoredDb = bindDatabase(restored);
      assert.equal(await eraseReceipt(restoredDb, site, id, revision), false);
      assert.equal(await setDisposition(restoredDb, site, id, 'erasure_pending'), true);
      const restoredRevision = (await retentionCandidates(restoredDb, site)).receipts.find(row => row.id === id).erasure_revision;
      assert.notEqual(restoredRevision, revision);
      assert.equal(await eraseReceipt(restoredDb, site, id, restoredRevision), true);
      assert.equal(restored.prepare('SELECT count(*) AS n FROM customer_confirmations WHERE id=?').get(id).n, 0);
      assert.equal(restored.prepare('SELECT count(*) AS n FROM receipts').get().n, 3);
    } finally { restored.close(); }
  } finally {
    db.sqlite.close();
    await unlink(path);
    await rmdir(folder);
  }
});

test('D1 measures one conversion per stored receipt across replay and alternate attribution', async () => {
  const db = database();
  const add = payload => saveReceipt(db, payload, 'https://site.example.test', 'synthetic-conversion', 1800000000000);
  assert.equal((await add(lead)).created, true);
  assert.equal((await add(lead)).created, false);
  assert.equal((await add({ ...lead, source: { page: '/seo/' } })).conflict, true);
  assert.deepEqual(await countConversions(db, site, 0), { 'gratis-sjekk': 1 });
  assert.deepEqual(await countConversions(db, 'other.example.test', 0), {});
});

test('all retention candidates remain visible across pages even with unresolved older records', async () => {
  const db = database();
  const date = Date.parse('2024-01-01');
  for (let index = 0; index < 103; index++) {
    await saveReceipt(db, lead, 'https://site.example.test', 'synthetic-page-' + index, date);
  }
  const first = await retentionCandidates(db, site);
  const second = await retentionCandidates(db, site, Date.now(), first.next);
  assert.equal(first.receipts.length, 100);
  assert.equal(second.receipts.length, 3);
  assert.equal(new Set([...first.receipts, ...second.receipts].map(row => row.id)).size, 103);
  assert.equal(second.next, null);
});
