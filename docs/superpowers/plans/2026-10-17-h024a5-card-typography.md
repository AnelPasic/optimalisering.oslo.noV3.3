# H-024A5 Card Typography Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline; one independent read-only review of the whole change at the end.

**Goal:** Make substantive card descriptions compute to at least1rem, preserving all other semantic typography and accepted card structure.

**Architecture:** Measure first. Reuse existing body role for explanatory card copy through one semantic adapter; keep numbers, CTA, metadata and other already-readable card families on their existing roles. Do not increase the global body/root scale or use card-lg, which would change padding.

**Tech Stack:** Existing Astro7, daisyUI5.7.50, Tailwind4, Playwright/Chrome. No dependency changes.

**Spec:** `coordination/H024A5-CARD-BODY-TYPE-FLOOR.md`, D-091, incoming maina4ebf46.

## Constraints and review focus

Preserve source/CMS data, ordering, four accepted Heroes, prices/proof/calculator/disabled forms/noindex, Card20px radius/24px padding/20px gap. H-026 queued; H-024B blocked; H-022 parked. No CMS writes. Distinguish explanatory descriptions from compact labels/numbers/legal helper text. Check long/dark copy, narrow320px, nested terms, link alignment and real ordinary renderers. OWNER review stays separate from technical/native success.

## One scoped correction

- [x] Build current source; hash protected inputs; capture fresh68-route default baseline and four-width actual card-family inventory/screenshots before edits.
- [x] Diagnose computed font/line-height/family and exact daisyUI cascade. Observe a real browser failure of the minimum1rem assertion, or ledger a restrained body-only increase if already at floor.
- [x] Add the smallest shared semantic body adapter for affected descriptions using existing roles. Cover actual ContentCard and image demo, and any other measured substantive subfloor family; preserve intentional compact roles and all geometry declarations.
- [x] Actual four-width browser assertions: before/after role table, min1rem/line-height/AA contrast, title/CTA/meta unchanged, no overflow/clipping, radius/padding/gap/colors exact; screenshots and side-by-side comparisons. Fresh68 default comparisons protect content/SEO/IDs/order/accepted Hero geometry. One bounded full verify. Protected input hashes exact.
- [x] One independent read-only code/visual/UX review. Fix any material issue within scope and check only affected gates.
- [ ] Push authorized scoped handoff; successful exact native build and actual Worker screenshot/behavior/asset verification. Update coordination with honest evidence and STOP for OWNER typography review.

Ruling: actual14px Card inheritance is the defect, so reuse existing responsive body role rather than create17px/18px trials or alter all Card parts. Existing mechanism mobile16px stays exact; assertions demand improvement only where before was below16px. Reporting filter corrected to select actual PageList summary. Full142 tests/196 typography groups,32 focused inventories/68 defaults and independent review pass.
