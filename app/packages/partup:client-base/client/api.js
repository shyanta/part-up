/**
 * Access the HTTP endpoints
 *
 * @class API
 * @memberof Partup.client
 */
Partup.client.API = {

    /**
     * GET request and save results to local minimongo collections
     *
     * @param {String} url
     * @param {Object} options
     * @param {Function} callback
     */
    get: function(url, options, callback) {
        HTTP.get(url, options, function(error, result) {
            if (error) {
                callback(error);
                return;
            }

            callback(null, result.data);
        });
    },

    /**
     * POST request and save results to local minimongo collections
     *
     * @param {String} url
     * @param {Object} options
     * @param {Function} callback
     */
    post: function(url, options, callback) {
        HTTP.post(url, options, function(error, result) {
            if (error) {
                callback(error);
                return;
            }

            callback(null, result.data);
        });
    }
};
