/**
 * Generate a notification for an upper when getting accepted for a network
 */
Event.on('networks.accepted', function(userId, networkId, upperId) {
    var network = Networks.findOneOrFail(networkId);

    var notificationOptions = {
        userId: upperId,
        type: 'partups_networks_accepted',
        typeData: {
            network: {
                _id: network._id,
                name: network.name,
                image: network.image,
                slug: network.slug
            }
        }
    };

    Partup.server.services.notifications.send(notificationOptions);
});

/**
 * Generate a notification for the network admin when a new upper is pending
 */
Event.on('networks.new_pending_upper', function(network, pendingUpper) {
    // Send notification to network admin
    var notificationOptions = {
        userId: network.admin_id,
        type: 'partups_networks_new_pending_upper',
        typeData: {
            pending_upper: {
                _id: pendingUpper._id,
                name: pendingUpper.profile.name,
                image: pendingUpper.profile.image
            },
            network: {
                _id: network._id,
                name: network.name,
                image: network.image,
                slug: network.slug
            }
        }
    };

    Partup.server.services.notifications.send(notificationOptions);
});
