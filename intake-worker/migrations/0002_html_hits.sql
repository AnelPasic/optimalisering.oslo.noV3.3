CREATE TABLE html_hits (
  site_id TEXT NOT NULL,
  day TEXT NOT NULL,
  page TEXT NOT NULL,
  channel TEXT NOT NULL,
  source TEXT NOT NULL,
  medium TEXT NOT NULL,
  campaign TEXT NOT NULL,
  ad_group TEXT NOT NULL,
  ad TEXT NOT NULL,
  hits INTEGER NOT NULL CHECK(hits > 0),
  PRIMARY KEY (site_id, day, page, channel, source, medium, campaign, ad_group, ad)
);
