import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const content = JSON.parse(readFileSync('src/content/pages/synlighet.json', 'utf8'));
const packages = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8')).homepage.packages;
const html = readFileSync('dist/synlighet/index.html', 'utf8');
const text = value => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
assert.match(html, /class="invite-home invite-service"/, 'Dedicated H-009 service renderer');
assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
assert.equal(text(html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1]), 'De søker etter løsningen. Så etter deg.');
assert.equal(content.eyebrow, 'SEO, lokal SEO og AI-synlighet');
const ids = [...html.matchAll(/<section id="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual(ids, ['service-hero', 'behov', 'kanaler', 'prioritering', 'sammenheng', 'service-priser', 'sjekk', 'sporsmal']);
for (const section of content.sections) {
  const rendered = html.match(new RegExp(`<section id="${section.id}"[^>]*>(.*?)</section>`, 's'))?.[1];
  for (const value of [section.eyebrow, section.heading, ...section.body, ...(section.items ?? []).flatMap(item => [item.title, item.text, item.label].filter(Boolean)), ...(section.links ?? []).map(link => link.label)].filter(Boolean)) assert.ok(text(rendered).includes(value), `${section.id}: exact D-028 copy: ${value}`);
}
for (const value of [content.eyebrow, content.intro, ...content.faq.flatMap(item => [item.question, item.answer])]) assert.ok(text(html).includes(value), `D-028 exact copy: ${value}`);
const bridge = html.match(/<section id="service-priser"[^>]*>(.*?)<\/section>/s)[1];
assert.equal((bridge.match(/<article\b[^>]*class="service-package(?:\s|")/g) ?? []).length, 2, 'Compact two-package bridge');
for (const item of packages.items.slice(0, 2)) for (const value of [item.title, `${new Intl.NumberFormat('nb-NO').format(item.price)} ${item.priceSuffix}`, item.vatSuffix]) assert.ok(text(bridge).includes(text(value)), 'Bridge reads the shared package facts');
for (const href of ['/seo/', '/ai-synlighet/', '/konvertering/', '/priser/', '/#sjekk']) assert.ok(html.includes(`href="${href}"`));
assert.ok(!html.includes('/lokal-seo/') && !html.includes('<form'));
assert.ok(!/Nysta|Oslo Privatklinikk|proof-section|id="resultater"|Sprint|\d+\s*timer/.test(html));
assert.ok(!html.includes('<img'), 'Text-led service page without stock/fake proof');
console.log('H-009 static regression PASS: exact D-028 copy/order, shared two-package bridge, bounded check, no proof/form/new local-SEO route.');
