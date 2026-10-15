# H-024A implementation evidence

Incoming main: `8100c53`; authority D-086 and exact H-024A contract.

The former fixed sequence in HomePage is replaced by a validated ordered dispatcher. Initial public order remains `behov, regneeksempel, priser, resultater, mekanisme, passer, sjekk, sporsmal`. Hero remains first, outside the list. Each block has an independent v4 UUID and stable anchor. Strict raw-source validation rejects duplicate singleton types, IDs/UUIDs, unknown blocks, duplicated singleton payloads, and content anchors colliding with controls/ARIA or reserved component namespaces.

| Block | Sole content source |
| --- | --- |
| selector | homepage.selector |
| calculator | homepage.calculator; existing math/component |
| packages | homepage.packages; shared pricing/order behavior |
| proof | homepage.proof plus unchanged registry/publication guards |
| content | editable block fields, rendered by existing shared HomeSection |
| assessment | homepage.assessmentSection (moved original introduction) + homepage.form |
| faq | page.faq + homepage.faqHeading/faqEyebrow |
| Hero | page.hero; original image/crop/CTA/text moved without duplication |

Shared page consumers receive derived Hero title/intro/CTA aliases at parse time; those aliases are not separate stored content sources. CMS `merge: true` remains. UUIDs are hidden, noneditable and nonregenerable; native block rows are collapsed with type/name summaries. Normal content blocks expose an editable anchor for safe additions, plus the accepted surface/alignment fields. Special blocks contain identity only.

CommercialHero owns structured content and layout. Its original first-sentence title emphasis is a small typed project treatment. Image-first desktop placement uses CSS; semantic/mobile order stays text first. All three layouts, centered without image and a long Norwegian heading use the real primitive on the internal noindex design-system route. Demo mode uses H2, preserving one document H1.

Verification:

- `before/` vs `after/`: exact homepage main text, metadata, section order and section/Hero/proof geometry at 1440/900/390/320. Menu/CTA/calculator/native FAQ/no-JS, disabled submission and no overflow/errors/POST pass.
- Ten real Hero demo browser checks at 1440/390; captures and `hero-montage.png`.
- Six local render fixtures: reorder, remove, add through shared content renderer, no singleton blocks, proof off, split-left without image. Temporary route removed and normal build restored.
- Final independent review found two defects: empty implicit column for split-left/none and collisions between new content anchors and form/ARIA IDs. Both fixed, with regression proof. No other findings.
- One local full verify passed 126/126 tests, CMS20/static17, source surfaces/type and 196 rendered typography groups. The one-time migration assertion was then moved into immutable `migration.json` so future legitimate CMS edits are not rejected by an old source snapshot; final focused suite 29/29 and Astro check pass with one existing intake-script hint. The final maintained suite also passes separately: 125/125. Connected native builds run the existing build/deploy command; they are not represented as a second full verify.
- `migration.json`: every preexisting homepage field reconstructed exactly semantically. `preservation.json`: 166 unrelated content/config/reference files unchanged, five untracked OWNER PNGs preserved.

Authenticated CMS reorder/build/restore and exact Worker receipts are complete; see `cms-roundtrip.md` and the source/native/preview JSON receipts. Technical delivery does not supply OWNER visual/content acceptance. H-022 stays parked; no H-024B, launch, indexing or intake activation.

Configuration references: [native block fields](https://pagescms.org/docs/configuration/fields/block/), [UUID options](https://pagescms.org/docs/configuration/fields/uuid/), [collapsed list summaries](https://pagescms.org/docs/configuration/content/list/).

Authenticated UI observation: native Pages CMS repeats a block-list description beneath every row and already displays the localized block-type badge. The final config therefore puts the brief order instruction once in the field label and uses the human row name as summary, avoiding repeated guidance and raw English block keys. The native drag handles and type badges remain.
