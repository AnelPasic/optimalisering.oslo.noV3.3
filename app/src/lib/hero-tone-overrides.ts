import {z} from 'astro/zod';

// Editorial settings only: these fields never alter rendered copy or create an AI rewrite job.
export const heroTonePresetValues=['inherit','noktern','medon','spiss','spissplus','spisspluskomisk','spisspluskomiskplus'] as const;
const option=z.enum(heroTonePresetValues).optional();
export const heroToneOverridesSchema=z.object({
 eyebrowPreset:option,
 titlePreset:option,
 supportPreset:option,
 primaryCtaPreset:option,
 secondaryCtaPreset:option,
}).strict().optional();
