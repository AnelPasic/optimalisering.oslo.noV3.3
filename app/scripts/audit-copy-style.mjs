import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const pageDir = 'src/content/pages';
const componentDir = 'src/components';

const forbiddenChars = /[–—‑−…→←↗↘“”‘’«»×·]/u;
const forbiddenPhrases = [
  /det handler ikke om/i,
  /ikke bare/i,
  /med andre ord/i,
  /kan bidra til/i,
  /bidrar til å sikre/i,
  /gjør det mulig å/i,
  /\bhelhetlig\b/i,
  /\bsømløs(?:t|e)?\b/i,
  /\bskreddersydd\b/i,
  /\brobust(?:e)?\b/i,
  /\bdatadrevet\b/i,
];

function collectStrings(value, path = '$', out = []) {
  if (typeof value === 'string') {
    out.push({ path, value });
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, out));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) collectStrings(item, `${path}.${key}`, out);
  }
  return out;
}

let stringsChecked = 0;
const masterDir='src/content/global-elements';
const masters=existsSync(masterDir)?readdirSync(masterDir).filter(name=>name.endsWith('.json')).map(name=>join(masterDir,name)):[];
for (const file of [...readdirSync(pageDir).filter(name => name.endsWith('.json')).map(name => join(pageDir, name)), ...masters, 'src/content/terminology/glossary.json']) {
  const json = JSON.parse(readFileSync(file, 'utf8'));
  for (const entry of collectStrings(json)) {
    stringsChecked++;
    // TERMINOLOGY POLISH QA ONLY (2026-10-13) explicitly preserves the
    // incoming quoted examples. Permit their Norwegian quotation marks only
    // in explanations/examples; all other punctuation and phrase rules stand.
    let punctuation = file === 'src/content/terminology/glossary.json'
      && /^\$\.terms\[\d+\]\.(?:fullDefinition|simpleExample)$/.test(entry.path)
      ? entry.value.replace(/[«»]/g, '') : entry.value;
    // D-102 requires exact retention of OWNER's existing CMS-created section.
    // Grandfather only this incoming sentence, not new arrow punctuation/copy.
    if(file===join(pageDir,'home.json')&&JSON.stringify(json).includes('8ac621d2-d9aa-40ae-9875-ea9c7a2c2462')&&/\.body\[\d+\]$/.test(entry.path)&&entry.value==='Avsnitt i denne seksjonen. Felles pakketekster og priser redigeres under Forside → Seksjoner → Pakker og priser.')punctuation=punctuation.replaceAll('→','');
    assert.ok(!forbiddenChars.test(punctuation), `${file} ${entry.path}: use ordinary keyboard punctuation`);
    for (const pattern of forbiddenPhrases) {
      assert.ok(!pattern.test(entry.value), `${file} ${entry.path}: avoid template-like phrase ${pattern}`);
    }
    if (/\.(?:title|heading|eyebrow|label|question)$/.test(entry.path)) {
      assert.ok(!entry.value.includes('...'), `${file} ${entry.path}: avoid ellipsis in headings/labels`);
    }
  }
}

for (const file of readdirSync(componentDir).filter(name => name.endsWith('.astro'))) {
  const source = readFileSync(join(componentDir, file), 'utf8');
  // D-059/COPY-STYLE explicitly preserves formal mathematics. Keep the
  // calculator unchanged and exempt only its equations/numeric placeholder.
  const checked = file === 'HomeLeverage.astro' ? source
    .replace(/<span\b[^>]*class="math-equation"[^>]*>[\s\S]*?<\/span>/g, equation => equation.replaceAll('×', ''))
    .replace(/(?:currentEquation|scenarioEquation)\.textContent = `[^`]*`;/g, equation => equation.replaceAll('×', ''))
    .replace(/\[current, scenario, (?:difference|multiplier), percentage, currentEquation, scenarioEquation\]\.forEach\(output => output\.textContent = '–'\);/g, placeholder => placeholder.replaceAll('–', ''))
    .replace(/ratio\?\.multiplier \?\? '–'/g, placeholder => placeholder.replaceAll('–', ''))
    : source;
  assert.ok(!forbiddenChars.test(checked), `${file}: hard-coded visible copy must use ordinary keyboard punctuation or SVG/icon components`);
}

console.log(`Copy-style QA passed: ${stringsChecked} customer-facing strings plus Astro component punctuation.`);
