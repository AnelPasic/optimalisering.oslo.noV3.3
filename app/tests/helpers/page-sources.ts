import {readdirSync,readFileSync} from 'node:fs';

// All canonical editor-owned root pages and managed articles; file paths are
// relative to src/content/pages so the CMS ownership contract is testable.
export function pageFilePaths():string[]{
 return [
  ...readdirSync('src/content/pages').filter(f=>f.endsWith('.json')),
  ...readdirSync('src/content/pages/managed-articles').filter(f=>f.endsWith('.json')).map(f=>'managed-articles/'+f),
 ].sort();
}
export const loadPageFile=(name:string)=>JSON.parse(readFileSync('src/content/pages/'+name,'utf8'));
