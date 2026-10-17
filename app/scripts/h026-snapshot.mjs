// Browser-side snapshot shared by actual default/demo and source-preset checks.
export function captureH026(){
 const box=e=>e?Object.fromEntries(['x','y','width','height'].map(k=>[k,e.getBoundingClientRect()[k]])):null;
 const type=e=>{if(!e)return null;const s=getComputedStyle(e);return Object.fromEntries(['fontSize','fontFamily','fontWeight','lineHeight','letterSpacing','color','backgroundColor','borderRadius','paddingTop','paddingRight','paddingBottom','paddingLeft','textTransform','opacity'].map(k=>[k,s[k]]));};
 const item=e=>e?{box:box(e),type:type(e),text:e.textContent.replace(/\s+/g,' ').trim()}:null;
 const main=document.querySelector('main').cloneNode(true);main.querySelectorAll('script,style,[aria-hidden=true]').forEach(e=>e.remove());
 const footer=document.querySelector('.site-footer');
 return {text:main.textContent.replace(/\s+/g,' ').trim(),title:document.title,description:document.querySelector('meta[name=description]').content,canonical:new URL(document.querySelector('link[rel=canonical]').href).pathname,sections:[...document.querySelectorAll('main section[id]')].map(e=>e.id),h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,heroes:[...document.querySelectorAll('main .commercial-hero')].map(e=>({family:e.dataset.heroFamily,layout:e.dataset.heroLayout,visual:e.dataset.heroVisual,root:item(e),frame:box(e.querySelector('.hero-frame')),copy:box(e.querySelector('.page-hero-copy')),eyebrow:item(e.querySelector('.eyebrow')),heading:item(e.querySelector('h1,h2')),intro:item(e.querySelector('.hero-intro,.hero-support')),breadcrumbs:item(e.querySelector('.breadcrumbs')),media:item(e.querySelector('.hero-visual')),proof:item(e.querySelector('.hero-proof')),auxiliary:item(e.querySelector('.hero-auxiliary')),images:[...e.querySelectorAll('img')].map(i=>({src:i.getAttribute('src'),alt:i.getAttribute('alt'),position:getComputedStyle(i).objectPosition,fit:getComputedStyle(i).objectFit,box:box(i)})),links:[...e.querySelectorAll('a:not(.term-trigger)')].map(a=>({href:a.getAttribute('href'),...item(a)})),textFirst:(()=>{const c=e.querySelector('.page-hero-copy'),v=e.querySelector('.hero-visual,.hero-auxiliary');return !v||!!(c.compareDocumentPosition(v)&Node.DOCUMENT_POSITION_FOLLOWING);})()})),footer:{root:item(footer),grid:box(footer.querySelector('.footer-grid')),bottom:item(footer.querySelector('.footer-bottom')),brand:item(footer.querySelector('.footer-brand')),provider:item(footer.querySelector('.footer-grid p')),preview:item(footer.querySelector('.preview-tag')),navs:[...footer.querySelectorAll('nav')].map(n=>({label:n.getAttribute('aria-label'),links:[...n.querySelectorAll('a')].map(a=>({href:a.getAttribute('href'),...item(a)}))}))},cards:[...document.querySelectorAll('[data-content-card] .card-copy')].map(e=>({text:e.textContent,style:type(e)}))};
}

export function compareH026(actual,expected,label=''){
 function compare(a,b,path){
  if(typeof b==='number'){if(typeof a!=='number'||Math.abs(a-b)>1)throw Error(`${label} ${path}: ${a} vs ${b}`);return;}
  if(Array.isArray(b)){if(!Array.isArray(a)||a.length!==b.length)throw Error(`${label} ${path} array length differs`);b.forEach((v,i)=>compare(a[i],v,`${path}[${i}]`));return;}
  if(b&&typeof b==='object'){for(const k of Object.keys(b))compare(a?.[k],b[k],path+'.'+k);return;}
  if(a!==b)throw Error(`${label} ${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
 }
 compare(actual,expected,'snapshot');
}
