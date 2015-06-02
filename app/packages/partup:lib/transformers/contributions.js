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
    'toFormContribution': function(contribution) {
        return contribution ? contribution : undefined;
    },

    /**
     * Transform form to contribution fields
     *
     * @memberOf partup.transformers.contribution
     * @param {mixed[]} fields
     */
    'fromFormContribution': function(fields) {
        return {
            hours: fields.hours,
            rate: fields.rate
        };
    }
};
