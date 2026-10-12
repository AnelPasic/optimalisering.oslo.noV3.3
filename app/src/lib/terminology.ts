import { z } from 'astro/zod';
import source from '../content/terminology/glossary.json' with { type: 'json' };

export const categories = ['Synlighet og søk', 'Annonsering', 'Konvertering', 'Måling og økonomi'] as const;
const optionalText = z.string().max(500).optional().default('');
const termSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
  term: z.string().trim().min(1).max(100),
  fullName: optionalText,
  aliases: z.array(z.string().trim().min(1).max(100)).optional().default([]),
  category: z.enum(categories),
  shortDefinition: z.string().trim().min(1).max(180),
  fullDefinition: z.string().trim().min(1).max(700),
  simpleExample: optionalText,
}).strict();
export const glossarySchema = z.object({
  authority: z.literal('DRAFT / NON-AUTHORITATIVE'),
  title: z.string().trim().min(1), intro: z.string().trim().min(1), description: z.string().trim().min(1),
  linkLabel: z.string().trim().min(1), moreLabel: z.string().trim().min(1),
  exampleLabel: z.string().trim().min(1), panelLabel: z.string().trim().min(1),
  terms: z.array(termSchema).min(1),
}).strict().superRefine((content, context) => {
  const ids = new Set<string>(), names = new Map<string, string>();
  const shortDefinitions = new Set<string>(), fullDefinitions = new Set<string>();
  content.terms.forEach((term, index) => {
    if (ids.has(term.id)) context.addIssue({ code: 'custom', path: ['terms', index, 'id'], message: 'Duplicate term anchor' });
    ids.add(term.id);
    if (shortDefinitions.has(term.shortDefinition) || fullDefinitions.has(term.fullDefinition)) context.addIssue({ code: 'custom', path: ['terms', index], message: 'Duplicate definition' });
    shortDefinitions.add(term.shortDefinition);
    fullDefinitions.add(term.fullDefinition);
    for (const name of [term.term, ...term.aliases]) {
      const key = name.toLocaleLowerCase('nb-NO');
      if (names.has(key) && names.get(key) !== term.id) context.addIssue({ code: 'custom', path: ['terms', index, 'aliases'], message: 'Alias belongs to another term' });
      names.set(key, term.id);
    }
  });
});
export const glossary = glossarySchema.parse(source);
export type TermPart = { text: string; id?: string };

// Explicit placements opt in. The shared per-render Set prevents repeated explanations.
// Match longer phrases before acronyms, without changing any source characters.
export function explainTerms(text: string, allowed: string[], seen: Set<string>): TermPart[] {
  const names = glossary.terms.filter(term => allowed.includes(term.id))
    .flatMap(term => [term.term, ...term.aliases].map(name => ({ name, id: term.id })))
    .sort((a, b) => b.name.length - a.name.length);
  if (!names.length) return [{ text }];
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(?:${names.map(item => escape(item.name)).join('|')})(?![\\p{L}\\p{N}])`, 'giu');
  const parts: TermPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const term = names.find(item => item.name.toLocaleLowerCase('nb-NO') === match[0].toLocaleLowerCase('nb-NO'))!;
    if (seen.has(term.id)) continue;
    if (match.index > cursor) parts.push({ text: text.slice(cursor, match.index) });
    parts.push({ text: match[0], id: term.id });
    seen.add(term.id);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts.length ? parts : [{ text }];
}
