/**
 @namespace Contribution transformer service
 @name partup.transformers.contribution
 @memberOf partup.transformers
 */
Partup.transformers.contribution = {

    /**
     * Transform contribution to form
     *
     * @memberOf partup.transformers.contribution
     * @param {object} contribution
     */
    'toFormContribution': function (contribution) {
        var contributionValues = {};

        contributionValues._id = contribution._id;

        contribution.types.forEach(function (type) {
            if (type.type == 'want') contributionValues.type_want = true;
            if (type.type == 'can' && type.type_data.amount) contributionValues.type_can_amount = type.type_data.amount;
            if (type.type == 'have' && type.type_data.amount) contributionValues.type_have_amount = type.type_data.amount;
            if (type.type == 'have' && type.type_data.description) contributionValues.type_have_description = type.type_data.description;
            if (type.type == 'donate' && type.type_data.amount) contributionValues.type_donate_amount = type.type_data.amount;
        });

        return contributionValues;
    },

    /**
     * Transform form to contribution fields
     *
     * @memberOf partup.transformers.contribution
     * @param {mixed[]} fields
     */
    'fromFormContribution': function (fields) {
        var contribution = {};
        var types = [];

        if (fields.type_want) types.push({'type': 'want'});

        if (fields.type_can_amount) {
            types.push({
                'type': 'can',
                'type_data': {
                    'amount': fields.type_can_amount
                }
            });
        }
        if (fields.type_have_amount && fields.type_have_description) {
            types.push(
                {
                    'type': 'have',
                    'type_data': {
                        'amount': fields.type_have_amount,
                        'description': fields.type_have_description
                    }
                }
            );
        } else if (fields.type_have_amount) {
            types.push(
                {
                    'type': 'have',
                    'type_data': {
                        'amount': fields.type_have_amount
                    }
                }
            );
        } else if (fields.type_have_description) {
            types.push(
                {
                    'type': 'have',
                    'type_data': {
                        'description': fields.type_have_description
                    }
                }
            );
        }

        contribution.types = types;

        return contribution;
    }
};