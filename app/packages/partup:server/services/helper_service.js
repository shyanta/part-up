var normalizer = Npm.require('normalizer');
var d = Debug('services:helper');

/**
 @namespace Partup server helper service
 @name Partup.server.services.helper
 @memberof Partup.server.services
 */
Partup.server.services.helper = {
    /**
     * Normalize a string to remove accents
     *
     * @param {String} value
     * @return {String}
     */
    normalize: function(value) {
        return normalizer.normalize(value);
    }
};
