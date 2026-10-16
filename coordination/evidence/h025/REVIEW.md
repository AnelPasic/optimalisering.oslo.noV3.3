# Independent whole-change review

Fresh-context read-only reviewer `/root/h025_review` inspected the complete H-025 implementation against the contract. Two actionable P2 findings were returned and fixed in one pass:

- Explicit centered layouts on capped inner/glossary frames were left of the viewport center. Selected frame/root now have automatic inline margins. Actual coordinate assertions were added; the complete 216-group source/build/browser matrix passes after the fix.
- Service/pricing design-system examples depended on route-parent CSS and public H1 selectors, so the real shared primitive's H2 demos did not receive the complete live typography/profile. Hero family data attributes now own the existing profiles; H1/H2 share the same rules. The new font assertion failed before this fix and all 32 real demo groups pass afterward.

No remaining blocker was reported. Final full verification passes 138 tests and 196 typography groups; preserved defaults pass all 68 route/width comparisons. Real authenticated CMS/native-build/live proof is a separate delivery gate, not inferred from this review or schema tests.

Subsequent manual inspection of the actual CMS-centered homepage screenshot caught a media placement defect: unlayered scoped HeroMedia justify-self rules overrode the layered centered composition. The new visual-center assertion failed on the actual source/build/browser path (`centered-media-red.log`). Media grid alignment now lives alongside the existing layout choices in hero.css, retaining default end/start behavior. The complete variant matrix and full verification are rerun for this correction, followed by a fresh actual homepage CMS save/build/live/restore cycle. The earlier screenshot/build is retained only as explicitly named diagnostic evidence.

Verification compatibility: the moved existing 404 arrow uses an HTML character reference to retain its exact public output under the existing component punctuation guard. The H-009 snapshot was updated solely to OWNER's already-present incoming 7973ccd section order (sjekk before sammenheng); no page data/order was changed to satisfy the old snapshot.
