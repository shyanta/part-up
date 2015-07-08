/**
 * Create the update for the contribution
 */
Event.on('partups.contributions.inserted', function(userId, contribution) {
    if (!userId) return;

    var updateType = contribution.verified ? 'partups_contributions_added' : 'partups_contributions_proposed';
    var updateTypeData = {
        activity_id: contribution.activity_id,
        contribution_id: contribution._id
    };

    var update = Partup.factories.updatesFactory.make(userId, contribution.partup_id, updateType, updateTypeData);
    var updateId = Updates.insert(update);

    Contributions.update({_id: contribution._id}, {$set: {update_id: updateId}});

    var user = Meteor.users.findOneOrFail(userId);
    var activity = Activities.findOneOrFail(contribution.activity_id);
    var system_message_type = contribution.verified ? 'system_contributions_added' : 'system_contributions_proposed';
    Partup.server.services.system_messages.send(user, activity.update_id, system_message_type, {update_timestamp: false});
});

/**
 * Change update_type of Update when the Contribution is changed
 */
Event.on('partups.contributions.updated', function(userId, contribution, oldContribution) {
    if (!userId) return;
    if (!oldContribution.update_id) return;

    var cause = false;
    if (!oldContribution.archived && contribution.archived) {
        cause = 'archived';
    } else if (oldContribution.archived && !contribution.archived) {
        cause = 're-added';
    } else if (!oldContribution.verified && contribution.verified) {
        cause = 'verified';
    }

    var set = {
        upper_id: userId,
        type: cause === 're-added' ? 'partups_contributions_proposed' : 'partups_contributions_changed',
        updated_at: new Date()
    };

    Updates.update({_id: contribution.update_id}, {$set: set});

    var user = Meteor.users.findOneOrFail(userId);
    var activity = Activities.findOneOrFail(contribution.activity_id);

    // When there's a cause, it means that the system_message will be created somewhere else
    if (!cause) {
        Partup.server.services.system_messages.send(user, activity.update_id, 'system_contributions_updated', {update_timestamp: false});
    }

    if (cause === 're-added') {
        var system_message_type = contribution.verified ? 'system_contributions_added' : 'system_contributions_proposed';
        Partup.server.services.system_messages.send(user, activity.update_id, system_message_type, {update_timestamp: false});
    }
});

/**
 * Change update_type of Update when the Contribution is archived
 */
Event.on('partups.contributions.archived', function(userId, contribution) {
    if (!userId) return;
    if (!contribution.update_id) return;

    var set = {
        upper_id: userId,
        type: 'partups_contributions_removed',
        updated_at: new Date()
    };

    Updates.update({_id: contribution.update_id}, {$set: set});

    var user = Meteor.users.findOneOrFail(userId);
    var activity = Activities.findOneOrFail(contribution.activity_id);
    Partup.server.services.system_messages.send(user, activity.update_id, 'system_contributions_removed', {update_timestamp: false});
});

/**
 * Generate a Notification for an Upper when his contribution(s) get(s) accepted
 */
Event.on('contributions.accepted', function(userId, partupId, upperId) {
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

    Partup.server.services.notifications.send(notificationOptions, function(error) {
        if (error) return Log.error(error);

        Log.debug('Notification generated for User [' + upperId + '] with type [' + notificationOptions.type + '].');
    });
});

/**
 * Generate a Notification for an Upper when his contribution gets rejected
 */
Event.on('contributions.rejected', function(userId, activityId, upperId) {
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

    Partup.server.services.notifications.send(notificationOptions, function(error) {
        if (error) return Log.error(error);

        Log.debug('Notification generated for User [' + upperId + '] with type [' + notificationOptions.type + '].');
    });
});
