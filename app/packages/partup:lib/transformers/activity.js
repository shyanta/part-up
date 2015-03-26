/**
 @namespace Activity transformer service
 @name partup.transformers.activity
 @memberOf partup.transformers
 */
Partup.transformers.activity = {

    /**
     * Transform activity to optional details form
     *
     * @memberOf partup.transformers.activity
     * @param {object} activity
     */
    'toFormActivity':function(activity) {
        return {

        };
    },

    /**
     * Transform form to activity fields
     *
     * @memberOf partup.transformers.activity
     * @param {mixed[]} fields
     */
    'fromFormActivity': function(fields) {
        return {

        }
    }
};

/**
 @namespace Contribution transformer service
 @name partup.transformers.activity.contribution
 @memberOf partup.transformers
 */
Partup.transformers.activity.contribution = {

    /**
     * Transform contribution to form
     *
     * @memberOf partup.transformers.activity.contribution
     * @param {object} contribution
     */
    'toFormActivityContribution':function(contribution) {
        return {

        };
    },

    /**
     * Transform form to contribution fields
     *
     * @memberOf partup.transformers.activity.contribution
     * @param {mixed[]} fields
     */
    'fromFormActivityContribution': function(fields) {
        var contribution = {};
        contribution._id = Random.id();
        contribution.created_at = Date.now();
        contribution.updated_at = Date.now();
        contribution.upper_id = upper._id;

        if (fields.type_want) {
            contribution.types = [
                {
                    'type': 'want'
                }
            ];
        }

        if (fields.type_can_amount) {
            contribution.types = [
                {
                    'type': 'can',
                    'type_data': {
                        'amount': fields.type_can_amount
                    }
                }
            ];
        }

        if (fields.type_have_amount || fields.type_have_description) {
            contribution.types = [
                {
                    'type': 'have',
                    'type_data': {
                        'amount': fields.type_have_amount,
                        'description': fields.type_have_description
                    }
                }
            ];
        }

        return contribution;
    }
};

