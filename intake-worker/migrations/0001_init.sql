-- Single Medon-owned intake database. External customer tenants require independent access boundaries.
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL,
  submission_id TEXT NOT NULL,
  form TEXT NOT NULL CHECK(form IN ('gratis-sjekk','pakke-bestilling')),
  payload_json TEXT NOT NULL,
  payload_hash TEXT NOT NULL,
  created_at_ms INTEGER NOT NULL,
  email_status TEXT NOT NULL DEFAULT 'pending' CHECK(email_status IN ('pending','sending','retry','sent','manual_review')),
  email_attempts INTEGER NOT NULL DEFAULT 0,
  email_due_at_ms INTEGER NOT NULL DEFAULT 0,
  lease_until_ms INTEGER NOT NULL DEFAULT 0,
  first_attempt_at_ms INTEGER,
  resend_message_id TEXT,
  last_error TEXT,
  leadproof_status TEXT NOT NULL DEFAULT 'not_configured',
  UNIQUE(site_id, submission_id)
);
CREATE INDEX IF NOT EXISTS idx_leads_due ON leads(email_status,email_due_at_ms,created_at_ms);
CREATE INDEX IF NOT EXISTS idx_leads_site ON leads(site_id,created_at_ms);
