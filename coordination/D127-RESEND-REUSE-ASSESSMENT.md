# Resend – faktisk live-ingress og korteste trygge vei

2026-10-23, D-127 N3. **Read-only discovery og minimal plan; ingen aktivering, live POST eller e-posttest.**

## Hva som faktisk kjører

Cloudflare-kontoens Pages-prosjekt **optimalisering-oslo-no** har domenene `optimalisering.oslo.no` og `optimalisering-oslo-no.pages.dev`. Gjeldende vellykkede produksjonsdeploy er **c696c12c-0d01-4834-9717-f54a2c45a80a**, Git **50576b5a2027b9a7f1bd70191a9029f3dc46a89d**, repo **AnelPasic/optimalisering.oslo.no**. Produksjonsmetadata viser miljønavnet `RESEND_API_KEY`; ingen KV-/D1-bindinger. **Ingen hemmelighetsverdier eller reelle lead-data er lest.** Dette dokumenterer konfigurasjonsnavn, ikke nøkkelens gyldighet eller mottak i innboks.

Den deployede kilden [src/pages/api/lead.ts ved eksakt deploy-commit](https://github.com/AnelPasic/optimalisering.oslo.no/blob/50576b5a2027b9a7f1bd70191a9029f3dc46a89d/src/pages/api/lead.ts), blob **2100ad478657def85676ff5325f074cda989700c**, er en eldre Pages/Astro-handler. Den lokale mappen `E:/Codex/optimalisering.oslo.no` har en nyere Worker-/rate-limit-adapter; dens kilde er **ikke** deploybevis. Worker-kandidaten `optimalisering-oslo-production` finnes ikke i den tilkoblede kontoen ved inspeksjon. Nytt reviewmål `optimalisering-oslo-v33` har ingen bindings og er fortsatt static assets only.

| Kontrakt | Faktisk gammel ingress | Nytt nettsted |
| --- | --- | --- |
| Rute | `/api/lead` | Konfigurert `/api/leads` |
| Felt | website/email/challenge/phone/source + company_website_hp | website/email/message/model/source + form/site, package/intent/phone for bestilling og Idempotency-Key-header |
| Betydning | Gratis sjekk, teamvarsel + kundekvittering | Gratis sjekk eller konkret valgt pakke; ingen nye skjemafelt |
| Svar | `{success:true, message}` uten lagret ID | `submitLead` krever HTTP OK + bokstavelig `{ok:true,id:<ikke-tom>}` |
| Global sjekk | Ikke relevant for den gamle klienten | Hard-disabled i `HomeAssessment.astro`, mangler transport |
| Vurdering | Gammel kontrakt avviker | Dagens transport/payload finnes, disabled review |
| Pakke | Ingen ordreintent/pakkenøkkel håndteres | D-122s tre felt og pakkenøkkel beholdes; disabled review |

Det er derfor **ikke** riktig å bytte PUBLIC_LEAD_ENDPOINT til gammel URL og åpne et flagg. Pakke-/meldingsdata ville ikke bli riktig behandlet, og den nye klienten ville avvise responsen.

## Hvorfor den gamle handleren ikke kan gjenbrukes uendret

Kildeinspeksjon av den faktiske deploy-revisjonen viser:

- `sendEmail` kan returnere `success:false`, men begge kallene ignorerer resultatet. Handleren returnerer likevel suksess. Fallback uten konfigurert provider returnerer også suksess. Dette er **ikke** en påstand om at dagens Resend-levering har feilet, men viser at et 200-svar ikke beviser den.
- Ingen varig mottakskvittering, lokal idempotens eller lagring/retry finnes i handleren. Anrop til Resend bruker ikke Idempotency-Key. Kilde har ingen Origin-kontroll eller serverstyrt ratevern i selve funksjonen; eventuell ekstern WAF er ikke undersøkt og skal ikke antas fraværende.
- Rå felt settes inn i HTML og logges med kontaktdata. Ny normalisering, trygg rendering og redigerte driftslogger må vurderes før gjenbruk. Ingen produksjonslogg med persondata er hentet.
- Avsender-/mottakerkonfigurasjon har kilde-fallbacks, men faktisk godkjent, overvåket mottaker og Resend-domain/delivery er **ikke bekreftet**. Gamle kvitteringer inneholder også et to-virkedagersløfte; ikke importer det ukritisk til nye bestillinger.

Resend er fortsatt riktig gjenbruksgrunnlag. [Resends API](https://resend.com/docs/api-reference/emails/send-email) gir provider-ID ved akseptert sending; [idempotensdokumentasjonen](https://resend.com/docs/dashboard/emails/idempotency-keys) beskriver et 24-timersvindu. Provideraksept og idempotens innen det vinduet erstatter verken egen varig mottakslogg eller dokumentert innboksmottak.

## Anbefalt minste løsning etter eget intake-håndoff

**Gjenbruk Resend-konto/domene og eksisterende rene payload-/normaliseringsfunksjoner, men bruk én liten same-origin Worker-handler på `/api/leads` sammen med det nye nettstedets statiske assets.** Ikke start en ny Node/SQLite-host og ikke legg Resend i nettleseren. Den nåværende Pages-handleren er ikke kompatibel eller tilstrekkelig bekreftende, og å gjøre den til separat backend etter domeneflytt gir en ekstra drift-/Origin-/rutingsavhengighet.

1. Behold de tre nåværende UI-ene og alle felt/priser. Koble global sjekk til samme `createLeadPayload`/`submitLead` som vurdering. Bestilling beholder `createOrderPayload` og eksplisitt pakkenøkkel. Ingen company/contact-felt tilbake i UI.
2. Én allow-listet serverkontrakt: gratis-sjekk/pakke-bestilling, gyldige pakkenøkler, normalisert website/email/valgfri melding og dagens påkrevde ordretelefon; origin, bodygrenser, honeypot og egnet ratevern. Shared intake og ordre har separate default-off servergater.
3. Én liten varig mottaks-/idempotens-tabell, for eksempel D1 på eksisterende Cloudflare-konto, med payloadfingeravtrykk, mottaks-ID, notification-status/provider-ID og tidsgrenser. Én stabil retry gir samme ID; annen payload med samme key gir konflikt. Returner `{ok:true,id}` først etter varig mottak. Ingen ny CRM, separat appserver, betalingsløsning eller ny formarkitektur.
4. Gjenbruk Resends API med server-only nøkkel, eksplisitt verifisert sender/mottaker og per-intent mal. Utelat gamle valgfrie company/contact-rader. Lagre/varsle feil uten kontaktdata i logger; avklar én enkel retry-/manuell-feilhåndtering før aktivering. Kundekvittering er eget uttrykkelig innholdsvalg, ikke automatisk import fra gammel side.
5. La gammel Pages-side og dens handler stå urørt gjennom verifikasjon. Test den nye mottakeren isolert med default-off public UI; cutover av domenet og stenging av gamle ruter planlegges eksplisitt, uten blind forwarding av persondata mellom to backend-er.

**Alternativ dersom OPS allerede har en annen dokumentert varig ingress:** bruk den i stedet for D1/ny handler, men bevis kontrakt, retry, Origin og lagring først. Det er ikke funnet slik ingress i dagens deploymetadata/kilde. Dersom eksisterende Pages-endepunkt senere utvides, må endringen være bakoverkompatibel og testes mot gammel klient; denne runden endrer det ikke.

## Fem konkrete forhold før offentlig aktivering

1. **OWNER + OPS:** bekreft faktisk avsenderdomene, godkjent overvåket mottaker, nøkkelansvar og hvilken Cloudflare-ingress som skal eie data etter cutover. Ikke send nøkkel eller kontaktdata i Git/chat. Navn på eksisterende miljøvariabel er ikke nok.
2. **OWNER + STRATEGY_CONTENT:** faktiske kontakt-/personvern-/avtaleopplysninger, behandlings-/lagrings-/sletteansvar og riktig svartids-/bestillingsbetydning. Ny teknisk evne er ikke personverngodkjenning.
3. **IMPLEMENTATION + OPS:** isolert syntetisk sjekk og pakke gjennom den faktiske nye ingressen til den godkjente innboksen. Kontroller emne, valgt pakke, reply-to, telefon, normalisert kilde og at ingen gamle `undefined`-rader eller nye felt dukker opp. Dokumenter provider-ID **og** faktisk mottak; ingen ekte kundedata.
4. **IMPLEMENTATION + OPS:** bevis varig mottak etter restart, retry/dedupe, konflikt, Resend timeout/feil/suppression, ugyldig payload, Origin/ratevern og redigerte logger. Fire eksisterende lokale intake-fixtures bruker tom telefon og må oppdateres til D-122-kontrakten; ingen offentlig åpning med røde mottakstester.
5. **OWNER GO etter bevis:** oppdater korrekt godkjenning/produksjonsguard, aktiver sjekk og ordre separat, kontroller faktisk domene, samme-origin API, bekreftelsesadferd, noindex/index-tilstand og rollback. Ingen av disse flaggene er endret her.

Maskinlesbar kilde-/deploy-/GET-kvittering: `coordination/evidence/d127/resend-discovery.json`. Ingen live POST, provider-kall, secrets read, inbox proof, backendimplementasjon eller drifts-/lanseringsgodkjenning er utført i N3.
