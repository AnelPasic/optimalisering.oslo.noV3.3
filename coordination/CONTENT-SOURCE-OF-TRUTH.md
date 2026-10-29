# CONTENT-01 — Kildeansvar for innhold (Oslo-pilot)

**GJELDENDE OWNER-REGEL (30.10.2026): Alle sider behandles som live.** Ingen `status`, `authority`, `REVIEW_REQUIRED` eller `DRAFT / NON-AUTHORITATIVE` i aktiv side-JSON, Begreper, Pages CMS eller sidevalidering. Ikke introduser nye godkjenningsstatuser. Ved revisjon, oppdater direkte den autoritative kilden. Faktisk godkjenning av priser, dokumenterte case/resultater, personvern, fungerende kontaktskjema og operativ publisering er separate forhold.

Én redigeringsplass per innholdsbit. Denne korte fasiten beskriver **det som faktisk er implementert**, ikke et nytt CMS eller en plan om å flytte eksisterende data. [MWS issue #52](https://github.com/AnelPasic/MedonWebSystem/issues/52). Relevante design-/redaksjonsregler ligger fortsatt i MWS `docs/PAGE-BUILDER-AND-CRO-BASELINE.md` og `docs/CONTENT-QUALITY-AND-VOICE.md`.

| Hva du vil endre | Eneste redigeringskilde i Oslo | På sidene |
| --- | --- | --- |
| Sidens SEO-tittel/beskrivelse, Hero, egne avsnitt/kort, FAQ og rekkefølge | **Sider** → `app/src/content/pages/<side>.json` (inkl. `hero`, `seo`, `sections`, `faq`) | Siden eier tekst og plassering. Hero er utenfor den flyttbare seksjonslisten. |
| En ordinær seksjon som brukes på flere sider | **Global Innhold → Egendefinerte seksjoner**, én fil i `app/src/content/global-content/<id>.json` | Bruk `{ "_block": "sharedContent", "entry": "<id>" }` i sidens `sections`. Siden eier plassering/skjuling, kilden eier teksten. Ikke kopier. |
| Felles spesialseksjoner (behov, kalkulator, sjekk, priser, resultater, mekanisme, passer, spørsmål) | **Global Innhold** → sine åtte eksisterende redaktører i `app/src/content/global-elements/*.json` | Bruk `{ "_block": "global", "element": "<nøkkel>" }`. Siden velger plassering, ikke egen tekstkopi. |
| Godkjente kundecaser og dokumentasjon | **Case/evidens (intern)** → `app/src/content/proof/*.json` | `global-elements/resultater.json` velger presentasjon/caser; valg er **ikke** et nytt bevis eller publiseringstillatelse. Proof må bestå de eksisterende publiserings- og tillatelsesportene. |
| Toppmeny, logo, tema, typografi og footer | **Globale Elementer** → `app/src/content/site-chrome/header.json`, `appearance.json` og `footer.json` | Deles på tvers av sidene; ikke speil i forside-JSON. |
| Språk og tone for fremtidige redaksjonelle endringer | **Språk og tone** → `coordination/CONTENT-TONE.json` og prosjektets `CONTENT-VOICE-PROFILE.md` | Veileder redigering; omskriver **ikke** eksisterende tekst automatisk. |

**Viktige skiller:** `app/src/content/pages/priser.json` eier **prissidens** Hero/SEO/egen kontekst, mens `global-elements/priser.json` eier det **globale pris-/pakketilbudet**. `page.faq` er sidens egne spørsmål; `global-elements/sporsmal.json` er det faste FAQ-elementet når det plasseres. Lokal primær-CTA i Hero er sidens, mens CTA/form i `sjekk` er beskyttet fellesinnhold. En lenke til en global seksjon endrer ikke kilden; en flytting endrer ikke anker/ID. Eksisterende Pages CMS-felt, `id`/`uid`, innholdsroller og kontroller forblir autoritative.

## Tre faktiske Oslo-eksempler (kontrollert mot `main`)

1. **Forside** — `pages/home.json`: lokalt `seo`, `hero` og `faq`. `sections` plasserer blant annet `behov`, `regneeksempel`, `resultater`, `priser`, `sjekk` og `sporsmal` som **referanser** til faste globale elementer. En skjult lokal seksjon er ikke automatisk en global kilde.
2. **Tjeneste** — `pages/seo.json`: lokal `seo`, `hero`, faglige `content`-seksjoner og `faq`; `priser` og `sjekk` plasseres som globale **referanser**. Korriger pris i globalt element, men SEO-spesifikk forklaring på SEO-siden.
3. **Artikkel** — `pages/google-bedriftsprofil.json`: egen `seo`, `hero`, `listing`, `faq` og lokale fagseksjoner. Artikkelen er ikke et nytt globalt element bare fordi den lenkes fra flere sider; PageList gir lenker til den kanoniske siden.

## Arbeidsregel for videre CONTENT-saker

Før redigering: **Hvilken kilde eier teksten eller dataene?** Er dette én side, én delt redaksjonell seksjon eller et fast/beskyttet globalt element? Endre kun denne kilden; endre bare **referanse, synlighet og rekkefølge** på mottakersiden. Kontroller at beskyttede priser/proof/form, internlenker, ankre og godkjent CMS-data ikke endres ved ren omstrukturering.

**Neste saker:** [CONTENT-02](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/54) håndterer Oslo-tekst og testrester. [CONTENT-05](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/55) håndterer Oslo sitt tjenestehierarki. [CONTENT-03](https://github.com/AnelPasic/MedonWebSystem/issues/53) kan forbedre **CMS-navn/rekkefølge**, men skal ikke lage nye parallelle kilder. [CONTENT-04](https://github.com/AnelPasic/MedonWebSystem/issues/54) definerer **anbefalte** sideoppsett. Dette dokumentet endrer ikke publisert innhold eller menystrukturen.
