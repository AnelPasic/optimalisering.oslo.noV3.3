# D-127 delivery evidence

2026-10-23. Incoming main **718b6e3**; implementation branch **anel/d127-synlighet-navigation**. Source commit is identified by Git history for the implementation files; no self-embedded receipt hash.

## Verification

- Focused `node --test tests/header-navigation.test.ts tests/lokal-seo-draft.test.ts tests/home-builder.test.ts tests/synlighet-cms.test.ts`: **16/16 PASS**. Child/CMS tests failed on old schema before implementation; reserved namespace regression failed before fix, then passed for both home and Synlighet.
- `npm run build`: **19 pages PASS**. Unpublished Lokal SEO adds no public route.
- `npm run check`: **0 errors, 0 warnings, 1 pre-existing hint** in qa-intake-h017a.mjs:65.
- `node scripts/audit-build.mjs`: **727 internal links/anchors PASS**, 18 audited pages.
- `node scripts/audit-cms-roundtrip.ts`: **28 existing content JSON PASS**, source bytes unchanged. Additional navigation children/draft editor projection tested separately. **No authenticated hosted CMS save/readback claim**; native schema/source is prepared on the local branch, not pushed to GitHub main.
- `qa-navigation.mjs`: local and actual hosted Enter/Space/Tab/Escape, focus return, parent navigation, outside click and breakpoint close PASS. Widths **1440,1000,901,900,390,320** have no horizontal overflow, controls >=44x44 and correct current destination/category context. Eight routes checked, unique IDs, review policy and no enabled order/global intake. All browser POSTs blocked; zero attempted POST/JS exceptions. Viewport simulation, not physical-device/screen-reader compliance certification.
- `verify-hosted.mjs`: **8 route HTML + 8 referenced built assets byte-identical** to local build. Header noindex/nofollow, robots Disallow all, empty sitemap. `/lokal-seo/` and `/api/leads` both404 as intended. `hosted-parity.json` records SHA-256.
- `live-ingress-readonly.mjs`: GET only. Public homepage references legacy API; legacy `/api/lead[/]` GET404, `/api/leads` GET200 HTML. These are **not** successful JSON POST or email evidence. Exact current Pages deployment/source mapped via authenticated Cloudflare/GitHub reads in `resend-discovery.json`; no secret values or stored customer leads read.

## Actual preview delivery

Direct authorized `wrangler deploy --keep-vars`, static **optimalisering-oslo-v33**, preview **https://optimalisering-oslo-v33.anel.workers.dev/**. Version **73f991d5-3f46-474b-813f-42488c995867**, deployment **c5ddc349-d35d-426e-8197-09091f4ee9d6**, **100%** confirmed via Cloudflare readback. This is direct review deployment, **not** a connected Git/native build or production delivery.

Before version **a874b140-8a99-4291-a201-fd1788873670** at deployment **43f4d0ac-f1d7-412e-b758-660df81396cd**. No domain/production Pages/backend/intake/indexing flags changed.

## Known unrelated test debt

Exploratory broader run included existing h017b-cms.test.ts and returned17/19. Two failures already derive from earlier accepted Synlighet/CMS migrations: test assumes Tjenester is flat collection instead of group, and edits top-level Synlighet title instead of nested Hero. Base718b6e3 contains those stale assumptions. They were not altered to make this branch appear green. The current dedicated CMS regression and roundtrip above pass. Earlier four empty-phone intake fixtures and optional legacy notification rows remain recorded in N3; no backend edits in this scope. Full verify is neither run nor claimed.

## Preservation / next gate

All eight global masters, proof/evidence/media/prices, protected existing forms/server/config, all other page JSON, `system/` and `project/` are unchanged. Only homepage `chrome.navigation[0]` gains submenu data; accepted Hero, seven section rows, hidden local draft and D-126 FAQ remain exact. Native CMS changes add optional children and an isolated draft file editor without changing existing fields or merge:true. Existing C0/C1 local reports/notes and OWNER images preserved.

Screenshots `local-dropdown-*` and `hosted-dropdown-*` show desktop/mobile including actual focused-link text. Saved PNGs inspected after the final focus-color correction; ordinary focus states use existing daisyUI colors. OWNER visual review of the dropdown and separate STRATEGY_CONTENT/OWNER review of complete Lokal SEO draft remain. Public intake/launch requires a new scoped handoff and the five verification items in `D127-RESEND-REUSE-ASSESSMENT.md`.
