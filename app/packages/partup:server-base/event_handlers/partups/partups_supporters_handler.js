/**
 * Generate a Notification for each upper in a Partup when there is a new Supporter.
 */
Event.on('collections.partups.supporters.inserted', function (partup, upper) {
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
            Notifications.insert(notification);
        });
    }

    Log.debug('Partup [' + partup._id + '] inserted.');
});
