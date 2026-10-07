# Existing Site Modernization — EXISTING_SITE profile

## Rule

A newer starter does not justify a migration.

Use:
`KEEP / FIX / TEST / MISSING / UNKNOWN`

## Audit

Where first-party search/conversion data exists, inspect it before inventing a diagnosis. Prefer real GSC queries/impressions and funnel evidence over generic keyword or CRO assumptions. For major CRO work use `research/cro-diagnosis.md`.


### KEEP
Working elements with evidence or low risk:
- ranking URLs;
- proven conversion paths;
- known good copy/proof;
- analytics;
- redirects;
- brand assets.

### FIX
Clear defects:
- broken forms;
- factual errors;
- crawl/index problems;
- performance issues;
- unsupported claims;
- obvious UX failures.

### TEST
Plausible improvements where evidence is uncertain:
- hook;
- CTA;
- package presentation;
- form friction;
- layout.

### MISSING
Required capability not present:
- attribution;
- lead storage;
- important service content;
- structured proof;
- privacy handling.

### UNKNOWN
Do not guess:
- true conversion rate;
- lead quality;
- customer economics;
- ownership/access;
- current platform facts.

## Migration business case

Only migrate Concrete/old Astro/etc. if benefits exceed:
- engineering time;
- SEO migration risk;
- operational disruption;
- editor retraining;
- integration risk.

Valid reasons may include:
- security/support lifecycle;
- serious performance ceiling;
- editorial pain;
- development cost;
- required feature incompatibility;
- consolidation with measurable maintenance savings.

“Medon Web System v3 prefers Astro” is not a valid reason by itself.


## Priority rule

Where cross-channel data exists, rank improvement work by business impact + evidence + exposure + effort/risk. Preserve baseline before major changes and record material experiments.
