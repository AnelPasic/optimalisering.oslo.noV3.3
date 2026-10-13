import { readFileSync, readdirSync } from 'node:fs';

export function cssSources() {
  const files = [];
  for (const directory of ['src/styles', 'public/styles', 'src/components']) {
    for (const name of readdirSync(directory)) {
      const path = `${directory}/${name}`;
      if (/\.(css|astro)$/.test(path)) {
        const source = readFileSync(path, 'utf8');
        const css = path.endsWith('.astro') ? [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n') : source;
        if (css) files.push({ path, css });
      }
    }
  }
  return files;
}

// Deliberately a declaration inventory, not a replacement CSS parser.
// It checks only shell properties in the project's plain CSS/style blocks.
export function shellInventory(sources = cssSources()) {
  const declarations = [];
  for (const { path, css: raw } of sources) {
    const css = raw.replace(/\/\*[\s\S]*?\*\//g, match => ' '.repeat(match.length));
    for (const m of css.matchAll(/(?:^|(?<=[;{}\n]))\s*(border(?:-[a-z-]+)?|background(?:-[a-z-]+)?|box-shadow|padding(?:-[a-z-]+)?|(?:row-|column-)?gap|outline(?:-[a-z-]+)?):\s*([^;{}]+);/gm)) {
      const brace = css.lastIndexOf('{', m.index);
      const start = Math.max(css.lastIndexOf('}', brace), css.lastIndexOf('{', brace - 1));
      declarations.push({ path, line: css.slice(0, m.index).split('\n').length, selector: css.slice(start + 1, brace).trim(), property: m[1], value: m[2].trim() });
    }
  }
  const categories = {
    radius: d => d.property === 'border-radius', shadow: d => d.property === 'box-shadow',
    border: d => d.property.startsWith('border'), surface: d => d.property.startsWith('background'),
    padding: d => d.property.startsWith('padding'), gap: d => d.property.endsWith('gap'),
  };
  const distinct = Object.fromEntries(Object.entries(categories).map(([name, filter]) => [name,
    Object.fromEntries([...new Set(declarations.filter(filter).map(d => d.value))].sort().map(value => [value, declarations.filter(d => filter(d) && d.value === value).length]))]));
  return { declarations, distinct };
}
