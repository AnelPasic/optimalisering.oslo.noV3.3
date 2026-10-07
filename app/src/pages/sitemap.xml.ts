import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  const urls = site.preview ? [] : pages.map(page => `${site.url}/${page.data.slug === 'home' ? '' : page.data.slug + '/'}`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
