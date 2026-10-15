# H-024A2 correction evidence

Incoming main `dfc62a3` includes OWNER test reorder a1c8031 and duplicate calculator e2e2420. D-087/H024A2 is correction authority, not acceptance.

Homepage storage now has SEO, unchanged standalone Hero, eight ordered sections, and homepage.chrome only. Each special row owns its actual `content` object; content rows retain their existing fields. No old editable Selector/Calculator/Packages/Proof/Form/FAQ source remains. Assessment owns its protected introduction and form; FAQ owns labels/items. The renderer dispatches the array directly. Shared pricing/service/commercial views resolve the Packages block, and Hero proof resolves the Proof block. Derived in-memory views are not editable or persisted copies.

The original eight UUID/anchor identities and authorized default order are preserved. Only OWNER's explicit duplicate calculator is removed and the test order restored. `preservation.json` reconstructs every original field exactly after relocation and verifies166 unrelated content/config/reference files and five OWNER PNGs.

Primary validation: incoming malformed main already fails raw pageSchema and actual Astro ingestion before render (`incoming-invalid-build.log`); no contrary root cause is claimed. The correction adds fixed-count/required-identity checks and retains strict singleton/UID/anchor guards. `primary-astro-validation.json` records ten actual invalid-source Astro builds: each singleton duplicate, duplicate UID/anchor, missing required identity and unknown type. All fail with InvalidContentEntryDataError; exact source bytes and normal build are restored.

CMS: SEO -> Hero -> Sections -> global chrome. Every special draggable block has its full existing field schema inside the row. Native list min/max8 fixes the pilot count. Summaries use human names; UUIDs and singleton anchor/name metadata are hidden. Body guidance now points to Forside -> Seksjoner -> Pakker og priser. Existing merge:true, protected proof fields, package keys/order routes, form intro exclusion and all commercial facts remain.

Native platform boundary to check in hosted UI: [Pages CMS entry-form source](https://github.com/hunvreus/pagescms/blob/main/components/entry/entry-form.tsx) honors list bounds for outer add/remove, but always renders a type badge and allows its separate Remove block action unless the entire block is readonly. `label:false` falls back to the raw block name in this component, so localized labels are retained. Readonly also makes nested content readonly and is not a viable editor fix. No custom CMS UI or fabricated hidden-control evidence is introduced. Strict schema blocks invalid states from publication. Hosted behavior and any required OWNER decision will be recorded with the authenticated workflow.

Verification complete locally:

-128/128 tests and one full verify; CMS20/static17/surface/type checks pass;196 rendered typography groups with zero issues. Astro check: zero errors/warnings, one existing intake-script hint.
- Four homepage widths1440/900/390/320 match the original H-024A default text/order/geometry; ten unchanged Hero variant checks pass. Original baseline is reused because incoming OWNER duplicate is intentionally invalid, and the known original order is explicitly required.
- Source-backed edits to every special payload reach actual rendered consumers: selector heading; calculator visits/result; shared home/pricing price; proof slot hides lower proof and Hero overlay together; assessment introduction; FAQ heading/question. Disabled intake persists. Test source/build restored exactly.
- One independent final review finds no runtime/schema/migration/data-loss defects. Stale help paths are corrected; native type badge/clear behavior is explicitly a platform constraint requiring hosted verification.

Authenticated Packages-to-first/Git/exact-build/live-screenshot/restore evidence follows after push. Website preview requires a fresh navigation or reload after the native build succeeds; CMS Save alone is not an instant site preview.

H-024B untouched; H-022 parked; public copy, business logic, proof authority, noindex and disabled intake preserved.
