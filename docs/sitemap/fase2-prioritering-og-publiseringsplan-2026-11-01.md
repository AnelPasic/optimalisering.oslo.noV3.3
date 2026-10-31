# Fase 2 – søkedatastøttet sitemap-revisjon og kommersiell prioritering

**Dato:** 01.11.2026 · **Status:** Analyse og **ANBEFALING**, ikke godkjent publisering · **Underlag:** 74 ferdigstilte OWNER-beslutninger, 63 godkjente tjeneste-URL-er.

## 1. Beslutning og hovedkonklusjon

**Ikke publiser alle 63 nye undersidene samtidig.** Tilgjengelige søkedata og den eksisterende nettsidestrukturen støtter en trinnvis plan. Anbefalt foreløpig fordeling: **P0 12, P1 29, P2 22**. Dette er en **kvalitativ vurdering**, ikke et resultat av en kunstig eksakt totalscore.

Det er viktigere å selge et **konkret, lett forståelig utfall** enn å produsere en undersidesamling som konkurrerer med seg selv. De mest lovende første sporene er Google Ads, SEO-analyse/teknisk SEO, Google Maps/lokal SEO, CRO-diagnose og avgrensede, dokumenterbare måle-/månedsavtaler.

Sitemap-registreringen av de 63 URL-ene og alle 74 vedtak står **uendret**. P2 betyr ikke at et tidligere JA er opphevet; det betyr at den godkjente siden **holdes i kø**. Ingen URL er slettet, omdirigert eller publisert i denne analysen.

## 2. Kildene og tallkvaliteten

- Primærkilde: [Google Sheet: Medon – Søkeordsanalyse (løpende)](https://docs.google.com/spreadsheets/d/1ZvFikP6jKJ8r41H66oFQ31BPdhNzp6-N11VIJ-cetWM/edit); fanen **Søkeord**, området `A1:R854`; dokumentasjonsfanen **Om datasettet**.
- Tjenestegrunnlag: [Kanonisk sitemap 74](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/blob/main/docs/sitemap/README.md) og [fullstendige briefs 74](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/blob/main/docs/sitemap/fullstendige-tjenestebriefs-74-2026-11-01.md).
- Inspisert datasett: **853 søkeordrader**, 851 ulike eksakte søkeord, 841 med volum, 12 uten volum, 645 med organisk KD og 208 uten organisk KD.
- **Eksakte duplikatord med motstridende volum:** `markedsstrategi` (390 og 320) samt `digital markedsførings byrå` (50 og 10). **Ikke summer eller velg vilkårlig**.
- `# of Searches` gjengis som kildeverdi (kilden framstår som månedlig søkevolum). Ikke prognose for trafikk, bestillinger eller inntekter. **Importdato 24.10.2026 er ikke verifisert tidspunkt for målingen.**
- `Google.no Keyword Difficulty` er kildens organiske konkurranseindikator. Feltet `Competition` er annonsekonkurranse og skal **ikke** brukes som en alternativ organisk KD. CPC er USD. `Google.no AIO: Ikoner vist` bekrefter ikke at det foreligger et AI Overview-treff.
- Ordene `seo byrå`, `seo-byrå` og `seo byrå oslo` kan ha overlappende SERP og brukeres hensikt. **Volumer skal ikke summeres for å anslå et samlet marked uten SERP-klynging.**
- Høye volumer kan være ikke-kommersielle: `google ads` 12 100, `google business profile` 1 300, `nyhetsbrev` 720, `web applikasjon` 6 600 og `ads` 12 100 er ikke automatisk kundeemner for Optimalisering Oslo. `web applikasjon` kan dreie seg om noe annet enn en utviklingstjeneste. Opprett ikke nye sider for disse.
- Matrisen har **46 av 63 URL-er med minst ett manuelt kontrollert eksakt søkeordanker med volum**, mens 17 mangler slikt anker i dette arket. **Det er ikke dokumentasjon på null etterspørsel**. Dette er en kuratert første kobling, ikke full semantisk klasifisering av alle 853 termer.

**Kildetro ankerbevis** og sjekk av alle 63 URL-er: [JSON-matrise med søkeord, eksakte Google Sheet-rader, volum, KD, KEI og overlappsflagg](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/blob/main/docs/sitemap/fase2-sokeord-url-matrise-2026-11-01.json).

## 3. Prioritering – P0 første publiseringsbølge

### P0-A: seks første innholds-/salgsløp (foreslått rekkefølge)

Før nye spesialistsider bygges: revider **allerede eksisterende** `/seo/`, `/konvertering/`, `/lokal-seo/`, `/synlighet/` og `/nettbutikkoptimalisering/`. Eier må godkjenne søkeordansvar og CTA, men dette krever ikke nye SEO-URL-er.

| # | Godkjent side | Hvorfor tidlig | Kommersiell utgang |
|---:|---|---|---|
| 1 | `/google-ads/` | Kanal med klar kjøpsintensjon. Skille byrå-/hjelpesøk fra Google Ads-navigasjon. | Google Ads-løpende avtale, annonsebudsjett separat |
| 2 | `/seo/seo-analyse/` | Konkret lavterskel diagnose; fanger høy intensjon, men må skilles fra /nettsideanalyse/. | Diagnose → SEO-oppdrag/retainer |
| 3 | `/lokal-seo/google-maps/` | Sterk lokal etterspørsel; generiske GBP-termer kan være navigasjonsorienterte. | Lokal SEO månedlig oppfølging |
| 4 | `/nettsideanalyse/` | Samlet første vurdering og tydelig lead-CTA; må ikke kapre «webanalyse». | Analyse → implementering/optimalisering |
| 5 | `/sporing-og-maling/leadsporing/` | Kommersiell differensiering via LeadProof, men **ingen eksakt målt volumanker**. | Dokumenterte leads → måle-/optimaliseringsavtale |
| 6 | `/kontinuerlig-optimalisering/` | Viktig retainer-bro etter diagnose og implementering; ikke primært høyvolumsøkeside. | Abonnement med avgrensede leveranser |

**Viktige særtilfeller:** `/sporing-og-maling/leadsporing/` får P0 på grunn av mulig reell salgsverdi og retainer, **ikke** på grunn av dokumentert søkevolum. `/nettsideanalyse/` må posisjoneres som helhetlig diagnose og ikke duplisere `/seo/seo-analyse/`. For `/lokal-seo/google-maps/` må Google Bedriftsprofil-innhold være praktisk og relevant, ikke en klone av Googles egen hjelpeside.

### P0-B: seks neste, etter at P0-A og SERP-grensene er avklart

`/seo/teknisk-seo/`, `/meta-ads/`, `/landingssider/`, `/sporing-og-maling/`, `/nettsidevedlikehold/` og `/google-ads/kontoanalyse/`.

**Hold igjen kontoanalyse-siden** hvis den ikke får et distinkt «Google Ads-revisjon»-søkemønster. Den skal ikke bruke «google ads byrå» som primærterm, siden `/google-ads/` eier denne intensjonen.

### Alle 12 P0 – faktisk søkeordbevis fra arket

| Godkjent URL | Beste kontrollerte eksakte anker i matrisen | Vurdering |
|---|---|---|
| `/landingssider/` | `landingsside` (40/mnd; KD 18,4) | Anker finnes · Overlapp! |
| `/sporing-og-maling/` | `webanalyse` (70/mnd; KD 24) | Anker finnes · Overlapp! |
| `/kontinuerlig-optimalisering/` | `optimalisering av nettsider` (170/mnd; KD 21,5) | Anker finnes |
| `/google-ads/` | `google ads byrå` (90/mnd; KD 17,8) | Anker finnes · Overlapp! |
| `/meta-ads/` | `facebook annonsering` (390/mnd; KD 35,2) | Anker finnes · Overlapp! |
| `/seo/teknisk-seo/` | `teknisk seo` (320/mnd; KD 15,5) | Anker finnes |
| `/seo/seo-analyse/` | `seo analyse` (210/mnd; KD 33,5) | Anker finnes |
| `/lokal-seo/google-maps/` | `google bedriftsprofil` (590/mnd; KD 23) | Anker finnes · Overlapp! |
| `/google-ads/kontoanalyse/` | `google ads byrå` (90/mnd; KD 17,8) | Anker finnes · Overlapp! |
| `/nettsidevedlikehold/` | `drift av nettside` (50/mnd; KD 12,9) | Anker finnes · Overlapp! |
| `/nettsideanalyse/` | `nettside sjekk` (90/mnd; KD ukjent) | Anker finnes · Overlapp! |
| `/sporing-og-maling/leadsporing/` | Ingen eksakt term med tall | Datagap |

Dette er per-side-ankere, **ikke** estimerte volum per URL. Der flere sider har samme anker, er det et kvalitetsvarsel og et argument for å **endre søkeordansvaret**, ikke for å slå sammen volumene.

## 4. Hele listen – P1 og P2

### P1: 29 sider – utvid ved dokumentert behov, kapasitet og unik intent

| Godkjent URL | Kildesignal | Status |
|---|---|---|
| `/konvertering/henvendelser-og-booking/` | Ingen eksakt term med tall | Datagap |
| `/nettbutikkoptimalisering/kjopsflyt/` | `konverteringsoptimalisering nettbutikk` (10/mnd; KD 19,5) | Anker finnes · Overlapp! |
| `/nettbutikkoptimalisering/produktsider/` | `seo nettbutikk` (90/mnd; KD 22) | Anker finnes |
| `/konvertering/budskap-og-tilbud/` | `konverteringsoptimalisering` (210/mnd; KD 17) | Anker finnes |
| `/nettsidehastighet/` | `nettside hastighet` (10/mnd; KD 37,7) | Anker finnes |
| `/google-shopping/` | Ingen eksakt term med tall | Datagap |
| `/seo/innholdsoptimalisering/` | `seo innhold` (30/mnd; KD 25,4) | Anker finnes |
| `/ai-synlighet/chatgpt/` | `chatgpt seo` (10/mnd; KD 46,6) | Anker finnes |
| `/ai-synlighet/google-ai/` | `ai seo` (110/mnd; KD 44) | Anker finnes |
| `/seo/sokeordsanalyse/` | `søkeordsanalyse` (140/mnd; KD 14,3) | Anker finnes |
| `/seo/konkurrentanalyse/` | Ingen eksakt term med tall | Datagap |
| `/seo/nettsidestruktur/` | `seo strategi` (260/mnd; KD 26,5) | Anker finnes |
| `/seo/lenkebygging/` | Ingen eksakt term med tall | Datagap |
| `/seo/seo-migrering/` | `nettbutikk migrering` (10/mnd; KD ukjent) | Anker finnes · Overlapp! |
| `/epostmarkedsforing/` | `nyhetsbrev` (720/mnd; KD 33,8) | Anker finnes |
| `/konvertering/prissider/` | `nettside pris` (260/mnd; KD 19,1) | Anker finnes |
| `/konvertering/brukertesting/` | `brukervennlighet` (90/mnd; KD ukjent) | Anker finnes |
| `/universell-utforming/` | `universell utforming nettside` (140/mnd; KD 31,7) | Anker finnes |
| `/meta-ads/kontoanalyse/` | `facebook annonsering pris` (40/mnd; KD 28,9) | Anker finnes · Overlapp! |
| `/google-ads/konverteringssporing/` | Ingen eksakt term med tall | Datagap |
| `/meta-ads/konverteringssporing/` | Ingen eksakt term med tall | Datagap |
| `/nettbutikkoptimalisering/gjenkjop/` | `konverteringsoptimalisering nettbutikk` (10/mnd; KD 19,5) | Anker finnes · Overlapp! |
| `/nettbutikkoptimalisering/shopify/` | `shopify nettbutikk` (90/mnd; KD 27,5) | Anker finnes |
| `/nettbutikkoptimalisering/woocommerce/` | `woocommerce webshop` (30/mnd; KD 48,9) | Anker finnes |
| `/wordpress-optimalisering/` | `wordpress seo` (70/mnd; KD ukjent) | Anker finnes · Overlapp! |
| `/sporing-og-maling/samtykkestyring/` | `gdpr nettside` (30/mnd; KD 17,5) | Anker finnes · Overlapp! |
| `/nettsidesikkerhet/` | `trygg nettside` (140/mnd; KD 35) | Anker finnes · Overlapp! |
| `/crm-integrasjoner/` | `integrasjoner nettside` (10/mnd; KD ukjent) | Anker finnes · Overlapp! |
| `/nettbutikkoptimalisering/b2b-nettbutikk/` | `b2b markedsføring` (70/mnd; KD 24,7) | Anker finnes |

P1 er en mulighetsliste, **ikke en ordre om å publisere 29 sider**. Prioriter P1 som støtter en reell aktiv kundeforespørsel eller sterke, testede P0-tjenester. Blant de første aktuelle er Shopify/WooCommerce, e-postmarkedsføring, konverteringssporing og samtykkestyring når kundekravene tilsier det. For SEO-kunder bør søkeordsanalyse, innhold og internlenking primært selges som deler av et resultatløp, ikke som seks separate løfter.

### P2: 22 sider – behold godkjenningen, men avvent publisering

| Godkjent URL | Kildesignal | Status |
|---|---|---|
| `/annonseoptimalisering/` | `annonsering` (590/mnd; KD 24,6) | Anker finnes |
| `/konvertering/leadoppfolging/` | Ingen eksakt term med tall | Datagap |
| `/konvertering/ab-testing/` | `a/b-testing` (210/mnd; KD 50,7) | Anker finnes |
| `/nettbutikkoptimalisering/sok-og-filtrering/` | `nettbutikk funksjoner` (30/mnd; KD 25,6) | Anker finnes |
| `/landingssider/google-ads/` | `landingsside optimalisering` (ukjent/mnd; KD 38,6) | Datagap · Overlapp! |
| `/konvertering/mobiloptimalisering/` | Ingen eksakt term med tall | Datagap |
| `/lokal-seo/lokale-landingssider/` | `seo oslo` (590/mnd; KD ukjent) | Anker finnes |
| `/lokal-seo/flere-lokasjoner/` | `google bedriftsprofil` (590/mnd; KD 23) | Anker finnes · Overlapp! |
| `/google-shopping/merchant-center/` | Ingen eksakt term med tall | Datagap |
| `/nettsidemigrering/` | `nettbutikk migrering` (10/mnd; KD ukjent) | Anker finnes · Overlapp! |
| `/funksjonsovervakning/` | Ingen eksakt term med tall | Datagap |
| `/digital-konkurrentanalyse/` | `konkurrentanalyse` (260/mnd; KD 19,3) | Anker finnes |
| `/ai-chatbot/` | `ai chat norsk` (170/mnd; KD ukjent) | Anker finnes |
| `/kundeanmeldelser/` | Ingen eksakt term med tall | Datagap |
| `/remarketing/` | `retargeting annonsering` (20/mnd; KD 17,3) | Anker finnes |
| `/google-ads/performance-max/` | Ingen eksakt term med tall | Datagap |
| `/youtube-annonsering/` | `youtube annonsering` (50/mnd; KD 30,1) | Anker finnes |
| `/linkedin-annonsering/` | `linkedin annonsering` (90/mnd; KD 33,2) | Anker finnes |
| `/arbeidsflytautomatisering/` | Ingen eksakt term med tall | Datagap |
| `/nettbutikkoptimalisering/integrasjoner/` | `integrasjoner nettside` (10/mnd; KD ukjent) | Anker finnes · Overlapp! |
| `/nettbutikkoptimalisering/abonnement/` | Ingen eksakt term med tall | Datagap |
| `/konvertering/priskalkulator/` | Ingen eksakt term med tall | Datagap |

P2 omfatter blant annet avgrensede spesialistsider med lite direkte datasignal eller høy risiko for overlapp: kundesjeldne integrasjoner, priskalkulator, abonnement, enkeltplattformer og noen annonseformater. Noen kan gi høye prosjektverdier uten nevneverdig søkevolum; slike muligheter bør løftes frem ved faktisk kundeinteresse, ikke fordi de skal fylle sitemap.

## 5. Risiko for intern SEO-kannibalisering – må avklares før publisering

Den kuraterte keyword-matrisen fant **10 eksakte søkeordankere brukt på flere godkjente URL-er**. Delt søkeord er ikke alene bevis på kannibalisering, men er et konkret varsel om at sidene må ha hvert sitt primære kjøpsproblem og SERP-intent.

| Overlappende sider | Anbefalt ansvarsdeling |
|---|---|
| /seo/ ↔ /seo/seo-analyse/ ↔ /seo/teknisk-seo/ | Hub: SEO-byrå/SEO Oslo; analyse: revisjon/tiltaksplan; teknisk: indeksering/tekniske feil. Ikke kopier samme H1 og primærsøk. |
| /konvertering/ ↔ /nettsideanalyse/ ↔ /landingssider/ | Hub: CRO; analyse: helhetlig vurdering; landing: konkret sidebygging og kampanjeflyt. Skill kjøpsintensjon og CTA. |
| /lokal-seo/ ↔ /lokal-seo/google-maps/ ↔ /lokal-seo/flere-lokasjoner/ | Lokal SEO = overordnet; Maps = GBP-operasjonelt; flere lokasjoner = kun reelle flere avdelinger. |
| /google-ads/ ↔ /google-ads/kontoanalyse/ ↔ /annonseoptimalisering/ | Google Ads hovedtjeneste eier «google ads byrå»; kontoanalyse eier audit; annonseoptimalisering er tverrkanals-/prosesside, må ikke være generisk klone. |
| /meta-ads/ ↔ /meta-ads/kontoanalyse/ | Meta Ads eier Facebook-/Instagram-annonsering; audit eier dokumentert kontogjennomgang. |
| /sporing-og-maling/ ↔ /sporing-og-maling/leadsporing/ ↔ /nettsideanalyse/ | Sporing: hendelser/GA4; LeadProof: kvalifiserte leads/attribusjon; nettsideanalyse: helhetlig diagnose. Unngå primærsøket «webanalyse» på flere URL-er. |
| /nettbutikkoptimalisering/ ↔ /nettbutikkoptimalisering/kjopsflyt/ ↔ /nettbutikkoptimalisering/gjenkjop/ | Hub: bred netthandels-CRO; kjøpsflyt: checkout/friksjon; gjenkjøp: eksisterende kunder. Bred «konverteringsoptimalisering nettbutikk» bør ikke eies av to spesialistsider. |
| /nettsidevedlikehold/ ↔ /wordpress-optimalisering/ ↔ /nettsidesikkerhet/ | Vedlikehold eier generell drift; WordPress eier plattformspesifikke forbedringer; sikkerhet eier autorisert teknisk risikorevisjon. |
| /nettsidemigrering/ ↔ /seo/seo-migrering/ | Nettsidemigrering: plattform/data/lanseringsprosess; SEO-migrering: URL-/redirect-/indekseringsrisiko som selvstendig delmål. |
| /crm-integrasjoner/ ↔ /nettbutikkoptimalisering/integrasjoner/ ↔ /arbeidsflytautomatisering/ | CRM: lead- og kundedata; e-handel: lager/ordre/frakt; arbeidsflyt: prosess og godkjenning. Brede integrasjonssøk må SERP-sjekkes. |

**Stoppregel:** Ikke opprett separate sider for samme kjøpsintensjon kun fordi én leveranse kan beskrives med et nytt substantiv. Godkjente P2-URL-er kan foreslås konsolidert i neste owner-gate, men **ikke slettes/endres uten eksplisitt godkjenning**.

## 6. Kommersiell tjenestestruktur – anbefaling, ikke prisvedtak

Hovedløpet bør være **diagnose → konkret gjennomføring → avgrenset, løpende forbedring**. En kundes problem og mål skal bestemme valgt tjeneste, ikke hvor mange undersider vi har bygget.

| Tilbudsbane | Hva kunden kjøper | Leveransemodell | Vei til månedlig avtale |
|---|---|---|---|
| **Vurdering/diagnose** | «Hva koster oss henvendelser eller salg i dag?» | Tydelig avgrenset analyse med prioritert tiltaksplan; eventuell gratis inngang må avgrenses særskilt | Kjøp av gjennomføring og måling |
| **Synlighet per kanal** | «Få relevante henvendelser fra Google, Maps eller Meta» | ETT hovedfokus, definerte tiltak og månedlig rapportering; annonsebudsjett kommer i tillegg | Fast drifts-/optimaliseringsavtale |
| **Vekst – synlighet + konvertering** | «Få mer igjen av trafikken» | Kombinasjon av én hovedkanal og utvalgte CRO/måletiltak; ikke to fulle byråleveranser til halv pris | Månedlig test-/forbedringsløp med tydelige prioriteringer |
| **Teknisk drift og måling** | «Nettsiden og leadflyten fungerer, og vi oppdager feil» | Avgrenset vedlikehold, måling, test av kritiske skjemaer/flow og avtalt supportnivå | Retainer på stabile systemoppgaver |
| **Spesialprosjekt/Partner** | «Vi trenger integrasjon, stor endring eller avansert måling» | Betalt avklaring + definert scope, milepæler og separate tredjepartskostnader | Etterfølgende vedlikehold når egnet |

**Priser:** Historisk har omtrent **4 500 kr/mnd for ett lett forståelig kanaltilbud** vært lettere å selge, med kombinasjonstilbud og et høyere anker. Dette er **tidligere kommersiell erfaring**, ikke nytt prisvedtak for Optimalisering Oslo. Ingen tall i denne fasen låser priser, ressursbruk, oppsigelse eller garanterte resultater. Ikke bland pris på annonseforvaltning med selve annonsebudsjettet.

**Hva som må prises eksplisitt før salg:** kontakt-/rapportfrekvens, tidsbruk, antall sider/annonser/iterasjoner, hvilke integrasjoner eller sporinger som er inkludert, tredjepartskostnader, responstid og endringer utenfor scope. LeadProof er et måleverktøy, **ikke dokumentasjon på automatisk full attribusjon av telefon eller salg**.

## 7. 30-dagers utførelsesplan – forslag, ikke igangsatt implementering

| Fase | Arbeid | Godkjenningspunkt / bevis |
|---|---|---|
| Uke 1 | Bekreft eierskap til primærsøk for de 5 eksisterende hubene, avklar 10 klyngerisikoer og kontroller SERP på P0-A | Eier godkjenner søkeordansvar, uten å endre godkjente URL-er automatisk |
| Uke 2 | Lag 6 P0-A-sider fra fullstendige briefs. Før implementering: lås design på hero, CTA, kontaktflyt, pakkevalg og footer | Side-for-side UX/SEO-validering og innholdsbevis; ingen publisering før kontroll |
| Uke 3 | Koble skjema/booking til reelle lead-kilder, test mobil/UX, tracking og nødvendige personvernkontroller; kjør QA | Ende-til-ende tester, logg av reelle hendelser og kunderelevante konverteringer |
| Uke 4 | Publiser kontrollert etter godkjenning, etabler internlenking fra hubene, mål kvalifiserte leads og tilbakemeldinger | Publiserings-gate; gå til P0-B bare hvis data/kapasitet støtter det |

Dette er en **foreslått arbeidsrekkefølge**, ikke en tids- eller resultatgaranti.

**Primære kommersielle KPI-er:** kvalifiserte henvendelser per tjeneste, henvendelse→møte→betalt prosjekt→månedsavtale, beholdt månedsomsetning og leveranse-/supporttid per avtale. Sekundært: organisk søkesynlighet og trafikk per intensjonsklynge. Tall kan ikke beregnes fra søkeordarket alene.

## 8. Åpne evidenshull og vedtak før produksjon

1. **SERP:** Sjekk faktiske norske Google-resultater og konkurrerende landingssidetyper for minst alle seks P0-A; organisk KD er et signal, ikke real-life ranking-garanti. Google oppgir at lokal rangering hovedsakelig påvirkes av relevans, avstand og hvor kjent virksomheten er ([Google Business Profile Help](https://support.google.com/business/answer/7091?hl=no)). Ingen manipulerte eller fiktive Maps-profiler.
2. **Søkeord:** 853 rader er kontrollert for datakvalitet, men bare de kuraterte eksakte ankerne er koblet til URL-matrisen. Utfør **full semantisk SERP-klynging** deretter. Ikke hev at de resterende søkeordene er dekket, eller at fravær i arket betyr null etterspørsel.
3. **Evne/bevis:** Ikke hev konkrete case-tall som er usikre eller påstander om LeadProof-funksjonalitet som ikke er produksjonsverifisert. Samtykke, personvern og funksjonskontroll per kunde må verifiseres.
4. **Pakkemargin:** Avklar timebudsjett, scope, forventet leveransekost, lønnsomhet, annonseringskostnader og support før endelig prisliste.
5. **Owner-gate:** Godkjenn rekkefølgen, eventuelle konsolideringer og kommersielle pakker. Ingen automatisk #75, og ingen endring av eksisterende godkjente sitemap-vedtak før dette.

---

**Status:** Fase-2-analyse utarbeidet som beslutningsgrunnlag. **Ikke** endret kode, CMS, eksisterende sider, godkjente URL-er, prisstruktur eller produksjon. Fase 1 er fortsatt avsluttet. Fase 2 sine forslag venter eierbeslutning før gjennomføring.
