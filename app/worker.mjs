export default {
  fetch(request, env) {
    const source = new URL(request.url);
    if (source.hostname === "optimalisering-oslo-v33.anel.workers.dev") {
      const target = new URL("https://optimalisering.oslo.no");
      target.pathname = source.pathname;
      target.search = source.search;
      return Response.redirect(target, 308);
    }

    return env.ASSETS.fetch(request);
  },
};
