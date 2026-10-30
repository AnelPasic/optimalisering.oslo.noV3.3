import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('glossary popover uses native daisyUI tooltip markup and theme colors', () => {
  const ui = readFileSync('src/components/TerminologyUI.astro', 'utf8');
  const styles = readFileSync('src/styles/terminology.css', 'utf8');
  const client = readFileSync('src/lib/terminology-client.ts', 'utf8');
  assert.match(ui, /class="term-panel tooltip tooltip-info tooltip-bottom tooltip-open"/);
  assert.match(ui, /class="tooltip-content"/);
  assert.match(ui, /class="link link-hover" data-term-more/);
  assert.match(ui, /popover="manual"/);
  assert.match(styles, /\.term-panel > \.tooltip-content\s*\{[^}]*pointer-events: auto/s);
  assert.match(styles, /\.term-panel a\s*\{\s*color: inherit;/);
  assert.doesNotMatch(styles.split('.glossary-navigation')[0], /#(?:320c43|[0-9a-f]{6})\b/i);
  assert.ok(client.includes("panel!.showPopover()"), 'keyboard/touch/viewport logic retained');
  assert.ok(client.includes('more.href = link.href'), 'full-definition link retained');
});
