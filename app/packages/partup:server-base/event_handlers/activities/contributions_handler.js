/**
 * Create the update for the contribution
 */
Event.on('partups.contributions.inserted', function (userId, contribution) {
    if (! userId) return;

    var updateType = 'partups_contributions_added';
    var updateTypeData = {
        activity_id: contribution.activity_id,
        contribution_id: contribution._id
    };

    var update = Partup.factories.updatesFactory.make(userId, contribution.partup_id, updateType, updateTypeData);
    var updateId = Updates.insert(update);

    Contributions.update({ _id: contribution._id }, { $set: { update_id: updateId }});
});

/**
 * Generate a Notification for an Upper when his contribution gets rejected
 */
Event.on('contributions.rejected', function (userId, activityId, upperId) {
    var activity = Activity.findOneOrFail(activityId);
    var partup = Partups.findOneOrFail(activity.partup_id);
    var notificationOptions = {
        type: 'partups_contributions_rejected',
        typeData: {
            partup: {
                name: partup.name,
                image: partup.image
            },
            activity: {
                name: activity.name
            }
        }
    };

    notificationOptions.userId = upperId;

    Partup.services.notifications.send(notificationOptions, function (error) {
        if (error) return Log.error(error);

        Log.debug('Notification generated for User [' + upperId + '] with type [' + notificationOptions.type + '].');
    });
});
