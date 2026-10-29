/** Pages CMS has no creatable Select. Two editor fields resolve to one safe runtime href.
 * Never mutate the saved CMS JSON, and never override a manual href unless selected.
 */
export function safeCmsHref(value: unknown): value is string {
 if(typeof value!=='string'||!value.trim()||/[\u0000-\u001f\u007f<>"\\\s]/.test(value))return false;
 if(value.startsWith('/'))return !value.startsWith('//')&&!value.includes('\\');
 if(value.startsWith('#'))return /^#[a-zA-Z][a-zA-Z0-9_-]*$/.test(value);
 try{const url=new URL(value);return (url.protocol==='https:'||url.protocol==='http:')&&!url.username&&!url.password;}catch{return false;}
}
export function projectSelectedLinks<T>(input:T):T {
 if(Array.isArray(input))return input.map(item=>projectSelectedLinks(item)) as T;
 if(!input||typeof input!=='object')return input;
 const source=input as Record<string,unknown>,result:Record<string,unknown>={};
 for(const [key,value] of Object.entries(source))if(key!=='suggestedHref')result[key]=projectSelectedLinks(value);
 const selected=source.suggestedHref;
 if(typeof selected==='string'&&selected.trim()){
   if(!safeCmsHref(selected))throw new Error('Invalid selected CMS URL');
   result.href=selected;
 }else if(selected!=null&&selected!=='')throw new Error('Invalid selected CMS URL');
 return result as T;
}
