# daisyUI standard shared with MWS

This Oslo port follows MWS PR #106 (`38ee1bb`) and its native component cleanup. It keeps Oslo CMS records, brand fonts, full Light/sunset palettes, commercial content and intake configuration.

- Use native component classes and parts: Card/body/title/actions, Menu/dropdown/show, Breadcrumbs/list/current page, Stats/stat/value/title/description and Theme Controller.
- `styles/daisyui-overrides.css` registers the approved global type/control roles with Tailwind `@utility`; element utilities remain able to override them.
- Ordinary section cards share `ContentCard`; explicit plain items retain their editorial layout. Existing default section palette choices are retained through semantic surfaces.
- Use semantic background/content pairs for UI, including proof overlay, glossary, package captions and controls. Artwork colors remain intentional.
- Complete validated CMS themes provide all palettes. Emit the actual CMS default in HTML for initial paint/no-JS and native controller CSS for CSS-only switching. Supplemental Oslo Light/Dark roles apply only to their complete canonical palette signatures; custom palettes receive semantic fallbacks.
- The Header supports an optional native `default` CTA variant. Existing Oslo CTA selections are unchanged.
- Retired `invite-home`, `invite-service`, `invite-pricing`, `button`, `button-small` and `card-copy` class aliases. The site shell and page-family attributes scope remaining Oslo compositions.

Necessary composition adapters remain for independent parent links plus disclosures, mega-menu placement, the interactive glossary popover, calculator illustration and package/order layout. These retain their existing behavior.

Verification: Astro check/build plus Pagefind; focused component/navigation/theme/typography/Hero/glossary tests; existing responsive card/typography browser checks; keyboard menu/Escape, theme synchronization, glossary, calculator, FAQ and no-JS theme checks. No real form submissions or CMS save/restore is part of this visual cleanup.
