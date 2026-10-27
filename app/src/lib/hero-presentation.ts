import {z} from 'astro/zod';
export const heroLayoutValues=['split-right','split-left','centered','centered-none'] as const;
export const heroPresetLabels={'split-right':'Tekst venstre / bilde høyre','split-left':'Bilde venstre / tekst høyre','centered':'Sentrert med bilde','centered-none':'Sentrert uten bilde'} as const;
export const heroLayoutSchema=z.preprocess(value=>value==null||value===''?undefined:value,z.enum(heroLayoutValues).default('split-right'));
/** Normal pages retain their existing owned copy/media; this object is presentation only. */
export const heroPresentationSchema=z.object({layout:heroLayoutSchema}).strict();
