/**
 @namespace Activity transformer service
 @name partup.transformers.activity
 @memberOf partup.transformers
 */
Partup.transformers.activity = {
    /**
     * Transform form to activity
     *
     * @memberOf partup.transformers.activity
     * @param {mixed[]} fields
     * @param {string} upperId
     * @param {string} partupId
     */
    'fromForm': function(fields, upperId, partupId) {
        return {
            name: fields.name,
            description: fields.description,
            end_date: fields.end_date,
            created_at: new Date(),
            updated_at: new Date(),
            creator_id: upperId,
            partup_id: partupId,
            archived: false
        };
    }
};
