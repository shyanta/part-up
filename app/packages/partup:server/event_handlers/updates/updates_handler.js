var d = Debug('event_handlers:updates_handler');

/**
 * Generate a notification for the partners and supporters in a partup when a message is created
 */
Event.on('partups.updates.inserted', function(userId, update) {
    var partup = Partups.findOneOrFail(update.partup_id);
    partup.getUsers().forEach(function(upperId) {
        // Update the new_updates list for all this partup's users
        partup.updateNewUpdatesForUpper(update._id, upperId);
    });

    if (update.type === 'partups_message_added' && !update.system) {
        var creator = Meteor.users.findOneOrFail(update.upper_id);

        var notificationOptions = {
            type: 'partups_messages_inserted',
            typeData: {
                creator: {
                    _id: creator._id,
                    name: creator.profile.name,
                    image: creator.profile.image
                },
                partup: {
                    _id: partup._id,
                    name: partup.name,
                    slug: partup.slug
                },
                update: {
                    _id: update._id
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

Event.on('partups.updates.updated', function(userId, update) {
    if (!update.system) {
        var partup = Partups.findOneOrFail(update.partup_id);

        // Update the new_updates list for all this partup's users
        partup.getUsers().forEach(function(upperId) {
            partup.updateNewUpdatesForUpper(update._id, upperId);
        });
    }
});
