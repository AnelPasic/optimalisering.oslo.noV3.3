# H-009 Synlighet service page and shared pricing

Incoming main **fd48a91a4c7353aa37cb55b9abd30efd8e18a9f7** supplies active H-009. Preserve D-027's corrected pricing support revision **d9f4751b1dfb3886953e9440304549e69f26b1ad** and D-028's exact Synlighet revision **cc02995a5b43d3d0ee28df23a4588ff09a16cd21**. Current JSON bytes/status/authority remain unchanged; the coordination decisions carry the scoped locks.

## Editing locations

The existing Pages CMS **Nettsider → synlighet** editor still owns the SEO/eyebrow/H1/intro, ordered sections/items/links, FAQ and CTA in `app/src/content/pages/synlighet.json`. H-009 renders every locked content field directly. Do not change D-028 copy or its structure without a new scoped handoff. No fields moved or second service form was added.

The **Forside og felles pakker → Forsidens innhold → Felles pakker for forsiden, /priser/ og /synlighet/** editor owns `home.json → homepage.packages`. The new compact service bridge reads the first two packages' names, prices, price/VAT suffixes and recommendation/badge directly from that object. Full packages remain on home and pricing. No price/package object was added to Synlighet JSON. Its repeated price/name/VAT facts in FAQ also bind to the same source at build time, preserving today's exact D-028 answer. See h008-pricing-cms.md for the approved pricing reference-template constraints; those remain in force. Future commercial changes require their own explicit authority.

ServicePricingBridge's two short contextual lines implement H-009's one-area versus combined-area routing. Those added interface sentences remain **DRAFT / NON-AUTHORITATIVE** under the existing shared-copy authority, pending this whole-page STRATEGY_CONTENT review. They introduce no numbers, terms, benefits or claims. The secondary hero label “Se priser” is supplied by H-009; the bridge's full-pricing link reuses D-028's existing label/target. FAQ/chrome labels use the current homepage content. No newly generated label is promoted by a status edit.

## Renderer boundary

`ServicePage.astro`, `ServicePricingBridge.astro` and `/styles/service-invite.css` provide the service pattern using the accepted homepage tokens and HomeSection/chrome. The route explicitly gates service mode to **slug=synlighet**. Other service pages still use their original renderer; existence of reusable components does not activate them elsewhere.

The hero is text-led, with quiet breadcrumb and two routes. Need items use three restrained cards; SEO/local SEO/AI visibility use open columns. Prioritization and the conversion connection are open editorial sections. The only commercial addition is the compact bridge; free-check CTA goes to `/#sjekk`. No local-SEO URL, rankings/citations/dashboard/photo/metrics, proof or extra form was added.

All 15 source page records, proof/guards, configuration/backend and protected reference inputs remain unchanged. All 15 non-Synlighet HTML outputs including 404 and their accepted CSS are byte-identical to the incoming build. Home/pricing styles and geometry match at 1440/390/320. Authenticated CMS connection/save remains a manual OWNER/editor action; local configuration/regression checks do not prove account access.

Stop for STRATEGY_CONTENT review of the complete `/synlighet/` page before `/konvertering/`, `/seo/`, `/ai-synlighet/` or other propagation. D-025 proof and production intake/launch gates remain unchanged.
