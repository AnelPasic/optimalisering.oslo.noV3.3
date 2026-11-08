import { z } from 'astro/zod';
import { headingAlignSchema, sectionAlignmentDefaultsSchema } from './heading-alignment.ts';
import { sectionPositions } from './section-position.ts';
import { buttonStyleSchema } from './section-buttons.ts';
import { surfaceSchema, sectionSurfaceDefaultsSchema } from './surface.ts';

export const sectionDefaultsSchema = z.partialRecord(z.enum(sectionPositions), z.object({
  surface: surfaceSchema.optional(),
  headingAlign: headingAlignSchema.optional(),
  buttonStyle: buttonStyleSchema,
  boxButtonStyle: buttonStyleSchema,
}).strict());

interface SectionAppearance {
  sectionDefaults?: z.infer<typeof sectionDefaultsSchema>;
  sectionSurfaceDefaults?: z.infer<typeof sectionSurfaceDefaultsSchema>;
  sectionAlignmentDefaults?: z.infer<typeof sectionAlignmentDefaultsSchema>;
}

export function sectionDefaultsAt(appearance: SectionAppearance, index?: number) {
  const position = index === undefined ? undefined : sectionPositions[index];
  if (!position) return undefined;
  const current = appearance.sectionDefaults?.[position];
  return {
    ...current,
    surface: current?.surface ?? appearance.sectionSurfaceDefaults?.[position],
    headingAlign: current?.headingAlign ?? appearance.sectionAlignmentDefaults?.[position],
  };
}
