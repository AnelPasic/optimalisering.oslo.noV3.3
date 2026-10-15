import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const tokens = readFileSync('src/styles/typography.css', 'utf8');
const roles = ['display', 'h1', 'h2', 'h3', 'h4', 'lead', 'body-lg', 'body', 'body-sm', 'label', 'eyebrow', 'meta', 'caption', 'button', 'form-label', 'helper', 'caveat'];
for (const role of roles) assert.ok(tokens.includes(`--type-${role}:`), `Missing role ${role}`);
let declarations = 0;
function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) scan(path);
    else if (/\.(css|astro)$/.test(path) && !path.endsWith('/typography.css')) {
      const source = readFileSync(path, 'utf8');
      const css = path.endsWith('.astro') ? [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n') : source;
      for (const match of css.matchAll(/font-size:\s*([^;]+);/g)) {
        assert.match(match[1], /^var\(--type-[a-z0-9-]+\)$/, `${path}: local font-size ${match[1]}`);
        const token = match[1].slice(4, -1);
        assert.ok(tokens.includes(`${token}:`), `${path}: undefined role ${token}`);
        declarations++;
      }
      assert.ok(!/font:\s*[^;]*(?:\d+(?:px|rem|em))/.test(css), `${path}: raw font shorthand`);
    }
  }
}
scan('src'); scan('public/styles');
assert.ok(!readFileSync('src/components/HomeLeverage.astro', 'utf8').includes('--result-size'), 'No length-based result shrinking');
assert.ok(readFileSync('src/layouts/SiteLayout.astro', 'utf8').includes("import '../styles/app.css'"));
assert.ok(readFileSync('src/styles/app.css', 'utf8').includes('@import "./typography.css";'));
console.log(`Typography source PASS: ${roles.length} semantic roles, ${declarations} role consumers, zero raw local size declarations.`);
