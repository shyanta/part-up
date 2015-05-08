/**
 @namespace Update transformer service
 @name partup.transformers.update
 @memberOf partup.transformers
 */
Partup.transformers.update = {

    /**
     * Transform form to new message
     *
     * @memberOf partup.transformers.update
     * @param {mixed[]} fields
     * @param {object} upper
     * @param {string} partupId
     */
    'fromFormNewMessage': function(fields, upper, partupId) {

        return {
            partup_id: partupId,
            type_data: {
                new_value: fields.text,
                images: fields.images
            },
            upper_id: upper._id,
            created_at: new Date(),
            updated_at: new Date()
        };

    }

};
