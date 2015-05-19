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
    'toFormStartPartup':function(partup) {
        return {
            _id: partup._id,
            description: partup.description,
            budget_type: partup.budget_type,
            budget_amount: partup.budget_amount,
            end_date: partup.end_date,
            location_input: Partup.services.location.locationToLocationInput(partup.location),
            name: partup.name,
            tags_input: (partup.tags || []).join(', ')
        };
    },

    /**
     * Transform startpartup form to partup
     *
     * @memberOf partup.transformers.partup
     * @param {mixed[]} fields
     * @param {object} upper
     */
    'fromFormStartPartup': function(fields, upper) {
        var partup = {

            // form fields
            name: fields.name,
            description: fields.description,
            budget_type: fields.budget_type,
            budget_amount: fields.budget_amount,
            end_date: fields.end_date,
            image: fields.image,

            // meta fields
            created_at: new Date(),
            creator_id: upper._id,
            uppers: [upper._id]
        };

        if (fields.tags_input) {
            partup.tags = Partup.services.tags.tagInputToArray(fields.tags_input);
        }

        if (fields.location_input) {
            partup.location = Partup.services.location.locationInputToLocation(fields.location_input);
        }

        return partup;
    }

};
