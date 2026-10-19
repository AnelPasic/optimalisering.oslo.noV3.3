# H-022E — Malvelger for Kunderesultater i Globale elementer

**OWNER 2026-10-20 · D-110 · IMPLEMENTER OG PUBLISER PÅ NOINDEX REVIEW WORKER.**

OWNER har vurdert eksisterende «Vekslende liste» og «Bildekort» på `/design-system/` og ønsker **Vekslende liste som standard** med mulighet til å velge **Bildekort** direkte under **Pages CMS → Globale elementer → Kunderesultater**. Hensikten er å bytte samme godkjente caser mellom to allerede eksisterende visuelle oppsett, uten ny spesialdesignet proof-komponent eller nye Codex-runder for malbytte.

Gjeldende baseline ved instruksjon: pilot main `d8ae8d1a5d7efac4c4fa843cdfbdbe3738d862b3`, system main `b6ddf7fca243f8bc78c061a157bda0bdfbe1ee69`. Begge må leses ferskt før endring. **Autorisasjon gjelder kun denne seksjonen og begrenset CMS-presentasjonsmodell.** D-107 gir direkte publikasjon på eksisterende ikke-indeksert review Worker etter relevant QA; ingen ekstra design-gate.

## Leveranse — redigerbar mal, samme innhold

1. I `.pages.yml` for `globalProof`, under `content`, opprett et **enkelt select-felt** med norsk etikett **«Visningsmal»** og nøyaktig to valg:
   - **«Vekslende liste»**, lagringsverdi `alternating`, standard og valgt i `app/src/content/global-elements/resultater.json`.
   - **«Bildekort»**, lagringsverdi `mediaCards`.
   Valg skal lagres i den ene globale masteren og brukes der denne seksjonen rendres på forsiden. Ikke knytt malvalg til page placement eller legg til ekstra navneregister.

2. Bruk faktisk visuell grammatikk og semantisk struktur fra **`/design-system/` → Vekslende liste / Bildekort** (kilde `app/src/components/PageList.astro` og design tokens). Disse er for tiden artikkel-PageList-oppsett. **IKKE mat proof inn i PageList sin artikelldatakilde**, og ikke ta med «Les guide»-lenker eller oppdiktede case-URL-er. Del helst eksisterende presentasjonsprimitive/klasse-regler mellom listene og proof dersom det kan gjøres smalt og uten å endre artikkel-listene; alternativt minimal ekvivalent Tailwind/daisyUI-komposisjon, dokumenter eventuell liten nødvendig proof-spesifikk forskjell. Målet er faktisk layout-paritet, ikke enda en egen proof-card-mosaikk.

3. **Vekslende liste (default):** Eurotents, Nysta og Helt Opplagt i godkjent caseIds-rekkefølge, hver med bilde og tilhørende caseinnhold på alternerende side når bilde finnes. Mobile stack med tydelige måltall. Kilder, før/etter, perioder og eventuelle godkjente deltatall forblir lesbare. Første visning skal ikke tvinge alle tre casene inn i lik bildestørrelse dersom bilde mangler.

4. **Bildekort:** De samme tre casene i eksisterende bilde-kort-mønster, med bilde over tekst når et reelt casebilde finnes. På mobil stable kortene. Uten bilde rendres et pent, kompakt **tekstbasert Card uten falsk illustrasjon, tomt bildeområde eller oppdiktet ikon**. Ikke generer stockbilder.

5. **Bilder redigeres i samme globale element**, per case. Bruk eksisterende `proofImages` media-folder og trygge `featuredVisual`-prinsipper (src, alt, positionX/Y, sanne bildebaner og optional/fallback). Eurotents har allerede et **OWNER-valgt bilde**: `app/public/images/proof/eurotents.jpg`, valgt av Pages CMS-commits `df8303d` og `adab003`, nå `featuredVisual.src="/images/proof/eurotents.jpg"` og X/Y=50/50. **Ikke overskriv eller gjeninnfør det gamle skjermbildet.** Suppler med valgfrie bilder for Nysta og Helt Opplagt, knyttet entydig til stabil `caseId`, uten å duplisere casetekster, bevis eller redaktørens casevalg. Design en liten ryddig, typevalidert per-case mediamodell; unngå dobbeltkilde for Eurotents og ukontrollert duplikat-case-ID. Nye bildefelt er valgfrie og trenger ikke fylles før visning.

6. **Malbyttet må være reversibelt og tapsfritt.** Samme `caseIds`, proof-data, godkjenning/permission og opplastede bilder ved skifte `alternating ↔ mediaCards`. Nytt felt må fungere ved fersk last uten felt (backward-compatible default), og ugyldige layout-/medieverdier skal ikke lekke uautorisert innhold. Homepage `primary=false` bruker feltet; eksisterende `primary=true` service-side proof må holde samme visning uansett globalt malvalg.

## Hard scope og bevaring

- Behold eksisterende `resultater` master-id/UUID, øvrige sju globale mastere, alle case-kilder/verdier/perioder/permission/evidence og øvrige CMS-lagringer. Ikke endre eksisterende Eurotents bilde/crop eller annen OWNER-data. De godkjente resultatene er: Eurotents ROAS 4,3x→17,2x og 20% lavere annonseforbruk; Nysta checkout 7,1%→43,6% (blant checkout starters); Helt Opplagt organiske klikk 2162→4181 (+93%). Bruk eksisterende publiserbare projection, ikke hardkode nye resultater.
- Behold forside B: Hero, kalkulator, **Kunderesultater**, priser, sjekk, FAQ; alle ankre, skjema/CTA, SEO, andre ruter, og OWNER lokal `forbehovsvelger` skjult/intakt.
- Ikke bytt navn på resultater, lage «Les hele caset»-lenker eller vise uautoriserte case. Ikke endre proof-registerets publiseringsregler. Ingen bred daisyUI/Pages CMS-ombygging, ny global designfamilie eller artikkel-PageList-regresjon.
- Alle valg gjøres via ekte Pages CMS, ikke med hardkodet frontend-toggle eller dobbelt konfig.
- Noindex review Worker er eneste godkjente deploy; ingen produksjonslansering, indeksering, lead-POST, H-024B eller generell H-024A3 PASS.

## Effektiv verifikasjon (D-107, men faktisk CMS-funksjon)

1. Kontroller fersk main og diff. Lokal `npm run build` + fokuserte tester for 2 maler, default, med/uten casebilder, korrekte publiserte proof-regler, caseorden og unchanged service proof.
2. Fordi dette er en **ny Pages CMS-funksjon**, kontroller feltet i fersk autentisert CMS, lagre ett ekte malbytte og bekreft at valgt oppsett faktisk kommer frem i review Worker; gjenopprett deretter `alternating` som standard, uten å endre OWNER-bildet/øvrige felt. Hvis ekte CMS Save ikke kan testes, rapporter begrensningen og be om OWNER kontroll; ikke påstå CMS roundtrip.
3. Rask desktop + mobil smoke av standard og bildekort, inkludert ingen bilde fallback, periode-/kildeverdier, overflow, og kort kontroll av eksisterende artikkel-PageList. Ikke stort screenshot/evidens-arkiv eller full 158/196 testkampanje.
4. Commit/push kun nødvendige produktfiler og kort koordinasjon. Bekreft faktisk native Cloudflare build og fungerende Worker-URL `https://optimalisering-oslo-v33.anel.workers.dev/#resultater`. Slutt med commit, URL, malfeltnavn, hvilke tester faktisk ble kjørt og eventuelle avvik. OWNER vurderer visuelt på live preview.

## STOP bare ved reelt hinder

Hvis malene ikke kan vises med nødvendig reell komposisjonsgjenbruk uten å endre PageList på uakseptabel måte, eller om Pages CMS-bilder/CASE-ID kobling krever en risiko som ikke løses i smalt scope: STOP med presist teknisk problem og minste alternativ. Ikke bygg et nytt system. Ellers gjennomfør og publiser på review Worker direkte.
