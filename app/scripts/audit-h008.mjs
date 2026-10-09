import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createCommercialTextBinding } from '../src/lib/commercial-text.ts';

const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const pricing = JSON.parse(readFileSync('src/content/pages/priser.json', 'utf8'));
const homepage = readFileSync('dist/index.html', 'utf8');
const pricepage = readFileSync('dist/priser/index.html', 'utf8');
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const cards = html => [...html.matchAll(/<article\b[^>]*class="package-card[^>]*>(.*?)<\/article>/gs)].map(match => text(match[1]));
assert.equal(cards(pricepage).length, 3, '/priser/ must render the three shared packages');
// D-041 separates compact/full presentation while keeping shared facts exact.
// D-048 supplies the shared short fit; full fit remains in pricing disclosure.
for (const [index, item] of home.homepage.packages.items.entries()) for (const copy of [item.title, item.descriptor, item.compact.fit, item.vatSuffix, `${new Intl.NumberFormat('nb-NO').format(item.price)} ${item.priceSuffix}`]) {
  for (const view of [homepage, pricepage]) assert.ok(cards(view)[index].includes(text(copy)), 'Compact/full shared facts cannot drift');
}
assert.equal(pricing.homepage, undefined, 'No second editable package object');
assert.equal((pricepage.match(/id="begge"/g) ?? []).length, 1, 'Keep existing /priser/#begge links from the frozen pages valid');
for (const section of pricing.sections) {
  const rendered = pricepage.match(new RegExp(`<section id="${section.id}"[^>]*>(.*?)</section>`, 's'))?.[1];
  assert.ok(rendered, `Required pricing section ${section.id}`);
  for (const value of [section.heading, ...section.body, ...(section.items ?? []).flatMap(item => [item.title, item.text])]) assert.ok(text(rendered).includes(value), `${section.id}: D-024 exact supporting copy: ${value}`);
}
const bind = createCommercialTextBinding(home, pricing);
for (const value of [home.homepage.packages.eyebrow, home.homepage.packages.heading, home.homepage.packages.intro, ...pricing.faq.flatMap(item => [item.question, bind(item.answer)])]) {
  assert.ok(text(pricepage).includes(value), `D-024 pricing supporting copy must be rendered: ${value}`);
}
for (const value of [home.homepage.packages.adBudgetNote, home.homepage.packages.externalCostsNote, home.homepage.packages.separateWorkNote, home.homepage.packages.capacityNote, home.homepage.form.promise]) assert.ok(text(pricepage).includes(value) || text(pricepage).includes(value.replace('kommer i tillegg', 'kommer også i tillegg')), `Shared rule/promise: ${value}`);
assert.ok(!/Sprint|ubegrenset|bindingstid|oppsigelsestid|minimumsperiode|oppstartsgebyr|onboarding|fakturavilkår|\d+\s*timer/i.test(text(pricepage).replace('Det betyr ikke at alt gjøres samtidig eller at kapasiteten er ubegrenset.', '')));
assert.ok(!/Nysta|Oslo Privatklinikk|id="resultater"|proof-section/.test(pricepage));
assert.equal((pricepage.match(/<h1(?:\s|>)/g) ?? []).length, 1);
console.log('H-008 static regression PASS: shared package output, exact D-024 supporting copy/rules, no second package object or public proof.');
