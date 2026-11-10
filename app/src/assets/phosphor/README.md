# Phosphor Regular: fullt ikonbibliotek i Pages CMS

Hele biblioteket er tilgjengelig via den offisielle, versjonslåste NPM-pakken [`@phosphor-icons/core@2.1.1`](https://www.npmjs.com/package/@phosphor-icons/core) (MIT-lisens). Lokale historiske SVG-er i denne mappen beholdes for eksisterende komponenter; de begrenser **ikke** lenger hvilke ikonnavn du kan bruke.

## Slik bruker du det

I **Pages CMS → Tjenester med ikoner → Phosphor-ikonnavn (valgfritt)** skriver du ikonets navn fra [phosphoricons.com](https://phosphoricons.com) som kebab-case, for eksempel `meta-logo`, `facebook-logo`, `robot`, `map-pin`, `sparkle` eller `magnifying-glass`. Bruk bare navnet, **uten** `.svg` eller vekt-suffikser. Dette feltet gir **Regular**-varianten.

CMS-feltet **Generisk ikon** er fortsatt fallback for gamle oppføringer eller et tomt felt. Ugyldige ikonnavn stoppes av innholdsskjemaet under validering/bygging og må korrigeres før publisering.

## Ytelse og sikkerhet

- Astro-prosjektet er statisk. `PackageFocusIcon.astro` leser *kun ikonene som brukes* fra `node_modules/@phosphor-icons/core/assets/regular/` ved bygging og legger dem direkte inn som SVG i HTML.
- Biblioteket, dets katalog og SVG-filene sendes ikke til nettleseren som JS-pakke, ikonfont eller separate CDN-forespørsler.
- Ikonnavn må finnes i bibliotekets katalog. Ingen HTML-/SVG-kode fra CMS tolkes som ikon, og det er ingen nettverksoppslag ved rendering.
- `app/public/licenses/phosphor-icons.txt` inneholder eksisterende MIT-lisens.

Eksempel: `meta-logo` bruker den offisielle Phosphor Meta-logoen, ikke det generiske annonseringsikonet.
