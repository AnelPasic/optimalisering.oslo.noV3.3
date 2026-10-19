# Codex-handoff — H-024A8G / D-105: OWNER-godkjent forside B

**Prosjekt:** `AnelPasic/optimalisering.oslo.noV3.3`
**Referansestatus kontrollert:** `main` = `b9081eaec7d23d1715a0fa8968414367219a1af3` (2026-10-19). Dette er en referanse, IKKE en commit å resette til. Hent nyeste `main` før endring.
**Felles standard:** `AnelPasic/MedonWebSystem`, kontrollert `main` = `b6ddf7fca243f8bc78c061a157bda0bdfbe1ee69`.
**Mål:** Gjennomfør KUN valgt forsidekomposisjon B, dokumenter faktisk verifisert resultat, og STOP for OWNER. Ingen annen prosjektfase.

## 1. Bindende OWNER-beslutning — D-105

OWNER har uttrykkelig godkjent:

> «Jeg godkjenner alternativ B for forsiden og aksepterer den dokumenterte native Pages CMS-begrensningen. Lag neste avgrensede Codex-handoff med alle bevaringskrav og tester.»

Beslutningen autoriserer implementering av B, IKKE redesign eller andre utvidelser. `coordination/evidence/h024a8f/HOMEPAGE-SHORTLIST.md` definerer alternativ B. OWNER aksepterer at sammenfoldede globale Pages CMS-rader viser tekniske `element`-ID-er, mens åpnet velger og bibliotek har norske navn. Ikke jobb videre med labels, nytt felt/register, Pages CMS-fork eller DOM-hacks. Behold H-024A8F-leveransen.

## 2. Første lesing og konfliktkontroll

Les i denne rekkefølgen før implementering:

1. `AnelPasic/MedonWebSystem`: `docs/CROSS-THREAD-START-HERE.md`, `docs/CURRENT-STATE.md`, `docs/DECISIONS.md`, `AGENTS.md`.
2. `AnelPasic/optimalisering.oslo.noV3.3`: `coordination/PROJECT-STATE.md`, `coordination/REVIEW-QUEUE.md`, `coordination/DECISIONS.md`, `coordination/CHATGPT-TO-CODEX.md`, `coordination/CODEX-TO-CHATGPT.md`.
3. `coordination/H024A8F-CMS-EDITOR-POLISH-AND-HOMEPAGE-SHORTLIST.md`, `coordination/evidence/h024a8f/HOMEPAGE-SHORTLIST.md` og `coordination/evidence/h024a8f/README.md`.
4. Nåværende `app/src/content/pages/home.json`, `app/src/lib/home-builder.ts`, CMS-schema, relevante tester og åtte `app/src/content/global-elements/*.json`.

Kontroller Git HEAD, mulige samtidige OWNER-CMS-lagringer, arbeidskopi, ucommittede filer og eksisterende lokale OWNER-assets. Aldri `git reset --hard`, blind restore, stash-drop eller checkout av historisk `home.json`. Hvis nyeste `main` har materielle endringer, rebaser planen på dem og STOP ved reell konflikt; ikke overskriv nye verdier.

## 3. Eksakt godkjent komposisjon — ingen innholdsomskriving

**Synlig desktop- og mobilrekkefølge:**

1. Hero — eksisterende låste Hero, først og uendret.
2. `regneeksempel` — Konverteringskalkulator.
3. `resultater` — Kunderesultater.
4. `priser` — Pakker og priser.
5. `sjekk` — Gratis sjekk.
6. `sporsmal` — FAQ.

**Gjennomfør bare følgende kildeendringer i `app/src/content/pages/home.json`:**

- Behold OWNER-lokal `topSections`-rad med `id: "forbehovsvelger"`, samme `uid`, overskrift, tekst, surface og alle øvrige felt og posisjon. Sett BARE `"visibility": "hidden"` på denne raden. Reversibelt skjul; ikke slett/erstatt testtekst.
- La `sections` inneholde nøyaktig de fem EKSISTERENDE globale plasseringsreferansene i denne rekkefølgen: `regneeksempel`, `resultater`, `priser`, `sjekk`, `sporsmal`. Behold eksisterende referanseobjekter/felt for disse, uendret bortsett fra plasseringen. Ikke dupliser masterinnhold i `home.json`.
- Fjern kun FORSIDE-referansene til `behov`, `mekanisme` og `passer`. Ikke slett eller skjul deres globale masterfiler; de skal fortsette å være redigerbare under «Globale elementer».
- Behold `bottomSections` og eventuelle nyere OWNER-rader. Hvis slike nye rader fører til synlige seksjoner i konflikt med B: STOP og be om beslutning, ikke gjett.
- Hero og alle felter utenfor nevnte plasseringer i `home.json` skal være semantisk uendret. Bevar seksjons-ID, master-UUID og ankeridentitet.

`home-builder.ts` støtter allerede `visibility: "hidden"` for lokale blokker og kortere globale referanselister. Det skal normalt IKKE være behov for endringer i renderer, schema, `.pages.yml`, CSS eller komponenter. Hvis en slik endring er nødvendig: dokumenter hvorfor og STOP før arkitekturutvidelse.

## 4. Ikke-forhandlingsbare bevaringskrav

- Alle ÅTTE masterfiler under `app/src/content/global-elements/` byte-identiske før/etter. Ingen endring i priser, pakkeomfang, forbehold, proof/caser, FAQ, kalkulator, behovsvelger, skjema eller publiseringsautoritet.
- Alle øvrige innholdsregistre, andre ruter, bilder inkludert fem OWNER-assets, CMS-konfigurasjon, kildekomponenter, designsystem og eksterne referanser urørt.
- Ingen endring av godkjent Hero, navbar, footer, kort, typografi, mobilutforming, FAQ-bredde, kontaktskjema, seksjonsvarianter, CTA-tekst eller `href`. Ingen nye resultat-/pris-/effektpåstander.
- `/#priser` og `/#sjekk` må fortsatt være synlige, unike og klikkbare fra Hero, relevante pakkeknapper og eksisterende interne ruter. Behold `#regneeksempel`. Auditér inngående ankerlenker til fjernede forsidereferanser; STOP hvis publiserte lenker blir brutt uten autorisert retargeting.
- Kalkulator interaktiv og tydelig hypotetisk, ikke caseresultat. Eksisterende godkjente proof-data nøyaktig bevart. Strukturert FAQ-data må svare til synlig FAQ.
- Preview-sikkerhet: `noindex`, robots-sperre, tomt sitemap, ingen offentlig live POST/leadinnsending, deaktivert skjema, ingen domene-/lanseringsendring.
- **H-024A3 OPEN; H-024A8E whole-editor OWNER PASS PENDING; H-024B BLOCKED; H-022 PARKED.** Aksept av native etikettbegrensning betyr ikke full CMS-godkjenning, mouse-drag-verifikasjon eller tjenestesideutrulling.
- Ingen starterekstraksjon, PR #4-merge, systemoppgradering, daisyUI-migrering eller bred refaktorering.

## 5. Implementering og reell verifikasjon

### A. Preflight / snapshot
- Noter FERSK HEAD, `home.json` innhold/hash og SHA/hash av de åtte masterfilene, øvrig content, CMS-config og OWNER-assets.
- Ta før-skjermbilder av faktisk Worker og verifiser Pages CMS fra en fersk sesjon på `main`, ikke gammel nettleserfane.
- Ta utgangspunkt i OWNER-ordre etter D-103 (kalkulator foran behov); ikke reverser `f562b7e` gjennom en historisk restore.

### B. Minimal endring
- Endre kun `home.json` som spesifisert, med eksisterende source/visibility-arkitektur.
- Ingen risikabel CMS Remove/Clear/Replace på OWNER-innhold kun for å bevise drag.
- Oppdater eksisterende tester/fixtures BARE der forventningene avhenger av faktisk forsideantall/-rekkefølge, uten å svekke valideringsregler.
- Legg til målrettet regresjonstest/eksakt assert for B-rekkefølge, skjult men bevart `forbehovsvelger`, de tre manglende forsidereferansene og alle åtte intakte mastere. Test at den lokale raden ikke lekker offentlig.

### C. Obligatorisk QA
- Kjør `cd app && npm run verify`, inklusive Astro/TypeScript, tester, CMS-audit, copy/static/surfaces, typografi og build. Dokumenter eksakt avvik hvis noe ikke kan kjøres.
- Positive og negative tester: `validateHomepagePublicLinks`, visibility, duplikat-ID, manglende referanser og `#sjekk` / `#priser`; ikke svekk vernet for å få B til å passere.
- Nettleser 1440 / 900 / 390 / 320 px: faktisk DOM-rekkefølge, synlighet, hopp til ankre, overflow, doble H1/ID, browserfeil, kalkulator, pakkeknapper, deaktivert innsending og mobilinteraksjoner. Før/etter-skjermbilder.
- Mål faktisk ETTER sidelengde og posisjon for `#priser` / `#sjekk`. Sammenlign med estimat i H-024A8F-shortlist; ca. 29 % var bare et overslag, IKKE CRO-garanti eller mål som skal manipuleres.
- FERSK autentisert Pages CMS: toppgruppen beholder all OWNER-testtekst med `visibility: hidden`; hovedgruppen viser fem riktige referanser i rett rekkefølge; biblioteket har fortsatt åtte mastere. Aksepter tekniske etiketter i sammenfoldede rader. Ikke påstå CMS Save/mouse-drag-test dersom den ikke faktisk er gjort.
- Faktisk **Cloudflare native Build SUCCESS** på riktig commit og aktiv Worker-versjon/routing, kontrollert mot `https://optimalisering-oslo-v33.anel.workers.dev/`. Lokalt bygg er IKKE deploybevis; skill Worker fra CMS-preview. Ikke åpne produksjonslansering.
- Etterkontroller ikke-endrede ruter og publiserte artefakter mot førtilstand. Forsidens HTML/screenshot SKAL endres; beholdt innhold/stiler og øvrige ruter skal ikke endres.
- Riktig bevisnivå: selvstendig feil-side/gammel-schema/stale-HEAD review før commit/deploy; STOP ved relevant avvik.

### D. Diff-/bevaringsaudit
- Eksakt `home.json`-diff: tre forsidereferanser fjernet, fem beholdt/omordnet, én lokal OWNER-rad satt `visibility: hidden`, ingen andre felter/UID tapt.
- Rapporter byte-identiske mastere, øvrige records, `.pages.yml`, Hero/proof/price/form og brukerfiler. Hold test-/koordinasjonsendringer separat.

## 6. Koordinering og slutt

- Registrer **D-105** som ny OWNER-godkjent B + aksept av dokumentert native labels-begrensning i `coordination/DECISIONS.md`. Ikke omskriv historiske D-104/D-103.
- Opprett/oppdater kort aktiv kontrakt `coordination/H024A8G-HOMEPAGE-B-COMPOSITION.md` som viser til denne fullstendige handoffen. Kvitter i `coordination/CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md`, `REVIEW-QUEUE.md`, eventuelt `CHATGPT-TO-CODEX.md`, slik at gammel «D-104 homepage choice pending» ikke fremstår som aktivt.
- Konkrete kilde-/test-/CMS-/build-/Worker-/skjermbildebevis i `coordination/evidence/h024a8g/`. Skill verifiserte fakta fra antakelser; ikke commit hemmeligheter eller sensitive kundedata.
- Kun én avgrenset leveranse; ikke gjenbruk gamle snapshots som om de gjaldt endringen. Commit/push, oppgi eksakt SHA og faktisk Worker URL. Kan CMS/Worker ikke verifiseres, skriv **IKKE VERIFISERT**, ikke teknisk PASS.
- **STOP etter teknisk levering** for OWNERs visuelle/kommersielle godkjenning av B-forsiden. Ikke erklær hele CMS-editoren eller H-024A3 OWNER PASS, og ikke start H-024B, H-022, go-live eller starterarbeid.

### Codex sluttformat

1. Levert/ikke levert, eksakt commit SHA og faktisk preview-lenke.
2. Synlig B-rekkefølge; OWNER-test bevart/skjult; tre fjernede SIDE-referanser; åtte bevarte mastere.
3. Tester + faktisk native CMS/Cloudflare Worker; lenker til bevis og eventuelle avvik.
4. Preservation audit: hva ble endret versus urørt.
5. Ett kort OWNER-reviewpunkt, øvrige gates fortsatt OPEN/BLOCKED/PARKED.

Utfør denne avgrensede oppgaven direkte. Ikke spør OWNER om B på nytt. STOP kun ved faktisk kildekonflikt, nødvendig uautorisert utvidelse eller når oppgaven er ferdig for OWNER-review.
