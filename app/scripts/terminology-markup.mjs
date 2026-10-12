// Inline links must not create synthetic spaces inside the source sentence.
// Preserve the unchanged content oracle when stripping block-level markup.
export const stripTerminologyLinks = html => html.replace(/<a\b[^>]*\bdata-term="[^"]+"[^>]*>([^<]*)<\/a>/g, '$1');
