# H-026 — Real daisyUI Hero / Footer reuse, no design regression

Date: 2026-10-17
Authority: direct OWNER request: "ønsker også at om noe kan løses med DaisyUI components så skal de brukes. Den har f.eks egen for Footer, Hero" with official daisyUI links.
Governance: MWS-020 strengthened by MWS-029 in `AnelPasic/MedonWebSystem`. OWNER-approved existing Hero design is D-088.
Status: QUEUED SCOPED PILOT / **DO NOT START until H-024A4 Card parity is delivered and OWNER has reviewed it**. Does not unblock H-024B or parked H-022. No public release.

## Official documentation verified 2026-10-17
- https://daisyui.com/components/hero/ — `hero`, `hero-content`, optional `hero-overlay`.
- https://daisyui.com/components/footer/ — `footer`, `footer-title`, responsive `footer-horizontal`/`footer-vertical`.
- https://daisyui.com/components/card/ — `card`, `card-body`, `card-title`, `card-actions` (H-024A4 resolves Card separately).
Codex should consult current daisyUI GitMCP or official docs at execution time.

## Why this exists
- Current `HomeFooter.astro` uses a custom `site-footer > .footer-grid` layout rather than the actual daisyUI `footer` primitive.
- Current `CommercialHero.astro` is genuinely shared and accepted, but uses `commercial-hero > hero-container > hero-frame` and bespoke responsive composition, not daisyUI `hero > hero-content`.
- These facts are not an authorization to replace approved looks with generic daisyUI demo designs or to force every UI layer into a component that is wrong for its behavior. The principle is to **reuse genuine daisyUI primitives where they can preserve the approved site and simplify code**, not to chase markup scores.

## Scoped work after H-024A4 review
1. Inventory current Hero/Footer markup and styles, compare with exact daisyUI component capabilities, and identify which CSS rules are essential project-specific compositions versus duplicate routine layout. Record a before/after component map.
2. Prefer genuine `footer` + `footer-title` + responsive daisyUI direction parts for `HomeFooter.astro`, preserving **exact site brand, service/other links, glossary link, legal/privacy links, copyright, preview-only notice**, semantic nav labels and current appearance. Do not invent social links/newsletters.
3. For `CommercialHero.astro`, use **actual** `hero` and `hero-content` where compatible. Retain all four CMS presets (split-right, split-left, centered with image, centered without), text-first mobile DOM, H1 uniqueness, media/alt/crop, approved proof, pricing source, CTA anchors, typography/spacing/theme and all family-specific semantics (including assessment form, glossary and 404). `hero-overlay` is optional only where a true background overlay exists; do not add a decorative overlay.
4. Keep Tailwind utilities for layout/spacing/containers and small scoped CSS only where daisyUI lacks required project-specific layout. Remove obsolete redundant custom rules when safe. Do not maintain a second arbitrary Hero/Footer system behind one daisyUI class.
5. If a particular approved Hero detail demonstrably cannot be expressed safely using the daisyUI primitive without significant regression or more complexity, **document the explicit technical and visual conflict** and preserve the accepted implementation instead of forced substitution. No claim of parity based on class names alone.
6. No unrelated brand redesign, copy changes, Home CMS mutations, H-022 changes, page-builder schema work, H-024B roll-out, real form submit, index enablement or launch.

## Acceptance
- Exact 17 route/page families/default state and real four Hero CMS presets unchanged at 1440/900/390/320, including form, breadcrumbs, proof/CTA, media/alt/crop and no-image; default screenshot/geometry within reasonable small tolerance and OWNER-visible comparisons.
- Footer must keep existing links/text/semantics and desktop/mobile behavior, without horizontal overflow, broken focus order, contrast or duplicate landmarks.
- Compare actual computed styles and screenshot of approved Hero/Footer before/after. Use the source renderer and native Worker; no fake demo markup. Ensure `/design-system/` uses the same production Hero and remains visually stable.
- Full/focused regression and independent code/visual review. Report which components genuinely use daisyUI parts versus justified exceptions. Record exact commit/native build/live Worker, update coordination, STOP for OWNER visual review.
