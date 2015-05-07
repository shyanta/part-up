/**
 * Generate an Update in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function (partup, upper) {
    var update = {
        partup_id: partup._id,
        upper_id: upper._id,
        type: 'partups_supporters_added',
        created_at: new Date(),
        updated_at: new Date()
    };

    // TODO: Validation

    Updates.insert(update);
});

/**
 * Generate a Notification for each upper in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function (partup, upper) {
    var notification = {
        type: 'partups_supporters_added',
        type_data: {
            partup: {
                name: partup.name
            },
            supporter: {
                id: upper._id,
                name: upper.profile.name,
                image: upper.profile.image
            }
        },
        new: true,
        created_at: new Date()
    }

    if (partup.uppers) {
        partup.uppers.forEach(function (upperId) {
            notification.for_upper_id = upperId;
            Notifications.insert(notification, function (error) {
                if (error) return Log.error(error);

                Log.debug('Notification generated for User [' + upperId + '] with type [partups_supporters_new].');
            });
        });
    }
});
