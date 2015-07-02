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
            image: network.image
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
        fields.location = Partup.services.location.locationInputToLocation(fields.location_input);

        delete fields.tags_input;
        delete fields.location_input;

        return fields;
    }
};
