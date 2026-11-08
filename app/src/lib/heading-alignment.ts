import { z } from 'astro/zod';
import { sectionPositions } from './section-position.ts';

export const headingAlignValues = ['default', 'center', 'left'] as const;
export const headingAlignSchema = z.preprocess(
  value => value === '' || value == null ? undefined : value,
  z.enum(headingAlignValues).default('default'),
);
export type HeadingAlign = z.infer<typeof headingAlignSchema>;
export const sectionAlignmentDefaultsSchema = z.partialRecord(z.enum(sectionPositions), headingAlignSchema);
type SectionAlignmentDefaults = z.infer<typeof sectionAlignmentDefaultsSchema>;

export function resolveHeadingAlignment(value: HeadingAlign | undefined, index?: number, defaults?: SectionAlignmentDefaults): Exclude<HeadingAlign, 'default'> {
  if (value === 'left' || value === 'center') return value;
  const position = index === undefined ? undefined : sectionPositions[index];
  return position && defaults?.[position] === 'left' ? 'left' : 'center';
}
