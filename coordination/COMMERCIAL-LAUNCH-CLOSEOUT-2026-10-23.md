# Optimalisering Oslo — commercial closeout plan

Date: 2026-10-23. STATUS: **OWNER DIRECTION / LAUNCH SPRINT BRIEF, NOT IMPLEMENTATION OR PUBLICATION APPROVAL**.
Canonical pilot: `AnelPasic/optimalisering.oslo.noV3.3`. At initial review, `main` HEAD `f3c0183e5a06f170e7b4bf03dd2c2916bdb20831`; always refresh before work.
Companion system: `AnelPasic/MedonWebSystem` MWS-034 / MWS-035. PR #4 is a **draft spec**, not a runnable Astro starter.
Commercial purpose: finish a trustworthy Norwegian site that drives real qualified inquiries and paid monthly retainers. Do not make this client site wait for the generalized starter.

## Decision and scope

- **Primary priority: finish the existing Optimalisering Oslo website**, not expand shared starter architecture.
- **Locked and protected:** OWNER-accepted H-024C1/D-119 homepage Hero + one sortable mixed CMS `sections` list and protected Global Elements. Preserve all OWNER-edited sections/master content, package prices/copy, approved visuals/assets/case permissions, synced case data, existing live anchors, pricing/form modules, project voice, and site identity. No reversion to Topp/Main/Bunn.
- **Scoped next improvement:** shared header/navigation and buyer path, using the current approved visual system. Output 2–3 restrained and concrete header recommendations with a preferred option and small source-backed fixes; OWNER visual approval before material design change. No redesign of the whole site.
- **Launch launch-blockers are separate:** verify all real form submissions, destination and notification/reliability, privacy/terms/commercial authority and real site deploy/index settings before OWNER explicitly authorizes launch.
- **Optional future capabilities:** NO|EN full localization and light/dark/system preference are not prerequisites for the first *Norwegian* live release. The existing `LanguageSwitch.astro` is scaffolding, and EN generation is intentionally blocked. Current site is a one-theme light brand.
- Build the future reusable header/theme/locale capabilities in their own gated MWS tasks **after** the site's own commercial shell is fit for purpose, not by bulk copying premature components from this pilot.
- Never turn `SITE_STAGE=production`, `PUBLIC_LEADS_ENABLED`, `PUBLIC_ORDERS_ENABLED`, live API keys, indexing or real POSTs on under this planning brief.

## Source-derived current snapshot (2026-10-23)

- `app/src/components/HomeHeader.astro` uses `HomeHeader` with a logo, four plain desktop navigation links, one assessment CTA, mobile menu, Escape close behavior and a slot for `LanguageSwitch`. It uses `navbar` / `menu` daisyUI primitives but dedicated responsive CSS. Review visual hierarchy and consistency rather than rewriting it wholesale.
- `app/src/components/LanguageSwitch.astro` exists, `app/src/config/locales.ts` lists `nb` and `en`, but `app/src/pages/[...slug].astro` throws on EN content. **English publishing is not implemented/authorized.**
- `app/src/layouts/SiteLayout.astro` currently uses a static light `data-theme="optimalisering"`; `app/src/styles/app.css` specifies one daisyUI `optimalisering` skin (`prefersdark: false`). **No dark switch/system preference today.**
- `app/src/config/site.ts`: preview is true unless `SITE_STAGE === 'production'`; lead/order activation is separately guarded by `PUBLIC_LEADS_ENABLED`, `PUBLIC_ORDERS_ENABLED` and lead endpoint validation. Existing review Worker is noindex/intake-off by policy and past test receipts.
- At source inspection, `app/src/content/pages/` contains ~15 route JSON records. Sampled Norwegian routes `konvertering`, `priser`, `kontakt`, `vurdering`, `seo`, `om`, `synlighet`, `personvern`, `vilkar` all report `status: REVIEW_REQUIRED` / `authority: DRAFT / NON-AUTHORITATIVE`. This is a review requirement, not automatic proof their texts are wrong.
- `personvern.json` explicitly presents a draft and states that recipients, storage period and final disclosures must be settled; `vilkar.json` is also a draft about scope, price, invoicing and termination. These demand human/business/legal input before live release; **do not invent terms**.
- The global `priser` master and existing `PackageOrder` / `PackageSection` are already designed so ordering unfolds in the package card (D-122). Do not create a second order flow or override current OWNER prices. Order/lead form semantics and server route must be authenticated and verified before enabling.
- `coordination/PROJECT-STATE.md` has a latest D-126 Spiss+ global FAQ *source* edit, whose actual current hosted Worker rendering/build is NOT independently proven in that record. Preserve the specific approved text and perform a limited preview check before launch.
- The site has not been declared launched, indexed, or accepting real lead POSTs. Published `https://optimalisering.oslo.no/` versus review Worker availability was not independently established through the available web reader; do not infer production availability from URL configuration.
- H-024C1 homepage CMS has OWNER PASS; previous other page-family implementation statuses vary. Do not treat all service pages as automatically OWNER-approved just because homepage passed.

## Sequenced launch critical path

### C0: Read-only, one-pass launch inventory (first Codex action)

Read newest `main` and this brief plus `AGENTS.md`, latest `coordination/DECISIONS.md`, `PROJECT-STATE.md`, `REVIEW-QUEUE.md`, `CODEX-TO-CHATGPT.md` and pilot config; do not follow stale `ACTIVE` tasks below newer completed/approved entries.
Return a concise route-by-route board grouping actual remaining items as:
- BLOCKER for first Norwegian go-live (real inquiries/order reliability, verified receiver/anti-spam/PII privacy, accurate legal/business text, functional links, factual price/proof permissions, actual SEO/noindex/launch gate).
- IMPORTANT for sales/comprehension (visible contact CTAs, header usability, positioning, useful default page sections and mobile conversion).
- OPTIONAL POST-LAUNCH (NO|EN release, dark mode, animation and system-wide starter polish).
Check server-side handler and delivery path with actual repo evidence; do not invent a working real form backend.
Avoid inventing a long backlog: cite concrete file/route and customer impact; deduplicate historical review queue items.

### C1: Shared header and conversion path — first visual/implementation slice

Inspect desktop/mobile header on homepage, `/synlighet/`, `/konvertering/`, `/priser/`, `/vurdering/` and `/kontakt/` using genuine local or noindex preview.
Confirm current menu order, label clarity, CTA prominence, active state, mobile behavior, keyboard/focus, minimum touch targets, safe display at 1440, 900, 390 and 320px.
Propose **up to 3 materially different, restrained header variations** consistent with currently approved Nordic visual DNA and daisyUI; show before/after where practical, rank them by buyer task, accessibility and conversion rather than subjective aesthetics.
The **one main inquiry CTA must stay discoverable**, and the package order mechanism must remain in the pricing card. No fake "free" claims, no pricing rewriting, no unrelated page-component restyling.
Implement only the OWNER-selected header direction; maintain actual usable `navbar`/`menu` daisyUI structures and project tokens. If there is a clear a11y bug with no design decision needed, a minimal scoped fix can be proposed, but still respect existing edit/approval rules.
Local focused tests + build + responsive/keyboard smoke, then noindex review Worker preview and OWNER visual acceptance. Do not enable submissions/indexing.
No new EN pages, no dark-theme switch as part of C1.

### C2: Commercial content and first Norwegian release

Review the actual page set and approved terms for Norwegian buyers, starting with primary buying routes (Home, Synlighet, Konvertering, Priser, Vurdering/Kontakt) before secondary insight/support pages.
MWS-031 Content Quality Gate applies to each concrete copy change. Make a short explicit OWNER decision list for unsourced legal/privacy/pricing/proof/claim authority and only change approved content. Avoid repeatedly revising already approved material or harmonizing all writing into the same canned phrasing.
Prove real lead and order delivery end-to-end (spam/rate limits, PII and retention, delivery failure, confirmation, attribution if relevant), proper production flags, valid canonical/hreflang only if EN exists, sitemap/robots/index gating, basic security, accessible forms and analytics consent/measurement. Use safe test data and avoid submitting real visitor PII before permission.
Only OWNER can approve production/index/lead intake launch after evidence. The launch checklist must name remaining verified blockers vs deliberate limitations.
Then use a bounded 1-week conversion measurement watch plan (not a promise to automate it here) to observe inquiries/orders and fix commercially important friction rather than adding decorative design work.

## Acceptance / completion definition

A Norwegian buyer can understand what Medon does, who it's for, what the advertised package/next step means, and can confidently complete the chosen inquiry/order path on mobile and desktop. Every publicly asserted result or price is supported/approved; required provider/legal/privacy facts are correct; live forms reach the intended receiver with appropriate safeguards. Authenticated Pages CMS Save, real build, correct preview and verified production rollout must be documented and separately OWNER approved. Draft content markers are resolved as appropriate. Optional EN/dark mode/starter extraction may remain backlog items without blocking first release.

## Instructions for future reusability

After a component achieves site-specific OWNER acceptance, record what is truly generic, source/test receipts, and what is brand-specific in MedonWebSystem MWS-035 backlog. Do not replicate the whole current site. The reusable code starter is promoted only after a separate second-brand canary; this commercial website is not the generic starter's release gate.

**Current handoff**: Begin at **C0 read-only inventory and C1 header design directions**, then STOP for OWNER on material design/launch choices. No implementation, deployment, production flag, Git merge, page rewriting or indexing approval is given merely by this brief.
