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
     * @param {object} upper
     * @param {object} partup
     */
    'fromForm': function(fields, upper, partup) {

        fields.created_at = new Date();
        fields.updated_at = new Date();
        fields.creator_id = upper._id;
        fields.partup_id = partup._id;
        fields.archived = false;

        return fields;
    }

};
