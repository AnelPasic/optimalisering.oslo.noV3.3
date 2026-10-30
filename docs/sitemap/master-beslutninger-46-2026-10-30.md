# Optimalisering Oslo – sitemap, masterspesifikasjon og handoff

**Versjon:** 2.6 · **Dato:** 30.10.2026 · **Beslutningspunkt:** 46 avklart (JA), 47 venter · **Status:** Plan / godkjente beslutninger, ikke implementert

> **Avgrensning:** Dette gjelder kun **optimalisering.oslo.no**. Ikke slå sammen strategi eller URL-struktur med **medon.no**. Godkjent betyr avklart i samtalen og dokumentert i GitHub, **ikke** at siden er utviklet eller publisert.

## 1. Handoff – les dette først

### Målet
Bygg en stor, gjennomarbeidet og kommersielt sterk tjenestearkitektur for Optimalisering Oslo: tydelige hovedtjenester, målrettede underside-tilbud og nyttig støtteinnhold. Primær effekt er relevante nye kunder og lønnsomme engangsprosjekter / månedlige avtaler, ikke antall URL-er i seg selv.

### Siste status
- **46 beslutningspunkter er avklart**, hvorav **43 JA og 3 avviste separate undersider (#34, #44 og #45)**, tilsvarende **49 godkjente nye/planlagte tjeneste-URL-er**. Nummer er beslutningspunkt, ikke unike URL-er.
- **#31 er JA:** `/google-shopping/merchant-center/` som underside under Google Shopping.
- **#32 er ANNET med eksplisitt JA:** `/google-ads/konverteringssporing/` godkjent som egen underside under Google Ads. Brukeren krevde samtidig fullstendige kunde-/leveransebriefs i backlog.
- **Innholdskontrakt:** Hver tjenesteside skal ha konkret kundeproblem, navngitte leveranser med forklaring, hvorfor egen URL, avgrensning, kommersiell modell og kvalitetskrav. Se `optimalisering-oslo-fullstendige-tjenestebriefs-46-2026-10-30.md` og `optimalisering-oslo-beslutninger-46-2026-10-30.json`.
- **#33 er JA:** `/meta-ads/konverteringssporing/` som egen underside under Meta Ads, med fullstendig brief og seks individuelt beskrevne leveranser.
- **#34 er NEI:** Ingen separat `/nettbutikkoptimalisering/handlekurv/`. Handlekurvoversikt, relevant mersalg og kryssalg dokumenteres som leveranser under allerede godkjent `/nettbutikkoptimalisering/kjopsflyt/`.
- **#35 er JA:** `/nettbutikkoptimalisering/gjenkjop/` under Nettbutikkoptimalisering. Egen tjeneste for kundelojalitet, gjenbestilling, kundeverdi, segmentering og tiltak etter kjøp; skiller seg fra e-post som kanal.
- **#36 er JA:** `/nettbutikkoptimalisering/shopify/` som egen underside under Nettbutikkoptimalisering; Shopify-spesifikk audit, ytelse, app-/temaarbeid, SEO, checkout og sporing med plattformforbehold.
- **#37 er JA MED KOMMENTAR:** `/nettbutikkoptimalisering/woocommerce/` godkjent som WooCommerce-underside. Strategisk vinkel: utfordre Magento/Adobe Commerce som unødvendig komplekst for mange norske SMB-er, vurder Shopify eller enklere alternativ når rasjonelt; ikke publiser «Magento er trash» som faktapåstand. Kundens ordlyd og begrunnelse er bevart i beslutningsregisteret.
- **#38 er JA:** `/wordpress-optimalisering/` som egen tjenesteside uten plass i hovedmenyen. Omfatter WordPress-analyse, hastighet, plugin-/temaopprydding, hosting/PHP/database, SEO, CRO, sikkerhet og avgrenset vedlikehold; ikke WooCommerce.
- **#39 er JA:** `/nettsidemigrering/` som selvstendig, plattformuavhengig tjeneste for behovsvurdering, data/innhold, SEO- og URL-bevaring, integrasjoner, QA, cutover og etterkontroll. Må ikke duplisere `/seo/seo-migrering/`.
- **#40 er JA:** `/nettsidevedlikehold/` egen tjenesteside med avgrensede månedlige vedlikeholdsavtaler. Teknisk drift, sikkerhet, oppdateringer, backup, oppetid og kontroll skilles fra SEO/CRO-vekst i `/kontinuerlig-optimalisering/`. Ingen lovnader om ubegrenset support, responstid eller døgnvakt før kapasitet/SLA er definert.
- **#41 er JA:** `/funksjonsovervakning/` som egen, spesialisert side med oppsett + månedlig overvåkning av kritiske kundehandlinger (skjema, booking, checkout, integrasjoner) og varsling. Skill fra ordinær oppetid/nettsidevedlikehold; markedsfør ikke automatisering som ennå ikke er bygget.
- **#42 er JA:** `/nettsideanalyse/` som egen betalt helhetsanalyse med dokumenterte funn og prioritert handlingsplan. Skilles fra kort `/vurdering/`, dybdeanalysene i SEO/Ads og løpende implementering. Ikke selg generisk AI-generert PDF som betalt audit.
- **#43 er JA:** `/digital-konkurrentanalyse/` egen betalt sammenligningsanalyse av konkurrerende nettsider, tilbud, pris, budskap, søk/AI-synlighet og offentlig annonsering med dokumenterte kilder, typisk 3–5 relevante konkurrenter. Skiller seg fra SEO-konkurrentanalyse og kundens nettsideanalyse.
- **#44 er NEI:** Ingen separat `/konvertering/tilbudsoptimalisering/`. Strategisk utforming av tilbud, pakker og verdibudskap innlemmes i `/konvertering/budskap-og-tilbud/`, og konkret pakke-/prisvalg, prissider og måling innlemmes i `/konvertering/prissider/`. De to eksisterende sidene er utvidet i JSON, master og briefs.
- **#45 er NEI:** Ingen egen `/konvertering/kontaktskjemaer/`. Skjemaflyt, design, dynamiske/kvalifiserende spørsmål, spam, personvern og måling legges til eksisterende `/konvertering/henvendelser-og-booking/`; leadprioritering, CRM-routing og oppfølging etter innsending legges til `/konvertering/leadoppfolging/`. Fullstendige briefs og JSON er utvidet; ingen ny URL.
- **#46 er JA:** `/ai-chatbot/` som egen tjenesteside. Oppsett av godkjent kunnskapsbase, AI-dialog, frivillig leadinnsamling, menneskelig overlevering, CRM-integrasjon, testing og mulig månedlig forbedring. Ikke markedsfør som ferdig driftssatt løsning før reell teknisk/verifisert leveranse.
- **#47 er IKKE besluttet:** Kundeanmeldelser og omdømmeoptimalisering, mulig `/kundeanmeldelser/`. Vurder overlapp mot `/lokal-seo/google-maps/` og `/konvertering/budskap-og-tilbud/`. Presenter JA/NEI/ANNET.
- **#15 særregel:** Omfattende A/B-testing er foreløpig bare inkludert i **Partner-pakken**; volumkrav og separat prising må respekteres.
- **Pakke-/prisfordeling for alle tjenester er utsatt** til etter sitemap-beslutningene. Ikke dikt opp bindende pakkepriser eller inkluderingsnivåer.
- **Ingen nettsidekode eller publiserte nettsider er endret** gjennom disse beslutningene. Strategi, detaljerte sidebriefs og issues er versjonert i GitHub fra punkt 32.

### Instruks ved fortsettelse i ny tråd
1. Bruk denne filen som beslutningsregister; ikke be om å godkjenne #1–#46 på nytt.
2. Vis **kun ett nytt beslutningspunkt av gangen**, med foreslått URL, hierarki, kundeproblem, konkret leveranse, overlapp/risiko, anbefaling og **JA / NEI / ANNET med kommentar**.
3. Når brukeren svarer, registrer faktisk valg og begrunnelse. Ikke konverter ANNET til ubetinget JA når brukeren har lagt til vilkår.
4. **Oppdater denne `.md`, detaljbriefene og den tilhørende `.json` etter hver avgjørelse**. Lever nye nedlastbare filer eller lagre i en eksplisitt valgt felles dokumentkilde; ikke påstå at tidligere nedlastinger automatisk oppdateres.
5. Oppdater kun versjonerte spesifikasjonsdokumenter og eksisterende plan-issues ved nye beslutninger; ikke endre nettsidekode, publisere eller låse priser uten separat klarsignal.
6. Etter full gjennomgang: konsolider sitemap, ranger implementeringsrekkefølge, lås navigasjon og sidemaler, og gjennomgå samtlige tjenester opp mot pakker/prising og kapasitet.

## 2. Godkjent sitemap – tjeneste-URL-er

| Punkt | Status | URL | Plassering | Hovedleveranse |
|---:|---|---|---|---|
| #1 | JA | `/landingssider/` | Hovedtjeneste | Bygge nye og forbedre eksisterende landingssider for kampanjer, leads, booking og salg |
| #2 | JA | `/konvertering/henvendelser-og-booking/` | Konvertering | Skjema/booking, feltforenkling, dynamiske/kvalifiserende spørsmål, mobil, spamvern, integrasjon og måling (utvidet #45) |
| #3 | JA | `/nettbutikkoptimalisering/kjopsflyt/` | Nettbutikkoptimalisering | Handlekurv, checkout, frakt-/returinfo, frafall og relevant mersalg/kryssalg (jf. avslag #34) |
| #4 | JA | `/nettbutikkoptimalisering/produktsider/` | Nettbutikkoptimalisering | Produkt- og kategoripresentasjon, filtrering, SEO, meromsetning, Shopify/WooCommerce |
| #5 | JA | `/sporing-og-maling/` | Hovedtjeneste | GA4, GTM, konverteringer, kvalifiserte leads, salg, attribusjon og dashboards; personvernkontroller |
| #6 | JA | `/konvertering/budskap-og-tilbud/` | Konvertering | Verdiforslag, salgstekster, tilbud, tjenestepakker, verdipresentasjon og tillit (utvidet #44) |
| #7 | JA | `/nettsidehastighet/` | Selvstendig tjenesteside | Core Web Vitals (LCP, INP, CLS), mobil, bilder, JS, caching og serverrespons |
| #8 | JA | `/kontinuerlig-optimalisering/` | Hovedtjeneste | Månedlig analyse, prioritering, implementering og måling av SEO/CRO-forbedringer |
| #9 | JA m/vilkår | `/annonseoptimalisering/` | Hovedtjeneste | Overordnet optimalisering av annonser, landingssider, sporing og konvertering |
| ↳ | JA m/vilkår | `/google-ads/` | Kanalspesifikk tjeneste | Søkeannonser, budgiving, søkeord, budsjett og konverteringsoptimalisering |
| ↳ | JA m/vilkår | `/meta-ads/` | Kanalspesifikk tjeneste | Facebook og Instagram: kampanjer, målgrupper, kreativt materiell, måling |
| ↳ | JA m/vilkår | `/google-shopping/` | Kanalspesifikk tjeneste | Shopping-annonser, produktfeed, Merchant Center og lønnsomhet |
| #10 | JA | `/konvertering/leadoppfolging/` | Konvertering | Leadkvalifisering etter innsending, CRM-routing, prioritering, varsling og oppfølging (utvidet #45) |
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
| #24 | JA | `/konvertering/prissider/` | Konvertering | Prissider, pakketabeller, pakkevelgere, reelle tillegg, CTA-er og resultatmåling (utvidet #44) |
| #25 | JA | `/konvertering/brukertesting/` | Konvertering | UX-review, faktiske brukeroppgaver, atferdsanalyse og forbedringsplan |
| #26 | JA | `/universell-utforming/` | Selvstendig tjenesteside | WCAG/UU, kontrast, tastatur, semantikk, skjermleser, skjema og manuell testing |
| #27 | JA | `/lokal-seo/lokale-landingssider/` | Lokal SEO | Reelle geografiske tjenestesider for aktuelle byer og serviceområder |
| #28 | JA | `/lokal-seo/flere-lokasjoner/` | Lokal SEO | Flere faktiske avdelinger, GBP-profiler, avdelingssider og sentralisert lokal rapportering |
| #29 | JA | `/google-ads/kontoanalyse/` | Google Ads | Uavhengig Ads-audit: søketermer, budgivning, budsjett, konverteringssporing og landing |
| #30 | JA | `/meta-ads/kontoanalyse/` | Meta Ads | Kampanjer, kreativt materiell, målgrupper, Meta Pixel/CAPI, attribusjon og lønnsomhet |
| #31 | JA | `/google-shopping/merchant-center/` | Google Shopping | Merchant Center, feilmeldinger, produkttitler/attributter, feed, godkjenning og synk |
| #32 | ANNET (JA) | `/google-ads/konverteringssporing/` | Google Ads | Google tag, GTM, GA4-import, enhanced/offline conversions, samtykke, deduplisering og QA |
| #33 | JA | `/meta-ads/konverteringssporing/` | Meta Ads | Meta Pixel, CAPI, deduplisering, e-handels-/lead-events, integrasjoner, samtykke og QA |

| #35 | JA | `/nettbutikkoptimalisering/gjenkjop/` | Nettbutikkoptimalisering | Gjenkjøpsrate, kundeverdi, abonnement/gjenbestilling, kundeklubb og lojalitet |
| #36 | JA | `/nettbutikkoptimalisering/shopify/` | Nettbutikkoptimalisering | Shopify-audit, tema/apper, hastighet, produkt-/kategorisider, checkout, SEO og sporing |
| #37 | JA (kommentar) | `/nettbutikkoptimalisering/woocommerce/` | Nettbutikkoptimalisering | WooCommerce-audit, hosting, plugins, database, checkout, SEO, sikkerhet og plattformvalg/migrering |
| #38 | JA | `/wordpress-optimalisering/` | Selvstendig tjenesteside, uten hovedmenyplass | WordPress-audit, hastighet, plugins/tema, hosting/PHP/database, SEO, CRO, sikkerhet og vedlikehold |
| #39 | JA | `/nettsidemigrering/` | Selvstendig tjenesteside | Plattformbytte, valg av ny løsning, innhold/data, SEO/URL, integrasjoner, trygg overgang og oppfølging |
| #40 | JA | `/nettsidevedlikehold/` | Selvstendig tjenesteside | Månedlig teknisk drift: oppdateringer, sikkerhet, backup, oppetid, hosting/DNS/SSL, helsesjekk, status |
| #41 | JA | `/funksjonsovervakning/` | Selvstendig spesialisert tjenesteside | Aktiv testing av skjema, booking, checkout og integrasjoner, varsling, feilhistorikk og månedsrapport |
| #42 | JA | `/nettsideanalyse/` | Selvstendig betalt inngangsprodukt | Tverrfaglig nettsideaudit, SEO/AI-søk, CRO, hastighet, sporing, prioritert plan og rapport |
| #43 | JA | `/digital-konkurrentanalyse/` | Selvstendig betalt analyseprodukt | Offentlige konkurrentdata, nettsider, tilbud, budskap, Google/AI-synlighet, annonser, CRO, handlingsplan |

**Avviste separate URL-er (ikke i sitemap):** #44 `/konvertering/tilbudsoptimalisering/` – tilbud/verdibudskap og prissider. #45 `/konvertering/kontaktskjemaer/` – skjemaflyt/leadkvalifisering under allerede godkjente #2 og #10.

| #46 | JA | `/ai-chatbot/` | Selvstendig tjenesteside | Kunnskapsbasert AI-chat, svar, kvalifisering, menneskelig overlevering, integrasjon, personvern og kvalitet |

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

- **Utvidelse fra #45:** **Skjemafelter og validering:** Fjerne unødvendige felt, forklare hva som må fylles ut og vise hjelpsomme feilmeldinger. Sørge for at skjemaet er enkelt å fullføre med tastatur og på mobil. **Kvalifiserende spørsmål før innsending:** Stille få, relevante spørsmål om tjenestebehov, prosjekt, beliggenhet og andre nødvendige kriterier slik at mottakeren kan forstå forespørselen. Spørsmål må ikke øke frafall uten en klar gevinst. **Dynamiske kontaktskjemaer:** Vise relevante oppfølgingsfelt basert på tidligere svar, for eksempel ulike felt for privat- og bedriftskunder, med tydelige valg og tilgjengelig interaksjon. **Spamkontroll, personvern og leveringskvalitet:** Begrense spam og misbruk, unngå unødvendig innsamling av personopplysninger og teste faktisk levering til riktig mottaker, ikke bare HTTP-respons. **Skjemafrafall og leadkvalitet:** Følge åpninger, frafall, vellykkede innsendinger og kvalitet på henvendelsene når dette kan måles. Vurdere både fullføringsgrad og faktisk relevans for virksomheten. Leadoppfølging etter innsending håndteres fortsatt under `/konvertering/leadoppfolging/`.

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

- **Utvidelse fra #44:** Tilbuds- og pakkeanalyse, reelle pakkealternativer og kundeløfter dokumenteres her; forklar kommersiell verdi og relevante forbehold. Konkrete pakketabeller, prissammenligning og pakkevelger ligger under `/konvertering/prissider/`. Ingen egen tilbudsoptimaliserings-URL.

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

- **Utvidelse fra #45:** **Leadkvalifisering og prioriteringsregler:** Avklare hvilke opplysninger som gjør et lead relevant, og bruke enkle dokumenterte regler for å sortere forespørsler uten å avvise gode kunder automatisk. **Routing og CRM-registrering:** Sende forespørsler til riktig ansvarlig person eller team og registrere nødvendige detaljer og status i relevant CRM, med sporbarhet og minst mulig persondata. **Oppfølging og kvalitetsmåling:** Følge om leads besvares, blir til møter eller kunder, og om skjemaets kvalifiseringsspørsmål faktisk forbedrer salgsarbeidet. Justere rutiner etter målbare erfaringer. Skjema-UX og spørsmål før innsending håndteres fortsatt under `/konvertering/henvendelser-og-booking/`.

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

- **Utvidelse fra #44:** Gjør pakkeforskjeller, pris, tillegg, vilkår og anbefalt valg forståelige på mobil. Mål pakkefordeling, kvalifiserte henvendelser og tilbudsaksept der data finnes; ingen kunstige ankere eller garanti om høyere margin. Strategisk pakkeutforming ligger under `/konvertering/budskap-og-tilbud/`.

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


### 35. Kundelojalitet og gjenkjøp — JA

- **/nettbutikkoptimalisering/gjenkjop/** · Nettbutikkoptimalisering
- **Kundens problem:** Nettbutikken bruker penger på å skaffe nye kunder, men mange kjøper bare én gang. Uten systematisk arbeid med gjenkjøp, kundelojalitet og verdi etter første kjøp blir veksten unødvendig avhengig av stadig nye annonsekampanjer.
- **Dette kan vi levere:** **Analyse av kundeverdi og gjenkjøp** – Undersøke hvor ofte kunder handler igjen, tiden mellom kjøp, gjennomsnittlig ordreverdi og estimert kundeverdi over tid. **Kundesegmentering** – Identifisere førstegangskunder, lojale kunder, kunder med høy kjøpsverdi og kunder som ikke har handlet på lenge. **Gjenbestilling og abonnement** – Gjøre det enklere å kjøpe produkter på nytt, særlig varer som brukes opp eller bestilles regelmessig. Vurdere abonnementsløsninger der det passer. **Lojalitetsprogrammer og kundefordeler** – Utforme relevante fordeler, kundeklubber, bonusordninger eller andre tiltak som gir kundene en god grunn til å komme tilbake. **Personlige produktanbefalinger** – Bruke tilgjengelige kjøpsdata til å presentere relevant tilbehør, påfyll eller komplementære produkter i nettbutikken og tillatte kommunikasjonskanaler. **Opplevelsen etter kjøpet** – Forbedre ordrebekreftelser, kundeserviceinformasjon, returrutiner og videre oppfølging slik at kunden får tillit til å handle igjen. **Måling og løpende forbedring** – Følge gjenkjøpsrate, kundeverdi, kjøpsfrekvens og hvilke tiltak som gir dokumenterbare forbedringer.
- **Hvorfor egen side:** Selvstendig kommersiell intensjon: øke omsetningen og kundeverdien fra eksisterende kunder etter første kjøp, ikke bare skaffe nye besøkende eller forbedre checkout. Egner seg best for butikker med produkter eller relasjoner som gir naturlige gjenkjøpsmuligheter.
- **Avgrensning mot andre sider:** /epostmarkedsforing/ handler om e-post som kanal, utsendelser og automatiserte kommunikasjonsløp. /nettbutikkoptimalisering/gjenkjop/ handler om den brede gjenkjøpsstrategien: butikkfunksjonalitet, produkt- og kundedata, kundeklubb, gjenbestilling, kundeopplevelse og måling. /nettbutikkoptimalisering/kjopsflyt/ handler om fullføring av kjøpet og handlekurv.
- **Leveranse og kommersiell modell:** Kartlegg gjenkjøpsrate, kundegrupper og produktøkonomi → identifiser tiltak med forventet gevinst → implementer forenklet gjenbestilling/kundeklubb/etterkjøpsopplevelse → mål retensjon, kjøpsfrekvens og kundeverdi. Selg avgrenset analyse og oppsett, med mulig månedlig avtale for optimalisering. CTA: «Finn ut hva eksisterende kunder kan være verdt».
- **Kvalitetskrav:** Ikke lov økt livstidsverdi eller gjenkjøpsrate uten dokumentasjon. Vurder økonomien i rabatter og lojalitetsordninger. Kundedata og segmentering forutsetter gyldig behandlingsgrunnlag; elektronisk markedsføring må følge samtykkeregler. Ikke alle butikker har produkter med naturlig høy kjøpsfrekvens. Pakkefordeling og priser bestemmes senere.


### #35 · `/nettbutikkoptimalisering/gjenkjop/` — Kundelojalitet og gjenkjøp

- **Kundeproblem:** Nettbutikken bruker penger på å skaffe nye kunder, men mange kjøper bare én gang. Uten systematisk arbeid med gjenkjøp, kundelojalitet og verdi etter første kjøp blir veksten unødvendig avhengig av stadig nye annonsekampanjer.
- **Hvorfor egen side:** Selvstendig kommersiell intensjon: øke omsetningen og kundeverdien fra eksisterende kunder etter første kjøp, ikke bare skaffe nye besøkende eller forbedre checkout. Egner seg best for butikker med produkter eller relasjoner som gir naturlige gjenkjøpsmuligheter.
- **Avgrensning / nabosider:** /epostmarkedsforing/ handler om e-post som kanal, utsendelser og automatiserte kommunikasjonsløp. /nettbutikkoptimalisering/gjenkjop/ handler om den brede gjenkjøpsstrategien: butikkfunksjonalitet, produkt- og kundedata, kundeklubb, gjenbestilling, kundeopplevelse og måling. /nettbutikkoptimalisering/kjopsflyt/ handler om fullføring av kjøpet og handlekurv.
- **Leveranse og salgsløp:** Kartlegg gjenkjøpsrate, kundegrupper og produktøkonomi → identifiser tiltak med forventet gevinst → implementer forenklet gjenbestilling/kundeklubb/etterkjøpsopplevelse → mål retensjon, kjøpsfrekvens og kundeverdi. Selg avgrenset analyse og oppsett, med mulig månedlig avtale for optimalisering. CTA: «Finn ut hva eksisterende kunder kan være verdt».
- **Kvalitetskrav / forbehold:** Ikke lov økt livstidsverdi eller gjenkjøpsrate uten dokumentasjon. Vurder økonomien i rabatter og lojalitetsordninger. Kundedata og segmentering forutsetter gyldig behandlingsgrunnlag; elektronisk markedsføring må følge samtykkeregler. Ikke alle butikker har produkter med naturlig høy kjøpsfrekvens. Pakkefordeling og priser bestemmes senere.

### 36. Shopify-optimalisering — JA

- **/nettbutikkoptimalisering/shopify/** · Under Nettbutikkoptimalisering
- **Kundens problem:** Bedriften har en Shopify-butikk som fungerer, men får mindre salg enn forventet. Den kan være treg, ha for mange apper, svake produkt- og kategorisider, vanskelig navigasjon eller lav konverteringsrate. Kunden trenger målrettede forbedringer i eksisterende butikk, ikke automatisk en total ombygging.
- **Dette kan vi levere:** **Shopify-analyse og forbedringsplan** – Gjennomgå butikkens struktur, brukeropplevelse, tekniske oppsett, trafikk og kjøpsflyt. Identifisere hvilke forbedringer som bør prioriteres først. **Hastighet, tema og app-optimalisering** – Undersøke hvordan Shopify-temaet, bilder, JavaScript og installerte apper påvirker ytelsen. Rydde opp eller forbedre der det er teknisk mulig. **Produkt- og kategorisider** – Forbedre produktpresentasjon, varianter, filtrering, navigasjon, kjøpsknapper og informasjon som hjelper kundene å velge riktig. **Handlekurv og checkout** – Identifisere frafall, forbedre handlekurven og optimalisere tilgjengelige checkout-funksjoner innenfor Shopify-planens og plattformens begrensninger. **Shopify SEO** – Optimalisere produkt- og kategoristruktur, metadata, internlenking, indeksering og relevant strukturert data. **Integrasjoner og sporing** – Kontrollere Google Analytics, Google Shopping, Meta Pixel/CAPI, betalingsløsninger og relevante tredjepartsintegrasjoner. **Løpende Shopify-optimalisering** – Analysere produktprestasjoner, kjøpsflyt og salg, implementere prioriterte forbedringer og følge resultatene over tid.
- **Hvorfor egen side:** Shopify er et konkret teknologivalg med plattformspesifikke begrensninger, feilbilder, integrasjoner og kjøpsintensjon. En spesialisert inngang gjør at virksomheter som allerede bruker Shopify kan kjøpe hjelp til eksisterende butikk uten først å bestille en ny nettbutikk.
- **Skille mot andre tjenester:** /nettbutikkoptimalisering/ dekker alle nettbutikkplattformer; /nettbutikkoptimalisering/shopify/ gjelder Shopify-tema, apper, butikkoppsett og plattformbegrensninger; /nettbutikkoptimalisering/produktsider/ gjelder produkt- og kategorisider på tvers av plattformer; /nettbutikkoptimalisering/kjopsflyt/ gjelder handlekurv/checkout; /google-shopping/merchant-center/ gjelder Google-produktdata. Ikke gjenbruk generiske avsnitt ukritisk.
- **Leveranse og kommersiell modell:** Start med avgrenset Shopify-gjennomgang med konkrete funn og prioritert tiltaksplan. Tilby implementering av avtalt omfang, for eksempel temajustering, app-opprydding, UX/SEO- og sporingsforbedringer, og deretter valgfritt månedlig arbeid. Primær CTA: «Få vurdert Shopify-butikken». Ikke lov effekt eller pris før kartlegging.
- **Avgrensninger og kvalitetskrav:** Shopify-plan, tema, apper, Shopify checkout- og plattform-API-er begrenser hva som kan tilpasses. Kontroller reell implementeringsmulighet og rettigheter før salg; endringer testes på passende måte, med backup/rollback der mulig. Ikke lov bestemt hastighet eller konverteringsøkning, og ikke fjern apper uten konsekvensanalyse. Ikke publiser dupliserte tekster fra generiske nettbutikksider. Oppsett av sporing må følge personvernkrav.

### #36 · `/nettbutikkoptimalisering/shopify/` — Shopify-optimalisering

- **Kundeproblem:** Bedriften har en Shopify-butikk som fungerer, men får mindre salg enn forventet. Den kan være treg, ha for mange apper, svake produkt- og kategorisider, vanskelig navigasjon eller lav konverteringsrate. Kunden trenger målrettede forbedringer i eksisterende butikk, ikke automatisk en total ombygging.
- **Hvorfor egen side:** Shopify er et konkret teknologivalg med plattformspesifikke begrensninger, feilbilder, integrasjoner og kjøpsintensjon. En spesialisert inngang gjør at virksomheter som allerede bruker Shopify kan kjøpe hjelp til eksisterende butikk uten først å bestille en ny nettbutikk.
- **Avgrensning / nabosider:** /nettbutikkoptimalisering/ dekker alle nettbutikkplattformer; /nettbutikkoptimalisering/shopify/ gjelder Shopify-tema, apper, butikkoppsett og plattformbegrensninger; /nettbutikkoptimalisering/produktsider/ gjelder produkt- og kategorisider på tvers av plattformer; /nettbutikkoptimalisering/kjopsflyt/ gjelder handlekurv/checkout; /google-shopping/merchant-center/ gjelder Google-produktdata. Ikke gjenbruk generiske avsnitt ukritisk.
- **Leveranse og salgsløp:** Start med avgrenset Shopify-gjennomgang med konkrete funn og prioritert tiltaksplan. Tilby implementering av avtalt omfang, for eksempel temajustering, app-opprydding, UX/SEO- og sporingsforbedringer, og deretter valgfritt månedlig arbeid. Primær CTA: «Få vurdert Shopify-butikken». Ikke lov effekt eller pris før kartlegging.
- **Kvalitetskrav / forbehold:** Shopify-plan, tema, apper, Shopify checkout- og plattform-API-er begrenser hva som kan tilpasses. Kontroller reell implementeringsmulighet og rettigheter før salg; endringer testes på passende måte, med backup/rollback der mulig. Ikke lov bestemt hastighet eller konverteringsøkning, og ikke fjern apper uten konsekvensanalyse. Ikke publiser dupliserte tekster fra generiske nettbutikksider. Oppsett av sporing må følge personvernkrav.

### 37. WooCommerce-optimalisering — JA med kommentar

- **/nettbutikkoptimalisering/woocommerce/** · Under Nettbutikkoptimalisering
- **Kundens problem:** Bedriften har en treg, kompleks eller tungdrevet WooCommerce-nettbutikk. Plugins og tema skaper konflikt, kjøpsflyten svikter, og vedlikeholdet koster for mye. Kunden trenger en kompetent vurdering av om butikken bør forbedres eller om en enklere plattform vil gi bedre økonomi.
- **Dette kan vi levere:** **WooCommerce-analyse og forbedringsplan** – Gjennomgå butikkens tekniske tilstand, brukeropplevelse, plugins, kjøpsflyt og konverteringsdata. Prioritere tiltak etter forventet verdi og arbeidsomfang. **Hastighet og ytelsesoptimalisering** – Forbedre bilder, caching, databasebelastning, serverrespons og frontend-ressurser med hensyn til dynamiske handlekurv- og betalingsfunksjoner. **Plugins, tema og teknisk opprydding** – Kartlegge unødvendige utvidelser, kompatibilitetsproblemer, feil og vedlikeholdsrisiko. Forbedre eksisterende oppsett uten å ødelegge viktige funksjoner. **Produkt- og kategorisider** – Forbedre produktinformasjon, varianter, filtrering, navigasjon og kjøpsknapper, spesielt på mobil. **Handlekurv og checkout** – Redusere friksjon i kassen, forbedre felt og betalingsalternativer, og gjennomgå integrasjoner med blant annet Vipps, Klarna og kortbetaling. **WooCommerce SEO** – Forbedre produktstruktur, metadata, kanoniske adresser, internlenking, indeksering og relevant produktdata for søkemotorer. **Sikkerhet, oppdateringer og løpende optimalisering** – Kontrollere vedlikeholdsstatus, oppdateringsrutiner, backups, kompatibilitet og relevante integrasjoner. Gjennomføre videre forbedringer etter avtale. **Plattformvurdering: beholde WooCommerce eller flytte til Shopify?** – Sammenligne forventet vedlikehold, kostnader, funksjonelle behov, integrasjoner og migreringsrisiko. For små og mellomstore nettbutikker på kompliserte Magento-/Adobe Commerce-oppsett kan Shopify eller en enklere plattform være et bedre alternativ. Anbefal aldri flytting før en konkret behovs- og kostnadsvurdering.
- **Hvorfor egen side:** WooCommerce er WordPress-basert og har andre drifts-, plugin-, database-, hosting- og sikkerhetsutfordringer enn Shopify. Kjøpsintensjonen «hjelp til WooCommerce» er spesifikk; siden skal løse eksisterende WooCommerce-problemer, og samtidig kunne gi objektiv plattformrådgivning.
- **Skille mot andre tjenester:** /nettbutikkoptimalisering/ er plattformnøytral, /nettbutikkoptimalisering/shopify/ er Shopify-spesifikk; /nettbutikkoptimalisering/woocommerce/ handler om WordPress/WooCommerce og beslutningen optimalisere vs migrere. /nettbutikkoptimalisering/kjopsflyt/ dekker checkout på tvers av plattformer. Magento/Adobe Commerce nevnes som mulig tungt alternativ, men er ikke en egen godkjent Magento-side. E-post og Google Merchant Center har egne sider.
- **Leveranse og kommersiell modell:** Gjennomfør en WooCommerce-gjennomgang → avklar teknisk gjeld og faktisk lønnsomhet → anbefal enten målrettet opprydding og forbedring eller en separat vurdert overgang til Shopify/enklere nettbutikk → gjennomfør avtalte tiltak → tilby månedlig drift/CRO/SEO der relevant. CTA: «Få vurdert WooCommerce-butikken – bør den forbedres eller flyttes?»
- **Strategisk vinkling (brukerkommentar):** Brukerens kommentar: «Magento er trash» og at Shopify eller en enklere løsning er best for de fleste. Redaksjonell tolkning: Vær tydelig skeptisk til Magento/Adobe Commerce for typiske norske SMB-nettbutikker når teknisk kompleksitet, spesialisert drift og total eierkostnad ikke gir dokumenterbar forretningsverdi. Ikke publiser det kategoriske utsagnet som objektivt faktum. Sammenlign faktiske behov, integrasjoner, plattformkostnader, eksisterende investering, utviklingsfleksibilitet, teknisk gjeld, SEO-migreringsrisiko og drift før man anbefaler WooCommerce-opprydding eller overgang til Shopify/enklere alternativ. Magento kan være fornuftig for enkelte komplekse bedrifter. WooCommerce kan være riktig ved WordPress-/innholdsavhengighet, kontrollbehov og eksisterende tilpasninger.
- **Avgrensninger og kvalitetskrav:** Ikke kall Magento objektivt «trash» eller påstå at Shopify alltid er best. For de fleste enkle SMB-case kan Magento/Adobe Commerce være uforholdsmessig komplekst, men plattformvalg må underbygges individuelt. Migrering krever analyse av data, SEO/redirects, produktvarianter, apper, spesialintegrasjoner, betalingsoppsett, ordre/kunder og overgangskostnader. Ikke selg ubegrenset WP-plugin-/PHP-feilsøking som rimelig retainer; spesialtilpasninger prises separat. Sjekk hosting/sikkerhet, backup/staging, relevant personvern og dokumenterbar gevinst.

### #37 · `/nettbutikkoptimalisering/woocommerce/` — WooCommerce-optimalisering

- **Kundeproblem:** Bedriften har en treg, kompleks eller tungdrevet WooCommerce-nettbutikk. Plugins og tema skaper konflikt, kjøpsflyten svikter, og vedlikeholdet koster for mye. Kunden trenger en kompetent vurdering av om butikken bør forbedres eller om en enklere plattform vil gi bedre økonomi.
- **Hvorfor egen side:** WooCommerce er WordPress-basert og har andre drifts-, plugin-, database-, hosting- og sikkerhetsutfordringer enn Shopify. Kjøpsintensjonen «hjelp til WooCommerce» er spesifikk; siden skal løse eksisterende WooCommerce-problemer, og samtidig kunne gi objektiv plattformrådgivning.
- **Avgrensning / nabosider:** /nettbutikkoptimalisering/ er plattformnøytral, /nettbutikkoptimalisering/shopify/ er Shopify-spesifikk; /nettbutikkoptimalisering/woocommerce/ handler om WordPress/WooCommerce og beslutningen optimalisere vs migrere. /nettbutikkoptimalisering/kjopsflyt/ dekker checkout på tvers av plattformer. Magento/Adobe Commerce nevnes som mulig tungt alternativ, men er ikke en egen godkjent Magento-side. E-post og Google Merchant Center har egne sider.
- **Leveranse og salgsløp:** Gjennomfør en WooCommerce-gjennomgang → avklar teknisk gjeld og faktisk lønnsomhet → anbefal enten målrettet opprydding og forbedring eller en separat vurdert overgang til Shopify/enklere nettbutikk → gjennomfør avtalte tiltak → tilby månedlig drift/CRO/SEO der relevant. CTA: «Få vurdert WooCommerce-butikken – bør den forbedres eller flyttes?»
- **Strategisk vinkling:** Tydelig Magento-kritisk for SMB når total eierkostnad/kompleksitet ikke står i forhold til behov, og anbefal konkret vurdert Shopify-/enklere løsning ved behov; ikke universell plattformdom.
- **Kvalitetskrav / forbehold:** Ikke kall Magento objektivt «trash» eller påstå at Shopify alltid er best. For de fleste enkle SMB-case kan Magento/Adobe Commerce være uforholdsmessig komplekst, men plattformvalg må underbygges individuelt. Migrering krever analyse av data, SEO/redirects, produktvarianter, apper, spesialintegrasjoner, betalingsoppsett, ordre/kunder og overgangskostnader. Ikke selg ubegrenset WP-plugin-/PHP-feilsøking som rimelig retainer; spesialtilpasninger prises separat. Sjekk hosting/sikkerhet, backup/staging, relevant personvern og dokumenterbar gevinst.

### 38. WordPress-optimalisering — JA

- **/wordpress-optimalisering/** · Selvstendig tjenesteside uten hovedmenyplass
- **Kundens problem:** Bedriften har allerede en WordPress-nettside, men den er treg, vanskelig å oppdatere eller skaper for få henvendelser. Gamle plugins, tungt tema, feilkonfigurert hosting og manglende vedlikehold kan føre til tekniske feil, sikkerhetsrisiko og unødvendige kostnader. Kunden ønsker å forbedre dagens nettsted uten automatisk å bestille en ny nettside.
- **Dette kan vi levere:** **WordPress-analyse** – Kartlegge teknisk tilstand, ytelse, plugins, tema, brukeropplevelse og hvilke problemer som bør løses først. **Hastighetsoptimalisering** – Forbedre bilder, caching, JavaScript, CSS, serverrespons og Core Web Vitals der teknisk mulig. **Plugin- og temaopprydding** – Identifisere unødvendige plugins, kompatibilitetsfeil, utdaterte temaer og tung kode. Rydde opp uten å fjerne viktige funksjoner. **Hosting, PHP og database** – Gjennomgå PHP-versjon, database, ressursbruk og hostingoppsett. Vurdere om eksisterende hosting er tilstrekkelig eller bør endres. **WordPress SEO** – Kontrollere teknisk indeksering, metadata, URL-struktur, interne lenker, SEO-plugins og relevante strukturerte data. **Konverteringsoptimalisering** – Forbedre navigasjon, mobilopplevelse, kontaktknapper, skjemaer og landingssider slik at flere besøkende kan bli kunder. **Sikkerhet og vedlikehold** – Kontrollere oppdateringer, backup, sikkerhetskonfigurasjon og gjenopprettingsrutiner. Tilby løpende vedlikehold innenfor avtalt omfang.
- **Hvorfor egen side:** Egen plattformspesifikk kjøpsintensjon: bedriften søker hjelp til en eksisterende WordPress-side og trenger bred vurdering av hele løsningen, ikke bare hastighet, teknisk SEO eller en ny side. Kombiner teknisk reparasjon med konkret forbedring av konvertering og stabilitet.
- **Skille mot andre tjenester:** /wordpress-optimalisering/ gjelder vanlige WordPress-nettsteder uten nettbutikk, mens /nettbutikkoptimalisering/woocommerce/ gjelder WooCommerce. /nettsidehastighet/ er plattformnøytral ytelse, /seo/teknisk-seo/ er søkeindeksering og tekniske SEO-hindringer, og /konvertering/ dekker CRO på tvers av plattformer. Ikke kopier de andre sidene; tilby en samlet, WordPress-spesifikk diagnose og tiltaksplan.
- **Leveranse og kommersiell modell:** Start med betalt eller tydelig avgrenset WordPress-gjennomgang, prioriterer de mest lønnsomme/stabiliserende tiltakene. Implementer separat avtalt opprydding, ytelses- og CRO-forbedring. Tilby avgrenset månedlig vedlikeholds- og optimaliseringsavtale der behovet tilsier det. Primær CTA: «Få vurdert WordPress-nettsiden». Ved ekstrem teknisk gjeld: vurder rebuild eller plattformbytte separat.
- **Avgrensninger og kvalitetskrav:** Ikke inkluder ubegrenset plugin-feilsøking, PHP-oppgraderinger, beredskap eller sikkerhetsutbedringer i rimelige faste månedsavtaler. Eldre plugin-/temakode og servermiljøer krever egen risiko- og kapasitetsvurdering; backup, staging, oppdateringsplan og rollback før risikable endringer. Ikke lov bestemt hastighet, ranking eller konverteringsvekst uten måling. WordPress/hosting, PHP- og databasekrav må vurderes mot faktiske versjoner før anbefaling. Ingen hovedmenyplass.

### #38 · `/wordpress-optimalisering/` — WordPress-optimalisering

- **Kundeproblem:** Bedriften har allerede en WordPress-nettside, men den er treg, vanskelig å oppdatere eller skaper for få henvendelser. Gamle plugins, tungt tema, feilkonfigurert hosting og manglende vedlikehold kan føre til tekniske feil, sikkerhetsrisiko og unødvendige kostnader. Kunden ønsker å forbedre dagens nettsted uten automatisk å bestille en ny nettside.
- **Hvorfor egen side:** Egen plattformspesifikk kjøpsintensjon: bedriften søker hjelp til en eksisterende WordPress-side og trenger bred vurdering av hele løsningen, ikke bare hastighet, teknisk SEO eller en ny side. Kombiner teknisk reparasjon med konkret forbedring av konvertering og stabilitet.
- **Avgrensning / nabosider:** /wordpress-optimalisering/ gjelder vanlige WordPress-nettsteder uten nettbutikk, mens /nettbutikkoptimalisering/woocommerce/ gjelder WooCommerce. /nettsidehastighet/ er plattformnøytral ytelse, /seo/teknisk-seo/ er søkeindeksering og tekniske SEO-hindringer, og /konvertering/ dekker CRO på tvers av plattformer. Ikke kopier de andre sidene; tilby en samlet, WordPress-spesifikk diagnose og tiltaksplan.
- **Leveranse og salgsløp:** Start med betalt eller tydelig avgrenset WordPress-gjennomgang, prioriterer de mest lønnsomme/stabiliserende tiltakene. Implementer separat avtalt opprydding, ytelses- og CRO-forbedring. Tilby avgrenset månedlig vedlikeholds- og optimaliseringsavtale der behovet tilsier det. Primær CTA: «Få vurdert WordPress-nettsiden». Ved ekstrem teknisk gjeld: vurder rebuild eller plattformbytte separat.
- **Kvalitetskrav / forbehold:** Ikke inkluder ubegrenset plugin-feilsøking, PHP-oppgraderinger, beredskap eller sikkerhetsutbedringer i rimelige faste månedsavtaler. Eldre plugin-/temakode og servermiljøer krever egen risiko- og kapasitetsvurdering; backup, staging, oppdateringsplan og rollback før risikable endringer. Ikke lov bestemt hastighet, ranking eller konverteringsvekst uten måling. WordPress/hosting, PHP- og databasekrav må vurderes mot faktiske versjoner før anbefaling. Ingen hovedmenyplass.

### 39. Nettsidemigrering og plattformbytte — JA

- **/nettsidemigrering/** · Selvstendig tjenesteside
  - **Kundens problem:** Bedriften har en nettside eller nettbutikk som er utdatert, dyr eller vanskelig å utvikle videre. Utdatert CMS, hosting, gammel PHP, plugins eller kompliserte integrasjoner gjør endringer langsomme. Kunden vil over på en enklere løsning, men frykter å miste synlighet, innhold, kunder, bestillinger eller kritisk funksjonalitet underveis.
  - **Dette kan vi levere:** **Analyse av eksisterende løsning** – Gjennomgå CMS, teknisk gjeld, hosting, kostnader, funksjoner, trafikk og integrasjoner. Vurdere om det er mest lønnsomt å forbedre dagens løsning eller bytte plattform. **Valg av ny plattform** – Sammenligne relevante løsninger som Shopify, WordPress, enklere CMS-løsninger og moderne statiske eller headless nettsteder ut fra faktiske behov, vedlikehold og totalkostnad. **Overføring av innhold og data** – Migrere relevante sider, bilder, dokumenter, produkter og andre data. For nettbutikker vurdere håndtering av kunder, ordre, produktvarianter og historikk. **SEO-bevaring og URL-migrering** – Kartlegge eksisterende URL-er, metadata, interne lenker og viktige landingssider. Planlegge redirects, canonical, sitemap og kontroll av indeksering ved lansering. **Integrasjoner og funksjonalitet** – Kartlegge skjemaer, booking, betaling, logistikk, CRM, analyseverktøy og andre integrasjoner. Avklare hva som kan videreføres og hva som eventuelt må bygges på nytt. **Testing og trygg overgang** – Teste den nye løsningen før lansering, kontrollere viktige brukerreiser, sette opp nødvendige sikkerhetstiltak og ha en realistisk plan for tilbakeføring dersom noe går galt. **Oppfølging etter lansering** – Overvåke tekniske feil, indeksering, trafikk, konverteringer og funksjoner etter plattformbyttet. Prioritere eventuelle problemer og forbedringer.
  - **Hvorfor egen side:** Plattformbytte er et selvstendig, ofte større kjøpsprosjekt som går på tvers av CMS og nettbutikkplattformer. Kunden søker en trygg vurdering og gjennomføring av en samlet overgang, ikke bare SEO-migrering eller optimalisering av eksisterende plattform.
  - **Skille mot andre tjenester:** /nettsidemigrering/ dekker beslutningen behold/bytt, hele prosjektet, innhold/data/integrasjoner og teknisk overgang. /seo/seo-migrering/ gjelder SEO-bevaring ved redesign og flytting. /wordpress-optimalisering/ forbedrer eksisterende WordPress; /nettbutikkoptimalisering/shopify/ og /nettbutikkoptimalisering/woocommerce/ gjelder spesifikke plattformer. Magento/Adobe Commerce kan være en relevant kildeplattform, men et eventuelt Shopify-bytte må begrunnes i kostnad/krav og risiko.
  - **Leveranse og kommersiell modell:** Start med en avgrenset betalt migreringsanalyse av kostnader, datatyper, integrasjoner, funksjoner, SEO og risiko. Utarbeid forslag til hensiktsmessig målplattform og estimert migreringsløp. Deretter prosjekt med definert scope, migreringskart, test og cutover, samt separat avtalt oppfølging/videre optimalisering. CTA: «Få vurdert plattformbytte». Særlig aktuell for tungdrevne Magento-, legacy PHP-, gamle CMS- og spesialbygde løsninger.
  - **Avgrensninger og kvalitetskrav:** Ikke lov null nedetid, null SEO-tap eller tapsfri/problemfri overføring. Migrering skal omfatte inventar og avhengigheter, URL- og redirect-matrise, backup/staging, sikker databehandling, avklarte integrasjoner, datavalidering, realistisk rollback der mulig og overvåking ved lansering. Migreringsprosjekter prises etter faktisk kompleksitet. Ingen kategoriske påstander om at alle Magento-kunder bør gå til Shopify; vurder funksjonskrav, totalkostnad, avtaler, personvern og SEO-risiko. Løpende drift/vedlikehold er separat tjeneste.

### #39 · `/nettsidemigrering/` — Nettsidemigrering og plattformbytte

- **Kundeproblem:** Bedriften har en nettside eller nettbutikk som er utdatert, dyr eller vanskelig å utvikle videre. Utdatert CMS, hosting, gammel PHP, plugins eller kompliserte integrasjoner gjør endringer langsomme. Kunden vil over på en enklere løsning, men frykter å miste synlighet, innhold, kunder, bestillinger eller kritisk funksjonalitet underveis.
- **Hvorfor egen side:** Plattformbytte er et selvstendig, ofte større kjøpsprosjekt som går på tvers av CMS og nettbutikkplattformer. Kunden søker en trygg vurdering og gjennomføring av en samlet overgang, ikke bare SEO-migrering eller optimalisering av eksisterende plattform.
- **Avgrensning / nabosider:** /nettsidemigrering/ dekker beslutningen behold/bytt, hele prosjektet, innhold/data/integrasjoner og teknisk overgang. /seo/seo-migrering/ gjelder SEO-bevaring ved redesign og flytting. /wordpress-optimalisering/ forbedrer eksisterende WordPress; /nettbutikkoptimalisering/shopify/ og /nettbutikkoptimalisering/woocommerce/ gjelder spesifikke plattformer. Magento/Adobe Commerce kan være en relevant kildeplattform, men et eventuelt Shopify-bytte må begrunnes i kostnad/krav og risiko.
- **Leveranse og salgsløp:** Start med en avgrenset betalt migreringsanalyse av kostnader, datatyper, integrasjoner, funksjoner, SEO og risiko. Utarbeid forslag til hensiktsmessig målplattform og estimert migreringsløp. Deretter prosjekt med definert scope, migreringskart, test og cutover, samt separat avtalt oppfølging/videre optimalisering. CTA: «Få vurdert plattformbytte». Særlig aktuell for tungdrevne Magento-, legacy PHP-, gamle CMS- og spesialbygde løsninger.
- **Kvalitetskrav / forbehold:** Ikke lov null nedetid, null SEO-tap eller tapsfri/problemfri overføring. Migrering skal omfatte inventar og avhengigheter, URL- og redirect-matrise, backup/staging, sikker databehandling, avklarte integrasjoner, datavalidering, realistisk rollback der mulig og overvåking ved lansering. Migreringsprosjekter prises etter faktisk kompleksitet. Ingen kategoriske påstander om at alle Magento-kunder bør gå til Shopify; vurder funksjonskrav, totalkostnad, avtaler, personvern og SEO-risiko. Løpende drift/vedlikehold er separat tjeneste.

### 40. Nettsidevedlikehold og teknisk drift — JA

- **/nettsidevedlikehold/** · Selvstendig tjenesteside
  - **Kundens problem:** Bedriften har en nettside som fungerer, men ingen har tydelig ansvar for teknisk vedlikehold. Oppdateringer utsettes, backup er kanskje ikke testet og feil oppdages ofte først når kunder melder fra. De ønsker stabil drift uten å håndtere plugins, sikkerhetsvarsler, servere og driftsproblemer selv.
  - **Dette kan vi levere:** **Oppdateringer og vedlikehold** – Holde relevante CMS-, plugin-, tema- og systemkomponenter oppdatert. Teste risikable oppdateringer før produksjonssetting, der løsningen tillater det. **Sikkerhetskontroll** – Følge opp kjente sårbarheter, utdaterte komponenter, sikkerhetsvarsler og grunnleggende konfigurasjonsproblemer. Prioritere nødvendige tiltak etter risiko. **Backup og gjenoppretting** – Kontrollere at relevante sikkerhetskopier tas og oppbevares forsvarlig. Gjennomføre avtalte gjenopprettingstester, slik at backup faktisk kan brukes ved behov. **Overvåkning av oppetid** – Overvåke nettstedets tilgjengelighet og varsle ved relevante driftsfeil. Hendelser håndteres innenfor avtalte åpningstider og responstider. **Hosting, domene og SSL** – Kontrollere relevante sertifikater, domeneutløp, DNS-konfigurasjon, hostingressurser og tjenesteavhengigheter der vi har tilgang og ansvar. **Teknisk helsesjekk** – Kontrollere kritiske sider, kontaktskjemaer, bestillingsfunksjoner og integrasjoner etter relevante oppdateringer. Avdekke tekniske problemer før de utvikler seg. **Månedlig status og anbefalinger** – Gi en kort, forståelig oversikt over utført arbeid, identifiserte problemer og tiltak som bør prioriteres videre.
  - **Hvorfor egen side:** Teknisk drift og forebyggende vedlikehold er et konkret kjøpsbehov med naturlig gjentakende betaling og en annen verdiforventning enn vekst- og konverteringsarbeid. Nettsiden skal love tydelige roller, avtalte kontroller og realistiske responstider, ikke ubegrenset IT-support.
  - **Skille mot andre tjenester:** /nettsidevedlikehold/ handler om stabilitet, kontroll, sikkerhet og forebyggende teknisk drift. /kontinuerlig-optimalisering/ handler om vekst, SEO/CRO, flere henvendelser og lønnsomhet. /wordpress-optimalisering/ handler om å forbedre en WordPress-løsning gjennom konkrete prosjekter. /nettsidemigrering/ gjelder plattformbytte. Kritiske funksjonstester av skjemaer/booking/betaling kan være tillegg til vedlikehold; eget tjenestetilbud vurderes separat i punkt #41.
  - **Leveranse og kommersiell modell:** Gjennomfør en tydelig tilstandsvurdering og registrer plattform, tilgang, risiko og eksisterende leverandøransvar. Tilby plattformtilpasset abonnement med avtalt oppdaterings-/kontrollfrekvens, backupverifisering, monitorering, håndtering av kjente sårbarheter, enkel rapport og klart definerte supportgrenser. Tilby selvstendig engangsutbedring ved gamle systemer før fastprisavtale. Etter hvert kan kunden kjøpe CRO/SEO som separat vekstavtale. CTA: «Få vurdert teknisk vedlikehold».
  - **Avgrensninger og kvalitetskrav:** Ikke lov 100 % oppetid, døgnvakt eller bestemt SLA før bemanning, plattform, ansvarsdeling og responstider er definert. Rimelige månedsavtaler inkluderer ikke ubegrenset feilretting, hackingopprydding, gjenoppretting, spesialkode, store PHP-/CMS-oppgraderinger eller migrering. Staging/backup før risikable oppdateringer; vurder restaureringstid, oppbevaring og tilgangsstyring. Shopify, statiske nettsteder og WordPress har svært ulike vedlikeholdsbehov; ingen generisk plugin-pakke til Shopify/Cloudflare. Domene, DNS og hosting håndteres bare der rollen og tilgangen er avtalt. Pakkestruktur og priser avklares etter sitemap.

### #40 · `/nettsidevedlikehold/` — Nettsidevedlikehold og teknisk drift

- **Kundeproblem:** Bedriften har en nettside som fungerer, men ingen har tydelig ansvar for teknisk vedlikehold. Oppdateringer utsettes, backup er kanskje ikke testet og feil oppdages ofte først når kunder melder fra. De ønsker stabil drift uten å håndtere plugins, sikkerhetsvarsler, servere og driftsproblemer selv.
- **Hvorfor egen side:** Teknisk drift og forebyggende vedlikehold er et konkret kjøpsbehov med naturlig gjentakende betaling og en annen verdiforventning enn vekst- og konverteringsarbeid. Nettsiden skal love tydelige roller, avtalte kontroller og realistiske responstider, ikke ubegrenset IT-support.
- **Avgrensning / nabosider:** /nettsidevedlikehold/ handler om stabilitet, kontroll, sikkerhet og forebyggende teknisk drift. /kontinuerlig-optimalisering/ handler om vekst, SEO/CRO, flere henvendelser og lønnsomhet. /wordpress-optimalisering/ handler om å forbedre en WordPress-løsning gjennom konkrete prosjekter. /nettsidemigrering/ gjelder plattformbytte. Kritiske funksjonstester av skjemaer/booking/betaling kan være tillegg til vedlikehold; eget tjenestetilbud vurderes separat i punkt #41.
- **Leveranse og salgsløp:** Gjennomfør en tydelig tilstandsvurdering og registrer plattform, tilgang, risiko og eksisterende leverandøransvar. Tilby plattformtilpasset abonnement med avtalt oppdaterings-/kontrollfrekvens, backupverifisering, monitorering, håndtering av kjente sårbarheter, enkel rapport og klart definerte supportgrenser. Tilby selvstendig engangsutbedring ved gamle systemer før fastprisavtale. Etter hvert kan kunden kjøpe CRO/SEO som separat vekstavtale. CTA: «Få vurdert teknisk vedlikehold».
- **Kvalitetskrav / forbehold:** Ikke lov 100 % oppetid, døgnvakt eller bestemt SLA før bemanning, plattform, ansvarsdeling og responstider er definert. Rimelige månedsavtaler inkluderer ikke ubegrenset feilretting, hackingopprydding, gjenoppretting, spesialkode, store PHP-/CMS-oppgraderinger eller migrering. Staging/backup før risikable oppdateringer; vurder restaureringstid, oppbevaring og tilgangsstyring. Shopify, statiske nettsteder og WordPress har svært ulike vedlikeholdsbehov; ingen generisk plugin-pakke til Shopify/Cloudflare. Domene, DNS og hosting håndteres bare der rollen og tilgangen er avtalt. Pakkestruktur og priser avklares etter sitemap.

### 41. Overvåkning av nettsidens kritiske funksjoner — JA

- **/funksjonsovervakning/** · Selvstendig spesialisert tjenesteside / månedlig avtale
  - **Kundens problem:** Nettsiden kan svare med HTTP 200 og se tilgjengelig ut, samtidig som kontaktskjemaet ikke leverer, booking feiler, betalingsflyten er ødelagt eller en CRM-/e-postintegrasjon står stille. Feilen oppdages først etter tapte henvendelser eller salg; vanlig oppetidsovervåkning fanger den ikke.
  - **Dette kan vi levere:** **Kartlegging av kritiske funksjoner** – Identifisere hvilke skjemaer, bestillingsløp, betalingsprosesser og integrasjoner som er avgjørende for at nettsiden skal generere inntekter. **Automatisk skjematesting** – Teste at et avtalt testskjema kan sendes, at serveren aksepterer innsendingen, og at resultatet faktisk når riktig mottakssystem der dette kan verifiseres. **Booking- og bestillingstester** – Kontrollere at viktige steg i bestillingsprosessen fungerer, uten å opprette uønskede ekte bookinger. **Kontroll av checkout og betaling** – Teste kjøpsflyt og sentrale betalingsintegrasjoner med egnede testmiljøer, testmodus eller sikre ikke-transaksjonelle kontroller. **Overvåkning av integrasjoner** – Kontrollere avtalte koblinger mot CRM, e-posttjenester, bookingmotorer og andre viktige eksterne systemer. **Automatisk varsling** – Varsle når en test feiler, med informasjon om hvilken funksjon som er berørt og hva som bør undersøkes. **Feilhistorikk og månedlig status** – Dokumentere testresultater, feil, varighet og oppfølging, slik at kunden får innsikt i driftssikkerheten til sine viktigste funksjoner.
  - **Hvorfor egen side:** Eget, avgrensbart kjøpsbehov: verifiser at kritiske kundereiser faktisk virker. Kan selges som testoppsett pluss spesialisert månedlig kontroll, også uavhengig av vanlig CMS-vedlikehold. Forskjellig teknisk leveranse fra status-/oppetidsmonitorering og fra konverteringssporing.
  - **Skille mot andre tjenester:** /nettsidevedlikehold/ dekker oppdateringer, sikkerhet, backup, oppetid og enkel teknisk helsesjekk etter oppdatering; /funksjonsovervakning/ tester avtalte ende-til-ende-funksjoner regelmessig og varsler ved feil. /sporing-og-maling/ måler hendelser, attribusjon og resultater; /kontinuerlig-optimalisering/ forbedrer prestasjonen. Unngå å selge samme kontroll to ganger; definer basisvedlikehold vs aktiv funksjonstest.
  - **Leveranse og kommersiell modell:** Kartlegg de 1–3 viktigste inntektskritiske flytene først → gjør en teknisk gjennomførbarhets- og risikovurdering → opprett sikre testscenarier/helsekontroller med varsling → verifiser faktisk sluttresultat der mulig → selg månedlig testkjøring, varsling og kort rapport, med avtalte åpningstider og separate reparasjonstimer. CTA: «Sjekk om skjema og bestilling faktisk fungerer». Start smalt og standardiser med gjenbrukbare testoppsett når teknisk mulig.
  - **Avgrensninger og kvalitetskrav:** Ikke markedsfør en manuell månedlig kontroll som kontinuerlig automatisk overvåkning. Ingen ekte kortbelastninger, irreversible bookinger eller ukontrollerte testordre. Benytt testmodus eller kontroller uten reelle transaksjoner; isoler og merk testdata i CRM og e-postsystemer. Bekreftet skjemainnsending er ikke automatisk bevis for at e-posten kom i riktig innboks – verifiser kjeden bare der tilgang og teknisk løsning tillater det. Beskytt personopplysninger, autorisasjon og nøkler. Definer testfrekvens, falske positiver, retry/alert, tilgjengelighet på testmiljø, ansvar, åpningstider, varsling og feilretting særskilt. Tjenesten er godkjent som kommersiell retning, ikke bevis for at en produksjonsklar plattform er bygget.

### #41 · `/funksjonsovervakning/` — Funksjonsovervåkning

- **Kundeproblem:** Nettsiden kan svare med HTTP 200 og se tilgjengelig ut, samtidig som kontaktskjemaet ikke leverer, booking feiler, betalingsflyten er ødelagt eller en CRM-/e-postintegrasjon står stille. Feilen oppdages først etter tapte henvendelser eller salg; vanlig oppetidsovervåkning fanger den ikke.
- **Hvorfor egen side:** Eget, avgrensbart kjøpsbehov: verifiser at kritiske kundereiser faktisk virker. Kan selges som testoppsett pluss spesialisert månedlig kontroll, også uavhengig av vanlig CMS-vedlikehold. Forskjellig teknisk leveranse fra status-/oppetidsmonitorering og fra konverteringssporing.
- **Avgrensning / nabosider:** /nettsidevedlikehold/ dekker oppdateringer, sikkerhet, backup, oppetid og enkel teknisk helsesjekk etter oppdatering; /funksjonsovervakning/ tester avtalte ende-til-ende-funksjoner regelmessig og varsler ved feil. /sporing-og-maling/ måler hendelser, attribusjon og resultater; /kontinuerlig-optimalisering/ forbedrer prestasjonen. Unngå å selge samme kontroll to ganger; definer basisvedlikehold vs aktiv funksjonstest.
- **Leveranse og salgsløp:** Kartlegg de 1–3 viktigste inntektskritiske flytene først → gjør en teknisk gjennomførbarhets- og risikovurdering → opprett sikre testscenarier/helsekontroller med varsling → verifiser faktisk sluttresultat der mulig → selg månedlig testkjøring, varsling og kort rapport, med avtalte åpningstider og separate reparasjonstimer. CTA: «Sjekk om skjema og bestilling faktisk fungerer». Start smalt og standardiser med gjenbrukbare testoppsett når teknisk mulig.
- **Kvalitetskrav / forbehold:** Ikke markedsfør en manuell månedlig kontroll som kontinuerlig automatisk overvåkning. Ingen ekte kortbelastninger, irreversible bookinger eller ukontrollerte testordre. Benytt testmodus eller kontroller uten reelle transaksjoner; isoler og merk testdata i CRM og e-postsystemer. Bekreftet skjemainnsending er ikke automatisk bevis for at e-posten kom i riktig innboks – verifiser kjeden bare der tilgang og teknisk løsning tillater det. Beskytt personopplysninger, autorisasjon og nøkler. Definer testfrekvens, falske positiver, retry/alert, tilgjengelighet på testmiljø, ansvar, åpningstider, varsling og feilretting særskilt. Tjenesten er godkjent som kommersiell retning, ikke bevis for at en produksjonsklar plattform er bygget.

### 42. Nettsideanalyse og forbedringsplan — JA

- **/nettsideanalyse/** · Selvstendig betalt inngangsprodukt
  - **Kundens problem:** Bedriften har en nettside, kanskje også SEO- eller annonsearbeid, men vet ikke hvorfor den ikke får nok relevante kunder. Problemet kan være lav synlighet, feil trafikk, utydelig tilbud, svak mobilopplevelse, dårlig kontaktflyt eller mangelfull sporing. Kunden ønsker å vite hva som bør forbedres først – og hva det er bortkastet å bruke penger på.
  - **Dette kan vi levere:** **Helhetlig nettsideanalyse** – Gjennomgå nettsidens struktur, innhold, tekniske tilstand og brukeropplevelse, og identifisere de største hindringene for flere henvendelser eller salg. **Synlighet i Google og AI-søk** – Vurdere teknisk SEO, sidens innhold, søkeintensjon og grunnleggende forutsetninger for synlighet i relevante søke- og AI-tjenester. **Konvertering og kundereise** – Undersøke hvor lett kunden forstår tilbudet, finner riktig tjeneste og fullfører kontakt, booking eller kjøp – spesielt på mobil. **Hastighet og teknisk kvalitet** – Kontrollere relevante ytelsesproblemer, mobilopplevelse, tekniske feil og forhold som kan skape friksjon for brukerne. **Trafikk, sporing og resultater** – Gjennomgå tilgjengelige data fra GA4, Search Console og relevante konverteringshendelser. Kontrollere om bedriften måler de handlingene som faktisk betyr noe. **Prioritert forbedringsplan** – Levere en oversikt over hva som bør gjøres først, hva som kan vente, forventet kompleksitet og hvilke tiltak som sannsynligvis har størst kommersiell verdi. **Rapport og gjennomgang** – Presentere konkrete funn, skjermbilder, anbefalinger og et forståelig forslag til videre arbeid. Rapporten skal være nyttig også dersom kunden ikke kjøper implementering fra oss.
  - **Hvorfor egen side:** Et selvstendig, betalt inngangsprodukt for bedrifter som trenger en uavhengig, tverrfaglig diagnose før de bestiller SEO, CRO, annonsering eller tekniske tiltak. Siden selger en konkret rapport og prioritering, ikke et generisk gratis salgsmøte.
  - **Skille mot andre tjenester:** /vurdering/ er kort innledende vurdering og kontakt, ikke en full rapport. /nettsideanalyse/ undersøker nettstedet helhetlig og leverer en prioritert handlingsplan. /seo/seo-analyse/ gjelder SEO i dybden, /google-ads/kontoanalyse/ Ads-konto, /sporing-og-maling/ måleinfrastruktur og /kontinuerlig-optimalisering/ gjennomføring over tid. Oppgi når spesialist-audit er nødvendig utover helhetsanalysen.
  - **Leveranse og kommersiell modell:** Avklar nettstedets forretningsmål, viktigste kundereiser og tilgjengelige datakilder; definér tydelig avgrenset auditomfang. Utfør faktiske tester og gjennomgå dokumenterbare data i SEO, UX/CRO, ytelse og konverteringssporing. Lever en lesbar rapport med konkrete funn, skjermbilder/belegg, prioritert handlingsplan, anslått innsats/kompleksitet og anbefalt rekkefølge. Gjennomgå rapporten med kunden også dersom de ikke kjøper mer. Tilby deretter avgrenset implementering og eventuell månedlig SEO/CRO-avtale. Primær CTA: «Bestill en nettsideanalyse» eller «Få gjennomgått nettsiden». Pris og leveranseomfang låses etter sitemap.
  - **Avgrensninger og kvalitetskrav:** Ikke lever en generisk AI-generert PDF uten faktisk nettsideundersøkelse og datagrunnlag. Skill bekreftede funn fra hypoteser og forbedringsforslag; ingen garantier for inntekts- eller trafikkvekst. Tredjepartsdata/GA4/GSC forutsetter tillatt tilgang. Rapporter må være nyttige selv uten videre kjøp. Begrens auditomfang og timer, inkludert antall maler/sider og analyseområder, før fastpris. Ikke gi gratis full tverrfaglig revisjon via /vurdering/ og ikke overlapp med betalte spesialist-audits uten tydelig nivåforskjell.

### #42 · `/nettsideanalyse/` — Nettsideanalyse og forbedringsplan

- **Kundeproblem:** Bedriften har en nettside, kanskje også SEO- eller annonsearbeid, men vet ikke hvorfor den ikke får nok relevante kunder. Problemet kan være lav synlighet, feil trafikk, utydelig tilbud, svak mobilopplevelse, dårlig kontaktflyt eller mangelfull sporing. Kunden ønsker å vite hva som bør forbedres først – og hva det er bortkastet å bruke penger på.
- **Hvorfor egen side:** Et selvstendig, betalt inngangsprodukt for bedrifter som trenger en uavhengig, tverrfaglig diagnose før de bestiller SEO, CRO, annonsering eller tekniske tiltak. Siden selger en konkret rapport og prioritering, ikke et generisk gratis salgsmøte.
- **Avgrensning / nabosider:** /vurdering/ er kort innledende vurdering og kontakt, ikke en full rapport. /nettsideanalyse/ undersøker nettstedet helhetlig og leverer en prioritert handlingsplan. /seo/seo-analyse/ gjelder SEO i dybden, /google-ads/kontoanalyse/ Ads-konto, /sporing-og-maling/ måleinfrastruktur og /kontinuerlig-optimalisering/ gjennomføring over tid. Oppgi når spesialist-audit er nødvendig utover helhetsanalysen.
- **Leveranse og salgsløp:** Avklar nettstedets forretningsmål, viktigste kundereiser og tilgjengelige datakilder; definér tydelig avgrenset auditomfang. Utfør faktiske tester og gjennomgå dokumenterbare data i SEO, UX/CRO, ytelse og konverteringssporing. Lever en lesbar rapport med konkrete funn, skjermbilder/belegg, prioritert handlingsplan, anslått innsats/kompleksitet og anbefalt rekkefølge. Gjennomgå rapporten med kunden også dersom de ikke kjøper mer. Tilby deretter avgrenset implementering og eventuell månedlig SEO/CRO-avtale. Primær CTA: «Bestill en nettsideanalyse» eller «Få gjennomgått nettsiden». Pris og leveranseomfang låses etter sitemap.
- **Kvalitetskrav / forbehold:** Ikke lever en generisk AI-generert PDF uten faktisk nettsideundersøkelse og datagrunnlag. Skill bekreftede funn fra hypoteser og forbedringsforslag; ingen garantier for inntekts- eller trafikkvekst. Tredjepartsdata/GA4/GSC forutsetter tillatt tilgang. Rapporter må være nyttige selv uten videre kjøp. Begrens auditomfang og timer, inkludert antall maler/sider og analyseområder, før fastpris. Ikke gi gratis full tverrfaglig revisjon via /vurdering/ og ikke overlapp med betalte spesialist-audits uten tydelig nivåforskjell.

### 43. Digital konkurrentanalyse — JA

- **/digital-konkurrentanalyse/** · Selvstendig betalt analyseprodukt
  - **Kundens problem:** Bedriften opplever at konkurrentene er mer synlige eller har et tydeligere tilbud, men forstår ikke hvorfor kunder velger andre. En ren søkeordsrapport viser ikke forskjeller i budskap, priser, sosialt bevis, kundereise eller konverteringshindringer. Kunden trenger en pålitelig oversikt over konkurrentenes synlige fortrinn og konkrete måter å differensiere seg på.
  - **Dette kan vi levere:** **Kartlegging av relevante konkurrenter** – Identifisere bedriftene som faktisk konkurrerer om de samme kundene, geografiske områdene og kjøpsbehovene. Skille mellom direkte konkurrenter og store aktører som kun dominerer søkeresultatene. **Analyse av konkurrentenes nettsider** – Undersøke struktur, mobilopplevelse, landingssider, navigasjon, produktpresentasjon, kontaktskjemaer og bookingmuligheter. Sammenligne hvor enkelt det er å bli kunde. **Tilbud, priser og posisjonering** – Sammenligne offentlig tilgjengelige priser, pakker, garantier, kundeløfter, tillitselementer og budskap. Finne områder hvor bedriften kan differensiere seg uten å måtte konkurrere utelukkende på pris. **Synlighet i Google og AI-søk** – Kartlegge hvilke konkurrenter som dukker opp på relevante søk, lokale resultater og utvalgte AI-søkeoppgaver. Identifisere innholds- og synlighetsmuligheter basert på etterprøvbare undersøkelser. **Offentlig synlig annonsering og kampanjer** – Undersøke tilgjengelige annonseeksempler, landingssider, budskap og kampanjetilbud. Identifisere mønstre og muligheter uten å påstå at vi kjenner konkurrentenes faktiske annonsebudsjetter eller resultater. **Sammenligning av konverteringsstrategier** – Vurdere hvordan konkurrentene bruker kontaktknapper, skjemaer, anmeldelser, sosialt bevis, tilbud og andre virkemidler for å gjøre neste steg enkelt. **Konkurranseoversikt og prioritert handlingsplan** – Levere en sammenligningsrapport med dokumenterte observasjoner, konkrete muligheter og anbefalinger om hva bedriften bør gjøre annerledes for å bli mer konkurransedyktig.
  - **Hvorfor egen side:** Et selvstendig kjøpsbehov for markeds- og konkurranseposisjonering på tvers av kanaler og nettsider, ikke bare SEO-rangering. Bedriften kan kjøpe en avgrenset konkurrentanalyse uten å bestille full nettsideanalyse eller løpende markedsføring.
  - **Skille mot andre tjenester:** /seo/konkurrentanalyse/ fokuserer på søkeord, søkeresultater, innholdsgap, autoritet og SEO-konkurranse; /nettsideanalyse/ diagnostiserer kundens egen nettside. /digital-konkurrentanalyse/ sammenligner eksterne konkurrenters kundeløfter, priser, nettsider, friksjon, synlighet og offentlig annonsering på tvers av kanaler. /konvertering/budskap-og-tilbud/ gjelder å forbedre kundens eget tilbud og budskap etter analysen.
  - **Leveranse og kommersiell modell:** Avklar målgruppe, geografi, kjøpsbehov og velg typisk 3–5 reelle konkurrenter. Undersøk offentlig tilgjengelige nettsider, tjenester, priser, synlighet, annonser og kundereiser med etterprøvbar dokumentasjon og dato. Skill observasjoner fra hypoteser og egne vurderinger. Lever sammenligningsmatrise, skjermbilder/lenker, anbefalt differensiering og prioritert handlingsplan. Engangsprodukt; tilbud om videre arbeid med landingssider, budskap, SEO og CRO ved behov. Månedlig oppfølging tilbys bare med nytt faktisk arbeid/overvåkningsbehov. CTA: «Få analysert dine viktigste konkurrenter».
  - **Avgrensninger og kvalitetskrav:** Kun offentlig lovlig tilgjengelig og dokumenterbart grunnlag; ingen påstander om faktiske annonsebudsjetter, konverteringsrate, fortjeneste, kundedata eller resultatene fra interne systemer uten bevis. Google/AI-resultater endres; noter måletidspunkt, søkeforutsetninger og geografisk kontekst. Skill direkte konkurrenter fra store søkeresultataktører. Ikke kopier konkurrenters tekster, design eller løfter. Ikke lov økt salg uten måling. Avgrens antall konkurrenter, landingssider og kilder; prising bestemmes etter sitemap.

### #43 · `/digital-konkurrentanalyse/` — Digital konkurrentanalyse

- **Kundeproblem:** Bedriften opplever at konkurrentene er mer synlige eller har et tydeligere tilbud, men forstår ikke hvorfor kunder velger andre. En ren søkeordsrapport viser ikke forskjeller i budskap, priser, sosialt bevis, kundereise eller konverteringshindringer. Kunden trenger en pålitelig oversikt over konkurrentenes synlige fortrinn og konkrete måter å differensiere seg på.
- **Hvorfor egen side:** Et selvstendig kjøpsbehov for markeds- og konkurranseposisjonering på tvers av kanaler og nettsider, ikke bare SEO-rangering. Bedriften kan kjøpe en avgrenset konkurrentanalyse uten å bestille full nettsideanalyse eller løpende markedsføring.
- **Avgrensning / nabosider:** /seo/konkurrentanalyse/ fokuserer på søkeord, søkeresultater, innholdsgap, autoritet og SEO-konkurranse; /nettsideanalyse/ diagnostiserer kundens egen nettside. /digital-konkurrentanalyse/ sammenligner eksterne konkurrenters kundeløfter, priser, nettsider, friksjon, synlighet og offentlig annonsering på tvers av kanaler. /konvertering/budskap-og-tilbud/ gjelder å forbedre kundens eget tilbud og budskap etter analysen.
- **Leveranse og salgsløp:** Avklar målgruppe, geografi, kjøpsbehov og velg typisk 3–5 reelle konkurrenter. Undersøk offentlig tilgjengelige nettsider, tjenester, priser, synlighet, annonser og kundereiser med etterprøvbar dokumentasjon og dato. Skill observasjoner fra hypoteser og egne vurderinger. Lever sammenligningsmatrise, skjermbilder/lenker, anbefalt differensiering og prioritert handlingsplan. Engangsprodukt; tilbud om videre arbeid med landingssider, budskap, SEO og CRO ved behov. Månedlig oppfølging tilbys bare med nytt faktisk arbeid/overvåkningsbehov. CTA: «Få analysert dine viktigste konkurrenter».
- **Kvalitetskrav / forbehold:** Kun offentlig lovlig tilgjengelig og dokumenterbart grunnlag; ingen påstander om faktiske annonsebudsjetter, konverteringsrate, fortjeneste, kundedata eller resultatene fra interne systemer uten bevis. Google/AI-resultater endres; noter måletidspunkt, søkeforutsetninger og geografisk kontekst. Skill direkte konkurrenter fra store søkeresultataktører. Ikke kopier konkurrenters tekster, design eller løfter. Ikke lov økt salg uten måling. Avgrens antall konkurrenter, landingssider og kilder; prising bestemmes etter sitemap.

### 44. Tilbudsoptimalisering og tjenestepakker — NEI til separat side

- **Avslått URL:** `/konvertering/tilbudsoptimalisering/` — **ikke opprett**.
- **Begrunnelse:** Stor overlapp med godkjente `/konvertering/budskap-og-tilbud/` og `/konvertering/prissider/`; egen side ville fragmentere kjøpsintensjon og utvannet sidene.
- **Under `/konvertering/budskap-og-tilbud/`:** **Gjennomgang av eksisterende tilbud** – Kartlegge hvilke tjenester, produkter og pakker virksomheten tilbyr, hvordan kundeverdien forklares, og hvor kjøperen blir usikker på hva som passer. **Tjenestepakker og valgstruktur** – Utforme forståelige nivåer og alternative kjøpsvalg, for eksempel en startpakke, anbefalt pakke og mer omfattende leveranse når det er relevant og lønnsomt. Ikke innføre kunstige nivåer. **Pris- og verdibudskap** – Forklare hvorfor hver løsning har verdi, hva kunden får og hvilke vilkår som gjelder. Eventuelle råd om faktiske priser må bygge på margin, kostnader og betalingsvillighet – ikke pynting av prislapper.
- **Under `/konvertering/prissider/`:** **Pakkevelger og beslutningsstøtte** – Utforme klare sammenligninger av pakker, tydelige anbefalinger, reelle tillegg og handlingsknapper som gjør valget enkelt også på mobil. **Måling av tilbudsaksept og pakkevalg** – Følge hvilke pakker og tilbud som fører til kvalifiserte henvendelser eller kjøp, og – når dataene finnes – vurdere tilbudsaksept og dekningsbidrag. Ikke hevde forbedring uten måling.
- **Kommersiell modell:** Avgrenset analyse og omarbeiding av pakker/budskap samt implementering av prisside og pakkevelger kan selges som et prosjekt uten egen URL. Eventuell CRO-oppfølging etter måling.
- **Kvalitetskrav:** Reell prissetting vurderes etter margin, kostnader og kundegrunnlag; ingen falske garantier, kunstig prisankring eller skjulte tillegg.
- **Status:** Kun dokumentert innholdsutvidelse, ingen nettsidekode endret.

### 45. Kontaktskjemaoptimalisering og leadkvalifisering — NEI til egen side

- **Avslått URL:** `/konvertering/kontaktskjemaer/` – **skal ikke opprettes**.
- **Begrunnelse:** Henvendelsesflyt og leadoppfølging har allerede to godkjente, klart separerte kjøpsintensjoner. En tredje, bred skjemaside ville duplisere innholdet.
- **Utvidelse av `/konvertering/henvendelser-og-booking/`:** **Skjemafelter og validering** – Fjerne unødvendige felt, forklare hva som må fylles ut og vise hjelpsomme feilmeldinger. Sørge for at skjemaet er enkelt å fullføre med tastatur og på mobil. **Kvalifiserende spørsmål før innsending** – Stille få, relevante spørsmål om tjenestebehov, prosjekt, beliggenhet og andre nødvendige kriterier slik at mottakeren kan forstå forespørselen. Spørsmål må ikke øke frafall uten en klar gevinst. **Dynamiske kontaktskjemaer** – Vise relevante oppfølgingsfelt basert på tidligere svar, for eksempel ulike felt for privat- og bedriftskunder, med tydelige valg og tilgjengelig interaksjon. **Spamkontroll, personvern og leveringskvalitet** – Begrense spam og misbruk, unngå unødvendig innsamling av personopplysninger og teste faktisk levering til riktig mottaker, ikke bare HTTP-respons. **Skjemafrafall og leadkvalitet** – Følge åpninger, frafall, vellykkede innsendinger og kvalitet på henvendelsene når dette kan måles. Vurdere både fullføringsgrad og faktisk relevans for virksomheten.
- **Utvidelse av `/konvertering/leadoppfolging/`:** **Leadkvalifisering og prioriteringsregler** – Avklare hvilke opplysninger som gjør et lead relevant, og bruke enkle dokumenterte regler for å sortere forespørsler uten å avvise gode kunder automatisk. **Routing og CRM-registrering** – Sende forespørsler til riktig ansvarlig person eller team og registrere nødvendige detaljer og status i relevant CRM, med sporbarhet og minst mulig persondata. **Oppfølging og kvalitetsmåling** – Følge om leads besvares, blir til møter eller kunder, og om skjemaets kvalifiseringsspørsmål faktisk forbedrer salgsarbeidet. Justere rutiner etter målbare erfaringer.
- **Kommersiell modell:** Avgrenset skjema- og leadkvalitetsanalyse → forbedret skjema → kvalitetssikret levering/routing → måling. Selgbart som engangsprosjekt eller del av avtalt CRO-arbeid, uten egen URL.
- **Kvalitetskrav:** Mål både fullføring og relevant leadkvalitet, unngå unødvendige persondata og ikke lov salgsøkning uten måling.
- **Status:** Kun beslutning og dokumentasjon, ingen kode/publisering.

### 46. AI-chatbot og digital kundedialog — JA

- **/ai-chatbot/** · Selvstendig tjenesteside
- **Kundens problem:** Besøkende har spørsmål om tjenester, priser, levering eller booking, men finner ikke svar raskt nok og forlater nettsiden uten å ta kontakt. Bedriften ønsker å hjelpe dem videre selv når ingen sitter i chat, uten at en AI gir uautoriserte løfter eller behandler informasjon uforsvarlig.
- **Dette kan vi levere:** **AI-chatbot tilpasset virksomheten** – Sette opp en chatbot som kan svare på vanlige spørsmål om bedriftens produkter, tjenester og praktiske informasjon, med tydelig avgrensning av hva den skal hjelpe med. **Kunnskapsbase fra godkjent innhold** – Strukturere relevante tjenestesider, spørsmål og svar, priser, vilkår og annen godkjent informasjon slik at chatboten har et kontrollert grunnlag for svarene. **Henvendelser og kvalifiserende spørsmål** – La chatboten innhente nødvendig informasjon om kundens behov og gjøre det enkelt å sende en forespørsel. Opplysningene må være relevante, og kunden må forstå hva som skjer med dem. **Overlevering til mennesker** – Sørge for at kunden kan gå videre til kontaktskjema, e-post, telefon eller et faktisk tilgjengelig menneske når chatboten ikke kan løse spørsmålet. **Integrasjon med nettside og CRM** – Integrere chatten i eksisterende nettside og eventuelt koble godkjente henvendelser til riktig mottaker eller CRM, når teknisk tilgang og systemstøtte finnes. **Testing, personvern og svarkontroll** – Teste faktiske kundespørsmål, kontrollere feilaktige eller udokumenterte svar, begrense innsamling av persondata og sørge for at chatboten tydelig fremstår som en AI-løsning. **Måling og løpende forbedring** – Evaluere vanlige spørsmål, samtaler som ikke løses, overleveringer og relevante henvendelser. Oppdatere kunnskapsgrunnlag og forbedre dialogen gjennom en eventuell månedsavtale.
- **Hvorfor egen side:** Samtalebasert digital kundedialog er en egen, konkret løsningskategori med annet brukergrensesnitt, kunnskapsstyring, kvalitetssikring og driftsbehov enn skjemaer eller CRM-oppfølging. Tjenesten kan ha avgrenset oppsett og dokumentert gjentakende arbeid.
- **Skille mot andre tjenester:** /ai-chatbot/ gir spørsmål-og-svar-dialog med kildegrunnlag, overlevering og eventuell innhenting av leads. /konvertering/henvendelser-og-booking/ forbedrer skjemainnsending og booking. /konvertering/leadoppfolging/ håndterer mottatte leads i CRM og salgsløpet. /funksjonsovervakning/ tester tekniske forretningskritiske funksjoner, ikke chatbot-kunnskap/brukerdialog. Unngå samme leveranser og priser under flere tjenester.
- **Leveranse og kommersiell modell:** Start med avgrenset kartlegging av kundehenvendelser og spørsmål, avklar hva chatboten får svare på og hvordan den skal eskalere. Sett opp godkjent kunnskapsgrunnlag, installasjon, svaravgrensninger, leadflyt og menneskelig kontaktalternativ. Test med realistiske kundespørsmål og feil-/hallusinasjonsscenarier før produksjon. Selg særskilt avtalt oppsett, og eventuelt månedlig kvalitetssikring, vedlikehold av informasjon, analyse av ubesvarte spørsmål og integrasjoner. CTA: «Få vurdert AI-chatbot for nettsiden». Ikke finn på pakkepriser eller påstå aktiv produksjonsklarhet.
- **Avgrensninger og kvalitetskrav:** Sitemap-godkjenning er ikke teknisk implementering: bekreft faktisk leveranseevne, integrasjoner og supportmodell før aktivt salg. AI-chatboten må merkes tydelig som AI og kunne svare «vet ikke» eller sende videre til menneske. Ingen garantier om feilfrie svar, 24/7 menneskelig support, at chatboten løser alle saker eller at den øker salg. Unngå udokumenterte priser, helseråd/juridiske råd eller automatiske bindende avtaler uten kontroll. Personvern: dataminimering, informasjon, relevant behandlingsgrunnlag, tilgang og leverandøravtaler; ikke send sensitive opplysninger til uegnede systemer. Kontroller injeksjonsforsøk, brukertilgang, prompt-/kildeisolering, misbruk, modellkostnader og kvalitetsrutiner. Løpende AI-kostnader og feilretting må være tydelig avtalt.

### #46 · `/ai-chatbot/` — AI-chatbot og digital kundedialog

- **Kundeproblem:** Besøkende har spørsmål om tjenester, priser, levering eller booking, men finner ikke svar raskt nok og forlater nettsiden uten å ta kontakt. Bedriften ønsker å hjelpe dem videre selv når ingen sitter i chat, uten at en AI gir uautoriserte løfter eller behandler informasjon uforsvarlig.
- **Hvorfor egen side:** Samtalebasert digital kundedialog er en egen, konkret løsningskategori med annet brukergrensesnitt, kunnskapsstyring, kvalitetssikring og driftsbehov enn skjemaer eller CRM-oppfølging. Tjenesten kan ha avgrenset oppsett og dokumentert gjentakende arbeid.
- **Avgrensning / nabosider:** /ai-chatbot/ gir spørsmål-og-svar-dialog med kildegrunnlag, overlevering og eventuell innhenting av leads. /konvertering/henvendelser-og-booking/ forbedrer skjemainnsending og booking. /konvertering/leadoppfolging/ håndterer mottatte leads i CRM og salgsløpet. /funksjonsovervakning/ tester tekniske forretningskritiske funksjoner, ikke chatbot-kunnskap/brukerdialog. Unngå samme leveranser og priser under flere tjenester.
- **Leveranse og salgsløp:** Start med avgrenset kartlegging av kundehenvendelser og spørsmål, avklar hva chatboten får svare på og hvordan den skal eskalere. Sett opp godkjent kunnskapsgrunnlag, installasjon, svaravgrensninger, leadflyt og menneskelig kontaktalternativ. Test med realistiske kundespørsmål og feil-/hallusinasjonsscenarier før produksjon. Selg særskilt avtalt oppsett, og eventuelt månedlig kvalitetssikring, vedlikehold av informasjon, analyse av ubesvarte spørsmål og integrasjoner. CTA: «Få vurdert AI-chatbot for nettsiden». Ikke finn på pakkepriser eller påstå aktiv produksjonsklarhet.
- **Kvalitetskrav / forbehold:** Sitemap-godkjenning er ikke teknisk implementering: bekreft faktisk leveranseevne, integrasjoner og supportmodell før aktivt salg. AI-chatboten må merkes tydelig som AI og kunne svare «vet ikke» eller sende videre til menneske. Ingen garantier om feilfrie svar, 24/7 menneskelig support, at chatboten løser alle saker eller at den øker salg. Unngå udokumenterte priser, helseråd/juridiske råd eller automatiske bindende avtaler uten kontroll. Personvern: dataminimering, informasjon, relevant behandlingsgrunnlag, tilgang og leverandøravtaler; ikke send sensitive opplysninger til uegnede systemer. Kontroller injeksjonsforsøk, brukertilgang, prompt-/kildeisolering, misbruk, modellkostnader og kvalitetsrutiner. Løpende AI-kostnader og feilretting må være tydelig avtalt.

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

**Punkt 47 – venter:** Kundeanmeldelser og omdømmeoptimalisering, mulig `/kundeanmeldelser/`. Vurder om løpende håndtering av autentiske anmeldelser på flere plattformer har selvstendig verdi utover Google bedriftsprofil, lokal SEO og sosialt bevis. JA/NEI/ANNET.

**Viktig endring fra punkt 32:** Se den komplette, autoriserte innholdsstrukturen i detaljbriefene og JSON. Ikke publiser en side uten kundeproblem + individuelle leveranser med begrunnelse.

## 9. Handoff-prompt for ny samtale

```text
Vi fortsetter sitemap-gjennomgangen for optimalisering.oslo.no. Bruk vedlagte masterspesifikasjon (inkl. sidebriefene i §3B) og JSON-register som beslutningsgrunnlag. Beslutningspunktene 1–46 er avklart (#34, #44 og #45 er NEI til separate URL-er; #46 er JA til AI-chatbot). Ikke gjenta dem. Neste er punkt 47: Kundeanmeldelser og omdømmeoptimalisering. Presenter ett punkt av gangen med JA/NEI/ANNET, registrer svaret og oppdater .md/.json. Oppdater kun strategi/docs/issues i GitHub; ingen endringer i nettsidekode eller publisering uten egen avtale. Ikke bland inn medon.no. Pakkeinndeling/pris tar vi etter full sitemap.
```

---

**Filrutine:** Denne masterfilen er et tidsstemplet øyeblikksbilde. Ved senere beslutninger skal en oppdatert versjon genereres med ny beslutningslogg og oppdatert versjon/dato; gamle nedlastede filer oppdateres ikke automatisk.

## 10. Fullstendig innholdsgrunnlag (beslutning 32)

**Obligatorisk:** Les `docs/sitemap/fullstendige-tjenestebriefs-46-2026-10-30.md` sammen med denne masteren. Den gir for alle 49 godkjente URL-er (#34, #44 og #45 har ingen separate URL-er; #46 er egen AI-chatbot med reell leveranseevne som krav):

- konkret kundeproblem
- navngitte leveransepunkter med hver sin forklaring (formatet «Dette kan vi levere»)
- hvorfor egen side
- avgrensning mot nabosider
- forretningsmodell og CTA-retning
- kvalitetskrav og dokumentasjonsbegrensninger

Utgangspunktet for #31 Merchant Center er bevart med seks spesifikke leveranser i fullstendig tekst. Dette er *source of truth* for innholdsproduksjon, ikke generiske URL-titler.