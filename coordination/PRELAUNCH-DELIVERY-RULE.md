# Arbeidsregel før lansering — D-107

OWNER: «Vi jobber på en ikke publisert løsning, det bør ikke brukes masse tokens på tester og screens, det kan jeg ordne visuelt når den publiserer ... Den kan frem til lansering publisere alt med en gang så lenge den endrer kun det vi ber om.»

## Standard for avgrensede, lavrisiko endringer
1. Les fersk GitHub-main og oppgaven. Bevar eksisterende OWNER/CMS-endringer. Endre KUN det OWNER har bedt om.
2. Commit/push og publiser umiddelbart på etablert **noindex Cloudflare review Worker**, uten separat prototypgren, omfattende design-gate eller forhåndsgodkjenning for hver liten justering.
3. Test etter risiko: Git diff-kontroll, build, relevante fokustester hvis aktuelt, rask visuell smoke på desktop og mobil ved layoutendringer, bekreft faktisk Worker-build/deploy. OWNER gjør den detaljerte visuelle gjennomgangen på publisert preview.
4. Ikke som standard kjøre 158 tester, 196 typografigrupper, mange skjermbildebredder, full artefakt-sammenligning, CMS Save/revert eller lange evidensrapporter for en vanlig innholds-, bilde- eller CSS-endring. Utvid kun ved faktisk risiko, avhengighet eller feil.
5. Sluttkvittering: endringer, kjørte kontroller, commit SHA, Worker URL og eventuelle avvik. Ingen kunstig PASS for tester eller deploy som ikke faktisk er kjørt.

## Grenser
Dette gjelder **preview**, IKKE produksjonslansering, offentlig domene, indeksering, aktiv innsending, sikkerhetsoppsett eller uklar pris/proof-autoritet. Eksisterende case-data, kunderettigheter, beskyttede CMS-mastere, skjema/CTA og godkjent design beholdes uten eksplisitt endringsønske. H-024A3 er fortsatt OPEN, H-024B BLOCKED. Endringer med høy risiko (skjema, autentisering, CMS-data-/skjemamigrering, priser, resultatgodkjenning, sikkerhet, produksjonslansering) krever særskilt beslutning og dypere tester.

Denne prosjektspecifikke OWNER-beslutningen følger prinsippet i MWS-014: QA står i forhold til risiko. D-107 overstyrer D-106s særskilte ekstra prototyp-/screenshot-gate for H-022C, ikke tidligere dokumenterte fakta eller sikkerhetskrav.
