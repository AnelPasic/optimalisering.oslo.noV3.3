import {isHomepageSectionVisible} from '../src/lib/home-builder.ts';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolvePageHero } from '../src/lib/page-hero.ts';
const home = JSON.parse(readFileSync('src/content/pages/home.json'));
const normalize = text => text.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
for (const slug of ['home', 'priser', 'synlighet', 'konvertering']) {
  const html = readFileSync(slug === 'home' ? 'dist/index.html' : `dist/${slug}/index.html`, 'utf8');
  const visible = normalize(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''));
  assert.equal((visible.match(/Medon/g) ?? []).length, 1, `${slug}: only one normal provider mention`);
  assert.ok(visible.includes('Tjenesten drives av Medon AS.'), `${slug}: exact disclosure`);
  assert.ok(!/Om Medon|En tjeneste fra Medon|©\s*\d+\s*Medon/.test(visible));
  assert.ok(!html.includes('hreflang="en"') && !html.includes('class="language-switch"'));
  assert.ok(!/<a[^>]+href="\/en(?:\/|")/.test(html));
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  if (slug === 'home') {
    assert.ok(!html.includes('id="medon"'));
    const fit = html.match(/<section id="passer"[^>]*>(.*?)<\/section>/s)?.[1];
    const locked = Object.values(home.sections).find(section => section.id === 'passer');
    assert.equal(Boolean(fit),isHomepageSectionVisible(locked));
    if(fit)for (const copy of [locked.eyebrow, locked.heading, ...locked.items.flatMap(item => [item.title, item.text])]) assert.ok(normalize(fit).includes(copy));
  }
  if (['synlighet', 'konvertering'].includes(slug)) {
    const content = JSON.parse(readFileSync(`src/content/pages/${slug}.json`));
    const hero = resolvePageHero(content);
    const visual = hero.visual.kind === 'image' ? hero.visual.image : undefined;
    assert.equal(/class="[^"]*\bservice-hero-visual\b/.test(html), Boolean(visual));
    if (visual) assert.ok(html.includes(`src="${visual.src}"`) && html.includes(`alt="${visual.alt}"`));
    assert.ok(html.includes('href="/#sjekk"') && html.includes('href="/priser/"'));
    assert.ok(!/<form/.test(html));
    // Locked editorial sections supply problem, mechanism, practical meaning,
    // qualification/limits, commercial path and bounded action without filler.
    for (const id of [content.sections[0].id, content.sections[1].id, 'prioritering', 'sammenheng', 'service-priser', 'sjekk', 'sporsmal']) assert.ok(html.includes(`id="${id}"`));
    assert.ok(normalize(html).includes(content.title) && normalize(html).includes(content.intro));
  }
}
assert.ok(!readdirSync('dist').includes('en'), 'No accidental /en/ placeholder routes');
console.log('H-011 static PASS: exact provider/fit, landing journey, CMS-supplied visual/fallback, no dead language switch/English route.');
