# Pages CMS: redigering og review-bygg

H-017B bruker samme innholdsfiler og samme statiske review-Worker. Nettstedet har fortsatt noindex og deaktivert innsending. OWNER skal gjennomgå CMS-opplevelsen etter den tekniske leveransen.

## Finn innholdet

Velg `AnelPasic/optimalisering.oslo.noV3.3`, gren `main`.

- **Forside** redigerer `home.json`, inkludert felles navigasjon, hero-bilde og **Forsidens innhold → Felles pakker**. Pakker finnes bare her og brukes også på pris- og tjenestesidene.
- **Tjenester** inneholder Synlighet, Konvertering, SEO, AI-synlighet og Nettbutikkoptimalisering.
- **Priser**, **Om tjenesten**, **Optimaliseringssjekk**, **Kontakt**, **Personvern** og **Vilkår** åpner hver sin eksisterende fil.
- **Innsikt** inneholder oversikten og de to eksisterende artiklene.
- **Case/evidens (intern)** er et internt register. Lagring eller vellykket bygg gir ingen tillatelse til publisering av bevis.
- **Media** har de eksisterende bildeområdene, inkludert eget område for pakkebilder.

SEO er gruppert. Hero-tekstens Overtekst, Hovedoverskrift og Ingress følger hverandre; den eksisterende flate datamodellen beholdes. Lister over seksjoner, FAQ, pakker, kort, steg og ikoner åpnes sammenlagt med overskrift/spørsmål/etikett som sammendrag. Enkeltstående objekter og tekstlister bruker Pages CMS sin vanlige visning. Tjenestesidens frivillige hero-bilde vises på Synlighet/Konvertering; tomt bilde gir eksisterende tekstvisning.

Sideidentitet, status, innholdsautoritet og språkmetadata redigeres ikke i de vanlige sideeditorene. Oppretting, sletting og navnebytte av eksisterende sider er sperret. Pakkenøkler, bestillingsvalg og detaljlenker er fortsatt readonly og skjemabeskyttet. Materielle endringer følger fortsatt beslutningene og review-portene.

## Databevaring ved lagring

`settings.content.merge: true` er påkrevd. Pages CMS validerer modellerte felt, fletter objekter, erstatter lister og renser tomme verdier før JSON lagres. Derfor må alle feltene i listeelementer finnes i CMS-modellen. Nye umodellerte listefelt krever en tilsvarende CMS-endring før redigering. Umodellerte, ikke-tomme objekt-/rotfelt bevares ved fletting.

Tomme valgfrie strenger/lister og ukjente `null`-verdier kan utelates av CMS. Applikasjonsskjemaet gjenoppretter deres eksisterende tomme/ukjente betydning ved lesing; dette gir ikke ny publiseringstillatelse. Streng validering av komplette publiseringsbevis beholdes separat. Omskriving av JSON-innrykk/sluttlinje er formatendring og kontrolleres separat fra innholdets betydning.

Å utelate et eksisterende felt eller objekt betyr **ikke** at det slettes: fletting kan beholde den lagrede verdien. Ved behov for å fjerne et valgfritt objekt som editoren ikke kan tømme sikkert, be IMPLEMENTATION om en avgrenset endring. Ikke omgå flettemodus eller publiseringsporter.

## Bygg og kontroll

Arbeidskatalog er `app/`, med `package.json`, `wrangler.jsonc` og statiske filer i `dist/`:

```powershell
npm ci
npm run verify
npm run qa:cms -- --report ../coordination/evidence/h017b/round-trip.json
npx wrangler deploy --dry-run --outdir qa-output/h017b-worker-dry-run
```

`qa:cms` simulerer den kontrollerte Pages CMS JSON-pipelinen uten å skrive kildeinnhold. Den kontrollerer SHA256 for alle 17 innholdsfiler og sammenligner redigert innhold gjennom de faktiske applikasjonsskjemaene. De dedikerte testene kontrollerer også umodellerte felt og bevisvernet. Autentisert CMS-lagring og den tilkoblede Workers Builds-sjekken er egen evidens; simuleringen er ikke en erstatning.

Aktive auditer bruker gjeldende CMS-pakketekst under D-054, samtidig som innholdslåser for øvrige sider, tilbudsregler, pris-/bestillingsruter, bevisvern og noindex/intake-porter består. Historiske H-012/H-014/H-015-øyeblikksbilder ligger utenfor normalt CMS-byggløp. Den midlertidige selector-knappeteksten skal også passere normal verifikasjon og tilbakeføres.

Konfigurasjonen bygger på den gamle live-referansen `AnelPasic/optimalisering.oslo.no` `.pages.yml`, blob `6d90a6e4402caa78dcabebbac9cf009b4c194477`, tilpasset V3.3 uten datamigrering. Formatet er kontrollert mot [Pages CMS felt](https://pagescms.org/docs/configuration/content/fields/), [sammenleggbare lister](https://pagescms.org/docs/configuration/content/list/), [operasjoner](https://pagescms.org/docs/configuration/content/operations/) og [save-pipelinen](https://github.com/pages-cms/pages-cms/blob/6f4e860a35d934406580287e7042e5e111e207a1/app/api/%5Bowner%5D/%5Brepo%5D/%5Bbranch%5D/files/%5Bpath%5D/route.ts). [Workers Builds-konfigurasjon](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) beskriver arbeidskatalog og bygg-/deploykommandoer; faktisk tilgjengelig byggstatus og innstillingsinnsyn er dokumentert i leveranseevidensen.
