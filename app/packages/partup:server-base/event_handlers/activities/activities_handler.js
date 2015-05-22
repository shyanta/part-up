Event.on('partups.activities.inserted', function (userId, activity) {
    if (! userId) return;

    var updateType = 'partups_activities_added';
    var updateTypeData = {
        activity_id: activity._id
    };

    var update = Partup.factories.updatesFactory.make(userId, activity.partup_id, updateType, updateTypeData);
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

Event.on('partups.activities.removed', function (userId, activity) {
    if (! userId) return;
    if (! activity.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_activities_removed',
        updated_at: new Date()
    };

    Updates.update({ _id: activity.update_id }, { $set: set });
});

Event.on('partups.activities.archived', function (userId, activity) {
    if (! userId) return;
    if (! activity.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_activities_archived',
        updated_at: new Date()
    };

    Updates.update({ _id: activity.update_id }, { $set: set });
});

Event.on('partups.activities.unarchived', function (userId, activity) {
    if (! userId) return;
    if (! activity.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_activities_unarchived',
        updated_at: new Date()
    };

    Updates.update({ _id: activity.update_id }, { $set: set });
});