Event.on('partups.activities.inserted', function (userId, activity) {
    if (! userId) return;

    var update = {
        partup_id: activity.partup_id,
        upper_id: userId,
        type: 'partups_activities_added',
        type_data: {
            activity_id: activity._id
        },
        created_at: new Date()
    };

    var updateId = Updates.insert(update);
    Activities.update({ _id: activity._id }, { $set: { update_id: updateId }});
});
