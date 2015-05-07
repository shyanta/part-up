/**
 * Generate an Update in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function (partup, upper) {
    var updateType = 'partups_supporters_added';
    var updateTypeData = { };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, updateType, updateTypeData);

    // TODO: Validation

    Updates.insert(update);
});

/**
 * Generate a Notification for each upper in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function (partup, upper) {
    var notificationType = 'partups_supporters_added';
    var notificationTypeData = {
        partup: {
            name: partup.name
        },
        supporter: {
            id: upper._id,
            name: upper.profile.name,
            image: upper.profile.image
        }
    };

    if (partup.uppers) {
        partup.uppers.forEach(function (upperId) {
            var notification = Partup.factories.notificationsFactory.make(upperId, notificationType, notificationTypeData);

            Notifications.insert(notification, function (error) {
                if (error) return Log.error(error);

                Log.debug('Notification generated for User [' + upperId + '] with type [partups_supporters_new].');
            });
        });
    }
});
