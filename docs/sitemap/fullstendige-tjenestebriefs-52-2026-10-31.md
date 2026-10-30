# Optimalisering Oslo – fullstendige tjenestebriefs

**Versjon:** 3.2 · **Beslutninger:** 52 (inkl. fire NEI og to ANNET med JA) · **Godkjente URL-er:** 54 · **Dato:** 31.10.2026

> **Kun optimalisering.oslo.no.** Disse er spesifikasjoner og godkjente retninger, ikke publisert innhold eller ferdige kodesider. Beskrivelsene for 1–30 er redaksjonell strukturering av beslutningsgrunnlaget fra samtalen, ikke ordrette transkripsjoner. Punkt 31 har leveransebeskrivelsene brukeren konkret ba om å bevare.

## Ufravikelig innholdskontrakt for hver side

1. **Kundens problem:** Konkret situasjon kunden kjenner igjen og ønsker løst.
2. **Dette kan vi levere:** Minst fire navngitte leveranser, hver med *egen forklaring*; skal kunne bli seksjoner på siden.
3. **Hvorfor egen side:** Hva slags kjøpsintensjon og selvstendig leveranse URL-en dekker.
4. **Skille mot andre sider:** Unngå duplikat-intensjon og repetert generisk byråtekst.
5. **Kommersiell flyt:** Inngangsprosjekt, videre arbeid, månedlig avtale der relevant; ikke lov fastpris før senere gjennomgang.
6. **Begrensninger og kvalitet:** Nøkterne løfter, korrekt dokumentasjon, personvern og plattformkrav.

---

## Beslutning 1: Landingssider — `/landingssider/`

**Status:** JA · **Plassering:** Hovedtjeneste

### Kundens problem
Besøkende fra annonser eller kampanjer lander på generelle sider og mangler en tydelig vei til kontakt, booking eller kjøp.

### Dette kan vi levere

**Analyse av mål og trafikk**

Kartlegge kampanje, målgruppe og handlingen siden skal utløse.

**Ny eller forbedret landingsside**

Bygge eller forbedre struktur, tydelig H1, relevant tilbud, tillitselementer og CTA.

**Skjema og booking**

Gjøre kontakthandlingen lett å fullføre, også på mobil.

**Sporing og forbedring**

Måle relevante leads eller salg og prioritere dokumenterbare endringer.

### Hvorfor egen side
Egen hovedtjeneste fordi kunden konkret kan bestille ny landingsside eller forbedring av eksisterende side, uavhengig av full nettsideproduksjon.

### Skille mot andre tjenester
Skiller seg fra /google-ads/ (annonsekampanje) og /landingssider/google-ads/ (annonserelatert spesialisering). Sidens fokus er målrettede landing-/kampanjesider på tvers av kanaler.

### Leveranse og kommersiell modell
Analyse → prototype/tekst/bygg → sporingsoppsett → lansering; engangsprosjekt med mulig CRO-retainer. Primær CTA: «Få vurdert landingssiden».

### Avgrensninger og kvalitetskrav
Ikke lov konverteringsløft før det kan måles. Vis mobilversjon, tydelig tilbud, sosialt bevis og ett hovedmål per landingsside.

## Beslutning 2: Skjema og bookingflyt — `/konvertering/henvendelser-og-booking/`

**Status:** JA · **Plassering:** Konvertering

### Kundens problem
Kunden er interessert, men lange skjemaer, dårlig mobilflyt eller uklar booking skaper frafall.

### Dette kan vi levere

**Skjemaanalyse**

Finne unødvendige felt, feil og friksjon i henvendelsesløpet.

**Forbedret booking**

Gjøre valg av tid, tjeneste og kontaktinformasjon tydelig og raskt.

**Mobil og validering**

Sikre forståelige feilmeldinger og skjemaer som fungerer på telefon.

**Levering og integrasjoner**

Koble henvendelser til riktig mottaker/CRM og teste faktisk levering.

**Konverteringsmåling**

Måle fullførte henvendelser, ikke bare skjemavisninger.

**Skjemafelter og validering**

Fjerne unødvendige felt, forklare hva som må fylles ut og vise hjelpsomme feilmeldinger. Sørge for at skjemaet er enkelt å fullføre med tastatur og på mobil.

**Kvalifiserende spørsmål før innsending**

Stille få, relevante spørsmål om tjenestebehov, prosjekt, beliggenhet og andre nødvendige kriterier slik at mottakeren kan forstå forespørselen. Spørsmål må ikke øke frafall uten en klar gevinst.

**Dynamiske kontaktskjemaer**

Vise relevante oppfølgingsfelt basert på tidligere svar, for eksempel ulike felt for privat- og bedriftskunder, med tydelige valg og tilgjengelig interaksjon.

**Spamkontroll, personvern og leveringskvalitet**

Begrense spam og misbruk, unngå unødvendig innsamling av personopplysninger og teste faktisk levering til riktig mottaker, ikke bare HTTP-respons.

**Skjemafrafall og leadkvalitet**

Følge åpninger, frafall, vellykkede innsendinger og kvalitet på henvendelsene når dette kan måles. Vurdere både fullføringsgrad og faktisk relevans for virksomheten.

### Hvorfor egen side
Egen underside fordi skjema-/bookingoptimalisering er en konkret teknisk og UX-orientert leveranse som kan avgrenses og prises.

### Skille mot andre tjenester
Konvertering skjer før innsendelse; /konvertering/leadoppfolging/ håndterer det som skjer etter innsendelse. Ikke bland dette med full CRM-implementering.

**Beslutning #45:** Skjemautforming, kvalifiserende/dynamiske spørsmål, forenkling og innsending ligger her. Prioritering, CRM-routing og salgsetterarbeid ligger i `/konvertering/leadoppfolging/`. Ingen egen `/konvertering/kontaktskjemaer/`.

### Leveranse og kommersiell modell
Mål friksjon → forenkle felt/validering → sikre levering/integrasjon → test → mål kvalifiserte forespørsler. Prosjekt eller del av retainer.

### Avgrensninger og kvalitetskrav
Beskytt mot spam og datatap; personvern og nødvendige samtykker må være på plass; test innsending og mottak ende-til-ende.

**Tillegg fra #45 – kvalitetskrav:** Sikre tilgjengelighet, dataminimering, spamkontroll og reell leveranseverifisering. Evaluer både skjemafullføring og kvaliteten på henvendelsene.

## Beslutning 3: Kjøpsflyt og checkout — `/nettbutikkoptimalisering/kjopsflyt/`

**Status:** JA · **Plassering:** Nettbutikkoptimalisering

### Kundens problem
Kunder legger produkter i kurven, men fullfører ikke betalingen fordi flyten er tung, uklar eller skaper mistillit.

### Dette kan vi levere

**Kartlegging av frafall**

Analysere handlekurv, kasse og steg der kunder avbryter.

**Handlekurvens oversikt og tydelighet**

Gjøre produktvarianter, antall, pris, rabatt, totalsum og veien videre til betaling oversiktlig på mobil og desktop.

**Relevante tilleggsprodukter og mersalg**

Vurdere nyttige, situasjonsbestemte produktanbefalinger og kryssalg i handlekurven, uten å distrahere fra kjøpet eller presse kunden.

**Forenkle checkout**

Redusere unødvendige felt, steg og distraksjoner.

**Frakt, betaling og retur**

Gjøre kostnader, levering og betingelser tydelige før betaling.

**Betalingsopplevelse**

Vurdere Vipps, Klarna og kortflyt innenfor plattformens muligheter.

**Måling**

Kontrollere hendelser fra handlekurv til bekreftet ordre.

### Hvorfor egen side
Egen underside fordi kjøpsfullføring løser en separat del av kundereisen og har direkte kommersiell relevans.

### Skille mot andre tjenester
/produktsider/ hjelper kunden å velge produkter; /sok-og-filtrering/ hjelper å finne dem; denne siden handler om handlekurv, checkout, betalings- og fraktvalg, samt relevant mersalg. **Beslutning #34:** Ingen egen `/nettbutikkoptimalisering/handlekurv/` – dette innlemmes her. Oppfølging via e-post av avbrutte handlekurver dekkes av `/epostmarkedsforing/`.

### Leveranse og kommersiell modell
Kartlegg checkout-trakt → kontroller frakt, retur, betalingsalternativer og felter → implementer prioriterte forbedringer → mål fullføringsgrad.

### Avgrensninger og kvalitetskrav
Ikke lov endringer i betalingsleverandør uten risikovurdering. Ta hensyn til Shopify/WooCommerce-plattformbegrensninger og sikkerhet. Mersalg må være relevant og transparent; vurder også om flere tilleggsforslag svekker fullføringsgraden. Ingen separat handlekurv-URL i godkjent sitemap.

## Beslutning 4: Produkt- og kategorisider — `/nettbutikkoptimalisering/produktsider/`

**Status:** JA · **Plassering:** Nettbutikkoptimalisering

### Kundens problem
Produktsider og kategorier hjelper ikke kunden å forstå, sammenligne eller velge riktig vare; søk og salg lider.

### Dette kan vi levere

**Produktinformasjon**

Forbedre navn, beskrivelser, spesifikasjoner, varianter og tilgjengelighet.

**Kategoristruktur**

Forbedre kategorier, sortering og veien til relevante produkter.

**Kjøpsbeslutning**

Gjøre bilder, pris, levering, anmeldelser og kjøpsknapp lettere å forstå.

**SEO og interne lenker**

Optimalisere titler, kategoritekster og relevant produktdata uten feilaktig markup.

**Mersalg og måling**

Analysere legg-i-handlekurv og teste relevante produktanbefalinger.

### Hvorfor egen side
Egen side fordi varepresentasjon, kategorioppsett, merchandising og produkt-SEO er en egen leveranse med målbart potensial.

### Skille mot andre tjenester
Ikke dupliser /sok-og-filtrering/ (produktfunn) eller /kjopsflyt/ (betaling). Her ligger informasjon, vurdering og legg-i-handlekurv.

### Leveranse og kommersiell modell
Kartlegg produkt-/kategorireiser → forbedre beskrivelser, varianter, bilder, filtre og tillitsinformasjon → mål visninger, add-to-cart og salgsverdi.

### Avgrensninger og kvalitetskrav
Produktpåstander, lager, priser og strukturert data må samsvare med faktisk varedata. Prioriter representative maler framfor manuell oppussing av alt.

## Beslutning 5: Sporing og måling — `/sporing-og-maling/`

**Status:** JA · **Plassering:** Hovedtjeneste

### Kundens problem
Bedriften vet ikke hvilke kanaler og aktiviteter som gir kvalifiserte henvendelser, bookinger eller salg.

### Dette kan vi levere

**Konverteringskart**

Definere hva en relevant henvendelse, booking eller ordre betyr.

**GA4 og Tag Manager**

Sette opp, rydde og kvalitetssikre hendelser og tagger.

**Annonsekonverteringer**

Kontrollere måling mellom nettstedsdata og relevante annonseplattformer.

**Lead- og salgssporing**

Knytte konverteringer til trafikkilder der datagrunnlaget tillater det.

**Dashboards og personvern**

Levere rapportering med relevante samtykke- og dataminimeringskontroller.

**Måling av steg i kundereisen**

Kontrollere om tilgjengelige og lovlig innsamlede data viser hvor brukere går videre eller faller fra mellom trafikkilde, landingsside, henvendelse og salg. Markere manglende data og attribusjonsusikkerhet i stedet for å konstruere en sammenheng.

### Hvorfor egen side
Egen hovedtjeneste fordi korrekt måling har selvstendig kjøpsverdi og legger grunnlag for videre optimalisering og månedsavtaler.

### Skille mot andre tjenester
Tverrkanal måling (GA4, GTM, eventer, attribusjon, dashboards). Ikke forveksle med spesifikk Google Ads-konverteringssporing i punkt 32.

### Leveranse og kommersiell modell
Måleplan → implementering → QA → dokumentasjon → dashboard og løpende datakvalitetskontroll. Tilby audit og fast oppfølging.

### Avgrensninger og kvalitetskrav
Håndter personvern, samtykke, falske/dupliserte konverteringer og attribusjonsusikkerhet. LeadProof kan være en fordel, ikke en forutsetning.

## Beslutning 6: Budskap og tilbud — `/konvertering/budskap-og-tilbud/`

**Status:** JA · **Plassering:** Konvertering

### Kundens problem
Besøkende forstår ikke verdien, hvem tilbudet passer for eller hvorfor de skal velge denne leverandøren.

### Dette kan vi levere

**Verdiforslag**

Forklare målgruppens ønskede resultat og hvorfor virksomheten er relevant.

**Salgstekster**

Forbedre H1, tjenestetekster, fordeler og tydelige handlingsoppfordringer.

**Tilbudsstruktur**

Forklare pakker og alternativer uten skjulte forutsetninger.

**Tillit og innvendinger**

Bruke verifiserbare bevis og svare på vanlige spørsmål.

**Validere forbedringer**

Bruke atferdsdata og egnet testing når volumet tillater det.

**Gjennomgang av eksisterende tilbud**

Kartlegge hvilke tjenester, produkter og pakker virksomheten tilbyr, hvordan kundeverdien forklares, og hvor kjøperen blir usikker på hva som passer.

**Tjenestepakker og valgstruktur**

Utforme forståelige nivåer og alternative kjøpsvalg, for eksempel en startpakke, anbefalt pakke og mer omfattende leveranse når det er relevant og lønnsomt. Ikke innføre kunstige nivåer.

**Pris- og verdibudskap**

Forklare hvorfor hver løsning har verdi, hva kunden får og hvilke vilkår som gjelder. Eventuelle råd om faktiske priser må bygge på margin, kostnader og betalingsvillighet – ikke pynting av prislapper.

### Hvorfor egen side
Egen underside fordi copy, verdiforslag og tilbudsdesign ofte er roten til svake konverteringer selv om teknologien virker.

### Skille mot andre tjenester
Bredere enn /prissider/ (pris-/pakkevalg); annerledes enn SEO-innhold, som primært dekker søkeintensjon og synlighet.

**Avklaring fra #44:** Pakkeutforming, analyse og verdipresentasjon er del av denne siden. Pris-/pakkesammenligninger, pakkevelger, vilkår og CTA håndteres i `/konvertering/prissider/`. Ingen `/konvertering/tilbudsoptimalisering/`.

### Leveranse og kommersiell modell
Intervju/innsikt → tydelig verdiforslag → forbedre overskrifter, bevis og CTA-er → eventuelt eksperimentere når datagrunnlaget holder.

### Avgrensninger og kvalitetskrav
Unngå udokumenterte superlativer og falske garantier. Ikke selg dette som ren volum-copywriting.

**Kvalitetskrav fra #44:** Ikke lag kunstige pakker eller prisankre. Ikke anbefal faktisk prisnivå uten kostnader, margin og kundedata.

## Beslutning 7: Nettsidehastighet og ytelse — `/nettsidehastighet/`

**Status:** JA · **Plassering:** Selvstendig tjenesteside

### Kundens problem
Nettsiden responderer tregt, flytter på innhold eller fungerer dårlig på mobil og skaper friksjon.

### Dette kan vi levere

**Core Web Vitals**

Kartlegge LCP, INP og CLS med feltdata der det finnes.

**Frontend-ytelse**

Optimalisere bilder, fonter, JS og CSS uten å skade funksjonalitet.

**Caching og server**

Vurdere CDN, respons, hosting og caching etter faktisk flaskehals.

**Mobilopplevelse**

Forbedre opplevd hastighet på realistiske mobile enheter.

**Før/etter-kontroll**

Måle forbedring og kontrollere regresjoner.

### Hvorfor egen side
Konkret teknisk inngangstjeneste med før-/etter-måling som kunden kan forstå.

### Skille mot andre tjenester
Core Web Vitals, ressurslast og hosting; ikke samme som teknisk SEO (crawling/indeksering) eller mobiloptimalisering (UX/konvertering).

### Leveranse og kommersiell modell
Mål lab- og feltdata → prioriter LCP/INP/CLS og flaskehalser → implementer → verifiser med samme målemetode. Prosjekt og vedlikehold.

### Avgrensninger og kvalitetskrav
Skill syntetiske målinger fra reelle brukerdata. Effekt på rangering og salg kan ikke garanteres.

## Beslutning 8: Kontinuerlig optimalisering — `/kontinuerlig-optimalisering/`

**Status:** JA · **Plassering:** Hovedtjeneste

### Kundens problem
Etter lansering forbedres ikke nettsiden; rapporter produseres uten at noen prioriterer og utfører tiltak.

### Dette kan vi levere

**Månedlig innsiktsarbeid**

Følge relevante tall for trafikk, henvendelser og salg.

**Prioritert tiltaksplan**

Velge høyest verdi innen avtalt kapasitet.

**Implementere forbedringer**

Gjennomføre avtalte SEO-, CRO- eller innholdstiltak.

**Resultatgjennomgang**

Vise hva som ble endret og hva tallene faktisk støtter.

**Tydelig arbeidsomfang**

Avtale avgrensning og kapasitet – ikke ubegrenset utvikling.

**Løpende forbedring av kundereisens overganger**

Prioritere og gjennomføre avtalte forbedringer mellom trafikkilde, nettside, skjema/booking og salgsoppfølging. Samordne riktige ansvarlige, føre endringslogg og vurdere utviklingen i faktiske kvalifiserte henvendelser eller salg.

### Hvorfor egen side
Kommersiell hovedtjeneste for månedlig inntekt og langsiktig verdi, basert på prioriterte SEO-/CRO-/UX-tiltak.

### Skille mot andre tjenester
Ikke en ubegrenset samlepakkeløsning. En retainer er avtalt kapasitet og tydelig resultatoppfølging, ikke alle spesialisttjenester inkludert.

### Leveranse og kommersiell modell
Oppstartsmåling → prioritert backlog → avgrensede månedstiltak → endringslogg/rapport → neste prioritering. CTA: «Få en plan for månedlig forbedring».

### Avgrensninger og kvalitetskrav
Lås time-/oppgavekapasitet, respons, avhengigheter, ekskluderte kostnader og testing før pris oppgis.

## Beslutning 9: Kampanje- og annonseoptimalisering — `/annonseoptimalisering/`

**Status:** ANNET: JA + tre egne kanal-/formatsider · **Plassering:** Hovedtjeneste

### Kundens problem
Annonseinvestering og landingsopplevelse behandles hver for seg, slik at kunden ikke får nok salg eller leads av trafikken.

### Dette kan vi levere

**Helhetlig annonseanalyse**

Se annonser, mål, landingssider og konvertering i sammenheng.

**Kanalstrategi**

Velge hensiktsmessige kanaler ut fra virksomhet og budsjett.

**Kampanjeforbedring**

Prioritere tiltak ut fra kvalifiserte leads og salg.

**Måling**

Kontrollere at annonseringen optimaliseres mot riktig resultat.

**Løpende drift**

Konkret månedlig leveranse; annonsebudsjett kommer i tillegg.

### Hvorfor egen side
Overordnet inngang for bedrifter som trenger helhetlig optimalisering på tvers av annonsekanaler og kundereise.

### Skille mot andre tjenester
Hub som leder til /google-ads/, /meta-ads/ og /google-shopping/. Ikke dupliser hver kanalspesifikke tjenesteside.

### Leveranse og kommersiell modell
Diagnose → anbefal riktig kanal/arbeidsform → oppsett/drift/landing/sporing. Egner seg for månedlig avtale.

### Avgrensninger og kvalitetskrav
Oppgi alltid at mediebudsjett kommer i tillegg; ikke lov ROAS. Ikke bland innhold/SEO inn i annonsedrift uten tydelig scope.

**Godkjent utvidelse:** Både hovedside og egne undersider for Google Ads, Meta Ads og Google Shopping.

## Beslutning 9: Kampanje- og annonseoptimalisering — `/google-ads/`

**Status:** ANNET: JA + tre egne kanal-/formatsider · **Plassering:** Kanalspesifikk tjeneste

### Kundens problem
Eksisterende eller nye søkeannonser bruker budsjett uten å tiltrekke nok kvalifiserte kunder.

### Dette kan vi levere

**Søkekampanjer**

Forbedre søkeord, søketermer, annonser og negative søkeord.

**Bud og budsjett**

Vurdere budstrategier og kampanjestruktur ut fra resultater.

**Konverteringer**

Kvalitetssikre hvilke mål Google Ads optimaliserer mot.

**Landingsside-samsvar**

Forbedre forholdet mellom annonse, søkeintensjon og side.

**Rapportering**

Følge kostnad per relevant henvendelse eller salg.

### Hvorfor egen side
Egen kanalspesifikk kjøpsintensjon for oppsett, drift og løpende forbedring av Google Ads.

### Skille mot andre tjenester
Hovedtjenesten skiller seg fra /google-ads/kontoanalyse/ (uavhengig audit) og /landingssider/google-ads/ (destinasjonssiden).

### Leveranse og kommersiell modell
Kampanjeaudit → måling → søketerm-/annonse-/budstrategi → landingssider → løpende optimalisering. Månedlig honorar + annonsebudsjett.

### Avgrensninger og kvalitetskrav
Vurder målgruppe og lønnsomhet før økt budsjett. Tydelig skill mellom Ads-attribusjon og faktisk meromsetning.

**Godkjent utvidelse:** Både hovedside og egne undersider for Google Ads, Meta Ads og Google Shopping.

## Beslutning 9: Kampanje- og annonseoptimalisering — `/meta-ads/`

**Status:** ANNET: JA + tre egne kanal-/formatsider · **Plassering:** Kanalspesifikk tjeneste

### Kundens problem
Facebook- og Instagram-kampanjer får visninger og klikk, men mangler riktig kreativt materiell, kundesamsvar eller konverteringsmåling.

### Dette kan vi levere

**Kampanjeoppsett**

Forbedre kampanjemål, annonsesett og budsjettfordeling.

**Annonseinnhold**

Utvikle og vurdere bilder, video, hooks og budskap.

**Målgrupper**

Tilpasse distribusjon og plasseringer til faktiske resultater.

**Pixel og CAPI**

Kontrollere hendelser og rapporteringsgrunnlag.

**Løpende forbedring**

Følge kvalifiserte leads/salg fremfor bare klikk og visninger.

### Hvorfor egen side
Egen etterspurt kanal med andre optimaliseringsmekanismer enn søkeannonser.

### Skille mot andre tjenester
Hovedtjeneste for løpende Meta-drift; /meta-ads/kontoanalyse/ er uavhengig revisjon før eventuell overtakelse.

### Leveranse og kommersiell modell
Måleplan/pixel → kampanjestruktur → kreative iterasjoner → landingssider → løpende CPA/ROAS- og kvalitetsvurdering.

### Avgrensninger og kvalitetskrav
Mediebudsjett og kreativ produksjon prises eksplisitt; samtykke og CAPI/deduplisering må kvalitetssikres.

**Godkjent utvidelse:** Både hovedside og egne undersider for Google Ads, Meta Ads og Google Shopping.

## Beslutning 9: Kampanje- og annonseoptimalisering — `/google-shopping/`

**Status:** ANNET: JA + tre egne kanal-/formatsider · **Plassering:** Kanalspesifikk tjeneste

### Kundens problem
Nettbutikken annonserer produkter, men produktfeed og kampanjer utnytter ikke sortimentet lønnsomt.

### Dette kan vi levere

**Shopping-strategi**

Vurdere hvilke produktgrupper som skal prioriteres.

**Kampanjer og budgivning**

Forbedre kampanjestruktur, budsjett og lønnsomhet.

**Produktfeed**

Samordne relevante feedforbedringer med Merchant Center.

**Nettbutikk og attribusjon**

Koble produktklikk til faktiske kjøp og marginer når data finnes.

### Hvorfor egen side
Egen kommersiell tjeneste rettet mot Shopping-kampanjer og nettbutikkøkonomi.

### Skille mot andre tjenester
Skiller seg fra /google-shopping/merchant-center/, som fokuserer på datafeil, feeder og godkjenning framfor annonsedrift.

### Leveranse og kommersiell modell
Kampanje-/sortimentsanalyse → Merchant Center-samspill → budsjett-/produktprioritering → løpende lønnsomhetsmåling.

### Avgrensninger og kvalitetskrav
Produkter kan avvises; vi kan ikke garantere godkjenning eller eksponering. Klargjør annonsebudsjett separat.

**Godkjent utvidelse:** Både hovedside og egne undersider for Google Ads, Meta Ads og Google Shopping.

## Beslutning 10: Leadoppfølging og automasjon — `/konvertering/leadoppfolging/`

**Status:** JA · **Plassering:** Konvertering

### Kundens problem
Bedriften mottar leads, men svarer for sent eller mister potensielle kunder i overgangen fra skjema til salg.

### Dette kan vi levere

**Bekreftelser**

Gi kunden relevant respons etter innsendt forespørsel.

**Varsler og ansvar**

Sørge for at riktig person mottar og eier henvendelsen.

**CRM-integrasjon**

Registrere leads med passende status og nødvendige opplysninger.

**Påminnelser**

Følge opp ubesvarte eller uavsluttede salgsmuligheter.

**Måling**

Se hvor mange henvendelser som faktisk blir fulgt opp og kjøper.

**Leadkvalifisering og prioriteringsregler**

Avklare hvilke opplysninger som gjør et lead relevant, og bruke enkle dokumenterte regler for å sortere forespørsler uten å avvise gode kunder automatisk.

**Routing og CRM-registrering**

Sende forespørsler til riktig ansvarlig person eller team og registrere nødvendige detaljer og status i relevant CRM, med sporbarhet og minst mulig persondata.

**Oppfølging og kvalitetsmåling**

Følge om leads besvares, blir til møter eller kunder, og om skjemaets kvalifiseringsspørsmål faktisk forbedrer salgsarbeidet. Justere rutiner etter målbare erfaringer.

**Overgangen fra digital henvendelse til salgsarbeid**

Kontrollere at relevante henvendelser mottas, fordeles, følges opp og knyttes til riktig status i CRM eller salgsprosess. Måle faktisk respons og kvalifisering der data finnes, ikke bare antall innsendinger.

### Hvorfor egen side
Selvstendig ettersendelsesproblem med direkte betydning for konvertering fra henvendelse til faktisk kunde.

### Skille mot andre tjenester
/henvendelser-og-booking/ forbedrer innsendingen; denne siden forbedrer tildeling, responstid, påminnelser og kvalifisering.

**Beslutning #45:** Leadkvalifisering etter innsending, mottaksansvar, CRM-routing og oppfølging ligger her. Skjema-UX og spørsmål før innsending ligger på `/konvertering/henvendelser-og-booking/`. Ingen separat kontaktskjema-URL.

### Leveranse og kommersiell modell
Kartlegg henvendelsesløp → sett opp mottak/varsling/CRM → sikre eier/ansvar → måling av svar og salg → videre driftsavtale.

### Avgrensninger og kvalitetskrav
Unngå å love full CRM-transformasjon; automatiserte markedsmeldinger krever lovlig grunnlag og kontroll med persondata.

**Tillegg fra #45 – kvalitetskrav:** Leadscore er ikke en garanti for salgsverdi. Bruk transparente regler, minimal persondatabehandling og følg faktisk konvertering fra kvalifisert henvendelse til kunde.

## Beslutning 11: Teknisk SEO og SEO-analyse — `/seo/teknisk-seo/`

**Status:** JA: begge · **Plassering:** SEO

### Kundens problem
Søkemotorer kan ikke crawle, indeksere eller forstå viktige deler av nettsiden pålitelig.

### Dette kan vi levere

**Crawling og indeksering**

Finne blokkeringer, feilkoder og sider som ikke kan indekseres.

**Canonical og redirects**

Rette duplikatproblemer og feil URL-styring.

**Strukturert data**

Validere relevant schema uten villedende markup.

**JavaScript og internlenker**

Kontrollere søkemotorenes tilgang til innhold og viktige sider.

**Feilretting og kontroll**

Prioritere, implementere og verifisere tiltak.

### Hvorfor egen side
Teknisk SEO har en egen kjøpssituasjon: diagnose, feilretting og implementering med teknisk kompetanse.

### Skille mot andre tjenester
Skiller seg fra /seo/seo-analyse/ (bred audit), /seo/nettsidestruktur/ (informasjonshierarki) og /nettsidehastighet/ (ytelse).

### Leveranse og kommersiell modell
Teknisk crawl → prioritert feilliste → fikser innen CMS/hosting → Google Search Console-verifisering og dokumentasjon.

### Avgrensninger og kvalitetskrav
Bruk faktiske feilsignaler, ikke spekulative SEO-myter; teknisk tiltak gir ingen garantert ranking-økning.

## Beslutning 11: Teknisk SEO og SEO-analyse — `/seo/seo-analyse/`

**Status:** JA: begge · **Plassering:** SEO

### Kundens problem
Virksomheten vet at organisk synlighet er svak, men mangler samlet diagnose og prioritering av muligheter.

### Dette kan vi levere

**Teknisk gjennomgang**

Kartlegge crawling, indeksering og viktige tekniske risikoer.

**Søkeord og intensjon**

Vurdere trafikkmuligheter og kommersiell relevans.

**Innholdsgap**

Finne savnet, svakt eller overlappende innhold.

**Konkurrentbilde**

Identifisere dokumenterte forskjeller og muligheter.

**Prioritert tiltaksplan**

Gi en gjennomførbar rekkefølge på tiltak, ikke bare en PDF med score.

### Hvorfor egen side
En omfattende SEO-audit kan selges som konkret inngangsprodukt før prosjekt eller månedsavtale.

### Skille mot andre tjenester
Bredere enn separate /seo/sokeordsanalyse/ og /seo/konkurrentanalyse/; vesentlig dypere enn en kort /vurdering/.

### Leveranse og kommersiell modell
Datainnsamling → teknikk/søk/innhold/konkurranse → prioritert handlingsplan med estimert innsats → tilbud om implementering.

### Avgrensninger og kvalitetskrav
Ikke gi automatisk generert «score» som om det er komplett faglig audit; skille funn, hypoteser og uverifiserte estimater.

## Beslutning 12: Innholdsoptimalisering og SEO-innhold — `/seo/innholdsoptimalisering/`

**Status:** JA · **Plassering:** SEO

### Kundens problem
Nettstedet mangler innhold som faktisk svarer på kjøpsrelevante spørsmål eller hjelper potensielle kunder å velge.

### Dette kan vi levere

**Innholdsaudit**

Finne utdaterte, tynne eller overlappende sider.

**Forbedre eksisterende sider**

Tydeliggjøre tittel, H1, søkeintensjon, struktur og internlenker.

**Nye kommersielle sider**

Dekke dokumenterte relevante søk med reell nyttig informasjon.

**Innholdsklynger**

Knytte hovedtjenester, spesialtjenester og guider sammen.

**AI-søk og vedlikehold**

Gjøre innhold tydelig og etterprøvbart uten AI-plasseringsgaranti.

### Hvorfor egen side
Egen SEO-tjeneste for innholdet som ressurs og strategisk struktur, ikke bare tekstproduksjon per måned.

### Skille mot andre tjenester
SEO-intensjon og temaautoritet er fokus; /konvertering/budskap-og-tilbud/ handler primært om overbevisning på besøkte sider.

### Leveranse og kommersiell modell
Søkeintensjon og innholdsgap → innholdsbrief → oppdatere/bygge side → internlenker → evaluere organisk trafikk og leads.

### Avgrensninger og kvalitetskrav
Ikke masseproduser tynne AI-tekster. Unngå påstand om at bestemt struktur garanterer AI-siteringer.

## Beslutning 13: Google Maps og Google bedriftsprofil — `/lokal-seo/google-maps/`

**Status:** JA · **Plassering:** Lokal SEO

### Kundens problem
Lokale kunder finner konkurrentene i Google Maps, mens bedriftens profil er ufullstendig eller lite nyttig.

### Dette kan vi levere

**Bedriftsprofil**

Rette tjenester, kategorier, åpningstider, bilder og kontaktdata.

**Konkurrentanalyse lokalt**

Vurdere relevante Maps-søk og realistiske forbedringsmuligheter.

**Anmeldelser**

Etablere rutiner for ekte anmeldelser og profesjonelle svar.

**Nettsidesamspill**

Sikre samsvar mellom bedriftsprofil og lokale sider.

**Vedlikehold og måling**

Følge profilhandlinger og oppdatere faktiske opplysninger.

### Hvorfor egen side
Google Maps og bedriftsprofil har konkret kjøpsintensjon, egnet for raskt oppstartprosjekt og retainer.

### Skille mot andre tjenester
/lokal-seo/ er overordnet kommersiell tjeneste; /innsikt/google-bedriftsprofil/ er informativ guide.

### Leveranse og kommersiell modell
Profil-audit → kategorier/tjenester/opplysninger/bilder → rutiner for anmeldelser og vedlikehold → måling av handlinger.

### Avgrensninger og kvalitetskrav
Ingen fiktive profiler, lokasjoner eller garantier om Maps-posisjoner. Anmeldelser må være reelle.

## Beslutning 14: AI-synlighet i ChatGPT og Google AI — `/ai-synlighet/chatgpt/`

**Status:** JA: begge · **Plassering:** AI-synlighet

### Kundens problem
Bedriften vet ikke om tjenestene blir funnet eller omtalt i ChatGPT-relaterte søke- og svaropplevelser.

### Dette kan vi levere

**Kartlegging av AI-svar**

Undersøke relevante forespørsler og om bedriften/kilder er synlige.

**Kildegrunnlag**

Forbedre tilgjengelig og troverdig informasjon om bedriften.

**Teknisk tilgjengelighet**

Kontrollere at relevante sider kan hentes og forstås.

**Innholdsforbedring**

Bygge tydelige, etterprøvbare tjenestesider og fakta.

**Oppfølging**

Måle observerbar utvikling uten å love anbefalinger.

### Hvorfor egen side
Egen målrettet inngang for kunder som eksplisitt spør om ChatGPT-synlighet, med reell kartlegging og innholdsarbeid.

### Skille mot andre tjenester
ChatGPT-spesifikt fokus; /ai-synlighet/google-ai/ dekker Googles AI-funksjoner. Hovedsiden /ai-synlighet/ binder dem sammen.

### Leveranse og kommersiell modell
Undersøk relevante spørsmål og kilder → teknisk tilgjengelighet/virksomhetsfakta → forbedre troverdig innhold → periodisk kontroll.

### Avgrensninger og kvalitetskrav
Ingen garanti for å bli anbefalt eller sitert. Avhengigheter til søkeindeks, kilder og endringer i AI-produkter må beskrives ærlig.

## Beslutning 14: AI-synlighet i ChatGPT og Google AI — `/ai-synlighet/google-ai/`

**Status:** JA: begge · **Plassering:** AI-synlighet

### Kundens problem
Bedriften vil forstå og forbedre sin synlighet i Googles AI-baserte søkeresultater og oppsummeringer.

### Dette kan vi levere

**AI-søkeanalyse**

Kartlegge relevante søk og observerbar tilstedeværelse i AI Overviews/Mode.

**Teknisk SEO**

Forbedre indekserbarhet og innholdstilgjengelighet.

**Faglig innhold**

Lage nyttige, tydelige og etterprøvbare svar på kundespørsmål.

**Internlenking og kilder**

Styrke sammenheng og kildestøtte der relevant.

**Måling**

Følge tilgjengelige signaler uten garantier om plassering.

### Hvorfor egen side
Egen søkeintensjon rundt AI Overviews og AI Mode, som ikke er det samme som ChatGPT-søk.

### Skille mot andre tjenester
Tyngdepunkt i teknisk SEO, innhold, søkeintensjon og kildekvalitet; ikke egen «hemmelig AI-ranking»-teknikk.

### Leveranse og kommersiell modell
Analyse av spørsmål/eksponering når målbart → SEO-tekniske og redaksjonelle forbedringer → oppfølging av synlighet.

### Avgrensninger og kvalitetskrav
Rapporter må skille observert synlighet fra antagelser; ingen garanterte AI-plasseringer.

## Beslutning 15: A/B-testing og konverteringseksperimenter — `/konvertering/ab-testing/`

**Status:** ANNET: JA; foreløpig bare Partner-pakken · **Plassering:** Konvertering

### Kundens problem
Bedriften gjør endringer basert på magefølelse og vet ikke om nye varianter faktisk fungerer bedre.

### Dette kan vi levere

**Eksperimenthypoteser**

Velge endringer basert på konkret friksjon og mål.

**Testdesign**

Definere variant, primærmål, guardrails og relevant analyse.

**Implementering**

Teste sideelementer, tilbud, skjema eller kjøpsflyt.

**Resultatvurdering**

Rapportere usikkerhet og effekt uten falske konklusjoner.

**Alternativ ved lav trafikk**

Bruke UX-test eller målrettet forbedring når A/B-test ikke er forsvarlig.

### Hvorfor egen side
Egen spesialisert underside for systematiske eksperimenter og metode, ikke en generell CRO-side.

### Skille mot andre tjenester
A/B-testing forutsetter tilstrekkelig trafikk/konverteringer; mindre nettsteder får kvalitativ analyse og prioriterte forbedringer i stedet.

### Leveranse og kommersiell modell
Hypotese → eksperimentdesign → instrumentering → trafikkfordeling → evaluering → implementering når evidens er sterk nok.

### Avgrensninger og kvalitetskrav
BINDENDE: omfattende A/B-testing er foreløpig kun inkludert i Partner-pakken; pakkematrise ellers ikke låst.

**Godkjent pakkevilkår:** Omfattende A/B-testing foreløpig kun under Partner-pakken; krever tilstrekkelig trafikk.

## Beslutning 16: Søkeordsanalyse og konkurrentanalyse — `/seo/sokeordsanalyse/`

**Status:** BEGGE · **Plassering:** SEO

### Kundens problem
Bedriften vet ikke hvilke søk, spørsmål og formuleringer som faktisk fører potensielle kunder til tjenester og produkter.

### Dette kan vi levere

**Søkeordskartlegging**

Samle relevante søk fra kunder, nettsted og marked.

**Søkeintensjon**

Skille kjøpsnære søk fra informasjonsbehov.

**Mulighetsprioritering**

Vurdere konkurranse, relevans og forventet forretningsverdi.

**Side- og innholdsplan**

Koble temaer til eksisterende eller nye URL-er.

**Leveranse**

Gi etterprøvbar prioriteringsliste, ikke bare rå søkeordvolum.

### Hvorfor egen side
Egen leveranse med tydelig søkeintensjon og konkret output: prioritert søkeord- og sideplan.

### Skille mot andre tjenester
Smalere enn /seo/seo-analyse/; handler om etterspørsel, intensjon og innholdskartlegging, ikke hele nettstedet.

### Leveranse og kommersiell modell
Seed keywords → konkurranse/volum/intensjon → tematisk gruppering → prioriterte kommersielle landingssider og guider.

### Avgrensninger og kvalitetskrav
Søkevolum og konkurranse er estimater, ikke sikre kundevolumer; prioriter inntektsrelevans fremfor trafikk alene.

## Beslutning 16: Søkeordsanalyse og konkurrentanalyse — `/seo/konkurrentanalyse/`

**Status:** BEGGE · **Plassering:** SEO

### Kundens problem
Bedriften vet at rivaler rangerer bedre, men ikke hvilke innholdsgap, søkeord eller henvisninger som forklarer forskjellen.

### Dette kan vi levere

**Kartlegge faktiske søkekonkurrenter**

Skille mellom forretningskonkurrenter og nettsteder som dominerer Google.

**Synlighet og søkeord**

Vurdere hvor konkurrenter får trafikk og hvilke intensjoner de dekker.

**Innhold og lenker**

Sammenligne nyttige innholdsområder og relevante omtaler.

**Mulighetskart**

Foreslå konkrete, prioriterte måter å skille seg ut på.

**Forbehold**

Skille tredjepartsestimat fra verifiserte egne data.

### Hvorfor egen side
Egen side er eksplisitt godkjent selv om den overlapper SEO-audit; kan selges som separat konkurransestudie.

### Skille mot andre tjenester
Smalere enn /seo/seo-analyse/, med spesifikk benchmark av identifiserte søkekonkurrenter og prioriterte muligheter.

### Leveranse og kommersiell modell
Definer konkurrentsett → sammenlign synlighet, innhold, struktur og lenker → identifiser realistiske muligheter → tiltaksplan.

### Avgrensninger og kvalitetskrav
Ikke presenter estimerte konkurrenttall som interne fasiter. Ikke kopier konkurrentinnhold.

## Beslutning 17: Nettsidestruktur og internlenking — `/seo/nettsidestruktur/`

**Status:** JA · **Plassering:** SEO

### Kundens problem
Brukere og søkemotorer strever med et ulogisk sidehierarki, foreldreløse sider og dårlig internlenking.

### Dette kan vi levere

**Informasjonsarkitektur**

Skape et logisk hierarki mellom tjenester, guider og kategorier.

**Navigasjon**

Forbedre meny, brødsmuler og veier til viktige sider.

**Internlenker**

Identifisere foreldreløse sider og koble sammen relevante tema.

**URL-struktur**

Vurdere adresser og redirects ved større omstrukturering.

**Endringskontroll**

Kontrollere eksisterende trafikk og minimere migreringsrisiko.

### Hvorfor egen side
Egen tjeneste for informasjonsarkitektur på nettstednivå; særlig relevant ved vekst og mange kommersielle sider.

### Skille mot andre tjenester
Teknisk SEO er tilgang/indeksering, innholdsoptimalisering er innholdskvalitet; denne tjenesten organiserer sammenhengen.

### Leveranse og kommersiell modell
Innholdsinventar → sitemap/taksonomi → meny/breadcrumbs/internlenker → redirectkart ved endring → kontroll av bruk og indeksering.

### Avgrensninger og kvalitetskrav
Unngå unødvendig endring av etablerte URL-er med organisk verdi; migreringsrisiko må vurderes.

## Beslutning 18: Lenkebygging og digital PR — `/seo/lenkebygging/`

**Status:** JA · **Plassering:** SEO

### Kundens problem
Bedriften blir lite omtalt og har færre relevante redaksjonelle referanser enn etablerte konkurrenter.

### Dette kan vi levere

**Lenkeprofilanalyse**

Gjennomgå reelle eksterne referanser og muligheter.

**Konkurrentreferanser**

Finne relevante fag- og bransjesider som omtaler konkurrenter.

**Digital PR**

Utvikle nyttige undersøkelser, guider eller data til redaksjonell omtale.

**Bransjeomtale**

Få korrekte, relevante referanser fra samarbeidspartnere og organisasjoner.

**Oppfølging**

Måle omtale og henvisningstrafikk uten kjøpte manipulerende lenker.

### Hvorfor egen side
Egen etterspurt SEO-tjeneste, men må posisjoneres som digital PR/fortjent omtale fremfor kvantitet på lenker.

### Skille mot andre tjenester
Skiller seg fra innholdsproduksjon ved aktiv kilde-, partner- og medieorientert distribusjon; kan støtte organisk oppdagelse.

### Leveranse og kommersiell modell
Lenkeprofil/kildemuligheter → originalt innhold/data → relevant outreach → dokumenter omtaler og henvisningstrafikk.
### Avgrensninger og kvalitetskrav
Ingen PBN, spam, betalte rangeringslenker eller garanterte antall dofollow-lenker. Sponsorinnhold må merkes.

## Beslutning 19: SEO ved redesign og migrering — `/seo/seo-migrering/`

**Status:** JA · **Plassering:** SEO

### Kundens problem
Et nettsted skal bytte domene/CMS/struktur, og eksisterende organisk trafikk risikerer å falle ved feil lansering.

### Dette kan vi levere

**Førkartlegging**

Identifisere viktige URL-er, trafikk, lenker og indeksering.

**Redirectkart**

Mappe gamle URL-er til relevante nye adresser.

**Teknisk lanseringskontroll**

Verifisere canonicals, sitemap, robots, noindex og metadata.

**Publiserings-QA**

Teste responskoder, interne lenker og kritiske sider.

**Etterkontroll**

Overvåke 404, indeksdekning, trafikk og konverteringer.

### Hvorfor egen side
Konkret tidsavgrenset kjøpsbehov med høy konsekvens ved feil; kan leveres uavhengig av nettsidebygging.

### Skille mot andre tjenester
Annerledes enn løpende teknisk SEO: kartlegging, redirectkart og kvalitetssikring før/under/etter overgang.

### Leveranse og kommersiell modell
Baseline/crawl → URL-mapping → redirect/metadata/canonical/sitemap → launch gate → søke- og feilovervåkning etter publisering.

### Avgrensninger og kvalitetskrav
Ingen garanti om uendrede rangeringer. Avklar ansvar mellom utvikler, CMS/host og SEO.

## Beslutning 20: Produktsøk og filtrering — `/nettbutikkoptimalisering/sok-og-filtrering/`

**Status:** JA · **Plassering:** Nettbutikkoptimalisering

### Kundens problem
Brukere finner ikke ønskede varer fordi produktsøk, synonymer, nulltreff eller filtre fungerer dårlig.

### Dette kan vi levere

**Produktsøkanalyse**

Se etter irrelevante treff, svake søkeresultater og nulltreff.

**Autofullføring og synonymer**

Forbedre forslag, stavevarianter og produktnavn.

**Filtre og sortering**

Tilpasse relevante attributter og produktkatalogen.

**Mobil søkeopplevelse**

Gjøre søk, filtrering og tilbake-navigasjon enklere.

**Søkemåling**

Bruke interne søk til å finne etterspørsel og tapte salgsmuligheter.

### Hvorfor egen side
Egen tjeneste for større produktkataloger med tydelig teknologi- og UX-arbeid.

### Skille mot andre tjenester
Produktsøk handler om produktfunn, /produktsider/ om varepresentasjon, /kjopsflyt/ om fullføring.

### Leveranse og kommersiell modell
Søkelogg og brukeroppgaver → prioriter treffrelevans/filtre/synonymer → implementering → mål søk til produkt og salg.

### Avgrensninger og kvalitetskrav
Ikke selg avansert søketeknologi der plattform/budsjett ikke støtter det; små sortiment har normalt lavere verdi.

## Beslutning 21: E-postmarkedsføring og automatiserte kundeflyter — `/epostmarkedsforing/`

**Status:** JA · **Plassering:** Hovedtjeneste

### Kundens problem
Bedriften henter kunder, men følger dem sjelden opp med relevante nyhetsbrev, onboarding, tilbud eller gjenkjøpskommunikasjon.

### Dette kan vi levere

**Nyhetsbrev**

Planlegge relevante utsendelser og tydelig kundeverdi.

**Automatiserte kundeløp**

Bygge velkomst-, oppfølgings- og gjenkjøpsflyter.

**Handlekurvoppfølging**

Konfigurere lovlige påminnelser ved frafall.

**Segmentering**

Tilpasse meldinger ut fra relevante kunde- og kjøpsdata.

**Integrasjon og måling**

Koble e-postplattform, CRM eller nettbutikk og følge salg/avmeldinger.

### Hvorfor egen side
Egen hovedtjeneste med tydelig retainer-potensial og høy verdi fra eksisterende kundebase.

### Skille mot andre tjenester
Bredere kundelivssyklus/retention enn /konvertering/leadoppfolging/ som håndterer nye henvendelser.

### Leveranse og kommersiell modell
Kundedata og samtykke → segment/velkomst-/etterkjøpsflyter → planlagt kampanjekalender → løpende utsendelse og inntektsmåling.

### Avgrensninger og kvalitetskrav
Ikke ubegrenset produksjon til fast lavpris. Følg regler for e-postmarkedsføring og respekter avmeldinger.

## Beslutning 22: Google Ads-landingssider — `/landingssider/google-ads/`

**Status:** JA · **Plassering:** Landingssider

### Kundens problem
Bedriften kjøper Google-klikk, men sender trafikken til sider som ikke svarer på annonsebudskap eller intensjon.

### Dette kan vi levere

**Annonse–side-samsvar**

Koble søkeord, annonsetekst, løfte og landingssidens første skjerm.

**Bygge kampanjesider**

Produsere målrettede sider med tydelig CTA og relevante bevis.

**Skjema og mobil**

Forenkle handlinger og redusere friksjon på telefon.

**Konverteringssporing**

Måle faktiske leads eller salg fra kampanjen.

**Løpende forbedring**

Prioritere endringer på grunnlag av kampanjedata uten å kreve kontooverføring.

### Hvorfor egen side
Egen spesifikk søkeintensjon og mulighet for å få kunder som bruker et annet Ads-byrå.

### Skille mot andre tjenester
/landingssider/ gjelder alle kanaler, /google-ads/ kampanjedrift; denne tjenesten optimaliserer siden etter klikk.

### Leveranse og kommersiell modell
Analyser søketerm/annonse/landing → utvikle relevant side → tydelig henvendelsesløp → spor relevante Google Ads-konverteringer.

### Avgrensninger og kvalitetskrav
BINDENDE: omfattende A/B-testing fortsatt bare Partner; bruk kontrollerte forbedringer ved lavt trafikkvolum.

## Beslutning 23: Mobiloptimalisering — `/konvertering/mobiloptimalisering/`

**Status:** JA · **Plassering:** Konvertering

### Kundens problem
Mobilbesøkende mislykkes med navigasjon, skjema eller kjøp selv om siden teknisk tilpasser seg skjermbredden.

### Dette kan vi levere

**Mobil UX-audit**

Teste navigasjon, lesbarhet, knapper og scrolling.

**Skjema og booking**

Redusere feil og unødvendige steg på mobil.

**Mobil checkout**

Gjøre betalings- og kjøpshandlinger enklere å bruke.

**Responsiv feilretting**

Rette layout og berøringsflater på ulike skjermstørrelser.

**Måling**

Sammenligne relevante mobil- og desktopkonverteringer.

### Hvorfor egen side
Egen tjeneste for mobil UX og CRO, som kan dokumenteres med konkrete brukeroppgaver.

### Skille mot andre tjenester
Ikke dupliser /nettsidehastighet/; fokus på touchmål, innholdshierarki, friksjon og tilgjengelig mobilflyt.

### Leveranse og kommersiell modell
Mobilreview/brukertest → forbedre navigasjon, CTA og skjema → teste på enheter → mål mobilkonverteringer.

### Avgrensninger og kvalitetskrav
Ikke påstå kausalitet fra enkel før-/etteranalyse; hold kontrast/tastaturkrav synkronisert med UU-tjenesten.

## Beslutning 24: Pris- og pakkepresentasjon — `/konvertering/prissider/`

**Status:** JA · **Plassering:** Konvertering

### Kundens problem
Kundene forstår ikke hva ulike pakker koster, hva som følger med eller hvilken løsning de bør velge.

### Dette kan vi levere

**Prissidegjennomgang**

Finne uklarheter i inkluderte leveranser og totalpris.

**Pakkestruktur og sammenligning**

Gjøre alternativer og forskjeller enkle å forstå.

**Pakkevelger og CTA**

Hjelpe kunden velge og fullføre neste handling.

**Pristransparens**

Synliggjøre tillegg, bindingstid og viktige forbehold.

**Resultatmåling**

Følge pakkevalg, henvendelser og frafall.

**Pakkevelger og beslutningsstøtte**

Utforme klare sammenligninger av pakker, tydelige anbefalinger, reelle tillegg og handlingsknapper som gjør valget enkelt også på mobil.

**Måling av tilbudsaksept og pakkevalg**

Følge hvilke pakker og tilbud som fører til kvalifiserte henvendelser eller kjøp, og – når dataene finnes – vurdere tilbudsaksept og dekningsbidrag. Ikke hevde forbedring uten måling.

### Hvorfor egen side
Selvstendig konverteringsoppgave for pristransparens, pakkevelgere og beslutningsstøtte.

### Skille mot andre tjenester
Budskap-og-tilbud forklarer totalverdi; prissider fokuserer på sammenligning av priser, nivåer, vilkår og CTA.

**Avklaring fra #44:** Denne siden presenterer godkjente tilbud og gjør pakkevalg enkelt; den strategiske utformingen av pakker og kundeløfte håndteres i `/konvertering/budskap-og-tilbud/`. Ingen egen tilbudsoptimaliseringsside.

### Leveranse og kommersiell modell
Kartlegg produkt-/pakkesalg → redesign pakketabell → forklar inkluderer/ekstra → forenkle valg og booking → mål pakkevalg.

### Avgrensninger og kvalitetskrav
Ikke selg avansert økonomisk prisoptimalisering som standard. Ingen skjulte tredjepartskostnader eller mørke mønstre.

**Kvalitetskrav fra #44:** Ikke påstå at endret prisside løfter salget uten pålitelig måling; vis totale kostnader, vilkår og eventuelle tillegg tydelig.

## Beslutning 25: UX-analyse og brukertesting — `/konvertering/brukertesting/`

**Status:** JA · **Plassering:** Konvertering

### Kundens problem
Bedriften vet at brukere faller av, men mangler observasjoner som forklarer hvor og hvorfor.

### Dette kan vi levere

**UX-gjennomgang**

Kartlegge konkrete problemer med informasjon og interaksjon.

**Brukertester**

Observere relevante personer utføre realistiske oppgaver.

**Atferdsanalyse**

Bruke passende klikk-, scroll- og frafallsdata med personvernkontroller.

**Mobil og desktop**

Teste forskjellige enheter og kritiske arbeidsflyter.

**Tiltaksplan**

Prioritere dokumenterte problemer og foreslå implementering.

### Hvorfor egen side
Egen analyseinngang som avdekker problemer før utviklingsarbeidet starter.

### Skille mot andre tjenester
Skiller seg fra A/B-testing som kvantifiserer variantforskjeller, og mobiloptimalisering som implementerer mobilforbedringer.

### Leveranse og kommersiell modell
Definer kritiske oppgaver → UX-review → ev. faktiske tester/atferdsanalyse → prioriter feil → tilby implementering.

### Avgrensninger og kvalitetskrav
Omfattende rekruttering/intervjuer er ressurskrevende og må prises separat eller til større pakke; lovlig opptak/samtykke.

## Beslutning 26: Universell utforming og tilgjengelighet — `/universell-utforming/`

**Status:** JA · **Plassering:** Selvstendig tjenesteside

### Kundens problem
Besøkende med funksjonsnedsettelser hindres fra å bruke nettsiden, og virksomheten kan ha relevante lovkrav som ikke oppfylles.

### Dette kan vi levere

**Tilgjengelighetskartlegging**

Vurdere relevante WCAG-krav og nettstedets faktiske bruksmønstre.

**Semantikk og skjermleser**

Forbedre struktur, alternativtekst og tilgjengelige navn.

**Tastatur og fokus**

Rette navigasjon, fokusrekkefølge og dialoger.

**Kontrast og skjema**

Forbedre lesbarhet, feilmeldinger og interaksjoner.

**Manuell verifisering**

Teste kritiske flyter og dokumentere faktiske avvik fremfor automatscore.

### Hvorfor egen side
Egen etterspurt faglig leveranse med konkret kartlegging og feilretting; ikke bare generisk UX.

### Skille mot andre tjenester
Fokus på tilgjengelighet og relevante WCAG/UU-krav; skiller seg fra mobil-CRO og generell brukertesting.

### Leveranse og kommersiell modell
Scope gjeldende krav → automatiserte og manuelle tester → feilregister og alvorlighet → retting → kontroll og vedlikehold.

### Avgrensninger og kvalitetskrav
Krav avhenger av virksomhetstype og løsning. Ikke lov full WCAG-etterlevelse fra automatisk skanning alene.

## Beslutning 27: Lokale landingssider og geografisk SEO — `/lokal-seo/lokale-landingssider/`

**Status:** JA · **Plassering:** Lokal SEO

### Kundens problem
Bedriften dekker flere steder, men blir bare funnet organisk i ett geografisk område.

### Dette kan vi levere

**Geografisk mulighetsanalyse**

Velge steder der bedriften faktisk leverer tjenester og har relevant etterspørsel.

**Lokale tjenestesider**

Lage nyttig stedsspesifikt innhold, ikke templatsider med bynavn byttet.

**Lokale bevis**

Bruke ekte oppdrag, referanser og faktiske serviceområder.

**Internlenking og CTA**

Koble stedsider til hovedtjenester og riktig kontaktløp.

**Oppfølging**

Måle henvendelser fra aktuelle områder.

### Hvorfor egen side
Egen SEO-tjeneste for dokumentert geografisk serviceområde, som kan gi etterspurt organisk trafikk og kvalifiserte henvendelser.

### Skille mot andre tjenester
/lokal-seo/google-maps/ gjelder bedriftsprofil; /flere-lokasjoner/ gjelder faktiske avdelinger; denne handler om nettsider for reelle tjenesteområder.

### Leveranse og kommersiell modell
Geografisk prioritering → stedsspesifikk kundeverdi/referanser → lokal sidemal med reelt innhold → internlenker og måling.

### Avgrensninger og kvalitetskrav
Ingen masseproduserte byttenavn-sider eller doorway pages; ingen fiktive bedriftsadresser/profiler.

## Beslutning 28: Lokal SEO for flere lokasjoner — `/lokal-seo/flere-lokasjoner/`

**Status:** JA · **Plassering:** Lokal SEO

### Kundens problem
Flere reelle avdelinger har ujevne bedriftsprofiler, inkonsistente åpningstider og svak lokal siderapportering.

### Dette kan vi levere

**Avdelingskartlegging**

Verifisere faktiske lokasjoner, kontaktdata og tjenester.

**Google-profiler**

Optimalisere kvalifiserende bedriftsprofiler for hver avdeling.

**Avdelingssider**

Lage lokale sider med adresse, åpningstider og særtrekk.

**Anmeldelser og rutiner**

Samordne oppdateringer og omdømmearbeid.

**Rapportering per lokasjon**

Følge relevante lokale signaler og målbare henvendelser.

### Hvorfor egen side
Egen skalerbar B2B-leveranse for små og mellomstore kjeder med flere faktiske lokasjoner.

### Skille mot andre tjenester
Ikke forveksles med bedrifter som leverer tjenester i mange byer uten egne avdelinger; Google-profiltilgang må være legitim.

### Leveranse og kommersiell modell
Avdelingsinventar → profil/sidedata → felles oppsett og rutiner → avdelingsspesifikke rapporter og månedlig vedlikehold.

### Avgrensninger og kvalitetskrav
Foreslått prismodell grunnpris + avdelingstillegg er IKKE vedtatt; krav til reelle lokasjoner og korrekte opplysninger.

## Beslutning 29: Google Ads-kontoanalyse — `/google-ads/kontoanalyse/`

**Status:** JA · **Plassering:** Google Ads

### Kundens problem
Bedriften har aktive Google Ads, men vet ikke om budsjett, søkeord, sporing og landingssider er optimalt satt opp.

### Dette kan vi levere

**Kampanjestruktur**

Gjennomgå kampanjer, søkeord, søketermer og negative søkeord.

**Bud og budsjett**

Vurdere fordeling og strategier opp mot forretningsmål.

**Konverteringsoppsett**

Kvalitetssikre primærmål og sporing.

**Landingssidekvalitet**

Sjekke samsvar mellom søkeintensjon, annonse og side.

**Prioritert rapport**

Skille faktiske feil fra muligheter og levere tiltaksplan uten å endre kontoen.

### Hvorfor egen side
Selvstendig uavhengig kontroll som kan selges uten at kunden bytter byrå; godt inngangsprodukt.

### Skille mot andre tjenester
Skilles fra /google-ads/ som er løpende drift, og fra /sporing-og-maling/ som er kanalovergripende.

### Leveranse og kommersiell modell
Lesetilgang → kontoaudit → dokumenterte funn/risiko/muligheter → handlingsplan → valgfri implementering/retainer.

### Avgrensninger og kvalitetskrav
Ingen endring i kontoen uten avtale; dokumenter estimater og funn separat; skille mediebudsjett fra honorar.

## Beslutning 30: Meta Ads-analyse og kontorevisjon — `/meta-ads/kontoanalyse/`

**Status:** JA · **Plassering:** Meta Ads

### Kundens problem
Meta-annonser gir aktivitet, men kunden vet ikke om kreativer, målgrupper, Pixel/CAPI eller landingssider skaper salg.

### Dette kan vi levere

**Kampanjeaudit**

Se på mål, annonsesett, budsjett og plasseringer.

**Kreativ analyse**

Vurdere bilder, videoer, hooks, budskap og annonsetretthet.

**Målgrupper**

Evaluere distribusjon og segmenteringsstrategi.

**Meta Pixel/CAPI**

Kontrollere hendelser, matching og deduplisering.

**Lønnsomhet**

Analysere CPA/ROAS med nødvendige attribusjonsforbehold og tiltaksplan.

### Hvorfor egen side
Uavhengig audit med egen plattformspesifikk metodikk, attraktiv for kunder som allerede bruker et byrå.

### Skille mot andre tjenester
Skilles fra /meta-ads/ drift; skal ikke bli en kopi av Google Ads-auditen – prioriter kreativ, leveranse og hendelsesdata.

### Leveranse og kommersiell modell
Lesetilgang → gjennomgå kreativer/kampanjer/pixel/deduplisering → tiltak sortert etter effekt/innsats → valgfri drift.

### Avgrensninger og kvalitetskrav
Vurder attribusjon kritisk og skill tilskrevne resultater fra dokumentert meromsetning.

## Beslutning 31: Google Merchant Center og produktfeed — `/google-shopping/merchant-center/`

**Status:** JA · **Plassering:** Google Shopping

### Kundens problem
Produkter mangler synlighet fordi feeden har feil, viktig produktdata er mangelfull, eller priser/lagerstatus ikke samsvarer.

### Dette kan vi levere

**Merchant Center-analyse**

Gjennomgå konto, produktkilder, diagnostikk, produktstatus og varsler om avvik.

**Produktfeed-optimalisering**

Forbedre produkttitler, beskrivelser, produktkategorier, bilder og relevante attributter som merke og GTIN.

**Feilretting og produktavvisninger**

Finne og rette årsaker til feil der vi har nødvendige tilganger og kontroll over produktdataene.

**Automatisk produktsynkronisering**

Kontrollere at priser, lagerstatus, produktvarianter og tilgjengelighet samsvarer mellom nettbutikk og Google.

**Shopify og WooCommerce**

Sette opp og forbedre produktintegrasjoner, datakilder og nødvendige feed-tilpasninger.

**Overvåkning og løpende vedlikehold**

Oppdage nye avvisninger, endringer i produktdata og problemer som kan påvirke synligheten.

### Hvorfor egen side
Konkret inngangsprodukt der bedriften ofte allerede ser avvisninger i Merchant Center; relevant for Shopping og gratis produktoppføringer.

### Skille mot andre tjenester
Ikke lik /google-shopping/ (annonsekampanjer); produktdatakvalitet, produktkilder, diagnostikk og synk står i sentrum.

### Leveranse og kommersiell modell
Merchant-audit → feilrettingsprioritering → feed/attributter/synk i Shopify/WooCommerce → verifisering → vedlikeholdsavtale.

### Avgrensninger og kvalitetskrav
Ingen garanti om Google-godkjenning; endringer må stemme med faktiske produktdata og gjeldende Merchant Center-krav.

## Beslutning 32: Google Ads-konverteringssporing — `/google-ads/konverteringssporing/`

**Status:** ANNET: JA – egen underside under Google Ads · **Plassering:** Google Ads

### Kundens problem
Google Ads teller feil eller doble konverteringer, mangler verdien av kvalifiserte henvendelser og salg, eller optimaliserer budene mot irrelevante handlinger. Da kan annonsebudsjettet styres etter et misvisende datagrunnlag.

### Dette kan vi levere

**Konverteringsaudit**

Sjekke hvilke hendelser som er primære/sekundære, og om mål teller riktig handling.

**Google tag og Tag Manager**

Feilsøke triggere, tagger, hendelser og feilaktig dobbeltregistrering.

**GA4-import**

Kontrollere importerte konverteringer, forskjeller i måling og rapporteringslogikk.

**Enhanced conversions**

Vurdere og sette opp forbedret matching innenfor plattform- og personvernkrav.

**Offline-konverteringer**

Koble kvalifiserte leads og avsluttede salg tilbake til Ads når det er teknisk og rettslig grunnlag.

**Samtykke og QA**

Kontrollere relevant Consent Mode, personvern og ende-til-ende måling før budgivning optimaliseres.

### Hvorfor egen side
Spesifikk teknisk kjøpsintensjon: eksisterende annonser har problem med sporing. Kan selges som selvstendig feilrettingsprosjekt til kunder som beholder sitt byrå.

### Skille mot andre tjenester
/sporing-og-maling/ er kanalovergripende; /google-ads/ handler om kampanjedrift; denne siden om korrekt måling og signaler til Googles budgivning. Unngå duplisering med /google-ads/kontoanalyse/, som er en bredere audit.

### Leveranse og kommersiell modell
Lesetilgang og målspesifikasjon → audit → implementering/feilretting → kontroll av hendelser og avstemming mot CRM/nettbutikk → dokumentasjon; prosjektpris og mulig løpende vedlikehold.

### Avgrensninger og kvalitetskrav
Ingen garanti om eksakt attribusjon eller ROAS. Kontroller samtykke, dataminimering, datakvalitet, personvernkrav og faktisk virkemåte før bruk til budgivning.

---

## Beslutning 33: Meta-konverteringssporing — `/meta-ads/konverteringssporing/`

**Status:** JA · **Plassering:** Under Meta Ads

### Kundens problem
Bedriften annonserer på Facebook og Instagram, men har mangelfull konverteringssporing. Kjøp eller henvendelser registreres feil, mangler eller telles dobbelt. Da blir resultatrapportene og optimaliseringsgrunnlaget misvisende.

### Dette kan vi levere

**Meta Pixel-analyse**

Gjennomgå installasjon, hendelser, triggere og hvordan nettleserbasert konverteringssporing fungerer.

**Conversions API (CAPI)**

Sette opp eller forbedre serverbasert hendelsesoverføring der det er hensiktsmessig, med korrekte hendelser og nødvendig databeskyttelse.

**Deduplisering og datakvalitet**

Kontrollere at samme kjøp eller henvendelse ikke blir registrert dobbelt når Pixel og CAPI brukes sammen.

**Sporing av kjøp og henvendelser**

Konfigurere relevante hendelser for produktsider, handlekurv, kjøp, skjemaer og leadgenerering.

**Shopify, WooCommerce og CRM**

Kontrollere integrasjoner og muligheten for å måle faktiske salg eller kvalifiserte henvendelser fremfor bare klikk.

**Samtykke og feilsøking**

Kontrollere personvern, samtykkestyring, Events Manager-diagnostikk og at hendelser registreres som tiltenkt.

### Hvorfor egen side
En konkret teknisk kjøpsintensjon: få riktig måling fra eksisterende Meta-kampanjer uten å måtte bytte annonsebyrå. Selvstendig prosjekt med verdi uavhengig av løpende kampanjedrift.

### Skille mot andre tjenester
/meta-ads/ handler om drift og kampanjer; /meta-ads/kontoanalyse/ er en bred gjennomgang av annonsering; /meta-ads/konverteringssporing/ gjelder Pixel, CAPI og datakvalitet; /sporing-og-maling/ er kanalovergripende. /google-ads/konverteringssporing/ er tilsvarende Google-spesifikk tjeneste.

### Leveranse og kommersiell modell
Få tilgang og avklar KPI-er → Meta Events Manager/Pixel/CAPI-audit → prioritert feilretting og implementering → verifisering av hendelser og deduplisering → dokumentasjon og eventuell månedlig overvåkning. Betalt, avgrenset prosjekt; kan utføres uten å overta annonseringen.

### Avgrensninger og kvalitetskrav
Ikke lov at alle hendelser måles, eksakt attribusjon eller automatisk bedre ROAS. Samtykke, personvern, dataminimering, sikker håndtering av kundeopplysninger og plattformens krav er forutsetninger. Ingen ukontrollert bruk av sensitive data.

---

## Beslutning 34: Handlekurvoptimalisering og mersalg — NEI til egen URL

**Foreslått, avvist URL:** `/nettbutikkoptimalisering/handlekurv/` (skal ikke opprettes).

**Hvorfor:** Brukeren valgte NEI. Handlekurvens utforming, totalsum, fraktinformasjon, mobilbruk og relevante kryssalg overlapper med den godkjente kjøpsflyten. En ekstra underside ville duplisere eller fragmentere eksisterende tjeneste.

**Innholdsgrunnlag som skal bevares:** Se **beslutning 3** på `/nettbutikkoptimalisering/kjopsflyt/`; den har nå individuelle leveransebeskrivelser for handlekurvens oversikt og relevante tilleggsprodukter. E-postoppfølging av avbrutte handlekurver inngår i `/epostmarkedsforing/` når aktuelt.

**Implementeringsstatus:** Dokumentert, ikke bygget. Ingen ny URL fra punkt 34.

---

## Beslutning 35: Kundelojalitet og gjenkjøp — `/nettbutikkoptimalisering/gjenkjop/`

**Status:** JA · **Plassering:** Under Nettbutikkoptimalisering

### Kundens problem
Nettbutikken bruker penger på å skaffe nye kunder, men mange kjøper bare én gang. Uten systematisk arbeid med gjenkjøp, kundelojalitet og verdi etter første kjøp blir veksten unødvendig avhengig av stadig nye annonsekampanjer.

### Dette kan vi levere

**Analyse av kundeverdi og gjenkjøp**

Undersøke hvor ofte kunder handler igjen, tiden mellom kjøp, gjennomsnittlig ordreverdi og estimert kundeverdi over tid.

**Kundesegmentering**

Identifisere førstegangskunder, lojale kunder, kunder med høy kjøpsverdi og kunder som ikke har handlet på lenge.

**Gjenbestilling og abonnement**

Gjøre det enklere å kjøpe produkter på nytt, særlig varer som brukes opp eller bestilles regelmessig. Vurdere abonnementsløsninger der det passer.

**Lojalitetsprogrammer og kundefordeler**

Utforme relevante fordeler, kundeklubber, bonusordninger eller andre tiltak som gir kundene en god grunn til å komme tilbake.

**Personlige produktanbefalinger**

Bruke tilgjengelige kjøpsdata til å presentere relevant tilbehør, påfyll eller komplementære produkter i nettbutikken og tillatte kommunikasjonskanaler.

**Opplevelsen etter kjøpet**

Forbedre ordrebekreftelser, kundeserviceinformasjon, returrutiner og videre oppfølging slik at kunden får tillit til å handle igjen.

**Måling og løpende forbedring**

Følge gjenkjøpsrate, kundeverdi, kjøpsfrekvens og hvilke tiltak som gir dokumenterbare forbedringer.

### Hvorfor egen side
Selvstendig kommersiell intensjon: øke omsetningen og kundeverdien fra eksisterende kunder etter første kjøp, ikke bare skaffe nye besøkende eller forbedre checkout. Egner seg best for butikker med produkter eller relasjoner som gir naturlige gjenkjøpsmuligheter.

### Skille mot andre tjenester
/epostmarkedsforing/ handler om e-post som kanal, utsendelser og automatiserte kommunikasjonsløp. /nettbutikkoptimalisering/gjenkjop/ handler om den brede gjenkjøpsstrategien: butikkfunksjonalitet, produkt- og kundedata, kundeklubb, gjenbestilling, kundeopplevelse og måling. /nettbutikkoptimalisering/kjopsflyt/ handler om fullføring av kjøpet og handlekurv.

### Leveranse og kommersiell modell
Kartlegg gjenkjøpsrate, kundegrupper og produktøkonomi → identifiser tiltak med forventet gevinst → implementer forenklet gjenbestilling/kundeklubb/etterkjøpsopplevelse → mål retensjon, kjøpsfrekvens og kundeverdi. Selg avgrenset analyse og oppsett, med mulig månedlig avtale for optimalisering. CTA: «Finn ut hva eksisterende kunder kan være verdt».

### Avgrensninger og kvalitetskrav
Ikke lov økt livstidsverdi eller gjenkjøpsrate uten dokumentasjon. Vurder økonomien i rabatter og lojalitetsordninger. Kundedata og segmentering forutsetter gyldig behandlingsgrunnlag; elektronisk markedsføring må følge samtykkeregler. Ikke alle butikker har produkter med naturlig høy kjøpsfrekvens. Pakkefordeling og priser bestemmes senere.

---

## Beslutning 36: Shopify-optimalisering — `/nettbutikkoptimalisering/shopify/`

**Status:** JA · **Plassering:** Under Nettbutikkoptimalisering

### Kundens problem
Bedriften har en Shopify-butikk som fungerer, men får mindre salg enn forventet. Den kan være treg, ha for mange apper, svake produkt- og kategorisider, vanskelig navigasjon eller lav konverteringsrate. Kunden trenger målrettede forbedringer i eksisterende butikk, ikke automatisk en total ombygging.

### Dette kan vi levere

**Shopify-analyse og forbedringsplan**

Gjennomgå butikkens struktur, brukeropplevelse, tekniske oppsett, trafikk og kjøpsflyt. Identifisere hvilke forbedringer som bør prioriteres først.

**Hastighet, tema og app-optimalisering**

Undersøke hvordan Shopify-temaet, bilder, JavaScript og installerte apper påvirker ytelsen. Rydde opp eller forbedre der det er teknisk mulig.

**Produkt- og kategorisider**

Forbedre produktpresentasjon, varianter, filtrering, navigasjon, kjøpsknapper og informasjon som hjelper kundene å velge riktig.

**Handlekurv og checkout**

Identifisere frafall, forbedre handlekurven og optimalisere tilgjengelige checkout-funksjoner innenfor Shopify-planens og plattformens begrensninger.

**Shopify SEO**

Optimalisere produkt- og kategoristruktur, metadata, internlenking, indeksering og relevant strukturert data.

**Integrasjoner og sporing**

Kontrollere Google Analytics, Google Shopping, Meta Pixel/CAPI, betalingsløsninger og relevante tredjepartsintegrasjoner.

**Løpende Shopify-optimalisering**

Analysere produktprestasjoner, kjøpsflyt og salg, implementere prioriterte forbedringer og følge resultatene over tid.

### Hvorfor egen side
Shopify er et konkret teknologivalg med plattformspesifikke begrensninger, feilbilder, integrasjoner og kjøpsintensjon. En spesialisert inngang gjør at virksomheter som allerede bruker Shopify kan kjøpe hjelp til eksisterende butikk uten først å bestille en ny nettbutikk.

### Skille mot andre tjenester
/nettbutikkoptimalisering/ dekker alle nettbutikkplattformer; /nettbutikkoptimalisering/shopify/ gjelder Shopify-tema, apper, butikkoppsett og plattformbegrensninger; /nettbutikkoptimalisering/produktsider/ gjelder produkt- og kategorisider på tvers av plattformer; /nettbutikkoptimalisering/kjopsflyt/ gjelder handlekurv/checkout; /google-shopping/merchant-center/ gjelder Google-produktdata. Ikke gjenbruk generiske avsnitt ukritisk.

### Leveranse og kommersiell modell
Start med avgrenset Shopify-gjennomgang med konkrete funn og prioritert tiltaksplan. Tilby implementering av avtalt omfang, for eksempel temajustering, app-opprydding, UX/SEO- og sporingsforbedringer, og deretter valgfritt månedlig arbeid. Primær CTA: «Få vurdert Shopify-butikken». Ikke lov effekt eller pris før kartlegging.

### Avgrensninger og kvalitetskrav
Shopify-plan, tema, apper, Shopify checkout- og plattform-API-er begrenser hva som kan tilpasses. Kontroller reell implementeringsmulighet og rettigheter før salg; endringer testes på passende måte, med backup/rollback der mulig. Ikke lov bestemt hastighet eller konverteringsøkning, og ikke fjern apper uten konsekvensanalyse. Ikke publiser dupliserte tekster fra generiske nettbutikksider. Oppsett av sporing må følge personvernkrav.

---

## Beslutning 37: WooCommerce-optimalisering — `/nettbutikkoptimalisering/woocommerce/`

**Status:** JA med kommentar · **Plassering:** Under Nettbutikkoptimalisering

### Kundens problem
Bedriften har en treg, kompleks eller tungdrevet WooCommerce-nettbutikk. Plugins og tema skaper konflikt, kjøpsflyten svikter, og vedlikeholdet koster for mye. Kunden trenger en kompetent vurdering av om butikken bør forbedres eller om en enklere plattform vil gi bedre økonomi.

### Dette kan vi levere

**WooCommerce-analyse og forbedringsplan**

Gjennomgå butikkens tekniske tilstand, brukeropplevelse, plugins, kjøpsflyt og konverteringsdata. Prioritere tiltak etter forventet verdi og arbeidsomfang.

**Hastighet og ytelsesoptimalisering**

Forbedre bilder, caching, databasebelastning, serverrespons og frontend-ressurser med hensyn til dynamiske handlekurv- og betalingsfunksjoner.

**Plugins, tema og teknisk opprydding**

Kartlegge unødvendige utvidelser, kompatibilitetsproblemer, feil og vedlikeholdsrisiko. Forbedre eksisterende oppsett uten å ødelegge viktige funksjoner.

**Produkt- og kategorisider**

Forbedre produktinformasjon, varianter, filtrering, navigasjon og kjøpsknapper, spesielt på mobil.

**Handlekurv og checkout**

Redusere friksjon i kassen, forbedre felt og betalingsalternativer, og gjennomgå integrasjoner med blant annet Vipps, Klarna og kortbetaling.

**WooCommerce SEO**

Forbedre produktstruktur, metadata, kanoniske adresser, internlenking, indeksering og relevant produktdata for søkemotorer.

**Sikkerhet, oppdateringer og løpende optimalisering**

Kontrollere vedlikeholdsstatus, oppdateringsrutiner, backups, kompatibilitet og relevante integrasjoner. Gjennomføre videre forbedringer etter avtale.

**Plattformvurdering: beholde WooCommerce eller flytte til Shopify?**

Sammenligne forventet vedlikehold, kostnader, funksjonelle behov, integrasjoner og migreringsrisiko. For små og mellomstore nettbutikker på kompliserte Magento-/Adobe Commerce-oppsett kan Shopify eller en enklere plattform være et bedre alternativ. Anbefal aldri flytting før en konkret behovs- og kostnadsvurdering.

### Hvorfor egen side
WooCommerce er WordPress-basert og har andre drifts-, plugin-, database-, hosting- og sikkerhetsutfordringer enn Shopify. Kjøpsintensjonen «hjelp til WooCommerce» er spesifikk; siden skal løse eksisterende WooCommerce-problemer, og samtidig kunne gi objektiv plattformrådgivning.

### Skille mot andre tjenester
/nettbutikkoptimalisering/ er plattformnøytral, /nettbutikkoptimalisering/shopify/ er Shopify-spesifikk; /nettbutikkoptimalisering/woocommerce/ handler om WordPress/WooCommerce og beslutningen optimalisere vs migrere. /nettbutikkoptimalisering/kjopsflyt/ dekker checkout på tvers av plattformer. Magento/Adobe Commerce nevnes som mulig tungt alternativ, men er ikke en egen godkjent Magento-side. E-post og Google Merchant Center har egne sider.

### Leveranse og kommersiell modell
Gjennomfør en WooCommerce-gjennomgang → avklar teknisk gjeld og faktisk lønnsomhet → anbefal enten målrettet opprydding og forbedring eller en separat vurdert overgang til Shopify/enklere nettbutikk → gjennomfør avtalte tiltak → tilby månedlig drift/CRO/SEO der relevant. CTA: «Få vurdert WooCommerce-butikken – bør den forbedres eller flyttes?»

### Strategisk vinkling – Magento/Adobe Commerce vs WooCommerce/Shopify

**Brukerens kommentar (preservert):** «Ja – egen underside under Nettbutikkoptimalisering - Men vinkle det slik at Magento er trash og at at det beste alternativet for de fleste er å gå over til Shopify eller noe enklere.»

**Redaksjonell formulering:** ««Trenger du virkelig Magento? For mange nettbutikker finnes enklere måter å drive butikk på.»»

Brukerens kommentar: «Magento er trash» og at Shopify eller en enklere løsning er best for de fleste. Redaksjonell tolkning: Vær tydelig skeptisk til Magento/Adobe Commerce for typiske norske SMB-nettbutikker når teknisk kompleksitet, spesialisert drift og total eierkostnad ikke gir dokumenterbar forretningsverdi. Ikke publiser det kategoriske utsagnet som objektivt faktum. Sammenlign faktiske behov, integrasjoner, plattformkostnader, eksisterende investering, utviklingsfleksibilitet, teknisk gjeld, SEO-migreringsrisiko og drift før man anbefaler WooCommerce-opprydding eller overgang til Shopify/enklere alternativ. Magento kan være fornuftig for enkelte komplekse bedrifter. WooCommerce kan være riktig ved WordPress-/innholdsavhengighet, kontrollbehov og eksisterende tilpasninger.

**Anbefalt tilnærming:** Presenter forbedring av eksisterende WooCommerce som reell tjeneste, men ikke press kunden til kostbare tiltak hvis den enklere og bedre løsningen er å bytte plattform. Særlig for Magento/Adobe Commerce skal drift, spesialkompetanse, utvikling, vedlikehold og total eierkostnad vurderes opp mot faktisk funksjonsbehov. Shopify kan redusere infrastrukturansvaret, men har fortsatt tema-, app- og plattformbegrensninger. WooCommerce kan være riktig ved behov for kontroll og WordPress-integrasjon. Avslutt med en ærlig audit av behold/optimaliser/migrer, ikke ren Shopify-salgstekst.

**Kilder for faktasjekk før publisering:** [Adobe Commerce infrastruktur](https://experienceleague.adobe.com/en/docs/commerce-on-cloud/user-guide/overview), [Shopify hosting/ytelse](https://help.shopify.com/en/manual/online-store/web-performance/improving-web-performance), [WooCommerce](https://woocommerce.com/). Kildene beviser ikke at én plattform alltid er best.

### Avgrensninger og kvalitetskrav
Ikke kall Magento objektivt «trash» eller påstå at Shopify alltid er best. For de fleste enkle SMB-case kan Magento/Adobe Commerce være uforholdsmessig komplekst, men plattformvalg må underbygges individuelt. Migrering krever analyse av data, SEO/redirects, produktvarianter, apper, spesialintegrasjoner, betalingsoppsett, ordre/kunder og overgangskostnader. Ikke selg ubegrenset WP-plugin-/PHP-feilsøking som rimelig retainer; spesialtilpasninger prises separat. Sjekk hosting/sikkerhet, backup/staging, relevant personvern og dokumenterbar gevinst.

---

## Beslutning 38: WordPress-optimalisering — `/wordpress-optimalisering/`

**Status:** JA · **Plassering:** Selvstendig tjenesteside, ikke i hovedmeny

### Kundens problem
Bedriften har allerede en WordPress-nettside, men den er treg, vanskelig å oppdatere eller skaper for få henvendelser. Gamle plugins, tungt tema, feilkonfigurert hosting og manglende vedlikehold kan føre til tekniske feil, sikkerhetsrisiko og unødvendige kostnader. Kunden ønsker å forbedre dagens nettsted uten automatisk å bestille en ny nettside.

### Dette kan vi levere

**WordPress-analyse**

Kartlegge teknisk tilstand, ytelse, plugins, tema, brukeropplevelse og hvilke problemer som bør løses først.

**Hastighetsoptimalisering**

Forbedre bilder, caching, JavaScript, CSS, serverrespons og Core Web Vitals der teknisk mulig.

**Plugin- og temaopprydding**

Identifisere unødvendige plugins, kompatibilitetsfeil, utdaterte temaer og tung kode. Rydde opp uten å fjerne viktige funksjoner.

**Hosting, PHP og database**

Gjennomgå PHP-versjon, database, ressursbruk og hostingoppsett. Vurdere om eksisterende hosting er tilstrekkelig eller bør endres.

**WordPress SEO**

Kontrollere teknisk indeksering, metadata, URL-struktur, interne lenker, SEO-plugins og relevante strukturerte data.

**Konverteringsoptimalisering**

Forbedre navigasjon, mobilopplevelse, kontaktknapper, skjemaer og landingssider slik at flere besøkende kan bli kunder.

**Sikkerhet og vedlikehold**

Kontrollere oppdateringer, backup, sikkerhetskonfigurasjon og gjenopprettingsrutiner. Tilby løpende vedlikehold innenfor avtalt omfang.

### Hvorfor egen side
Egen plattformspesifikk kjøpsintensjon: bedriften søker hjelp til en eksisterende WordPress-side og trenger bred vurdering av hele løsningen, ikke bare hastighet, teknisk SEO eller en ny side. Kombiner teknisk reparasjon med konkret forbedring av konvertering og stabilitet.

### Skille mot andre tjenester
/wordpress-optimalisering/ gjelder vanlige WordPress-nettsteder uten nettbutikk, mens /nettbutikkoptimalisering/woocommerce/ gjelder WooCommerce. /nettsidehastighet/ er plattformnøytral ytelse, /seo/teknisk-seo/ er søkeindeksering og tekniske SEO-hindringer, og /konvertering/ dekker CRO på tvers av plattformer. Ikke kopier de andre sidene; tilby en samlet, WordPress-spesifikk diagnose og tiltaksplan.

### Leveranse og kommersiell modell
Start med betalt eller tydelig avgrenset WordPress-gjennomgang, prioriterer de mest lønnsomme/stabiliserende tiltakene. Implementer separat avtalt opprydding, ytelses- og CRO-forbedring. Tilby avgrenset månedlig vedlikeholds- og optimaliseringsavtale der behovet tilsier det. Primær CTA: «Få vurdert WordPress-nettsiden». Ved ekstrem teknisk gjeld: vurder rebuild eller plattformbytte separat.

### Avgrensninger og kvalitetskrav
Ikke inkluder ubegrenset plugin-feilsøking, PHP-oppgraderinger, beredskap eller sikkerhetsutbedringer i rimelige faste månedsavtaler. Eldre plugin-/temakode og servermiljøer krever egen risiko- og kapasitetsvurdering; backup, staging, oppdateringsplan og rollback før risikable endringer. Ikke lov bestemt hastighet, ranking eller konverteringsvekst uten måling. WordPress/hosting, PHP- og databasekrav må vurderes mot faktiske versjoner før anbefaling. Ingen hovedmenyplass.

---

## Beslutning 39: Nettsidemigrering og plattformbytte — `/nettsidemigrering/`

**Status:** JA · **Plassering:** Selvstendig tjenesteside, endelig menyplassering avklares senere

### Kundens problem
Bedriften har en nettside eller nettbutikk som er utdatert, dyr eller vanskelig å utvikle videre. Utdatert CMS, hosting, gammel PHP, plugins eller kompliserte integrasjoner gjør endringer langsomme. Kunden vil over på en enklere løsning, men frykter å miste synlighet, innhold, kunder, bestillinger eller kritisk funksjonalitet underveis.

### Dette kan vi levere

**Analyse av eksisterende løsning**

Gjennomgå CMS, teknisk gjeld, hosting, kostnader, funksjoner, trafikk og integrasjoner. Vurdere om det er mest lønnsomt å forbedre dagens løsning eller bytte plattform.

**Valg av ny plattform**

Sammenligne relevante løsninger som Shopify, WordPress, enklere CMS-løsninger og moderne statiske eller headless nettsteder ut fra faktiske behov, vedlikehold og totalkostnad.

**Overføring av innhold og data**

Migrere relevante sider, bilder, dokumenter, produkter og andre data. For nettbutikker vurdere håndtering av kunder, ordre, produktvarianter og historikk.

**SEO-bevaring og URL-migrering**

Kartlegge eksisterende URL-er, metadata, interne lenker og viktige landingssider. Planlegge redirects, canonical, sitemap og kontroll av indeksering ved lansering.

**Integrasjoner og funksjonalitet**

Kartlegge skjemaer, booking, betaling, logistikk, CRM, analyseverktøy og andre integrasjoner. Avklare hva som kan videreføres og hva som eventuelt må bygges på nytt.

**Testing og trygg overgang**

Teste den nye løsningen før lansering, kontrollere viktige brukerreiser, sette opp nødvendige sikkerhetstiltak og ha en realistisk plan for tilbakeføring dersom noe går galt.

**Oppfølging etter lansering**

Overvåke tekniske feil, indeksering, trafikk, konverteringer og funksjoner etter plattformbyttet. Prioritere eventuelle problemer og forbedringer.

### Hvorfor egen side
Plattformbytte er et selvstendig, ofte større kjøpsprosjekt som går på tvers av CMS og nettbutikkplattformer. Kunden søker en trygg vurdering og gjennomføring av en samlet overgang, ikke bare SEO-migrering eller optimalisering av eksisterende plattform.

### Skille mot andre tjenester
/nettsidemigrering/ dekker beslutningen behold/bytt, hele prosjektet, innhold/data/integrasjoner og teknisk overgang. /seo/seo-migrering/ gjelder SEO-bevaring ved redesign og flytting. /wordpress-optimalisering/ forbedrer eksisterende WordPress; /nettbutikkoptimalisering/shopify/ og /nettbutikkoptimalisering/woocommerce/ gjelder spesifikke plattformer. Magento/Adobe Commerce kan være en relevant kildeplattform, men et eventuelt Shopify-bytte må begrunnes i kostnad/krav og risiko.

### Leveranse og kommersiell modell
Start med en avgrenset betalt migreringsanalyse av kostnader, datatyper, integrasjoner, funksjoner, SEO og risiko. Utarbeid forslag til hensiktsmessig målplattform og estimert migreringsløp. Deretter prosjekt med definert scope, migreringskart, test og cutover, samt separat avtalt oppfølging/videre optimalisering. CTA: «Få vurdert plattformbytte». Særlig aktuell for tungdrevne Magento-, legacy PHP-, gamle CMS- og spesialbygde løsninger.

### Avgrensninger og kvalitetskrav
Ikke lov null nedetid, null SEO-tap eller tapsfri/problemfri overføring. Migrering skal omfatte inventar og avhengigheter, URL- og redirect-matrise, backup/staging, sikker databehandling, avklarte integrasjoner, datavalidering, realistisk rollback der mulig og overvåking ved lansering. Migreringsprosjekter prises etter faktisk kompleksitet. Ingen kategoriske påstander om at alle Magento-kunder bør gå til Shopify; vurder funksjonskrav, totalkostnad, avtaler, personvern og SEO-risiko. Løpende drift/vedlikehold er separat tjeneste.

---

## Beslutning 40: Nettsidevedlikehold og teknisk drift — `/nettsidevedlikehold/`

**Status:** JA · **Plassering:** Selvstendig tjenesteside, menyplassering avklares senere

### Kundens problem
Bedriften har en nettside som fungerer, men ingen har tydelig ansvar for teknisk vedlikehold. Oppdateringer utsettes, backup er kanskje ikke testet og feil oppdages ofte først når kunder melder fra. De ønsker stabil drift uten å håndtere plugins, sikkerhetsvarsler, servere og driftsproblemer selv.

### Dette kan vi levere

**Oppdateringer og vedlikehold**

Holde relevante CMS-, plugin-, tema- og systemkomponenter oppdatert. Teste risikable oppdateringer før produksjonssetting, der løsningen tillater det.

**Sikkerhetskontroll**

Følge opp kjente sårbarheter, utdaterte komponenter, sikkerhetsvarsler og grunnleggende konfigurasjonsproblemer. Prioritere nødvendige tiltak etter risiko.

**Backup og gjenoppretting**

Kontrollere at relevante sikkerhetskopier tas og oppbevares forsvarlig. Gjennomføre avtalte gjenopprettingstester, slik at backup faktisk kan brukes ved behov.

**Overvåkning av oppetid**

Overvåke nettstedets tilgjengelighet og varsle ved relevante driftsfeil. Hendelser håndteres innenfor avtalte åpningstider og responstider.

**Hosting, domene og SSL**

Kontrollere relevante sertifikater, domeneutløp, DNS-konfigurasjon, hostingressurser og tjenesteavhengigheter der vi har tilgang og ansvar.

**Teknisk helsesjekk**

Kontrollere kritiske sider, kontaktskjemaer, bestillingsfunksjoner og integrasjoner etter relevante oppdateringer. Avdekke tekniske problemer før de utvikler seg.

**Månedlig status og anbefalinger**

Gi en kort, forståelig oversikt over utført arbeid, identifiserte problemer og tiltak som bør prioriteres videre.

### Hvorfor egen side
Teknisk drift og forebyggende vedlikehold er et konkret kjøpsbehov med naturlig gjentakende betaling og en annen verdiforventning enn vekst- og konverteringsarbeid. Nettsiden skal love tydelige roller, avtalte kontroller og realistiske responstider, ikke ubegrenset IT-support.

### Skille mot andre tjenester
/nettsidevedlikehold/ handler om stabilitet, kontroll, sikkerhet og forebyggende teknisk drift. /kontinuerlig-optimalisering/ handler om vekst, SEO/CRO, flere henvendelser og lønnsomhet. /wordpress-optimalisering/ handler om å forbedre en WordPress-løsning gjennom konkrete prosjekter. /nettsidemigrering/ gjelder plattformbytte. Kritiske funksjonstester av skjemaer/booking/betaling kan være tillegg til vedlikehold; eget tjenestetilbud vurderes separat i punkt #41.

### Leveranse og kommersiell modell
Gjennomfør en tydelig tilstandsvurdering og registrer plattform, tilgang, risiko og eksisterende leverandøransvar. Tilby plattformtilpasset abonnement med avtalt oppdaterings-/kontrollfrekvens, backupverifisering, monitorering, håndtering av kjente sårbarheter, enkel rapport og klart definerte supportgrenser. Tilby selvstendig engangsutbedring ved gamle systemer før fastprisavtale. Etter hvert kan kunden kjøpe CRO/SEO som separat vekstavtale. CTA: «Få vurdert teknisk vedlikehold».

### Avgrensninger og kvalitetskrav
Ikke lov 100 % oppetid, døgnvakt eller bestemt SLA før bemanning, plattform, ansvarsdeling og responstider er definert. Rimelige månedsavtaler inkluderer ikke ubegrenset feilretting, hackingopprydding, gjenoppretting, spesialkode, store PHP-/CMS-oppgraderinger eller migrering. Staging/backup før risikable oppdateringer; vurder restaureringstid, oppbevaring og tilgangsstyring. Shopify, statiske nettsteder og WordPress har svært ulike vedlikeholdsbehov; ingen generisk plugin-pakke til Shopify/Cloudflare. Domene, DNS og hosting håndteres bare der rollen og tilgangen er avtalt. Pakkestruktur og priser avklares etter sitemap.

---

## Beslutning 41: Overvåkning av nettsidens kritiske funksjoner — `/funksjonsovervakning/`

**Status:** JA · **Plassering:** Selvstendig spesialisert tjenesteside, tillegg til nettsidevedlikehold

### Kundens problem
Nettsiden kan svare med HTTP 200 og se tilgjengelig ut, samtidig som kontaktskjemaet ikke leverer, booking feiler, betalingsflyten er ødelagt eller en CRM-/e-postintegrasjon står stille. Feilen oppdages først etter tapte henvendelser eller salg; vanlig oppetidsovervåkning fanger den ikke.

### Dette kan vi levere

**Kartlegging av kritiske funksjoner**

Identifisere hvilke skjemaer, bestillingsløp, betalingsprosesser og integrasjoner som er avgjørende for at nettsiden skal generere inntekter.

**Automatisk skjematesting**

Teste at et avtalt testskjema kan sendes, at serveren aksepterer innsendingen, og at resultatet faktisk når riktig mottakssystem der dette kan verifiseres.

**Booking- og bestillingstester**

Kontrollere at viktige steg i bestillingsprosessen fungerer, uten å opprette uønskede ekte bookinger.

**Kontroll av checkout og betaling**

Teste kjøpsflyt og sentrale betalingsintegrasjoner med egnede testmiljøer, testmodus eller sikre ikke-transaksjonelle kontroller.

**Overvåkning av integrasjoner**

Kontrollere avtalte koblinger mot CRM, e-posttjenester, bookingmotorer og andre viktige eksterne systemer.

**Automatisk varsling**

Varsle når en test feiler, med informasjon om hvilken funksjon som er berørt og hva som bør undersøkes.

**Feilhistorikk og månedlig status**

Dokumentere testresultater, feil, varighet og oppfølging, slik at kunden får innsikt i driftssikkerheten til sine viktigste funksjoner.

### Hvorfor egen side
Eget, avgrensbart kjøpsbehov: verifiser at kritiske kundereiser faktisk virker. Kan selges som testoppsett pluss spesialisert månedlig kontroll, også uavhengig av vanlig CMS-vedlikehold. Forskjellig teknisk leveranse fra status-/oppetidsmonitorering og fra konverteringssporing.

### Skille mot andre tjenester
/nettsidevedlikehold/ dekker oppdateringer, sikkerhet, backup, oppetid og enkel teknisk helsesjekk etter oppdatering; /funksjonsovervakning/ tester avtalte ende-til-ende-funksjoner regelmessig og varsler ved feil. /sporing-og-maling/ måler hendelser, attribusjon og resultater; /kontinuerlig-optimalisering/ forbedrer prestasjonen. Unngå å selge samme kontroll to ganger; definer basisvedlikehold vs aktiv funksjonstest.

### Leveranse og kommersiell modell
Kartlegg de 1–3 viktigste inntektskritiske flytene først → gjør en teknisk gjennomførbarhets- og risikovurdering → opprett sikre testscenarier/helsekontroller med varsling → verifiser faktisk sluttresultat der mulig → selg månedlig testkjøring, varsling og kort rapport, med avtalte åpningstider og separate reparasjonstimer. CTA: «Sjekk om skjema og bestilling faktisk fungerer». Start smalt og standardiser med gjenbrukbare testoppsett når teknisk mulig.

### Avgrensninger og kvalitetskrav
Ikke markedsfør en manuell månedlig kontroll som kontinuerlig automatisk overvåkning. Ingen ekte kortbelastninger, irreversible bookinger eller ukontrollerte testordre. Benytt testmodus eller kontroller uten reelle transaksjoner; isoler og merk testdata i CRM og e-postsystemer. Bekreftet skjemainnsending er ikke automatisk bevis for at e-posten kom i riktig innboks – verifiser kjeden bare der tilgang og teknisk løsning tillater det. Beskytt personopplysninger, autorisasjon og nøkler. Definer testfrekvens, falske positiver, retry/alert, tilgjengelighet på testmiljø, ansvar, åpningstider, varsling og feilretting særskilt. Tjenesten er godkjent som kommersiell retning, ikke bevis for at en produksjonsklar plattform er bygget.

---

## Beslutning 42: Nettsideanalyse og forbedringsplan — `/nettsideanalyse/`

**Status:** JA · **Plassering:** Selvstendig betalt inngangsprodukt, hovedmenyplassering bestemmes senere

### Kundens problem
Bedriften har en nettside, kanskje også SEO- eller annonsearbeid, men vet ikke hvorfor den ikke får nok relevante kunder. Problemet kan være lav synlighet, feil trafikk, utydelig tilbud, svak mobilopplevelse, dårlig kontaktflyt eller mangelfull sporing. Kunden ønsker å vite hva som bør forbedres først – og hva det er bortkastet å bruke penger på.

### Dette kan vi levere

**Helhetlig nettsideanalyse**

Gjennomgå nettsidens struktur, innhold, tekniske tilstand og brukeropplevelse, og identifisere de største hindringene for flere henvendelser eller salg.

**Synlighet i Google og AI-søk**

Vurdere teknisk SEO, sidens innhold, søkeintensjon og grunnleggende forutsetninger for synlighet i relevante søke- og AI-tjenester.

**Konvertering og kundereise**

Undersøke hvor lett kunden forstår tilbudet, finner riktig tjeneste og fullfører kontakt, booking eller kjøp – spesielt på mobil.

**Hastighet og teknisk kvalitet**

Kontrollere relevante ytelsesproblemer, mobilopplevelse, tekniske feil og forhold som kan skape friksjon for brukerne.

**Trafikk, sporing og resultater**

Gjennomgå tilgjengelige data fra GA4, Search Console og relevante konverteringshendelser. Kontrollere om bedriften måler de handlingene som faktisk betyr noe.

**Prioritert forbedringsplan**

Levere en oversikt over hva som bør gjøres først, hva som kan vente, forventet kompleksitet og hvilke tiltak som sannsynligvis har størst kommersiell verdi.

**Rapport og gjennomgang**

Presentere konkrete funn, skjermbilder, anbefalinger og et forståelig forslag til videre arbeid. Rapporten skal være nyttig også dersom kunden ikke kjøper implementering fra oss.

**Kartlegging av kundereisen på tvers av kanaler**

Følge en konkret kundereise fra søk, annonser eller andre trafikkilder via landingssiden til henvendelse, booking eller kjøp. Kartlegge synlige brudd, usikkerhet og frafall, og forklare hvilke overganger som bør undersøkes videre.

### Hvorfor egen side
Et selvstendig, betalt inngangsprodukt for bedrifter som trenger en uavhengig, tverrfaglig diagnose før de bestiller SEO, CRO, annonsering eller tekniske tiltak. Siden selger en konkret rapport og prioritering, ikke et generisk gratis salgsmøte.

### Skille mot andre tjenester
/vurdering/ er kort innledende vurdering og kontakt, ikke en full rapport. /nettsideanalyse/ undersøker nettstedet helhetlig og leverer en prioritert handlingsplan. /seo/seo-analyse/ gjelder SEO i dybden, /google-ads/kontoanalyse/ Ads-konto, /sporing-og-maling/ måleinfrastruktur og /kontinuerlig-optimalisering/ gjennomføring over tid. Oppgi når spesialist-audit er nødvendig utover helhetsanalysen.

### Leveranse og kommersiell modell
Avklar nettstedets forretningsmål, viktigste kundereiser og tilgjengelige datakilder; definér tydelig avgrenset auditomfang. Utfør faktiske tester og gjennomgå dokumenterbare data i SEO, UX/CRO, ytelse og konverteringssporing. Lever en lesbar rapport med konkrete funn, skjermbilder/belegg, prioritert handlingsplan, anslått innsats/kompleksitet og anbefalt rekkefølge. Gjennomgå rapporten med kunden også dersom de ikke kjøper mer. Tilby deretter avgrenset implementering og eventuell månedlig SEO/CRO-avtale. Primær CTA: «Bestill en nettsideanalyse» eller «Få gjennomgått nettsiden». Pris og leveranseomfang låses etter sitemap.

### Avgrensninger og kvalitetskrav
Ikke lever en generisk AI-generert PDF uten faktisk nettsideundersøkelse og datagrunnlag. Skill bekreftede funn fra hypoteser og forbedringsforslag; ingen garantier for inntekts- eller trafikkvekst. Tredjepartsdata/GA4/GSC forutsetter tillatt tilgang. Rapporter må være nyttige selv uten videre kjøp. Begrens auditomfang og timer, inkludert antall maler/sider og analyseområder, før fastpris. Ikke gi gratis full tverrfaglig revisjon via /vurdering/ og ikke overlapp med betalte spesialist-audits uten tydelig nivåforskjell.

---

## Beslutning 43: Digital konkurrentanalyse — `/digital-konkurrentanalyse/`

**Status:** JA · **Plassering:** Selvstendig betalt analyseprodukt, menyplassering avklares senere

### Kundens problem
Bedriften opplever at konkurrentene er mer synlige eller har et tydeligere tilbud, men forstår ikke hvorfor kunder velger andre. En ren søkeordsrapport viser ikke forskjeller i budskap, priser, sosialt bevis, kundereise eller konverteringshindringer. Kunden trenger en pålitelig oversikt over konkurrentenes synlige fortrinn og konkrete måter å differensiere seg på.

### Dette kan vi levere

**Kartlegging av relevante konkurrenter**

Identifisere bedriftene som faktisk konkurrerer om de samme kundene, geografiske områdene og kjøpsbehovene. Skille mellom direkte konkurrenter og store aktører som kun dominerer søkeresultatene.

**Analyse av konkurrentenes nettsider**

Undersøke struktur, mobilopplevelse, landingssider, navigasjon, produktpresentasjon, kontaktskjemaer og bookingmuligheter. Sammenligne hvor enkelt det er å bli kunde.

**Tilbud, priser og posisjonering**

Sammenligne offentlig tilgjengelige priser, pakker, garantier, kundeløfter, tillitselementer og budskap. Finne områder hvor bedriften kan differensiere seg uten å måtte konkurrere utelukkende på pris.

**Synlighet i Google og AI-søk**

Kartlegge hvilke konkurrenter som dukker opp på relevante søk, lokale resultater og utvalgte AI-søkeoppgaver. Identifisere innholds- og synlighetsmuligheter basert på etterprøvbare undersøkelser.

**Offentlig synlig annonsering og kampanjer**

Undersøke tilgjengelige annonseeksempler, landingssider, budskap og kampanjetilbud. Identifisere mønstre og muligheter uten å påstå at vi kjenner konkurrentenes faktiske annonsebudsjetter eller resultater.

**Sammenligning av konverteringsstrategier**

Vurdere hvordan konkurrentene bruker kontaktknapper, skjemaer, anmeldelser, sosialt bevis, tilbud og andre virkemidler for å gjøre neste steg enkelt.

**Konkurranseoversikt og prioritert handlingsplan**

Levere en sammenligningsrapport med dokumenterte observasjoner, konkrete muligheter og anbefalinger om hva bedriften bør gjøre annerledes for å bli mer konkurransedyktig.

### Hvorfor egen side
Et selvstendig kjøpsbehov for markeds- og konkurranseposisjonering på tvers av kanaler og nettsider, ikke bare SEO-rangering. Bedriften kan kjøpe en avgrenset konkurrentanalyse uten å bestille full nettsideanalyse eller løpende markedsføring.

### Skille mot andre tjenester
/seo/konkurrentanalyse/ fokuserer på søkeord, søkeresultater, innholdsgap, autoritet og SEO-konkurranse; /nettsideanalyse/ diagnostiserer kundens egen nettside. /digital-konkurrentanalyse/ sammenligner eksterne konkurrenters kundeløfter, priser, nettsider, friksjon, synlighet og offentlig annonsering på tvers av kanaler. /konvertering/budskap-og-tilbud/ gjelder å forbedre kundens eget tilbud og budskap etter analysen.

### Leveranse og kommersiell modell
Avklar målgruppe, geografi, kjøpsbehov og velg typisk 3–5 reelle konkurrenter. Undersøk offentlig tilgjengelige nettsider, tjenester, priser, synlighet, annonser og kundereiser med etterprøvbar dokumentasjon og dato. Skill observasjoner fra hypoteser og egne vurderinger. Lever sammenligningsmatrise, skjermbilder/lenker, anbefalt differensiering og prioritert handlingsplan. Engangsprodukt; tilbud om videre arbeid med landingssider, budskap, SEO og CRO ved behov. Månedlig oppfølging tilbys bare med nytt faktisk arbeid/overvåkningsbehov. CTA: «Få analysert dine viktigste konkurrenter».

### Avgrensninger og kvalitetskrav
Kun offentlig lovlig tilgjengelig og dokumenterbart grunnlag; ingen påstander om faktiske annonsebudsjetter, konverteringsrate, fortjeneste, kundedata eller resultatene fra interne systemer uten bevis. Google/AI-resultater endres; noter måletidspunkt, søkeforutsetninger og geografisk kontekst. Skill direkte konkurrenter fra store søkeresultataktører. Ikke kopier konkurrenters tekster, design eller løfter. Ikke lov økt salg uten måling. Avgrens antall konkurrenter, landingssider og kilder; prising bestemmes etter sitemap.

---

## Beslutning 44: Tilbudsoptimalisering og tjenestepakker — NEI til egen URL

**Avvist URL:** `/konvertering/tilbudsoptimalisering/` — skal ikke publiseres som separat side.

### Kundens problem
Bedriften selger gode tjenester, men kunder er usikre på pakkeforskjeller, reelt utbytte, totalpris og riktig valg. Dette gir unødvendig manuelt salgsarbeid og frafall.

### Dette kan vi levere – integrert i to godkjente sider

**Under `/konvertering/budskap-og-tilbud/`:**

**Gjennomgang av eksisterende tilbud**

Kartlegge hvilke tjenester, produkter og pakker virksomheten tilbyr, hvordan kundeverdien forklares, og hvor kjøperen blir usikker på hva som passer.

**Tjenestepakker og valgstruktur**

Utforme forståelige nivåer og alternative kjøpsvalg, for eksempel en startpakke, anbefalt pakke og mer omfattende leveranse når det er relevant og lønnsomt. Ikke innføre kunstige nivåer.

**Pris- og verdibudskap**

Forklare hvorfor hver løsning har verdi, hva kunden får og hvilke vilkår som gjelder. Eventuelle råd om faktiske priser må bygge på margin, kostnader og betalingsvillighet – ikke pynting av prislapper.

**Under `/konvertering/prissider/`:**

**Pakkevelger og beslutningsstøtte**

Utforme klare sammenligninger av pakker, tydelige anbefalinger, reelle tillegg og handlingsknapper som gjør valget enkelt også på mobil.

**Måling av tilbudsaksept og pakkevalg**

Følge hvilke pakker og tilbud som fører til kvalifiserte henvendelser eller kjøp, og – når dataene finnes – vurdere tilbudsaksept og dekningsbidrag. Ikke hevde forbedring uten måling.

### Hvorfor ingen egen side
Den foreslåtte URL-en overlappet sterkt med eksisterende budskap-og-tilbud og prissider. Det kommersielle prosjektet kan fortsatt selges, men bør ikke kreve en tredje side om samme kjøpsbeslutning.

### Kommersiell modell og kvalitetskrav
Avgrenset tilbuds-/pakkeanalyse → tydelig kundeløfte og pakkestruktur → konkret prisside/velger → måling av kvalifiserte henvendelser og eventuell oppfølging. Reell prissetting må underbygges i margin, kostnader og betalingsvillighet. Ingen kunstige prisankre, villedende nivåer eller garantert konverteringsløft.

**Status:** NEI, dokumentert under eksisterende to briefs. Ingen ny URL, og ingen kode er endret.

---

## Beslutning 45: Kontaktskjemaoptimalisering og leadkvalifisering — NEI til egen URL

**Avvist URL:** `/konvertering/kontaktskjemaer/` – **skal ikke opprettes**.

### Kundens problem
Bedriften mister potensielle kunder på for lange, utydelige eller feilfungerende skjemaer, samtidig som for mange innsendinger ikke er relevante. Det er behov for både enklere kontakt og bedre leadkvalitet.

### Dette kan vi levere – integrert under eksisterende tjenestesider

**Under `/konvertering/henvendelser-og-booking/` (før innsending):**

**Skjemafelter og validering**

Fjerne unødvendige felt, forklare hva som må fylles ut og vise hjelpsomme feilmeldinger. Sørge for at skjemaet er enkelt å fullføre med tastatur og på mobil.

**Kvalifiserende spørsmål før innsending**

Stille få, relevante spørsmål om tjenestebehov, prosjekt, beliggenhet og andre nødvendige kriterier slik at mottakeren kan forstå forespørselen. Spørsmål må ikke øke frafall uten en klar gevinst.

**Dynamiske kontaktskjemaer**

Vise relevante oppfølgingsfelt basert på tidligere svar, for eksempel ulike felt for privat- og bedriftskunder, med tydelige valg og tilgjengelig interaksjon.

**Spamkontroll, personvern og leveringskvalitet**

Begrense spam og misbruk, unngå unødvendig innsamling av personopplysninger og teste faktisk levering til riktig mottaker, ikke bare HTTP-respons.

**Skjemafrafall og leadkvalitet**

Følge åpninger, frafall, vellykkede innsendinger og kvalitet på henvendelsene når dette kan måles. Vurdere både fullføringsgrad og faktisk relevans for virksomheten.

**Under `/konvertering/leadoppfolging/` (etter innsending):**

**Leadkvalifisering og prioriteringsregler**

Avklare hvilke opplysninger som gjør et lead relevant, og bruke enkle dokumenterte regler for å sortere forespørsler uten å avvise gode kunder automatisk.

**Routing og CRM-registrering**

Sende forespørsler til riktig ansvarlig person eller team og registrere nødvendige detaljer og status i relevant CRM, med sporbarhet og minst mulig persondata.

**Oppfølging og kvalitetsmåling**

Følge om leads besvares, blir til møter eller kunder, og om skjemaets kvalifiseringsspørsmål faktisk forbedrer salgsarbeidet. Justere rutiner etter målbare erfaringer.

### Hvorfor ingen egen side
Det foreslåtte tjenesteomfanget er allerede naturlige leveranser på to godkjente sider. En tredje URL ville skapt overlapp i søkeintensjon og svekket tydeligheten.

### Kommersiell modell og kvalitetskrav
En betalt analyse eller avgrenset forbedring av skjema og leadflyt kan fortsatt selges, etterfulgt av teknisk implementering, CRM-kobling og måling. Ikke forveksle flest mulig skjemainnsendinger med best salgsresultat. Test mobil, tilgjengelighet, innsending, spamhåndtering, trygg databehandling og faktisk leadrelevans. Ingen ny side eller nettsidekode er opprettet.

---

## Beslutning 46: AI-chatbot og digital kundedialog — `/ai-chatbot/`

**Status:** JA · **Plassering:** Selvstendig tjenesteside; plassering i hovedmeny avgjøres senere

### Kundens problem
Besøkende har spørsmål om tjenester, priser, levering eller booking, men finner ikke svar raskt nok og forlater nettsiden uten å ta kontakt. Bedriften ønsker å hjelpe dem videre selv når ingen sitter i chat, uten at en AI gir uautoriserte løfter eller behandler informasjon uforsvarlig.

### Dette kan vi levere

**AI-chatbot tilpasset virksomheten**

Sette opp en chatbot som kan svare på vanlige spørsmål om bedriftens produkter, tjenester og praktiske informasjon, med tydelig avgrensning av hva den skal hjelpe med.

**Kunnskapsbase fra godkjent innhold**

Strukturere relevante tjenestesider, spørsmål og svar, priser, vilkår og annen godkjent informasjon slik at chatboten har et kontrollert grunnlag for svarene.

**Henvendelser og kvalifiserende spørsmål**

La chatboten innhente nødvendig informasjon om kundens behov og gjøre det enkelt å sende en forespørsel. Opplysningene må være relevante, og kunden må forstå hva som skjer med dem.

**Overlevering til mennesker**

Sørge for at kunden kan gå videre til kontaktskjema, e-post, telefon eller et faktisk tilgjengelig menneske når chatboten ikke kan løse spørsmålet.

**Integrasjon med nettside og CRM**

Integrere chatten i eksisterende nettside og eventuelt koble godkjente henvendelser til riktig mottaker eller CRM, når teknisk tilgang og systemstøtte finnes.

**Testing, personvern og svarkontroll**

Teste faktiske kundespørsmål, kontrollere feilaktige eller udokumenterte svar, begrense innsamling av persondata og sørge for at chatboten tydelig fremstår som en AI-løsning.

**Måling og løpende forbedring**

Evaluere vanlige spørsmål, samtaler som ikke løses, overleveringer og relevante henvendelser. Oppdatere kunnskapsgrunnlag og forbedre dialogen gjennom en eventuell månedsavtale.

### Hvorfor egen side
Samtalebasert digital kundedialog er en egen, konkret løsningskategori med annet brukergrensesnitt, kunnskapsstyring, kvalitetssikring og driftsbehov enn skjemaer eller CRM-oppfølging. Tjenesten kan ha avgrenset oppsett og dokumentert gjentakende arbeid.

### Skille mot andre tjenester
/ai-chatbot/ gir spørsmål-og-svar-dialog med kildegrunnlag, overlevering og eventuell innhenting av leads. /konvertering/henvendelser-og-booking/ forbedrer skjemainnsending og booking. /konvertering/leadoppfolging/ håndterer mottatte leads i CRM og salgsløpet. /funksjonsovervakning/ tester tekniske forretningskritiske funksjoner, ikke chatbot-kunnskap/brukerdialog. Unngå samme leveranser og priser under flere tjenester.

### Leveranse og kommersiell modell
Start med avgrenset kartlegging av kundehenvendelser og spørsmål, avklar hva chatboten får svare på og hvordan den skal eskalere. Sett opp godkjent kunnskapsgrunnlag, installasjon, svaravgrensninger, leadflyt og menneskelig kontaktalternativ. Test med realistiske kundespørsmål og feil-/hallusinasjonsscenarier før produksjon. Selg særskilt avtalt oppsett, og eventuelt månedlig kvalitetssikring, vedlikehold av informasjon, analyse av ubesvarte spørsmål og integrasjoner. CTA: «Få vurdert AI-chatbot for nettsiden». Ikke finn på pakkepriser eller påstå aktiv produksjonsklarhet.

### Avgrensninger og kvalitetskrav
Sitemap-godkjenning er ikke teknisk implementering: bekreft faktisk leveranseevne, integrasjoner og supportmodell før aktivt salg. AI-chatboten må merkes tydelig som AI og kunne svare «vet ikke» eller sende videre til menneske. Ingen garantier om feilfrie svar, 24/7 menneskelig support, at chatboten løser alle saker eller at den øker salg. Unngå udokumenterte priser, helseråd/juridiske råd eller automatiske bindende avtaler uten kontroll. Personvern: dataminimering, informasjon, relevant behandlingsgrunnlag, tilgang og leverandøravtaler; ikke send sensitive opplysninger til uegnede systemer. Kontroller injeksjonsforsøk, brukertilgang, prompt-/kildeisolering, misbruk, modellkostnader og kvalitetsrutiner. Løpende AI-kostnader og feilretting må være tydelig avtalt.

---

## Beslutning 47: Kundeanmeldelser og omdømmeoptimalisering — `/kundeanmeldelser/`

**Status:** ANNET med eksplisitt JA · **Prioritet:** LAV – senere publiseringsbølge, ikke blant de første tjenestesidene. **Bygg-først-avhengighet:** Ingen aktiv tjenestepublisering før faktisk løsning, kvalitetssikring og driftsmodell er klar.

**Brukerens ordlyd:** «Ja – egen tjenesteside for anmeldelser og omdømme - men det har vi i backloggen så må bygges først. uansett ikke en av de første sidene som skal produseres.»

### Kundens problem
Bedriften har mange fornøyde kunder, men få synlige, aktuelle anmeldelser og ingen sikker rutine for å be alle relevante kunder om ærlige vurderinger. Nye kunder vet ikke om de kan stole på leverandøren, og bedriften svarer ikke systematisk på tilbakemeldinger eller bruker reelle erfaringer som beslutningsstøtte.

### Dette kan vi levere

**Analyse av eksisterende anmeldelser**

Kartlegge antall, aktualitet, svarstatus og relevante plattformer for ekte kundeanmeldelser. Sammenligne med faktiske konkurrenter og avdekke problemer med rutiner – uten å hevde at et review-gap automatisk betyr dårlig drift.

**Rutiner for innsamling av ekte anmeldelser**

Lage en enkel, nøytral prosess der reelle kunder kan bli bedt om ærlig tilbakemelding etter en faktisk leveranse. Ikke filtrer kunder etter antatt tilfredshet eller krev en positiv vurdering.

**Automatisert oppfølging når lovlig og gjennomførbart**

Etter godkjent bygg og test kan aktuelle kundeprosesser utløse avtalte e-post-/SMS-forespørsler med nødvendig lovlig grunnlag, rimelig frekvens, reservering og ingen press om positive vurderinger.

**Svar på positive og negative anmeldelser**

Etablere klare svarrutiner med menneskelig godkjenning når saken er sensitiv. Håndtere kritikk profesjonelt uten å offentliggjøre personopplysninger eller utlove urealistiske løsninger.

**Kundeuttalelser og tillitselementer på nettsiden**

Velge autentiske og etterprøvbare referanser/uttalelser med relevant tillatelse, og presentere dem korrekt på passende nettsider og landingssider.

**Overvåkning og varsling**

Oppdage nye vurderinger på avtalte plattformer og varsle ansvarlige om anmeldelser som trenger svar eller oppfølging, når systemtilgang og lovlige integrasjoner er bekreftet.

**Månedlig omdømmerapport og forbedringer**

Rapportere volum, tidsutvikling, svarstatus, tilbakevendende tilbakemeldingstemaer og gjennomført arbeid. Skille målbare observasjoner fra ubegrunnede løfter om rating, ranking eller salg.

### Hvorfor egen side
En operasjonell review-/omdømmeprosess på tvers av relevante plattformer kan være en tydelig separat kjøpsintensjon og gjentakende leveranse, men skal ikke bli en kopi av den godkjente Google Maps-tjenesten. Egen URL er eksplisitt godkjent av eier, med bygg-først-avhengighet og sen publisering.

### Skille mot andre tjenester
/kundeanmeldelser/ dekker helhetlig og plattformuavhengig prosess for autentiske kundeanmeldelser, lovlige forespørsler, drift, varsling, svarrutiner og rapportering. /lokal-seo/google-maps/ dekker profil, kategori, synlighet og Google Reviews spesifikt, /konvertering/budskap-og-tilbud/ presenterer verifiserbare kundeuttalelser som salgsbevis, /lokal-seo/flere-lokasjoner/ håndterer lokale profiler per avdeling. Ikke selg samme review-prosess dobbelt.

### Leveranse og kommersiell modell
Først må eksisterende backlog-prosess bygges/testes med ekte kunder og avtalt arbeidsflyt. Etter verifisering kan tjenesten selges som avgrenset oppsett (kanaler/tilganger, trigger for gjennomført oppdrag, nøytrale forespørsler, svarruting, sikker håndtering) og månedlig drift (kontroll, varsler, svarutkast, rapport). Bruk Review Gap-observasjoner som kvalifiseringssignal, ikke bevis for etterspørsel eller grunnlag for ulovlig outreach. CTA senere: «Få en trygg prosess for kundeanmeldelser». Ingen pris, publiseringsdato eller resultatgaranti fastsettes nå.

### Dokumenterte backlog-avhengigheter og prioritering
- [BusinessIntelligence: medon-growth/BACKLOG.md](https://github.com/AnelPasic/BusinessIntelligence/blob/main/medon-growth/BACKLOG.md) – review-vedlikehold som kommersielt eksperiment, lovlig kontaktflyt og kostnads-/kapasitetskrav, ikke bevis for bygget produkt.
- [BusinessIntelligence: radar/BACKLOG.md](https://github.com/AnelPasic/BusinessIntelligence/blob/main/radar/BACKLOG.md) – Review Gap-signaler, kvalifisering, lovlig outreach; markeds- og prospektdata, ikke selve anmeldelser-automatiseringen.
- **Før tjenesten kan lanseres:** konkret produkt/prosess bygget, testet med tillatt ekte kundeflyt, dokumentert menneskelig kontroll, integrasjoner, lovlige kundehenvendelser, personvern og prising basert på leveranseøkonomi.
- **Prioritet:** Siden er godkjent i sitemap, men plasseres uttrykkelig etter de tidligste tjenestesidene i publiseringsplanen. Ikke sett automatisk utgivelsesdato eller anta at teknologien finnes i produksjon.

### Avgrensninger og kvalitetskrav
Må bygges før produksjon/publisering; ikke en førsteprioritert tjenesteside. Ingen kjøpte/falske vurderinger, belønninger, selektiv positiv forespørsel, review gating, ønsket stjernerangering eller garantier om antall anmeldelser, rating eller Google-plassering. Sjekk Google Business Profile-regler og regler for kundekommunikasjon, samtykke/behandlingsgrunnlag, lovlige e-post/SMS-kanaler, dataminimering og reservasjonslister. Be om ærlig tilbakemelding fra kvalifiserte faktiske kunder. Personopplysninger/negative saker håndteres trygt; ikke publiser private kundeuttalelser uten nødvendig tillatelse. Dokumenter kapasitet, kostnader og overvåkningsrutiner før månedsavtale. Backlogfilene beskriver kandidater/prosesser – de verifiserer ikke en ferdig produksjonsklar løsning.

---

## Beslutning 48: Kundereiseoptimalisering på tvers av kanaler — NEI til egen URL

**Avvist URL:** `/kundereiseoptimalisering/`. **Ingen ny tjenesteside**; innholdet innarbeides i eksisterende godkjente tjenestebriefs.

### Kundens problem

Bedriften får trafikk fra Google, annonser og andre kanaler, men potensielle kunder blir borte mellom annonse, landingsside, kontakt, booking og salgsoppfølging. Ingen eier hele sammenhengen.

### Dette kan vi levere – integrert i eksisterende sider

**Under `/nettsideanalyse/`: Kartlegging av kundereisen på tvers av kanaler**

Følge en konkret kundereise fra søk, annonser eller andre trafikkilder via landingssiden til henvendelse, booking eller kjøp. Kartlegge synlige brudd, usikkerhet og frafall, og forklare hvilke overganger som bør undersøkes videre.

**Under `/kontinuerlig-optimalisering/`: Løpende forbedring av kundereisens overganger**

Prioritere og gjennomføre avtalte forbedringer mellom trafikkilde, nettside, skjema/booking og salgsoppfølging. Samordne riktige ansvarlige, føre endringslogg og vurdere utviklingen i faktiske kvalifiserte henvendelser eller salg.

**Under `/sporing-og-maling/`: Måling av steg i kundereisen**

Kontrollere om tilgjengelige og lovlig innsamlede data viser hvor brukere går videre eller faller fra mellom trafikkilde, landingsside, henvendelse og salg. Markere manglende data og attribusjonsusikkerhet i stedet for å konstruere en sammenheng.

**Under `/konvertering/leadoppfolging/`: Overgangen fra digital henvendelse til salgsarbeid**

Kontrollere at relevante henvendelser mottas, fordeles, følges opp og knyttes til riktig status i CRM eller salgsprosess. Måle faktisk respons og kvalifisering der data finnes, ikke bare antall innsendinger.

### Hvorfor ingen egen side

Samme kjøpsbehov kan allerede løses med en betalt tverrfaglig nettsideanalyse og en månedlig optimaliseringsavtale. Separat bred /kundereiseoptimalisering/ ville overlappe /nettsideanalyse/, /kontinuerlig-optimalisering/ og /sporing-og-maling/ og gjøre tjenestevalget mindre tydelig.

### Kommersiell modell og kvalitetskrav

Selg kartlegging som avgrenset nettsideanalyse, prioriterte tiltak som prosjekt/retainer med avtalt kapasitet. Sporing og CRM-oppfølging prises/avgrenses etter faktisk behov, ingen automatisk inkludering eller resultatløfter. Ingen egen URL, pris eller inkludert pakke. Bruk dokumenterbare målinger og sporbarhet, håndter samtykke og personvern, og skill mellom korrelasjon og dokumentert effekt.

**Status:** NEI og ingen ny URL. Versjonert innholdsgrunnlag – ikke implementert side, prissetting eller CMS-endring.

---

## Beslutning 49: Remarketing og retargeting — `/remarketing/`

**Status:** JA · **Plassering:** Selvstendig spesialisert annonsetjeneste under Annonseoptimalisering – ikke egen hovedkategori i toppmenyen

### Kundens problem

Bedriften investerer i Google Ads, Facebook, Instagram og annen trafikk, men mange potensielle kunder forlater nettstedet etter å ha vist interesse uten å kjøpe eller ta kontakt. Det mangler en målrettet og lovlig plan for videre annonsering til relevante tidligere interesserte personer.

### Dette kan vi levere

**Målgruppeanalyse og segmentering**

Kartlegge relevante målgrupper basert på tidligere interaksjoner, eksempelvis produktvisninger, interesse for bestemte tjenester eller avbrutte kjøp, når lovlig datagrunnlag og plattformfunksjoner tillater det.

**Remarketing i Google Ads**

Sette opp relevante målgruppesegmenter og kampanjer for tidligere besøkende, og samordne budskap, frekvens og landingssider.

**Retargeting på Facebook og Instagram**

Bruke kvalifiserende målgrupper og relevante annonseformater til å nå personer som tidligere har vist interesse, der plattformregler, samtykke og tilstrekkelige målgrupper gjør dette mulig.

**Dynamisk produktannonsering**

For relevante nettbutikker kan vi koble produktkataloger og kampanjer slik at annonser viser aktuelle produkter, eller relevante alternativer, til kvalifiserende målgrupper.

**Annonsebudskap og frekvenskontroll**

Lage annonser tilpasset tidligere interesse, begrense unødvendige gjentakelser og ekskludere målgrupper som ikke bør motta annonsene, der funksjonaliteten støtter det.

**Konverteringsmåling og løpende optimalisering**

Måle relevante kjøp, bookinger og henvendelser, vurdere kostnad og annonseeffekt, og skille plattformrapportert attribusjon fra dokumentert merverdi.

### Hvorfor egen side

Kunder kan ha en særskilt kjøpsintensjon for gjenannonsering mot kvalifiserte eksisterende målgrupper, uavhengig av om Medon overtar øvrige annonsekampanjer. Remarketing er en spesialisert tverrkanalstrategi med egne forutsetninger for publikum, databruk, annonser og måling.

### Skille mot andre tjenester

/remarketing/ dekker betalt gjenannonsering på tvers av kanaler og målgrupper med tidligere interesse. /google-ads/ og /meta-ads/ dekker løpende kanaldrevet kampanjearbeid og kan inkludere retargeting som taktikk; /annonseoptimalisering/ er overordnet kanalstrategi. /epostmarkedsforing/ dekker egne e-postløp, ikke betalte remarketing-annonser. Unngå dobbel fakturering av samme annonsearbeid.

### Leveranse og kommersiell modell

Vurder datagrunnlag og trafikkvolum → analyse og samtykkekontroll → definer målgrupper, unntak, kreative budskap og KPI-er → oppsett i relevante annonseplattformer → kvalitetssikring av destinasjon og sporing → månedlig optimalisering når økonomi, personvern og volum forsvarer det. CTA: «Få vurdert om remarketing lønner seg for oss». Prosjekt og mulig retainer; annonsebudsjett kommer i tillegg.

### Avgrensninger og kvalitetskrav

Ingen universalløsning for små nettsteder eller små målgrupper. Verifiser plattformenes aktuelle målgruppekrav og begrensninger, samtykke/personvern, dataminimering, lagring, relevante ekskluderinger og budskapsfrekvens. Ingen garanti for identifisering av alle tidligere besøkende, attribusjon, konverteringsøkning eller ROAS. Ingen automatisk pakkepris eller inkludering før senere pakkegjennomgang.

---

## Beslutning 50: Google Ads Performance Max-optimalisering — `/google-ads/performance-max/`

**Status:** JA · **Plassering:** Spesialistunderside under Google Ads – ikke egen hovedkategori i toppmenyen

### Kundens problem

Bedriften bruker Google Ads Performance Max, men ser ikke tydelig hvilke produkter, landingssider, annonseelementer eller konverteringer som skaper forretningsverdi. Automatisering uten riktig måling, innhold og kontroll kan bruke budsjettet på feil mål.

### Dette kan vi levere

**Performance Max-analyse**

Gjennomgå kampanjens mål, innstillinger, budsjett, konverteringssignaler og resultater for å avdekke konkrete forbedringsmuligheter.

**Asset groups og annonsemateriell**

Forbedre grupperingen av produkter og tjenester, annonsetekster, bilder og videoer. Undersøke rapporter for annonseressurser og kombinasjoner.

**Søketemaer og målgruppesignaler**

Evaluere hvilke signaler som hjelper Google å finne relevante kunder, og bruke tilgjengelige ekskluderinger for å redusere uønsket trafikk.

**Produktfeed og Merchant Center**

For nettbutikker kontrollere produktgrupper, datakvalitet og samspillet mellom produktfeed og kampanjer, uten å duplisere hele Merchant Center-tjenesten.

**Landingssider og URL-kontroll**

Undersøke om automatisk utvidelse av endelige URL-er sender trafikk til relevante kommersielle sider. Justere inkluderinger og ekskluderinger etter behov.

**Resultatmåling og lønnsomhet**

Analysere konverteringsverdi, kostnad per relevant henvendelse, ROAS der det er aktuelt, og rapportering på kampanje- og asset group-nivå.

### Hvorfor egen side

Performance Max er en egen, navngitt Google Ads-kampanjetype med særskilte kontroller, rapporter og vanlige feilsituasjoner. En spesialistside kan betjene bedrifter som allerede kjører PMax, uten krav om full overtakelse av øvrige kampanjer. Siden skal gi en konkret PMax-diagnose og handlingsplan, ikke en generisk introduksjon til Google Ads.

### Skille mot andre tjenester

/google-ads/ dekker kanaldrift og flere Google Ads-kampanjetyper, /google-shopping/ optimaliserer produktannonseøkonomi, /google-shopping/merchant-center/ retter produktkilder/feeder og avvisninger, /google-ads/kontoanalyse/ er en bred uavhengig kontoaudit. /google-ads/performance-max/ fokuserer kun på PMax-oppsett, asset groups, automatiserte plasseringer, søketemaer/signaler, URL-valg og rapportering. Tjenestene må ikke selges dobbelt.

### Leveranse og kommersiell modell

Uavhengig PMax-gjennomgang med konkrete, dokumenterte funn → avgrenset feilrettings-/optimaliseringsprosjekt → valgfri månedlig PMax-drift innen avtalt arbeidskapasitet. Vurder kvalifiserte leads og faktisk salgsverdi, ikke bare annonseplattformens rapporterte tall. CTA: «Få gjennomgått Performance Max-kampanjene». Annonsebudsjett og eventuelt nytt annonsemateriell kommer i tillegg.

### Avgrensninger og kvalitetskrav

Ikke lov full kontroll over Googles automatiserte annonsevisninger eller garantert ROAS. Før tiltak må aktuelle Google Ads-funksjoner, tilgangsnivå, søke-/målgruppesignaler, automatiske URL-er, produktfeed, budgivningsmål og konverteringskvalitet verifiseres. Noen rapporter og kontroller er begrenset av kontotype, kanal, data og kampanjetype. Ikke foreslå økt budsjett uten målbar begrunnelse.

---

## Beslutning 51: YouTube-annonsering og videokampanjer — `/youtube-annonsering/`

**Status:** ANNET med eksplisitt JA og leveranseforbehold · **Plassering:** Egen spesialisert tjenesteside under Annonseoptimalisering; ikke ny hovedkategori i toppmenyen

**Brukerens bindende presisering:** «Ja – egen spesialisert tjenesteside - men vi driver ikke med videoproduksjon med mindre det er helt enkle videoer. Men ja vi kjører YouTube annonser dersom kunden kommer med creatives.»

### Kundens problem

Bedriften har egne videoer eller ferdig annonsemateriell, men mangler kompetanse til å bruke det lønnsomt på YouTube. Videoene kan få visninger uten at virksomheten vet om de gir kvalifiserte besøk, henvendelser eller salg. Bedriften trenger annonseoppsett og måling – ikke et filmproduksjonsteam.

### Dette kan vi levere

**YouTube-annonseanalyse og egnethetsvurdering**

Gjennomgå kundens mål, målgruppe, annonsebudsjett og ferdige videoer. Vurdere om YouTube er en realistisk kanal for relevante besøk, henvendelser eller kjøp.

**Rådgivning om kundeleverte videoer**

Vurdere om kundens eksisterende video får fram tilbudet tidlig, har tydelig budskap og passer ønsket annonseformat. Gi konkrete råd; kunden produserer eller skaffer nødvendig nytt materiale.

**Oppsett og drift av YouTube-videokampanjer**

Sette opp og administrere aktuelle YouTube-videokampanjer via Google Ads med annonser, mål, budsjett, formater og kundens egne video-creatives.

**Målgrupper og annonseplasseringer**

Velge relevante målgrupper og tilgjengelige signaler, justere kampanjeinnstillinger og ekskluderinger innenfor Googles faktiske kontrollmuligheter.

**Landingssider og konverteringsflyt**

Sjekke at videobudskap, landingsside og neste handling henger sammen, og anbefale eller gjennomføre avtalte forbedringer av nettsiden separat.

**Resultatmåling og løpende optimalisering**

Analysere visninger og engasjement som hjelpesignaler, men prioritere relevante henvendelser og salg når disse kan måles. Justere budsjett, målgrupper og annonser etter faktisk datagrunnlag.

**Helt enkel videotilpasning – kun ved avtale**

Eventuell enkel trimming, tilpasning til annonseformat eller teksting av en eksisterende video kan utføres etter særskilt avtale når kapasitet og materiale tillater det. Ikke filming, profesjonell redigering eller full videoproduksjon.

### Hvorfor egen side

YouTube-annonsering har egen kjøpsintensjon for bedrifter som allerede har egne videoer og ønsker en spesialist til å kjøre, måle og forbedre videokampanjer. Denne konkrete tjenesten skiller seg fra videoproduksjon og generell annonseoptimalisering.

### Skille mot andre tjenester

/youtube-annonsering/ er YouTube-spesifikk videodistribusjon og konverteringsoptimalisering med kundeleverte creatives. /google-ads/ dekker flere Google Ads-kampanjetyper; /google-ads/performance-max/ fokuserer på automatisert PMax; /meta-ads/ gjelder Facebook og Instagram. Tjenesten omfatter ikke filming, profesjonell videoproduksjon, animasjonsproduksjon eller omfattende redigering. Unngå å love video-assets som ordinær leveranse.

### Leveranse og kommersiell modell

Kunden leverer bruksklare videoer med nødvendige rettigheter → avgrenset kampanjegjennomgang → oppsett, målgrupper, budsjett og landingsside → måling av faktisk nyttige handlinger → løpende Google Ads-optimalisering etter avtalt månedlig kapasitet. Enkel formattilpasning/teksting av eksisterende video kan kun være særskilt avtalt tillegg. Annonsebudsjett kommer i tillegg. CTA: «Har dere videoer? Få hjelp med YouTube-annonseringen».

### Avgrensninger og kvalitetskrav

BINDENDE: Kunden står normalt for ferdige video-creatives. Ingen salgstekst må fremstille filmopptak, profesjonell produksjon, animasjon, manus-/storyboardproduksjon eller avansert klipp som inkludert eller standardtjeneste. Kun helt enkle tilpasninger av eksisterende video kan vurderes etter avtale. Kontroller bruksrettigheter, plattformformat, tilgjengelig budsjett, konverteringsgrunnlag og personvern. Ingen garantert visningsplassering, konverteringer eller ROAS. Tjenestesiden publiseres først når leveranseopplegget kan utføres reelt.

---

## Beslutning 52: LinkedIn-annonsering for B2B — `/linkedin-annonsering/`

**Status:** JA · **Plassering:** Egen spesialisert B2B-annonseringstjeneste under Annonseoptimalisering; ikke egen hovedkategori i toppmenyen; prioriteres etter viktigste SEO/CRO/Google Ads-tjenester

### Kundens problem

Bedriften selger til andre bedrifter, men klarer ikke å nå relevante beslutningstakere med et tydelig tilbud. Eksisterende annonsering kan gi mange klikk og skjemaer, men få kvalifiserte salgsmuligheter, og kostnaden kan bli høy når målgruppe, budskap og salgsoppfølging ikke stemmer.

### Dette kan vi levere

**B2B-målgruppeanalyse**

Definere hvilke bransjer, selskapsstørrelser, yrkesroller og beslutningstakere bedriften faktisk ønsker å nå. Kartlegge om målgruppen er stor og relevant nok til lønnsom annonsering.

**LinkedIn Campaign Manager**

Sette opp kampanjer med relevante mål, budsjett, annonseformater og målgrupper. Tilpasse strategien til leadgenerering, trafikk eller merkevarebygging.

**Annonsebudskap og kreative varianter**

Lage annonser og tekstvarianter tilpasset målgruppens behov og kjøpssituasjon, med utgangspunkt i eksisterende bilder, grafikk og annet materiale fra kunden. Omfattende design- eller videoproduksjon inngår ikke automatisk.

**LinkedIn Lead Gen Forms**

Sette opp innebygde leadskjemaer som gjør det enklere for interesserte personer å sende en forespørsel. Tilpasse spørsmålene for å få relevante henvendelser uten unødvendig friksjon.

**Sporing og CRM-integrasjon**

Kontrollere LinkedIn Insight Tag, relevante konverteringer og muligheten for å overføre leads til CRM eller salgsoppfølging. Skille mellom innsendte skjemaer og kvalifiserte salgsmuligheter.

**Løpende optimalisering og leadkvalitet**

Analysere kampanjer, annonsebudskap, kostnad per kvalifiserte henvendelse og tilgjengelige salgsresultater. Prioritere faktisk forretningsverdi fremfor bare klikk og skjemainnsendinger.

### Hvorfor egen side

LinkedIn-annonsering har en konkret B2B-kjøpsintensjon: betalt målretting mot profesjonelle roller, bransjer og relevante selskaper. Tjenesten har spesifikke kampanje-, leadskjema- og måleoppsett og kan selges som et avgrenset oppsett med eventuell retainer.

### Skille mot andre tjenester

/linkedin-annonsering/ fokuserer på LinkedIn Campaign Manager, B2B-yrkesroller, bransjer/selskaper og leadkvalitet. /google-ads/ fanger primært eksisterende søkeetterspørsel, /meta-ads/ dekker Facebook/Instagram, /annonseoptimalisering/ er tverrkanal hub og /konvertering/leadoppfolging/ håndterer CRM/ruting etter at leadet kommer inn. Unngå duplisering og dobbel fakturering av CRM-/sporingstjenester.

### Leveranse og kommersiell modell

Betalt B2B-kanal- og målgruppevurdering → oppsett av Campaign Manager-kampanjer/annonser og eventuelle Lead Gen Forms → korrekt måling og kvalitetssjekk av videre oppfølging → månedlig optimalisering etter avtalt omfang. CTA: «Se om LinkedIn kan skaffe relevante B2B-henvendelser». Vurder tilstrekkelig kundeverdi, annonsebudsjett og leveransekapasitet før salg. Annonsebudsjett kommer i tillegg.

### Publiseringsprioritet

Etter kjernetjenestene SEO, CRO og Google Ads. Egen side er godkjent, men ikke automatisk klar for tidlig publisering. Vurder faktisk leveransekapasitet før aktivt salg.

### Avgrensninger og kvalitetskrav

LinkedIn er ikke universelt egnet for små bedrifter. Verifiser målgruppestørrelse, relevant jobb-/bransjemålretting, budsjett, kundeverdi, faktiske konverteringer og plattformfunksjoner. Ingen garantert leadpris eller salg; høy CPC kan gjøre kanalen ulønnsom. Følg personvern/aktuell samtykkehåndtering ved Insight Tag, lead data og CRM. Større grafisk/video- eller CRM-produksjon inngår ikke automatisk; leveransekompetanse og driftbarhet må bekreftes før aktiv markedsføring. Pakker/priser låses senere.

---

## Beslutning 53 – VENTER

Microsoft Advertising (Bing Ads), mulig `/microsoft-ads/`. Vurder om dette har separat kjøpsintensjon for annonsering i Microsofts søkeannonsenettverk, eller bør inngå som ekstra kanal under `/google-ads/` eller `/annonseoptimalisering/`. Differensier kampanjeoppsett, import/tilpasning fra andre plattformer, sporing og målgrupper. Ikke påstå lik dekning eller automatisk samme resultater som Google Ads. Ingen ny URL før JA/NEI/ANNET.

