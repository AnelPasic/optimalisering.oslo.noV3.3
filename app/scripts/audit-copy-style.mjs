import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
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
for (const file of readdirSync(pageDir).filter(name => name.endsWith('.json'))) {
  const json = JSON.parse(readFileSync(join(pageDir, file), 'utf8'));
  for (const entry of collectStrings(json)) {
    stringsChecked++;
    assert.ok(!forbiddenChars.test(entry.value), `${file} ${entry.path}: use ordinary keyboard punctuation`);
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
    .replace(/\[current, scenario, difference, percentage, currentEquation, scenarioEquation\]\.forEach\(output => output\.textContent = '–'\);/g, placeholder => placeholder.replaceAll('–', ''))
    : source;
  assert.ok(!forbiddenChars.test(checked), `${file}: hard-coded visible copy must use ordinary keyboard punctuation or SVG/icon components`);
}

console.log(`Copy-style QA passed: ${stringsChecked} customer-facing strings plus Astro component punctuation.`);
