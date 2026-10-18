# H-024A8B — stock Pages CMS section workflow

2026-10-18. Consumes OWNER D-098 / [contract](../../H024A8B-STOCK-PAGES-CMS-CONTINUATION.md), incoming `b60fb3bc61c7cdb96fa42b6a5913286c5ea0cc4a`. Implementation `718b63cdce313da62455526f777d02b8dd4ddba6`. **Technical implementation and authenticated tests completed; STOP for OWNER editor/visual acceptance. H-024A3 not PASS, H-024B BLOCKED, H-022 PARKED.** No custom CMS, new service, styling system, launch, indexing or intake change.

Open [comparison.html](comparison.html) for a four-width before/after, real CMS state and Worker screenshot viewer.

## Delivered behavior and stock-editor tradeoff

The eight original records are fixed object editors with immutable UUID/ID/type and no parent-row Delete/Clear controls. Their source values remain editable in place. Relative order is fixed in this pilot: `behov → regneeksempel → sjekk → priser → resultater → mekanisme → passer → sporsmal`, including OWNER's incoming third-position assessment. This deliberately replaces the previous mixed drag list for originals; it is not full ordering parity.

One **Ekstraseksjoner** content-only object list offers native Add/Delete/sorting, all approved section/surface/box/heading controls, auto-generated UUIDs and explicit **Før/Etter [original section]** placement. Same-placement inserts follow list order; placement remains meaningful even if its core anchor section is hidden. Source/schema reject special-type inserts, unknown placements, protected identity mutations and duplicate/reserved anchors/UUIDs, including hidden records. Pilot limit: 16 optional sections. Existing HomeSection/ContentCard render every ordinary insert; no alternate renderer or CSS was added.

One **Visning på nettsiden** control uses **Publisert** (missing/empty default, not materialized) or **Skjult – behold i CMS**. All six safely hideable original types and optional content retain their full source while omitted from public rendering. `sjekk` and `priser` show readonly publication controls and explanation: their real inbound conversion links require them to remain visible in this pilot. Schema also rejects hiding them. A build-time check rejects published cross-page/home links to other hidden section anchors; it never silently changes CTA destinations.

Hidden proof suppresses the homepage's derived Hero panel. Hidden mechanism/fit/FAQ omit public source-backed design-system specimens. Hiding homepage FAQ also stops its heading/eyebrow leaking through shared price/service FAQ headings; those usages use the existing Faq component defaults. Shared package/proof/form authority remains intact for other authorized routes. No CSS hiding, hydration payload, public source JSON or extra publication engine.

## Preservation and default parity

[source-mapping.json](source-mapping.json) records every original scalar/list position and record hash. All eight records and every other root value are deeply equal before/after source migration. Only `sections` changes from array to keyed objects. No visibility values or optional rows remain after restoration. **187 other tracked content/assets/reference files are unchanged**, and five existing untracked OWNER images remain untouched. `system/` and `project/` were read only.

All **54 generated build files** remain byte-identical to incoming baseline when default content is restored; **53 public assets** match native Worker byte-for-byte. Four widths (1440/900/390/320) across 18 routes produce **72 exact before/after/default native content/geometry records**. Screenshots: [before](before/), [migrated local](after/), [restored native](restored/). No visual redesign or new CSS.

Native CMS serializes JSON without a final newline. The initial migration added one LF; the first real save exposed this format difference. The one-time migration formatter was corrected, and an explicit canonical post-migration baseline was established at `fc732c9084ee428e0876a925632e1537ee77c2b7`, blob `42dbaa6d3e9c1ad7fce739e3198ce2c50ffa7e57`. A further authentic hide/restore cycle returns to **exact Git bytes and exact working bytes**, each compared to its own LF/CRLF baseline, at `e3cfa6da795337b9aeb5c3ff5ffc224808b284e3`. See [restoration.json](restoration.json). No claim of pre-migration raw JSON byte equality.

## Authenticated CMS → Git → native build → Worker

Every row below is an actual logged-in CMS save, followed by native build SUCCESS and actual visible Worker checks before the next saved state. Complete build/version/100% receipts: [native-receipts.json](native-receipts.json). Each state's public assets match its local build; four-width Worker screenshots and state checks are in the linked folders.

| Actual CMS action | Git commit | Native build | Visible evidence |
| --- | --- | --- | --- |
| Add A/B before calculator; A uses shared Card and existing approved copy; edit fixed FAQ heading | `50ad5b866fbbec6b474b1cb29fb52ad506f7f196` | `159579a8-f91d-4364-8f1b-994ba2869256` | [create](create/) |
| Native keyboard sortable moves A,B → B,A, same placement | `159fc7588e33aeb81943d57b2ae7b6454a7328ef` | `1a153171-f71a-4715-b724-1314874c151b` | [reorder](reorder/) |
| Placement B changes to after FAQ, same UUID | `7d03753aa3093c6220f9d830f2d2b2cbe59342fe` | `23494a87-c5a8-4e8d-80fc-a6f065a657f9` | [placement](placement/) |
| Hide six eligible originals + A; retain all editor payloads | `787f72fbf938cb37d8a7f60e3c992da1965a060b` | `5c23ad43-5520-4f5c-ac6e-f5694688aa61` | [hidden](hidden/) |
| Publish all again; restore original protected FAQ heading | `55920f76283252d725f820c75d45e6fb95c96b61` | `37de8850-b5bb-47ae-8463-d11d77a07e41` | [unhidden](unhidden/) |
| Delete ONLY A/B through native confirmations; establish canonical default | `fc732c9084ee428e0876a925632e1537ee77c2b7` | `3855cf22-b0d4-4d14-8bb1-d2adb5da1415` | [restored](restored/) |
| Hide mechanism from canonical baseline | `8d4e48dd205091fbddd4c85560fcaaa92aea7218` | `6cce8e95-14d9-42a2-8330-65950dc08920` | [canonical-hidden](canonical-hidden/) |
| Publish mechanism; exact canonical Git/working byte restore | `e3cfa6da795337b9aeb5c3ff5ffc224808b284e3` | `242e7252-f322-4cfc-af8c-6b8c0388c95d` | final restore/default native receipts |

Actual generated insert UUIDs: A `73e4c362-2ac0-4077-8d1f-f7e635cb0f5d`, B `a7030dd8-3386-4dfa-87f0-9813f0148d52`. Both stay stable through sorting, placement and visibility changes. Reloaded CMS persisted hidden choices and complete records; publishing again removed optional visibility properties. Final reload has no optional rows, original values and disabled Save.

An incomplete third optional row failed native CMS validation with three required-field errors and “Please fix the errors before saving.” Remote remained `7d03753`; reload returned safely to the saved editor. The fixed object DOM probe finds all eight originals and zero root remove/clear/sort controls; nested content lists remain editable. [authenticated-cms.json](authenticated-cms.json) distinguishes actual actions from helper tests.

## Validation and limits

- Full `npm run verify`: **149/149 tests**, static/copy/CMS20/surfaces checks and **196 typography groups**, zero findings/errors/public form POSTs. [verify.log](verify.log), [typography.json](typography.json). Final focused source/CMS tests **21/21**; the later one-time serialization correction changes no runtime.
- Independent read-only review found old audits incorrectly requiring always-visible sections. Visibility-aware expectations were fixed, including the proof/first-visible-anchor boundary, then re-reviewed. No remaining confirmed code blocker. [visibility-fixture.json](visibility-fixture.json) covers six hidden core types plus an optional sentinel, **35 public text assets**, and full static QA while hidden, followed by exact source restore. This fixture is explicitly separate from authenticated evidence.
- Actual hidden CMS state independently searches all 35 generated public text files for optional A heading/ID and protected FAQ sentinel, all absent. [hidden-native-leaks.json](hidden-native-leaks.json). Its 53 native assets match byte-for-byte; Hero proof/specimens disappear and return correctly; shared commercial routes remain intact.
- Public Worker browser checks at four widths cover actual order, hidden/visible state, unique IDs, one H1, overflow, native FAQ keyboard behavior, disabled submit controls and zero JS errors/public POSTs. Robots blocked, noindex, empty sitemap and custom404 retained.
- **Pointer automation limit:** DevTools drag reported drops over the same item and did not change order. Native sortable **keyboard** operation was verified end-to-end through Git/build/Worker. This report does not claim an automated mouse gesture pass; OWNER mouse/editor usability review remains required.
- Stock collapsed optional summaries display raw placement/visibility keys (e.g. `after:sporsmal`, `hidden`); the actual dropdowns have Norwegian labels and help. Fixed originals have no mixed native drag in this pilot. These are disclosed stock-editor UX tradeoffs, not a custom WYSIWYG.

## OWNER review / stop

Review [current CMS](https://app.pagescms.org/anelpasic/optimalisering.oslo.nov3.3/main/file/homepage) and [restored preview](https://optimalisering-oslo-v33.anel.workers.dev/): fixed original editors, optional Add/Delete/sort, Norwegian before/after choices, visibility and readonly linked sections. CMS captures: [1440](cms-list-1440.png), [900](cms-list-900.jpg), [390](cms-list-390.jpg), [320](cms-list-320.jpg), [persisted hidden row](cms-hidden-1440.jpg).

Technical delivery does not grant whole-editor acceptance. **STOP for OWNER editor usability and actual section visual review. H-024A3 OPEN, H-024B BLOCKED, H-022 PARKED.** No production launch, intake, indexing, domain, content-authority or other-page redesign change.
