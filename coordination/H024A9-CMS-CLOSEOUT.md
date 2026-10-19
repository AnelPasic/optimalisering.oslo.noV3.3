# H-024A9 — Avslutt gjenstående Pages CMS-gate (H-024A3)

**2026-10-20 · OWNER: «gå videre med de gjenstående CMS-punktene»**. Kort, evidensbasert sluttkontroll av **eksisterende** Pages CMS, ikke ny implementering av Page Builder. Følg D-107 (risikobasert, ingen kostbar QA-kampanje). Før oppstart: les fersk main og MedonWebSystem docs/CROSS-THREAD-START-HERE.md, docs/CURRENT-STATE.md, docs/DECISIONS.md; deretter coordination/PROJECT-STATE.md, REVIEW-QUEUE.md, DECISIONS.md, CODEX-TO-CHATGPT.md, PRELAUNCH-DELIVERY-RULE.md. Incoming hovedgren ved oppdragsoppretting: `431ee227a1e166ee5a4011a7eedee8e0a4c5544a`, men bruk FERSK SHA. Flere OWNER Pages CMS-prisendringer er allerede kommet inn etter H-022E; **ikke reset, oppdater eller overskriv disse**.

## Det som allerede er levert (ikke test på nytt uten konkret grunn)
- H-024A8E: ekte `Globale elementer` med åtte typed, UI-beskyttede mastere; Hero fast først; tre sorterbare lister Topp/Hoved/Bunn; lokale `Innholdsseksjoner`; global referanse/flytt/skjul/fjern/gjenopprett. **Ekte autentiserte CMS-save → Git → native build → Worker → restore** finnes dokumentert i `coordination/evidence/h024a8e/README.md`. Normal lokal opprettelse/redigering/skjuling/fjerning er allerede testet.
- D-103: OWNER bekreftet at faktisk lagret rekkefølge samsvarer i Pages CMS og nettsiden.
- H-024A8F/D-104: den gjentatte hjelpeteksten er fjernet; sammenfoldede rader kan vise teknisk ID på grunn av dokumentert stock Pages CMS-grense. OWNER aksepterte denne begrensningen i D-105. **Ikke lag et parallelt navneregister, fork eller DOM-hack.**
- D-105/H-024A8G: OWNER har valgt og fått levert kortere forside B. Ikke reverser den.
- H-022E: ekte CMS-malvalg Vekslende liste/Bildekort + media er testet med CMS Save/restore. **Nyere OWNER-innhold er autoritativt**; aldri still tilbake til H-022E-testfixturen.
- H-024A7: kontaktens split/horisontal og FAQ-bredde har egne native CMS-save/restore bevis. D-088: Hero-variantene er OWNER-godkjent.

## Faktiske gjenstående CMS-punkter
1. **Whole-editor UX/OWNER-gate H-024A3:** Kan OWNER enkelt finne, forstå og redigere et globalt element og lage/endre/flytte/skjule/fjerne en vanlig lokal seksjon på forsiden? Bekreft at original Page Builder ikke har gammel `Faste seksjoner` fra stale editorfane, og at riktig editor i fersk innlogget fane viser Hero + Topp/Hoved/Bunn + globalbibliotek. Basér deg på siste native evidens. Ikke utled OWNER PASS av tekniske tester eller av at OWNER har redigert bare en global master.
2. **Ekte mus/peker-drag UX, hvis viktig for OWNER:** Native tastatur-reorder og CMS-save→site er bevist, mens faktisk muse-drag bare er sett med drag-håndtak / ikke pålitelig automatisert. Ikke påstå muse-drag PASS uten faktisk observasjon. Ingen ny egen dragmotor. Hvis manglende muse-drag er eneste uavklarte kontroll, be OWNER om én kort manuell test, ikke et nytt automatiseringsprosjekt.
3. **Native forbehold/risk:** CMS kan fremdeles akseptere Clear/Replace/dobbel plassering i visse rader, men bygget har strenge guards som avviser ugyldig publisering. Dette er dokumentert/akseptert i tidligere valg; rapporter kort som kjent stock CMS-risiko, ikke som ny bug eller usynlig «hard» beskyttelse.

## Codex konkret arbeid
A. Gjør en **kort read-only statusaudit** av fersk main: samsvar mellom `.pages.yml`, nåværende `home.json` og de åtte globale masterne, eldre native bevis og kjente åpne punkter. Bruk eventuelt én fersk autentisert editor-lesning om nødvendig, uten Save/clear/restore/ny seksjonsopprettelse dersom tidligere test dekker den.
B. Skill tre kategorier: `VERIFISERT FERDIG`, `KJENT/OWNER-AKSEPTERT BEGRENSNING`, `TRENGER FAKTISK OWNER UX-PASS`. Ikke lag lange rapporter, nye screenshots eller full 158/196-testkampanje for å gjenta allerede bekreftet atferd.
C. Bare ved **reproduserbar ny funksjonsfeil**: identifiser minimal konkret rettelse og omfang. Små feil innen den godkjente CMS-overflaten kan håndteres etter D-107 med målrettet test og review Worker. **Stopp før CMS-migrasjon, global redesign, endring i data/autoritet eller utvidelse til andre sider.** Ingen produktkodeendringer bare for å «få noe gjort».
D. Skriv kort beslutningsklar kvittering øverst i `coordination/CODEX-TO-CHATGPT.md`, og synkroniser topplinjer i `PROJECT-STATE.md` og `REVIEW-QUEUE.md` for det som faktisk er verifisert. Eventuell OWNER-beslutning må registreres som PENDING inntil eksplisitt PASS kommer. Ikke lukk H-024A3 på egen hånd.
E. Svar med én kort OWNER-kontroll: vis Pages CMS (lenke fra evidence) og spør om **hele denne redigeringsflyten er brukbar** eller hvilken *konkret* handling som ikke fungerer. Ett konkret svar skal være nok hvis native bevis dekker resten. Ikke still masse trivielle spørsmål.

## Gate og avgrensning
- H-024A3: OPEN inntil faktisk OWNER PASS på samlet editoropplevelse. H-024B: BLOCKED inntil separat OWNER-godkjenning/implementeringskontrakt. Ikke tolk forespørselen om å «gå videre» som lansering eller H-024B-pass.
- Bevar den nyeste OWNER-redigerte `priser.json`, `resultater.json`, nye bilder, home.json, åtte masteres unike data, priser, casefakta, CTA, skjemastatus og godkjent designsystem. Ingen blind restore.
- Eksisterende review Worker forblir noindex, robots sperret, leadinnsending deaktivert.
