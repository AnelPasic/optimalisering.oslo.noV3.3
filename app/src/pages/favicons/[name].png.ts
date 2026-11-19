import type { APIRoute, GetStaticPaths } from 'astro';
import { siteChrome } from '../../lib/site-chrome-data';
import { renderSiteFavicon, resolveSiteFavicon } from '../../lib/site-favicon';

export const getStaticPaths = (() => {
  const favicon = resolveSiteFavicon(siteChrome);
  if (!favicon?.generated) return [];
  return [{ params: { name: favicon.generated.name }, props: { source: favicon.generated.source } }];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const bytes = await renderSiteFavicon(props.source);
  return new Response(new Uint8Array(bytes), { headers: { 'Content-Type': 'image/png' } });
};
