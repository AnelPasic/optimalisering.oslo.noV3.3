import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { shellInventory, cssSources } from './surface-inventory.mjs';

const tokens = readFileSync('src/styles/surfaces.css', 'utf8');
const sources = cssSources();
const defined = new Set(sources.flatMap(s => [...s.css.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1])));
const central = new Set([...tokens.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
const exceptions = [
  { path: 'src/styles/global.css', property: 'border-left', value: '2px solid #ab7748', reason: 'Existing warm preview-notice state on legacy pages.' },
  { path: 'public/styles/home-invite.css', property: 'border-color', value: '#f9bf9f', reason: 'Calculator invalid-input state on plum; preserve the signal.' },
  { path: 'public/styles/home-invite.css', property: 'border-left-color', value: '#a97932', reason: 'Invite preview-notice state; preserve its amber signal.' },
  { path: 'src/components/HomeLeverage.astro', property: 'border-top', value: '2px dashed #63516b', reason: 'Legend matches the unchanged current-series stroke.' },
  { path: 'src/components/HomeLeverage.astro', property: 'border-top', value: '3px solid #087b73', reason: 'Legend matches the unchanged scenario-series stroke.' },
];
function issue(d) {
  const compact = d.value.replace(/\s+/g, '');
  if (d.property === 'border-radius' && !/^(?:0|50%|var\(--radius-[\w-]+\))$/.test(compact)) return 'one-off radius';
  if (d.property === 'box-shadow' && !/^(?:none|var\(--shadow-soft\))$/.test(compact)) return 'one-off shadow';
  if (d.property.startsWith('border') && /#|rgba?\(|hsla?\(/.test(d.value) && !exceptions.some(e => e.path === d.path && e.property === d.property && e.value === d.value)) return 'one-off border color';
  for (const m of d.value.matchAll(/var\(\s*(--[\w-]+)/g)) {
    if (!defined.has(m[1])) return `undefined token ${m[1]}`;
    if (/^--(?:radius-|border-|shadow-)/.test(m[1]) && !central.has(m[1])) return `local shell token ${m[1]}`;
  }
  return null;
}
// Meaningful guard fixtures: reject drift, accept shared shells/circles/states.
assert.equal(issue({ property: 'border-radius', value: '19px' }), 'one-off radius');
assert.equal(issue({ property: 'border-bottom', value: '1px solid #dfd9e4' }), 'one-off border color');
assert.equal(issue({ property: 'box-shadow', value: '0 4px 12px #0002' }), 'one-off shadow');
assert.equal(issue({ property: 'border-radius', value: 'var(--radius-card)' }), null);
assert.equal(issue({ property: 'border-radius', value: 'var( --radius-card )' }), null);
assert.equal(issue({ property: 'border-radius', value: '50%' }), null);
const inventory = shellInventory();
for (const s of sources.filter(s => s.path !== 'src/styles/surfaces.css')) assert.ok(!/--(?:radius-[\w-]+|shadow-soft|border-[\w-]+)\s*:/.test(s.css.replace(/\/\*[\s\S]*?\*\//g,'')), `${s.path}: shell token definitions belong in the central layer`);
const failures = inventory.declarations.filter(d => d.path !== 'src/styles/surfaces.css').map(d => ({ ...d, issue: issue(d) })).filter(d => d.issue);
assert.deepEqual(failures, [], JSON.stringify(failures, null, 2));
for (const e of exceptions) assert.ok(inventory.declarations.filter(d => d.path === e.path && d.property === e.property && d.value === e.value).length <= 1, `Duplicated exception: ${e.reason}`);
for (const name of ['radius-button','radius-sm','radius-md','radius-card','radius-card-lg','radius-pill','surface-base','surface-soft','surface-mint','surface-dark','border-subtle','border-dark','shadow-soft','panel-pad-sm','panel-pad','panel-pad-lg']) assert.ok(tokens.includes(`--${name}:`));
console.log(`H-018 source guard PASS: shared radii/shadow/borders, ${exceptions.length} explicit state/series exceptions; new one-offs fail.`);
