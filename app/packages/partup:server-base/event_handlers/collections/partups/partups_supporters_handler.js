Event.on('collections.partups.supporters.inserted', function (partup, upper) {
    var notification = {
        type: 'partups.supporters.new',
        type_data: {
            supporter: {
                id: upper._id,
                name: upper.name,
                image: upper.image
            },
            new: true,
        }
    }

    if (partup.uppers) {
        partup.uppers.forEach(function (upperId) {
            notification.for_upper_id = upperId;
            Notifications.insert(notification);
        });
    }

    Log.debug('Partup [' + partup._id + '] inserted.');
});
