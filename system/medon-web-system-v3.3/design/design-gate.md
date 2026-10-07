# Core Design Gate

This gate exists to prevent expensive full-site rework.

Prerequisites:
- core message architecture is defined;
- representative content map/page skeleton exists;
- visual character, typography, palette, geometry, component language, imagery role and density/rhythm are owner-locked in `DESIGN-DECISIONS.md`.

The visual design must express that argument. The core gate is **not** where the agent should rediscover the design system.

## Build only these first

1. top navigation;
2. hero;
3. representative service/content section;
4. representative proof/data section;
5. primary contact/assessment flow;
6. package selector if commercially relevant;
7. footer;
8. representative mobile flow.

## Gate review

Verify:

### Commercial
- buyer is obvious;
- offer/outcome is obvious;
- CTA is obvious;
- trust is credible;
- package anchor/selection logic is understandable.

### Copy
- hero is specific;
- message architecture survived contact with the design;
- headings alone still tell the main story;
- no unsupported proof;
- no generic filler;
- primary hook works without reading the whole page.

### UX
- primary action is visible;
- mobile CTA/form is not buried;
- navigation is simple;
- no unnecessary carousel;
- process complexity is not dramatized.

### Visual
- visual hierarchy makes first/next/last priority obvious;
- whitespace clarifies relationships instead of merely adding empty scroll;
- direction feels deliberate;
- brand is not generic template output;
- typography hierarchy is clear;
- components can scale to remaining pages.

### Mobile / real-device sanity
- representative real-device/mobile check completed where possible;
- tap targets, keyboard/forms, sticky UI, wrap/overflow and CTA visibility work in practice;

### Technical
- representative page remains fast/static where intended;
- no dependency added only for the design prototype.

## Stop condition

Do not full-build until the user approves the combined core gate **and** the subsequent representative full-page rhythm gate.

If feedback is negative, identify which already-defined layer is failing before changing anything. Do not reset multiple approved layers by default.

After approval, preserve the design system unless later evidence justifies a change.
