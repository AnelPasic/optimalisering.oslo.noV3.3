/** CMS-only URL suggestion overlay.
 * Preserve authored source JSON unchanged. The selected URL wins for presentation;
 * manual href remains available when the selection is removed.
 */
export function safeCmsHref(value:unknown):value is string {
  if(typeof value!=='string'||!value.trim()||/[\u0000-\u001f\u007f<>"\\\s]/.test(value))return false;
  if(value.startsWith('/'))return !value.startsWith('//');
  try{const url=new URL(value);return (url.protocol==='https:'||url.protocol==='http:')&&!url.username&&!url.password;}
  catch{return false;}
}
export function projectSelectedLinks<T>(input:T):T {
  if(Array.isArray(input))return input.map(row=>projectSelectedLinks(row)) as T;
  if(!input||typeof input!=='object')return input;
  const source=input as Record<string,unknown>, result:Record<string,unknown>={};
  for(const [key,value] of Object.entries(source)){
    if(key==='suggestedHref')continue;
    result[key]=projectSelectedLinks(value);
  }
  const selected=source.suggestedHref;
  if(typeof selected==='string' && selected.trim()){
    if(!safeCmsHref(selected))throw new Error('Invalid selected CMS URL');
    result.href=selected;
  }else if(selected!=null && selected!=='')throw new Error('Invalid selected URL format');
  return result as T;
}
