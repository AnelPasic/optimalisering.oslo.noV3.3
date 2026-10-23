# C0 / C1 – norsk lansering og header til vurdering

2026-10-23. Kilde: fersk `main` **d0df233e2eb311c95298e6d140c00bd27f29f198**, [closeout](COMMERCIAL-LAUNCH-CLOSEOUT-2026-10-23.md), AGENTS og gjeldende beslutninger D-119–D-126. **Read-only vurdering; ingen nettsideimplementasjon, CMS-save, push eller deploy.** Headerretning og lansering er ikke godkjent av denne rapporten.

## C0: det som faktisk hindrer norsk lansering

| Prioritet | Konkret hinder / kilde | Hva må lukkes, og av hvem |
| --- | --- | --- |
| BLOCKER B1 | Hoved-CTA går til `/#sjekk`. `HomeAssessment.astro` er hardt deaktivert og mangler transport også om lead-flagget åpnes. `AssessmentForm.astro` på `/vurdering/` har separat transport. `wrangler.jsonc` publiserer bare statiske assets; `server/index.mjs`/`http.mjs` er en separat Node/SQLite-API. Review GET `/api/leads` gir faktisk 404. | OWNER velger canonical sjekkvei; IMPLEMENTATION kobler valgt vei i eget scope. OPS velger og verifiserer API/HTTPS/Origin, privat varig lagring, avsender og overvåket mottaker, ratevern, sletting/backup og håndtering av mislykkede varsler. Deretter separat autorisert syntetisk ende-til-ende-test med faktisk innboksmottak. Ingen live POST her. |
| BLOCKER B2 | `/personvern/` og `/vilkar/` er eksplisitte utkast. `/kontakt/` oppgir at direkte e-post/telefon ikke er verifisert, og peker til det deaktiverte skjemaet. Kilder: de tre page-JSON-filene og `app/docs/intake-launch-readiness.md`. | OWNER/OPS gir faktiske kontakt-, behandlings- og avtaleopplysninger; STRATEGY_CONTENT ferdigstiller mot dette grunnlaget. Det finnes ikke en dokumentert fungerende alternativ kontaktkanal å lene lanseringen på. |
| BLOCKER B3 | Global `sjekk.json:18` lover **3 funn innen 2 virkedager**. `vurdering.json:20,83` og `vilkar.json:20` sier ingen fast svartid. `vilkar.json:44` sier offentlige månedspriser ikke er ferdigstilt, mens godkjent global prismaster viser 4 500 / 6 900 / fra 14 900 kr/mnd eks. mva. | OWNER avklarer operativt løfte og avtalevilkår; STRATEGY_CONTENT samordner de konkrete motstridende feltene. Bevar godkjent prismaster og OWNER-copy inntil eksplisitt endringshåndoff. Ingen prisendring er nødvendig ut fra dette funnet. |
| BLOCKER B4 | Alle **15** page-JSON og `copy-authority.json` står fortsatt som DRAFT. `scripts/preflight.mjs:7–23` blokkerer produksjonsbygg ved dette, uavhengig av tidligere delgodkjenninger. | OWNER + STRATEGY_CONTENT kobler faktiske revisjoner til eksisterende godkjenninger og lukker gjenværende reelle innholdsbeslutninger; IMPLEMENTATION konsumerer korrekt håndoff. Dette krever ikke ny omskriving av alt godkjent innhold, og løses ikke ved mekanisk statusbytte. D-119 CMS PASS skal ikke åpnes på nytt. |
| BLOCKER B5 | Faktisk domene-/driftslansering er ikke dokumentert for denne kandidaten. Review Worker gir 200 + `X-Robots-Tag: noindex, nofollow`, robots `Disallow: /`, tomt sitemap og intake av. `https://optimalisering.oslo.no/` svarer 200 med annen sidetittel enn kandidaten; dette beviser ikke kandidatens produksjonsutrulling. | Etter B1–B4: separat OWNER GO/NO-GO og OPS-plan for riktig domene, eksisterende URL-er/redirects, rollback og endelig canonical/robots/sitemap/flaggsjekk. Ingen flagg-/domeneendring følger denne vurderingen. |

**Kjent teknisk etterslep før intake kan få PASS:** 16/20 fokustester passerer; fire eldre intake-fixtures sender tom telefon og treffer nå 422 etter D-122s påkrevde telefon. Dagens tre felt ble kontrollert separat mot samme handler med minne-SQLite og falsk e-posttransport: alle tre pakkenøkler får 201, samme ID ved retry, totalt tre leads/tre konverteringer. Backendkontrakten avviser altså ikke dagens gyldige UI-payload. Varselmalen `server/resend.mjs:22` skriver imidlertid `Bedrift: undefined` / `Kontaktperson: undefined` når de gamle feltene utelates. Oppdater relevante fixtures og varselmal i separat avgrenset intake-arbeid; ikke legg nye felt tilbake i OWNERs skjema. Dette er ikke bevis på live levering.

**Proof er ikke en generell mangelliste:** Eurotents, Nysta og Helt Opplagt har GRANTED/PUBLISHABLE/publicationApproved i dagens register. Oslo Privatklinikk er fortsatt uten tillatelse og skal forbli utelatt. Bevar eksisterende pris-/proof-gates. D-126s to godkjente FAQ-svar finnes nå eksakt i faktisk hentet Worker-HTML; den gamle usikkerheten om bare FAQ-kildens publisering er dermed redusert. Ingen ny CMS-save eller eksakt native build-ID er verifisert her.

## Kort rutebrett

Felles B1–B5 gjelder lanseringen; tabellen legger ikke til femten separate eiergater.

| Rute | Gjenstående konkret sak |
| --- | --- |
| `/` | BLOCKER: global sjekk har ingen transport; svartidsløftet må avstemmes. IMPORTANT: tydeligere aktiv navigasjon og robust 320px-knapp. H-024C1 er allerede OWNER PASS. |
| `/synlighet/` | BLOCKER: samme globale sjekk. IMPORTANT: behold godkjent CMS-enkeltliste og nåværende prisinngang; vurder faktisk kjøpsvei sammen med headeren, uten ny CMS-migrering. |
| `/konvertering/` | BLOCKER: sjekk-CTA ender i samme deaktiverte inngang. IMPORTANT: behold godkjent tjenestepresentasjon og direkte prislenke. |
| `/priser/` | BLOCKER: faktisk bestillingsdrift/mottak mangler. IMPORTANT: dypelenke velger riktig pakke, men lander visuelt ved første kort på mobil; se C1. D-122s innebygde skjema beholdes. |
| `/vurdering/` | BLOCKER: default-off transport krever reell backend/levering; svartid strider mot global sjekk. |
| `/kontakt/` | BLOCKER: kun skjema på `/vurdering/` som kontaktvei, ingen verifiserte direkte kontaktopplysninger. |
| `/personvern/` | BLOCKER: faktiske mottakere, lagring, rettigheter og ansvarlig kontakt er ikke ferdigstilt. |
| `/vilkar/` | BLOCKER: eksplisitt avtaleutkast, foreldet pris-/svartidsbeskrivelse. |
| `/om/` | BLOCKER: inngår i den ulukkede innholdsautoriteten. Ingen særskilt kodefeil identifisert i denne avgrensede kontrollen. |
| `/seo/`, `/ai-synlighet/`, `/nettbutikkoptimalisering/` | BLOCKER: gjenværende sideautoritet må avklares for publisering. IMPORTANT: siste kunderelevante innholdsvurdering, ikke utrulling av CMS-piloten eller redesign. |
| `/innsikt/`, `/innsikt/hva-bor-optimaliseres-forst/`, `/innsikt/male-effekt-av-optimalisering/` | BLOCKER: samme innholdsautoritet. Lavere salgsprioritet enn kjøpsrutene; ingen påvist lenkefeil i byggets lenkekontroll. |

**OPTIONAL POST-LAUNCH:** EN, dark/system-tema, animasjon, generisk starteruttrekk og flere CMS-migreringer. Ingen av disse er forutsetning for første norske release.

## C1: seks faktiske steg i kundens vei

Alle seks ruter er sett lokalt ved **1440, 900, 390 og 320 px**. Ingen horisontal overflow i de 24 prøvene. Menyen er identisk, med Synlighet → Konvertering → Priser → Innsikt og én separat **Gratis sjekk**-CTA. 65px header i alle prøvene; den følger ikke med ved scrolling. Den nåværende rolige merkevaren, typografien, bildene og daisyUI-strukturen er et godt utgangspunkt.

| Steg | Tilstand / vurdering | Faktisk skjermbilde |
| --- | --- | --- |
| 1. Forside → velg tjeneste / pris / sjekk | God inngang: sjekk og priser er synlige i Hero. Hoved-CTA i headeren er også synlig på 320px. Ingen aktiv-side-markør. | [Desktop](evidence/c0c1-2026-10-23/home-1440.png), [mobil](evidence/c0c1-2026-10-23/home-320.png) |
| 2. Synlighet → priser eller sjekk | Tydelige neste valg. Pris er primær Hero-handling, gratis sjekk sekundær. Behold dette godkjente valget. | [Desktop](evidence/c0c1-2026-10-23/synlighet-1440.png), [mobil](evidence/c0c1-2026-10-23/synlighet-390.png) |
| 3. Konvertering → sjekk eller priser | Begge veier er tilgjengelige. Aktiv tjeneste mangler i headeren; breadcrumb finnes. | [Desktop](evidence/c0c1-2026-10-23/konvertering-1440.png), [mobil](evidence/c0c1-2026-10-23/konvertering-390.png) |
| 4. Priser → Bestill i kortet | Manuelt klikk åpner riktig kort med Nettside/E-post/Telefon og tydelig deaktivert preview-knapp. Legacy `?pakke=vekst#bestill` åpner Vekst i DOM, men etter 1,8 sekunder ligger det åpne panelet ca. 2739px under viewport-toppen, mens første Optimalisering-kort vises. Valgt-pakke-scroll må samordnes med fragmentnavigasjonen før denne inngangen kalles friksjonsfri. | [Priser](evidence/c0c1-2026-10-23/priser-1440.png), [åpent kort](evidence/c0c1-2026-10-23/order-open-390.png), [dypelenke](evidence/c0c1-2026-10-23/order-deeplink-390.png) |
| 5. Gratis sjekk | Headerklikk når faktisk `/#sjekk`; riktig globalt skjema vises. `/vurdering/` er en annen implementasjon av samme kjøpsoppgave. Begge er bevisst stengt. | [Global sjekk](evidence/c0c1-2026-10-23/free-check-390.png), [vurderingssiden](evidence/c0c1-2026-10-23/vurdering-1440.png) |
| 6. Kontakt → vurderingsskjema | Lenken er teknisk gyldig, men kunden sendes videre til et stengt skjema. Ingen verifisert telefon-/e-postreserve. | [Desktop](evidence/c0c1-2026-10-23/kontakt-1440.png), [mobil](evidence/c0c1-2026-10-23/kontakt-390.png) |

Mobilmenyen åpnes med **Enter og mellomrom**, Tab når første lenke, Escape lukker og gjenoppretter fokus på knappen. Navigasjon til Synlighet og resize til desktop lukker menyen. Fokusmarkøren er synlig. [Åpen meny](evidence/c0c1-2026-10-23/mobile-open-390.png) og [tastaturfokus](evidence/c0c1-2026-10-23/mobile-focus-390.png).

**Viktigst å forbedre:** `HomeHeader.astro:15,19` setter aldri `aria-current`; eksisterende CSS-støtte brukes ikke. Menyknappen er ca. **40×42px ved 390**, men krymper til **22,8×42px ved 320**. Mobilmenyens rader måler ca. 34px høye. Gi disse romsligere treffflater i valgt retning. Dette er konkrete brukbarhetsfunn, ikke en full WCAG-vurdering.

## Tre avgrensede headerretninger – A anbefales

Alle er forslag, **ikke implementert eller innholdslåst**. Samme Astro `HomeHeader`/`SiteLayout`, ekte daisyUI `navbar`/`menu`, eksisterende tokens, logo, fonter, farger og én hoved-CTA. Bestilling forblir i pakkekortet.

| Rang | Retning og konkret før → etter | KRO / brukervennlighet / avveining |
| --- | --- | --- |
| **1 – A** | **Flat, vedvarende kjøpsheader.** Behold dagens fire lenker og rekkefølge + Gratis sjekk. Gjør den eksisterende kompakte headeren sticky, marker aktiv side visuelt og med `aria-current="page"`, gi Priser en tydelig men sekundær vekt. Mobil beholder CTA + disclosure, med reserverte ca. 44px treffflater uten flex-krymping; ved 320 kan den dekorative CTA-pilen utgå for å bevare full etikett og 14px tekst. | Best samsvar med godkjent design og færrest nye valg. Sjekk forblir tilgjengelig når kunden har lest pris/proof; tjenestene er fortsatt direkte tilgjengelige. Mobil Priser krever fortsatt meny → Priser. Sticky må prøves visuelt mot ankere og lave skjermer før aksept. |
| 2 – B | **Samlet tjenestemeny.** Desktop får Tjenester (Synlighet/Konvertering) → Priser → Kontakt → Innsikt + samme Gratis sjekk. Mobil samme struktur med ett åpent undernivå. | Kortere hovedrad og synlig kontakt, men skjuler to kjerneinnganger bak et ekstra klikk og tilfører tastatur-/undermenylogikk. Mer arbeid og ny navigasjonsstruktur enn behovet tilsier nå. Kontakt må fortsatt få en fungerende destinasjon. |
| 3 – C | **To nivåer på mobil.** Desktop beholder flat meny. Mobil viser logo/Gratis sjekk/meny på øverste rad og Priser + Kontakt som sekundære tekstlenker på egen rad; tjenester/innsikt ligger i disclosure. | Rask prisinngang uten meny på mobil. Mer høyde skyver Hero ned, særlig ved 320px; gjentatte innganger og større visuelt avvik. Aktuelt bare hvis OWNER prioriterer pris/kontakt foran kompakt header. |

**Anbefaling:** velg A som neste avgrensede visuelle prøve. Den styrker den eksisterende kundeveien uten å endre tilbud, sidekomposisjon eller CMS. Forventet KRO-verdi er en faglig vurdering; ingen målt konverteringsøkning er dokumentert. B1–B5 må fremdeles lukkes separat.

## Verifikasjon og stopp

Bygg **19 sider PASS**. Statisk kontroll **619 interne lenker/ankere PASS** (skriptet teller 18 kontrollerte sider). Fokusert intake/order/lead **16 PASS / 4 FAIL** som beskrevet over; ingen full `verify` kjørt eller påstått. Dagens tre pakker er separat syntetisk verifisert med falsk e-posttransport. 29 lagrede skjermbilder er inspisert; autoritative mål/tastatur-/HTTP-funn ligger i [observations.json](evidence/c0c1-2026-10-23/observations.json), testkvittering i [verification.json](evidence/c0c1-2026-10-23/verification.json). Viewport-simulering i isolert Chrome, ikke fysisk mobil/screenreader/zoom-/kontrastrevisjon. Ingen live POST, CMS-save eller native Worker-build-verifikasjon her.

**Neste OWNER-valg:** A, B eller C før headerimplementasjon/visuell preview. **Neste forretningsavklaringer:** canonical sjekkvei og løftet svartid; faktiske kontakt-/personvern-/avtaleopplysninger; backend/mottaker/driftsansvar. Disse kan avklares uavhengig av headerens utseende. Alt kundeinnhold, CMS, priser, globale elementer, godkjent art og `system/`/`project/` er bevart. Ingen skjema-, indeks-, språk-, tema- eller produksjonsaktivering.
