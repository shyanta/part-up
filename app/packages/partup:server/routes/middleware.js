// Disable all default response headers (we want to control them manually)
JsonRoutes.setResponseHeaders({});

// Enable caching for a couple of different endpoints
JsonRoutes.Middleware.use(function(request, response, next) {
    var urlRegexesToCache = [
        /\/networks\/[a-zA-Z0-9-]+$/, // /networks/lifely-open
        /\/networks\/featured\/[a-zA-Z]+$/, // /networks/featured/en
        /\/partups\/by_ids\/[a-zA-Z0-9,]+$/, // /partups/by_ids/vGaxNojSerdizDPjb
    ];

    var shouldCache = false;

    urlRegexesToCache.forEach(function(regex) {
        if (regex.test(request.url)) shouldCache = true;
    });

    response.setHeader('Cache-Control', shouldCache ? 'public, max-age=3600' : 'none');

    next();
});
