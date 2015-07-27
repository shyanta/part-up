/**
 * Generate a notification for an upper when getting accepted for a network
 */
Event.on('networks.accepted', function(userId, networkId, upperId) {
    var network = Networks.findOneOrFail(networkId);

    var notificationOptions = {
        type: 'partups_networks_accepted',
        typeData: {
            network: {
                _id: network._id,
                name: network.name,
                image: network.image
            }
        }
    };

    notificationOptions.userId = upperId;

    Partup.server.services.notifications.send(notificationOptions);
});
