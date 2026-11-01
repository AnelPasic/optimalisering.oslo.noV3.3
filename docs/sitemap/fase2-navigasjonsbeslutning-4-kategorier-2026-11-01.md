# Arkitekturbeslutning – fire hovedkategorier for tjenester

**Dato:** 01.11.2026 · **Status: EIERGODKJENT / LÅST** · **Omfang:** Optimalisering Oslo · **Fase:** IA/navigasjon, ikke ny tjenestekartlegging.

## Beslutning

Eier har uttrykkelig låst **fire hovedkategorier** som mulige toppmenypunkter på optimalisering.oslo.no:

| Plass | Låst kategorinavn | Løftet til kunden | Typiske undergrupper |
|---:|---|---|---|
| 1 | **Synlighet** | Bli funnet av flere relevante kunder | SEO, Lokal SEO, AI-synlighet, Annonsering (Google/Meta/LinkedIn osv.) |
| 2 | **Konvertering** | Få flere relevante henvendelser og salg | CRO, landingssider, skjema/booking, sporing/LeadProof, løpende forbedring |
| 3 | **Nettbutikk** | Selg mer i nettbutikken | Produkter/kategorier, checkout, Shopify/WooCommerce, B2B, gjenkjøp, nettbutikkintegrasjoner |
| 4 | **Nettside & systemer** | Få en raskere, tryggere og smartere løsning | Ytelse, drift/vedlikehold, sikkerhet, migrering, CRM-/systemintegrasjoner, automatisering |

**Låst er bare:** antall (4), navnene, toppnivået og deres brukerorienterte formål. Alle **63 eksisterende godkjente tjeneste-URL-er** skal kunne sorteres innenfor disse uten at en femte tjenestekategori opprettes automatisk.

**Ikke låst / neste tråds oppgave:** eksakt primærtilhørighet for hver av de 63 tjenestene, eventuelle undergruppeoverskrifter, hvilke 4–6 lenker som vises direkte i hver megameny, sekvens, SEO-eierskap, internlenker, samt endelig utforming og implementering. Den tilhørende JSON-matrisen inneholder et **forslag** (27/17/9/10) for å gjøre neste gjennomgang raskere, men **ingen enkelttjenestes plassering er vedtatt av eier**.

## Nav- og SEO-prinsipper

1. Organiser for kunden etter **ønsket resultat**, ikke etter intern teknologi eller byråfag. Synlighet og Konvertering er søskenkategorier; Nettbutikk og Nettside & systemer er også egne områder.
2. **Toppmenyen for tjenester har disse fire punktene.** `Priser` kan være separat navigasjonslenke og kontakt/vurdering en tydelig CTA. `Innsikt` er støttestoff som kan ligge i sekundær navigasjon, megameny eller footer. De er **ikke** en femte og sjette tjenestekategori.
3. **Én primær kategori per tjeneste-URL**, med valgfri kontekstuell internlenking/cross-sell under flere områder. Eksempel: Google Ads-konverteringssporing kan stå i Annonsering, men lenkes fra Sporing og måling.
4. **URL-strukturen må ikke speile menykategorien.** `/google-ads/konverteringssporing/` kan nav-plasseres i Synlighet og fortsatt lenkes fra Konvertering. Ingen nye ruteflyttinger, redirects, pris-/pakkeendringer eller sletteforslag ligger i dette vedtaket.
5. **63 tjenestesider ≠ 63 synlige dropdown-lenker.** Prioriter forståelige undergrupper, fremhevede kjøpsnære tjenester og P0/P1/P2, og tilby videre lenker på relevante huber/oversiktssider.
6. Hovedkategoriene representerer ikke automatisk nye indekserbare hub-URL-er. Gjeldende huber inkluderer `/synlighet/`, `/seo/`, `/lokal-seo/`, `/ai-synlighet/`, `/konvertering/` og `/nettbutikkoptimalisering/`. **Nettside & systemer har ingen separat ny hovedside godkjent av dette vedtaket**; kan være en megamenygruppe inntil annet er vurdert og godkjent.
7. **Avklar søkeintensjon før tekst/SEO-beslutninger.** Bruk fase-2-søkeordmatrisen og det koblede Google Sheet, ikke generer kunstig hierarki basert på URL-navn. Ikke la brede SEO-/Ads-/CRO-huber konkurrere med spesialistundersider.
8. Bevar alle **74 tidligere beslutninger** (55 JA, 2 ANNET med JA, 17 NEI) og de **63 godkjente tjeneste-URL-ene**. **Ingen punkt #75**; denne IA-beslutningen er ikke gjenåpning av tjenesteidéinnsamlingen.

## Arbeidsgrunnlag / kildehierarki

- [Kanonisk sitemap-indeks](./README.md)
- [Låst sitemap/briefstatus etter #74](./beslutninger-74-2026-11-01.json)
- [Fullstendige briefs #74](./fullstendige-tjenestebriefs-74-2026-11-01.md)
- [Fase 2 – prioritering, P0/P1/P2 og overlapp](./fase2-prioritering-og-publiseringsplan-2026-11-01.md)
- [Fase 2 – søkeord-til-URL-matrise](./fase2-sokeord-url-matrise-2026-11-01.json)
- [Sorteringsgrunnlag for 63 URL-er – JSON](./fase2-navigasjon-63-tjenester-utkast-2026-11-01.json) – **utkast**, ikke endelig vedtak om plassering
- [Medon – Søkeordsanalyse (løpende)](https://docs.google.com/spreadsheets/d/1ZvFikP6jKJ8r41H66oFQ31BPdhNzp6-N11VIJ-cetWM/edit)

## Første oppgave for neste tråd (INGEN kode)

1. Verifiser siste `main`; les denne låste beslutningen, master/JSON og fase-2-analyse. Se faktisk nåværende `app/src/content/site-chrome/header.json` og de eksisterende hub-JSON-ene.
2. Hent de 63 godkjente URL-ene fra JSON og gjennomgå hvert **forslag til primær kategori** i utkastmatrisen. Begrunn endringer og tvilstilfeller; bevar nøyaktig én primær kategori per URL. Utkastet 27/17/9/10 er **ikke en målfordeling**.
3. Organiser tjenestene i 3–5 tydelige undergrupper per hovedkategori, med kort navn og kundevendt beskrivelse. Ikke gjør kategoriene til en flat liste på 27+ lenker.
4. Lag en konkret desktop-megameny- og mobilstruktur som viser omtrent 4–6 prioriterte tjenester per hovedområde og tydelige lenker til hele oversikten. Vektlegg P0-A-tjenester, brukerflyt og relevans for månedlige avtaler.
5. Lag en nav-/internlenkeplan: primærmeny, nyttige krysslenker og hvilke eksisterende huber som eier bredt søkeord. Flagg manglende naturlig hub for Nettside & systemer **uten** å opprette ny SEO-URL.
6. Presenter endelig foreslått fordeling i **en eierbeslutningspakke** med opptelling og tvilstilfeller. Lagre som versjonert forslag; krev eiergodkjenning **før** `header.json`, CMS, ruter eller nettsider endres.

### Akseptansekriterier

- Akkurat de **fire låste kategorinavnene**. Ingen femte tjenestekategori.
- Akkurat **63 unike, tidligere godkjente URL-er**, hver med én (og bare én) foreslått primærplassering; ingen nye URL-er.
- Vis alle endringer mot utkastet, dokumenter krysslenker og hvorfor, P0-rekkefølge og SEO-/menyrisiko.
- Kartleggingen av nye tjenester forblir avsluttet ved #74; ingen kode, priser, SEO-titler eller navigasjonsimplementering i denne runden.
- Eksisterende sitemapbeslutninger og innholdsbriefs endres ikke for å «passe inn» i menyen.

## Nåværende nettsted (kun observasjon)

Den gjeldende `app/src/content/site-chrome/header.json` har Synlighet som mega med **Konvertering og Nettbutikk som interne seksjoner**, og Konvertering som eget menypunkt. Dette er ikke i samsvar med de nå **låste fire separate hovedkategoriene**, men **skal ikke endres** før sortering og eiergodkjenning av konkret menyforslag.
