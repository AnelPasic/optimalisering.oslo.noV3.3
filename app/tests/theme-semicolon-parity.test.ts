import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDaisyTheme, chromeThemeSchema, themeOverridesCss } from '../src/lib/site-chrome-theme.ts';

const appearance = JSON.parse(readFileSync(new URL('../src/content/site-chrome/appearance.json', import.meta.url), 'utf8'));
const themes = appearance.themes;
const withMissingSemicolon = (input: string) => input.replace(
  /(--radius-field: [^;\r\n]+);(\r?\n\s*--radius-box:)/,
  '$1$2',
);

test('MWS #33 parity: actual OWNER Light and sunset Dark accept one omitted semicolon, preserving generated CSS', () => {
  for (const mode of ['light', 'dark'] as const) {
    const field = (mode + 'Css') as 'lightCss' | 'darkCss';
    const damaged = withMissingSemicolon(themes[field]);
    assert.notEqual(damaged, themes[field], mode + ' fixture requires adjacent field/box properties');
    assert.deepEqual(parseDaisyTheme(damaged, mode), parseDaisyTheme(themes[field], mode));
    assert.equal(themeOverridesCss({ ...themes, [field]: damaged }), themeOverridesCss(themes));
    assert.equal(chromeThemeSchema.safeParse({ ...themes, [field]: damaged }).success, true);
  }
  // Exact Sofiemyr Bil incident syntax must work for both modes.
  const broken = themes.lightCss.replace('--radius-field: 0.5rem;\n  --radius-box: 1.25rem;', '--radius-field: 0.5rem\n  --radius-box: 1.25rem;');
  assert.notEqual(broken, themes.lightCss);
  assert.equal(parseDaisyTheme(broken, 'light').variables['--radius-box'], '1.25rem');
  assert.equal(parseDaisyTheme(themes.darkCss, 'dark').name, 'sunset');
});

test('MWS #33 parity: unknown, duplicate, injection, same-line mistakes and bad values still fail', () => {
  const damaged = withMissingSemicolon(themes.lightCss);
  assert.notEqual(damaged, themes.lightCss);
  const invalid = [
    damaged.replace('--radius-box: 1.25rem;', '--radius-box: 1.25rem;\n  --radius-box: 2rem;'),
    damaged.replace('--radius-box: 1.25rem;', '--radius-box: 1.25rem;\n  --unknown: red;'),
    damaged.replace('--radius-box: 1.25rem;', '--radius-box: url(https://bad.example/a);'),
    damaged.replace('--radius-field: 0.5rem\n', '--radius-field: 0.5rem --radius-box: 1rem\n'),
    damaged + '\n@import "https://bad.example/a";',
    damaged + '\nbody { display:none; }',
  ];
  for (const [i, input] of invalid.entries()) {
    assert.notEqual(input, damaged, 'negative fixture did not alter the input: ' + i);
    assert.throws(() => parseDaisyTheme(input, 'light'), 'negative case ' + i);
  }
});


test('complete themes support native CSS controllers and isolate supplemental palette roles', () => {
  const css=themeOverridesCss(themes);
  for(const mode of ['light','dark'] as const){
    const theme=parseDaisyTheme(themes[(mode+'Css') as 'lightCss'|'darkCss'],mode);
    assert.ok(css.includes(':root:has(input.theme-controller[value="'+theme.name+'"]:checked),[data-theme="'+theme.name+'"]'));
    for(const [key,value] of Object.entries(theme.variables))assert.ok(css.includes(key+':'+value+';'));
  }
  assert.match(css,/--color-muted:oklch\(76% 0.025 310\)/);
  const custom={...themes,darkCss:themes.darkCss.replace('oklch(22% 0.019 237.69)','oklch(23% 0.019 237.69)')};
  assert.notEqual(custom.darkCss,themes.darkCss);
  const customBlock=themeOverridesCss(custom).split('\n')[1];
  assert.match(customBlock,/--color-muted:color-mix/);
  assert.doesNotMatch(customBlock,/oklch\(76% 0.025 310\)/,'custom palette must not inherit canonical supplemental ink');
});
