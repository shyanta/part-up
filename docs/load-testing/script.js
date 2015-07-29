meteorDown.run({
    concurrency: 1000,
    url: 'http://pu-staging.lifely.nl'
});

meteorDown.init(function(Meteor) {
    Meteor.subscribe('users.loggedin');

    Meteor.call('partups.discover', {}, function(error, result) {
        Meteor.subscribe('partups.by_ids', result);
        Meteor.kill();
    });
});
