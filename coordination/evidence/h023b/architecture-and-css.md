# Semantic resolver and CSS ownership

Every normal public page uses `resolveRouteFamily`, keyed by the validated kind. Unknown kinds fail. `SiteLayout` always loads the global theme and one HomeHeader/HomeFooter commercial chrome source. There are no visual-system flags, slug renderer arrays or conditional stylesheet links.

| Kind | Renderer / capabilities |
| --- | --- |
| home | HomePage; shared commercial binding |
| service | ServiceFamilyPage; generic hero/media, ordered sections, FAQ/CTA; optional validated composition only |
| index | InsightIndexPage; unchanged PageList source/query/media implementation |
| article | InnerPage article composition, exact text/anchors/metadata |
| pricing | PricingPage; existing shared offer/binding/order logic |
| assessment | InnerPage assessment composition; shared controls and unchanged default-off transport |
| utility | InnerPage utility composition; exact legal/contact/about content |

All five services use the same renderer. SEO, AI and e-commerce need no special anchors, proof or pricing. A future arbitrary service slug inherits this family automatically. Existing two-service behavior is represented only by the strict, implementation-owned metadata enumerated in `capability-metadata.md`. Missing/duplicate anchors, missing or ambiguous source links, unknown capabilities, wrong families and absent proof slots fail closed. Source records/gates independently retain all proof/price authority.

Dedicated glossary, design-system and404 also use the same global shell. The glossary's public text/source stays exact; design-system remains internal/noindex/unlisted with the QA controller only.

## Removed and retained CSS

`global.css` and all four public Invite/offer stylesheets have no remaining route import/link and are removed. Duplicate Header/Footer/ServicePage components have no callers and are removed. After the import switch, all60 baseline route/width copy/order/metadata/chrome/FAQ checks passed without these files; source searches confirm zero production references. `css-removal.json` records selector consumer proof and extraction/disposition.

| Owner | Responsibility |
| --- | --- |
| app.css | Tailwind4/daisyUI5, one optimalisering theme, layer order and global UI imports |
| typography.css | Unchanged approved semantic scale/fonts; global headings remain composition-neutral |
| surfaces.css | Shared geometry/spacing aliases and CMS surface rules; all brand colors resolve to the theme |
| project.css | Shared daisyUI type/control/card adapters; explicit CMS surfaces retain priority over flat defaults |
| shared.css | Shared document, chrome, section, form-label and article/utility layout/type roles; no alternate palette |
| compositions/home.css | HomePage hero/selector arrangement |
| compositions/sections.css | HomeSection editorial grids/spacing |
| compositions/calculator.css | HomeLeverage layout/results; exact existing math and scoped SVG untouched |
| compositions/assessment.css | HomeAssessment layout |
| compositions/package.css | PackageSection artwork/offer/order placement; routine fields/badges/buttons/cards use shared primitives |
| compositions/service.css | ServiceFamilyPage/InsightIndexPage hero/media/grid/bridge placement; no local routine card/form/button system |
| compositions/pricing.css | PricingPage layout and section placement |
| Existing scoped components | HomeProof/HomeHeroPhoto/PageList/ListingVisual retain their special compositions and exact protected source |

Four existing footer/calculator-error shades move into semantic OKLCH theme extensions with unchanged sRGB values. Decorative pricing artwork colors remain unique composition details. Routine placeholders use the shared muted token at opacity1; assessment button activation has no contrast-degrading color transition.

Historical task-specific frozen-CSS scripts remain historical fixtures of their delivered revisions; the maintained current verify/static/CMS/surface/type gates cover the migrated architecture. The surface inventory now recurses into component-owned CSS, so extraction does not weaken its guard.
