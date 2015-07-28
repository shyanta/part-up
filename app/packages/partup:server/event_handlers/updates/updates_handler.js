var d = Debug('event_handlers:updates_handler');

/**
 * Generate a notification for the partners and supporters in a partup when a message is created
 */
Event.on('partups.updates.inserted', function(userId, update) {
    var partup = Partups.findOneOrFail(update.partup_id);
    var creator = Meteor.users.findOneOrFail(update.upper_id);

    if (update.type === 'partups_message_added') {
        var notificationOptions = {
            type: 'partups_messages_inserted',
            typeData: {
                partup: {
                    _id: partup._id,
                    name: partup.name
                },
                creator: {
                    _id: creator._id,
                    name: creator.name,
                    image: creator.image
                }
            }
        };

        // Send a notification to each partner of the partup
        var uppers = partup.uppers || [];
        uppers.forEach(function(partnerId) {
            if (userId === partnerId) return;
            notificationOptions.userId = partnerId;
            Partup.server.services.notifications.send(notificationOptions);
        });

        // Send a notification to each supporter of the partup
        var supporters = partup.supporters || [];
        supporters.forEach(function(supporterId) {
            if (userId === supporterId) return;
            notificationOptions.userId = supporterId;
            Partup.server.services.notifications.send(notificationOptions);
        });
    }
});
