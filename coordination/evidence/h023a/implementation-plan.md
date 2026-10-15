# H-023A implementation plan

Spec: `coordination/H023A-DAISYUI-FOUNDATION.md`, authorized at incoming main `2ee159c` under D-084. Execute in the current checkout as requested. H-022 stays parked. No content/schema/logic/reference edits.

- [x] Pull main; inspect coordination, preserve untracked images; capture four-width baseline and failing foundation check.
- [x] Install exact Tailwind 4/Vite and daisyUI 5 packages; establish app.css, one OKLCH theme and semantic aliases. Retain legacy CSS in a lower cascade layer so existing compositions survive and migrated components own primitives.
- [x] Migrate homepage and shared routine controls (buttons, header/menu, form fields, range, notice, native FAQ); retain special calculator/proof/pricing/PageList compositions. Build an internal noindex design-system route with native Theme Controller and realistic Norwegian examples.
- [x] Run focused browser QA, source preservation, full verify once final; inspect responsive screenshots; resolve actual regressions and obtain independent code review.
- [ ] Document old/new tokens, legacy dependency inventory and exact semantic H-023B route migration plan. Push main, verify native Worker build/assets/live route and safeguards, update coordination, stop for OWNER Visual Shell/design-system review.

Pre-flight interfaces: app.css declares layer order; retained public Invite sheets join `legacy`; migrated primitives consume `components`; `project` contains semantic typography/alias adapters only. SiteLayout imports one UI entry and sets the explicit default theme. Theme Controller is confined to the review route. No persistence.

Review focus: cascade across old routes; FAQ keyboard/native semantics; range dimensions/keyboard; CMS dark-surface inheritance; Theme Controller isolation. Browser assertions exercise the representative homepage and comparison route, existing full verification covers the retained routes.
