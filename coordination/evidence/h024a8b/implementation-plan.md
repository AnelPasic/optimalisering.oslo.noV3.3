# H-024A8B implementation plan

> Execution: superpowers:executing-plans, inline; one independent whole-change review before delivery.

Goal: stock Pages CMS fixed protected records, one optional ordinary list with before/after placement, reversible non-rendered visibility.
Spec: ../../H024A8B-STOCK-PAGES-CMS-CONTINUATION.md / D-098, incoming b60fb3b.
Architecture: source `sections` becomes an object keyed by the eight stable IDs; `optionalSections` is the sole extra list. Runtime derives the same section array for existing consumers. One central visibility predicate filters rendering; commercial resolution retains full source authority.
Tech: existing Astro/Zod/Pages CMS/daisyUI, no dependencies/services/CSS additions.

Constraints: preserve incoming order behov/regneeksempel/sjekk/priser/resultater/mekanisme/passer/sporsmal, every original field/value/UUID, default page appearance, noindex and disabled intake. Fixed records have no list/block remove widget. Sjekk/priser cannot hide in this version because live inbound anchors exist. Proof hidden suppresses homepage derived Hero proof. Public source-backed design-system demos must respect hidden source. No H-024B/H-022/launch expansion.

- [ ] Capture baseline built HTML/hashes, four-width screenshots and original field/identity hashes plus consumer map.
- [ ] RED: source-model/placement/visibility/identity/CMS safety tests fail against current code.
- [ ] GREEN: home-builder fixed-source schema, insertion/visibility resolver; primary ingestion and exact source migration; stock fixed object editors and one optional content editor. Adapt existing tests/audits to new source shape without reducing protections.
- [ ] Default output/source-value parity, focused schema/editor tests and cross-route hidden fixtures (ordinary, FAQ/calculator/proof; protected linked hide rejected).
- [ ] Whole-change independent review; fix concrete findings; one bounded full verify.
- [ ] Publish implementation only to current native preview pipeline. Actual logged-in CMS create before calculator → move after FAQ → two rows same placement/native drag → hidden/unhidden/protected edit → optional deletion → exact migrated baseline restore, each native Git/build/Worker evidence.
- [ ] Final native assets/responsive/zero POST/error/default parity; coordination receipts and STOP OWNER UX/visual acceptance.

Review focus: hidden source leaking via design-system or proof Hero; persisted placement vs native list order; partial fixed record removal/identity mutation; CMS merge/sanitization and exact restore; public anchor safety/shared commercial authority.
Ruling: optional max16 bounds CMS list size for this pilot; does not admit special singleton types. Original CMS core order is fixed, an explicit D-098 tradeoff. No publishing value is materialized on unchanged records.
