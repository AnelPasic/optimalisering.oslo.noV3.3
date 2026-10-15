# H-023A legacy CSS inventory

The adjacent JSON lists every plain selector rule in global.css and all four Invite/offer stylesheets with one of the required classifications. This declaration inventory does not parse nested at-rules as a full CSS AST. The source files remain authoritative. No rule is declared obsolete without usage proof.

| File | Current dependency / disposition |
| --- | --- |
| `global.css` | Legacy header/footer/InnerPage/assessment; shared layout/type rules. Button/form/FAQ rules are superseded on migrated instances but still needed by deferred routes. |
| `home-invite.css` | Homepage hero/selector/calculator/pricing/section/footer composition; also loaded for pricing, two services and index. Palette aliases are superseded by the theme adapter. Routine primitives are lower priority than daisyUI. |
| `pricing-invite.css` | `/priser/` intro/decision/order layout. Retain until H-023B pricing migration. |
| `service-invite.css` | Two service routes plus `/innsikt/`; structural assumptions documented in H023B-MIGRATION-PLAN.md. |
| `package-offer.css` | Shared compact/expanded pricing artwork, content and ordering composition. Keep; daisyUI owns migrated CTA/badge primitives. |

`typography.css` stays the shared approved type scale. `surfaces.css` retains semantic CMS mapping and spacing aliases; radius/field-border aliases now reference theme tokens. No CMS raw classes are introduced. `terminology.css` remains a genuinely unique accessible glossary/tooltip component. HomeProof, HomeHeroPhoto, HomeLeverage, PageList and ListingVisual keep scoped unique compositions; the bespoke range styling was removed because daisyUI now owns it.

| Primitive | H-023A decision |
| --- | --- |
| Navbar/menu | DaisyUI navbar and valid `ul.menu > li > a` in shared HomeHeader; existing toggle/Escape behavior retained. |
| Button | DaisyUI btn-primary/secondary on homepage, shared package CTA and header. Legacy hook retained for layout/tests. |
| Input/textarea/range | DaisyUI in homepage assessment/calculator, original validation/math/event handling. |
| Select | Used on design-system example; deferred assessment/order routes retain their current implementation. |
| Card | Existing selector/assessment structures adopt card; avoid wrapping flat editorial rows. Design route demonstrates ordinary, soft, dark and media variants. |
| Badge/alert | Shared package recommendation badge and homepage preview warning; demo states cover all semantic roles. |
| Collapse/details | Homepage FAQ retains native details/summary; daisyUI owns indicator. |
| Stats | Design-system result primitive uses placeholders; live proof/calculator keep their special, unchanged compositions. |
| Join/tabs | Evaluated; no real segmented navigation need, so not introduced. Theme Controller uses native radio controls. |

H-023B must remove proven obsolete declarations after each route-family migration, rather than delete styles while current consumers remain.
