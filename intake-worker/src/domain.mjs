export const json = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff', ...headers },
});

export function parseSites(env) {
  const source = JSON.parse(env.SITES_JSON || '{}');
  const sites = new Map();
  for (const [name, config] of Object.entries(source)) {
    if (!/^[a-z0-9.-]{3,200}$/.test(name) || !Array.isArray(config?.origins)) throw Error('Invalid site config');
    const origins = new Set(config.origins.map(origin => {
      const u = new URL(origin);
      if (!['https:','http:'].includes(u.protocol) || u.pathname !== '/' || u.search || u.hash || u.username || u.password || (u.protocol==='http:' && u.hostname!=='localhost' && u.hostname!=='127.0.0.1')) throw Error('Invalid allowed origin');
      return u.origin;
    }));
    if (!origins.size) throw Error('No site origins');
    sites.set(name, { origins });
  }
  if (!sites.size) throw Error('Sites not configured');
  return sites;
}

export function allowedOrigin(sites, origin) {
  if (!origin) return false;
  return [...sites.values()].some(site => site.origins.has(origin));
}

export function validateLead(body, sites, origin) {
  if (!body || typeof body!=='object' || Array.isArray(body)) throw Error('Invalid payload');
  const site = body.site;
  if (typeof site!=='string' || !sites.has(site) || !sites.get(site).origins.has(origin)) throw Error('Invalid site origin');
  if (!['gratis-sjekk','pakke-bestilling'].includes(body.form)) throw Error('Invalid form');
  const urlInput = String(body.website || '').trim();
  let url;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(urlInput) ? urlInput : `https://${urlInput}`);
  } catch { throw Error('Invalid website'); }
  if (!['http:','https:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password || urlInput.length > 2048) throw Error('Invalid website');
  url.hash=''; url.search='';
  const email = String(body.email || '').trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw Error('Invalid email');
  const message = body.message===undefined?'':String(body.message).trim();
  if (message.length>2000) throw Error('Invalid message');
  const model = body.model===undefined?'':String(body.model).trim();
  if (!['','henvendelser','nettbutikk','annet'].includes(model)) throw Error('Invalid model');
  const src = body.source && typeof body.source==='object' && !Array.isArray(body.source)?body.source:{};
  const source = {};
  for (const name of ['page','landing_page']) {
    const v=src[name]; if(typeof v==='string' && v.startsWith('/')&&!v.startsWith('//')) source[name]=v.split(/[?#]/)[0].slice(0,300);
  }
  for (const name of ['utm_source','utm_medium','utm_campaign','utm_content']) {
    const v=src[name]; if(typeof v==='string' && v.length<=120 && /^[\p{L}\p{N} _./+-]+$/u.test(v))source[name]=v;
  }
  if(typeof src.referrer==='string') { try {const u=new URL(src.referrer);if(['https:','http:'].includes(u.protocol))source.referrer=u.origin;} catch {} }
  const payload={site,form:body.form,website:url.href,email,model,message,source};
  if(body.form==='pakke-bestilling') {
    const packageKey=String(body.package || '');
    const phone=String(body.phone||'').trim();
    if (!['optimalisering','vekst','partner'].includes(packageKey) || !/^[+()\d .-]{5,40}$/.test(phone)) throw Error('Invalid order');
    payload.package=packageKey;payload.phone=phone;payload.intent='order';
  }
  return payload;
}

export async function readSmallJson(request, maxBytes=16384) {
  if(!/^application\/json(?:;|$)/i.test(request.headers.get('content-type')||''))throw Error('Unsupported content type');
  const size=Number(request.headers.get('content-length')||'0'); if(size>maxBytes)throw Error('Too large');
  const reader=request.body?.getReader();if(!reader)throw Error('Missing body');
  let n=0;const chunks=[];
  try {while(true){const {value,done}=await reader.read();if(done)break;n+=value.byteLength;if(n>maxBytes)throw Error('Too large');chunks.push(value);}}finally{reader.releaseLock();}
  const b=new Uint8Array(n);let offset=0;for(const c of chunks){b.set(c,offset);offset+=c.length;}
  try{return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(b));}catch{throw Error('Invalid JSON');}
}

export async function hashPayload(value) {
  const input = new TextEncoder().encode(JSON.stringify(value));
  const digest=await crypto.subtle.digest('SHA-256',input);
  return [...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
}
