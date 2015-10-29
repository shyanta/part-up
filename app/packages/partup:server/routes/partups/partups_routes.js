Router.route('/partups/featured', {where: 'server'}).get(function() {
    var request = this.request;
    var response = this.response;

    // We are going to respond in JSON format
    response.setHeader('Content-Type', 'application/json');

    var partup = Partups.findOne({'featured.active': true});

    response.end(JSON.stringify({error: false, result: partup}));
});
