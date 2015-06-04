/**
 * Generate a Notification for each upper in a Partup when a new message is posted.
 */
Event.on('partups.messages.inserted', function(partup, upper) {
    var notificationOptions = {
        type: 'partups_messages_new',
        typeData: {
            partup: {
                name: partup.name
            },
            upper: {
                id: upper._id,
                name: upper.profile.name,
                image: upper.profile.image
            }
        }
    };

    if (partup.uppers) {
        partup.uppers.forEach(function(upperId) {
            notificationOptions.userId = upperId;

            Partup.server.services.notifications.send(notificationOptions, function(error) {
                if (error) return Log.error(error);

                Log.debug('Notification generated for User [' + upperId + '] with type [' + notificationOptions.type + '].');
            });
        });
    }
});
