import { needFocusLabels } from '../../app/src/lib/order.ts';
import pricing from '../../app/src/content/global-elements/priser.json' with { type: 'json' };

const comparisonLabels = new Set(pricing.content.comparison.options.map(option => option.label));

const packageNames = Object.fromEntries(pricing.content.items.map(item => [item.key, item.title]));

// Customer copy approved in coordination/LOCKED-CONVERSION-MESSAGES-2026-11-08.md.
const orderText = `Hei!
Vi har mottatt bestillingsforespørselen din om [Valgt pakke], med fokus på [Valgt område].

Bra valg. Nå tar vi over.

Vi tar kontakt for å avklare målene dine, bekrefte pris og omfang og komme i gang med forbedringene.

Vil du spare litt tid før oppstart?

Finn gjerne ut hvem som har tilgang til:

- Nettsiden: WordPress, Shopify eller systemet nettsiden bruker.
- Google: Google Ads, Analytics, Search Console eller Google Bedriftsprofil.
- Annonsering: Meta Business eller andre annonsekontoer dere bruker.

Du trenger ikke ordne alt nå. Vi forteller deg hvilke tilganger som er relevante for pakken din og hvordan du gir oss sikker tilgang. Ikke send passord på e-post.

Du driver bedriften. Vi jobber for at flere kunder skal finne den og velge den.

Vi snakkes!

Optimalisering Oslo`;
const assessmentText = `Hei!
Vi har mottatt forespørselen din om 3 gratis funn for [nettside].

Nå undersøker vi hvor bedriften din kan ha mest å hente.

Du får tre konkrete funn og vår anbefaling om hva du bør forbedre først, innen 2 virkedager.

Du trenger ikke gjøre noe mer. Vi tar det herfra.

Hilsen
Optimalisering Oslo`;

export function orderFocus(payload) {
  if (payload.focus && Object.hasOwn(needFocusLabels, payload.focus)) return needFocusLabels[payload.focus];
  const comparison = payload.message?.match(/^Ønsket fokusområder?: (.+)\. Endelig omfang avklares før oppstart\.$/);
  const choices = comparison?.[1].split(' + ') ?? [];
  const limit = payload.package === 'optimalisering' ? 1 : payload.package === 'vekst' ? 2 : 0;
  if (choices.length && choices.length <= limit && choices.every(label => comparisonLabels.has(label))) {
    return choices.join(' + ');
  }
  return 'et område vi avklarer sammen';
}

export function customerMail(payload, env) {
  const order = payload.form === 'pakke-bestilling';
  const text = order
    ? orderText.replace('[Valgt pakke]', () => packageName(payload.package))
      .replace('[Valgt område]', () => orderFocus(payload))
    : assessmentText.replace('[nettside]', () => payload.website);
  return {
    from: env.RESEND_FROM, to: [payload.email], reply_to: env.RESEND_REPLY_TO,
    subject: order ? 'Bra valg. Vi tar det herfra.' : 'Vi ser etter mulighetene du går glipp av',
    text,
  };
}

export function packageName(key) {
  return Object.hasOwn(packageNames, key) ? packageNames[key] : key;
}
