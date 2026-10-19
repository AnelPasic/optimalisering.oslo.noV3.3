# Kortere forside — forslag til OWNER, ikke implementert

Grunnlag: faktisk Worker og kilde ved `6dda6ab`, inkludert OWNER-rekkefølgen fra `f562b7e`. Ingen plassering, tekst eller publiseringsstatus er endret i dette arbeidet. Dette er en anbefaling, ikke en innholds-/SEO-lock eller dokumentert konverteringsgevinst.

## A — anbefalt kompakt kjøpsvei

**Hero → Kunderesultater → Pakker og priser → Gratis sjekk → FAQ**

La besøkeren forstå løftet, se eksisterende dokumentasjon, vurdere tilbudet og velge neste steg. FAQ beholder svar om sjekk, pris, kostnader og avgrensning. Fire seksjoner etter Hero erstatter dagens ni; globale originaler beholdes i biblioteket.

| Gjeldende plassering | Eksakt foreslått handling i A | Begrunnelse / konsekvens |
| --- | --- | --- |
| Hero | Behold helt uendret, først | Begge nåværende CTA-er beholdes. |
| Topp: `forbehovsvelger` | **Skjul**, behold hele den lokale OWNER-raden | «Test før behovsregler» / «OVerskrift» og tre gjentatte hjelpesetninger er faktisk OWNER-innhold. Ikke slett teksten som del av oppryddingen. |
| `regneeksempel` | Fjern kun plasseringen fra forsiden | Kalkulatoren er et hypotetisk verktøy, ikke et kundebevis. Originalen og konfigurasjonen beholdes. Se B hvis verktøyet skal være sentralt i kjøpsveien. |
| `behov` | Fjern kun plasseringen | Færre separate valg før tilbudet. Tre eksplisitte tjenestelenker forsvinner fra denne seksjonen; de eksisterende tjenestene og menylene består. Ingen ny landingsside opprettes. |
| `sjekk` | Behold publisert; flytt etter `priser` | Primær CTA går fortsatt direkte til `/#sjekk`. Skjemaet kommer senere ved vanlig scrolling; se høyde-/CTA-beregningen nedenfor. |
| `priser` | Behold publisert; flytt etter `resultater` | Tilbud og pris vises tidligere. `/#priser`, pakkeknapper og eksisterende pris-/ordreautoritet endres ikke. |
| `resultater` | Behold; flytt til første seksjon etter Hero | Bruk bare dagens godkjente case/projeksjon. Ingen resultatpåstander, bilder eller H022-design endres. |
| `mekanisme` | Fjern kun plasseringen | Den separate firestegs arbeidsmåteforklaringen utgår fra forsiden; originalen er tilgjengelig i biblioteket. |
| `passer` | Fjern kun plasseringen | Kortere side, men eksplisitt «Passer godt/dårlig»-selvkvalifisering forsvinner herfra. Dette er en bevisst redaksjonell avveining OWNER må godkjenne. |
| `sporsmal` | Behold til slutt | Eksisterende spørsmål og forbehold beholdes; ingen ny FAQ-tekst skrives. |

**Avveining:** A gir en mer direkte reise via dokumentasjon og tilbud, men tar bort interaktiv forklaring, egen tjenestevelger og detaljert målgruppeavgrensning på forsiden. Ingen av disse tekstene flyttes automatisk til andre sider. H024B er fortsatt blokkert.

## B — alternativ med kalkulatoren beholdt

**Hero → Konverteringskalkulator → Kunderesultater → Pakker og priser → Gratis sjekk → FAQ**

Samme handlinger som A, bortsett fra at `regneeksempel` beholdes som første hovedseksjon, slik OWNER sist plasserte den. Fem seksjoner etter Hero i stedet for ni. Besøkeren kan utforske effekten av relevante besøk og konvertering før tilbudet; dette koster omtrent én ekstra kalkulatorhøyde. Det hypotetiske verktøyet holdes tydelig atskilt fra faktiske kundebevis.

## Beregnet sidelengde — ikke en publisert etter-visning

Tallene er regnet fra **målte høyder på dagens faktiske Worker**, med uendret Hero, topp-/bunntekst og seksjonsdesign. De utelatte seksjonenes høyder trekkes fra totalen. Dette er et geometrisk overslag; endelig reflow, avstander og ankermål må verifiseres hvis OWNER senere velger en komposisjon. Vi har ikke fjernet/flyttet seksjoner i kilde, CMS eller live DOM for å lage en etter-visning.

| Bredde | Dagens side | A, beregnet | Reduksjon A | B, beregnet | Reduksjon B |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1440 px | 8 224 px | ca. 4 832 px | 41,2 % | ca. 5 887 px | 28,4 % |
| 900 px | 10 600 px | ca. 6 611 px | 37,6 % | ca. 7 870 px | 25,8 % |
| 390 px | 12 606 px | ca. 7 566 px | 40,0 % | ca. 8 963 px | 28,9 % |
| 320 px | 13 565 px | ca. 8 221 px | 39,4 % | ca. 9 697 px | 28,5 % |

Eksakte summer og metode: [composition-estimates.json](composition-estimates.json). Tallene er ikke et løfte om bedre konvertering.

## CTA, lenker og SEO

- **Ingen CTA-tekst eller lenkemål endres i A eller B.** Hero og øvrige eksisterende sider beholder `/#sjekk` og `/#priser`; begge destinasjoner blir stående én gang og publisert. Ingen automatisk retargeting eller skjemaktivering.
- Ved 390 px blir pristarget beregnet ca. **2 747 px tidligere i A**, **1 349 px tidligere i B**. Sjekk-skjemaet blir ca. **1 545 px senere i A**, **2 943 px senere i B** ved vanlig scrolling, fordi dokumentasjon og tilbud legges foran det. Hero-knappen hopper fortsatt direkte dit. Dette er en konkret ulempe ved rekkefølgen, selv om total side blir kortere.
- Skjul av lokal Top-rad beholder dataene i CMS. Fjerning av de fire globale referansene i A / tre i B sletter ingen original. Det er ikke en instruks om å slette filer eller globale mastere.
- H1, Hero, metadata, canonical og eksisterende ruter beholdes. Færre forsidetekster og tjenestelenker betyr mindre emnedekning her; ingen SEO-forbedring hevdes. Gjenværende synlig FAQ og strukturert data må følge faktisk komposisjon ved en eventuell senere implementering.
- Noindex, robots-sperre, tomt sitemap og deaktivert innsending består. En komposisjonsbeslutning gir ingen launch-/indekseringsautorisasjon.

**Neste beslutning:** OWNER velger A, B eller navngir et annet eksakt sett/rekkefølge. Før det endres ingen live plassering. Separat må OWNER vurdere den polerte CMS-lesbarheten og om den dokumenterte native etikettbegrensningen er akseptabel. H024A3 OPEN, H024B BLOCKED, H022 PARKED.
