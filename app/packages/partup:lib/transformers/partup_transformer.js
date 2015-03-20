Partup.transformers.partup = {

    /**
     * Transform partup to start partup form
     *
     * @param {object} partup
     */
    'toFormStartPartup':function(partup) {
        return {
            _id: partup._id,
            description: partup.description,
            end_date: partup.end_date,
            location_input: Partup.services.partup.locationToLocationInput(partup.location),
            name: partup.name,
            tags_input: partup.tags.join(',')
        };
    },

    /**
     * Transform startpartup form to partup
     *
     * @param {mixed[]} fields
     * @param {object} upper
     */
    'fromFormStartPartup': function(fields, upper) {
        return {
            // form fields
            name: fields.name,
            description: fields.description,
            tags: fields.tags_input.split(','),
            end_date: fields.end_date,
            location: {
                country: fields.location_input
            },
            // meta fields
            created_at: new Date(),
            creator_id: upper._id,
            uppers: [upper._id]
        }
    }
}