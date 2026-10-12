import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { getHeroProof } from '../src/lib/hero-proof.ts';

const root = process.env.QA_DIST_ROOT || 'dist';
const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const records = readdirSync('src/content/proof').filter(file => file.endsWith('.json')).map(file => JSON.parse(readFileSync(`src/content/proof/${file}`, 'utf8')));
const expected = getHeroProof(home.homepage.proof, records);
const html = readFileSync(`${root}/index.html`, 'utf8');
const panel = html.match(/<div class="hero-proof"[^>]*>(.*?)<\/div>/s)?.[1];
assert.equal(Boolean(panel), Boolean(expected), 'Hero panel follows the guarded featured selection');
if (expected) {
  const text = panel.replace(/<[^>]*>/g, ' ').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
  assert.equal(text, `${expected.metric} ${expected.comparison} ${expected.support}`, 'Only the approved result and support line render');
  assert.equal((html.match(/class="hero-proof"/g) || []).length, 1);
  assert.ok(html.indexOf('class="hero-proof"') < html.indexOf('id="behov"'));
}
for (const file of readdirSync('src/content/pages').filter(file => file.endsWith('.json') && file !== 'home.json')) {
  const page = JSON.parse(readFileSync(`src/content/pages/${file}`, 'utf8'));
  assert.ok(!/class="hero-proof"/.test(readFileSync(`${root}/${page.slug}/index.html`, 'utf8')), 'Hero proof stays homepage-only');
}
console.log('H-017E static PASS: one guarded homepage-only result/source panel, no extra hero evidence.');
