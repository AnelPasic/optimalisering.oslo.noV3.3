import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { getPublishableCases, normalizeProofText } from '../src/lib/proof.ts';

const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const records = readdirSync('src/content/proof').filter(file => file.endsWith('.json')).map(file => JSON.parse(readFileSync(`src/content/proof/${file}`, 'utf8')));
const publicCases = getPublishableCases(home.homepage.proof, records);
const html = readFileSync('dist/index.html', 'utf8');
const text = html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
for (const [index, price] of [4500, 6900, 14900].entries()) assert.equal(home.homepage.packages.items[index].price, price, 'D-022 exact current prices');
for (const price of ['4 500 kr/mnd', '6 900 kr/mnd', '14 900 kr/mnd']) assert.ok(text.includes(price), `Rendered ${price}`);
assert.ok(text.includes('eks. mva.') && text.includes('Anbefalt'));
assert.ok(text.includes('Annonsebudsjett kommer i tillegg.'));
assert.ok(text.includes('Få våre 3 viktigste funn innen 2 virkedager.'));
assert.ok(!/Sprint|ubegrenset|bindingstid|oppsigelsestid|minimumsperiode|oppstartsgebyr|onboarding|fakturavilkår|\d+\s*timer/i.test(text));
assert.equal(html.includes('id="resultater"'), publicCases.length > 0, 'Renderer uses the explicit case publication guard');
const hiddenNames = records.filter(record => !publicCases.some(proof => proof.displayName === record.clientName)).map(record => normalizeProofText(record.clientName));
let filesChecked = 0;
function scan(directory) {
  for (const file of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, file.name);
    if (file.isDirectory()) scan(path);
    else if (/\.(?:html|js|json)$/.test(file.name)) {
      const raw = readFileSync(path, 'utf8');
      const rawContent = normalizeProofText(raw.replace(/\\(?:n|r|t|u00a0|u0020)/gi, ' '));
      const visibleContent = normalizeProofText(raw.replace(/<[^>]+>/g, ' ').replace(/\\(?:n|r|t|u00a0|u0020)/gi, ' '));
      for (const content of [rawContent, visibleContent]) {
        for (const name of hiddenNames) assert.ok(!content.includes(name), `${path}: private case identity not exported`);
        assert.ok(!/evidence_only|needs_permission|ready_for_strategy_review|nysta-proof-registry|synthetic fixture/.test(content), `${path}: no evidence registry or test fixture in static output`);
      }
      filesChecked++;
    }
  }
}
scan('dist');
console.log(`H-007 static QA PASS: exact ladder/promise/rules; ${publicCases.length} public cases; ${filesChecked} HTML/JS/JSON outputs checked for private-proof leakage.`);
