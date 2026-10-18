# H-024A8E — Native Pages CMS three-zone homepage Page Builder

Date: 2026-10-18
Authority: D-101 — direct OWNER acceptance of the explicit tradeoff, following D-100: **"ja men vi kan leve med at vi ikke er beskyttet mot å tømme en rad og duplisering"**. This authorizes proceeding with native draggable core blocks despite client-side Clear/Replace/duplicate weaknesses documented in H-024A8C, instead of numeric order or a separate reference registry.
Status: **SCOPED IMPLEMENTATION AUTHORIZED, NOT DELIVERED.** Preserve all prior scoped visual PASS and protected commercial authority. H-024A3 whole editor still pending OWNER review; H-024B BLOCKED, H-022 PARKED; no production domain, indexing or form intake authorization.

## Accepted editor UX: three ordered zones, no custom Pages CMS

1. **Hero** remains a separate locked first-class field and always renders first. Preserve the four approved Hero presets and source.
2. **Valgfrie seksjoner Topp** — one independent native Pages CMS list of *ordinary content* sections; Add/Delete; inline edit and native drag to reorder within this group; independent Publisert/Skjult toggle. This list renders directly after Hero and **before every original core section**.
3. **Faste/Låste seksjoner** — exactly the eight existing original section records (current order as source), in **one native drag-sortable, co-located mixed block list with min=max=8**. Same row contains content, approved presentation variants and visibility. Items may move **within this core group**, but never into top/bottom groups. OWNER consciously accepts that native Pages CMS can allow clearing/replacing/duplicating an original block even when invalid for the website. The group is *conceptually protected* by strict website schema/build validation and recoverable Git history, **NOT** editor-level non-deletability. In UI, prefer an honest label such as **"Faste seksjoner – 8 nødvendige (ikke tøm/erstatt)"** rather than implying editor prevention.
4. **Valgfrie seksjoner Bunn** — second independent native Pages CMS ordinary-content list, same Add/Delete/Edit/Hide/native reorder features, rendered after all core blocks.

Render order: **Hero → visible(top[]) → visible(core[8]) → visible(bottom[])**. Hidden rows remain stored and ordered in CMS, and disappear entirely from public SSR/HTML/client state/metadata/public design-system projection; do not use CSS-only display:none. The groups have fixed relative positions; no per-extras `before:*` or `after:*` dropdown in new CMS. No cross-zone drag is required: normal native drag works **within each list only**. Avoid a separate numeric field, order-only registry, parallel renderer or custom CMS fork.

**The originals are exactly eight, not six**: `behov`, `regneeksempel`, `sjekk`, `priser`, `resultater`, `mekanisme`, `passer`, `sporsmal`. The diagram's six named examples were illustrative; preserve `mekanisme` and `passer` as normal original content inside core unless OWNER explicitly requests otherwise. Preserve original IDs, UUIDs, all data and relative initial order. `sjekk` and `priser` remain required-visible in this pilot because published links target these anchors; do not silently break CTAs or relax cross-route link checks. Six other originals retain supported hide toggles. Hero first and only one H1.

## Current actual OWNER content / migration contract

**MANDATORY: pull current main immediately before any change; inspect and preserve it, not any historical receipt or local unpushed H-024A8C branch.** Latest checked `app/src/content/pages/home.json` at Git blob `29a3502c70efa27c076006dc8f2b83254ee64586` already contains a real OWNER/CMS optional item:
- `id: forbehovsvelger`
- `uid: 8ac621d2-d9aa-40ae-9875-ea9c7a2c2462`
- `name: Test før behovsregler`
- `placement: before:behov`

This must be retained with every content/layout/visibility value, and mapped **to `optionalTopSections`** with the now-redundant `placement` field removed. As this item appeared after the H-024A8B canonical restored baseline, **never reset home.json to `fc732c9`, `e3cfa6d` or `a58dd20`**. The latest OWNER edit may have progressed further after this handoff: re-read current main, save a snapshot and reconcile *all* new optional sections individually. For any optional placement that lies **within** the core list rather than clearly before first/after last, STOP and request a mapping choice, rather than silently move editorial content to Top or Bottom.

Convert the eight current fixed keyed `sections` objects back into a single native ordered mixed block `sections[]` with original source identities unchanged. Replace old `optionalSections` and per-record `placement` only with `optionalTopSections[]`/`optionalBottomSections[]` and a deterministic migration ledger. Keep one source of truth per record, no duplicate published copies. Source JSON shape will change legitimately; prove semantic lossless content/ID/UUID/SEO/CTA/commercial values and default view parity except currently visible OWNER optional content that must remain visibly present in its new top zone.

CMS nested layout and presentation controls retain D-088/D-092/D-095/D-096 approvals: genuine shared daisyUI Hero/Card/Footer/Form/FAQ and current editable variants. Keep stock Pages CMS `.pages.yml` human-readable Norwegian labels. Eight core rows must have native co-located editing+sorting; optional Top/Bottom each content-only list with default safe values, unique stable generated UUID and anchor, collision constraints (including hidden blocks), no cloneable singleton types. Total optional cap should not exceed the previously approved 16 without OWNER request; validate across both arrays, not just individually. Section labels should be understandable when collapsed; native raw enum keys may remain if not fixable in stock CMS without hacks.

## Explicit accepted risk and defense-in-depth

OWNER **accepts loss of client-side original-block deletion/duplicate prevention**, not loss of stored data integrity, semantic authority or ability to recover. The H-024A8C offline discovery shows:
- Removing an entire original row reduces count and fails native Save validation.
- Clear/Replace of a row (including complete duplicate block) **may pass native Pages CMS Save validation**, create a Git commit, and then fail website Zod/build.
- Browser Save does NOT mean Cloudflare Worker successfully deployed. A failed build is not successful publication; do not make unverified claims about Worker fallback/deployment behavior.

Preserve and strengthen **actual** schema rules for exactly eight original unique protected block IDs/types/UUIDs, no missing/null, no duplicates/invalid optionals, no forbidden hidden #sjekk/#priser, valid anchors and references, no hidden-content public leakage, intact pricing/proof/form authority. Keep clear inline editor help: **"Ikke fjern eller bytt type på disse åtte. Feil kan kreve gjenoppretting fra Git."** Do NOT claim a CMS-level lock where none exists. Design a short, precise *selective Git correction procedure* for a bad CMS edit: inspect saved diff against last valid commit and restore only the bad record while preserving newer OWNER changes; verify successful next native build/Worker before saying restored. **Do not intentionally push an invalid CMS commit to production main to exercise this failure mode.** Use a local/offline validation fixture for those negative tests.

## Implementation and acceptance

- Record incoming Git commit/head, source data+UUIDs, OWNER optional items, original preview/route/asset snapshots and noindex/intake boundaries.
- Implement one three-zone source schema/resolver and adapt actual consumers. Existing `home-builder.ts` has an array branch that currently ignores separate optional records — rewrite to compose `optionalTopSections[]`, core array, `optionalBottomSections[]` exactly once while retaining a separate untouched commercial data projection. Never let hidden-only filtering alter page pricing/proof authority used on service pages.
- Keep source-backed /design-system examples honest: no hidden section copy/anchors/raw JSON should appear publicly. Hidden proof suppresses homepage Hero derived proof; shared FAQ heading must not leak elsewhere via hidden source-backed specimen; existing link-validator checks must work after reordering/hiding, including an optional link pointing to a hidden anchor.
- Prove authenticated Pages CMS→Git→native Cloudflare Build→Worker→reload→restore for **core move**, **top optional Add/reorder/hide**, **bottom optional Add/reorder/hide**, visibility restore, native optional Delete and exact source restore to new migrated baseline. Verify real mouse drag with human OWNER review if automation cannot establish pointer gesture; keyboard drag still required. Never overwrite the existing `forbehovsvelger` item in testing.
- Capture CMS screenshots desktop/mobile (collapsed headers and controls), actual homepage responsive 1440/900/390/320, full visual parity for unchanged original sections/approved variants, no duplicate DOM IDs/H1, no console/POST errors, accurate hidden output, native Worker asset readback, bounded full tests and independent review. Measure default parity against *incoming latest main*, including currently published extras; do not compare to a historically outdated page.
- Only publish approved testing output to current **noindex preview**, restore transient test changes while preserving pre-existing OWNER extras, record exact provenance and checkpoints in `coordination/evidence/h024a8e/README.md`, report in `CODEX-TO-CHATGPT.md` and STOP for OWNER editor/visual review.
- If native mixed core list cannot coexist with separate optional lists or safe schema/visibility with stock Pages CMS, stop with exact blocker rather than invent an unapproved CMS fork/numeric workaround.
- No H-024B service-page rollout, H-022 proof redesign, service/pricing/SEO copy edits, branding changes, live lead capture, indexing, real domain go-live, release tag or deployment beyond preview.

**Done means** OWNER can reposition any of eight existing sections directly in its CMS row and add/move/hide optional content in either top or bottom list; current original and OWNER-authored optional content is preserved. **Technical pass is not OWNER acceptance**. Stop at OWNER review.
