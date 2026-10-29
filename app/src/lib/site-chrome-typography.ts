import postcss from 'postcss';
import { z } from 'astro/zod';
import { parseDaisyTheme, type ChromeThemes } from './site-chrome-theme.ts';

// Strictly existing Tailwind CSS v4 theme namespaces. No custom --site-* tokens.
const sizes = ['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl'];
const allowed = new Set([
  '--font-sans','--font-serif','--font-mono','--font-heading','--font-body',
  ...sizes.flatMap(name => ['--text-' + name, '--text-' + name + '--line-height']),
  '--font-weight-normal','--font-weight-medium','--font-weight-semibold','--font-weight-bold',
  '--leading-tight','--leading-normal','--leading-relaxed',
  '--tracking-tight','--tracking-normal','--tracking-wide',
]);
const fontStacks = new Set([
  'system-ui, sans-serif',
  "'Instrument Sans Variable', sans-serif",
  "'Figtree Variable', sans-serif",
  'Georgia, serif',
  'ui-monospace, SFMono-Regular, Menlo, monospace',
]);
const singleSize = /^\d+(?:\.\d+)?(?:rem|px|em)$/;
const clampSize = /^clamp\(\s*\d+(?:\.\d+)?(?:rem|px|em)\s*,\s*\d+(?:\.\d+)?(?:vw|rem|px)\s*,\s*\d+(?:\.\d+)?(?:rem|px|em)\s*\)$/;
const trackingValue = /^-?(?:0|0?\.\d+)(?:em|rem|px)$/;
function validate(key: string, value: string): void {
  if (!allowed.has(key)) throw new Error('Ikke tillatt Tailwind-token: ' + key);
  if (key.startsWith('--font-') && !key.startsWith('--font-weight-')) {
    if (!fontStacks.has(value)) throw new Error('Kun innebygde/godkjente skriftstakker er tillatt for ' + key);
  } else if (/^--text-[^-]+$/.test(key)) {
    if (!(singleSize.test(value) || clampSize.test(value))) throw new Error('Ugyldig fontstørrelse for ' + key);
  } else if (key.includes('--line-height') || key.startsWith('--leading-')) {
    const n = Number(value);
    if (!Number.isFinite(n) || n < 1 || n > 2.4) throw new Error('Ugyldig linjehøyde for ' + key);
  } else if (key.startsWith('--tracking-')) {
    if (!trackingValue.test(value) || Math.abs(parseFloat(value)) > 0.2) throw new Error('Ugyldig bokstavavstand for ' + key);
  } else if (key.startsWith('--font-weight-')) {
    if (!/^[1-9]00$/.test(value)) throw new Error('Ugyldig fontvekt for ' + key);
  } else throw new Error('Ukjent typografiverdi: ' + key);
}

/** Exactly one parsed :root rule, no at-rules, selectors, comments or injections. */
export function parseTypographyVariables(input: string): Record<string, string> {
  if (!input.trim()) return {};
  if (input.length > 4000) throw new Error('Maks 4000 tegn i avanserte typografivariabler.');
  let ast: ReturnType<typeof postcss.parse>;
  try { ast = postcss.parse(input, { from: undefined }); }
  catch { throw new Error('Ugyldig CSS-syntaks. Bruk én :root { --text-...: verdi; }-blokk.'); }
  if (ast.nodes.length !== 1 || ast.nodes[0]?.type !== 'rule' || ast.nodes[0].selector !== ':root')
    throw new Error('Kun én :root-blokk med Tailwind-variabler er tillatt.');
  const rule = ast.nodes[0];
  const entries: Record<string, string> = {};
  for (const node of rule.nodes ?? []) {
    if (node.type !== 'decl' || node.important) throw new Error('Kun variabeldeklarasjoner uten !important er tillatt.');
    const key = node.prop.trim();
    const value = node.value.trim();
    if (Object.hasOwn(entries, key)) throw new Error('Duplisert typografivariabel: ' + key);
    validate(key, value);
    entries[key] = value;
  }
  return entries;
}

export const typographySchema = z.object({
  fontFamily: z.enum(['current','instrument','figtree']).optional(),
  scale: z.enum(['normal','compact','large']).optional(),
  lineHeight: z.enum(['normal','relaxed']).optional(),
  tracking: z.enum(['normal','tight']).optional(),
  weight: z.enum(['normal','strong']).optional(),
  cssVariables: z.string().max(4000).optional(),
}).strict().superRefine((value, context) => {
  try { parseTypographyVariables(value.cssVariables ?? ''); }
  catch (error) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['cssVariables'],
      message: error instanceof Error ? error.message : 'Ugyldige typografivariabler' });
  }
});
export type ChromeTypography = z.infer<typeof typographySchema>;

const stacks = {
  current: null,
  instrument: "'Instrument Sans Variable', sans-serif",
  figtree: "'Figtree Variable', sans-serif",
} as const;
export function typographyVariables(typography?: ChromeTypography): Record<string, string> {
  if (!typography) return {};
  const result: Record<string, string> = {};
  if (typography.fontFamily && stacks[typography.fontFamily]) {
    result['--font-heading'] = stacks[typography.fontFamily]!;
    result['--font-body'] = stacks[typography.fontFamily]!;
  }
  if (typography.scale === 'compact') Object.assign(result, {
    '--text-base': 'clamp(0.9375rem, 1.25vw, 1.0625rem)',
    '--text-3xl': 'clamp(1.375rem, 2.1vw, 1.875rem)',
    '--text-4xl': 'clamp(1.875rem, 3vw, 2.75rem)',
    '--text-5xl': 'clamp(1.625rem, 4.1vw, 3rem)',
  });
  if (typography.scale === 'large') Object.assign(result, {
    '--text-base': 'clamp(1.125rem, 1.55vw, 1.25rem)',
    '--text-3xl': 'clamp(1.625rem, 2.4vw, 2.25rem)',
    '--text-4xl': 'clamp(2.125rem, 3.5vw, 3.25rem)',
    '--text-5xl': 'clamp(2rem, 5vw, 3.75rem)',
  });
  if (typography.lineHeight === 'relaxed') Object.assign(result, {
    '--text-5xl--line-height': '1.15',
    '--text-4xl--line-height': '1.2',
    '--text-base--line-height': '1.75',
    '--leading-tight': '1.25', '--leading-normal': '1.7', '--leading-relaxed': '1.9',
  });
  if (typography.tracking === 'tight') result['--tracking-tight'] = '-0.06em';
  if (typography.weight === 'strong') Object.assign(result, {
    '--font-weight-bold': '800', '--font-weight-semibold': '700',
  });
  Object.assign(result, parseTypographyVariables(typography.cssVariables ?? ''));
  return result;
}

/** Runtime CSS on both validated theme names, after Tailwind compilation. */
export function typographyOverridesCss(themes: ChromeThemes, typography?: ChromeTypography): string {
  const values = typographyVariables(typography);
  if (!Object.keys(values).length) return '';
  const declarations = Object.entries(values).map(([key,value]) => key + ':' + value + ';').join('');
  return (['light','dark'] as const).map(mode => {
    const name = parseDaisyTheme(themes[mode + 'Css' as 'lightCss'|'darkCss'], mode).name;
    return 'html[data-theme="' + name + '"]{' + declarations + '}';
  }).join('\n');
}
