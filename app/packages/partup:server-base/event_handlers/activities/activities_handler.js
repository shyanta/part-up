Event.on('partups.activities.inserted', function (userId, activity) {
    if (! userId) return;

    var type = 'partups_activities_added';
    var typeData = {
        activity_id: activity._id
    };

    var update = Partup.factories.updatesFactory.make(userId, activity.partup_id, type, typeData);
    var updateId = Updates.insert(update);

    Activities.update({ _id: activity._id }, { $set: { update_id: updateId }});
});

Event.on('partups.activities.updated', function (userId, activity, oldActivity) {
    if (! userId) return;
    if (! oldActivity.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_activities_changed',
        updated_at: new Date()
    };

    Updates.update({ _id: activity.update_id }, { $set: set });
});
