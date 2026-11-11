CREATE TABLE customer_confirmations (
  id TEXT PRIMARY KEY REFERENCES receipts(id) ON DELETE CASCADE,
  site_id TEXT NOT NULL,
  notification_status TEXT NOT NULL DEFAULT 'pending' CHECK(notification_status IN ('pending','sending','retry','accepted','dead_letter','manual_review')),
  notification_attempts INTEGER NOT NULL DEFAULT 0,
  first_attempt_at_ms INTEGER,
  due_at_ms INTEGER NOT NULL,
  lease_until_ms INTEGER NOT NULL DEFAULT 0,
  lease_token TEXT,
  notification_json TEXT,
  resend_message_id TEXT,
  last_error TEXT
);
CREATE INDEX customer_confirmations_due ON customer_confirmations(site_id, notification_status, due_at_ms);
ALTER TABLE receipts ADD COLUMN lifecycle TEXT NOT NULL DEFAULT 'review_required'
  CHECK(lifecycle IN ('review_required','open','active_customer','legal_hold','erasure_pending'));
ALTER TABLE receipts ADD COLUMN erasure_revision TEXT;
CREATE INDEX receipts_lifecycle ON receipts(site_id, lifecycle, created_at_ms);
