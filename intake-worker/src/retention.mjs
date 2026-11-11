// Return identifiers and disposition only. Use the separately granted receipt read to inspect PII.
export async function retentionCandidates(db, site, now = Date.now(), after = '', lookaheadDays = 45) {
  const result = await db.prepare(`
    SELECT id, intent, created_at_ms, lifecycle, erasure_revision,
      date(created_at_ms/1000,'unixepoch','+12 months','floor') AS erase_by FROM receipts
    WHERE site_id=? AND id>? AND (
      lifecycle IN ('review_required','erasure_pending') OR
      (lifecycle='open' AND date(created_at_ms/1000,'unixepoch','+12 months','floor') <= date(?/1000,'unixepoch'))
    )
    ORDER BY id LIMIT 101
  `).bind(site, after, now + lookaheadDays * 86400000).all();
  const receipts = result.results.slice(0, 100);
  return { receipts, next: result.results.length > receipts.length ? receipts.at(-1).id : null };
}

export const dispositions = ['open', 'active_customer', 'legal_hold', 'erasure_pending'];

export async function setDisposition(db, site, id, disposition, now = Date.now()) {
  if (!dispositions.includes(disposition)) throw Error('invalid-disposition');
  // Changing a protected record requires a separate decision to return it to open first.
  const result = await db.prepare(`
    UPDATE receipts SET lifecycle=?, erasure_revision=CASE
      WHEN ?='erasure_pending' THEN COALESCE(erasure_revision,?) ELSE NULL END
    WHERE site_id=? AND id=?
    AND (lifecycle NOT IN ('active_customer','legal_hold') OR ? IN ('open',lifecycle))
    AND (
      ?<>'erasure_pending' OR (
        lifecycle IN ('open','erasure_pending')
        AND (notification_status<>'sending' OR lease_until_ms<=?)
        AND NOT EXISTS (
          SELECT 1 FROM customer_confirmations c WHERE c.id=receipts.id AND c.site_id=receipts.site_id
          AND c.notification_status='sending' AND c.lease_until_ms>?
        )
      )
    )
  `).bind(disposition, disposition, crypto.randomUUID(), site, id, disposition, disposition, now, now).run();
  return result.success && result.meta.changes === 1;
}

export async function eraseReceipt(db, site, id, revision) {
  // The FK cascades to the customer job, including the frozen request body.
  const result = await db.prepare("DELETE FROM receipts WHERE site_id=? AND id=? AND lifecycle='erasure_pending' AND erasure_revision=?")
    .bind(site, id, revision).run();
  return result.success && result.meta.changes === 1;
}
