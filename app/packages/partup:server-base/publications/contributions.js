Meteor.publish('contributions.perpartup', function (partupId) {
    return Contributions.find({ partup_id: partupId });
});
