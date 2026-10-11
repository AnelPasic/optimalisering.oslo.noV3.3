# Proof candidate audit - 2026-10-11

Purpose: replace/defer Oslo Privatklinikk as homepage proof and rank the other known Medon evidence by commercial strength, evidence quality and publication readiness.

## Verdict

### Best fully cleared case now: Nysta

Status:
- naming permission: GRANTED
- public content lock: yes
- publication status: PUBLISHABLE
- source case already structured in this repo

Strongest clean public claim:
- checkout completion: 7,1 % -> 43,6 %
- comparison: 30 days before -> first 30 days after
- next 30 days: 58,1 %
- intervention: checkout CRO + Vipps/MobilePay
- limitation: checkout starters only; multiple changes in same period

Why it is strong:
- large before/after movement
- directly supports conversion optimization
- cleanly understandable
- already cleared

Why it is not ideal as the only homepage proof:
- ecommerce-specific
- proves conversion more than broad visibility + conversion

Recommended use:
- /konvertering/ now
- possible temporary homepage proof only if OWNER explicitly wants it

## Best homepage candidate if cleared: Eurotents

Prior proof work recorded:
- Telt campaign ROAS: 4,3x -> 17,2x
- spend: -20 %
- organic clicks: +52 %
- CTR: 3,8 % -> 7,2 %
- average position: 13,9 -> 8,5
- earlier GA4 proof work also recorded a substantial ecommerce conversion-rate improvement

Why it is commercially strong:
- combines paid visibility, organic visibility and ecommerce performance
- fits the whole Optimalisering Oslo story better than a single-channel case
- ROAS 4,3x -> 17,2x with lower spend is at least as compelling as the deferred clinic case

Current verification note:
- live Windsor GA4 check on 2026-10-11 for eurotents.com, Mar-Aug:
  - 2025: 177 467 sessions, 318 ecommerce purchases, purchaser rate 0,18 %
  - 2026: 33 665 sessions, 248 ecommerce purchases, purchaser rate 0,98 %
  - purchase revenue: 1 642 199 -> 1 284 641
- this strongly suggests tracking/site/migration comparability issues across the periods; do NOT publish the GA4 conversion-rate comparison without reconciling the measurement change.
- the clean ROAS and GSC claims from prior proof work need their exact source artifacts/periods re-imported before production use.
- current GSC Wizard connection cannot be re-queried because the subscription is inactive.

Blockers:
- exact source/provenance import for the ROAS/GSC claims
- comparable period lock
- naming/publication permission not established in the current V3.3 registry

Recommendation:
- first candidate to verify for homepage
- do not publish until the three blockers above are closed

## Strong visibility case: Helt Opplagt

Prior proof work recorded:
- organic clicks: 2 162 -> 4 181 (+93 %), Mar-Sep 2025 -> Mar-Sep 2026
- average position: 21,8 -> 12,2
- kantine clicks: +164 %
- catering clicks: +105 %
- 5 forms showed ChatGPT in attribution, 4 as first source

Important limitation:
- total forms fell 79 -> 67 in the compared period
- therefore this is a strong SEO/AI-visibility case, not a broad revenue/CRO homepage claim

Current live GA4 note:
- Mar-Sep 2025: 34 076 sessions, 550 key events
- Mar-Sep 2026: 13 205 sessions, 473 key events
- these GA4 totals do not replace the prior GSC evidence and reinforce the need to keep the claim scoped specifically to organic search visibility.

Blockers:
- exact GSC source artifact currently not re-queryable through GSC Wizard
- naming/publication permission not locked in current registry

Recommended use:
- /synlighet/ after source + permission lock
- not first choice for homepage

## Useful but weaker homepage proof: Tankeverksted

Prior verified evidence:
- Mar-Sep 2026 Google Ads spend: 28 181 kr
- 47 actual Gmail time bookings
- approximately 600 kr spend per actual booking
- Sep 2026: 3 807 kr / 10 bookings = approximately 381 kr

Strength:
- uses actual downstream bookings rather than platform conversion counts

Weakness:
- no comparable before period in the proof currently on hand
- therefore it proves acquisition efficiency, not improvement

Recommended use:
- Google Ads/service proof or operational proof
- weaker than Nysta/Eurotents for homepage

## Interesting but not ready: Oracles

Prior case work recorded:
- Shopify net sales: 101 606 kr in the first roughly six weeks after migration
- prior Q4 2024 WooCommerce sales: 75 421 kr
- conversion progressed 3,62 % -> 4,04 % -> 5,13 % across Dec-Feb
- no pre-migration GSC baseline

Current live GA4 check:
- Nov-Dec 2025: 8 528 sessions, 128 ecommerce purchases, purchaser rate 1,78 %
- GA4 purchase revenue: 69 416,20 kr

Problem:
- live GA4 revenue does not match the prior Shopify net-sales figure because they are different measurement systems/scopes
- periods are not cleanly comparable
- no current Shopify connector exists for Oracles

Recommended use:
- do not publish yet
- needs source reconciliation first

## Deferred: Oslo Privatklinikk

Current status:
- permission must be confirmed directly with client
- publicationApproved = false
- namingPermission = NEEDS_PERMISSION
- do not select/render until OWNER confirms

## Ranking for homepage

1. Eurotents - best strategic fit and potentially strongest broad proof, but requires source/permission cleanup
2. Nysta - strongest fully cleared proof today, but narrower ecommerce/CRO fit
3. Helt Opplagt - excellent Synlighet proof, weaker as broad homepage proof
4. Tankeverksted - credible actual-booking efficiency, lacks before/after
5. Oracles - promising but measurement/source mismatch makes it unsafe now

## Recommended next action

Do not block H-017C:
- implement Nysta on /konvertering/
- keep homepage proof empty but component-ready
- separately verify Eurotents source periods + publication permission
- if Eurotents clears, make it homepage proof
- if not, use Nysta as fallback or wait for Oslo Privatklinikk confirmation
