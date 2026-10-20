# H-024B1 — Tjenestesidepilot: trygge CMS-seksjoner på /synlighet/

**2026-10-20 · D-112 · OWNER:** «yep, ser bra ut» som eksplisitt svar på å lukke H-024A3 med dokumenterte begrensninger og gå videre til H-024B. H-024A3 er dermed **OWNER PASS**, med kjente native forbehold. H-024B åpnes **kun for én avgrenset pilot**, ikke utrulling til alle tjenester.

**Pilot:** `/synlighet/` — representativ eksisterende tjenesteside med godkjent designretning/ordlyd, beskyttet `sjekk`-seksjon, kundebevis og prisbro. Målet er **praktisk CMS-redigering uten å ødelegge en fungerende tjenesteside**, ikke en ny tjenesteside eller ny CMS-motor.

## Les først
- Nyeste `main` i både `AnelPasic/optimalisering.oslo.noV3.3` og `AnelPasic/MedonWebSystem` (særlig system `docs/CROSS-THREAD-START-HERE.md`, `docs/CURRENT-STATE.md`, `docs/DECISIONS.md`).
- Pilot `coordination/PROJECT-STATE.md`, `REVIEW-QUEUE.md`, `DECISIONS.md`, `CODEX-TO-CHATGPT.md`, `PRELAUNCH-DELIVERY-RULE.md` og H-024A9-kvittering.
- `app/src/content/pages/synlighet.json`, `app/src/components/ServiceFamilyPage.astro`, `app/src/lib/content-schema.ts`, `app/src/lib/route-family.ts`, `.pages.yml` Tjenester → Innholdsseksjoner.

## Bygg kun den faktiske manglende funksjonen

1. **Ikke dupliser eksisterende CMS.** `Tjenester → Innholdsseksjoner` er allerede en native Pages CMS block-list med Add/Edit og rekkefølge. Gjennomgå hva som allerede fungerer, ikke kopier forsidens tre-soners oppsett ukritisk.
2. **Pilotmål:** på **/synlighet/** skal vanlig lokal innholdsseksjon kunne opprettes/redigeres/flyttes/skjules/vises i eksisterende native CMS, og resultatet skal følge Pages CMS → Git → Worker. Identitet/anker og tekst beholdes under flytting/skjuling. Legg til bare nødvendig typed `visibility`-felt/renderer-filter/validering dersom dette faktisk mangler. Default når felt mangler = dagens synlige utgangstilstand. Ikke gjett nye seksjonsnavn, kommersielle fakta eller reell innholdsordre.
3. **Beskyttet sammensetning må bestå:** eksakt nåværende Hero, FAQ, `sjekk`-identitet/lenker, `prioritering` som referansepunkt for publiserbare kundebevis og `sammenheng` som referansepunkt for prisbro; all eksisterende `composition.service` og `proof`-autoritet må holdes intakt. Ikke la vanlige CMS-operasjoner skjule/fjerne en kilde som gir foreldreløse avhengigheter eller bryter lenker. Hindre dette i begrenset schema-/byggevalidering, eller avgrens kontrollen til virkelig valgfrie seksjoner. Ingen duplisert prismaster, proofdata eller kontaktskjema.
4. **Visuell bevaring:** bruk eksisterende `CommercialHero`, `HomeSection`, `HomeProof`, `ServicePricingBridge`, `Faq` og daisyUI/design-tokens. Ikke redesigne Synlighet eller endre øvrige tjenester. Ikke innfør «globale elementer» på servicesidene bare fordi forsidebyggeren har dem; gjenbruk mastere der det allerede er en konkret semantisk nyttig og trygg kobling.
5. **Neste skalering krever faktisk pilotresultat.** Etter at /synlighet/ fungerer, dokumenter kort hvilke eksisterende kontroller kan gjenbrukes på /konvertering/ og øvrige sider; IKKE endre eller utrull dem i denne oppgaven.

## Arbeidsmåte og QA

- Kontroller fersk `main` og eventuelle ucommittede eller parallelle OWNER Pages CMS-lagringer. Spesielt nyere `global-elements/priser.json`, `resultater.json`, proof-bilder, utsnitt og `home.json`: **ikke overskriv, migrer eller restore fra tidligere revisjoner**.
- Hvis piloten allerede har all nødvendig funksjonalitet: dokumenter det og **ikke skriv unødvendig kode**. Hvis ett isolert hull finnes, implementer minste løsning direkte på `main` innen dette scope.
- Kjør build, fokustester for /synlighet/ og CMS-validitet, ett desktop/mobil smoke. For *ny* visibility-/sorteringfunksjon: én minimal autentisert CMS Save → Git → Worker-verifikasjon, og **reverser bare egne testfelt** hvis de kan identifiseres helt sikkert; stopp fremfor å overskrive OWNER-data. Ikke full 158/196-testkampanje eller screenshotarkiv.
- Ved en lokal CMS-endring: verifiser riktig noindex review Worker `https://optimalisering-oslo-v33.anel.workers.dev/synlighet/` etter native deploy. Ingen produksjonslansering, indeks, reell innsending/POST, nye casepåstander eller oppstart av flere tjenester.
- Kort kvittering øverst i `coordination/CODEX-TO-CHATGPT.md`; oppdater `PROJECT-STATE.md` og `REVIEW-QUEUE.md` med levert/åpent. Rapportér eksakt SHA, hvilke filer, faktisk kjørte kontroller og preview. **STOP for OWNER visuell vurdering av piloten før utrulling.**

## Akseptgrenser
D-112 H-024A3: **OWNER PASS MED KJENTE BEGRENSNINGER**; ikke påstå fysisk muse-drag uavhengig verifisert eller at native Pages CMS forhindrer alle ugyldige klikk. H-024B1: bare /synlighet/-pilot. Andre tjenester/domenelansering forblir uten autorisasjon. Dette gjelder ikke offentlig lansering, indeksering eller aktiv innsending.
