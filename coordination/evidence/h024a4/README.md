# H-024A4 — actual CMS Card / approved demo parity

2026-10-17. Incoming main `0326d8cf71d5dfd66ba9a95ad9dc31ebe5fbaab9`; implementation `192a4eb2aceba2845882a856ff8e18899d9fd79a`. Technical correction under actual OWNER H-024A4/D-089/D-090, not an OWNER acceptance verdict. H-025/H-025A Hero PASS remains intact. H-024B blocked; H-022 parked. H-026 follows OWNER's H-024A4 review, per its contract.

## Diagnosis and minimal durable correction

The actual `passer` source is two columns, lavender parent, dark/soft children, both explicitly Kort. Its long second item is retained in full. OWNER's separate four numbered steps are `mekanisme`, still Standard; those are a different editor state and are preserved exactly.

The previous `info-item.card` had no card-body/card-title and inherited unrelated legacy geometry. One `ContentCard.astro` now supplies actual `card > card-body > card-title`, optional card-actions, and existing approved theme utilities to explicit ordinary Kort selections in both HomeSection and ContentSection and the actual design-system 2/3/4 demos. No link means no action. Stored links are normal accessible daisyUI button links. Existing numbering, terms and surface authority remain. Card padding24px, gap20px, radius20px and approved body typography are measured against the existing demos rather than invented.

No new CSS declarations: only the existing H-019 same-surface separating-border selector includes the shared Card. Default/plain and intentionally special compositions retain the old renderer. A Tailwind mobile utility gives explicitly selected numbered mechanism cards the required4→2→1 grid without changing the automatic mechanism baseline. Hero/Footer, schema/list caps, content, theme and lower design-system appearance are preserved.

Official component structure reference: [daisyUI Card](https://daisyui.com/components/card/), consulted 2026-10-17. This project uses existing daisyUI5.7.50; no dependency or competing CSS/component system was introduced.

## Local verification

- `card-parity-red.log`: real browser fails before correction because selected Kort has no card-body. `same-surface-red.log`: actual fixture catches the dark-on-dark border regression before the existing border guard is extended.
- `before/`, `live-before/`, `after/`: same actual passer plus genuine design-system2/3/4 benchmarks at1440/900/390/320. `after/card-checks.json` asserts radius/padding/gap/title/body/color/border/action parity. Default mechanism HTML and geometry remain exact. All six approved demo screenshots and both default mechanism screenshots are byte-identical, independently checked.
- `fixtures/checks.json`:40 source→build→browser cases,5 cases ×2 actual ordinary renderers ×4 widths. Actual two-card dark/soft, three-card base/dark/mint with stored link, four numbered selections, plain and automatic. Checks contrast≥4.5, geometry, parent/child precedence and same-surface border, numbers/text, links, oneH1, clipping/overflow, keyboard desktop and mobile tap. Zero browser errors/POSTs. Fixture source bytes restored in finally and normal dist rebuilt.
- `defaults-before/checks.json`, `defaults-after/checks.json`:68 route/width groups, exact public text/SEO/IDs/order/CTA/images/crop and accepted Hero geometry. Fresh incoming data baseline avoids comparing new OWNER content to historical H-025 values.
- `verify.log`: full142/142 tests, CMS/static/surface checks and196 typography groups pass, zero contrast/clipping/overflow/button errors. Astro zero errors/warnings, existing hint only.
- `independent-review.md`: separate read-only code/visual/UX review finds no blocker;173 protected hashes exact. Review did not perform builds or mutate source.

## Authenticated same-section CMS round trip

The real logged-in Pages CMS **Forside → Hvem passer det for → Passer dårlig hvis → Boksvariant** exposes Standard (automatisk), Åpen boks, Kort (`cms-options.png`). Section remains two columns/lavender; item surfaces remain Plomme/Lys. No schema or field controls changed.

- Implementation `192a4eb` → exact native Build `41c97e90-755a-4415-9528-0d2fd16efaf5 SUCCESS` → Worker `70e972d8-fee3-4680-8fe8-1ebc5dff9d16 at100%`. `live-implementation/` verifies actual same passer and approved demos at all four widths.
- Actual CMS Save `c64c538846c5b275a0a03e4dc31eccaeeb2ab041`: only second passer item's boxVariant changes card→plain. Exact Build `0dfcc2a3-96a6-4f25-9ac3-a3a3d816734f SUCCESS` → Worker `c2735d7f-19f5-4632-a917-e36a36288c7d at100%`. `cms-changed/`: actual Worker at four widths shows first Card retained, second genuinely open (0px radius/no card-body), same text/colors/order/default mechanism, no invented link, no overflow or POST.
- Reloaded the CMS entry before restoring the same field through the actual UI, Save `b1414c8abca1a4e99d7011a661adff2c41d6bc81`. Source returns byte-exact, not just semantically equivalent. `preservation-final.json` independently recomputes all173 protected files and five untracked OWNER PNG hashes with zero differences. The protected set includes every content/config/reference input plus accepted Hero/Footer/theme files. OWNER images stay excluded from Git.
- Exact restore Build `26638c9f-a8f6-4eb4-ab80-3518e258bf59 SUCCESS` → Worker `c56ef53b-7589-4b6f-a2ef-ff45e8e41743 at100%`. `cms-restored/` proves both actual passer items are once again the approved20px/24px/20px Card at all four widths. `live-restored/` rechecks same-section demo parity and unchanged default mechanism. `defaults-live-restored/checks.json` passes all68 original route/width content/SEO/Hero/order comparisons on the real Worker, zero errors/POSTs. `live-assets.json` verifies all53 clean build assets byte-for-byte, noindex headers/meta, disabled intake, blocked robots, empty sitemap and correct404 behavior. Final receipt-only push is verified separately by exact native commit and another53-asset comparison; identify that receipt's own revision in Git history.

Native receipts include complete non-truncated logs. Native jobs run build/deploy, not local full verify. Screenshots, source delta assertions and exact native metadata demonstrate actual saving/propagation; schema tests alone are not presented as CMS proof.

Reproduction from `app/`: `npm run verify`; `node scripts/qa-h024a4-fixtures.mjs`; `node scripts/qa-h024a4-cards.mjs` (QA_PHASE before/after/live-restored and optional QA_BASE_URL); `node scripts/qa-h024a4-cms.mjs` with QA_PHASE changed/restored only against the corresponding actual CMS Git state; `node scripts/qa-h024a4-live.mjs` for read-only native byte parity. Default preservation uses `qa-h025.mjs` with QA_BASELINE_PATH pointing to this task's defaults-before/checks.json and QA_OUTPUT_DIR to this task's defaults-after or defaults-live-restored. Do not overwrite historical baselines. Fixture runner restores original source and normal build even on failure; authenticated CMS saves use the actual native UI, not scripted source fixtures.

## Review boundary

OWNER should compare the same homepage **Hvem passer det for** at desktop/mobile to **2 kort** on `/design-system/`. Automatic **Slik virker optimalisering** is deliberately a separate editorial presentation. Long copy has not been rewritten or trimmed. The corrected actual page cards require OWNER visual review; the whole H-024A3 editor is not automatically PASS. No launch, indexing or intake authority follows technical delivery.
