var d = Debug('event_handlers:updates_messages_handler');

/**
 * Notify mentioned uppers
 */
Event.on('partups.messages.insert', function(upper, partup, update, message) {
    // Parse message for user mentions
    var mentions = Partup.helpers.mentions.extract(message);
    Log.debug(message);
    Log.debug(mentions);
    mentions.forEach(function(user) {
        if (partup.isViewableByUser(user._id)) {
            // Set the notification details
            var notificationOptions = {
                userId: user._id,
                type: 'partups_user_mentioned',
                typeData: {
                    mentioning_upper: {
                        _id: upper._id,
                        name: upper.name,
                        image: upper.image
                    },
                    update: {
                        _id: update._id
                    },
                    partup: {
                        _id: partup._id,
                        name: partup.name,
                        slug: partup.slug
                    }
                }
            };

            // Send the notification
            Partup.server.services.notifications.send(notificationOptions);
        }
    });
});
