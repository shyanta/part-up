/**
 @namespace Partup server google service
 @name Partup.server.services.google
 @memberOf partup.server.services
 */
Partup.server.services.google = {

    searchCities: function(query) {
        var key = process.env.GOOGLE_API_KEY;
        var response = HTTP.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=' + key + '&input=' + query + '&types=(cities)');

        if (response.statusCode !== 200) {
            Logger.error('Google places api returned with a [' + response.statusCode + ']', response);
            return [];
        }

        return mout.object.get(response, 'data.predictions') || [];
    },

    getCity: function(googlePlaceId) {
        var key = process.env.GOOGLE_API_KEY;
        var response = HTTP.get('https://maps.googleapis.com/maps/api/place/details/json?key=' + key + '&placeid=' + googlePlaceId);

        if (response.statusCode !== 200) {
            Logger.error('Google places api returned with a [' + response.statusCode + ']', response);
            return {};
        }

        return mout.object.get(response, 'data.result') || {};
    }

};
