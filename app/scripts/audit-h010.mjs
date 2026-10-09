import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createCommercialTextBinding } from '../src/lib/commercial-text.ts';
const content = JSON.parse(readFileSync('src/content/pages/konvertering.json', 'utf8'));
const bind = createCommercialTextBinding(JSON.parse(readFileSync('src/content/pages/home.json', 'utf8')), JSON.parse(readFileSync('src/content/pages/priser.json', 'utf8')));
const html = readFileSync('dist/konvertering/index.html', 'utf8');
const text = value => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
assert.ok(html.includes('class="invite-home invite-service"'), 'Konvertering must use the validated service renderer');
assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
assert.equal(text(html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1]), 'Det er ikke alltid kunden som må overbevises. Noen ganger må nettsiden slutte å stå i veien.');
assert.equal(content.eyebrow, 'Fra besøk til henvendelser og kjøp');
assert.equal(content.sections[0].heading, 'Det skal være enklere å kjøpe enn å gi opp.');
assert.deepEqual([...html.matchAll(/<section id="([^"]+)"/g)].map(match => match[1]), ['service-hero', 'friksjon', 'kvalitet', 'prioritering', 'sammenheng', 'service-priser', 'sjekk', 'sporsmal']);
for (const section of content.sections) {
  const rendered = html.match(new RegExp(`<section id="${section.id}"[^>]*>(.*?)</section>`, 's'))?.[1];
  assert.ok(rendered, section.id);
  for (const value of [section.eyebrow, section.heading, ...section.body, ...(section.items ?? []).flatMap(item => [item.title, item.text, item.label].filter(Boolean)), ...(section.links ?? []).map(link => link.label)].filter(Boolean)) assert.ok(text(rendered).includes(value), `D-031 ${section.id}: ${value}`);
}
for (const value of [content.eyebrow, content.intro, ...content.faq.flatMap(item => [item.question, bind(item.answer)])]) assert.ok(text(html).includes(value), `D-031 exact copy with shared CMS facts: ${value}`);
assert.ok(html.includes(bind(content.seo.title)) && content.seo.title.includes('Konverteringsoptimalisering (CRO)'));
for (const name of ['Synlighet', 'Konvertering']) {
  const route = readFileSync(`dist/${name.toLowerCase()}/index.html`, 'utf8');
  const bridge = route.match(/<section id="service-priser"[^>]*>(.*?)<\/section>/s)?.[1];
  assert.ok(bridge, `${name}: shared bridge`);
  assert.equal((bridge.match(/<article\b/g) ?? []).length, 2);
  assert.ok(text(bridge).includes(`Når ${name} er det ene prioriterte området.`));
  assert.ok(text(bridge).includes(`Når ${name} jobber sammen med et annet område.`));
}
for (const href of ['/synlighet/', '/priser/', '/#sjekk']) assert.ok(html.includes(`href="${href}"`));
assert.ok(!/<form|<img|Nysta|Oslo Privatklinikk|proof-section|id="resultater"|Sprint|\d+\s*timer/.test(html));
console.log('H-010 static regression PASS: exact D-031 H1/hook/copy/order, two service contexts, bounded check, no proof/form.');
