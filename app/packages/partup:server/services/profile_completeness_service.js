var d = Debug('services:profile_completeness');

/**
 @namespace Partup server profile_completeness service
 @name Partup.server.services.profile_completeness
 @memberof Partup.server.services
 */
Partup.server.services.profile_completeness = {
    /**
     * Calculate new profile completeness percentage
     *
     * @param {Object} profile
     */
    calculate: function(profile) {
        //
        var totalValues = 0;
        var providedValues = 0;

        _.each(profile, function(value, key) {
            if (_.isObject(value)) {
                var doesContainValue = !mout.object.every(value, function(objectValue) {
                    return !objectValue;
                });
                if (doesContainValue) providedValues++;
            } else if (value !== undefined && value !== '' && value !== null) {
                providedValues++;
            }
            totalValues++;
        });

        return Math.round((providedValues * 100) / totalValues);
    }
};
