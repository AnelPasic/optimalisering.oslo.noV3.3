import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createLeadPayload } from '../src/lib/lead.ts';
import { createOrderPayload } from '../src/lib/order.ts';
import { notifyLead } from './resend.mjs';

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };

export function createAppServer({ store, config, staticRoot }) {
  const rates = new Map();
  const rateWindow = 600000;
  return createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Cache-Control', 'no-store');
    const json = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
    try {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      if (pathname === '/api/health') { json(200, { ok: true, leadsReady: config.enabled }); return; }
      if (pathname.startsWith('/api/')) {
        if (pathname !== '/api/leads') { json(404, { ok: false }); return; }
        const origin = req.headers.origin;
        if (!origin || !config.origins.has(origin)) { json(403, { ok: false }); return; }
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        if (req.method === 'OPTIONS') {
          res.writeHead(204, { 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key' }); res.end(); return;
        }
        if (req.method !== 'POST') { res.setHeader('Allow', 'POST, OPTIONS'); json(405, { ok: false }); return; }
        if (!config.enabled) { json(503, { ok: false, error: 'not-configured' }); return; }
        if (!(req.headers['content-type'] ?? '').startsWith('application/json')) { json(415, { ok: false }); return; }
        const now = Date.now();
        for (const [key, item] of rates) { if (now - item.start > rateWindow) rates.delete(key); }
        const ip = req.socket.remoteAddress ?? 'unknown';
        const rate = rates.get(ip) ?? { start: now, count: 0 };
        rate.count += 1;
        rates.set(ip, rate);
        if (rate.count > 10) { res.setHeader('Retry-After', '600'); json(429, { ok: false }); return; }
        const raw = await readBody(req);
        let input;
        try { input = JSON.parse(raw); } catch { json(400, { ok: false }); return; }
        if (input?.website_confirmation) { json(422, { ok: false }); return; }
        if (input?.form === 'pakke-bestilling' && config.ordersEnabled !== true) { json(503, { ok: false, error: 'orders-not-enabled' }); return; }
        let payload;
        try {
          if (input.site !== config.site || !['gratis-sjekk', 'pakke-bestilling'].includes(input.form)) throw new Error('wrong-site');
          payload = (input.form === 'pakke-bestilling' ? createOrderPayload : createLeadPayload)(input, config.sourceCapture ? input.source ?? {} : {});
          payload.site = config.site;
        } catch { json(422, { ok: false, error: 'validation' }); return; }
        const key = req.headers['idempotency-key'] ?? randomUUID();
        if (typeof key !== 'string' || !/^[a-zA-Z0-9_-]{8,100}$/.test(key)) { json(422, { ok: false }); return; }
        let lead;
        try { lead = store.save(payload, key); }
        catch (error) { if (error.message === 'idempotency-conflict') { json(409, { ok: false }); return; } throw error; }
        // The acknowledgement means the enquiry and conversion are stored. Email state is separate.
        json(201, { ok: true, id: lead.id });
        void notifyLead(store, lead.id, config.email);
        return;
      }
      if (!staticRoot || !['GET', 'HEAD'].includes(req.method)) { json(404, { ok: false }); return; }
      const root = resolve(staticRoot);
      const path = resolve(root, `.${decodeURIComponent(pathname)}`);
      if (path !== root && !path.startsWith(root + sep)) { json(404, { ok: false }); return; }
      let file = path;
      let status = 200;
      try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); await stat(file); }
      catch { file = resolve(root, '404.html'); status = 404; }
      const body = await readFile(file);
      res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) { if (!res.headersSent) json(error.message === 'body-too-large' ? 413 : 500, { ok: false }); else res.end(); }
  });
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > 16384) { reject(new Error('body-too-large')); return; }
      chunks.push(chunk);
    });
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
