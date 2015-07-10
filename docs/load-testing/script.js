meteorDown.run({
    concurrency: 10,
    url: 'http://localhost:3000'
});

meteorDown.init(function(Meteor) {
    Meteor.call('ping', function(error, result) {
        Meteor.kill();
    });
});
