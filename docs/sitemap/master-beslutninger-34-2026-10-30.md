# Optimalisering Oslo – sitemap, masterspesifikasjon og handoff

**Versjon:** 1.4 · **Dato:** 30.10.2026 · **Beslutningspunkt:** 34 avklart (NEI), 35 venter · **Status:** Plan / godkjente beslutninger, ikke implementert

> **Avgrensning:** Dette gjelder kun **optimalisering.oslo.no**. Ikke slå sammen strategi eller URL-struktur med **medon.no**. Godkjent betyr avklart i samtalen og dokumentert i GitHub, **ikke** at siden er utviklet eller publisert.

## 1. Handoff – les dette først

### Målet
Bygg en stor, gjennomarbeidet og kommersielt sterk tjenestearkitektur for Optimalisering Oslo: tydelige hovedtjenester, målrettede underside-tilbud og nyttig støtteinnhold. Primær effekt er relevante nye kunder og lønnsomme engangsprosjekter / månedlige avtaler, ikke antall URL-er i seg selv.

### Siste status
- **34 beslutningspunkter er avklart**, hvorav **33 godkjente tiltak og 1 avvist egen underside (#34)**, tilsvarende **39 godkjente nye/planlagte tjeneste-URL-er**. Nummer er beslutningspunkt, ikke unike URL-er.
- **#31 er JA:** `/google-shopping/merchant-center/` som underside under Google Shopping.
- **#32 er ANNET med eksplisitt JA:** `/google-ads/konverteringssporing/` godkjent som egen underside under Google Ads. Brukeren krevde samtidig fullstendige kunde-/leveransebriefs i backlog.
- **Innholdskontrakt:** Hver tjenesteside skal ha konkret kundeproblem, navngitte leveranser med forklaring, hvorfor egen URL, avgrensning, kommersiell modell og kvalitetskrav. Se `optimalisering-oslo-fullstendige-tjenestebriefs-34-2026-10-30.md` og `optimalisering-oslo-beslutninger-34-2026-10-30.json`.
- **#33 er JA:** `/meta-ads/konverteringssporing/` som egen underside under Meta Ads, med fullstendig brief og seks individuelt beskrevne leveranser.
- **#34 er NEI:** Ingen separat `/nettbutikkoptimalisering/handlekurv/`. Handlekurvoversikt, relevant mersalg og kryssalg dokumenteres som leveranser under allerede godkjent `/nettbutikkoptimalisering/kjopsflyt/`.
- **#35 er IKKE besluttet:** Kundelojalitet og gjenkjøp, mulig `/nettbutikkoptimalisering/gjenkjop/`; vurder mot `/epostmarkedsforing/`. Presenter JA/NEI/ANNET.
- **#15 særregel:** Omfattende A/B-testing er foreløpig bare inkludert i **Partner-pakken**; volumkrav og separat prising må respekteres.
- **Pakke-/prisfordeling for alle tjenester er utsatt** til etter sitemap-beslutningene. Ikke dikt opp bindende pakkepriser eller inkluderingsnivåer.
- **Ingen nettsidekode eller publiserte nettsider er endret** gjennom disse beslutningene. Strategi, detaljerte sidebriefs og issues er versjonert i GitHub fra punkt 32.

### Instruks ved fortsettelse i ny tråd
1. Bruk denne filen som beslutningsregister; ikke be om å godkjenne #1–#34 på nytt.
2. Vis **kun ett nytt beslutningspunkt av gangen**, med foreslått URL, hierarki, kundeproblem, konkret leveranse, overlapp/risiko, anbefaling og **JA / NEI / ANNET med kommentar**.
3. Når brukeren svarer, registrer faktisk valg og begrunnelse. Ikke konverter ANNET til ubetinget JA når brukeren har lagt til vilkår.
4. **Oppdater denne `.md`, detaljbriefene og den tilhørende `.json` etter hver avgjørelse**. Lever nye nedlastbare filer eller lagre i en eksplisitt valgt felles dokumentkilde; ikke påstå at tidligere nedlastinger automatisk oppdateres.
5. Oppdater kun versjonerte spesifikasjonsdokumenter og eksisterende plan-issues ved nye beslutninger; ikke endre nettsidekode, publisere eller låse priser uten separat klarsignal.
6. Etter full gjennomgang: konsolider sitemap, ranger implementeringsrekkefølge, lås navigasjon og sidemaler, og gjennomgå samtlige tjenester opp mot pakker/prising og kapasitet.

## 2. Godkjent sitemap – tjeneste-URL-er

| Punkt | Status | URL | Plassering | Hovedleveranse |
|---:|---|---|---|---|
| #1 | JA | `/landingssider/` | Hovedtjeneste | Bygge nye og forbedre eksisterende landingssider for kampanjer, leads, booking og salg |
| #2 | JA | `/konvertering/henvendelser-og-booking/` | Konvertering | Kontaktskjema, booking, brukerfriksjon, mobilflyt, sporing og integrasjoner |
| #3 | JA | `/nettbutikkoptimalisering/kjopsflyt/` | Nettbutikkoptimalisering | Handlekurv, checkout, frakt-/returinfo, frafall og relevant mersalg/kryssalg (jf. avslag #34) |
| #4 | JA | `/nettbutikkoptimalisering/produktsider/` | Nettbutikkoptimalisering | Produkt- og kategoripresentasjon, filtrering, SEO, meromsetning, Shopify/WooCommerce |
| #5 | JA | `/sporing-og-maling/` | Hovedtjeneste | GA4, GTM, konverteringer, kvalifiserte leads, salg, attribusjon og dashboards; personvernkontroller |
| #6 | JA | `/konvertering/budskap-og-tilbud/` | Konvertering | Verdiforslag, salgstekster, tilbud, tydelige CTA-er og tillit |
| #7 | JA | `/nettsidehastighet/` | Selvstendig tjenesteside | Core Web Vitals (LCP, INP, CLS), mobil, bilder, JS, caching og serverrespons |
| #8 | JA | `/kontinuerlig-optimalisering/` | Hovedtjeneste | Månedlig analyse, prioritering, implementering og måling av SEO/CRO-forbedringer |
| #9 | JA m/vilkår | `/annonseoptimalisering/` | Hovedtjeneste | Overordnet optimalisering av annonser, landingssider, sporing og konvertering |
| ↳ | JA m/vilkår | `/google-ads/` | Kanalspesifikk tjeneste | Søkeannonser, budgiving, søkeord, budsjett og konverteringsoptimalisering |
| ↳ | JA m/vilkår | `/meta-ads/` | Kanalspesifikk tjeneste | Facebook og Instagram: kampanjer, målgrupper, kreativt materiell, måling |
| ↳ | JA m/vilkår | `/google-shopping/` | Kanalspesifikk tjeneste | Shopping-annonser, produktfeed, Merchant Center og lønnsomhet |
| #10 | JA | `/konvertering/leadoppfolging/` | Konvertering | Oppfølging etter henvendelser, CRM, leadkvalifisering og påminnelser |
| #11 | Begge JA | `/seo/teknisk-seo/` | SEO | Crawling, indeksering, canonicals, redirects, schema og tekniske problemer |
| ↳ | Begge JA | `/seo/seo-analyse/` | SEO | Samlet SEO-revisjon: søkeord, konkurranse, teknikk, innhold og prioritering |
| #12 | JA | `/seo/innholdsoptimalisering/` | SEO | Forbedre innhold, lage målrettede sider, innholdsklynger, internlenking og AI-søk |
| #13 | JA | `/lokal-seo/google-maps/` | Lokal SEO | Bedriftsprofil, Maps, tjenester, anmeldelser og lokal synlighet |
| #14 | Begge JA | `/ai-synlighet/chatgpt/` | AI-synlighet | Synlighet og kildegrunnlag for ChatGPT-søk og AI-svar |
| ↳ | Begge JA | `/ai-synlighet/google-ai/` | AI-synlighet | Google AI Overviews/AI Mode; søkerelatert innhold og teknisk tilgjengelighet |
| #15 | JA m/vilkår | `/konvertering/ab-testing/` | Konvertering | Hypoteser, kontrollert eksperimentering, landingssider, skjema og resultatanalyse |
| #16 | Begge JA | `/seo/sokeordsanalyse/` | SEO | Søkeord, søkeintensjon, prioritering, konkurranse og sideplan |
| ↳ | Begge JA | `/seo/konkurrentanalyse/` | SEO | Organisk konkurrentanalyse: synlighet, innhold, søkeord og lenkeprofil |
| #17 | JA | `/seo/nettsidestruktur/` | SEO | Informasjonsarkitektur, hierarki, navigasjon, internlenking og URL-struktur |
| #18 | JA | `/seo/lenkebygging/` | SEO | Relevante redaksjonelle omtaler, referanser, lenkeprofil og digital PR |
| #19 | JA | `/seo/seo-migrering/` | SEO | CMS-/domene-/URL-migrering, redirectkart, indeksering og lanseringskontroll |
| #20 | JA | `/nettbutikkoptimalisering/sok-og-filtrering/` | Nettbutikkoptimalisering | Internt produktsøk, autofullføring, synonymer, filtre og nulltreff |
| #21 | JA | `/epostmarkedsforing/` | Hovedtjeneste | Nyhetsbrev, segmentering, automatiserte flyter, gjenkjøp og integrasjoner |
| #22 | JA | `/landingssider/google-ads/` | Landingssider | Landingssider for søkeannonser, samsvar mellom søkeintensjon og budskap, måling |
| #23 | JA | `/konvertering/mobiloptimalisering/` | Konvertering | Mobil navigasjon, lesbarhet, skjema, checkout og interaksjon; ikke bare hastighet |
| #24 | JA | `/konvertering/prissider/` | Konvertering | Prissider, pakketabeller, pakkevelgere, tydelige tillegg og CTA-er |
| #25 | JA | `/konvertering/brukertesting/` | Konvertering | UX-review, faktiske brukeroppgaver, atferdsanalyse og forbedringsplan |
| #26 | JA | `/universell-utforming/` | Selvstendig tjenesteside | WCAG/UU, kontrast, tastatur, semantikk, skjermleser, skjema og manuell testing |
| #27 | JA | `/lokal-seo/lokale-landingssider/` | Lokal SEO | Reelle geografiske tjenestesider for aktuelle byer og serviceområder |
| #28 | JA | `/lokal-seo/flere-lokasjoner/` | Lokal SEO | Flere faktiske avdelinger, GBP-profiler, avdelingssider og sentralisert lokal rapportering |
| #29 | JA | `/google-ads/kontoanalyse/` | Google Ads | Uavhengig Ads-audit: søketermer, budgivning, budsjett, konverteringssporing og landing |
| #30 | JA | `/meta-ads/kontoanalyse/` | Meta Ads | Kampanjer, kreativt materiell, målgrupper, Meta Pixel/CAPI, attribusjon og lønnsomhet |
| #31 | JA | `/google-shopping/merchant-center/` | Google Shopping | Merchant Center, feilmeldinger, produkttitler/attributter, feed, godkjenning og synk |
| #32 | ANNET (JA) | `/google-ads/konverteringssporing/` | Google Ads | Google tag, GTM, GA4-import, enhanced/offline conversions, samtykke, deduplisering og QA |
| #33 | JA | `/meta-ads/konverteringssporing/` | Meta Ads | Meta Pixel, CAPI, deduplisering, e-handels-/lead-events, integrasjoner, samtykke og QA |

**Avvist forslag (#34, IKKE med i godkjent sitemap):** `/nettbutikkoptimalisering/handlekurv/` – handlevogn og mersalg innlemmes i `/nettbutikkoptimalisering/kjopsflyt/`.

## 3. Beslutningslogg – én oppføring per punkt

### 01. Landingssider — JA

- **/landingssider/** · Hovedtjeneste
  - **Dekker:** Bygge nye og forbedre eksisterende landingssider for kampanjer, leads, booking og salg.
  - **Leveranse:** Analyse, design/implementering, CRO og måling.

### 02. Skjema og bookingflyt — JA

- **/konvertering/henvendelser-og-booking/** · Konvertering
  - **Dekker:** Kontaktskjema, booking, brukerfriksjon, mobilflyt, sporing og integrasjoner.
  - **Leveranse:** Analyse, forbedring og integrasjoner.

### 03. Kjøpsflyt og checkout — JA

- **/nettbutikkoptimalisering/kjopsflyt/** · Nettbutikkoptimalisering
  - **Dekker:** Handlekurv, checkout, betalingsflyt, frakt- og returinfo, frafall.
  - **Leveranse:** Kartlegging, implementering og måling av fullførte kjøp.

### 04. Produkt- og kategorisider — JA

- **/nettbutikkoptimalisering/produktsider/** · Nettbutikkoptimalisering
  - **Dekker:** Produkt- og kategoripresentasjon, filtrering, SEO, meromsetning, Shopify/WooCommerce.
  - **Leveranse:** Analyse, forbedring og løpende optimalisering.

### 05. Sporing og måling — JA

- **/sporing-og-maling/** · Hovedtjeneste
  - **Dekker:** GA4, GTM, konverteringer, kvalifiserte leads, salg, attribusjon og dashboards; personvernkontroller.
  - **Leveranse:** Oppsett, QA, feilsøking og rapportering.

### 06. Budskap og tilbud — JA

- **/konvertering/budskap-og-tilbud/** · Konvertering
  - **Dekker:** Verdiforslag, salgstekster, tilbud, tydelige CTA-er og tillit.
  - **Leveranse:** Analyse, tekst/strukturforbedring og testing ved tilstrekkelig datagrunnlag.

### 07. Nettsidehastighet og ytelse — JA

- **/nettsidehastighet/** · Selvstendig tjenesteside
  - **Dekker:** Core Web Vitals (LCP, INP, CLS), mobil, bilder, JS, caching og serverrespons.
  - **Leveranse:** Ytelsesanalyse og teknisk implementering.

### 08. Kontinuerlig optimalisering — JA

- **/kontinuerlig-optimalisering/** · Hovedtjeneste
  - **Dekker:** Månedlig analyse, prioritering, implementering og måling av SEO/CRO-forbedringer.
  - **Leveranse:** Avgrenset månedlig arbeidskapasitet; tydelige prioriteringer og rapportering.

### 09. Kampanje- og annonseoptimalisering — ANNET: JA + tre egne kanal-/formatsider

- **/annonseoptimalisering/** · Hovedtjeneste
  - **Dekker:** Overordnet optimalisering av annonser, landingssider, sporing og konvertering.
  - **Leveranse:** Analyse og løpende annonsedrift.
- **/google-ads/** · Kanalspesifikk tjeneste
  - **Dekker:** Søkeannonser, budgiving, søkeord, budsjett og konverteringsoptimalisering.
  - **Leveranse:** Oppsett, drift og optimalisering.
- **/meta-ads/** · Kanalspesifikk tjeneste
  - **Dekker:** Facebook og Instagram: kampanjer, målgrupper, kreativt materiell, måling.
  - **Leveranse:** Oppsett, drift og optimalisering.
- **/google-shopping/** · Kanalspesifikk tjeneste
  - **Dekker:** Shopping-annonser, produktfeed, Merchant Center og lønnsomhet.
  - **Leveranse:** Kampanjeoppsett, feed-samspill og optimalisering.
- **Bindende beslutningsvilkår:** Fire separate sider ble krevd og godkjent: overordnet annonseoptimalisering, Google Ads, Meta Ads og Google Shopping.

### 10. Leadoppfølging og automasjon — JA

- **/konvertering/leadoppfolging/** · Konvertering
  - **Dekker:** Oppfølging etter henvendelser, CRM, leadkvalifisering og påminnelser.
  - **Leveranse:** Oppsett, integrasjoner, måling og forbedring.

### 11. Teknisk SEO og SEO-analyse — JA: begge

- **/seo/teknisk-seo/** · SEO
  - **Dekker:** Crawling, indeksering, canonicals, redirects, schema og tekniske problemer.
  - **Leveranse:** Teknisk audit og feilretting.
- **/seo/seo-analyse/** · SEO
  - **Dekker:** Samlet SEO-revisjon: søkeord, konkurranse, teknikk, innhold og prioritering.
  - **Leveranse:** Grundig analyse og handlingsplan; skilles fra kort vurdering på /vurdering/.

### 12. Innholdsoptimalisering og SEO-innhold — JA

- **/seo/innholdsoptimalisering/** · SEO
  - **Dekker:** Forbedre innhold, lage målrettede sider, innholdsklynger, internlenking og AI-søk.
  - **Leveranse:** Innholdsanalyse, produksjon og vedlikehold.

### 13. Google Maps og Google bedriftsprofil — JA

- **/lokal-seo/google-maps/** · Lokal SEO
  - **Dekker:** Bedriftsprofil, Maps, tjenester, anmeldelser og lokal synlighet.
  - **Leveranse:** Profilgjennomgang, forbedring og drift; /innsikt/google-bedriftsprofil/ beholdes som guide.

### 14. AI-synlighet i ChatGPT og Google AI — JA: begge

- **/ai-synlighet/chatgpt/** · AI-synlighet
  - **Dekker:** Synlighet og kildegrunnlag for ChatGPT-søk og AI-svar.
  - **Leveranse:** Kartlegging, innholds-/tekniske forbedringer og måling.
- **/ai-synlighet/google-ai/** · AI-synlighet
  - **Dekker:** Google AI Overviews/AI Mode; søkerelatert innhold og teknisk tilgjengelighet.
  - **Leveranse:** Analyse, optimalisering og oppfølging.

### 15. A/B-testing og konverteringseksperimenter — ANNET: JA; foreløpig bare Partner-pakken

- **/konvertering/ab-testing/** · Konvertering
  - **Dekker:** Hypoteser, kontrollert eksperimentering, landingssider, skjema og resultatanalyse.
  - **Leveranse:** Testplan, implementering og evaluering når volum tillater det; alternativ kvalitativ testing ellers.
- **Bindende beslutningsvilkår:** Foreløpig kun Partner-pakken for omfattende A/B-testing. Endelig pakkematrise tas etter hele sitemap-gjennomgangen.

### 16. Søkeordsanalyse og konkurrentanalyse — BEGGE

- **/seo/sokeordsanalyse/** · SEO
  - **Dekker:** Søkeord, søkeintensjon, prioritering, konkurranse og sideplan.
  - **Leveranse:** Analyse og prioritert SEO-/innholdsplan.
- **/seo/konkurrentanalyse/** · SEO
  - **Dekker:** Organisk konkurrentanalyse: synlighet, innhold, søkeord og lenkeprofil.
  - **Leveranse:** Analyse av muligheter og handlingsplan.
- **Bindende beslutningsvilkår:** Brukeren valgte eksplisitt BEGGE selv om anbefalingen opprinnelig var én side.

### 17. Nettsidestruktur og internlenking — JA

- **/seo/nettsidestruktur/** · SEO
  - **Dekker:** Informasjonsarkitektur, hierarki, navigasjon, internlenking og URL-struktur.
  - **Leveranse:** Strukturanalyse og implementering.

### 18. Lenkebygging og digital PR — JA

- **/seo/lenkebygging/** · SEO
  - **Dekker:** Relevante redaksjonelle omtaler, referanser, lenkeprofil og digital PR.
  - **Leveranse:** Strategi, originalt innhold og legitimt oppsøkende arbeid; ingen PBN/spam/garantier.

### 19. SEO ved redesign og migrering — JA

- **/seo/seo-migrering/** · SEO
  - **Dekker:** CMS-/domene-/URL-migrering, redirectkart, indeksering og lanseringskontroll.
  - **Leveranse:** Prosjektbasert før-/under-/etterkontroll; ingen garanti mot rangeringstap.

### 20. Produktsøk og filtrering — JA

- **/nettbutikkoptimalisering/sok-og-filtrering/** · Nettbutikkoptimalisering
  - **Dekker:** Internt produktsøk, autofullføring, synonymer, filtre og nulltreff.
  - **Leveranse:** Analyse og implementering, særlig større produktkataloger.

### 21. E-postmarkedsføring og automatiserte kundeflyter — JA

- **/epostmarkedsforing/** · Hovedtjeneste
  - **Dekker:** Nyhetsbrev, segmentering, automatiserte flyter, gjenkjøp og integrasjoner.
  - **Leveranse:** Oppsett og løpende kampanjer; samtykke og personvern må ivaretas.

### 22. Google Ads-landingssider — JA

- **/landingssider/google-ads/** · Landingssider
  - **Dekker:** Landingssider for søkeannonser, samsvar mellom søkeintensjon og budskap, måling.
  - **Leveranse:** Bygge/forbedre landingssider og løpende CRO; omfattende A/B-testing for Partner.

### 23. Mobiloptimalisering — JA

- **/konvertering/mobiloptimalisering/** · Konvertering
  - **Dekker:** Mobil navigasjon, lesbarhet, skjema, checkout og interaksjon; ikke bare hastighet.
  - **Leveranse:** Mobil UX-gjennomgang og gjennomføring av forbedringer.

### 24. Pris- og pakkepresentasjon — JA

- **/konvertering/prissider/** · Konvertering
  - **Dekker:** Prissider, pakketabeller, pakkevelgere, tydelige tillegg og CTA-er.
  - **Leveranse:** Analyse, design og implementering; ikke økonomisk prisstrategi i seg selv.

### 25. UX-analyse og brukertesting — JA

- **/konvertering/brukertesting/** · Konvertering
  - **Dekker:** UX-review, faktiske brukeroppgaver, atferdsanalyse og forbedringsplan.
  - **Leveranse:** Ekspertgjennomgang eller separat priset omfattende brukertesting.

### 26. Universell utforming og tilgjengelighet — JA

- **/universell-utforming/** · Selvstendig tjenesteside
  - **Dekker:** WCAG/UU, kontrast, tastatur, semantikk, skjermleser, skjema og manuell testing.
  - **Leveranse:** UU-kartlegging, feilretting og kontroll; ikke lov 100% compliance fra automatisk scan.

### 27. Lokale landingssider og geografisk SEO — JA

- **/lokal-seo/lokale-landingssider/** · Lokal SEO
  - **Dekker:** Reelle geografiske tjenestesider for aktuelle byer og serviceområder.
  - **Leveranse:** Geografisk analyse, relevante sider og vedlikehold; ingen masseproduserte doorway-sider.

### 28. Lokal SEO for flere lokasjoner — JA

- **/lokal-seo/flere-lokasjoner/** · Lokal SEO
  - **Dekker:** Flere faktiske avdelinger, GBP-profiler, avdelingssider og sentralisert lokal rapportering.
  - **Leveranse:** Oppsett og grunnpris + månedlig oppfølging per avdeling, priser senere.

### 29. Google Ads-kontoanalyse — JA

- **/google-ads/kontoanalyse/** · Google Ads
  - **Dekker:** Uavhengig Ads-audit: søketermer, budgivning, budsjett, konverteringssporing og landing.
  - **Leveranse:** Betalt analyse, ingen kontoendringer uten avtale; tiltaksplan og mulig månedlig oppfølging.

### 30. Meta Ads-analyse og kontorevisjon — JA

- **/meta-ads/kontoanalyse/** · Meta Ads
  - **Dekker:** Kampanjer, kreativt materiell, målgrupper, Meta Pixel/CAPI, attribusjon og lønnsomhet.
  - **Leveranse:** Betalt uavhengig analyse, handlingsplan, mulig løpende drift.

### 31. Google Merchant Center og produktfeed — JA

- **/google-shopping/merchant-center/** · Google Shopping
  - **Dekker:** Merchant Center, feilmeldinger, produkttitler/attributter, feed, godkjenning og synk.
  - **Leveranse:** Analyse, oppsett, feilretting og løpende vedlikehold; ingen godkjenningsgaranti.

## 3B. Begrunnelsen og tankegangen – én sidebrief per godkjent URL

> **Beslutningsgrunnlag, ikke utviklet tekstinnhold.** Problem og rasjonale nedenfor er posisjoneringshypoteser fra samtalen – ikke dokumenterte markedsdata. Detaljene skal senere kvalitetssikres mot faktisk søkeintensjon, leveransekapasitet, dokumenterbare bevis og konkurransebildet. Dette er likevel den **bevarte tankegangen bak godkjenningene**, slik at den ikke forsvinner ved trådbytte.

### #01 · `/landingssider/` — Landingssider

- **Kundeproblem:** Besøkende fra annonser eller kampanjer lander på generelle sider og mangler en tydelig vei til kontakt, booking eller kjøp.
- **Hvorfor egen side:** Egen hovedtjeneste fordi kunden konkret kan bestille ny landingsside eller forbedring av eksisterende side, uavhengig av full nettsideproduksjon.
- **Avgrensning / nabosider:** Skiller seg fra /google-ads/ (annonsekampanje) og /landingssider/google-ads/ (annonserelatert spesialisering). Sidens fokus er målrettede landing-/kampanjesider på tvers av kanaler.
- **Leveranse og salgsløp:** Analyse → prototype/tekst/bygg → sporingsoppsett → lansering; engangsprosjekt med mulig CRO-retainer. Primær CTA: «Få vurdert landingssiden».
- **Kvalitetskrav / forbehold:** Ikke lov konverteringsløft før det kan måles. Vis mobilversjon, tydelig tilbud, sosialt bevis og ett hovedmål per landingsside.

### #02 · `/konvertering/henvendelser-og-booking/` — Skjema og bookingflyt

- **Kundeproblem:** Kunden er interessert, men lange skjemaer, dårlig mobilflyt eller uklar booking skaper frafall.
- **Hvorfor egen side:** Egen underside fordi skjema-/bookingoptimalisering er en konkret teknisk og UX-orientert leveranse som kan avgrenses og prises.
- **Avgrensning / nabosider:** Konvertering skjer før innsendelse; /konvertering/leadoppfolging/ håndterer det som skjer etter innsendelse. Ikke bland dette med full CRM-implementering.
- **Leveranse og salgsløp:** Mål friksjon → forenkle felt/validering → sikre levering/integrasjon → test → mål kvalifiserte forespørsler. Prosjekt eller del av retainer.
- **Kvalitetskrav / forbehold:** Beskytt mot spam og datatap; personvern og nødvendige samtykker må være på plass; test innsending og mottak ende-til-ende.

### #03 · `/nettbutikkoptimalisering/kjopsflyt/` — Kjøpsflyt og checkout (utvidet ved #34)

- **Kundeproblem:** Kunder legger produkter i kurven, men fullfører ikke betalingen fordi flyten er tung, uklar eller skaper mistillit.
- **Hvorfor egen side:** Egen underside fordi kjøpsfullføring løser en separat del av kundereisen og har direkte kommersiell relevans.
- **Avgrensning / nabosider:** /produktsider/ hjelper kunden å velge produkter; /sok-og-filtrering/ hjelper å finne dem; denne siden handler om cart, checkout, betalings- og fraktvalg.
- **Leveranse og salgsløp:** Kartlegg checkout-trakt → kontroller frakt, retur, betalingsalternativer og felter → implementer prioriterte forbedringer → mål fullføringsgrad.
- **Kvalitetskrav / forbehold:** Ikke lov endringer i betalingsleverandør uten risikovurdering. Ta hensyn til Shopify/WooCommerce-plattformbegrensninger og sikkerhet.

**Beslutning #34 (NEI, innlemmet i denne siden):** Ingen egen `/nettbutikkoptimalisering/handlekurv/`. På denne siden må «Dette kan vi levere» også beskrive (1) **handlekurvens oversikt og tydelighet** – produkter, antall, varianter, totalsum, CTA og mobil, og (2) **relevante tilleggsprodukter/mersalg** – kryssalg uten å distrahere fra fullføring. Vurder både fullføringsgrad og gjennomsnittlig ordreverdi. E-postbasert oppfølging av avbrutte handlekurver ligger under `/epostmarkedsforing/` med egne kommunikasjons-/samtykkekrav.

### #04 · `/nettbutikkoptimalisering/produktsider/` — Produkt- og kategorisider

- **Kundeproblem:** Produktsider og kategorier hjelper ikke kunden å forstå, sammenligne eller velge riktig vare; søk og salg lider.
- **Hvorfor egen side:** Egen side fordi varepresentasjon, kategorioppsett, merchandising og produkt-SEO er en egen leveranse med målbart potensial.
- **Avgrensning / nabosider:** Ikke dupliser /sok-og-filtrering/ (produktfunn) eller /kjopsflyt/ (betaling). Her ligger informasjon, vurdering og legg-i-handlekurv.
- **Leveranse og salgsløp:** Kartlegg produkt-/kategorireiser → forbedre beskrivelser, varianter, bilder, filtre og tillitsinformasjon → mål visninger, add-to-cart og salgsverdi.
- **Kvalitetskrav / forbehold:** Produktpåstander, lager, priser og strukturert data må samsvare med faktisk varedata. Prioriter representative maler framfor manuell oppussing av alt.

### #05 · `/sporing-og-maling/` — Sporing og måling

- **Kundeproblem:** Bedriften vet ikke hvilke kanaler og aktiviteter som gir kvalifiserte henvendelser, bookinger eller salg.
- **Hvorfor egen side:** Egen hovedtjeneste fordi korrekt måling har selvstendig kjøpsverdi og legger grunnlag for videre optimalisering og månedsavtaler.
- **Avgrensning / nabosider:** Tverrkanal måling (GA4, GTM, eventer, attribusjon, dashboards). Ikke forveksle med spesifikk Google Ads-konverteringssporing i punkt 32.
- **Leveranse og salgsløp:** Måleplan → implementering → QA → dokumentasjon → dashboard og løpende datakvalitetskontroll. Tilby audit og fast oppfølging.
- **Kvalitetskrav / forbehold:** Håndter personvern, samtykke, falske/dupliserte konverteringer og attribusjonsusikkerhet. LeadProof kan være en fordel, ikke en forutsetning.

### #06 · `/konvertering/budskap-og-tilbud/` — Budskap og tilbud

- **Kundeproblem:** Besøkende forstår ikke verdien, hvem tilbudet passer for eller hvorfor de skal velge denne leverandøren.
- **Hvorfor egen side:** Egen underside fordi copy, verdiforslag og tilbudsdesign ofte er roten til svake konverteringer selv om teknologien virker.
- **Avgrensning / nabosider:** Bredere enn /prissider/ (pris-/pakkevalg); annerledes enn SEO-innhold, som primært dekker søkeintensjon og synlighet.
- **Leveranse og salgsløp:** Intervju/innsikt → tydelig verdiforslag → forbedre overskrifter, bevis og CTA-er → eventuelt eksperimentere når datagrunnlaget holder.
- **Kvalitetskrav / forbehold:** Unngå udokumenterte superlativer og falske garantier. Ikke selg dette som ren volum-copywriting.

### #07 · `/nettsidehastighet/` — Nettsidehastighet og ytelse

- **Kundeproblem:** Nettsiden responderer tregt, flytter på innhold eller fungerer dårlig på mobil og skaper friksjon.
- **Hvorfor egen side:** Konkret teknisk inngangstjeneste med før-/etter-måling som kunden kan forstå.
- **Avgrensning / nabosider:** Core Web Vitals, ressurslast og hosting; ikke samme som teknisk SEO (crawling/indeksering) eller mobiloptimalisering (UX/konvertering).
- **Leveranse og salgsløp:** Mål lab- og feltdata → prioriter LCP/INP/CLS og flaskehalser → implementer → verifiser med samme målemetode. Prosjekt og vedlikehold.
- **Kvalitetskrav / forbehold:** Skill syntetiske målinger fra reelle brukerdata. Effekt på rangering og salg kan ikke garanteres.

### #08 · `/kontinuerlig-optimalisering/` — Kontinuerlig optimalisering

- **Kundeproblem:** Etter lansering forbedres ikke nettsiden; rapporter produseres uten at noen prioriterer og utfører tiltak.
- **Hvorfor egen side:** Kommersiell hovedtjeneste for månedlig inntekt og langsiktig verdi, basert på prioriterte SEO-/CRO-/UX-tiltak.
- **Avgrensning / nabosider:** Ikke en ubegrenset samlepakkeløsning. En retainer er avtalt kapasitet og tydelig resultatoppfølging, ikke alle spesialisttjenester inkludert.
- **Leveranse og salgsløp:** Oppstartsmåling → prioritert backlog → avgrensede månedstiltak → endringslogg/rapport → neste prioritering. CTA: «Få en plan for månedlig forbedring».
- **Kvalitetskrav / forbehold:** Lås time-/oppgavekapasitet, respons, avhengigheter, ekskluderte kostnader og testing før pris oppgis.

### #09 · `/annonseoptimalisering/` — Kampanje- og annonseoptimalisering

- **Kundeproblem:** Annonseinvestering og landingsopplevelse behandles hver for seg, slik at kunden ikke får nok salg eller leads av trafikken.
- **Hvorfor egen side:** Overordnet inngang for bedrifter som trenger helhetlig optimalisering på tvers av annonsekanaler og kundereise.
- **Avgrensning / nabosider:** Hub som leder til /google-ads/, /meta-ads/ og /google-shopping/. Ikke dupliser hver kanalspesifikke tjenesteside.
- **Leveranse og salgsløp:** Diagnose → anbefal riktig kanal/arbeidsform → oppsett/drift/landing/sporing. Egner seg for månedlig avtale.
- **Kvalitetskrav / forbehold:** Oppgi alltid at mediebudsjett kommer i tillegg; ikke lov ROAS. Ikke bland innhold/SEO inn i annonsedrift uten tydelig scope.

### #09 · `/google-ads/` — Kampanje- og annonseoptimalisering

- **Kundeproblem:** Eksisterende eller nye søkeannonser bruker budsjett uten å tiltrekke nok kvalifiserte kunder.
- **Hvorfor egen side:** Egen kanalspesifikk kjøpsintensjon for oppsett, drift og løpende forbedring av Google Ads.
- **Avgrensning / nabosider:** Hovedtjenesten skiller seg fra /google-ads/kontoanalyse/ (uavhengig audit) og /landingssider/google-ads/ (destinasjonssiden).
- **Leveranse og salgsløp:** Kampanjeaudit → måling → søketerm-/annonse-/budstrategi → landingssider → løpende optimalisering. Månedlig honorar + annonsebudsjett.
- **Kvalitetskrav / forbehold:** Vurder målgruppe og lønnsomhet før økt budsjett. Tydelig skill mellom Ads-attribusjon og faktisk meromsetning.

### #09 · `/meta-ads/` — Kampanje- og annonseoptimalisering

- **Kundeproblem:** Facebook- og Instagram-kampanjer får visninger og klikk, men mangler riktig kreativt materiell, kundesamsvar eller konverteringsmåling.
- **Hvorfor egen side:** Egen etterspurt kanal med andre optimaliseringsmekanismer enn søkeannonser.
- **Avgrensning / nabosider:** Hovedtjeneste for løpende Meta-drift; /meta-ads/kontoanalyse/ er uavhengig revisjon før eventuell overtakelse.
- **Leveranse og salgsløp:** Måleplan/pixel → kampanjestruktur → kreative iterasjoner → landingssider → løpende CPA/ROAS- og kvalitetsvurdering.
- **Kvalitetskrav / forbehold:** Mediebudsjett og kreativ produksjon prises eksplisitt; samtykke og CAPI/deduplisering må kvalitetssikres.

### #09 · `/google-shopping/` — Kampanje- og annonseoptimalisering

- **Kundeproblem:** Nettbutikken annonserer produkter, men produktfeed og kampanjer utnytter ikke sortimentet lønnsomt.
- **Hvorfor egen side:** Egen kommersiell tjeneste rettet mot Shopping-kampanjer og nettbutikkøkonomi.
- **Avgrensning / nabosider:** Skiller seg fra /google-shopping/merchant-center/, som fokuserer på datafeil, feeder og godkjenning framfor annonsedrift.
- **Leveranse og salgsløp:** Kampanje-/sortimentsanalyse → Merchant Center-samspill → budsjett-/produktprioritering → løpende lønnsomhetsmåling.
- **Kvalitetskrav / forbehold:** Produkter kan avvises; vi kan ikke garantere godkjenning eller eksponering. Klargjør annonsebudsjett separat.

### #10 · `/konvertering/leadoppfolging/` — Leadoppfølging og automasjon

- **Kundeproblem:** Bedriften mottar leads, men svarer for sent eller mister potensielle kunder i overgangen fra skjema til salg.
- **Hvorfor egen side:** Selvstendig ettersendelsesproblem med direkte betydning for konvertering fra henvendelse til faktisk kunde.
- **Avgrensning / nabosider:** /henvendelser-og-booking/ forbedrer innsendingen; denne siden forbedrer tildeling, responstid, påminnelser og kvalifisering.
- **Leveranse og salgsløp:** Kartlegg henvendelsesløp → sett opp mottak/varsling/CRM → sikre eier/ansvar → måling av svar og salg → videre driftsavtale.
- **Kvalitetskrav / forbehold:** Unngå å love full CRM-transformasjon; automatiserte markedsmeldinger krever lovlig grunnlag og kontroll med persondata.

### #11 · `/seo/teknisk-seo/` — Teknisk SEO og SEO-analyse

- **Kundeproblem:** Søkemotorer kan ikke crawle, indeksere eller forstå viktige deler av nettsiden pålitelig.
- **Hvorfor egen side:** Teknisk SEO har en egen kjøpssituasjon: diagnose, feilretting og implementering med teknisk kompetanse.
- **Avgrensning / nabosider:** Skiller seg fra /seo/seo-analyse/ (bred audit), /seo/nettsidestruktur/ (informasjonshierarki) og /nettsidehastighet/ (ytelse).
- **Leveranse og salgsløp:** Teknisk crawl → prioritert feilliste → fikser innen CMS/hosting → Google Search Console-verifisering og dokumentasjon.
- **Kvalitetskrav / forbehold:** Bruk faktiske feilsignaler, ikke spekulative SEO-myter; teknisk tiltak gir ingen garantert ranking-økning.

### #11 · `/seo/seo-analyse/` — Teknisk SEO og SEO-analyse

- **Kundeproblem:** Virksomheten vet at organisk synlighet er svak, men mangler samlet diagnose og prioritering av muligheter.
- **Hvorfor egen side:** En omfattende SEO-audit kan selges som konkret inngangsprodukt før prosjekt eller månedsavtale.
- **Avgrensning / nabosider:** Bredere enn separate /seo/sokeordsanalyse/ og /seo/konkurrentanalyse/; vesentlig dypere enn en kort /vurdering/.
- **Leveranse og salgsløp:** Datainnsamling → teknikk/søk/innhold/konkurranse → prioritert handlingsplan med estimert innsats → tilbud om implementering.
- **Kvalitetskrav / forbehold:** Ikke gi automatisk generert «score» som om det er komplett faglig audit; skille funn, hypoteser og uverifiserte estimater.

### #12 · `/seo/innholdsoptimalisering/` — Innholdsoptimalisering og SEO-innhold

- **Kundeproblem:** Nettstedet mangler innhold som faktisk svarer på kjøpsrelevante spørsmål eller hjelper potensielle kunder å velge.
- **Hvorfor egen side:** Egen SEO-tjeneste for innholdet som ressurs og strategisk struktur, ikke bare tekstproduksjon per måned.
- **Avgrensning / nabosider:** SEO-intensjon og temaautoritet er fokus; /konvertering/budskap-og-tilbud/ handler primært om overbevisning på besøkte sider.
- **Leveranse og salgsløp:** Søkeintensjon og innholdsgap → innholdsbrief → oppdatere/bygge side → internlenker → evaluere organisk trafikk og leads.
- **Kvalitetskrav / forbehold:** Ikke masseproduser tynne AI-tekster. Unngå påstand om at bestemt struktur garanterer AI-siteringer.

### #13 · `/lokal-seo/google-maps/` — Google Maps og Google bedriftsprofil

- **Kundeproblem:** Lokale kunder finner konkurrentene i Google Maps, mens bedriftens profil er ufullstendig eller lite nyttig.
- **Hvorfor egen side:** Google Maps og bedriftsprofil har konkret kjøpsintensjon, egnet for raskt oppstartprosjekt og retainer.
- **Avgrensning / nabosider:** /lokal-seo/ er overordnet kommersiell tjeneste; /innsikt/google-bedriftsprofil/ er informativ guide.
- **Leveranse og salgsløp:** Profil-audit → kategorier/tjenester/opplysninger/bilder → rutiner for anmeldelser og vedlikehold → måling av handlinger.
- **Kvalitetskrav / forbehold:** Ingen fiktive profiler, lokasjoner eller garantier om Maps-posisjoner. Anmeldelser må være reelle.

### #14 · `/ai-synlighet/chatgpt/` — AI-synlighet i ChatGPT og Google AI

- **Kundeproblem:** Bedriften vet ikke om tjenestene blir funnet eller omtalt i ChatGPT-relaterte søke- og svaropplevelser.
- **Hvorfor egen side:** Egen målrettet inngang for kunder som eksplisitt spør om ChatGPT-synlighet, med reell kartlegging og innholdsarbeid.
- **Avgrensning / nabosider:** ChatGPT-spesifikt fokus; /ai-synlighet/google-ai/ dekker Googles AI-funksjoner. Hovedsiden /ai-synlighet/ binder dem sammen.
- **Leveranse og salgsløp:** Undersøk relevante spørsmål og kilder → teknisk tilgjengelighet/virksomhetsfakta → forbedre troverdig innhold → periodisk kontroll.
- **Kvalitetskrav / forbehold:** Ingen garanti for å bli anbefalt eller sitert. Avhengigheter til søkeindeks, kilder og endringer i AI-produkter må beskrives ærlig.

### #14 · `/ai-synlighet/google-ai/` — AI-synlighet i ChatGPT og Google AI

- **Kundeproblem:** Bedriften vil forstå og forbedre sin synlighet i Googles AI-baserte søkeresultater og oppsummeringer.
- **Hvorfor egen side:** Egen søkeintensjon rundt AI Overviews og AI Mode, som ikke er det samme som ChatGPT-søk.
- **Avgrensning / nabosider:** Tyngdepunkt i teknisk SEO, innhold, søkeintensjon og kildekvalitet; ikke egen «hemmelig AI-ranking»-teknikk.
- **Leveranse og salgsløp:** Analyse av spørsmål/eksponering når målbart → SEO-tekniske og redaksjonelle forbedringer → oppfølging av synlighet.
- **Kvalitetskrav / forbehold:** Rapporter må skille observert synlighet fra antagelser; ingen garanterte AI-plasseringer.

### #15 · `/konvertering/ab-testing/` — A/B-testing og konverteringseksperimenter

- **Kundeproblem:** Bedriften gjør endringer basert på magefølelse og vet ikke om nye varianter faktisk fungerer bedre.
- **Hvorfor egen side:** Egen spesialisert underside for systematiske eksperimenter og metode, ikke en generell CRO-side.
- **Avgrensning / nabosider:** A/B-testing forutsetter tilstrekkelig trafikk/konverteringer; mindre nettsteder får kvalitativ analyse og prioriterte forbedringer i stedet.
- **Leveranse og salgsløp:** Hypotese → eksperimentdesign → instrumentering → trafikkfordeling → evaluering → implementering når evidens er sterk nok.
- **Kvalitetskrav / forbehold:** BINDENDE: omfattende A/B-testing er foreløpig kun inkludert i Partner-pakken; pakkematrise ellers ikke låst.

### #16 · `/seo/sokeordsanalyse/` — Søkeordsanalyse og konkurrentanalyse

- **Kundeproblem:** Bedriften vet ikke hvilke søk, spørsmål og formuleringer som faktisk fører potensielle kunder til tjenester og produkter.
- **Hvorfor egen side:** Egen leveranse med tydelig søkeintensjon og konkret output: prioritert søkeord- og sideplan.
- **Avgrensning / nabosider:** Smalere enn /seo/seo-analyse/; handler om etterspørsel, intensjon og innholdskartlegging, ikke hele nettstedet.
- **Leveranse og salgsløp:** Seed keywords → konkurranse/volum/intensjon → tematisk gruppering → prioriterte kommersielle landingssider og guider.
- **Kvalitetskrav / forbehold:** Søkevolum og konkurranse er estimater, ikke sikre kundevolumer; prioriter inntektsrelevans fremfor trafikk alene.

### #16 · `/seo/konkurrentanalyse/` — Søkeordsanalyse og konkurrentanalyse

- **Kundeproblem:** Bedriften vet at rivaler rangerer bedre, men ikke hvilke innholdsgap, søkeord eller henvisninger som forklarer forskjellen.
- **Hvorfor egen side:** Egen side er eksplisitt godkjent selv om den overlapper SEO-audit; kan selges som separat konkurransestudie.
- **Avgrensning / nabosider:** Smalere enn /seo/seo-analyse/, med spesifikk benchmark av identifiserte søkekonkurrenter og prioriterte muligheter.
- **Leveranse og salgsløp:** Definer konkurrentsett → sammenlign synlighet, innhold, struktur og lenker → identifiser realistiske muligheter → tiltaksplan.
- **Kvalitetskrav / forbehold:** Ikke presenter estimerte konkurrenttall som interne fasiter. Ikke kopier konkurrentinnhold.

### #17 · `/seo/nettsidestruktur/` — Nettsidestruktur og internlenking

- **Kundeproblem:** Brukere og søkemotorer strever med et ulogisk sidehierarki, foreldreløse sider og dårlig internlenking.
- **Hvorfor egen side:** Egen tjeneste for informasjonsarkitektur på nettstednivå; særlig relevant ved vekst og mange kommersielle sider.
- **Avgrensning / nabosider:** Teknisk SEO er tilgang/indeksering, innholdsoptimalisering er innholdskvalitet; denne tjenesten organiserer sammenhengen.
- **Leveranse og salgsløp:** Innholdsinventar → sitemap/taksonomi → meny/breadcrumbs/internlenker → redirectkart ved endring → kontroll av bruk og indeksering.
- **Kvalitetskrav / forbehold:** Unngå unødvendig endring av etablerte URL-er med organisk verdi; migreringsrisiko må vurderes.

### #18 · `/seo/lenkebygging/` — Lenkebygging og digital PR

- **Kundeproblem:** Bedriften blir lite omtalt og har færre relevante redaksjonelle referanser enn etablerte konkurrenter.
- **Hvorfor egen side:** Egen etterspurt SEO-tjeneste, men må posisjoneres som digital PR/fortjent omtale fremfor kvantitet på lenker.
- **Avgrensning / nabosider:** Skiller seg fra innholdsproduksjon ved aktiv kilde-, partner- og medieorientert distribusjon; kan støtte organisk oppdagelse.
- **Leveranse og salgsløp:** Lenkeprofil/kildemuligheter → originalt innhold/data → relevant outreach → dokumenter omtaler og henvisningstrafikk.
- **Kvalitetskrav / forbehold:** Ingen PBN, spam, betalte rangeringslenker eller garanterte antall dofollow-lenker. Sponsorinnhold må merkes.

### #19 · `/seo/seo-migrering/` — SEO ved redesign og migrering

- **Kundeproblem:** Et nettsted skal bytte domene/CMS/struktur, og eksisterende organisk trafikk risikerer å falle ved feil lansering.
- **Hvorfor egen side:** Konkret tidsavgrenset kjøpsbehov med høy konsekvens ved feil; kan leveres uavhengig av nettsidebygging.
- **Avgrensning / nabosider:** Annerledes enn løpende teknisk SEO: kartlegging, redirectkart og kvalitetssikring før/under/etter overgang.
- **Leveranse og salgsløp:** Baseline/crawl → URL-mapping → redirect/metadata/canonical/sitemap → launch gate → søke- og feilovervåkning etter publisering.
- **Kvalitetskrav / forbehold:** Ingen garanti om uendrede rangeringer. Avklar ansvar mellom utvikler, CMS/host og SEO.

### #20 · `/nettbutikkoptimalisering/sok-og-filtrering/` — Produktsøk og filtrering

- **Kundeproblem:** Brukere finner ikke ønskede varer fordi produktsøk, synonymer, nulltreff eller filtre fungerer dårlig.
- **Hvorfor egen side:** Egen tjeneste for større produktkataloger med tydelig teknologi- og UX-arbeid.
- **Avgrensning / nabosider:** Produktsøk handler om produktfunn, /produktsider/ om varepresentasjon, /kjopsflyt/ om fullføring.
- **Leveranse og salgsløp:** Søkelogg og brukeroppgaver → prioriter treffrelevans/filtre/synonymer → implementering → mål søk til produkt og salg.
- **Kvalitetskrav / forbehold:** Ikke selg avansert søketeknologi der plattform/budsjett ikke støtter det; små sortiment har normalt lavere verdi.

### #21 · `/epostmarkedsforing/` — E-postmarkedsføring og automatiserte kundeflyter

- **Kundeproblem:** Bedriften henter kunder, men følger dem sjelden opp med relevante nyhetsbrev, onboarding, tilbud eller gjenkjøpskommunikasjon.
- **Hvorfor egen side:** Egen hovedtjeneste med tydelig retainer-potensial og høy verdi fra eksisterende kundebase.
- **Avgrensning / nabosider:** Bredere kundelivssyklus/retention enn /konvertering/leadoppfolging/ som håndterer nye henvendelser.
- **Leveranse og salgsløp:** Kundedata og samtykke → segment/velkomst-/etterkjøpsflyter → planlagt kampanjekalender → løpende utsendelse og inntektsmåling.
- **Kvalitetskrav / forbehold:** Ikke ubegrenset produksjon til fast lavpris. Følg regler for e-postmarkedsføring og respekter avmeldinger.

### #22 · `/landingssider/google-ads/` — Google Ads-landingssider

- **Kundeproblem:** Bedriften kjøper Google-klikk, men sender trafikken til sider som ikke svarer på annonsebudskap eller intensjon.
- **Hvorfor egen side:** Egen spesifikk søkeintensjon og mulighet for å få kunder som bruker et annet Ads-byrå.
- **Avgrensning / nabosider:** /landingssider/ gjelder alle kanaler, /google-ads/ kampanjedrift; denne tjenesten optimaliserer siden etter klikk.
- **Leveranse og salgsløp:** Analyser søketerm/annonse/landing → utvikle relevant side → tydelig henvendelsesløp → spor relevante Google Ads-konverteringer.
- **Kvalitetskrav / forbehold:** BINDENDE: omfattende A/B-testing fortsatt bare Partner; bruk kontrollerte forbedringer ved lavt trafikkvolum.

### #23 · `/konvertering/mobiloptimalisering/` — Mobiloptimalisering

- **Kundeproblem:** Mobilbesøkende mislykkes med navigasjon, skjema eller kjøp selv om siden teknisk tilpasser seg skjermbredden.
- **Hvorfor egen side:** Egen tjeneste for mobil UX og CRO, som kan dokumenteres med konkrete brukeroppgaver.
- **Avgrensning / nabosider:** Ikke dupliser /nettsidehastighet/; fokus på touchmål, innholdshierarki, friksjon og tilgjengelig mobilflyt.
- **Leveranse og salgsløp:** Mobilreview/brukertest → forbedre navigasjon, CTA og skjema → teste på enheter → mål mobilkonverteringer.
- **Kvalitetskrav / forbehold:** Ikke påstå kausalitet fra enkel før-/etteranalyse; hold kontrast/tastaturkrav synkronisert med UU-tjenesten.

### #24 · `/konvertering/prissider/` — Pris- og pakkepresentasjon

- **Kundeproblem:** Kundene forstår ikke hva ulike pakker koster, hva som følger med eller hvilken løsning de bør velge.
- **Hvorfor egen side:** Selvstendig konverteringsoppgave for pristransparens, pakkevelgere og beslutningsstøtte.
- **Avgrensning / nabosider:** Budskap-og-tilbud forklarer totalverdi; prissider fokuserer på sammenligning av priser, nivåer, vilkår og CTA.
- **Leveranse og salgsløp:** Kartlegg produkt-/pakkesalg → redesign pakketabell → forklar inkluderer/ekstra → forenkle valg og booking → mål pakkevalg.
- **Kvalitetskrav / forbehold:** Ikke selg avansert økonomisk prisoptimalisering som standard. Ingen skjulte tredjepartskostnader eller mørke mønstre.

### #25 · `/konvertering/brukertesting/` — UX-analyse og brukertesting

- **Kundeproblem:** Bedriften vet at brukere faller av, men mangler observasjoner som forklarer hvor og hvorfor.
- **Hvorfor egen side:** Egen analyseinngang som avdekker problemer før utviklingsarbeidet starter.
- **Avgrensning / nabosider:** Skiller seg fra A/B-testing som kvantifiserer variantforskjeller, og mobiloptimalisering som implementerer mobilforbedringer.
- **Leveranse og salgsløp:** Definer kritiske oppgaver → UX-review → ev. faktiske tester/atferdsanalyse → prioriter feil → tilby implementering.
- **Kvalitetskrav / forbehold:** Omfattende rekruttering/intervjuer er ressurskrevende og må prises separat eller til større pakke; lovlig opptak/samtykke.

### #26 · `/universell-utforming/` — Universell utforming og tilgjengelighet

- **Kundeproblem:** Besøkende med funksjonsnedsettelser hindres fra å bruke nettsiden, og virksomheten kan ha relevante lovkrav som ikke oppfylles.
- **Hvorfor egen side:** Egen etterspurt faglig leveranse med konkret kartlegging og feilretting; ikke bare generisk UX.
- **Avgrensning / nabosider:** Fokus på tilgjengelighet og relevante WCAG/UU-krav; skiller seg fra mobil-CRO og generell brukertesting.
- **Leveranse og salgsløp:** Scope gjeldende krav → automatiserte og manuelle tester → feilregister og alvorlighet → retting → kontroll og vedlikehold.
- **Kvalitetskrav / forbehold:** Krav avhenger av virksomhetstype og løsning. Ikke lov full WCAG-etterlevelse fra automatisk skanning alene.

### #27 · `/lokal-seo/lokale-landingssider/` — Lokale landingssider og geografisk SEO

- **Kundeproblem:** Bedriften dekker flere steder, men blir bare funnet organisk i ett geografisk område.
- **Hvorfor egen side:** Egen SEO-tjeneste for dokumentert geografisk serviceområde, som kan gi etterspurt organisk trafikk og kvalifiserte henvendelser.
- **Avgrensning / nabosider:** /lokal-seo/google-maps/ gjelder bedriftsprofil; /flere-lokasjoner/ gjelder faktiske avdelinger; denne handler om nettsider for reelle tjenesteområder.
- **Leveranse og salgsløp:** Geografisk prioritering → stedsspesifikk kundeverdi/referanser → lokal sidemal med reelt innhold → internlenker og måling.
- **Kvalitetskrav / forbehold:** Ingen masseproduserte byttenavn-sider eller doorway pages; ingen fiktive bedriftsadresser/profiler.

### #28 · `/lokal-seo/flere-lokasjoner/` — Lokal SEO for flere lokasjoner

- **Kundeproblem:** Flere reelle avdelinger har ujevne bedriftsprofiler, inkonsistente åpningstider og svak lokal siderapportering.
- **Hvorfor egen side:** Egen skalerbar B2B-leveranse for små og mellomstore kjeder med flere faktiske lokasjoner.
- **Avgrensning / nabosider:** Ikke forveksles med bedrifter som leverer tjenester i mange byer uten egne avdelinger; Google-profiltilgang må være legitim.
- **Leveranse og salgsløp:** Avdelingsinventar → profil/sidedata → felles oppsett og rutiner → avdelingsspesifikke rapporter og månedlig vedlikehold.
- **Kvalitetskrav / forbehold:** Foreslått prismodell grunnpris + avdelingstillegg er IKKE vedtatt; krav til reelle lokasjoner og korrekte opplysninger.

### #29 · `/google-ads/kontoanalyse/` — Google Ads-kontoanalyse

- **Kundeproblem:** Bedriften har aktive Google Ads, men vet ikke om budsjett, søkeord, sporing og landingssider er optimalt satt opp.
- **Hvorfor egen side:** Selvstendig uavhengig kontroll som kan selges uten at kunden bytter byrå; godt inngangsprodukt.
- **Avgrensning / nabosider:** Skilles fra /google-ads/ som er løpende drift, og fra /sporing-og-maling/ som er kanalovergripende.
- **Leveranse og salgsløp:** Lesetilgang → kontoaudit → dokumenterte funn/risiko/muligheter → handlingsplan → valgfri implementering/retainer.
- **Kvalitetskrav / forbehold:** Ingen endring i kontoen uten avtale; dokumenter estimater og funn separat; skille mediebudsjett fra honorar.

### #30 · `/meta-ads/kontoanalyse/` — Meta Ads-analyse og kontorevisjon

- **Kundeproblem:** Meta-annonser gir aktivitet, men kunden vet ikke om kreativer, målgrupper, Pixel/CAPI eller landingssider skaper salg.
- **Hvorfor egen side:** Uavhengig audit med egen plattformspesifikk metodikk, attraktiv for kunder som allerede bruker et byrå.
- **Avgrensning / nabosider:** Skilles fra /meta-ads/ drift; skal ikke bli en kopi av Google Ads-auditen – prioriter kreativ, leveranse og hendelsesdata.
- **Leveranse og salgsløp:** Lesetilgang → gjennomgå kreativer/kampanjer/pixel/deduplisering → tiltak sortert etter effekt/innsats → valgfri drift.
- **Kvalitetskrav / forbehold:** Vurder attribusjon kritisk og skill tilskrevne resultater fra dokumentert meromsetning.

### #31 · `/google-shopping/merchant-center/` — Google Merchant Center og produktfeed

- **Kundeproblem:** Produkter mangler synlighet fordi feeden har feil, viktig produktdata er mangelfull, eller priser/lagerstatus ikke samsvarer.
- **Hvorfor egen side:** Konkret inngangsprodukt der bedriften ofte allerede ser avvisninger i Merchant Center; relevant for Shopping og gratis produktoppføringer.
- **Avgrensning / nabosider:** Ikke lik /google-shopping/ (annonsekampanjer); produktdatakvalitet, produktkilder, diagnostikk og synk står i sentrum.
- **Leveranse og salgsløp:** Merchant-audit → feilrettingsprioritering → feed/attributter/synk i Shopify/WooCommerce → verifisering → vedlikeholdsavtale.
- **Kvalitetskrav / forbehold:** Ingen garanti om Google-godkjenning; endringer må stemme med faktiske produktdata og gjeldende Merchant Center-krav.


### 32. Google Ads-konverteringssporing — ANNET (JA, egen underside under Google Ads)

- **/google-ads/konverteringssporing/** · Google Ads
  - **Kundens problem:** Feil eller doble konverteringer gjør at Google Ads kan optimalisere mot feil handlinger eller misvisende datagrunnlag.
  - **Leveranse:** Konverteringsaudit, GTM/google tag, GA4-import, enhanced/offline conversions, samtykkekontroll og QA.
  - **Hvorfor egen side:** Selvstendig teknisk feilretting, også når kunden beholder sitt eksisterende annonsebyrå.
  - **Beslutningsvilkår:** Innholdsbriefene må bevare kundens problem og konkrete leveransepunkt med egne forklaringer – ikke bare en kort liste.

### 33. Meta-konverteringssporing — JA

- **/meta-ads/konverteringssporing/** · Meta Ads
  - **Kundens problem:** Bedriften annonserer på Facebook og Instagram, men har mangelfull konverteringssporing. Kjøp eller henvendelser registreres feil, mangler eller telles dobbelt. Da blir resultatrapportene og optimaliseringsgrunnlaget misvisende.
  - **Hvorfor egen side:** En konkret teknisk kjøpsintensjon: få riktig måling fra eksisterende Meta-kampanjer uten å måtte bytte annonsebyrå. Selvstendig prosjekt med verdi uavhengig av løpende kampanjedrift.
  - **Dette kan vi levere:** **Meta Pixel-analyse** – Gjennomgå installasjon, hendelser, triggere og hvordan nettleserbasert konverteringssporing fungerer. **Conversions API (CAPI)** – Sette opp eller forbedre serverbasert hendelsesoverføring der det er hensiktsmessig, med korrekte hendelser og nødvendig databeskyttelse. **Deduplisering og datakvalitet** – Kontrollere at samme kjøp eller henvendelse ikke blir registrert dobbelt når Pixel og CAPI brukes sammen. **Sporing av kjøp og henvendelser** – Konfigurere relevante hendelser for produktsider, handlekurv, kjøp, skjemaer og leadgenerering. **Shopify, WooCommerce og CRM** – Kontrollere integrasjoner og muligheten for å måle faktiske salg eller kvalifiserte henvendelser fremfor bare klikk. **Samtykke og feilsøking** – Kontrollere personvern, samtykkestyring, Events Manager-diagnostikk og at hendelser registreres som tiltenkt.
  - **Skille mot andre tjenester:** /meta-ads/ handler om drift og kampanjer; /meta-ads/kontoanalyse/ er en bred gjennomgang av annonsering; /meta-ads/konverteringssporing/ gjelder Pixel, CAPI og datakvalitet; /sporing-og-maling/ er kanalovergripende. /google-ads/konverteringssporing/ er tilsvarende Google-spesifikk tjeneste.
  - **Leveranse og kommersiell modell:** Få tilgang og avklar KPI-er → Meta Events Manager/Pixel/CAPI-audit → prioritert feilretting og implementering → verifisering av hendelser og deduplisering → dokumentasjon og eventuell månedlig overvåkning. Betalt, avgrenset prosjekt; kan utføres uten å overta annonseringen.
  - **Avgrensninger og kvalitetskrav:** Ikke lov at alle hendelser måles, eksakt attribusjon eller automatisk bedre ROAS. Samtykke, personvern, dataminimering, sikker håndtering av kundeopplysninger og plattformens krav er forutsetninger. Ingen ukontrollert bruk av sensitive data.

### 34. Handlekurvoptimalisering og mersalg — NEI til separat side

- **Avslått URL:** `/nettbutikkoptimalisering/handlekurv/` – **skal ikke opprettes**.
- **Begrunnelse:** Dette overlapper vesentlig med den allerede godkjente kjøpsflyten; ekstra URL ville fragmentere søkeintensjonen og kunne skape duplikatinnhold.
- **Innholdsplassering:** `/nettbutikkoptimalisering/kjopsflyt/` skal konkret dekke tydelig handlekurv, frakt-/prisinformasjon, mobil, relevante tilleggsprodukter/kryssalg og analyse av fullføring/ordreverdi.
- **Avgrensning:** `/epostmarkedsforing/` dekker kommunikasjon om avbrutte handlekurver. Ingen separat side nå.
- **Beslutningsstatus:** NEI til ny URL; eksisterende tjeneste utvidet redaksjonelt, ikke implementert.

## 4. Eksisterende sider og foreløpig informasjonsarkitektur

**Eksisterende i tidligere prosjektgjennomgang (må verifiseres mot repo/live før implementering):**

- Hjem `/`; `/synlighet/`; `/konvertering/`; `/seo/`; `/ai-synlighet/`; `/lokal-seo/`; `/nettbutikkoptimalisering/`.
- `/priser/`, `/innsikt/`, `/vurdering/`, `/om/`, `/kontakt/`, `/personvern/`, `/vilkar/`.
- Guide `/innsikt/google-bedriftsprofil/`; tidligere omtalt artikler om effektmåling og hva som bør optimaliseres først; begrepsoversikt `/begreper/`.

**Arkitekturregler:**

1. Tjenestesider har en egen definert kjøpsintensjon og egen leveranse; guider svarer på informasjonsbehov. Unngå ren kannibalisering.
2. Toppmenyen skal ikke inneholde alle tjenestesidene; den skal gi en håndterbar inngang til hovedkategorier. Sidenes endelige plassering i menynavigasjon avklares separat.
3. `seo/seo-analyse` er dybdeanalyse; `/vurdering/` er en kortere innledende vurdering. Ikke gjør dem til to identiske leadmagneter.
4. `/innsikt/google-bedriftsprofil/` er guide, `/lokal-seo/google-maps/` er kommersiell tjeneste.
5. `/nettsidehastighet/` gjelder ytelse; `/konvertering/mobiloptimalisering/` gjelder mobil UX/CRO; `/universell-utforming/` gjelder UU/WCAG.
6. `/nettbutikkoptimalisering/produktsider/` gjelder valg/presentasjon, `/nettbutikkoptimalisering/sok-og-filtrering/` gjelder produktfunn, `/nettbutikkoptimalisering/kjopsflyt/` gjelder fullføring.
7. `/google-ads/` og `/meta-ads/` er løpende drift; `*/kontoanalyse/` er en separat, uavhengig, avgrenset gjennomgang.
8. `/landingssider/` er generelt; `/landingssider/google-ads/` gjelder annonse-til-landing-konvertering; `/google-ads/` gjelder kampanjer.
9. `/ai-synlighet/chatgpt/` og `/ai-synlighet/google-ai/` må ha særskilt innhold og ingen ranking-/anbefalingsgaranti.
10. Geografiske tjenestesider skal ha unikt lokalt nytteinnhold; flere faktiske avdelinger er et separat behov fra ett firma med flere serviceområder.

## 5. Kommersiell modell og pakker – beslutningsstatus

- Mål: flere betalende kunder, større faktisk kundeverdi og tilbakevendende, lønnsomme avtaler.
- Aksepterte leveranseformer: avgrenset audit / engangsprosjekt / løpende retainer; nøyaktig modell vurderes per tjeneste.
- Det er **ikke godkjent** en full prismatrise eller hvilke tjenester som inngår i hvert nivå. Ikke trekk slutninger fra eksempler gitt under diskusjon.
- **Unntak (#15):** Omfattende A/B-testing skal foreløpig bare tilbys innen Partner-pakken. En enklere CRO-gjennomgang er ikke det samme som et statistisk A/B-eksperiment.
- Ikke selg ubegrenset produksjon, testing, nyhetsbrev, link outreach eller integrasjoner i billige månedsavtaler. Spesifiser omfang, antall leveranser, ansvar og endringshåndtering.
- Separate tredjepartskostnader (f.eks. annonsebudsjett, e-postplattform) må være eksplisitte.

## 6. Roadmap – anbefalt, IKKE besluttet implementeringsrekkefølge

**Fase A: Avklar struktur og kommersiell retning**
- Fullfør de gjenværende beslutningspunktene; fjern/sammenslå duplikater uten å overstyre eksplisitte JA-vedtak uten ny avklaring.
- Lås toppnavigasjon, hovedkategorier, breadcrumbs, sidetemplate, kontaktflyt, CTA-er og interne lenkestrømmer.
- Definer primær kjøpsintensjon, CTA, leveranse, minimumsbevis, case/FAQ og internlenker for hver tjeneste.

**Fase B: Første publiseringsbølge (forslag)**
- Først: landingssider, konvertering, sporing-og-maling, kontinuerlig-optimalisering, seo, lokal-seo, google-ads, meta-ads, nettbutikkoptimalisering og sentrale tilhørende kommersielle undersider.
- Sørg for faktisk salgsklar tjenestebeskrivelse, pris-/pakkeovergang og konverteringsmåling før publisering.

**Fase C: Spesialiserte undersider**
- Lag kanal-, plattform- og problemspesifikke sider fra det godkjente registeret, gruppert etter kundebehov og innholdsbevis.
- Vurder unikhet, datagrunnlag, referanser og plan for internlenking før hver side publiseres.

**Fase D: Guider, bevis og videre CRO**
- Beslutningsguider, forklaringer, caser, faglige ressurser, FAQ og relevante bransjesider tas i egen runde.
- Utfør gjennomgang av pakker/prising og hva som er inkludert, spesielt tidkrevende leveranser.
- Evaluer faktiske leads, konverteringer og gjennomførbarhet per side; prioriter vedlikehold av sider som skaper kunder.

## 7. Kvalitets- og juridiske kontrollpunkter

- Ingen tynne, masseproduserte SEO-sider, fiktive lokasjoner eller manipulerende lenker.
- Ikke lov garantert Google-/AI-plassering, Merchant Center-godkjenning eller bestemt ROAS.
- Respekter personvern, samtykke, lovlige grunnlag for e-postmarkedsføring og riktig innsamling av konverteringsdata.
- Skille fakta og dokumentert kundebevis fra hypotetiske eksempler; oppgi opphav/metode for resultatpåstander.
- Tilgjengelighet/WCAG skal testes manuelt i tillegg til automatiske tester, og gjeldende regelverk må verifiseres før lovnad om etterlevelse.
- Før utvikling: kontroller repo/live, CMS/ruting, nye URL-er, eksisterende redirects, metadata, schema og indekseringsstatus. Historiske sidereferanser ovenfor er ikke verifisert i denne filgenereringen.

## 7B. GitHub Issues-struktur – anbefalt operativ modell

**Anbefaling: hybrid, ikke 37 løsrevne issues nå.** Denne masterspesifikasjonen (`.md` + `.json`) er **kilden til beslutninger**. Issues er arbeidskort for implementering, ikke primærlagring av beslutningshistorikk.

**Hierarki:**

1. **Én overordnet EPIC** – `[EPIC] Optimalisering Oslo – sitemap, tjenester og publiseringsplan` med mål, lenke til masterfiler, nåværende beslutningsnummer, beslutningslogg og akseptkriterier.
2. **Område-issues / underoppgaver** – ni foreslåtte grupper: `SEO`, `Lokal SEO`, `AI-synlighet`, `Konvertering og CRO`, `Landingssider`, `Nettbutikk og Shopping`, `Annonsering`, `Måling/ytelse/UU/drift`, `Pakker, navigasjon og publisering`. Hver område-issue har lenker til sine godkjente sidebriefs og oversikt over avhengigheter.
3. **Én implementeringsissue per URL når siden faktisk skal bygges** – ikke opprett alle 39 som åpne utviklingsoppgaver før sitemap, pakkematrise og sidemaler er låst. Hver slik issue bør være underoppgave av riktig områdeissue (GitHub støtter ekte sub-issues). En sideissue kan dekke design, tekst, kode, meta, schema, QA og publisering for **én URL**, med avkrysningspunkter.

**Hvorfor:** Én gigantissue blir uoversiktlig for Codex og review. 37 uavhengige issues mister prioriteringer og beslutningskontekst. En trestruktur gir oversikt **og** en håndterlig arbeidsenhet per side når byggingen starter.

**Når opprette hva:** Opprett nå én EPIC + områdeissues **etter klarsignal til GitHub-opprettelse**. Hold sidebriefene i masterfilene. Etter endelig sitemap + pakkeavklaring opprettes sideissues i den prioriterte publiseringsbølgen. Ikke flytt godkjennelser tilbake til «åpne» bare fordi de ikke er bygget.

**Issue-malen for én URL:**

```md
## Beslutningsgrunnlag
- Beslutningspunkt / status:
- URL / forelder / sidetype:
- Kundeproblem:
- Hvorfor egen side:
- Avgrensning mot nabosider:
- Forbehold og pakker:

## Ferdig levert når
- [ ] Riktig søkeintensjon og unik sidetittel/H1 er verifisert
- [ ] Kundebehov, leveranser, pris-/pakke-CTA og dokumenterbare bevis er korrekt fremstilt
- [ ] Innhold, FAQ og internlenker er unike og støtter foreldresiden
- [ ] Mobil, tilgjengelighet og konverteringsflyt er testet
- [ ] Metadata, canonical, schema, indeksregler og eventuelle redirects er kontrollert
- [ ] Relevante hendelser/henvendelser kan måles lovlig og korrekt
- [ ] QA er gjennomført, og siden kan publiseres uten regresjon

## Implementering
- Repo/branch/PR:
- Avhengigheter:
- Verifiseringslenker:
```

**Forslag til lett metadata:** Labels `type:service-page`, `area:seo|cro|local|ads|shop|etc`, `state:spec-ready|build|qa`; status `Godkjent`, `Klar til bygging`, `Pågår`, `QA`, `Publisert`. Ikke innfør separat tung approval-prosess, siden sidene allerede er besluttet.

**Teknisk begrensning:** GitHub-integrasjonen som ble inspisert støtter opprettelse/oppdatering av issues, men hadde ingen dokumentert operasjon for å knytte native parent/sub-issue-relasjoner. Manuell kobling via GitHub UI eller støttet GitHub-verktøy kan brukes ved opprettelse. **EPIC #62** og **innholdsbrief #63** er opprettet; egne sideimplementeringsissues er ikke opprettet.

## 8. Neste beslutning

**Punkt 35 – venter:** Kundelojalitet, gjenkjøp og økt kundeverdi (mulig `/nettbutikkoptimalisering/gjenkjop/`). Vurder forskjellen mot `/epostmarkedsforing/`, og spør JA/NEI/ANNET.

**Viktig endring fra punkt 32:** Se den komplette, autoriserte innholdsstrukturen i detaljbriefene og JSON. Ikke publiser en side uten kundeproblem + individuelle leveranser med begrunnelse.

## 9. Handoff-prompt for ny samtale

```text
Vi fortsetter sitemap-gjennomgangen for optimalisering.oslo.no. Bruk vedlagte masterspesifikasjon (inkl. sidebriefene i §3B) og JSON-register som beslutningsgrunnlag. Beslutningspunktene 1–34 er avklart (punkt 34 = NEI til egen URL; innlemmes i kjøpsflyt); ikke gjenta dem. Neste er punkt 35: Kundelojalitet og gjenkjøp. Presenter ett punkt av gangen med JA/NEI/ANNET, registrer svaret og oppdater .md/.json. Oppdater kun strategi/docs/issues i GitHub; ingen endringer i nettsidekode eller publisering uten egen avtale. Ikke bland inn medon.no. Pakkeinndeling/pris tar vi etter full sitemap.
```

---

**Filrutine:** Denne masterfilen er et tidsstemplet øyeblikksbilde. Ved senere beslutninger skal en oppdatert versjon genereres med ny beslutningslogg og oppdatert versjon/dato; gamle nedlastede filer oppdateres ikke automatisk.

## 10. Fullstendig innholdsgrunnlag (beslutning 32)

**Obligatorisk:** Les `docs/sitemap/fullstendige-tjenestebriefs-34-2026-10-30.md` sammen med denne masteren. Den gir for alle 39 godkjente URL-er (ingen ny URL fra avslaget i #34):

- konkret kundeproblem
- navngitte leveransepunkter med hver sin forklaring (formatet «Dette kan vi levere»)
- hvorfor egen side
- avgrensning mot nabosider
- forretningsmodell og CTA-retning
- kvalitetskrav og dokumentasjonsbegrensninger

Utgangspunktet for #31 Merchant Center er bevart med seks spesifikke leveranser i fullstendig tekst. Dette er *source of truth* for innholdsproduksjon, ikke generiske URL-titler.