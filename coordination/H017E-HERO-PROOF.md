# H-017E - Homepage hero proof

Date: 2026-10-12
Authority: OWNER + STRATEGY_CONTENT
Status: AUTHORIZED

## Objective

Add one compact real-customer proof element to the existing homepage hero image, using the same persuasion principle as the current Mementor hero: immediate proof attached to the main visual, without turning the hero into a case study.

H-017D is accepted and remains the lower-page proof density baseline.

## Locked public hero proof

Use the current featured homepage proof case from the guarded proof system.

Expected current case: **Eurotents**.

Show only:

**ROAS 4,3x -> 17,2x**

Supporting line:

**Eurotents · Google Ads**

Do not show in the hero:
- 20 % lower ad spend
- dates
- work/intervention
- caveats/limitations
- evidence/source notes
- testimonial copy
- logo
- dashboard UI
- extra metrics

The lower proof section remains the place for the fuller concise case presentation.

## Source and fail-closed behavior

Do not hardcode a second independent proof record.

Derive hero proof from the same guarded publishable homepage proof selection used by H-017C/H-017D:
- first publishable selected homepage case
- currently Eurotents

Use the existing proof gate/public projection.
If there is no publishable featured case, render no hero proof.
Never weaken or bypass getPublishableCases.

The display may format the already-approved featured result as:
`ROAS {before} -> {after}`
and derive the source label from the approved public metric label.

## Visual direction

Preserve the current two-column homepage hero, copy, CTAs, photo and crop.

Attach a compact proof panel to the hero photo.

Preferred desktop composition:
- overlay or partially overlap the lower-left/lower edge of the image
- clearly part of the image composition
- approximately 35-50 % of the image width, sized by content rather than forced height
- cream/white or mint surface from the current site palette
- dark plum/green text
- restrained radius consistent with the site
- no heavy shadow
- no badge/trophy/icon clutter
- result is the visual focus

The panel must not obscure the subject's face or important image content.

The hero H1 and CTA remain the primary action hierarchy. The proof should add credibility, not become a second hero headline.

## Mobile

At <= 650px, do not force a destructive overlay.

Prefer:
- slight overlap at the bottom edge of the image, or
- directly attached below the image inside the same visual wrapper

Keep it compact.
The metric must not wrap awkwardly at 390 or 320.
Do not materially increase first-screen height.

## Typography

Use current Instrument Sans / Figtree roles.

Result:
- clearly larger than support line
- materially smaller than H1
- strong enough to scan immediately

Support line:
- quiet
- readable
- normal casing

## CMS

Do not create a separate hero-proof data source or duplicate case fields.

Hero proof follows the current featured homepage proof selection automatically.

Do not reopen Pages CMS architecture.
No new toggle is required unless implementation genuinely needs one; default behavior is to show the hero proof whenever the featured proof is publishable.

## Preserve

Do not change:
- homepage H1/intro/CTA wording
- hero photo asset or crop
- selector
- calculator
- packages/pricing
- H-017D lower proof presentation/hierarchy
- service pages
- header/footer
- intake/noindex
- H-017B architecture
- proof registry authority/evidence

## QA

Check homepage hero at:
- 1440
- 900
- 390
- 320

Verify:
- hero proof derives from guarded featured proof
- unapproved/missing featured proof renders no hero proof
- no duplicated evidence source
- photo subject is not obscured
- no clipping/overflow/awkward metric wrapping
- hero copy/CTA remain dominant
- first screen remains balanced
- lower H-017D proof section remains unchanged
- no unrelated page changes

Run focused hero/proof tests and full verify.
Capture hero at 1440/390/320.
Push to main, verify connected Worker, update CODEX-TO-CHATGPT, then stop for OWNER + STRATEGY_CONTENT visual review.
