# H-022C — Kunderesultater: visuell revisjon før implementeringsgodkjenning

**Dato:** 2026-10-19
**Beslutning:** D-106 — OWNER: «Ja kjør på» etter konkret gjennomgang av visuelt svak «Kunderesultater» og ønsket neste steg.
**Autorisasjon:** Kun EN isolert, faktisk rendret visuell prototype + skjermbilder/rapport i egen Git-branche. Ikke erstatte gjeldende Worker-forside eller slå sammen kode til `main` før separat OWNER-aksept.
**Startpunkt kontrollert:** Pilot `main` 102bc7edf0db36817895f25b051a195c26268bee; MedonWebSystem `main` `b6ddf7fca243f8bc78c061a157bda0bdfbe1ee69`. Hent ferskeste SHAs og kontroller samtidige OWNER-lagringer.
**Aktiv arbeidsgren foreslått:** `proposal/h022c-proof-showcase`. Bruk eksisterende review-mekanisme om mulig, uten å endre dagens review Worker.

## 1. Problem og ønsket resultat

OWNER sier dagens «Kunderesultater» ser tilfeldig sammensatt ut. H-022s forrige tekniske leveranse har faktisk et stort produktbilde av et telt, en løs ROAS-flate, en separat lilla stripe for annonseforbruk og to kompakte, strukturelt ulike øvrige casekort. Teknisk verifisering av det gamle oppsettet er ikke visuell OWNER-godkjenning.

OWNER ønsker:
- Ett sammenhengende, lett forståelig **Eurotents-case**, der dokumenterte resultater og nettstedskontekst hører sammen.
- **Et reelt skjermbilde av Eurotents-nettsiden**, IKKE produktfoto av telt. Dette er en eksplisitt endring fra gammel H-022-presentasjonsretning.
- **Nysta og Helt Opplagt** som to tydelig balanserte støttekort med konsistent informasjonsarkitektur.
- Mer samlet og tillitvekkende komposisjon, god luft, klar kontrast og ett hierarki. Ingen ad hoc mosaikk av nesten tomme mint/lilla fliser.
- Bruk tidligere godkjent Optimalisering Oslo farge-/typografi-/radius-/spacing-system og faktiske daisyUI Card-primitiver der de passer. Ikke oppfinn ny merkevare eller endre resten av siden.

Viktig: Dette er et **nytt visuelt REVIEW-gate**, ikke en H-022 full CONTENT PASS eller global H-024A3 godkjenning. Tidligere `coordination/H022-PROOF-PRESENTATION.md` forblir historisk grunnlag for proof-autoritet; denne kontrakten overstyrer KUN valgt bilde og visuell komposisjon i den nye prototypen.

## 2. Låst innhold, dokumentasjon og semantikk

**Ikke åpne innholdsforskning eller endre publiseringsautoritet.** Bruk eksisterende approved public projection, source registry, names/periods, begrensninger og casevalg:
- **Eurotents** — Google Ads, ROAS `4,3x → 17,2x`, sammenligning **april 2025 mot april 2026**, støtte `20 % lavere annonseforbruk`. ROAS gjelder Telt-kampanjen; ikke påstå at én isolert handling skapte hele effekten.
- **Nysta** — fullført checkout blant dem som startet checkout `7,1 % → 43,6 %`, 30-dagersperiodene fra den godkjente posten. Ikke omdøp kunden til gamle «Strikka» eller tolk dette som generell nettstedskonverteringsrate.
- **Helt Opplagt** — organiske klikk `2 162 → 4 181` / `+93 %`, Google Search Console, mars–september 2025 mot samme periode 2026; IKKE påstå 93 % mer salg eller leads.
- Behold alle eksisterende synlige kilde-/målelabels og periodeopplysninger. Hvis layouten trenger kortere etiketter, vis forslag separat og STOP før endring av godkjent tekst. Begrensninger/provenance forblir i sine autoritative filer og skal ikke oppgraderes eller skjules på uredelig måte.
- Ingen nye prosentberegninger, tredjemåltall, garantier, kundeuttalelser, oppdiktet før/etter-graf, KPI-kilde eller uautorisert «Les case»-lenke. Ikke endre hva som er publiserbart.

Autoritative filer:
`app/src/content/global-elements/resultater.json`,
`app/src/content/proof/{eurotents,nysta,helt-opplagt}.json`,
`app/src/lib/proof.ts`,
`app/src/lib/proof-presentation.ts`,
`app/src/components/HomeProof.astro`.
Se også `coordination/H022-PROOF-PRESENTATION.md` og `coordination/evidence/h022-revised/README.md`.

## 3. En konkret visuell løsning som skal prototypes

Utform **én gjennomarbeidet anbefalt retning**, ikke en lang rekke nesten like varianter.

### Desktop: ett redaksjonelt hovedcase

Overskriften `Dokumenterte resultater / Resultater fra kundearbeid` fra nåværende CMS bevares. Skap passende avstand før kortene.

Hovedcase skal lese som **ett objekt** med én felles flate og innebygget hierarki, ikke tre sideordnede kort:
- **Nettstedsvisning** i én del (ca. 35–45 % av bredden, men tilpass faktisk viewport og nettsideskjermbilde). Lett browser-/website-ramme om det gjør en nettside tydelig; ingen fancy falsk analytics-UI.
- **Tekst/resultatdel** i den andre delen med Eurotents som avsender, Google Ads/Telt-kontekst, tydeligst `4,3x → 17,2x` og datoperioder under, `20 % lavere annonseforbruk` som sekundær linje/kompakt aksent i SAMME caseflate.
- Hele caset skal se naturlig og godt balansert ut med lesbar kontekst, ekte whitespace og god optisk justering. Ikke sentrerte tall midt i et stort tomt rektangel. Ingen dominerende ekstra lilla bannerflate.
- På mobil: bilde og resultat stables i riktig leseorden; **resultatet må ikke begraves under et svært høyt nettsideskjermbilde**. Vurder resultat først dersom det gir raskere forståelse.

### Under: to samordnede støttecase

Nysta og Helt Opplagt i to likeverdige moduler:
- samme overskriftsplassering, kilde-/måletikett, hovedendring, før/etter og periodehierarki;
- ikke gi dem oppdiktede kunde- eller produktbilder;
- god lesbarhet i én kolonne på smal mobil;
- tall presenteres naturlig, uten skjulte enheter eller generiske «dashboard badges».

### Nettsideskjermbilde — innhold, ikke proof-kilde

1. Ta et reelt, datert browser-skjermbilde av den **faktiske offentlige Eurotents-nettsiden**, `https://eurotents.com/` (eventuelt riktig offentlig kommersiell landingsside hvis det kan begrunnes), ikke dagens teltbilde som allerede ligger i `/images/proof/eurotents-ask-review.webp`.
2. Ikke fabrikkér screenshot, redesign nettstedet i bildet, bruk stockbilde eller klipp det ned til bare et teltfoto. Vis nok faktisk nettside-UI/branding til at det fremstår som nettsideskjermbilde, uten browser-persondata eller uvedkommende interaksjoner.
3. Lag review-optimalisert lokal WebP i **egen prototypgren** og dokumenter original URL, dato, capture viewport, lokale hash, alt og eventuelle medie-/rettighetsforbehold. Dette er presentasjonsmedia, ikke dokumentasjon på ROAS eller godkjent for produksjon.
4. Prototypen må bruke eksisterende trygge `featuredVisual`-arkitektur og fallback. Ikke endre bevisregister/evidence-gates eller opprett ny duplisert media authority. Den gamle brukerfotoressursen forblir intakt på `main` mens ny visning avventer valg.
5. Dersom autentisk nettstedskjermbilde ikke er tilgjengelig: STOP og rapporter, ikke bruk teltfoto som erstatning.

## 4. Isolasjon og Codex arbeidsflyt

1. Les først begge repos canonical oppstart/status/decisions (system `docs/CROSS-THREAD-START-HERE.md`, `docs/CURRENT-STATE.md`, `docs/DECISIONS.md`, pilot `coordination/PROJECT-STATE.md`, `REVIEW-QUEUE.md`, `DECISIONS.md`, `CHATGPT-TO-CODEX.md`, `CODEX-TO-CHATGPT.md`). Kontroller fersk HEAD og ucommittede brukerfiler.
2. Bevar den ferdige H-024A8G-forsiden B, alle CMS globale mastere, OWNER test Top, Hero, kalkulator, pakker, vurderingsskjema, FAQ, SEO, CTA-ankre og andre ruter. `H-024A3` OPEN, hele editor OWNER PASS pending, `H-024B` BLOCKED. Ingen offentlig intake/indeksering/domene-endring.
3. Opprett egen isolert `proposal/h022c-proof-showcase` branch fra fersk `main` (eller foreslå annen eksplisitt trygg branch ved konflikt). Ikke endre `main` produktkode eller bytt Worker-versjonen uten OWNER review.
4. Bygg det minste faktisk rendrbare proof-showcase-utkastet i denne branchen. Begrens foreløpig kode til homepage-`primary=false` proof-komposisjon, nødvendig review-media og målrettede tester. Den delte komponentens service-`primary=true` layout skal forbli uendret. Ingen ny universell refaktor eller konkurrerende designsystem.
5. Lever **før/etter skjermbilder i realistisk forsidekontekst**: 1440, 900, 390 og 320 px. Vis én hel eller tilstrekkelig lang forside med kalkulator **før** resultater og priser **etter**, samt lesbar detaljvisning av proof-seksjonen, så visuell balanse kan vurderes. Screenshots må være fra faktisk lokal/prototype-rendering, ikke Figma-beskrivelse eller AI-generert bilde.
6. Lag `coordination/evidence/h022c/README.md` med resultat, billedkilde, visuelle avveininger, kompatibilitet og før/etter sammenligning, testlogg og relevante screenshots/lenker. QA minst: alle godkjente caseord/tall/enheter/perioder identiske, fallback uten medieasset, ingen klipping/overflow/duplikat-ID/H1, 320/390 mobil, tastatur/tilgjengelighet, ingen JS-feil eller POST.
7. Kjør fokusert test/byggekontroll på prototypgrenen. Full `npm run verify` først når løsning kan vurderes som faktisk implementeringskandidat, og rapporter reelle resultater; påstå ikke Cloudflare native deployment hvis den ikke er utført.
8. Push prototypgren, oppgi commit SHA og GitHub-lenker til desktop/mobilbilder + evt. **separat** trygg forhåndsvisning dersom eksisterende etablert støtte finnes. Ikke deploy over `https://optimalisering-oslo-v33.anel.workers.dev/` og ikke merge til main. Alternativt om teknisk branch-push ikke er tilgjengelig, dokumenter hvorfor og STOP — ikke gjør ensidig prod-endring.

## 5. STOP / OWNER design gate

STOP etter faktisk renderbart designforslag og screenshotbevis. OWNER skal få se, ikke bare lese om, retningen og kunne gi `PASS` eller `REVISE`.

**Ikke tolk** «Ja kjør på» som godkjenning av ferdig visual eller produksjonsmedia. Etter visuell OWNER PASS kreves separat avgrenset implementerings-/merge-/native Worker-verifikasjon. Det er ikke full CMS-editor PASS eller lanseringsautoritet.

Sluttmelding:
- GitHub branch + eksakt commit, relevante screenshots (desktop/mobil) og eventuell isolert preview;
- hva er annerledes enn gammel H-022, og hvorfor leses Eurotents som ett case;
- hvilket faktisk Eurotents-nettsted ble fanget, kilde/tid, visuell fallback;
- tester som KJØRT vs IKKE KJØRT, bevaring av tall/proof, service-komponent og resten av B;
- **STOP: OWNER PASS/REVISE av H-022C visual prototype.**
