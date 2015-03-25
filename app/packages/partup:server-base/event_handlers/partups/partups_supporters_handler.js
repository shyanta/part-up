/**
 * Generate an Update in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function (partup, upper) {
    var update = {
        partup_id: partup._id,
        type: 'partups.supporters.new',
        supporter: upper._id,
        created_at: Date.now()
    };

    // TODO: Validation

    Updates.insert(update, function (error, id) {
        update._id = id;

        Event.emit('partups.updates.inserted', update);
        Log.debug('Update generated for Partup [' + partup._id + '] with type [partups.supporters.new].');
    });
});

/**
 * Generate a Notification for each upper in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function (partup, upper) {
    var notification = {
        type: 'partups.supporters.new',
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
    }

    if (partup.uppers) {
        partup.uppers.forEach(function (upperId) {
            notification.for_upper_id = upperId;
            Notifications.insert(notification, function (error) {
                if (error) return Log.error(error);

                Log.debug('Notification generated for User [' + upperId + '] with type [partups.supporters.new].');
            });
        });
    }
});
