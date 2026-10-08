# Decisions and authority

Updated: 2026-10-08. This register separates explicit authority from exploratory implementation choices. Record meaningful decisions with source, reviewed revision and scope; do not make individual copy/spacing choices permanent owner gates.

## Applicable decisions and source constraints

| ID | Authority / state | Decision | Source and scope |
| --- | --- | --- | --- |
| D-001 | OWNER EXPLICIT / ACTIVE | Existing 15-page build is an exploratory baseline. Pause expansion; preserve it without redesign/deletion. | Latest OWNER instruction in Codex, 2026-10-08. Supersedes any broader freedom in older local plans/handoffs. |
| D-002 | OWNER EXPLICIT / ACTIVE | Repository is the coordination layer. Create the five handoff/state/decision/review files and durable project agent rules. | Same instruction. IMPLEMENTATION records required role input in `CODEX-TO-CHATGPT.md`; it must never fill blockers with invented production content/commercial decisions. |
| D-003 | OWNER EXPLICIT / THIS DELIVERY | Push the existing baseline and this coordination delivery to `origin/main`, validate and report SHA. | Same instruction. Repository visibility for review, not deployment/launch authorization. |
| D-004 | OWNER EXPLICIT / ACTIVE | Generated customer-facing wording without a specific supplied production lock is `DRAFT / NON-AUTHORITATIVE`. | Same instruction; applies to all 15 page records and shared/source-embedded wording. No complete production-copy lock has been received. |
| D-005 | OWNER EXPLICIT / ACTIVE | Remaining pages cannot be expanded/redesigned/polished until representative page and content/visual direction pass review. | Same instruction. Actual acceptance must be recorded; drafts/tests/absence of objections are insufficient. |
| D-006 | SUPPLIED ARCHITECTURE LOCK / INTEGRATIONS OPEN | Astro static output, Git + Pages CMS, intended Cloudflare hosting, backend-agnostic lead frontend, no GA4 by default or persistent visitor tracking. | Curated `project/.../TECHNICAL-BASELINE.md`. This is the seed's documented architecture approval; operational integration/access/launch remain unresolved. Actual repo URL is supplied by the owner, superseding the seed's proposed name. |
| D-007 | OWNER EXPLICIT / DIRECTION ACTIVE | Use Resend email initially and store conversions/source data locally until a better system exists. | Owner reply in Codex. Authorizes interim implementation direction; no production privacy clearance, hosting choice or real email/lead processing approval follows from it. |
| D-008 | SUPPLIED BUSINESS FACTS / CONSTRAINTS | Medon AS provider; Synlighet + Konvertering + combination; recurring agreed work; bounded manual free check; main site/store standard starting scope; applicable external costs separate unless expressly included. | Curated project brief/commercial truth. Exact generated wording, inclusions, prices, terms, turnaround and proof are not locked by these facts. |
| D-009 | OWNER EXPLICIT / ACTIVE | Do not modify `system/` or `project/`. | Owner's build instruction, repeated in latest coordination instruction. |\n| D-010 | STRATEGY_CONTENT / CONTENT LOCK | Complete homepage content/CRO argument in `app/src/content/pages/home.json` is locked as one coherent representative-page revision. Hero concept `De rette må finne deg. Så må de velge deg.` is retained; math teaching makes 1% → 2% explicit; free-check offer and service routing are clarified without introducing prices, proof or guarantees. | ChatGPT STRATEGY_CONTENT review of commit `9143d24`, 2026-10-08. Scope is homepage content only; does not approve visual system, other pages, pricing, legal copy or launch. |

## Exploratory choices requiring review

| ID | State / proposed owner | Choice and limit |
| --- | --- | --- |
| P-001 | INFERRED / STRATEGY_CONTENT + OWNER where material | Full 15-page copy, homepage hook, argument, CTA/UI wording, FAQ/article reasoning, price-by-agreement presentation and utility/legal drafts. All `DRAFT / NON-AUTHORITATIVE`; seed copy is expressly not production-locked. |
| P-002 | INFERRED / OWNER representative-page review | Palette, type execution, 1200px shell, geometry/spacing, lowercase custom wordmark/symbol, find/choose illustration, cards/sections/forms and responsive hierarchy. Fonts and design priors came from the seed; the implemented whole was not accepted. |
| P-003 | PROPOSED / OWNER | Use complete homepage `/` as the representative design page; `/vurdering/` only supports functional form review. No final representative-page acceptance yet. |
| P-004 | PROVISIONAL TECHNICAL CHOICE / operations + IMPLEMENTATION | Reusable Node API + SQLite satisfies interim local-storage preview. Persistent host/shared-system migration/HTTPS/proxy operations remain unresolved; no approved production hosting commitment. |
| P-005 | EXPLORATORY PORTFOLIO IMPLEMENTATION / STRATEGY_CONTENT | Implemented all 15 seed BUILD_NOW candidates before content/representative review. Existence of URLs/templates does not approve public page roles, production content or scaling sequence. |

No production content, visual-system, representative-page, final RED_TEAM or launch acceptance is recorded in this register. Earlier build-spec/handoff documents and technical success cannot be used to infer those decisions.

## Recording subsequent decisions

Use: decision ID; date; actual author/review role; source commit and exact files/revision; decision and scope; evidence/verdict; remaining dependencies; superseded IDs if any. Require genuine role input before changing a draft authority/status. Record corresponding implementation scope in `CHATGPT-TO-CODEX.md` and update `REVIEW-QUEUE.md`.

Content lock, material offer approval, representative visual acceptance, independent RED_TEAM verdict and launch authorization are distinct. A lock covers only its named material. Do not promote the remaining 14 pages or legal/shared wording outside an accepted scope. No new approval is supplied by this recording template.
