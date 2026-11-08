import { z } from 'astro/zod';
import { sectionPositions } from './section-position.ts';

export const headingAlignValues = ['default', 'center', 'left'] as const;
export const headingAlignSchema = z.preprocess(
  value => value === '' || value == null ? undefined : value,
  z.enum(headingAlignValues).default('default'),
);
export type HeadingAlign = z.infer<typeof headingAlignSchema>;
export const sectionAlignmentDefaultsSchema = z.partialRecord(z.enum(sectionPositions), headingAlignSchema);
export function resolveHeadingAlignment(value: HeadingAlign | undefined, fallback?: HeadingAlign): Exclude<HeadingAlign, 'default'> {
  if (value === 'left' || value === 'center') return value;
  return fallback === 'left' ? 'left' : 'center';
}
