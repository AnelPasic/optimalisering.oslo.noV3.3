/** Pages CMS has no creatable Select. Two editor fields resolve to one safe runtime href.
 * Never mutate the saved CMS JSON, and never override a manual href unless selected.
 */
export function safeCmsHref(value: unknown): value is string {
 if(typeof value!=='string'||!value.trim()||/[\u0000-\u001f\u007f<>"\\\s]/.test(value))return false;
 if(value.startsWith('/'))return !value.startsWith('//')&&!value.includes('\\');
 if(value.startsWith('#'))return /^#[a-zA-Z][a-zA-Z0-9_-]*$/.test(value);
 try{const url=new URL(value);return (url.protocol==='https:'||url.protocol==='http:')&&!url.username&&!url.password;}catch{return false;}
}
const suggestedLinkFields: Record<string, string> = {
  suggestedHref: 'href',
  suggestedHeadingHref: 'headingHref',
};
const safeManualHref = (value: unknown) => safeCmsHref(value) ||
  (typeof value === 'string' && /^(mailto:[^<>\s@]+@[^<>\s@]+|tel:\+?[0-9 -]+)$/.test(value));

export function projectSelectedLinks<T>(input:T):T {
  if (Array.isArray(input)) return input.map(item => projectSelectedLinks(item)) as T;
  if (!input || typeof input !== 'object') return input;
  const source = input as Record<string, unknown>;
  const result = Object.fromEntries(Object.entries(source)
    .filter(([key]) => !Object.hasOwn(suggestedLinkFields, key))
    .map(([key, value]) => [key, projectSelectedLinks(value)]));
  for (const [suggestion, destination] of Object.entries(suggestedLinkFields)) {
    const selected = source[suggestion];
    if (selected == null || (typeof selected === 'string' && !selected.trim())) continue;
    if (!safeCmsHref(selected)) throw new Error('Invalid selected CMS URL');
    const manual = source[destination];
    const manualIsBlank = manual == null || (typeof manual === 'string' && !manual.trim());
    if (!manualIsBlank && !safeManualHref(manual))
      throw new Error('Invalid manual CMS URL');
    result[destination] = selected;
  }
  return result as T;
}
