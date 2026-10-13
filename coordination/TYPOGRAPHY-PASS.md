# Typography system pass — 2026-10-13

**Authority/spec:** actual direct OWNER request in Codex. Typography only across the existing site, followed by main/connected Worker delivery and STOP for OWNER visual review. This is no new content lock or launch approval.

**Goal:** one readable semantic scale using Instrument Sans + Figtree, with no visible customer text below 14px.

**Architecture:** `app/src/styles/typography.css` owns role sizes, weights and line heights. Existing selectors consume these roles; their layout, surfaces and copy stay intact. Fluid heading sizes respect the existing narrow columns. Numeric results use a shared responsive role and wrap instead of length-based shrinking. Context-specific text colors may darken to meet AA; backgrounds stay exact.

**Tech stack:** existing Astro/CSS/Playwright; no added dependencies.

## Implementation plan

- [x] Capture incoming source font-size inventory and rendered baseline/screenshots at 1440/900/390/320. Record preexisting readability failures.
- [x] Add semantic roles and migrate shared/public/component typography, including mobile overrides and calculator presentation-only resizing. Preserve all content, CMS, math/chart logic, art, box/layout declarations and safeguards.
- [x] Add an automated browser regression guard for visible text size, contrast, clipping, overflow and button containment. Inspect headings, glossary open state, menus, tooltips, calculator invalid/extreme state and forms; no sub-14px allowlist.
- [x] Run full verify, existing whole-site browser checks, focused behavior checks and four-width typography QA. Inspect screenshots and source diff; account for all remaining raw declarations and preservation hashes.
- [ ] Push main, verify native connected build and exact live assets, repeat typography checks live. Update CODEX-TO-CHATGPT, PROJECT-STATE and REVIEW-QUEUE; stop for OWNER review.

## Review focus

- Narrow hero/header and package labels must wrap without clipping or losing actions.
- The twelve graph ticks must remain distinct and readable; numeric output must never shrink below the role floor.
- Secondary text on mint/lavender/plum must meet AA, including chart SVG fill and helper/error states.
- Native glossary details retain exact copy and anchor/tooltip behavior; expanded definitions remain readable.
- Larger text may increase height; retain box shape/background/border/padding/grid and hero image/crop declarations.

Ruling: execute the fully specified OWNER request without an additional design approval gate. The requested visual review follows the concrete delivered result. No box pass is authorized.

Verification ledger: final full verify passes 89 tests, zero Astro errors/warnings, one preexisting hint; source guard 175 role consumers/zero raw sizes; rendered guard 196 groups/zero size-contrast-clipping-button-overflow failures. Existing browser 40/40 and terminology 28 groups plus all anchors/no-JS pass. Preservation: 1,206 existing blobs and all non-typographic declarations exact. Fresh read-only technical review found no issues; reviewer browser execution was sandbox-blocked, so its browser assessment used source/captures/logs. Root full browser execution passed. Formal acceptance/launch remain pending; live receipt is checked separately.
