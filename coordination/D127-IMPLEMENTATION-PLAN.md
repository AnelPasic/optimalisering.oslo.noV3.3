# D-127 implementation plan

Spec: `D127-SYNLIGHET-DROPDOWN-AND-RESEND-DELIVERY.md`, OWNER direction on main `718b6e3`.

Goal: deliver the requested navigation in noindex preview, an unpublished editor-ready Lokal SEO draft, and a verified read-only Resend reuse assessment.

Architecture: extend the existing homepage chrome navigation with typed optional children. One shared Astro link/disclosure rendering and controller serves desktop/mobile. Existing page loaders remain unchanged; the local SEO draft lives outside the published pages collection with a dedicated native Pages CMS editor using existing service-field anchors. Until approved, Lokal SEO's menu destination is the existing relevant Synlighet section, not an unbuilt route. No sticky change or new backend.

- [x] N1: add meaningful failing schema/CMS/active-route tests; implement validated child data, separate clickable parent and disclosure, focus/Escape/outside-click/breakpoint behavior, active context and 320px touch targets. Build and browser smoke at 1440/900/390/320, preserve all other content/globals.
- [x] N2: research current Google guidance and actual Norwegian search intent, read existing hub/services; prepare distinct Lokal SEO page JSON outside the published loader plus CMS editor, verify schema and in-memory CMS save without creating a route/dead link. Record Lane C quality review and exact OWNER gaps.
- [x] N3: map domain to current deployed ingress and actual public form contract read-only, compare reusable source and new three form contracts, document minimal compatible delivery path and precise inbox/privacy/retention/activation evidence still required. No production POST/config/source writes.
- [x] Verify focused tests, build, link/anchor audit, CMS source roundtrip and responsive keyboard/pointer checks; deploy only noindex static preview, confirm actual served assets and safeguards, record receipt/limitations for OWNER visual/content review.

Review risks: parent click must navigate rather than toggle; hidden links must not receive focus; Escape returns to the disclosure that opened; active parent context must not masquerade as another current page; unpublished Lokal SEO must never become a dead public href; menu array saves must preserve child descriptions and unrelated OWNER data; no live form or production behavior changes.

Existing C0/C1 report/coordination changes and untracked OWNER images are preserved. This plan consumes D-127; it does not create any additional content or launch approval.

Ruling: Lokal SEO temporarily links the existing, visible `/synlighet/#lokal-synlighet` section so all three menu choices have useful destinations while the new page stays unpublished. No public `/lokal-seo/` until its separate content gate passes.

Ruling: actual live infrastructure is Cloudflare Pages at deploy50576b5, not the newer local production-Worker source. Resend reuse assessment is based on the exact deployed commit; no assumption that local source is live.

Review: a generated submenu-ID/CMS-anchor collision was reproduced with a failing test and fixed narrowly in both existing page validators. Browser testing exposed early focusout close before Tab reached children; using relatedTarget fixed it. Actual local/hosted keyboard tests pass. Final receipt is in evidence/d127/README.md.
