# H-025A — Hero demo → CMS choice parity (OWNER correction)

Date: 2026-10-16
Source: direct OWNER screenshot of Pages CMS `Konvertering` editor and comment:
**"saken er bare at hero valg ikke tillater alle definerte varianter."**
Authority: OWNER feedback / H-025 **REVISE, narrow editor usability correction**; not blanket page/redesign or launch approval.
Status: SCOPED CORRECTION FOR CODEX; STOP for OWNER editor + visual review.

## Reproduce / diagnosis (verified current main)
- H-025 was technically delivered; the live design-system shows: split-right, split-left, centered with image, **centered without image**, short headline test, service sample, pricing sample, long headline test.
- `app/src/lib/hero-presentation.ts` has only three `heroLayoutValues` and `.pages.yml` component `heroLayoutChoice` exposes only those.
- The design-system's `centered-none` is manually simulated with `{...hero, layout:'centered', visual:{kind:'none'}}`, not selectable as a separate visible Hero preset.
- On service pages, CMS shows `Hero → Oppsett` separately from `Hero-bilde / drømmeutfall`, where `kind` is only photo/illustration; there is no explicit, non-destructive **hide image** control/preset. Thus with an existing image, selecting `Sentrert (med eller uten bilde)` leaves the image displayed; owner cannot select the demonstrated `Sentrert uten bilde` preset via that field.
- Short/long title variants are *text-length stress tests*, not distinct visual component presets. Service/pricing are source-family examples using the same shared primitive, not separate layouts. Do NOT manufacture four additional synonymous layout choices for those demos.

## Editor acceptance — exact user-visible behavior
1. Pages CMS Hero editor on **all applicable 17 source/editor mappings** should make **four meaningful shown-on-design-system presets** easily selectable, with clear Norwegian labels:
   - Tekst venstre / bilde høyre
   - Bilde venstre / tekst høyre
   - Sentrert med bilde
   - **Sentrert uten bilde**
2. The fourth is a *first-class selectable outcome*, not a hidden combination that requires deleting a previously chosen image or manipulating raw content. Save, build and live rendering must produce the same media-free centered variant the demo shows.
3. Switching **to** no-image and back **must preserve the full original image source, type, alt, crop and consent/proof guards** byte-for-byte/semantically. Don't clear/remove the optional `heroVisual` object or upload; visibility is presentation-only. For homepage preserve `hero.visual`, its proof overlay data and independent CTA. Don't duplicate text or commercial source.
4. No-image, text-only legacy pages continue to work and keep current default appearance when left untouched. If `Sentrert med bilde` is chosen on a page that truly lacks an image, the editor needs an accurate no-image fallback/description (no broken placeholder or invented asset).
5. Keep one shared `CommercialHero` component and typed schema. Implementation may use a typed fourth preset or an equally safe preset→{layout,image visibility} mapping, but the CMS must surface the fourth as an obvious option. All three existing saved layout values must remain backward compatible. Disallow arbitrary CSS.
6. Keep an accessible H1, correct text-first mobile reading order, image alt, content/CTA/pricing/proof authorities, `SiteLayout`, and parent global theme untouched. No broader Hero redesign or bloat in routine CMS fields.
7. `/design-system/` must label **which 4 examples are directly selectable CMS presets**, with their exact Norwegian CMS option names. Clearly mark short/long titles as stress tests and service/pricing as **page source/context examples**, not extra presets. Keep the OWNER-liked blocks **below the Hero demos unchanged** (buttons/cards/forms/surfaces/CMS box demos, packages, PageList).
8. Do NOT reinterpret this as OWNER acceptance of all H-025 visual outcomes. H-025 remains **OWNER REVISE for CMS selection parity** until the corrected live editor is reviewed. No unrelated proof/page-builder work.

## Verification
- Compare the select options and design-system demos **one-to-one**; prevent demos advertising a selectable variant that doesn't actually exist.
- Add schema/render/CMS regression for fourth preset across home, service and non-service, with/without preexisting image, fallback, existing defaults, proof and no H1 duplication.
- **Authenticated Pages CMS:** use `konvertering` (OWNER's exact screenshot) with a retained uploaded image: change to `Sentrert uten bilde`, save → exact Git commit → successful connected Cloudflare build → live Worker screenshot shows no Hero image. Then restore prior image-visible variant via CMS, verify image+crop/alt exact and Worker refreshed. Validate on homepage and at least one non-service family for source/authority peculiarities; where end-to-end CMS cannot be exercised, say so rather than claiming it.
- Run focused multi-width browser checks (1440/900/390/320), appropriately scoped verify, CMS round trip and independent read-only visual/UX review.
- Preserve all current OWNER content edits and H-024A3 implementation; noindex/intake disabled; H-024B blocked, H-022 parked.
- Update `coordination/CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md`, `REVIEW-QUEUE.md`, evidence and factual receipt; push main then **STOP for OWNER review**.

Boundary: This task fixes discoverability and safe selection of the intended *four visual outcomes*. It does not ask Codex to build distinct templates for a short/long title or for every route family, since those are content/context demos.
