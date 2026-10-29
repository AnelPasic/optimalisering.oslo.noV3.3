import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
export const previewRules = "https://:version.:subdomain.workers.dev/*\n  X-Robots-Tag: noindex, nofollow\nhttps://:subdomain.workers.dev/*\n  X-Robots-Tag: noindex, nofollow\nhttps://:branch.:project.pages.dev/*\n  X-Robots-Tag: noindex, nofollow\nhttps://:project.pages.dev/*\n  X-Robots-Tag: noindex, nofollow\n";
export const privateRouteRules = "/404.html\n  X-Robots-Tag: noindex, nofollow\n/design-system/*\n  X-Robots-Tag: noindex, nofollow\n";
export function getNoindex(data){
 if(data.searchEngineNoindex===undefined)return true;
 if(typeof data.searchEngineNoindex!=='boolean')throw Error('CMS searchEngineNoindex must be boolean');
 return data.searchEngineNoindex;
}
export function renderHeaders(noindex){
 if(typeof noindex!=='boolean')throw Error('Expected boolean noindex');
 return '# Generated from CMS appearance by normal build.\n'+(noindex?'/*\n  X-Robots-Tag: noindex, nofollow\n':previewRules)+privateRouteRules;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const data=JSON.parse(readFileSync('src/content/site-chrome/appearance.json','utf8'));
 const noindex=getNoindex(data);
 writeFileSync('dist/_headers',renderHeaders(noindex));
 if(noindex)console.warn('[LAUNCH CHECK] noindex PÅ: produksjonsdomenet vil fortsatt være skjult ved lansering.');
 else console.log('[LAUNCH CHECK] Global noindex AV. Cloudflare preview-hosts og tekniske ruter forblir noindex.');
}
