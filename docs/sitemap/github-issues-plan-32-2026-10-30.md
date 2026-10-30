# Optimalisering Oslo – forslag til GitHub Issue-hierarki



**Anbefaling: hybrid, ikke 38 løsrevne issues nå.** Denne masterspesifikasjonen (`.md` + `.json`) er **kilden til beslutninger**. Issues er arbeidskort for implementering, ikke primærlagring av beslutningshistorikk.

**Hierarki:**

1. **Én overordnet EPIC** – `[EPIC] Optimalisering Oslo – sitemap, tjenester og publiseringsplan` med mål, lenke til masterfiler, nåværende beslutningsnummer, beslutningslogg og akseptkriterier.
2. **Område-issues / underoppgaver** – ni foreslåtte grupper: `SEO`, `Lokal SEO`, `AI-synlighet`, `Konvertering og CRO`, `Landingssider`, `Nettbutikk og Shopping`, `Annonsering`, `Måling/ytelse/UU/drift`, `Pakker, navigasjon og publisering`. Hver område-issue har lenker til sine godkjente sidebriefs og oversikt over avhengigheter.
3. **Én implementeringsissue per URL når siden faktisk skal bygges** – ikke opprett alle 38 som åpne utviklingsoppgaver før sitemap, pakkematrise og sidemaler er låst. Hver slik issue bør være underoppgave av riktig områdeissue (GitHub støtter ekte sub-issues). En sideissue kan dekke design, tekst, kode, meta, schema, QA og publisering for **én URL**, med avkrysningspunkter.

**Hvorfor:** Én gigantissue blir uoversiktlig for Codex og review. 38 uavhengige issues mister prioriteringer og beslutningskontekst. En trestruktur gir oversikt **og** en håndterlig arbeidsenhet per side når byggingen starter.

**Når opprette hva:** Opprett nå én EPIC + områdeissues **etter klarsignal til GitHub-opprettelse**. Hold sidebriefene i masterfilene. Etter endelig sitemap + pakkeavklaring opprettes sideissues i den prioriterte publiseringsbølgen. Ikke flytt godkjennelser tilbake til «åpne» bare fordi de ikke er bygget.

**Obligatorisk content brief før bygging:** Hver sideissue peker til beslutnings-ID i JSON og fullt beskrevet tjenestebrief (kundeproblem, alle navngitte leveransepunkt **med forklaring**, separat sideformål, overlapp, kommersiell modell, begrensninger). En issue som bare har URL, H1 og sjekkliste er ikke klar til bygging.

**Issue-malen for én URL:**

```md
## Beslutningsgrunnlag
- Beslutningspunkt / status:
- URL / forelder / sidetype:
- Kundeproblem (konkret situasjon i kundens språk):
- Dette kan vi levere (minst 4 navngitte leveranser + forklaring per leveranse):
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

**Teknisk begrensning:** GitHub-integrasjonen som ble inspisert støtter opprettelse/oppdatering av issues, men hadde ingen dokumentert operasjon for å knytte native parent/sub-issue-relasjoner. Manuell kobling via GitHub UI eller `gh issue create --parent` kan brukes ved opprettelse. Ingen issues er opprettet her.


## Før opprettelse

- Avklar repo (inspisert: `AnelPasic/optimalisering.oslo.noV3.3`).
- Opprett først masterfiler i valgt repo/mappe, og la EPIC lenke til dem.
- Ikke opprett 38 separate sideissues før publiseringsrekkefølgen er valgt.
- Beslutning #32 er godkjent; #33 (Meta-konverteringssporing) gjenstår.

### Håndhevingsregel for backlog

`docs/content/` eller annen avtalt spec-katalog må ha de komplette sidebriefene. En GitHub-issue er et arbeidskort som lenker til detaljbriefen. **Ikke kort ned** punktlisten «Dette kan vi levere» til bare stikkord, og ikke generer påstander som ikke er dokumentert. Oppdater `master`, `decisions.json` og `fullstendige-tjenestebriefs.md` synkront ved hver ny beslutning.