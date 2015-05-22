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
 * Change update_type of Update when the Contribution is changed
 */
Event.on('partups.contributions.updated', function (userId, contribution, oldContribution) {
    if (! userId) return;
    if (! oldContribution.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_contributions_changed',
        updated_at: new Date()
    };

    Updates.update({ _id: contribution.update_id }, { $set: set });
});

/**
 * Change update_type of Update when the Contribution is archived
 */
Event.on('partups.contributions.archived', function (userId, contribution) {
    if (! userId) return;
    if (! contribution.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_contributions_removed',
        updated_at: new Date()
    };

    Updates.update({ _id: contribution.update_id }, { $set: set });
});

/**
 * Generate a Notification for an Upper when his contribution(s) get(s) accepted
 */
Event.on('contributions.accepted', function (userId, partupId, upperId) {
    var partup = Partups.findOneOrFail(partupId);
    var notificationOptions = {
        type: 'partups_contributions_accepted',
        typeData: {
            partup: {
                name: partup.name,
                image: partup.image
            }
        }
    };

    notificationOptions.userId = upperId;

    Partup.services.notifications.send(notificationOptions, function (error) {
        if (error) return Log.error(error);

        Log.debug('Notification generated for User [' + upperId + '] with type [' + notificationOptions.type + '].');
    });
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
