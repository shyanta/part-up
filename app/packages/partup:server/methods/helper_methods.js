var normalizer = Npm.require('normalizer');

/*
 * Helper methods
 */
Meteor.methods({
    /**
     * Normalize a string to remove accents
     *
     * @param {String} value
     * @return {String}
     */
    'helpers.normalize': function(value) {
        return normalizer.normalize(value);
    }
});
