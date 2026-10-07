import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => new Response(site.preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
