# H-024A8E — Global Elements library + selective three-zone homepage Page Builder (REVISED)

Date: 2026-10-18
Authority: **D-102**, direct OWNER approval to change H-024A8E *before Codex starts*: **"ja god plan, endre H-024A8E til denne modellen. Også trenger vi ikke alle de blokkene som er på forsiden."**
Status: **REVISED scoped implementation AUTHORIZED, NOT IMPLEMENTED**. This **supersedes the previous H-024A8E requirement of eight required, co-located, movable source blocks**. Historical D-101 acceptance of risky Clear/Replace remains recorded but is NOT a requirement to intentionally expose master content to row replacement. H-024A3 overall CMS editor remains OPEN for OWNER review, H-024B BLOCKED, H-022 PARKED. No live domain/indexability/real intake authorization.

## Product decision: content masters are not page placements

Implement a small **"Globale elementer" library** in ordinary, hosted Pages CMS, analogous in practical outcome to Concrete CMS Stacks **within this website**, with no custom editor, fork or new service:

- A reusable module **master** holds the authoritative content/configuration and is editable from a clearly named **Globale elementer** area in Pages CMS.
- A **page placement** holds an identifier/reference to a module, optional approved per-placement visual variant and `visibility`; moving/hiding/removing the placement never deletes or duplicates the master or its business authority.
- Editing the master changes every authorized page instance that refers to it after the Git-backed build; the editor must say this clearly. Sites do NOT share individual customer master content across different Medon projects. The reusable *code/type patterns* can later become a Medon Starter.
- Standard content-only sections remain editable inline in Page Builder where genuinely page-specific; do not promote every paragraph to an over-engineered global registry.
- Page placements, including former "locked/core" components, are **optional on a page**. **Do not require exactly eight original sections on the homepage.** Preserve their archived/master data, stable IDs/UUIDs, asset/proof/pricing/form authority even when a placement is absent.
- A `remove` action on a page removes only the instance/reference. `Skjult` stores the placement but omits its content entirely from public output. Both are distinct from deleting a library master.

## Desired homepage editing UI (stock Pages CMS)

1. **Hero** — one structured, always-first object; preserve four OWNER-approved layout presets, typography, CTA, visuals.
2. **Valgfrie seksjoner Topp** — native movable list; **Legg til** either a normal local content block or a **Globale elementer** reference (select/collection-backed reference); `Publisert / Skjult`; native sortable **within this group**; remove local section/placement safely.
3. **Hovedseksjoner** (formerly "Låste seksjoner") — native movable list of selected component **placements/references**, not an eight-record authoritative payload list; may contain zero or more chosen modules, not forced eight. Its entries are sortable within this group, may be Skjult, and may be removed from this page without master data loss. Use a truthful Norwegian label indicating that removal does *not* delete the global module. A regular page-specific content block can remain here only if there is a concrete UX reason; avoid duplicate master content.
4. **Valgfrie seksjoner Bunn** — same capabilities as Top, native reorder only within this group.

Total display order: **Hero → visible(Top) → visible(Hovedseksjoner) → visible(Bunn)**. Group order does not move, and there are no `before:behov`/`after:*` placement dropdowns. No numeric sorting, no secondary sort registry, no fixed `min:8,max:8` authoritative mixed block list. Co-located editing applies to local content; **for global masters, editor links/navigates to the library instead of creating an independent duplicate on every page**. Explain this separation in CMS help.

**Keep the UX simple:** the three groups can share one typed CMS block model; the library reference should have a human-readable label ("Konverteringskalkulator", not `calculator`) and native selection UI; avoid free-text IDs, custom CSS and excess controls. Use standard field `reference` when a collection-backed library makes sense, or a typed `select` for a fixed set of individually modeled library files. Do not pretend that `reference` targets arbitrary single files: per official Pages CMS docs, `reference` targets a collection. Choose the **smallest viable native solution** after preflight; no two parallel global libraries.

### Starter catalogue — preserve existing eight without eight homepage requirements

Current eight authoritative original records:
`behov` (need selector), `regneeksempel` (calculator), `sjekk` (assessment/contact), `priser` (packages), `resultater` (proof), `mekanisme` (ordinary content), `passer` (ordinary content), `sporsmal` (FAQ).

Make the reusable structured types immediately available as masters/typed global modules:
- **Konverteringskalkulator** — current `regneeksempel`, existing `HomeLeverage` implementation.
- **Gratis sjekk / kontaktskjema** — current `sjekk`, `HomeAssessment` with OWNER-approved `split` and `horizontal` layouts; no live POST in preview.
- **Kunderesultater / Proof** — current `resultater` and existing verifiable case IDs/provenance; proof permission gating still binding.
- **Pakker og priser** — current `priser`; retain one shared package/price authority for existing routes, do not create a second editable price source.
- **FAQ** — current `sporsmal`; respect currently shared other-route projections and hidden-homepage behavior.
- **Behovsvelger** — current `behov`, when treated as a reusable structured component rather than page-local generic cards.

`mekanisme` and `passer` are normal content sections: retain their **exact original content, UUIDs, visual configuration, anchors and editorial identity**, initially as normal page-specific sections or safe archive entries. They must remain recoverable/available for reuse and can be removed or hidden from the homepage without lost content; do not silently delete them. If promoting them to the global library gives a simpler **single authoritative source** and a good editor UX, it is permitted, but do not force all normal content into global masters.

**Crucial:** "all eight preserved" refers to data and approved components, **not eight required live instances**. Page compiler must not require all module kinds to occur on the homepage. Do not publish an arbitrary reduced layout: the OWNER has **not specified which exact live instances to remove**. Preserve the currently visible/default homepage output as the initial migrated configuration. Implement removal/hide/re-add capability, then STOP for OWNER's separate choice of the smaller actual homepage composition. Do not fabricate that commercial choice or auto-hide price/contact just because they're optional in the schema.

## Proven native Pages CMS capabilities and implementer preflight

Official stock docs:
- `reference` field to a configured **collection**, with label/value/search: https://pagescms.org/docs/configuration/fields/reference/
- `content` entries can be a `group` with nested `file` and `collection` children: https://pagescms.org/docs/configuration/content/
- Per-file/collection `operations.delete: false`, `rename: false` and optional `create: false` control **CMS UI operations**: https://pagescms.org/docs/configuration/content/operations/
- Native `type: block`/`type: object` and `list.collapsible` for ordered editor blocks: https://pagescms.org/docs/configuration/content/list/

**Preflight implementation choice (internal, not an OWNER micro-gate):** inspect existing `.pages.yml`, content collection setup and source validation; choose **one** of:
A. A small `Globale elementer` group of named, individual **typed JSON files**, each `operations.delete:false`, with a closed `select` of their stable IDs as placement reference. Best when heterogeneous modules need distinct editor fields and a fixed catalog.
B. A `globalElements` collection of validated structured records with **native reference-picker**, human labels and `operations.delete:false, rename:false`; ensure the actual collection schema edits heterogeneous masters comfortably before choosing this.

Neither stock UI control protects against raw Git changes or someone removing a file by commit; website build must reject dangling references. The no-delete promise is **no deletion through ordinary page-placement controls or library CMS UI**, not an absolute external guarantee. If neither A nor B provides understandable editor behavior in native hosted Pages CMS, STOP and report actual native blocker, no custom CMS or unapproved data model.

## Current OWNER data, preservation, and shared authority

Immediately before any changes, **pull current main and inspect raw sources**; never restore old canonical test baselines. At latest inspection `app/src/content/pages/home.json` blob `29a3502c70efa27c076006dc8f2b83254ee64586` includes actual OWNER-made extra `id=forbehovsvelger`, `uid=8ac621d2-d9aa-40ae-9875-ea9c7a2c2462`, `name="Test før behovsregler"`, `placement=before:behov`: migrate this losslessly into **Valgfrie seksjoner Topp**, preserve visibility/content/visual controls, with old placement field removed. For any newer optional whose Before/After mapped position is neither truly top nor truly bottom, STOP for explicit placement choice; never silently shove it across sections.

Before migration, inventory all consumers of `home.json`, `resolveHomepageContent`, shared package/price/proof/assessment/FAQ/CTA, all page templates and design-system specimens. The existing six specialized section components may contain hard-coded ID/form input IDs and calculator selectors (`regneeksempel`, `calc-*`, `skjema` etc.). Rendering a master as an instance must preserve existing anchors and accessible labels; **initially allow at most one instance of each complex/interactable global module per route**, unless explicitly proven multi-instance safe through ID/JS/ARIA/test isolation. Different page routes may each use the same library master.

Maintain **one authoritative source** of commercial fields (especially package prices/proof permissions/form copy). If migrating module content into library would break other-route consumers, migrate the consumer/read-only projections coherently; no data duplication or publish an out-of-date package/proof source. Preserve current renderer, accepted daisyUI Card/Hero/Footer/FAQ/design-system primitives, text roles, images, 320/390/900/1440 layout, SEO, CTA. Site-wide library masters must not leak hidden content from homepage into public demo or search artifacts. Intentional permitted other-route use of same master is distinct from leaking a hidden *homepage placement*. Audited case/proof source remains unchanged.

**Absence/hidden is not a broken anchor.** Site currently has real `/#sjekk` and `/#priser` inbound links. Until safe owner-approved destinations are supplied, retain these homepage instances *visible in the default migrated page*. To enable their future removal, provide clear link validation and an editor-visible explanation of dependent inbound links; do not silently redirect buyer CTAs or permit a successful build with dead links. The master may remain even when a placement cannot be removed without first updating inbound CTAs. Do not require every one of eight sections to remain, only preserve actual published link integrity.

**Library global scope:** shared across routes in this *one client site*, not synchronizing content across projects. MedonWebSystem starter later inherits module types/code, not this pilot's prices, identity, cases, copy, brand or images.

## Execution approach / safety gates

**Phase 1 — minimal working library path**: implement one true global master + one reference placement (prefer the calculator), using a stock Pages CMS editor and the **existing renderer**. Verify a native logged-in CMS edit to the master → Git commit → native Cloudflare build → Worker preview → restore and an instance Hide/Unhide/Remove/Re-add preserving the master. Verify placement editor usability before broad migration; do not spend a long migration on an invalid CMS reference mechanism. This is a technical self-check, not a demand for per-microstep OWNER approval. If the native editor UX is fundamentally unsuitable, STOP for OWNER decision before other migrations.

**Phase 2 — existing modules and three zones**: migrate the remaining high-value structured modules and optional content into safe master/placement structure; preserve exact current publication and all OWNER data, unique IDs/UUIDs, and intended projection dependencies. No unrequested feature/design rewrite. Keep only simple normal content blocks inline where sensible. Verify that pages can omit all non-Hero sections **without deleting masters**, while link validation must block absent linked anchors. Restore all default placements before final preview comparison.

**Phase 3 — real CMS/native Worker proof and stop**:
- Native logged-in add/select/ref/drag/hide/remove/re-add for global instance in at least Top and Bottom and Hovedseksjoner, with master unchanged after placement deletion.
- Native logged-in master edit visible in at least the homepage and a separate authorized route or controlled preview fixture, then restore; one master only, no duplicated source.
- Native normal content add/edit/drag/hide/remove in Top/Bottom, and all group ordering; no cross-group drag requirement.
- Negative tests for dangling master reference, duplicate same-route interactive modules, missing linked anchor, invalid source, unintended deleted master and hidden-content leak; run dangerous invalid saves only on **isolated fixtures**, not on production main.
- Home route after restore equals incoming current published appearance/content including OWNER existing extra; preserve approved design/system components and all other routes in real browsers 1440/900/390/320; confirm no duplicate DOM IDs or H1, keyboard access, form disabled/no public POSTs, noindex, robots/sitemap and Worker asset parity.
- Capture exact edit→Git→native Build→actual Worker→restore receipts/screenshots and describe visually how to "edit global master" versus "remove from page only"; add concise selective Git recovery instructions for accidental raw source errors.
- Deliver `coordination/evidence/h024a8e/README.md`, update `CODEX-TO-CHATGPT.md` and STOP for OWNER **editor/library usability and homepage composition** decisions.
- No change to H-024B service-page rollout, H-022 proof design, brand/copy/pricing/offers, production forms/index/domain/launch. Preview deployment only, no new third-party service.

**Completion criteria:** The actual hosted Pages CMS has a discoverable **Globale elementer** library with protected-by-UI masters, and the homepage provides Hero + draggable Top/Hovedseksjoner/Bottom placements of reusable and local content, hide/re-add/remove-page-reference safely. All previous data/approved appearance remain intact. **No forced eight-section homepage.** Then OWNER decides which modules belong on the smaller homepage; agent does not choose that commercially significant content decision without approval. Technical PASS does not equal OWNER acceptance.
