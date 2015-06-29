/**
 @namespace Contribution transformer service
 @name partup.transformers.contribution
 @memberof Partup.transformers
 */
Partup.transformers.contribution = {
    /**
     * Transform contribution to form
     *
     * @memberof Partup.transformers.contribution
     * @param {object} contribution
     */
    'toFormContribution': function(contribution) {
        return contribution ? contribution : undefined;
    },

    /**
     * Transform form to contribution fields
     *
     * @memberof Partup.transformers.contribution
     * @param {mixed[]} fields
     */
    'fromFormContribution': function(fields) {
        return {
            hours: fields.hours || null,
            rate: fields.rate || null
        };
    }
};
