# H-016 — Redigere pakker i Pages CMS

H-016 / D-053–D-057 gjør Pages CMS til normal redigeringsflate for pakketekst og pakkebilder. H-015-motivene beholdes. Dette er fortsatt en forhåndsvisning med noindex og deaktivert bestilling.

## Én innholdskilde

Åpne **Forside og felles pakker → Forsidens innhold → Felles pakker for forsiden, /priser/, /synlighet/ og /konvertering/**. Data lagres i `app/src/content/pages/home.json`, under `homepage.packages`.

Forsiden og `/priser/` bruker samme komponent og alle tre pakkeobjektene. Forsidens detaljer er lukket ved innlasting; prissidens detaljer er åpne og kan lukkes. Presentasjonsmodus styres i kode. Serviceprisene og gjentatte pris-/kostnadsopplysninger arver samme kilde; serviceinnholdet har fortsatt sine egne godkjenninger.

## Redigerbare felt

| Gruppe | Felt og bruk |
| --- | --- |
| Felles seksjon | Overtekst, overskrift, innledning, Passer for-/omfangs-/arbeidsområdeetiketter, fire arbeidsområder og grunnlag for måling/sporing. Kortetikettene ligger i `labels`. |
| Felles kostnadsregler | Annonsebudsjett, eksterne kostnader, separat arbeid og ubrukt kapasitet. Prissidens kostnadsseksjon og gjentatte FAQ-opplysninger arver disse feltene. |
| Prissidens valg/forklaring | Valgstripens overskrift og tre valgregler; multiplikatorens overtekst, overskrift, brødtekst, konseptrekke og støttetekst. |
| Hver pakke | Navn, oppsummering, kort/full Passer for, korte/fulle situasjoner, typisk virksomhet, omfang, valgregel, prisnotat og valgfri Ekstra forklaring. |
| Pris/anbefaling | Numerisk månedspris, valgfritt `fra` for Partner, prisenhet, MVA-tekst, anbefalt-flagg og merke. Bruk samme MVA-tekst på alle tre pakker, fordi den felles forklaringen gjelder alle prisene. |
| Ikoner | Velg generisk ikon, kort etikett, full etikett og valgfri forklaring per oppføring. Kort etikett vises i beslutningskortet; full etikett/forklaring vises i detaljene. |
| Handlinger | Bestillingsknappens tekst og detaljteksten. `detailLink.label` er teksten i det native detaljfeltet på begge sider; standarden er «Se pakken». |

Tre pakker i eksisterende rekkefølge, fire arbeidsområder og tre valgregler beholdes. Korte situasjoner har én til tre oppføringer; full liste og ikonliste har minst én. Nødvendige korte tekster og handlingsetiketter må være utfylt. Pris er et positivt heltall. Fjern et valgfritt objekt helt når det ikke skal brukes. Prisnavn, priser og tilbudslogikk i denne leveransen er bevart; D-054 gir OWNER kontroll over feltene.

Pakkenøkkel, bestillingslenkens pakkevalg og detaljanker er readonly. Innholdsskjemaet avviser også endringer i disse. Formens intensjon, transport og endepunkt finnes fortsatt bare i kode. Gjeldende detaljankre er `/priser/#optimalisering`, `/priser/#begge` og `/priser/#partner`.

## Ett uavhengig bilde per pakke

Under **Eget pakkebilde** velges/lastes opp SVG, WebP eller PNG fra mediekilden `packageVisuals` (`app/public/images/pricing`, offentlig `/images/pricing`). Fyll inn sannferdig alternativ tekst. Horisontalt/vertikalt utsnitt er 0–100 %, med 50 % som standard når feltet mangler. SVG vises med `contain`; raster med `cover` og valgt utsnitt.

Uten et gyldig lokalt bilde vises pakkens valgte SVG-motiv (`controlled`, `accelerating`, `tracks`). **Bildetekst ved SVG-motivet** redigeres separat som HTML-etikett og valgfri støtte. Et eget bilde erstatter både standardmotivet og dets bildetekst og bruker sitt eget alt-/utsnittsfelt. Én pakke kan bytte bilde uten å endre de andre eller layoutkoden. Hele referansekort skal ikke lastes opp som pakkebilde.

## Verifikasjon og historikk

`npm run verify` kontrollerer gjeldende CMS-felt, beskyttede ruter, begge visningsmoduser, pris-/kostnadskonsistens, godkjent støtteinnhold, proof-vern og deaktivert bestilling. Tidligere H-012/H-014/H-015-auditer og Git/evidenshistorikk beholdes som historiske kontrakter; deres eksakte tekst-/lukket-tilstandslåser er erstattet i det aktive byggløpet av H-016. De kan derfor ikke blokkere normal OWNER-redigering av feltene D-054 åpner.

Den reversible regresjonen `node scripts/qa-h016-package-source.mjs` endrer trygg tekst, etiketter, priser/enheter, anbefaling, motiv/bildetekst og bildevalg lokalt, kjører full verifikasjon og kontrollerer begge sider ved 1440/390/320. Originale innholdsbytes gjenopprettes, og testbilder fjernes i `finally`; kjør `npm run verify` etterpå for å bygge gjenopprettet innhold. Dette er en teknisk innholdstest, ikke en autentisert CMS-lagring.

`qa-pricing-h016.mjs` er en leveransekontroll mot den innkommende H-015-baselinen, inkludert nøyaktige H-016-standardtekster. Den er bevisst ikke en del av normal CMS-byggverifikasjon etter senere OWNER-redigering.

## Autentisert kontroll — gjenstående OWNER-steg

2026-10-09: Den tilkoblede nettleseren åpnet `https://app.pagescms.org` og ble sendt til `https://app.pagescms.org/sign-in?redirect=%2F`. Ingen autentisert editor var tilgjengelig. Feltskjema og ekte lokale bygg er kontrollert; live editorvisning, opplasting og save/revert er ikke bevist.

1. Logg inn i Pages CMS med GitHub og velg `AnelPasic/optimalisering.oslo.noV3.3`, gren `main`.
2. Åpne pakkenes redigeringsgruppe. Kontroller de redigerbare tekst-/liste-/objektfeltene og at key/href er readonly. Åpne bildevelgeren og bekreft `packageVisuals`.
3. Endre én harmløs SVG-bildetekst/støttetekst, lagre, og vent på tilkoblet Worker-bygg. Bekreft endringen på forsiden og `/priser/`.
4. Gjenopprett teksten, lagre igjen og bekreft begge sider. Registrer de faktiske commitene og utfallet i koordineringen.

Rutinemessig pakketekst-/bildetuning skjer nå i CMS. Beslutningshistorikk, øvrige innholdslåser, servicebilder, proof og produksjons-/intakeporter består. H-016 stopper for OWNER-review og registrerer ingen ny materiell godkjenning.

Konfigurasjonsdetaljer ble kontrollert mot offisiell Pages CMS-dokumentasjon: [readonly/nestede felt](https://pagescms.org/docs/configuration/content/fields/), [bildevelgerens media/extensions](https://pagescms.org/docs/configuration/fields/image/) og [mediekilder](https://pagescms.org/docs/configuration/media/).

Nedtrekksfelt bruker dokumentert [options.values](https://pagescms.org/docs/configuration/fields/select/). De tre pakkefeltene (ikon, motiv, fra-prefiks) og den arvede bildeklassekonfigurasjonen er korrigert til dette formatet, med samme tillatte verdier. Sistnevnte er en nødvendig konfigurasjonsreparasjon for en gyldig CMS-konfigurasjon; tjenesteinnhold og bilder er uendret.
