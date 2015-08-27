var d = Debug('fastrender');

var Cache = Partup.server.services.cache;

FastRender.onAllRoutes(function(path) {
    this.subscribe('users.loggedin');

    d('Fastrendered loggedin user');
});

FastRender.route('/discover', function(params) {
    if (Cache.has('discover_partupids')) {
        var partupIds = Cache.get('discover_partupids');

        this.subscribe('partups.by_ids', partupIds);

        d('Fastrendered discover partups');
    }
});

FastRender.route('/partups/:slug', function(params) {
    var partupId = params.slug.split('-').pop();

    this.subscribe('partups.one', partupId);
    this.subscribe('updates.from_partup', partupId);

    d('Fastrendered partup [' + partupId + '] and it\'s updates');
});

FastRender.route('/partups/:slug/activities', function(params) {
    var partupId = params.slug.split('-').pop();

    this.subscribe('partups.one', partupId);
    this.subscribe('activities.from_partup', partupId);

    d('Fastrendered partup [' + partupId + '] and it\'s activities');
});
