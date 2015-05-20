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
