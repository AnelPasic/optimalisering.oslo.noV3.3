import type { APIRoute } from 'astro';
import { site } from '../config/site';
// Global indexing is handled by Cloudflare, never a second site-code toggle.
export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
