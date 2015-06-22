/**
 @namespace Partup transformer service
 @name partup.transformers.partup
 @memberOf partup.transformers
 */
Partup.transformers.partup = {
    /**
     * Transform partup to start partup form
     *
     * @memberOf partup.transformers.partup
     * @param {object} partup
     */
    'toFormStartPartup': function(partup) {
        // Find image for focuspoint
        var image = Images.findOne({_id: partup.image});

        var fields = {
            _id: partup._id,
            description: partup.description,
            budget_type: partup.budget_type,
            budget_money: partup.budget_money,
            budget_hours: partup.budget_hours,
            end_date: partup.end_date,
            location_input: Partup.services.location.locationToLocationInput(partup.location),
            name: partup.name,
            tags_input: Partup.services.tags.tagArrayToInput(partup.tags),
            focuspoint_x_input: image ? (mout.object.get(image, 'focuspoint.x') || 0) : 0,
            focuspoint_y_input: image ? (mout.object.get(image, 'focuspoint.y') || 0) : 0
        };

        // Determine privacy type
        if (partup.privacy_type === Partups.PUBLIC) {
            fields.privacy_type_input = 'public';
        } else if (partup.privacy_type === Partups.PRIVATE) {
            fields.privacy_type_input = 'private';
        } else if (partup.privacy_type === Partups.NETWORK_PUBLIC ||
            partup.privacy_type === Partups.NETWORK_INVITE ||
            partup.privacy_type === Partups.NETWORK_CLOSED) {
            fields.privacy_type_input = partup.network_id;
        }

        return fields;
    },

    /**
     * Transform startpartup form to partup
     *
     * @memberOf partup.transformers.partup
     * @param {mixed[]} fields
     */
    'fromFormStartPartup': function(fields) {
        var partup = {
            // form fields
            name: fields.name,
            description: fields.description,
            budget_type: fields.budget_type,
            budget_money: fields.budget_money,
            budget_hours: fields.budget_hours,
            end_date: fields.end_date,
            image: fields.image,
            tags: Partup.services.tags.tagInputToArray(fields.tags_input),
            location: Partup.services.location.locationInputToLocation(fields.location_input)
        };

        // Determine privacy type
        if (fields.privacy_type_input === 'public') {
            partup.privacy_type = Partups.PUBLIC;
        } else if (fields.privacy_type_input === 'private') {
            partup.privacy_type = Partups.PRIVATE;
        } else if (fields.privacy_type_input) {
            var network = Networks.findOneOrFail(fields.privacy_type_input);
            partup.network_id = network._id;
            switch (network.privacy_type) {
                case Networks.NETWORK_PUBLIC:
                    partup.privacy_type = Partups.NETWORK_PUBLIC;
                    break;
                case Networks.NETWORK_INVITE:
                    partup.privacy_type = Partups.NETWORK_INVITE;
                    break;
                case Networks.NETWORK_CLOSED:
                    partup.privacy_type = Partups.NETWORK_CLOSED;
                    break;
            }
        }

        // Save focuspoint
        Partup.server.services.images.storeFocuspoint(partup.image, fields.focuspoint_x_input || 0, fields.focuspoint_y_input || 0);

        return partup;
    }
};
