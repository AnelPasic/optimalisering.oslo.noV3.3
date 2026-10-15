# H-024A3 control inventory and correction

Authority: direct OWNER H-024A3 request in Codex, 2026-10-15. Incoming main00da73e includes the latest OWNER CMS save; no current content/order is reset to an older baseline. H-024B stays blocked and H-022 parked.

| Capability | Historical implementation | Incoming H-024A2 | Correction |
| --- | --- | --- | --- |
| Ordinary section/card color | H-019 /59b52bd, D-081: Standard/Hvit/Lys/Mint/Lavendel/Plomme | Still present inside each ordinary content row and item | Preserved independently |
| Heading alignment | H-020 /ec7dd19, D-082: center/left | Still present on ordinary sections | Preserved |
| Ordinary box or grid selection | H-019 explicitly excluded geometry/layout; ordinary renderers selected automatically. Not a previously implemented CMS control | No such selector | New constrained ordinary selectors, using existing grid/card primitives |
| Hero layout | H-024A: split-right/split-left/centered | Present, fixed above section list | Unchanged |
| PageList layout | H-021, D-083: cards/mediaCards/alternating/compact/links | Present in its dedicated Innsikt editor | Unchanged; these are query/reference-list layouts, not ordinary content types |
| Section type / creation | H-019 content/protected models; H-024A introduced mixed semantic homepage blocks and native Add | H-024A2 deliberately capped at eight; arbitrary section Add no longer available | Keep exact8 and native max8; no unsafe global Add |
| Drag ordering + co-location | H-024A introduced ordering; H-024A2 moved actual payload inside each row | Working and OWNER confirmed | Preserved and re-tested through actual CMS/Git/Worker |

Source checks: historical `.pages.yml` at59b52bd, d4bc857 and a5b1bdc; H019-CMS-SURFACE-CONTROLS.md; incoming `.pages.yml`, HomeSection/ContentSection, home-builder.ts and design-system.astro. Design-system visual examples alone did not create CMS capabilities. A repository-wide `.pages.yml` history search for boxVariant/Seksjonsoppsett/Boksvariant returns only the new fbcf0de implementation.

Smallest durable correction: `Seksjonsoppsett` on ordinary content selects Standard/two columns/three columns/stacked. `Boksvariant` on each ordinary item selects Standard/open/card. Colors retain their own fields. Empty/default choices preserve the original automatic compositions, including numbered mechanism content. Explicit grids become one column on mobile. Existing daisyUI card/border primitives and shared theme geometry are reused; no raw CSS, colors, dimensions or component replacement is exposed. Protected singleton blocks/CTA/form models have no new controls and reject ordinary presentation overrides. No persisted content migration is needed.

## Optional repeatable sections: safe extension boundary

Do not raise/remove max8 on the current mixed native block editor. Its Add picker lists protected singleton shapes too; schema rejection prevents a new invalid deployment but does not prevent saving invalid source and breaking a build. The existing OWNER native-control exception is not permission to widen creation into this invalid-state workflow.

For a future separately scoped add/remove capability, keep the current eight required identity/UUID/anchor pairs and their co-located payloads, allow additional `content` blocks only, generate each new UUID once, require a unique non-reserved anchor, and validate the whole page transaction before committing. The creation/type-selection UI must offer only ordinary content for new rows and prevent changing protected block types or deleting required rows; the same ordered array remains the render source. Primary ingestion must independently enforce singleton uniqueness, required identity/type pairs, reserved control anchors and uniqueness, including after reorder/removal. A bounded count is still required. No duplicate order registry or second editable payload source is needed.

Hosted native Pages CMS cannot enforce that per-type creation policy on this mixed block list using current documented config. A controlled CMS creation extension or other pre-save validating editor flow is the missing dependency, rather than a larger max. This task determines and records that boundary; it does not fabricate optional section creation or implement a new CMS platform. OWNER can scope it after accepting the corrected variants/editor. Current native Delete/Clear/type badge exception remains as explicitly accepted in H-024A2; strict publication guards remain.

## Evidence gate

Tests/config checks do not prove authenticated functionality. Before delivery: save an actual ordinary layout and box change together with an obvious section reorder in hosted Pages CMS, record the exact commit, successful connected build and live geometry/screenshot, then restore through CMS and verify exact prior content/order and visible restored output. Refresh/reopen Worker only after the exact deployment has propagated; no instant-preview claim.
