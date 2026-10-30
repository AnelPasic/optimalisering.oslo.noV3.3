# Optimalisering Oslo – kanonisk sitemap og innholdsgrunnlag

**Oppdatert:** 30.10.2026 · **Beslutningspunkter:** 46 avklart (43 JA / 3 NEI) · **Godkjente tjeneste-URL-er:** 49 · **Neste punkt:** 47 (ikke besluttet)

Dette dokumentet er inngangspunktet for nye tråder, Codex og GitHub-issues. **Kun optimalisering.oslo.no**, ikke medon.no. Ingen av de foreslåtte sidene er implementert av denne sitemap-arbeidsflyten.

## Gjeldende versjon (46)

- [Master – beslutningslogg, begrunnelser, sitemap og handoff](./master-beslutninger-46-2026-10-30.md)
- [JSON – maskinlesbar beslutningslogg + detaljerte leveranser](./beslutninger-46-2026-10-30.json)
- [Fullstendige tjenestebriefs – problem, «Dette kan vi levere», hvorfor egen side, differensiering, kommersiell modell, kvalitetskrav](./fullstendige-tjenestebriefs-46-2026-10-30.md)
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

**Punkt 47 – venter:** Kundeanmeldelser og omdømmeoptimalisering, mulig `/kundeanmeldelser/`. Vurder som selvstendig tjeneste mot Google Maps/lokal SEO og sosialt bevis under budskap og tilbud.

**Historikk:** Versjonerte snapshots 32–45 beholdes uendret. #34, #44 og #45 avviste egne undersider, og omfangene ble lagt i eksisterende godkjente tjenester. #46 godkjente egen AI-chatbot-side med leveransekontroll før publisering.
