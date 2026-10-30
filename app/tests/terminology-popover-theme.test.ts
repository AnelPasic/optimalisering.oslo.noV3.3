import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('interactive glossary popover stays independent from noninteractive daisyUI tooltip layout', () => {
  const ui = readFileSync('src/components/TerminologyUI.astro', 'utf8');
  const css = readFileSync('src/styles/terminology.css', 'utf8');
  const client = readFileSync('src/lib/terminology-client.ts', 'utf8');
  assert.match(ui, /class="term-panel bg-info text-info-content"/);
  assert.match(ui, /popover="manual"/);
  assert.match(ui, /role="region"/);
  assert.match(ui, /id="term-description" data-term-description/);
  assert.match(ui, /class="link link-hover" data-term-more/);
  assert.doesNotMatch(ui, /tooltip(?:-content|-bottom|-open|-info)?/);
  assert.match(css, /\.term-panel\s*\{[^}]*position:\s*fixed;/s);
  assert.match(css, /\.term-panel\s*\{[^}]*background:\s*var\(--color-info\);/s);
  assert.match(css, /\.term-panel\s*\{[^}]*color:\s*var\(--color-info-content\);/s);
  assert.match(css, /\.term-panel\[hidden\]\s*\{\s*display:\s*none;/);
  assert.match(css, /\.term-panel a\s*\{\s*color:\s*inherit;/);
  assert.doesNotMatch(css.split('.glossary-navigation')[0], /#(?:320c43|[0-9a-f]{6})\b/i);
  assert.ok(client.includes("panel!.showPopover()"));
  assert.ok(client.includes('link.after(panel!)'));
  assert.ok(client.includes('more.href = link.href'));
  assert.ok(client.includes("event.key === 'Escape'"));
});
