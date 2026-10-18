# H-024A8C — Recover original eight-section reordering in stock Pages CMS

Date: 2026-10-18
Status: **OWNER REVISE / NARROW DISCOVERY ONLY**. This is NOT approval to replace production schema or deploy. Codex must STOP with findings/options; OWNER chooses the eventual implementation after seeing actual tradeoffs. H-024A8B technical delivery still stands, but not OWNER-accepted as the final editor UX. H-024A3 whole editor OPEN, H-024B BLOCKED, H-022 PARKED, no launch/indexing/intake change.

## OWNER's actual new feedback

OWNER screenshot (2026-10-18) of authenticated Pages CMS shows fixed original sections under `Faste seksjoner`, and OWNER states: **"Etter hero, så kan ikke de faste seksjoner flyttes opp ned som tidligere."**

This is a real loss of the earlier one-list native drag/reorder capability, **not** an indication that hiding is broken, and **not** approval to abandon the stock Pages CMS. Previous D-098 accepted stock CMS and a *provisional* fixed original order subject to OWNER usability review; the owner now flags that tradeoff as a meaningful regression. Register H-024A8B overall **OWNER REVISE for core section ordering only**. Keep technical PASS for tested implementation, all CMS content, visibility, optional-before/after feature, protected authority, approved visual components, Hero/FAQ, and authenticated Worker/safety.

## Desired editor contract

- The **eight existing homepage sections can change their relative ordering from CMS**; Hero remains first. Editing a section and ordering it should ideally remain co-located in the same collapsible draggable row as in the prior H-024A3 pilot.
- New optional ordinary content sections still support Add/Delete, native optional-list reorder, typed Before/After placement around existing IDs and Skjult/Publisert, preserving current H-024A8B capabilities.
- Six safely hideable original types retain reversible visibility; `sjekk`/`priser` continue to respect existing public links and other dependencies. Hidden source data does not leak.
- Continue with stock Pages CMS and native supported field/list options only; **no fork/custom editor, no fragile DOM manipulations**, no new WYSIWYG, no duplicate authoritative records. Preserve stable IDs/UUIDs and CMS→Git→native Worker/edit/revert proof.

## First investigate lowest-change option (no production writes)

Assess a composed home source with:
1. **one original eight-row mixed `sections` block list** with min=max8, which supports native sorting and co-located content editing (prior pilot), and
2. the current separate `optionalSections` content-only list, whose Before/After placement resolves dynamically against **the new current order of the eight originals**, not their old static order.

This may avoid both the custom Pages CMS and a separate editor-only order registry. But it **does not natively protect every original row from Remove/Clear**: previous authenticated discovery showed enabled confirmation dialogs at min=max8. **Do not misrepresent max/min or site-side Zod rejection as editor-level deletion protection.**

Evaluate native Pages CMS behavior with safe throwaway/dry-run state:
- Does deleting/clearing one original row trigger native required/min validation that blocks Save (before creating Git commits), or can it persist an invalid source that causes a native build failure? Explore both pathways without losing/saving real OWNER content; demonstrate recovery.
- Can a duplicate original type be introduced through change-block chooser under this config? What do native CMS validation, typed schema/CI catch?
- On real CMS, can originals be reordered and extras still anchor to their IDs, including hidden target sections? Are all eight UUIDs/value fields retained and the existing extra-placement dropdown labels valid?
- What would restoring post-migration source structure to an array cost? Preserve the current exact content/UIDs/SEO/commercial data/layout and current published HTML byte parity, note expected legitimate JSON schema reshaping.
- Does the original list native mouse/keyboard drag work in an authenticated session, not merely screenshot assumptions? If mouse automation cannot prove actual human pointer gesture, state that.

**Guard principle:** An invalid user edit must not silently publish or erase protected business data. Explicitly distinguish (1) editor prevention, (2) build-time rejection (potential broken deploy), (3) protected-Git version recovery. If rollback/validation is necessary, offer a simple operational recovery path without claiming it is equivalent to native editor prevention.

## Required response from Codex

No changes to product/code/site or source baseline in this discovery stage. Produce a narrow assessment in `coordination/evidence/h024a8c/README.md`, with:
- Feasibility verdict for native reordered eight + current optional Before/After extras + visibility.
- Actual editor deletion/clear and save handling, with bounded evidence and no destructive production write.
- Exact scope / migration impact / test plan to restore sorting while preserving H-024A8B.
- At most one simple stock-CMS fallback if this cannot be made sufficiently safe, e.g. a separate reordering field or simple order controls; explicitly state UX cost and whether it repeats a previously rejected split editing/order model.
- A recommended implementation only after the OWNER accepts the resulting deletion-protection tradeoff. The goal is reliable simplicity, not maximal invariants at the cost of all reorderability.

Codex should update coordination/PROJECT-STATE, REVIEW-QUEUE and CODEX-TO-CHATGPT with truthful STOP result only. Do not mark H-024A8B PASS or authorize H-024B, proof or launch.
