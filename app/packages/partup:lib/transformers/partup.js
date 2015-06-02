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

        return {
            _id: partup._id,
            description: partup.description,
            budget_type: partup.budget_type,
            budget_money: partup.budget_money,
            budget_hours: partup.budget_hours,
            end_date: partup.end_date,
            location_input: Partup.services.location.locationToLocationInput(partup.location),
            name: partup.name,
            tags_input: Partup.services.tags.tagArrayToInput(partup.tags),
            focuspoint_x_input: mout.object.get(image, 'focuspoint.x') || 0,
            focuspoint_y_input: mout.object.get(image, 'focuspoint.y') || 0
        };
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

        // Save focuspoint
        Partup.services.images.storeFocuspoint(partup.image, fields.focuspoint_x_input || 0, fields.focuspoint_y_input || 0);

        return partup;
    }
};
