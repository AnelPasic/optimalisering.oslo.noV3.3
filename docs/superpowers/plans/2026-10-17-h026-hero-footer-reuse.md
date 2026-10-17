# H-026 Hero / Footer reuse implementation plan

> Use superpowers:executing-plans inline with one independent read-only whole-change review. Existing OWNER-approved D-092/H-026 contract supplies purpose, scope and execution authorization; no new approval gate is inferred.

**Goal:** Reuse genuine daisyUI Hero/Footer parts and remove routine custom layout while retaining accepted appearance, all four CMS presets and exact source/authority.

**Architecture:** Existing outer page shells and breadcrumbs preserve family semantics. A genuine hero/hero-content pair supplies the component structure; Tailwind grid composes approved copy/media/form variants without a second Hero renderer. Footer uses native footer navigation grid/direction and existing brand as its title, with approved typography and precise responsive columns. Scope is existing components and their routine layout declarations, not a design change.

**Spec:** `coordination/H026-DAISYUI-HERO-FOOTER-REUSE.md`, D-092, incoming173f6c3. Existing Astro7/daisyUI5.7.50/Tailwind4; no dependencies.

## Constraints and review focus

All17 page families/defaults and four actual source CMS presets retain text/SEO/H1, CTA, proof/pricing authority, media/alt/crop, text-first mobile order, disabled assessment form, glossary/404. Footer keeps all brand/provider/navigation/glossary/legal/privacy/copyright/preview text and accessible nav names. Card16–18px/radii/padding/CMS data exact; H-024B blocked/H-022 parked/noindex/intake/no launch. No CMS saves because editor/source schema unchanged.

## Steps

- [x] Fresh build, protected hashes, actual Worker before-screenshots first, local Hero/Footer/default references at1440/900/390/320. Record component/cascade map.
- [x] Browser guard demonstrates missing genuine parts before edits; capture actual source4-presets ×image/no-image across representative families and all widths, restoring source/build afterward. Reuse actual source resolver and renderer, not fake demo markup.
- [x] Implement compatible Hero/Footer parts; transfer routine layout to Tailwind/remove obsolete rules. Preserve unique semantic/media/breadcrumb/proof/title profiles. Any incompatible part stays intact with measured exception, never forced.
- [x] Focused computed geometry/styles/text/links/H1/footer semantics/focus/overflow/contrast and before/after screenshots. All68 defaults and actual source variants/demo parity remain within1px for visible elements. Full verify once; protected hashes exact. Independent code/visual/UX review.
- [ ] Push authorized scope; exact native successful build and actual Worker screenshots/default/asset proof. Update coordination/decisions/state/review queue with evidence; STOP for OWNER Hero/Footer review.

Ruling: keep existing outer shells/breadcrumbs and one inner Hero envelope to avoid native grid overlap or shell width overrides. Tailwind owns routine frame/grid layout; intrinsic centered copy and native Footer identity alignment are preserved by measured utilities.61 CSS declarations removed, none added;72 defaults+208 actual source variants exact, full142 tests/196 type groups and independent review pass.174 protected files+5 OWNER images remain exact. No native CMS saves required or performed.
