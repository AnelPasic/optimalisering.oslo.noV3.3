# H-021 PageList pilot evidence

Contract: `../../H021-CMS-PAGELIST-PILOT.md`; incoming main `e41154f`.
Implementation/receipt revisions are identified in Git history and the outbound packet.

## Source of truth and CMS

`source-map.json` records each old `innsikt.sections[0].items` card and its
new article `listing` object. Overview `guider` now stores only presentation and
selection, with no copied titles/descriptions/URLs. Article body, H1, SEO and
authority are unchanged. Slugs generate URLs; no publication dates are introduced.

`.pages.yml` uses one navigation-only Innsikt group, with **Oversiktsside**
(same innsikt.json file) and **Artikler** (same directory, explicit index/service/
utility exclusions). No source file moves or duplicate editable collection.
References target only `insightArticles`, store `{fields.slug}`, and show primary
listing title plus slug. Article list view shows listing title, slug and SEO title.

Overview → Innholdsseksjoner → Innholdsliste exposes Utvalg, Sortering,
Maks antall, Visning, Velg artikler and Ekskluder artikler. Manual references use
reorderable object rows, one reference per row, so array order is explicit and
tested through save/restore. All visible manual rows determine the count; limit
only applies to automatic mode. Short descriptions explain mode-specific fields.
Article listing controls title/summary/label/order/visibility with documented
fallbacks. Visibility affects lists only; routes and authority stay unchanged.

Current official config/reference documentation checked 2026-10-14:
[groups](https://pagescms.org/docs/configuration/content/),
[reference fields](https://pagescms.org/docs/configuration/fields/reference/).

Authenticated CMS screenshot/save/build/revert was **not exercised**. The actual
browser tool reports that its Chrome profile is already running; no other browser
was stopped or profile copied. `cms-session.json` records this. Prior H-019
authenticated pipeline proof remains separate; this task supplies new config,
schema, in-memory CMS save/reorder/restore and actual source-to-render evidence.
No screenshots of a simulated editor are presented as CMS evidence.

## Verification

- `focused-red.log`: four expected migration/CMS failures before integration.
- `focused-green.log`: PageList and H-017B/H-019/H-020 CMS guards, 29/29 PASS.
- `verify.log`: full verify, 109/109 tests; zero Astro errors/warnings; the existing
  intake-script hint remains. Static/commercial/proof/CMS/surface guards pass.
- `typography/checks.json`: 196 states, zero small-text/contrast/clipping/button/
  overflow failures; screenshots from this general audit are omitted to avoid
  duplicating unrelated historical evidence.
- `before/`, `after/`: 64 route/width checks each, all 16 routes at
  1440/900/390/320, JavaScript disabled. Exact text/computed typography/colors/
  geometry fingerprints match, including default Innsikt. Four default captures
  per phase; semantic links and keyboard focus verified. Zero errors/POST/overflow.
- `variants/`: 24 source-backed groups, all four widths: synthetic third article,
  manual reverse order with limit=1 still showing both selected rows, compact,
  links, hidden third article, and dark surface/left heading. No-JS, keyboard,
  exact links/count and overflow pass. Local synthetic content only; finally
  restores original source bytes, removes fixture and rebuilds default dist.
- `preservation.json`: protected Git source blobs and exact semantic migration.
- `review.md`: independent technical review; no actionable findings; focused8/8.

Reproduce from `app/`: `node --test tests/page-list.test.ts`, `npm run qa:cms`,
`node scripts/qa-h021.mjs`, `node scripts/qa-h021-variants.mjs`,
`node scripts/audit-h021-preservation.mjs`, `npm run verify`.
Set `QA_PHASE=before` only against the baseline build. Use `QA_OUTPUT_DIR` to keep
typography output in this packet. Reversible source fixtures must run alone.

Native Worker and live comparisons are recorded separately after push. No direct
deployment, secrets, domains, real submission, indexing or launch is authorized.
STOP after delivery for OWNER CMS/visual review; technical success adds no verdict.
