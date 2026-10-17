# H-024A5 — readable card typography, 1rem minimum for substantive body copy

Date: 2026-10-17
Status: OWNER REVISE on card text readability; authorized scoped correction / STOP for OWNER review.
Source: direct OWNER after H-024A4 delivery: **"ja men merket at alle kort har litt for liten font, ser det er på [design-system] også, så det er vel globalt. tenker 1rem burde være passe eller det minste."**

## Decision
- OWNER confirms cards now look structurally good after H-024A4, **but card text still reads too small** in public usage and also the global `/design-system/` examples. This is a *narrow typography follow-up*; do not reopen approved rounded card geometry, colors, spacing, CMS wiring, Hero variants or layout system.
- **Minimum 1rem** for substantive card paragraphs/description text at the browser's default root font size (typically 16px); keep relative units and user zoom behavior. Headings remain at least as prominent; existing button/CTA and compact badges/metadata have their own semantic typography. Do not make all CSS text, labels or metadata 1rem.
- Global `app/src/styles/typography.css` already declares `--type-body: clamp(1rem, 1.35vw, 1.125rem)` and `--type-body-sm:1rem`. Thus **do not assume the source token is too small**. Measure computed sizes first. Some card bodies may rely on daisyUI inherit/other utilities/context; identify concrete rendered instances and actual cascade before changing tokens or adding overrides.
- If *all* relevant card paragraphs already compute at >=1rem and OWNER still perceives them as too small, do **not** claim a fake improvement by setting another 1rem rule. Show measured browser data and trial a restrained **1.0625rem–1.125rem** for genuinely explanatory card copy (while checking multiline height and column balance); use the smallest effective readable option, then STOP for visual review.

## Inspect / scope
1. Read fresh main, H-024A4 actual ContentCard implementation/evidence, `typography.css`, `project.css`, `shared.css`, `app.css`, and official daisyUI Card patterns (GitMCP if available). Respect OWNER's current H-024A4 card/content state.
2. Inventory ALL currently visible ordinary card families at representative pages: `ContentCard` (homepage `passer`, 2/3/4 design-system examples, ordinary service/inner sections), design-system `Kort med bilde`, PageList card/media/alternating as relevant, package/price cards, proof/result cards, and any contact/form card. Distinguish substantive explanatory paragraphs from micro-labels, numeric KPIs, footnotes and controlled button typography; list what is and isn't being changed.
3. Capture actual **computed CSS font-size/line-height/font-family** for representative title/body/CTA/meta at 1440, 900, 390 and 320 px before the fix. If text appears small only in a *particular* card, identify exact cascade or inherited font class. Prefer a single semantic typographic role, use existing `--type-body` wherever it fits, and avoid a second unrelated CSS/component system.
4. Ensure substantive `ContentCard` body is **>=1rem** both on the actual `#passer` section and `/design-system/` 2/3/4 demos; same behavior across all ordinary page families using it. Where other card families have real body text smaller than 1rem, align them to the same readable body role, without changing intentional compact metadata, badges, stat labels, or card controls.
5. No global `body`/root font-size rewrite, no arbitrary blanket `.card *` rule, no rem converted to fixed pixels, no broad H1/H2/nav/form CSS cascade change. A small shared card/body semantic rule or using a proper existing Tailwind/daisyUI typography utility is preferred. Keep daisyUI card/body/title/action structure (MWS-029).
6. Recheck long `passer` explanatory copy, 2/3/4 cards, 320px narrow viewport, dark-on-light and light-on-dark cards: no clipping, awkward overflow or broken title/action alignment. Maintain readable line-height (~1.5–1.6 for body) and AA contrast. Don't truncate/rewrite OWNER copy or invent CTAs to make the grid equal.
7. Preserve exactly existing OWNER content/order, selected CMS box/color/columns, approved four Heroes and their geometry, H-024A4 card geometry/radius/padding, prices/proof/FAQ/form authority, noindex/intake/launch gates. **Do not start H-026 Hero/Footer refactor or H-024B** as part of this narrow task. H-022 stays parked.

## Evidence / acceptance
- Before/after computed-size table for true production card content (at minimum `#passer`) and shared design-system content for title/paragraph/CTA, plus inventory of other card families. Verify *computed* min size rather than source declaration alone.
- Actual screenshots side by side from the same section at 1440 / 900 / 390 / 320. If initial computed content was already >=1rem, explicitly document why and what actual measured change improves readability.
- Focused QA + appropriate project verify, test affected surfaces and long card copy, preserve unrelated default/Hero states. One independent read-only visual/UX review.
- This task changes presentation code only, not CMS data. No artificial CMS save/restore requirement if editor/schema are unchanged; if CMS behavior changes, use the native save → Git → Cloudflare → visible Worker → restore contract.
- Report exact diff, measured changes, native Worker screenshot/build confirmation, limitations and recommendations through `coordination/CODEX-TO-CHATGPT.md` and evidence. STOP for OWNER visual review of card readability on both `/#passer` and `/design-system/`.

## Sequencing
H-024A4 Card primitive structurally delivered and OWNER says it now looks good **apart from text size**. H-024A5 resolves typography and final ordinary Card review first. H-026 (daisyUI Hero/Footer audit) remains queued until OWNER approves readability change; H-024B remains blocked pending separate overall CMS editor gate; H-022 parked. No launch authorization.
