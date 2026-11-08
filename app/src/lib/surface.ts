import { z } from 'astro/zod';

export const surfaceValues = ['default', 'base-100', 'base-200', 'base-300', 'primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'] as const;
export type Surface = typeof surfaceValues[number];

// Keep complete utility names visible to Tailwind's source scanner.
const classes = {
  default: '',
  'base-100': 'bg-base-100 text-base-content',
  'base-200': 'bg-base-200 text-base-content',
  'base-300': 'bg-base-300 text-base-content',
  'primary': 'bg-primary text-primary-content',
  'secondary': 'bg-secondary text-secondary-content',
  'accent': 'bg-accent text-accent-content',
  'neutral': 'bg-neutral text-neutral-content',
  'info': 'bg-info text-info-content',
  'success': 'bg-success text-success-content',
  'warning': 'bg-warning text-warning-content',
  'error': 'bg-error text-error-content',
} as const satisfies Record<Surface, string>;

export function surfaceClasses(value: Surface): string {
  return classes[value];
}
export const surfaceSchema = z.preprocess(value => value === '' || value == null ? undefined : value, z.enum(surfaceValues).default('default'));

const sectionPositions = ['first', 'second', 'third', 'fourth', 'fifth'] as const;
export const sectionSurfaceDefaultsSchema = z.partialRecord(z.enum(sectionPositions), surfaceSchema);
type SectionSurfaceDefaults = z.infer<typeof sectionSurfaceDefaultsSchema>;

/** Resolve against the index in the visible CMS section list. */
export function resolveSectionSurface(value: unknown, index: number | undefined, defaults?: SectionSurfaceDefaults, protectedRow = false) {
  if (protectedRow) return undefined;
  const position = index === undefined ? undefined : sectionPositions[index];
  return surfaceAttribute(value) ?? (position ? surfaceAttribute(defaults?.[position]) : undefined);
}

/** CMS editor metadata never grants permission to recolor a protected row. */
export function sectionModel(slug: string, id: string): 'content' | 'protected' {
  return ['home', 'synlighet', 'konvertering'].includes(slug) && id === 'sjekk' ? 'protected' : 'content';
}

/** Defense in depth: only approved enum values can reach a presentation attribute. */
export function surfaceAttribute(value: unknown, protectedRow = false): Exclude<Surface, 'default'> | undefined {
  const parsed = surfaceSchema.safeParse(value);
  return protectedRow || !parsed.success || parsed.data === 'default' ? undefined : parsed.data;
}
