# H-025 — One reusable Hero system with a per-page CMS variant choice

Date: 2026-10-16
Source: direct OWNER instruction in ChatGPT (this project):
"Tjenestesidene og alle andre bruker predefinerte Heros og at man kan velge per side hvilken som brukes."
Authority: OWNER, technical implementation scope only. No content/visual/launch approval.
Status: AUTHORIZED FOR SCOPED IMPLEMENTATION; STOP for OWNER full-site/editor review.
Purpose: make approved Hero compositions actual shared components and expose a safe choice on **each page**, rather than maintaining independent page-family hero markup.

## Read / baseline first
- Pull fresh main, inspect `coordination/CHATGPT-TO-CODEX.md`, `coordination/DECISIONS.md`, `coordination/PROJECT-STATE.md`, and H-024A3's current delivered state (implementation `fbcf0de`, evidence `coordination/evidence/h024a3/`). Preserve any newer OWNER edits.
- H-023B global daisyUI/theming is accepted; H-024A3 ordinary content/box variant implementation is delivered for review. Do not undo it.
- Current homepage uses `CommercialHero.astro` + `home-builder.ts:heroSchema` and `home.hero`; service uses `ServiceHeroCopy.astro`/`ServiceHeroVisual.astro`; pricing, index, article, assessment, utility, glossary and 404 have their own hero/header compositions. Source data and commercial authority differ by family.
- Canonical cross-project requirements MWS-018/MWS-024/MWS-026/MWS-027 are already approved. This task proves project-wide application of MWS-026; do not infer that this pilot's exact brand is universal.

## Required UX — CMS
1. Each CMS-managed page must expose a clear **Hero → Oppsett** select immediately with the page's Hero fields or the existing hero-intro data (no buried `composition` JSON and no second order-only registry):
   - `split-right`: Tekst venstre / bilde høyre (default for images)
   - `split-left`: Bilde venstre / tekst høyre
   - `centered`: Sentrert (with or without an optional image)
2. Choices must control the **actual same shared Hero primitive** that `/design-system/` demonstrates. Editor choices cannot be mere CSS labels with one family ignoring them. Use safe typed enum values, never raw class names or styles.
3. The selected layout is independent of text content, optional images, image crop/alt, color, hero/CTA/proof authority and normal CMS block ordering. Switching layout must never clear or replace a media object. Text remains first in DOM/mobile for reading order.
4. No mandatory image: a split layout without image must have a deliberate legible fallback (prefer centered/full text treatment or explicitly reject the invalid combination with a readable CMS note). The centered variant works with or without an image.
5. The ordinary page editor must be understandable in Norwegian. No duplicate editing fields for the same eyebrow/H1/support/CTA/media.

## Architecture / authority
6. Consolidate to **one canonical reusable Hero renderer and typed presentation contract** for all normal page families: `home`, `service`, `pricing`, `index`, `article`, `assessment`, `utility`. Route-specific semantic variants/adapters are allowed for genuinely distinct requirements, but not parallel typography, card systems, buttons, or arbitrary home-only visuals. Both existing homepage and new routes use the same primitives.
7. Preserve existing authority/source of truth: homepage `hero`; normal page eyebrow/title/intro/CTA/heroVisual; pricing title/support/pricing source may currently derive from shared Packages. Use a one-way resolver/adapter so **layout is CMS-editable but commercial copy/prices/proof do not get duplicated**. Avoid an unsynchronized second `hero` object containing copied text on each page. Where a page has no CTA, renderer must support no CTA without inventing one; preserve assessment/form behavior.
8. Existing hero/visual content and default live appearance stay equivalent unless a scoped exception is documented and reviewed. Default missing `hero.layout` on legacy page records must map to the current presentation; do not accidentally turn historical text-only heroes into image-split pages. The owner's already-selected service artwork must stay with its page.
9. Hero H1 remains one per public document, without demo H1 collisions. Breadcrumbs remain accessible; preserve route-local semantics and ordering (especially pricing anchor/order, article hierarchy, assessment form, glossary anchors, 404 navigation).
10. Homepage Hero microproof still uses its **guarded proof source**; other pages must not gain unapproved case numbers/claims. The image proof overlay must not appear when unapproved. Preserve proven source, permission and attribution.
11. Dedicated `/begreper/` and `/404` must be audited explicitly. If they are not currently CMS-managed, define a safe page-specific typed presentation source/editor rather than silently claiming they are covered. Any justified exception to per-page CMS selection must be flagged for OWNER decision; do not redesign utility/error/glossary content to force a marketing hero.
12. This is **Hero scope only**, not broad H-024B section-page-builder rollout. Do not touch ordinary block creation/uniqueness, H-022 parked case visual, pricing content/offer, intake, noindex, DNS or real launch. Never fabricate content, case studies, assets or approval.

## Demonstration and acceptance
- Update `/design-system/` to showcase the **same live Hero primitive** in its three variants plus no-image, long Norwegian H1, very short H1 and at least one realistic service/pricing/editor scenario. Label clearly what is CMS-selectable and what is demo-only.
- Inspect CMS schema for every existing page family and explicitly inventory which page files expose Hero choice. Prove no editor-only dead controls.
- Authenticated CMS test at minimum: set variant on an actual **service** page, an actual **non-service** page (prefer pricing/index), and the homepage; save → exact Git commit → successful native Cloudflare build → changed Worker render/screenshot → restore → successful native build/render. If session access prevents authenticated verification, report the missing evidence, do not claim end-to-end pass.
- Browser test at 1440, 900, 390, 320: every normal route family, split-right/split-left/centered, image + no image, long headline, tap/keyboard CTA, exact existing content/SEO/anchors, no overflow, no double H1, no misleading public proof. Validate images/alt/crop and mobile text-first semantics.
- Perform preserved content/authority comparison and focused automated guards (including invalid enum/layout and source duplication), one appropriately scoped full verify, and independent read-only review. Keep default Worker safe (noindex, intake disabled).
- Deliver small documented diff + per-page CMS map + before/after screenshots, commit/Worker receipts, remaining limitations to `coordination/CODEX-TO-CHATGPT.md`; update PROJECT-STATE, REVIEW-QUEUE and DECISIONS as actual facts dictate.
- **STOP for OWNER Hero/CMS review.** Do not infer whole-editor acceptance, H-024B authorization, H-022 acceptance or live launch.

Decision boundary: This user instruction authorizes unified Hero presentation and per-page selection. Any genuine product-level conflict (for example editorial 404 semantics or a shared pricing title with conflicting edit surfaces) should be recorded with concrete options/recommendation, not silently solved by duplicating content or weakening a guard.
