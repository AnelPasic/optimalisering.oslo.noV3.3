# H-024A7 — FAQ shared width and optional horizontal contact variant

Date: 2026-10-18
Status: OWNER-authorized scoped correction / implementation. STOP for OWNER visual/CMS review.
Direct OWNER verdict: "Kontaktseksjonen på forsiden er ok as is, men vi vil trenge en vannrett variant. Boksvariant: ok. FAQ-seksjoner: ingen grunn til at den skal ha max bredde lavere enn resten."

## Current approvals and verified cause

- Existing H-024A6 homepage contact (copy left, stacked-field form right): OWNER PASS, KEEP AS-IS default. Do not silently repaint or replace it.
- H-024A6 CMS Boksvariant: OWNER PASS; no further edits.
- FAQ width: shared.css globally sets the project .site-shell .shell to min(1440px,100%-80px), but applies .faq-grid {grid-template-columns:.8fr 1.2fr;gap:96px;max-width:1200px}. The second max-width, not the shared shell, restricts FAQ. Remove this independent narrower width. Keep approved two-column FAQ composition and mobile single column, genuine Faq.astro collapse renderer, data/source, pricing projection, copy/anchors and accessibility.
- Need a second horizontal assessment layout. This means, as a reviewable initial design interpretation, a compact full-width contact layout where desktop website, email and main CTA align in a row, with intro/explanatory text, optional comment and privacy/preview/status still accessible. The current left-copy/right-stacked-field version is already a two-column layout; do not merely rename it horizontal or adjust its gap. If OWNER prefers a different interpretation after preview, revise the alternative rather than changing the current default.

## Task A — FAQ width fix

Remove FAQ-specific max-width:1200px rather than substituting a different cap. Use global shell width/gutters at 1440/1100/900/390/320, preserving heading vs questions proportions, gap and readable text widths. Test actual homepage /#sporsmal, other routes using Faq.astro, and real same-source FAQ demo at /design-system/#production-home-sections. Computed parent/child widths and horizontal coordinates must show alignment with neighboring shared shell sections, zero clipping/overflow, proper keyboard/touch accordion and price answer source.

## Task B — additional horizontal homepage contact preset

- Add a typed non-destructive layout preset to the existing homepage assessment content and native Pages CMS editor (.pages.yml): e.g. split (current default) and horizontal (new). Expose intuitive Norwegian choices "To kolonner (dagens)" and "Vannrett (kompakt skjema)". Missing/legacy layout resolves to split without changing saved homepage content or default CSS behavior. Never expose raw CSS class fields.
- Continue rendering via ONE HomeAssessment component, same authoritative homepage form content and logic. Real daisyUI card/card-body/input/textarea/button/alert structure; Tailwind responsive composition with theme tokens. Desktop layout distinctly horizontal and useful, ideally website + email + CTA in one line with supporting optional message/notice/privacy row. On mobile stack fields in logical reading/tab order. Never omit/rewrite content, privacy, promised delivery, required/optional fields, status, action/method, guards, disabled button or transport; zero POSTs.
- In /design-system/#production-home-sections demonstrate BOTH actual split and proposed horizontal instances with same CMS source, safe unique input IDs and endpoint-free non-submitting specimen mode, full normal page width. Mark the second as alternate CMS preset, not as live default. Do not create a second hard-coded HTML form just for the demo.
- Preserve current homepage default on Worker. For the new CMS choice require an authenticated actual Pages CMS roundtrip: choose horizontal -> Save -> exact Git source -> successful native Cloudflare deploy -> Worker homepage horizontal -> reload CMS, restore original split/default -> native deploy -> Worker homepage original, byte-exact source and protected assets. If authenticated CMS save is unavailable, be explicit that this acceptance step is incomplete; fixtures do not replace it.
- Browser compare real split baseline, alternate horizontal, corrected FAQ and both source-backed demos at 1440/1100/900/390/320. Check computed geometry, paragraph/readability, form labels, privacy/status, focus, keyboard/tap, no horizontal scroll or duplicate IDs, zero POSTs.
- No new color/typography scale, no change to previously approved D-088 Hero, D-092 Card, D-093 Footer/Hero, selector/calculator/proof, no page builder rollout/section add/delete, no CTA/price/copy revisions and no intake/indexing/launch change. H-022 PARKED. H-024B BLOCKED. H-024A3 whole-editor still needs separate acceptance.

## Evidence and exit

Pull fresh main and preserve OWNER-edited data/order. Record exact minimal CSS diff, new typed CMS controls and reversible fallback, before/after computed FAQ widths and layout screenshots, native Worker/assets evidence, focused tests plus one bounded verify and independent visual review. Publish Worker, update coordination/CODEX-TO-CHATGPT.md, PROJECT-STATE.md, REVIEW-QUEUE.md and evidence/h024a7/README.md. Then STOP for OWNER visual review. Do not claim full H-024A3 PASS or authorization for H-024B.
