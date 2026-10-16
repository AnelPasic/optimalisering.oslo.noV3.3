import {z} from 'astro/zod';
export const heroLayoutValues=['split-right','split-left','centered'] as const;
export const heroLayoutSchema=z.preprocess(value=>value==null||value===''?undefined:value,z.enum(heroLayoutValues).default('split-right'));
/** Normal pages retain their existing owned copy/media; this object is presentation only. */
export const heroPresentationSchema=z.object({layout:heroLayoutSchema}).strict();
export const specialHeroPresentationSchema=z.object({notFound:heroPresentationSchema}).strict();
