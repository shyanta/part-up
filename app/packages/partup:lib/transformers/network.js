/**
 @namespace Network transformer service
 @name partup.transformers.network
 @memberof Partup.transformers
 */
Partup.transformers.network = {
    /**
     * Transform network to start network form
     *
     * @memberof Partup.transformers.network
     * @param {object} network
     */
    'toFormNetwork': function(network) {
        return {
            _id: network._id,
            privacy_type: network.privacy_type,
            description: network.description,
            location_input: Partup.services.location.locationToLocationInput(network.location),
            name: network.name,
            tags_input: Partup.services.tags.tagArrayToInput(network.tags),
            website: network.website,
            image: network.image,
            icon: network.icon
        };
    },

    /**
     * Transform network form to network
     *
     * @memberof Partup.transformers.network
     * @param {mixed[]} fields
     */
    'fromFormNetwork': function(fields) {
        fields.tags = Partup.services.tags.tagInputToArray(fields.tags_input);

        var newLocation = Partup.services.location.locationInputToLocation(fields.location_input);
        if (newLocation) fields.location = newLocation;

        delete fields.tags_input;
        delete fields.location_input;

        return fields;
    }
};
