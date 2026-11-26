import { eligible, landing, safePage, siteOrigin, trafficServiceUrl } from './traffic-source.mjs';

export default {
  async fetch(request, env, ctx) {
    const source = new URL(request.url);
    if (source.hostname === "optimalisering-oslo-v33.anel.workers.dev") {
      const target = new URL(siteOrigin);
      target.pathname = source.pathname;
      target.search = source.search;
      return Response.redirect(target, 308);
    }

    const response = await env.ASSETS.fetch(request);
    if (env.HITCOUNTER && eligible(request, response, source)) {
      const event = { page: safePage(source.pathname), ...landing(source, request.headers.get('Referer')) };
      ctx.waitUntil(Promise.resolve().then(async () => {
        const result = await env.HITCOUNTER.fetch(trafficServiceUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        });
        if (!result.ok) throw new Error('counter unavailable');
      }).catch(() => console.error('hitcount-unavailable')));
    }
    return response;
  },
};
