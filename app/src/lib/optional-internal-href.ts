import {z} from 'astro/zod';

/** Pages CMS can submit empty optional link inputs as '' or whitespace.
 * Normalize them only in parsed projections; never fabricate a destination.
 * Preserve the existing internal-only rule for nonempty hrefs.
 */
export const optionalInternalHref = z.preprocess(
 value => typeof value === 'string' && value.trim() === '' ? undefined : value,
 z.string().startsWith('/').optional(),
);
