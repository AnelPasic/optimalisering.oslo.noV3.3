export async function saveReceipt(db, payload, origin, key, now = Date.now(), customerConfirmation = false) {
  const id = crypto.randomUUID(), body = JSON.stringify(payload);
  // The database UNIQUE constraint arbitrates races; never acknowledge before commit.
  const insert = db.prepare(`INSERT INTO receipts
    (id,site_id,origin,idempotency_key,intent,payload_json,created_at_ms,due_at_ms,lifecycle)
    VALUES (?,?,?,?,?,?,?,?,'open') ON CONFLICT(site_id,idempotency_key) DO NOTHING`)
    .bind(id, payload.site, origin, key, payload.form, body, now, now);
  // Batch is atomic. The SELECT only enqueues for the new ID, even when two requests race.
  const [result] = customerConfirmation ? await db.batch([insert, db.prepare(`
    INSERT INTO customer_confirmations (id,site_id,due_at_ms)
    SELECT id,site_id,created_at_ms FROM receipts WHERE site_id=? AND id=?`)
    .bind(payload.site, id)]) : [await insert.run()];
  if (!result.success) throw Error('storage');
  const row = await db.prepare('SELECT id,payload_json FROM receipts WHERE site_id=? AND idempotency_key=?')
    .bind(payload.site, key).first();
  if (!row) throw Error('storage');
  return { id: row.id, conflict: row.payload_json !== body, created: result.meta.changes === 1 };
}

export async function readReceipts(db, site, after = '', limit = 100) {
  const result = await db.prepare(`SELECT r.id,r.site_id,r.intent,r.payload_json,r.created_at_ms,
    r.notification_status,r.notification_attempts,r.resend_message_id,r.last_error,r.leadproof_status,r.lifecycle,
    c.notification_status AS customer_notification_status,c.notification_attempts AS customer_notification_attempts,
    c.resend_message_id AS customer_resend_message_id,c.last_error AS customer_last_error
    FROM receipts r LEFT JOIN customer_confirmations c ON c.id=r.id AND c.site_id=r.site_id
    WHERE r.site_id=? AND r.id>? ORDER BY r.id LIMIT ?`).bind(site, after, limit + 1).all();
  const rows = result.results.slice(0, limit).map(({ payload_json, ...row }) => ({ ...row, payload: JSON.parse(payload_json) }));
  return { receipts: rows, next: result.results.length > limit ? rows.at(-1).id : null };
}

export function csv(rows) {
  const fields = ['id', 'site_id', 'intent', 'created_at_ms', 'notification_status', 'notification_attempts', 'resend_message_id', 'last_error', 'leadproof_status', 'website', 'email', 'phone', 'package', 'focus', 'message', 'source', 'lifecycle', 'customer_notification_status', 'customer_notification_attempts', 'customer_resend_message_id', 'customer_last_error'];
  const cell = value => {
    let text = String(value ?? '');
    if (/^[\s]*[=+@-]|^[\t\r\n]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  return [fields, ...rows.map(row => {
    const values = { ...row.payload, ...row, source: JSON.stringify(row.payload.source) };
    return fields.map(field => values[field]);
  })].map(row => row.map(cell).join(',')).join('\r\n') + '\r\n';
}

export async function countConversions(db, site, sinceMs) {
  // Each canonical receipt contributes once, regardless of endpoint retry or mail status.
  const result = await db.prepare(`SELECT intent, count(*) AS count FROM receipts
    WHERE site_id=? AND created_at_ms>=? GROUP BY intent`).bind(site, sinceMs).all();
  return Object.fromEntries(result.results.map(row => [row.intent, row.count]));
}
