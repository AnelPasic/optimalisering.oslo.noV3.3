import type { CollectionEntry } from 'astro:content';
type Page = CollectionEntry<'pages'>['data'];
const spaces = (value: string) => value.replace(/\s+/gu, ' ').trim();
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// D-024's supporting prose stays in JSON. Repeated facts in that approved prose
// are bound to the same CMS fields as the cards, without a second price object.
export function createCommercialTextBinding(home: Page, pricing: Page) {
  const source = home.homepage!.packages;
  const reference = [...pricing.faq[0].answer.matchAll(/(^|, | og )(.+?)( koster)? (\d[\d \u00a0]*) kr\/mnd/gu)];
  if (reference.length !== source.items.length) throw new Error('Pricing FAQ must identify the three packages in their approved order');
  if (new Set(source.items.map(item => item.vatSuffix)).size !== 1) throw new Error('The approved all-prices VAT statement requires one shared VAT suffix');
  const prices = new Map(reference.map((match, index) => [spaces(match[4]), source.items[index]]));
  const names = new Map(reference.map((match, index) => [match[2], source.items[index].title]));
  const namesPattern = new RegExp(`\\b(?:${[...names.keys()].map(escape).join('|')})\\b`, 'gu');
  const costs = pricing.sections.find(section => section.id === 'kostnader')!.body;
  const boundary = costs[0].indexOf('. ') + 1;
  if (!boundary || costs.length !== 3) throw new Error('Pricing cost reference must retain the approved budget/external/separate-work/capacity paragraphs');
  const budgetReference = costs[0].slice(0, boundary);
  const externalReference = costs[0].slice(boundary).trim();
  const externalCanonical = externalReference.replace('kommer også i tillegg', 'kommer i tillegg');
  const rules = new Map([
    [budgetReference, source.adBudgetNote], [costs[1], source.separateWorkNote], [costs[2], source.capacityNote],
    [externalReference, source.externalCostsNote === externalCanonical ? externalReference : source.externalCostsNote],
  ]);
  for (const item of home.faq) if (item.answer.startsWith(`${budgetReference} `)) {
    const variant = item.answer.slice(budgetReference.length).trim();
    rules.set(variant, source.externalCostsNote === externalCanonical ? variant : source.externalCostsNote);
  }
  const rulesPattern = new RegExp([...rules.keys()].sort((a, b) => b.length - a.length).map(escape).join('|'), 'gu');
  return (text: string): string => text
    .replace(rulesPattern, value => rules.get(value)!)
    .replace(namesPattern, value => names.get(value)!)
    .replace(/(\d[\d \u00a0]*)\s+kr\/mnd/gu, (value, amount: string) => {
      const item = prices.get(spaces(amount));
      return item ? `${new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(item.price).replaceAll('\u00a0', ' ')} ${item.priceSuffix}` : value;
    })
    .replaceAll('eks. mva.', source.items[0].vatSuffix);
}
