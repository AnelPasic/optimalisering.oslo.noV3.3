# H-020 section heading alignment implementation plan

> Execute inline with the executing-plans skill and obtain one fresh final technical review.

Goal: one typed Center/Left CMS select changes only the section-heading block's text alignment; Center remains the existing default.

Spec: `H020-CMS-SECTION-HEADING-ALIGNMENT.md`, incoming main `844b034`. Preserve D-081/H-019, same-surface child treatment, corrected channel-card geometry, typography, recent centered/full-width/no-max-width decisions, all content/math/logic/art/intake/noindex/read-only inputs and untracked OWNER images.

Architecture: small shared `heading-alignment.ts` enum/schema/safe attribute helper, optional/defaulted `sections[].headingAlign`, one reusable CMS select immediately after section heading in the applicable ordinary/protected model. Two shared section renderers place a validated attribute directly on `.section-heading`. One CSS selector sets only `text-align: left`. No item/card/link attributes, wrappers, layout or geometry controls.

- [x] Build incoming baseline and capture compact four-width rendering fingerprints/screenshots. Focused CMS tests observed RED for missing alignment controls/round-trip, then GREEN.
- [x] Add typed mapping/schema/CMS fields and the one narrow CSS override. Actual OWNER answer excludes the homepage form intro; its separate `sectionForm` model preserves existing fields and omits alignment. Focused tests 14/14 GREEN.
- [x] Check center/left and restoration on representative home/service/protected headings at1440/900/390/320; 64 exact default groups, 16 scoped variants and 32 source-backed checks pass. Full verify101/101, typography196, CMS20 hashes and2,217 protected blobs pass. Fresh technical review21/21; no implementation findings, one evidence wording correction applied.
- [x] Push implementation ec7dd19 to main. Native Build ff4aadc0 succeeds / Version835a3efc; all53 assets and64 default +16 scoped live groups pass. Authenticated CMS is unavailable as recorded;32 actual source-render checks pass with exact restoration. Outbound/state/review queue updated. STOP for OWNER visual/CMS review.

Review focus: cleared optional selects must behave as center; protected heading alignment must not unlock surfaces; styles must affect only heading descendants; current OWNER surface/card corrections must survive; no inert control on the homepage form intro.

OWNER ruling: leave the homepage form intro unchanged. Its `.assessment-copy` stays outside H-020 and its separate CMS model has neither heading alignment nor surface controls. Protected service `.section-heading` blocks receive alignment only.

Prerequisite rulings: quote the incoming URL-slug description's colon so `.pages.yml` parses, preserving its wording. Allow only a read-only visible slug in the earlier metadata guard, preserving OWNER's incoming CMS field and all other hidden metadata requirements. Scope the historical H-019 migration assertion to its actual implementation commit `59b52bd` against `188478e`, so later OWNER content changes remain permitted without weakening the migration proof.

Browser harness correction: element screenshots scroll the page. Reset scroll to zero before comparing whole-page restoration; no application code change was needed. Local results: 64 exact default route/width groups and 16 Center/Left/restore groups pass; 2,217 protected blobs match incoming main.

CMS test ruling: authenticated browser attachment reports its profile already in use. Preserve the active browser. Conditional authenticated smoke test remains unavailable; use the real CMS configuration plus CMS-equivalent round-trip fixture and actual reversible source/build/render checks instead, explicitly retaining the authenticated-testing limitation.

Main delivery is explicitly authorized by the active handoff; no acceptance/launch or further implementation follows technical completion.
