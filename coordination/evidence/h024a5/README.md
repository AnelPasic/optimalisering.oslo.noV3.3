# H-024A5 — Card Typography

2026-10-17, actual OWNER D-091 / `H024A5-CARD-BODY-TYPE-FLOOR.md`. Incoming main `a4ebf46`; published implementation `f267eebd7ce8ebdecbcab8ff9bdb3e32da407d00`. Narrow presentation correction; STOP for OWNER readability comparison. H-026 queued until review, H-024B blocked, H-022 parked. No launch/intake/indexing change.

## Measured cause and minimal change

The actual installed daisyUI5.7.50 Card stylesheet supplies `.card-body { font-size:var(--card-fs,.875rem) }`. That direct parent size overrides inherited page body typography: actual passer and true shared2/3/4 demos computed14px /22.4px even though root body token already has a1rem minimum. Existing mechanism narrow-screen paragraph rule was already16px and stays16px.

Product diff is **three lines in three files**: add `card-copy` to ContentCard's substantive paragraph and the existing design-system image-card paragraph; define one semantic adapter in project.css with `font-size:var(--type-body);line-height:var(--leading-body)`. No new font token, scale, dependency or component system. The existing body role computes18px/28.8px at1440,16px/25.6px at900/390/320. Figtree remains the description family. Numbers, titles, buttons, badges, labels, form helpers and price/proof metadata retain their own exact roles. No broad card descendant selector or global body/root change. Using card-lg or changing card-body inheritance would also change geometry or compact roles; this description-only adapter avoids that scope expansion.

True daisyUI card/body/title/actions and existing20px radius,24px padding,20px gap, selected surfaces/borders remain. Text reflows and card height naturally grows; copy is not shortened. Ordinary HomeSection and ContentSection consume the same ContentCard. Existing readable legacy/default/PageList/package descriptions remain unchanged. No CMS/schema/data save is needed or performed.

Official component reference consulted2026-10-17: [daisyUI Card](https://daisyui.com/components/card/). The installed stylesheet, computed browser results and visual comparisons establish the actual cause/change.

## Evidence and scope inventory

- [Computed role table and all card-family inclusions/exclusions](computed-typography.md): actual title/paragraph/action/meta measurements at all four widths. Full per-element font family/weight/line-height/color and geometry in before/checks.json and after/checks.json. PageList row uses an actual PageList summary, not the image demo.
- [Original-size before/after comparisons](comparison.html): same passer,2/3/4 demos and image-card section at1440/900/390/320. Individual PNGs in before/ and after/. Long dark/soft passer and long four-column titles retain complete legible text and action alignment.
- `body-floor-red.log` reproduces the actual pre-fix browser failure below1rem. `qa-h024a5.mjs` after:32 route/width inventories,432 explanatory instances including repeated demos, all>=16px with line-height>=1.5, AA contrast, no clipping/overflow. Independent comparison identifies128 changed sizes, all confined to shared/image explanatory bodies. Card root/body geometry/colors/links, root/global body, all other recorded text roles and already-readable descriptions are exact. Zero browser errors/POSTs.
- Fresh68-route/width defaults-before/defaults-after comparisons preserve public text/SEO/IDs/order/CTA/images/crop and all accepted Hero geometry. Latest OWNER JSON and calculator steps are included in this fresh baseline.
- `verify.log`: one bounded full verify,142/142 tests, CMS/static/surface checks and196 typography groups pass. Zero rendered small-text/contrast/clipping/button/overflow errors or POSTs. Astro zero errors/warnings, existing hint only.
- `preservation.json`:173 protected input hashes including all content/config/reference sources and accepted Hero/Footer/theme, plus five untracked OWNER PNG hashes. Independent reviewer recomputed all173: zero differences. No source/CMS content or protected commercial/authority/form math changes.
- `independent-review.md`: one separate read-only code/visual/UX review, no blocker. Native Worker confirmation and OWNER acceptance are separate from that review.

Reproduce from app/: QA_PHASE=before or after `node scripts/qa-h024a5.mjs`; optional QA_BASE_URL for the actual Worker. Do not overwrite before evidence. Default comparison uses existing qa-h025.mjs with this task's QA_OUTPUT_DIR and QA_BASELINE_PATH. `npm run verify` is the one full gate; typography screenshots use this task's QA_OUTPUT_DIR.

## Exact native Worker confirmation

Implementation f267eeb reaches exact native Build `33df8b1d-9241-4c51-8add-68316833387f SUCCESS`, Worker `5f319fbf-2439-46ee-a646-dc49b937f121 at100%`. Complete non-truncated logs and commit/deployment metadata: native-implementation.json. Native jobs run build/deploy, not the local full verify.

Actual [homepage passer](https://optimalisering-oslo-v33.anel.workers.dev/#passer) and [design-system](https://optimalisering-oslo-v33.anel.workers.dev/design-system/) are checked in live/:32 real route/width inventories and four-width screenshots show the same measured body improvement and unchanged compact roles/geometry. defaults-live/checks.json passes68 original content/SEO/IDs/order/media/crop/CTA/Hero comparisons, zero errors/POSTs. live-assets.json confirms all53 clean assets byte-identical, noindex meta/header, disabled intake, blocked robots, empty sitemap, correct404. The existing qa-h024a4-live.mjs asset checker gained only optional QA_OUTPUT_PATH so this task reuses it without overwriting historical evidence. No duplicate checker implementation.

preservation-final.json recomputes173 protected files and five untracked OWNER PNGs: all byte-exact. Receipt-only final push changes no runtime/build asset; its native success/current Worker asset readback is checked separately and identified through Git history, avoiding self-referential hashes.

## OWNER review boundary

OWNER compares actual `/#passer` and `/design-system/` Card text at desktop/mobile. This is a measured readability correction, not an unconditional H-024A3 editor PASS. Existing H-025/H-025A Hero acceptance stands. Native review Worker delivery does not authorize launch. H-026 remains queued for after OWNER Card readability review.
