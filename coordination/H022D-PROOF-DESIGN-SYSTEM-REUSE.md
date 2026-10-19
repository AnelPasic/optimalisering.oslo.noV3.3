# H-022D — Kunderesultater: gjenbruk designsystemets Kort med bilde

**OWNER — 2026-10-19 / D-108 — VISUELL REVISE av H-022C.**
«Det ble like triste saker ... den bare skal bruke eksisterende elementer fra /design-system/. Kan fungere med Kort med bilde for den første, eller vekslende liste med opplastede bilder, eller bildekort.»

**Autorisasjon:** Korriger kun «Kunderesultater», publiser direkte på eksisterende ikke-indeksert review Worker etter lett QA, og la OWNER vurdere visuelt. Dette erstatter H-022C-presentasjonsretningen, ikke caseautoriteten. Følg `coordination/PRELAUNCH-DELIVERY-RULE.md` (D-107). Kontroller fersk main, lokale/OWNER CMS-endringer og faktisk nyere implementering før du koder.

## Valgt løsning — ingen ny visuell komponentfamilie

1. Bruk **nøyaktig designsystemets «Kort med bilde»** som primær konstruksjon for Eurotents, vist i `app/src/pages/design-system.astro` under «Kort med bilde»: et ekte daisyUI `card md:card-side bg-base-100` med `figure` og `card-body`. Rebruk godkjent tema, radius, padding, tekstroller og mobilstabling. Samme medie-/tekstproporsjon, ingen ekstra proof-dashboard eller oppfinnelse av ny «hero proof»-komponent. Hvis det er naturlig, trekk ut en **minimal delt mediekortprimitive** som også brukes av designsystemdemoen; ikke kopier opp utseendet i separat lokal CSS. Unngå refaktor hvis noen få eksisterende klasser er nok.
2. **Eurotents i det ene kortet:** eksisterende EKTE nettstedsskjermbilde til venstre / over på mobil; til høyre/inne i `card-body`: kundenavn, kort Google Ads/ROAS-kontekst, tydelig godkjent `4,3x → 17,2x` med perioder `april 2025 / april 2026`, og `20 % lavere annonseforbruk` som underordnet informasjon i **samme card-body**. Resultatet skal leses straks, uten stort tomt felt eller eget lilla stripe-kort. Ikke kutt bort reell kundekontekst for å få mer luft; bildet skal ha rimelig proporsjon og synlig nettside-UI.
3. **Nysta og Helt Opplagt under:** to balanserte, ekte daisyUI `card > card-body > card-title` kort med identisk struktur/avstand/typografiske roller og tydelige faktiske før/etterverdier, kilder og perioder. Hent visuell grammatikk fra eksisterende Card-primitiver/«Bildekort», men **ikke** bruk tilfeldige ikoner, tomme bildehalvdeler eller unaturlige bildeblokker for å simulere mediekort når det ikke finnes godkjente relevante bilder. Eventuelle ekte nettsideskjermbilder for disse kan lastes opp som innhold senere og vurderes som framtidig bildevariant.
4. **Ikke ta i bruk `PageList` som en «quick fix».** Demoene «Vekslende liste» og «Bildekort» i designsystemet er ekte `PageList`-varianter med sidekoblinger og tekst fra CMS-datasett. Resultatene er ikke en sideliste og har ingen godkjente «Les case»-destinasjoner. Gjenbruk **kortstruktur, styling og komposisjonsprinsipper**, ikke feil datakilde/lenker.
5. Stopp «bevis-showcase»-spesialstyling. Auditér og fjern kun overflødige regler for homepage-proof fra `app/src/components/HomeProof.astro` (f.eks. `.proof-home .proof-featured`, egen mint flate/overstyringer) som konkurrerer med de eksisterende daisyUI/tema-primitive. Behold minimal nødvendig lokal komposisjon for tall/metadata. Ingen hardkodede nye farger, vilkårlige fixed-height områder, separate CTA, CSS-hacks for å matche bare ett screenshot. Ikke introduser egen CSS/designsystem.

## Ufravikelige bevaringskrav

- Eurotents ROAS `4,3x → 17,2x`, `20 % lavere annonseforbruk`, kilde/perioder; Nysta checkout completion `7,1 % → 43,6 %` med rette målekontekst; Helt Opplagt organisk `2 162 → 4 181` / `+93 %` — bruk eksakt autoritativ public proof projection. Ingen nye kundepåstander, beregninger eller case-lenker.
- Bruk nåværende godkjente Eurotents-nettstedsskjermbilde fra `app/src/content/global-elements/resultater.json`; ikke hent nytt medieasset eller konverter det til produktfoto, ikke overskriv `featuredVisual` unødvendig.
- Behold alle eksisterende 8 mastere/CMS-data/OWNER-assetfiler, B-rekkefølgen `Hero → regneeksempel → resultater → priser → sjekk → sporsmal`, Hero, pris, CTA, form, FAQ, SEO og øvrige sider urørt.
- `HomeProof.astro` har `primary=true` for tjenestesider og `primary=false` for forside: **tjenestesidevarianten må bli uendret visuelt/funksjonelt**. Hvis minimal felles kortprimitive påvirker annen side/demoparitet, isoler eller STOP. Ikke endre proof-skjema/permission/kildedata, CMS-arkitektur, globale designtokens eller andres kodestruktur.
- Ingen produksjonslansering, indeksering, aktivt skjema/POST eller oppstart H-024B. H-024A3 fortsatt OPEN.

## Gjennomføring: direkte, enkelt, risikobasert

- Gjennomfør én designløsning på eksisterende main. Ingen egen branch, designforslag, overflødig screenshot-arkiv eller tung full testsuite før review.
- Kontroller diff mot forespurt seksjon. Kjør build og relevante proof-presentasjons-/bevaringstester, med kort desktop/mobil smoke. Sjekk konkrete tall, perioder, bilde, layout uten overflow, og at service proof ikke har regrediert. Ikke test mer enn faktisk risiko krever.
- Push og bekreft faktisk native Cloudflare Worker-deploy på `https://optimalisering-oslo-v33.anel.workers.dev/#resultater`. Ingen «PASS» før deploy er verifisert.
- Kort oppsummering i `coordination/CODEX-TO-CHATGPT.md` og aktiv `PROJECT-STATE.md`/`REVIEW-QUEUE.md`. Oppgi commit, preview, berørte filer, fokusert QA og eventuelle reelle avvik. OWNER tar den visuelle kontrollen på live preview.

**Suksesskriterium:** Seksjonen fremstår som en naturlig del av allerede eksisterende designsystem. Eurotents er ett faktisk mediekort med naturlig innholdshierarki; Nysta og Helt Opplagt er to samstemte kort. Mindre spesial-CSS, ikke mer.
