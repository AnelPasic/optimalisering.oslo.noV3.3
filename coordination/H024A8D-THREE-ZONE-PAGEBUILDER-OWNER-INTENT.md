# H-024A8D — OWNER desired three-zone Page Builder; design intent, not implementation authority

Date: 2026-10-18
Status: **OWNER UX SPEC / ONE UNSOLVED NATIVE CMS TRADEOFF**. No site/CMS code changes authorized in this record. H-024A8B remains delivered but OWNER REVISE; H-024A8C is reported as local discovery `1680608` by OWNER and was provided as attachment, NOT yet pushed to main. H-024A3 OPEN, H-024B BLOCKED, H-022 PARKED. Keep preview noindex/intake disabled.

## OWNER's proposed exact editorial model

After reviewing H-024A8C's numeric-order fallback, OWNER instead specifies:

1. **Hero** — separate, position locked first; preserve already approved variants.
2. **Valgfrie seksjoner Topp** — an independent native Pages CMS list that can Add optional content sections; each optional section has Publisert/Skjult and native drag-sort **within this top list**.
3. **Låste seksjoner** — existing business sections should have Publisert/Skjult where safe and ideally native drag-sort **within this core group**; protect authoritative source/identities from accidental deletion.
4. **Valgfrie seksjoner Bunn** — same Add/Hide/Drag as top, native drag only within this bottom list.

No per-optional-section placement selectors (`before:*`/`after:*`) are needed in this simplified three-zone model. Order is `Hero → optionalTop[] → core[] → optionalBottom[]`. The group order itself is fixed. A hidden section is entirely absent from rendered public output (including design-system/public specimens and derivatives), while source content, stable IDs, media, layout and visibility persist in CMS. Keep original SEO/proof/price/form/CTA/link guards and approved visual primitives. No new CMS fork/host/third-party editor.

**Critical unresolved point: stock Pages CMS cannot simultaneously provide inline co-located sortable authoritative core blocks AND native row-level protection from Clear/Replace**. Historical H-024A8C authenticated offline tests show: min=max may prevent deleting an entire row from Save, but a cleared original block or fully populated duplicate passes native client validation and may be saved to Git, after which the website schema/build rejects it. This is NOT fixed by splitting the page into top/core/bottom lists. Do not claim core drag + immutable original records is natively safe. Two stock-CMS compromises require explicit OWNER selection:
- **Direct core mixed-list dragging**, retaining co-located section editors, with native Clear/Replace risk; website schema guard and documented narrow Git recovery mitigate but do not prevent invalid saved data/failed Cloudflare build. Must be separately accepted as a reliability tradeoff.
- **Protected core objects + separate sortable reference/order list**, with actual core content and visibility kept in fixed protected objects; native drag affects references only, never the authoritative original records. It is an order-only registry, previously disfavoured for UX, and it does NOT present drag and full section editing in one row. Normalization/fallback for duplicate, cleared or missing order references must not alter/delete original content or ship broken output. Requires owner acceptance of extra editor UI and verified native feasibility. A per-core numeric `Rekkefølge` control is the lower-complexity fallback but lacks drag; OWNER's latest model explicitly prefers drag.

**Original 8 vs OWNER examples of 6:** Current homepage has eight original records, in order `behov, regneeksempel, sjekk, priser, resultater, mekanisme, passer, sporsmal`. OWNER's illustrative "Låste seksjoner" explicitly named six and omitted `mekanisme` ("Slik virker optimalisering") and `passer` ("Hvem passer det for"). These MUST NOT be dropped/migrated or have their content/position changed without an OWNER decision. Until clarified treat all eight original records as protected in the authoritative source, and report the editorial group decision separately. If the two ordinary content blocks are to become optional, preserve their exact content/UUID/anchors and explain any impact on current published order.

**Visibility caveat:** `sjekk` and `priser` currently have published inbound links and therefore remain forced visible in H-024A8B. Adding a toggle to every core without resolving inbound link validity would be unsafe. Do not silently weaken that guard.

## Next step

Do NOT implement based only on this UX sketch. Explain the two fundamental tradeoffs to OWNER clearly; request ONE primary decision first (whether core native direct dragging is more important than hard non-deletability, or a separate sortable-reference control is acceptable). Confirm disposition of `mekanisme` and `passer` before any data migration. On OWNER choice, issue one narrowly scoped implementation contract preserving all OWNER content and the restored Worker, with genuine authenticated Pages CMS→Git→Worker→revert evidence, source/visual parity and STOP for review. No H-024B until approved.
