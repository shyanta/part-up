Meteor.publish('partups', function() {
    return Partups.find();
});
