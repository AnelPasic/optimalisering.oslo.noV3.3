# H-024A8F — Pages CMS editor polish, then propose a shorter homepage

Date: 2026-10-19
Authority: **D-104**, OWNER says **"ok, god plan da gjør vi det slikt"** in response to the explicit plan: first fix human-readable collapsed global section names and repetitive per-row CMS guidance, **then decide which exact sections should remain on a shorter homepage**.
Status: **NARROW UX IMPLEMENTATION AUTHORIZED / HOMEPAGE COMPOSITION PROPOSAL ONLY**. H024A8E CMS↔site ordering has **scoped OWNER PASS (D-103)**. Whole H024A8E/H024A3 approval still pending; H024B BLOCKED, H022 PARKED. This instruction does NOT authorize deleting/hiding live homepage sections or modifying other page content/brand/offers/visuals.

## Observed UX defects and current verified state

The OWNER's genuine authenticated CMS screenshot after fresh reload shows all three H024A8E groups, native drag handles and source-backed global references. OWNER confirms saved order matches preview. The remaining narrow defects:
1. Collapsed global rows show technical IDs: `regneeksempel`, `behov`, `sjekk`, `priser`, `resultater`, `mekanisme`, `passer`, `sporsmal` instead of understandable Norwegian labels.
2. A long sentence "Dra for å sortere innenfor gruppen. Globalt innhold redigeres under Globale elementer ..." repeats visibly below **each row** in each group, making the editor harder to scan.

Current `.pages.yml` has three block lists `topSections`, `sections`, `bottomSections`; each has `list.collapsible.summary: "{element}{name}"` and an identical group `description` repeated by stock Pages CMS for every row. Selector choices already have human-readable `label` but interpolation outputs stored technical `name` values. Current `home.json` reflects OWNER's own save `f562b7e`: `sections[0].element="regneeksempel"`, `sections[1].element="behov"`. The existing local top block `forbehovsvelger` (test text) is OWNER-created and **must not be removed or overwritten**, even if it looks like placeholder content.

The actual rendered site has been OWNER-checked against Pages CMS; **do not rebuild or change** global library, reference architecture, render order, section UI variants or production components for this polish.

## Phase A — narrowly improve native editor readability

Use **stock hosted Pages CMS configuration** and existing valid schema. No fork, custom editor, DOM monkey-patching, or introducing extra authoritative text copies.

**Collapsed row labels**
- Prefer `Konverteringskalkulator`, `Behovsvelger`, `Gratis sjekk`, `Pakker og priser`, `Kunderesultater`, `Slik jobber vi`, `Hvem det passer for`, `Ofte stilte spørsmål`.
- Keep existing stable source IDs, paths, `element` keys, master data and reference selection names intact.
- Determine what the current hosted Pages CMS **actually supports** in `list.collapsible.summary` for select-field display label or template output. Validate in a fresh authenticated editor. **Do not assume** a YAML select's displayed label automatically becomes the summary.
- If a simple non-authoritative presentation-label field is necessary, it must not be user-editable authoritative content or corrupt existing saved placements/UIDs. Demonstrate migration and CMS Save stability. Avoid duplicating names if display can be derived. If stock CMS cannot give human labels cleanly without inventing a parallel manually managed field, STOP that subissue with a grounded limitation and one small suggested workaround — do not force a risky schema change.

**Repeated guidance**
- Remove the verbose `description` from each block-list field if the native renderer repeats it per row. Prefer **one concise instruction per group** only if supported by stock CMS without repeated child descriptions. A short one-time separate editor hint or clear global-library help is fine.
- The crucial explanation must still be discoverable: removing an instance **does not delete** a `Globale elementer` master, and editing a master changes its authorized uses. Do not mislead the owner about page removal vs master removal.
- Verify CMS UI is actually less cluttered without losing necessary safety/help information. The global library editor should remain easy to find.

**Hard constraints**
- Don't change anything outside CMS configuration/limited non-commercial metadata necessary for labels and updated CMS documentation/evidence. Preserve existing `topSections`, `sections`, `bottomSections`, all master files, section order and current OWNER edits. Never reset to original order or historic H024A8E restore.
- No new component styling/redesign, copy rewrite, claimed proof/price change, new service page, route, form activation, indexing or live launch.
- Use authenticated CMS editor screenshots and a true save/readback (where changes need a save) plus successful native build and Worker check, then exact restoration of any *temporary* CMS edits preserving current incoming OWNER order and extra section. If config-only change, do not fabricate a CMS data roundtrip; verify actual fresh loaded hosted editor plus existing production content parity.
- Keep existing keyboard sort, working choice/hide controls, selectable Norwegian options, accessible labels and responsive site visually unchanged.

## Phase B — propose, DO NOT implement, a shorter homepage

After Phase A, deliver a commercially reasoned shortlist for OWNER approval of which actual homepage placements to **keep / move / hide / remove-from-page only**. The page needs a clear journey to contact/quote/order, not a compulsory eight-element stack. Use *current* exact source and visible preview, not old screenshots or guesses.

At latest checked content:
- Hero is fixed and has two CTA anchors: `/#sjekk`, `/#priser`.
- Existing `Valgfrie seksjoner Topp` includes OWNER-authored `forbehovsvelger` test content; **do not silently delete**, explicitly surface its presence in shortlist.
- `Hovedseksjoner` currently ordered **Regneeksempel → Behovsvelger → Gratis sjekk → Priser → Kunderesultater → Mekanisme → Passer → FAQ**; respect this OWNER-saved order as the working baseline.
- Keep linked `sjekk` and `priser` published with their real anchors unless OWNER separately approves truthful CTA retargeting (all internal routes too); never break current CTAs.
- **Global masters remain forever reusable within CMS even if a placement is removed**; hiding and removing from homepage are different actions.
- We have no OWNER decision yet naming the sections to omit. Therefore make a compact proposed default and an optional alternative, each with brief buyer-flow logic, tradeoffs and *exact effect on page length/CTAs*; no website/CMS content modifications until OWNER chooses. No invented case proof/results or pricing.

## Exit / deliverable

1. Verified current main SHA and incoming full content snapshot before working.
2. Small visible UI fix with before/after authenticated CMS screenshots; explicitly say whether summary labels are native-supported, approximated or blocked.
3. CMS source diff review; all current OWNER content/master payload, forms, page order, media and commercial authority preserved. Relevant tests, native Worker verify when any data/config change.
4. `coordination/evidence/h024a8f/README.md` and `CODEX-TO-CHATGPT.md` with actual status and a concise shorter-homepage proposal, including current OWNER test Top section and required link/SEO considerations.
5. STOP for OWNER review of polished CMS and **explicit selection of homepage composition**. Do not mark whole H024A8E/H024A3 OWNER PASS just for this scoped UX update. H024B remains BLOCKED; H022 PARKED; preview stays noindex/intake disabled.
