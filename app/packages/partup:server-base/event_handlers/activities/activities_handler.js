Event.on('partups.activities.inserted', function (userId, activity) {
    if (! userId) return;

    var update = {
        partup_id: activity.partup_id,
        upper_id: userId,
        type: 'partups_activities_added',
        type_data: {
            activity_id: activity._id
        },
        created_at: new Date(),
        updated_at: new Date()
    };

    var updateId = Updates.insert(update);
    Activities.update({ _id: activity._id }, { $set: { update_id: updateId }});
});

Event.on('partups.activities.updated', function (userId, activity, oldActivity) {
    if (! userId) return;
    if (! oldActivity.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_activities_changed',
        updated_at: new Date(),
    };

    Updates.update({ _id: activity.update_id }, { $set: set });
});
