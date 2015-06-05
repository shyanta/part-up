/**
 * Generate an Update in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function(partup, upper) {
    var updateType = 'partups_supporters_added';
    var updateTypeData = {};
    var existingUpdateId = Updates.findOne({type: updateType, partup_id: partup._id, upper_id: upper._id}, {_id: 1});

    // Update the update if one exists
    if (existingUpdateId) {
        Partup.server.services.system_messages.send(upper, existingUpdateId, 'system_supporters_added');

        return;
    }

    var update = Partup.factories.updatesFactory.make(upper._id, partup._id, updateType, updateTypeData);

    // TODO: Validation

    Updates.insert(update);
});

/**
 * Update the Update in a Partup when a Supporter stops supporting.
 */
Event.on('partups.supporters.removed', function(partup, upper) {
    var existingUpdateId = Updates.findOne({type: 'partups_supporters_added', partup_id: partup._id, upper_id: upper._id}, {_id: 1});
    if (existingUpdateId) {
        Partup.server.services.system_messages.send(upper, existingUpdateId, 'system_supporters_removed');
    }
});

/**
 * Generate a Notification for each upper in a Partup when there is a new Supporter.
 */
Event.on('partups.supporters.inserted', function(partup, upper) {
    var notificationOptions = {
        type: 'partups_supporters_added',
        typeData: {
            partup: {
                name: partup.name
            },
            supporter: {
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
