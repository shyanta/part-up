Meteor.publish('partups.all', function () {
    return Partups.find({});
});

Meteor.publish('partups.recent', function () {
    return Partups.find({}, {sort: {createdAt: -1}, limit:3});
});

Meteor.publish('partups.supported', function () {
    return Partups.find({});
});

Meteor.publish('partups.detail', function (partupId) {
    return Partups.find({_id:partupId});
});