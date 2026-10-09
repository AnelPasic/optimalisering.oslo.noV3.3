// Test/implementation input reader only; never imported by the public app.
import { readFileSync } from 'node:fs';
export function getH012Contract() {
  const doc = readFileSync('../coordination/H012-PRICING-OFFER.md', 'utf8').replaceAll('\r\n', '\n');
  const section = name => doc.split(`## ${name}\n`)[1]?.split('\n## ')[0];
  const field = (text, name) => text.split('\n').find(line => line.startsWith(name + ': '))?.slice(name.length + 2);
  const list = (text, name) => text.split(name + ':\n')[1]?.split(/\n(?=[A-Z][^\n]*:)/)[0].split('\n').filter(line => line.startsWith('- ')).map(line => line.slice(2));
  const shared = section('Shared rules');
  const items = ['Optimalisering', 'Vekst', 'Partner'].map((title, index) => {
    const text = section(title), price = field(text, 'Price');
    const item = {
      title, descriptor: field(text, 'Descriptor'), fit: field(text, 'Fit'),
      price: Number(price.replace(/[^\d]/g, '')), priceSuffix: 'kr/mnd', vatSuffix: field(text, 'VAT'),
      recommended: index === 1, badge: field(text, 'Badge') ?? '',
      cta: { label: field(shared, 'Primary CTA on all cards'), href: '/#sjekk' },
      detailLink: { label: field(shared, 'Homepage secondary link'), href: `/priser/#${['optimalisering', 'begge', 'partner'][index]}` },
      visual: ['controlled', 'accelerating', 'tracks'][index],
      situations: list(text, 'Typical situations'), selectionRule: field(text, 'Selection rule'),
    };
    if (price.startsWith('fra ')) item.pricePrefix = 'fra';
    for (const [key, name] of Object.entries({ typicalBusiness: 'Typical business', scope: 'How we work', distinction: 'Important distinction', priceNote: 'Price note' })) {
      const value = field(text, name); if (value) item[key] = value;
    }
    const focuses = list(text, index === 0 ? 'Examples of focus' : 'Examples of work areas');
    if (focuses) item.focusAreas = focuses;
    if (index === 1) item.combinations = text.split('\n').filter(line => /^[123]\. /.test(line)).map(line => {
      const [title, text] = line.slice(3).split(' — '); return { title, text };
    });
    return item;
  });
  const text = section('Section'), decision = section('Decision strip'), multiplier = section('Multiplier block');
  return { eyebrow: field(text, 'Eyebrow'), heading: field(text, 'Heading'), intro: field(text, 'Intro'), items,
    decisionStrip: { heading: field(decision, 'Heading'), items: items.map(item => field(decision, item.title)) },
    multiplier: Object.fromEntries(Object.entries({ eyebrow: 'Eyebrow', heading: 'Heading', body: 'Body', conceptualRow: 'Conceptual row', support: 'Support' }).map(([key, name]) => [key, field(multiplier, name)])),
  };
}
