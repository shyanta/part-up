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
        var contributionValues = {};

        contributionValues._id = contribution._id;

        contribution.types.forEach(function(type) {
            if (type.type == 'want') contributionValues.type_want = true;
            if (type.type == 'can' && type.type_data.amount) contributionValues.type_can_amount = type.type_data.amount;
            if (type.type == 'have' && type.type_data.amount) contributionValues.type_have_amount = type.type_data.amount;
            if (type.type == 'have' && type.type_data.description) contributionValues.type_have_description = type.type_data.description;
        });

        return contributionValues;
    },

    /**
     * Transform form to contribution fields
     *
     * @memberOf partup.transformers.activity.contribution
     * @param {mixed[]} fields
     */
    'fromFormActivityContribution': function(fields) {
        var contribution = {};

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

        if (fields.type_have_amount) {
            contribution.types = [
                {
                    'type': 'have',
                    'type_data': {
                        'amount': fields.type_have_amount,
                    }
                }
            ];
        }

        if (fields.type_have_description) {
            contribution.types = [
                {
                    'type': 'have',
                    'type_data': {
                        'description': fields.type_have_description,
                    }
                }
            ];
        }

        return contribution;
    }
};

