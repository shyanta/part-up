/**
 * Generate an Update in a Partup when there is a new Upper.
 */
Event.on('partups.uppers.inserted', function (partup, upper) {
    var updateType = 'partups_uppers_added';
    var updateTypeData = { };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, updateType, updateTypeData);

    // TODO: Validation

    Updates.insert(update);
});

/**
 * Generate a Notification for an Upper when his contribution is allowed.
 */
Event.on('contributions.allowed', function (userId, partupId, upperId) {
    var partup = Partups.findOneOrFail(partupId);
    var notificationOptions = {
        type: 'partups_contributions_allowed',
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
