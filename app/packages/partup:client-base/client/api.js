/**
 * Access the HTTP endpoints and add the results to the local collections
 *
 * @class API
 * @memberof Partup.client
 */
Partup.client.API = {

    /**
     * GET request and save results to local minimongo collections
     *
     * @param {String} url
     * @param {Function} callback
     */
    get: function(url, callback) {
        var self = this;

        HTTP.get(url, function(error, result) {
            if (error) callback(error);

            self._apiResultToLocalCollections(result);
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
        var self = this;

        HTTP.post(url, options, function(error, result) {
            if (error) callback(error);

            self._apiResultToLocalCollections(result);
            callback(null, result.data);
        });
    },

    /**
     * Helper to save API call results to local minimongo collections
     *
     * @param {String} result
     */
    _apiResultToLocalCollections: function(result) {
        var collectionNames = Object.keys(result.data);

        _.each(collectionNames, function(collectionName) {
            var documents = result.data[collectionName];
            var collection = null;

            switch (collectionName) {
                case 'activities': collection = Activities; break;
                case 'contributions': collection = Contributions; break;
                case 'invites': collection = Invites; break;
                case 'languages': collection = Languages; break;
                case 'networks': collection = Networks; break;
                case 'notifications': collection = Notifications; break;
                case 'partups': collection = Partups; break;
                case 'places': collection = Places; break;
                case 'places_autocompletes': collection = PlacesAutocompletes; break;
                case 'ratings': collection = Ratings; break;
                case 'tags': collection = Tags; break;
                case 'updates': collection = Updates; break;
                case 'users': collection = Meteor.users; break;
                case 'cfs.images.filerecord': collection = Images; break;
                default: return;
            }

            _.each(documents, function(document) {
                var exists = !!collection.findOne(document._id);
                if (!exists) collection._collection.insert(document);
            });
        });
    }

};
