# Decisions and authority

Updated: 2026-10-08. This register separates explicit authority from exploratory implementation choices. Record meaningful decisions with source, reviewed revision and scope; do not make individual copy/spacing choices permanent owner gates.

## Applicable decisions and source constraints

| ID | Authority / state | Decision | Source and scope |
| --- | --- | --- | --- |
| D-001 | OWNER EXPLICIT / ACTIVE, HOMEPAGE EXCEPTION D-011 | Existing 15-page build is an exploratory baseline. Pause expansion; preserve the remaining pages without redesign/deletion. | OWNER coordination instruction in Codex, 2026-10-08. D-011 subsequently permits one representative-homepage visual revision only. |
| D-002 | OWNER EXPLICIT / ACTIVE | Repository is the coordination layer. Create the five handoff/state/decision/review files and durable project agent rules. | Same instruction. IMPLEMENTATION records required role input in `CODEX-TO-CHATGPT.md`; it must never fill blockers with invented production content/commercial decisions. |
| D-003 | OWNER EXPLICIT / THIS DELIVERY | Push the existing baseline and this coordination delivery to `origin/main`, validate and report SHA. | Same instruction. Repository visibility for review, not deployment/launch authorization. |
| D-004 | OWNER EXPLICIT / ACTIVE | Generated customer-facing wording without a specific applicable lock is `DRAFT / NON-AUTHORITATIVE`. | Same instruction; initially covered all 15 pages and shared/source-embedded wording. D-010 subsequently locks the homepage JSON alone for its representative test; other pages/shared wording remain draft. |
| D-005 | OWNER EXPLICIT / ACTIVE | Remaining pages cannot be expanded/redesigned/polished until representative page and content/visual direction pass review. | Same instruction. Actual acceptance must be recorded; drafts/tests/absence of objections are insufficient. |
| D-006 | SUPPLIED ARCHITECTURE LOCK / INTEGRATIONS OPEN | Astro static output, Git + Pages CMS, intended Cloudflare hosting, backend-agnostic lead frontend, no GA4 by default or persistent visitor tracking. | Curated `project/.../TECHNICAL-BASELINE.md`. This is the seed's documented architecture approval; operational integration/access/launch remain unresolved. Actual repo URL is supplied by the owner, superseding the seed's proposed name. |
| D-007 | OWNER EXPLICIT / DIRECTION ACTIVE | Use Resend email initially and store conversions/source data locally until a better system exists. | Owner reply in Codex. Authorizes interim implementation direction; no production privacy clearance, hosting choice or real email/lead processing approval follows from it. |
| D-008 | SUPPLIED BUSINESS FACTS / CONSTRAINTS | Medon AS provider; Synlighet + Konvertering + combination; recurring agreed work; bounded manual free check; main site/store standard starting scope; applicable external costs separate unless expressly included. | Curated project brief/commercial truth. Exact generated wording, inclusions, prices, terms, turnaround and proof are not locked by these facts. |
| D-009 | OWNER EXPLICIT / ACTIVE | Do not modify `system/` or `project/`. | Owner's build instruction, repeated in latest coordination instruction. |
| D-010 | STRATEGY_CONTENT / CONTENT LOCK | Complete homepage content/CRO argument in `app/src/content/pages/home.json` is locked as one coherent representative-page revision. Hero concept `De rette må finne deg. Så må de velge deg.` is retained; math teaching makes 1% → 2% explicit; free-check offer and service routing are clarified without introducing prices, proof or guarantees. | ChatGPT STRATEGY_CONTENT review of commit `9143d24`, 2026-10-08; actual revised content/handoff is at `55c31b523a50e3e6112fcb5f324adbfa663e21eb`. Scope is homepage JSON content for the representative-page test only; does not approve visual system, shared wording, other pages, pricing, legal copy or launch. |
| D-011 | OWNER EXPLICIT / R-03 REVISE; REVISION AUTHORIZED | Existing representative homepage is too visually restrained. Translate supplied Invite Design DNA into one new homepage direction, with composition freedom, Instrument Sans display/headings/major figures and Figtree body/UI. Preserve D-010 copy and commercial argument. Verify 1440/390/320px and stop for OWNER review. | Actual OWNER Codex instruction, 2026-10-08, referencing `E:\Design-DNA\Invite Design DNA.html`; prior representative delivery `e6261de` / report `4c577f9`. Recorded by IMPLEMENTATION as H-002. Supersedes D-001/H-001's homepage redesign restriction only. Remaining-page freeze, draft authority, read-only inputs and no launch/intake remain active. This is a revision direction, not acceptance of the resulting design. |

OWNER's explicit 2026-10-08 follow-up to D-011 sets the teaching-section background to `#320c43` and moves it directly below the hero. This is a scoped presentation revision, not acceptance of the whole homepage or a change to D-010's wording/authority. Recorded under the existing H-002 direction; no additional approval gate is created.

The same follow-up includes OWNER permission to use Phosphor icons, applied to the homepage's explanatory/service symbols with regular-weight SVGs. This does not extend visual acceptance or authorize propagation.

OWNER subsequently explicitly applies `#320c43` also to the homepage footer. This scoped color instruction remains under D-011/H-002; it does not approve the whole representative direction.

## Exploratory choices requiring review

| ID | State / proposed owner | Choice and limit |
| --- | --- | --- |
| P-001 | INFERRED EXCEPT D-010 / STRATEGY_CONTENT + OWNER where material | Remaining 14-page copy, shared CTA/UI wording, article reasoning, price-by-agreement presentation and utility/legal drafts remain `DRAFT / NON-AUTHORITATIVE`. Homepage JSON alone is locked under D-010. Seed copy is expressly not production-locked by reuse. |
| P-002 | IMPLEMENTATION TRANSLATION UNDER D-011 / OWNER REVIEW PENDING | New homepage teal/plum/mint/lavender surfaces, type execution, geometry, original find/choose illustration and equal 10/20 teaching panels are implementation choices translating the OWNER-selected Invite DNA. Font roles are explicit under D-011; the resulting whole is not accepted. Original cream/forest execution remains on the other 14 frozen pages. |
| P-003 | PROPOSED / OWNER | Use complete homepage `/` as the representative design page; `/vurdering/` only supports functional form review. No final representative-page acceptance yet. |
| P-004 | PROVISIONAL TECHNICAL CHOICE / operations + IMPLEMENTATION | Reusable Node API + SQLite satisfies interim local-storage preview. Persistent host/shared-system migration/HTTPS/proxy operations remain unresolved; no approved production hosting commitment. |
| P-005 | EXPLORATORY PORTFOLIO IMPLEMENTATION / STRATEGY_CONTENT | Implemented all 15 seed BUILD_NOW candidates before content/representative review. Existence of URLs/templates does not approve public page roles, production content or scaling sequence. |

The only complete content/CRO lock is D-010, scoped to homepage JSON for the representative-page test. No OWNER visual-system/representative-page acceptance, final RED_TEAM PASS or launch authorization is recorded. Earlier build-spec/handoff documents and technical success cannot supply those decisions.

## Recording subsequent decisions

Use: decision ID; date; actual author/review role; source commit and exact files/revision; decision and scope; evidence/verdict; remaining dependencies; superseded IDs if any. Require genuine role input before changing a draft authority/status. Record corresponding implementation scope in `CHATGPT-TO-CODEX.md` and update `REVIEW-QUEUE.md`.

Content lock, material offer approval, representative visual acceptance, independent RED_TEAM verdict and launch authorization are distinct. A lock covers only its named material. Do not promote the remaining 14 pages or legal/shared wording outside an accepted scope. No new approval is supplied by this recording template.
