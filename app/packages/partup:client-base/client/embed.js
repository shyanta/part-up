/**
 * Embed helpers
 *
 * @class embed
 * @memberof Partup.client
 */
Partup.client.embed = {
    partup: function(partup, images, networks, users) {

        // Add upperObjects to partup
        if (partup.uppers) {
            partup.upperObjects = partup.uppers.map(function(userId) {
                var upper = mout.object.find(users, {_id: userId});

                if (!upper) return {};

                // Add imageObject to upper image
                if (get(upper, 'profile.image')) {
                    upper.profile.imageObject = mout.object.find(images, {_id: upper.profile.image});
                }

                return upper;
            });
        }

        // Add partup image to partup
        if (partup.image) {
            partup.imageObject = mout.object.find(images, {_id: partup.image});
        }

        // Add network object to partup
        if (partup.network_id) {
            partup.networkObject = mout.object.find(networks, {_id: partup.network_id});

            if (partup.networkObject && partup.networkObject.icon) {
                partup.networkObject.iconObject = mout.object.find(images, {_id: partup.networkObject.icon});
            }
        }
    }
};
