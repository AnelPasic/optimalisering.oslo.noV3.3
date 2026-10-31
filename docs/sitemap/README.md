# Optimalisering Oslo – kanonisk sitemap og innholdsgrunnlag

**Oppdatert:** 31.10.2026 · **Beslutningspunkter:** 67 avklart (54 JA / 2 ANNET med JA / 11 NEI) · **Godkjente tjeneste-URL-er:** 62 · **Neste punkt:** 68 (ikke besluttet)

Dette dokumentet er inngangspunktet for nye tråder, Codex og GitHub-issues. **Kun optimalisering.oslo.no**, ikke medon.no. Ingen av de foreslåtte sidene er implementert av denne sitemap-arbeidsflyten.

## Gjeldende versjon (67)

- [Master – beslutningslogg, begrunnelser, sitemap og handoff](./master-beslutninger-67-2026-10-31.md)
- [JSON – maskinlesbar beslutningslogg + detaljerte leveranser](./beslutninger-67-2026-10-31.json)
- [Fullstendige tjenestebriefs – problem, «Dette kan vi levere», hvorfor egen side, differensiering, kommersiell modell, kvalitetskrav](./fullstendige-tjenestebriefs-67-2026-10-31.md)
- [Innholdsbrief-standard / utarbeidelseskrav](./innholdsbrief-standard.md)
- [GitHub issues-struktur og oppgavemal – snapshot fra punkt 32](./github-issues-plan-32-2026-10-30.md)

## Backlog

- [EPIC #62 – Sitemap og tjenesteplan](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/62)
- [Innholdsbrief #63 – Obligatorisk kvalitet og beskrivelser](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/63)
- [CONTENT-05 #55 – Eksisterende arbeid med hierarki og internlenking](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/55)

## Arbeidsregler

1. **Ett nytt beslutningspunkt om gangen**, med kundens problem, individuelle leveranser med forklaringer, egen URL, avgrensning og JA/NEI/ANNET.
2. Registrer brukerens faktiske svar; ikke forhåndsgodkjenn neste punkt.
3. Etter hvert punkt oppdateres **alle tre** artefakter: master, JSON, briefs. Lag ny versjon ved godkjennelse og oppdater denne indeksens gjeldende lenker.
4. Implementering av nettsider og pakkepriser krever egen beslutning. Omfattende A/B-testing ligger foreløpig kun i Partner-pakken. Ingen oppdiktede kundecaser, priser eller resultater.
5. En kort URL-liste er ikke et tilstrekkelig innholdsgrunnlag; leveranseoverskriftene skal ha beskrivende tekst hver.

## Nåværende beslutning

**Punkt 34:** Handlekurvoptimalisering og mersalg – **NEI** til separat `/nettbutikkoptimalisering/handlekurv/`. Omfanget er dokumentert som del av godkjent `/nettbutikkoptimalisering/kjopsflyt/`. Antallet tjeneste-URL-er er fortsatt **39**.

**Punkt 35 – JA:** Kundelojalitet og gjenkjøp godkjent på `/nettbutikkoptimalisering/gjenkjop/`. Tjenesten skal ikke kopiere e-postmarkedsføring, men dekke hele gjenkjøpsstrategien, inkludert butikkfunksjonalitet, kundeverdi og lojalitetstiltak.

**Punkt 36 – JA:** Shopify-optimalisering godkjent som egen plattformspesifikk underside `/nettbutikkoptimalisering/shopify/`. Briefen beskriver Shopify-analyse, tema, apper, ytelse, produkt-/kategorisider, checkout, SEO, sporing og løpende arbeid med konkrete forbehold.

**Punkt 37 – JA med kommentar:** WooCommerce-optimalisering på `/nettbutikkoptimalisering/woocommerce/`. Kundens ønskede Magento-kritiske posisjonering er lagret ordrett og redaksjonelt konkretisert: Magento/Adobe Commerce kan være unødvendig tungt for mange SMB-er; vurder Shopify eller en enklere løsning når den samlede økonomien og funksjonsbehovene tilsier det. Ikke publiser «Magento er trash» som universelt faktum.

**Punkt 38 – JA:** WordPress-optimalisering på `/wordpress-optimalisering/` er egen tjenesteside uten hovedmenyplass. WordPress-analyse, hastighet, hosting/PHP/database, plugin-/temaopprydding, teknisk SEO, CRO, sikkerhet og vedlikehold beskrives konkret; ikke WooCommerce.

**Punkt 39 – JA:** `/nettsidemigrering/` godkjent som selvstendig plattformuavhengig tjenesteside. Full brief dekker teknisk/kommersiell vurdering, plattformvalg, overføring av innhold og data, SEO-/URL-bevaring, integrasjoner, testing, cutover og etterkontroll. SEO-migrering er en spesialisert del av et større mulig prosjekt.

**Punkt 40 – JA:** `/nettsidevedlikehold/` godkjent som selvstendig tjenesteside med plattformtilpassede månedlige avtaler. Full brief dekker oppdateringer, sikkerhet, backup, oppetid, hosting/domene/SSL, kontroll av kritiske funksjoner etter oppdatering og enkel status. Ikke ubegrenset driftshjelp eller garantert responstid uten spesifisert SLA.

**Punkt 41 – JA:** `/funksjonsovervakning/` godkjent som egen spesialisert månedlig tjeneste, atskilt fra ordinært nettsidevedlikehold. Full brief omfatter kritiske brukerflyter, skjematesting, booking-/checkoutkontroller, integrasjoner, automatisk varsling og feilhistorikk. Krever reelle, sikre og testede kontroller før tjenesten selges som automatisk overvåkning; ingen løfter om ubegrenset feiloppdagelse eller beredskap.

**Punkt 42 – JA:** `/nettsideanalyse/` er godkjent som egen betalt, tverrfaglig nettsideanalyse. Full brief dekker faktiske funn innen SEO/AI-søk, UX/CRO, mobil, hastighet, sporing og en prioritert tiltaksrapport med kundegjennomgang. Skal ikke være generisk AI-PDF eller gratis full audit via `/vurdering/`; skiller fra spesialist-analyser.

**Punkt 43 – JA:** `/digital-konkurrentanalyse/` godkjent som selvstendig betalt tjeneste for tverrfaglig sammenligning av typisk 3–5 reelle konkurrenters synlige nettsider, tilbud, budskap, priser, søke- og AI-synlighet, offentlig annonsering og konverteringsgrep. Dokumenterte observasjoner og prioritert handlingsplan, ikke påstander om konkurrentenes interne data. Skiller fra `/seo/konkurrentanalyse/` og `/nettsideanalyse/`.

**Punkt 44 – NEI:** Egen `/konvertering/tilbudsoptimalisering/` er avvist. Analyse av tilbud, reelle tjenestepakker og verdiforslag er dokumentert under `/konvertering/budskap-og-tilbud/`, mens tydelige prissider, pakkesammenligning, pakkevelgere og resultatevaluering ligger under `/konvertering/prissider/`. Ingen ny tjeneste-URL.

**Punkt 45 – NEI:** Egen `/konvertering/kontaktskjemaer/` er avvist. Skjemadesign, kvalifiserende/dynamiske spørsmål, mobil, validering, spamvern, personvern og skjemamåling inngår i `/konvertering/henvendelser-og-booking/`; CRM-routing, prioritering, oppfølging og måling av kvalifiserte leads inngår i `/konvertering/leadoppfolging/`. Begge fullstendige briefs er utvidet, ingen ny URL.

**Punkt 46 – JA:** `/ai-chatbot/` er godkjent som egen tjenesteside for AI-basert kundedialog, godkjent kunnskapsbase, svar, kvalifiserende spørsmål, eskalering til mennesker, integrasjoner, personvern og kvalitetskontroll. Kan tilbys med avgrenset oppsett og mulig månedlig avtale; faktisk drifts- og leveranseevne må dokumenteres før aktivt salg.

**Punkt 47 – ANNET med eksplisitt JA:** `/kundeanmeldelser/` er godkjent som **egen tjenesteside**, men **lav produksjonsprioritet / senere publiseringsbølge**. Den eksisterende anmeldelsesprosessen/løsningen i [Medon Growth](https://github.com/AnelPasic/BusinessIntelligence/blob/main/medon-growth/BACKLOG.md) og [Radar Review Gap](https://github.com/AnelPasic/BusinessIntelligence/blob/main/radar/BACKLOG.md) er relevante avhengigheter. Før nettstedets side lages og publiseres, må en lovlig, reell og driftbar review-arbeidsflyt bygges og valideres. Backlognotater beviser ikke at et ferdig review-system er deployert.

**Punkt 48 – NEI:** Ingen separat `/kundereiseoptimalisering/`. Kundereisekartlegging under `/nettsideanalyse/`, løpende forbedring under `/kontinuerlig-optimalisering/`, tverrkanal måling under `/sporing-og-maling/` og oppfølging under `/konvertering/leadoppfolging/`. Fullstendige leveransebeskrivelser er ført videre til eksisterende briefs. Antall URL-er fortsatt 50.

**Punkt 49 – JA:** `/remarketing/` er godkjent som selvstendig spesialisert tjenesteside under Annonseoptimalisering, uten plass som ny hovedkategori i toppmenyen. Full brief inkluderer seks forklarte leveranser: målgrupper, Google Ads, Facebook/Instagram, dynamiske produktannonser, kreative budskap/frekvens og konverteringsmåling. Egnethet, samtykke og tilstrekkelige målgrupper må vurderes; annonsebudsjett kommer i tillegg. Ingen kode/publisering. **51 URL-er.**

**Punkt 50 – JA:** `/google-ads/performance-max/` godkjent som egen Google Ads-spesialistunderside, uten hovedmenyplass. Seks beskrevne leveranser: PMax-audit, asset groups/kreativer, søketemaer/signaler, Merchant Center-feed, landingssider/URL-er og konverteringsmåling/lønnsomhet. Skill fra ordinær Google Ads, Google Shopping og Merchant Center. Ingen garanti om kontroll over alle plasseringer eller ROAS; annonsebudsjett og evt. nytt kreativt materiell kommer i tillegg.

**Punkt 51 – ANNET med JA:** `/youtube-annonsering/` er godkjent som spesialisert tjeneste for annonsering med **kundeleverte ferdige videoer/creatives**. Kampanjestrategi, oppsett, målgrupper, vurdering av kundens video-assets, landingssider, måling og optimalisering er innenfor scope. **Vi tilbyr normalt ikke videoproduksjon.** Kun helt enkle tilpasninger av eksisterende video kan avtales separat; filming, animasjoner og profesjonell redigering er utenfor. Ingen egen video-/filmproduksjonspakke, nettsidekode eller publisering.

**Punkt 52 – JA:** `/linkedin-annonsering/` er godkjent som spesialisert B2B-annonseside under Annonseoptimalisering, uten egen hovedmenykategori. Seks individuelt beskrevne leveranser: B2B-målgrupper, LinkedIn Campaign Manager, annonser/kreativer, Lead Gen Forms, Insight Tag/CRM og løpende optimalisering med fokus på leadkvalitet. Senere publiseringsbølge enn kjerne-SEO/CRO/Google Ads. Annonsebudsjett og større kreativ-/CRM-produksjon i tillegg. Ingen lovnad om leadpris eller salg.

**Punkt 53 – NEI:** Ingen separat `/microsoft-ads/`. Microsoft Advertising/Bing Ads bevares som behovsprøvd kanaltillegg med seks individuelt forklarte leveranser under `/annonseoptimalisering/`, med krysshenvisning fra `/google-ads/`. Dette inkluderer kanal-/søkeanalyse, kontrollert import fra Google Ads, kampanjer/søkeord, UET-konverteringssporing, landingssider og løpende budsjettoptimalisering. Ingen automatisk inkludering, garanti eller ny URL.

**Punkt 54 – NEI:** Ingen separat `/tiktok-annonsering/`. Seks detaljerte leveranser beholdes som behovsprøvd TikTok-kanaltillegg under `/annonseoptimalisering/`: annonse-/målgruppeanalyse, gjennomgang av kundeleverte videoer, Ads Manager-oppsett/drift, Spark Ads/eksisterende innhold, mobil landingsside og konverteringsmåling/optimalisering. **Kunden leverer normalt ferdige videoer/creatives. Videoproduksjon inngår ikke.** Kun helt enkel trimming, formatendring eller teksting kan avtales separat. Ingen ny URL.

**Punkt 55 – NEI:** Ingen egen `/snapchat-annonsering/`. Alle seks Snapchat-leveranser er bevart med konkrete forklaringer under `/annonseoptimalisering/`: kanal-/målgruppeanalyse, Ads Manager, bilde-/videoannonser fra kundeleverte assets, produktannonser, mobil landing og Snap Pixel/måling. **Ingen ordinær videoproduksjon eller AR-produksjon som standard.** Bare enkle tilpasninger av eksisterende materiell kan avtales særskilt. Ingen ny URL.

**Punkt 56 – JA:** `/sporing-og-maling/samtykkestyring/` er godkjent som egen teknisk spesialistunderside under Sporing og måling. Seks individuelt forklarte leveranser: cookie-/taggaudit, samtykkeplattform (CMP)/cookie-banner, Google Consent Mode, GTM/øvrige tagger, funksjonstesting/dokumentasjon og periodisk overvåkning. **BINDENDE:** Teknisk bistand er ikke juridisk rådgivning. Ingen garanti om full GDPR-/ekom-etterlevelse; personverndokumenter og behandlingsgrunnlag vurderes av kundens ansvarlige/kvalifisert juridisk rådgiver. CMP-lisens og juridisk bistand kommer eventuelt i tillegg.

**Punkt 57 – JA:** `/sporing-og-maling/leadsporing/` godkjent med **LeadProof som konkret kundeverktøy**: kunden skal få tilgang til sitt eget rollebegrensede dashboard med relevante leads/kilder, etter verifisert onboarding og datainnsamling. Syv utførlige leveranser omfatter kildekartlegging, skjemaer, attribusjon/kvalitet, LeadProof-dashboard, kvalifisering, tydelig adskilt estimert verdi fra bekreftede salg og løpende datakontroll. **Verifiserte kodefunksjoner er ikke det samme som produksjonsverifisert kundetilgang:** Railway hadde SUCCESS for commit `44c5a7a` (30.10.2026), mens nyeste LeadProof-main `da5caec` var SKIPPED. CRM/salgsrapportering og ekte omsetning er valgfrie integrasjoner, ikke standardfunksjoner. Før publikasjon må LeadProof-innlogging, tillatelser, sporingskode, godkjent måleflyt og korrekt dashboard kontrolleres ende-til-ende.

**Punkt 58 – NEI:** Ingen separat `/sporing-og-maling/server-side-sporing/`. Seks fullstendige tekniske leveranser legges inn under `/sporing-og-maling/`: måleaudit, server-side GTM/infrastruktur, Google Ads forbedrede konverteringer/offline signaler, Meta CAPI/deduplisering, samtykke/sikkerhet/dataminimering og teknisk testing/vedlikehold. Individuelle avgrensninger er også lagt inn i de eksisterende briefene for `/sporing-og-maling/samtykkestyring/`, `/google-ads/konverteringssporing/`, `/meta-ads/konverteringssporing/` og `/sporing-og-maling/leadsporing/`. **Server-side sporing er ikke et samtykkefritak** og gir verken automatisk LeadProof-integrasjon eller garantert attribusjon. Ingen ny URL.

**Punkt 59 – JA:** `/nettsidesikkerhet/` er godkjent som egen sikkerhetsfokusert tjenesteside. Seks fullstendige leveranser: (1) sårbarhets-/sikkerhetsgjennomgang, (2) oppdateringer og kompatibilitet, (3) brukertilgang, (4) hosting-/WAF-beskyttelse, (5) sikkerhetskopiering og trygg gjenopprettingstest, (6) periodisk sikkerhetskontroll. Avgrens fra `/nettsidevedlikehold/`, `/funksjonsovervakning/` og `/nettsideanalyse/`. Ikke lov sertifisert penetrasjonstest, 24/7 SOC, sikkerhetsgaranti eller beredskap som ikke er etablert. Prosjektgjennomgang og mulig avtalt månedlig sikkerhetskontroll; priser senere.

**Punkt 60 – NEI:** Ingen separat `/epostlevering-fra-nettsider/`. Alle seks individuelt beskrevne leveranser er bevart under `/konvertering/henvendelser-og-booking/`: feilsøking, SPF/DKIM/DMARC, transaksjonell SMTP/API, avvisninger/retry/varsler, ende-til-ende test og periodisk kontroll. To egne driftsoppgaver er lagt til `/funksjonsovervakning/`. `/epostmarkedsforing/` avgrenses eksplisitt til nyhetsbrev og kampanjer. Ingen garanti om innbokslevering, ingen endringer av eksisterende DNS uten kartlegging, og ingen ny URL.

**Punkt 61 – NEI:** Ingen separat `/nettsidehosting/`. Seks utførlig beskrevne leveranser er beholdt under `/nettsidevedlikehold/`: hostinganalyse, oppsett/migrering, domene/DNS/TLS, backup/restore, ressurs-/kapasitetskontroll og månedlig hostingadministrasjon. Skillet mot `/funksjonsovervakning/` og `/nettsidesikkerhet/` er dokumentert med særskilte punkter i deres briefs. **Ingen oppdiktede SLA-er, priser, oppetidsgarantier, døgnbemannet support eller gjenopprettingstider.** Kunden beholder som hovedregel domeneeierskapet. Ingen ny URL.

**Punkt 62 – JA:** `/crm-integrasjoner/` godkjent som selvstendig teknisk spesialisttjeneste for automatisert leadflyt. Seks utførlige leveranser: (1) system-/leadsprosesskartlegging, (2) kontrollert CRM-API/webhook-integrasjon, (3) automatisk fordeling av henvendelser, (4) varsler og avgrenset oppfølging, (5) datakvalitet/sikkerhet/feilhåndtering, (6) integrasjonstesting og valgfritt løpende vedlikehold. Avgrenset eksplisitt mot `/konvertering/henvendelser-og-booking/`, `/konvertering/leadoppfolging/` og `/sporing-og-maling/leadsporing/` (LeadProof er ikke CRM). **Ingen uverifiserte CRM-integrasjoner, ferdig LeadProof-kobling, ubegrenset automatisering eller garantert null tapte leads.** Priser bestemmes senere.

**Punkt 63 – JA:** `/arbeidsflytautomatisering/` godkjent som selvstendig spesialisttjeneste. Seks individuelt forklarte leveranser: (1) prosesskartlegging, (2) støttet systemintegrasjon, (3) automatiserte rutineoppgaver, (4) menneskelig godkjenning, (5) feilhåndtering/databeskyttelse og (6) før/etter-måling og valgfritt vedlikehold. Avgrenset mot `/crm-integrasjoner/` (teknisk leadoverføring), `/konvertering/leadoppfolging/` (salgsprosessen) og `/ai-chatbot/` (kundedialog). **Ingen universelle integrasjoner, ubegrensede automatiseringer eller uverifisert AI-agentfunksjonalitet.** Én tydelig avgrenset arbeidsflyt om gangen; ingen priser bestemt.

**Punkt 64 – JA:** `/nettbutikkoptimalisering/integrasjoner/` godkjent som selvstendig spesialisert underside for lager-, ordre- og fraktdata. Seks forklarte leveranser: (1) kartlegging av netthandelssystemer, (2) SKU-/lager-/produktsynkronisering, (3) ordre- og statusintegrasjon, (4) frakt-/leveringsintegrasjon, (5) logg/feilsikring/datavalidering og (6) ende-til-ende testing med periodisk vedlikehold. Avgrenset mot `/crm-integrasjoner/` (henvendelser/leads), `/arbeidsflytautomatisering/` (brede interne prosesser), Shopify- og WooCommerce-sidene (plattformoptimalisering). **Ingen uverifiserte WMS/ERP/fraktintegrasjoner, feilfri sanntidssynk, garantert null tapte ordrer eller oppdiktede priser.** Senere publiseringsbølge enn kjerneinntekter.

**Punkt 65 – JA:** `/nettbutikkoptimalisering/b2b-nettbutikk/` godkjent som egen B2B-/forhandlerportal-side. Seks individuelt beskrevne leveranser: (1) kartlegging av B2B-salgsprosess, (2) bedriftskontoer/trygg innlogging, (3) kundespesifikke priser og volumrabatter, (4) tilbud og bestilling, (5) gjenbestilling/større ordre og (6) B2B-testing/optimalisering/vedlikehold. Tydelig skille mot `/nettbutikkoptimalisering/shopify/`, `/nettbutikkoptimalisering/woocommerce/`, `/nettbutikkoptimalisering/integrasjoner/`, `/nettbutikkoptimalisering/kjopsflyt/`, `/nettbutikkoptimalisering/gjenkjop/` og `/crm-integrasjoner/`. **Ingen uverifiserte B2B-funksjoner, ubegrenset spesialutvikling, mva-/betalingsgarantier eller oppdiktede priser.** Middels/senere publiseringsprioritet.

**Punkt 66 – JA:** `/nettbutikkoptimalisering/abonnement/` er godkjent som egen spesialisert underside under Nettbutikkoptimalisering, med middels publiseringsprioritet. Seks individuelt forklarte leveranser: (1) abonnementsanalyse, (2) abonnement/gjentakende betaling, (3) faste leveranser og fleksible intervaller, (4) selvbetjening for abonnenter, (5) ordre-, lager- og fraktintegrasjoner, (6) lønnsomhet og abonnementsoptimalisering. Abonnementsforhold skal skilles fra vanlig gjenkjøp, B2B-prisavtaler, generell integrasjon og kjøpsflyt. Plattform, betalingsleverandør, apper, lisens og kundens rettigheter må kontrolleres; ingen garantier om funksjoner, lovmessig etterlevelse eller fast inntekt. Betalt oppsett med mulig avgrenset månedlig vedlikehold. Ingen kode eller publisering. 

**Punkt 67 – NEI:** Ingen egen `/nettbutikkoptimalisering/produktanbefalinger/`. Seks leveranser er fordelt på eksisterende `/nettbutikkoptimalisering/produktsider/` (tilbehør/anbefalinger, kombinasjonstilbud, støtte for regelstyrte/personlige forslag), `/nettbutikkoptimalisering/kjopsflyt/` (kryssalg i handlekurv) og `/nettbutikkoptimalisering/gjenkjop/` (senere anbefalinger og måling av mersalg). Bevar de individuelle beskrivelsene i JSON og tjenestebriefs. Skillet mot tidligere #34 NEI til handlekurv-/mersalgsside er dokumentert. **62 godkjente URL-er uendret.** Ingen nettsider publisert.

**Punkt 68 – venter:** Kundesegmentering og personalisering av nettsider, mulig `/konvertering/personalisering/`. Vurder egen kjøpsintensjon mot CRO, budskap/tilbud, kontinuerlig optimalisering, e-post og gjenkjøp. JA/NEI/ANNET.

**Historikk:** Versjonerte snapshots 32–66 beholdes uendret. #34, #44, #45, #48, #53, #54, #55, #58, #60 og #61 avviste egne undersider; #46 godkjente AI-chatbot; #47 godkjente kundeanmeldelser som ANNET med JA, med bygg-først-avhengighet og lav prioritet.
