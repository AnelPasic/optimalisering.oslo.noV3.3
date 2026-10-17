import {z} from 'astro/zod';
export const assessmentLayouts=['split','horizontal'] as const;
export const assessmentLayoutSchema=z.preprocess(value=>value==null||value===''?'split':value,z.enum(assessmentLayouts));
export type AssessmentLayout=z.infer<typeof assessmentLayoutSchema>;
