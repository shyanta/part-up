/**
 @namespace Network transformer service
 @name partup.transformers.network
 @memberOf partup.transformers
 */
Partup.transformers.network = {
    /**
     * Transform network to start network form
     *
     * @memberOf partup.transformers.network
     * @param {object} network
     */
    'toFormNetwork': function(network) {
        return {
            _id: network._id,
            privacy_type: network.privacy_type,
            description: network.description,
            location_input: Partup.services.location.locationToLocationInput(network.location),
            name: network.name,
            tags_input: Partup.services.tags.tagArrayToInput(network.tags)
        };
    },

    /**
     * Transform network form to network
     *
     * @memberOf partup.transformers.network
     * @param {mixed[]} fields
     */
    'fromFormNetwork': function(fields) {
        return {
            // form fields
            privacy_type: fields.privacy_type,
            name: fields.name,
            description: fields.description,
            tags: Partup.services.tags.tagInputToArray(fields.tags_input),
            location: Partup.services.location.locationInputToLocation(fields.location_input)
        };
    }
};
