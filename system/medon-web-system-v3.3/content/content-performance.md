# Content Performance & Indexation Loop

Launch is the start of measurement, not the end.

## Monitor

For important organic pages:
- indexed / not indexed;
- previously indexed but dropped / index decay;
- crawl status;
- impressions;
- queries;
- CTR;
- average position as directional data;
- conversions/leads;
- assisted commercial value where measurable;
- cannibalization;
- internal-link coverage.

## Distinguish indexing states

Do not treat all “not indexed” states as identical.

For a page that was crawled but not indexed:
- inspect quality, distinct value, duplication and page premise first;
- do not assume resubmitting/sitemaps solve a content-value problem.

For discovered but not crawled:
- inspect technical accessibility, crawl paths, site quality/noise and scale;
- avoid overdiagnosing crawl budget on small sites.

## Scaled-publishing canary

Before publishing dozens of pages from a new/changed template, prefer a small representative batch first when timing allows. Observe crawl/index/search/user outcomes before scaling.

This is an internal risk-control tactic, not a Google rule and not a fixed required page count.

## Template health

When pages are produced from a repeated pattern, measure by template/generator.

Example:

| Template | Published | Indexed | Leads | Main issue |
|---|---:|---:|---:|---|
| service-location-v1 | 20 | 18 | 6 | healthy |
| service-location-v2 | 30 | 14 | 1 | investigate |

Watch the **change in failure rate**, not just the raw count.

If multiple pages from one generator fail, inspect the generator/process before rewriting URLs one by one.

## Allowed corrective outcomes

A weak page does not automatically get rewritten.

Choose:
- improve with real information gain;
- merge into a stronger page;
- redirect;
- canonicalize when appropriate;
- noindex for genuine non-search utility;
- delete if it does not deserve to exist.

Do not use `noindex` merely to make a Search Console report look clean.

## Feedback to blueprint

Use performance data to update:
- Page Brief assumptions;
- Proof Registry;
- content templates;
- internal linking;
- offer/copy;
- future content priorities.

## Keep KPI layers separate

Do not collapse these into one “SEO success” number:
- crawl/discovery;
- indexation;
- ranking/visibility;
- impressions/clicks;
- AI mention/citation/referral;
- engagement;
- lead/conversion;
- qualified customer/revenue.
