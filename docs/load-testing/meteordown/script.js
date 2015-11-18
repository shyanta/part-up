meteorDown.run({
    concurrency: 100,
    url: 'https://pu-acceptance.lifely.nl'
});

meteorDown.init(function(Meteor) {
    Meteor.subscribe('languages.all');
    Meteor.subscribe('users.loggedin');
    Meteor.subscribe('networks.list');
    Meteor.subscribe('partups.one', 'oopnTk8CouBWZhvkA');

    /*
    Meteor.call('partups.discover', {}, function(error, result) {
        Meteor.subscribe('partups.by_ids', result);
        Meteor.kill();
    });
    */
});
