CREATE TABLE IF NOT EXISTS traffic_views (
  site_id TEXT NOT NULL,
  view_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  started_at_ms INTEGER NOT NULL,
  local_day TEXT NOT NULL,
  page TEXT NOT NULL,
  channel TEXT NOT NULL,
  campaign TEXT NOT NULL,
  ad_group TEXT NOT NULL,
  ad TEXT NOT NULL,
  active_ms INTEGER NOT NULL DEFAULT 0,
  scroll_percent INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (site_id, view_id)
);
CREATE INDEX IF NOT EXISTS traffic_views_period ON traffic_views (site_id, local_day, started_at_ms);
CREATE INDEX IF NOT EXISTS traffic_views_retention ON traffic_views (site_id, started_at_ms);
