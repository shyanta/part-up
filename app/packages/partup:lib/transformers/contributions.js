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
        if(!contribution) return undefined;
        return contributionValues = {
            _id: contribution._id,

            types_want_enabled: contribution.types.want.enabled,
            types_can_enabled: contribution.types.can.enabled,
            types_can_amount: contribution.types.can.amount,
            types_have_enabled: contribution.types.have.enabled,
            types_have_amount: contribution.types.have.amount,
            types_have_description: contribution.types.have.description
        };
    },

    /**
     * Transform form to contribution fields
     *
     * @memberOf partup.transformers.contribution
     * @param {mixed[]} fields
     */
    'fromFormContribution': function (fields) {
        var contribution = {
            types: {}
        };

        // create "want" field
        if (fields.types_want_enabled) {
            contribution.types.want = {
                enabled: true
            };
        } else {
            contribution.types.want = {
                enabled: false
            };
        }

        if (fields.types_can_enabled) {
            contribution.types.can = {
                enabled: true,
                amount: fields.types_can_amount
            }
        } else {
            contribution.types.can = {
                enabled: false
            }
        }

        if (fields.types_have_enabled) {
            contribution.types.have = {
                enabled: true,
                amount: fields.types_have_amount,
                description: fields.types_have_description
            };
        } else {
            contribution.types.have = {
                enabled: false
            };
        }

        return contribution;
    }
};