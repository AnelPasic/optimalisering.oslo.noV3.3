import { z } from 'astro/zod';

// These fields contain executable code intentionally managed by trusted Git/CMS editors.
const code = z.preprocess(value => value == null ? undefined : value, z.string().max(100000).optional());
export const advancedScriptsSchema = z.preprocess(value => value == null ? undefined : value,
  z.object({ headerJs: code, footerJs: code }).strict().optional());
export type AdvancedScripts = z.infer<typeof advancedScriptsSchema>;

/** Preserve HTML snippets (script, img, noscript, etc.); wrap plain JavaScript once. */
export function advancedCodeMarkup(value?: string): string {
  if (!value?.trim()) return '';
  if (value.trimStart().startsWith('<')) return value;
  // A literal closing tag inside JavaScript must not terminate the HTML script element.
  return '<script>\n' + value.replace(/<\/script/gi, '<\\/script') + '\n</script>';
}
