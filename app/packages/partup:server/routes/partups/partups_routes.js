Router.route('/partups/discover/count', {where: 'server'}).post(function() {
    var request = this.request;
    var response = this.response;

    // We are going to respond in JSON format
    response.setHeader('Content-Type', 'application/json');

    var parameters = {
        networkId: request.body.networkId,
        locationId: request.body.locationId,
        sort: request.body.sort,
        textSearch: request.body.textSearch,
        limit: request.body.limit,
        skip: request.body.skip,
        language: (request.body.language === 'all') ? undefined : request.body.language
    };

    var userId = request.user ? request.user._id : null;
    var partups = Partups.findForDiscover(userId, {}, parameters);

    return response.end(JSON.stringify({error: false, count: partups.count()}));
});
