import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { glossary } from '../lib/terminology';
export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  const urls = pages
    .filter(({ data }) => data.kind !== 'utility' && !data.seo.noindex)
    .map(({ data }) => `${site.url}/${data.slug === 'home' ? '' : data.slug + '/'}`);
  if (!glossary.seo?.noindex) urls.push(`${site.url}/begreper/`);
  urls.push(`${site.url}/konverteringsratekalkulator/`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
