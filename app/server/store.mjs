import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';

export function openLeadStore(filename) {
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY, idempotency_key TEXT UNIQUE NOT NULL, payload_json TEXT NOT NULL,
      created_at TEXT NOT NULL, notification_status TEXT NOT NULL DEFAULT 'pending',
      resend_message_id TEXT, attempts INTEGER NOT NULL DEFAULT 0,
      first_attempt_at TEXT, last_error TEXT
    );
    CREATE TABLE IF NOT EXISTS conversions (
      lead_id TEXT PRIMARY KEY REFERENCES leads(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL, created_at TEXT NOT NULL, source_json TEXT NOT NULL
    );`);
  const parse = row => row ? { ...row, payload: JSON.parse(row.payload_json) } : null;
  return {
    save(payload, key) {
      const json = JSON.stringify(payload);
      db.exec('BEGIN IMMEDIATE');
      try {
        const existing = db.prepare('SELECT * FROM leads WHERE idempotency_key = ?').get(key);
        if (existing) {
          if (existing.payload_json !== json) throw new Error('idempotency-conflict');
          db.exec('COMMIT');
          return parse(existing);
        }
        const id = randomUUID();
        const created = new Date().toISOString();
        db.prepare('INSERT INTO leads(id, idempotency_key, payload_json, created_at) VALUES (?, ?, ?, ?)').run(id, key, json, created);
        db.prepare('INSERT INTO conversions(lead_id, event_type, created_at, source_json) VALUES (?, ?, ?, ?)').run(id, payload.form === 'pakke-bestilling' ? 'order_received' : 'assessment_received', created, JSON.stringify(payload.source));
        db.exec('COMMIT');
        return this.get(id);
      } catch (error) { db.exec('ROLLBACK'); throw error; }
    },
    get(id) { return parse(db.prepare('SELECT * FROM leads WHERE id = ?').get(id)); },
    pending() { return db.prepare("SELECT id FROM leads WHERE notification_status = 'pending' ORDER BY created_at").all().map(row => row.id); },
    attempt(id) { db.prepare('UPDATE leads SET attempts = attempts + 1, first_attempt_at = COALESCE(first_attempt_at, ?) WHERE id = ?').run(new Date().toISOString(), id); },
    sent(id, messageId) { db.prepare("UPDATE leads SET notification_status = 'sent', resend_message_id = ?, last_error = NULL WHERE id = ?").run(messageId, id); },
    failed(id, code) { db.prepare('UPDATE leads SET last_error = ? WHERE id = ?').run(code, id); },
    counts() { return { leads: db.prepare('SELECT COUNT(*) AS n FROM leads').get().n, conversions: db.prepare('SELECT COUNT(*) AS n FROM conversions').get().n }; },
    export() { return db.prepare('SELECT * FROM leads ORDER BY created_at').all().map(parse); },
    delete(id) { db.prepare('DELETE FROM leads WHERE id = ?').run(id); },
    close() { db.close(); },
  };
}
