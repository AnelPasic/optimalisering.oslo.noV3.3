# H-026 component / cascade map

Incoming173f6c3; daisyUI5.7.50 official [Hero](https://daisyui.com/components/hero/) and [Footer](https://daisyui.com/components/footer/) documentation plus actual installed component CSS inspected2026-10-17.

| Area | Before | Actual reused component / after | Preserved project composition |
|---|---|---|---|
| Hero envelope | Semantic CommercialHero Section/header, family shell, hero-container, breadcrumbs and custom hero-frame | Same semantic envelope, then actual `hero > hero-content`. Hero's grid and hero-content's isolation/flex are active; Tailwind composes multi-part image/form grids. One shared renderer/source contract. | One wrapper keeps breadcrumbs outside daisyUI's shared grid row and retains exact outer shell geometry. No overlay is added because current foreground media is not a background overlay. |
| Four presets | data-driven custom frame grid rules in hero.css | Source resolver still supplies the four exact CMS layouts. Tailwind frame classes encode existing columns, gaps, max-width and alignment. Single-content layouts use native hero-content flex; multi-part layouts use the approved grid. | Family title/lead/margins, media aspect ratio/crop, proof and assessment auxiliary remain. Existing two grid-placement rules preserve text-first DOM with media-left desktop; no new public component system. |
| Hero defaults | Global .home-hero root grid rules overridden by later shared commercial styles | Removed superseded root grids and duplicated frame/grid/gap declarations. Existing outer padding and typography remain. | Scope avoids unrelated typography/profile cleanup just to increase reuse counts. |
| Footer container | `shell.footer-grid` with bespoke grid and nav flex rules | Existing shell wrapper contains native `footer.footer-grid` with footer-vertical/horizontal direction, Tailwind approved2/3-column tracks, gaps and padding. Native Footer navigation child grid is verified computed. | Shell remains outside component because daisyUI's width100% otherwise overrides the approved container widths. Existing mobile brand spans both columns; exact nav names/links/order and legal/glossary/preview content remain. |
| Footer title | Existing brand link styled as identity/title | Same visible brand link is `footer-title`, retaining its original case/opacity/font profile. Component supplies600 weight; no invented navigation headings, hidden duplicate labels or copy. | `normal-case`, `opacity-100`, margin0 preserve accepted brand rather than impose generic uppercase/dim title styling. |
| Footer identity / bottom | Ordinary block provider+preview identity and shared copyright row | Identity keeps block layout; nav lists use native grid. Bottom row is unchanged. | `justify-items-normal` restores native block paragraph width in identity group; the Footer component's child alignment otherwise shrink-wraps it. Copyright/provider/preview/legal roles remain exact. |

## Quantified change

PostCSS declaration census (css-census.json): hero.css247→201 (-46), shared.css437→422 (-15), net **61 declarations removed**, **no custom CSS declaration added**. Tailwind carries routine responsive layout. Remaining CSS is existing semantic typography/palette/accepted spacing and project-specific media/proof composition; no !important or specificity escalation.

## Evidence-driven rulings

- Footer provider initially shrink-wrapped under daisyUI's child place-items:start despite a block identity group. Actual computed width exposed the regression. The group's justify-items-normal utility restores original block sizing without replacing native nav layout.
- Centered copy must retain intrinsic width. Forcing w-full changed actual Synlighet copy x300.625→40. Only non-centered copy uses w-full; centered native flex/grid preserves old intrinsic sizing. All72 normal and208 source-preset comparisons then pass at1440/900/390/320.
- Existing standalone AssessmentForm enables its button in JS for local validation while keeping data-enabled=false and refusing transport. The initial test incorrectly equated this to a disabled button. Check the actual transport flag, preserve this existing form behavior; no submit or intake change.
- Native hero-content padding16px/max-width80rem would duplicate accepted outer padding or cap existing1440-shell composition. p-0 and existing profile width utilities adapt the real part; outer semantic profiles remain exact. No generic min-h-screen or hero-overlay is introduced.

## Scope exceptions

No entire Hero family is exempted from real daisyUI parts. All9 families and all4 presets use them. The assessment form, glossary category navigation,404 copy/home action, proof panel and image cropping retain their established semantic subcomponents; daisyUI has no authority to replace their content or behavior. The existing footer copyright row remains custom because a second Footer component/grid would complicate its accepted two-sided layout.
