/**
 @namespace partup.services.location
 @memberOf partup.services
 */
Partup.services.location = {
    /**
     * Transform a location object into a display string
     *
     * @memberOf partup.services.location
     * @param {Object} location
     */
    locationToLocationInput: function(location) {
        return location && location.place_id;
    },

    /**
     * Transform a location input into location object
     *
     * @memberOf services.location
     * @param {String} placeId
     */
    locationInputToLocation: function(placeId) {
        var result = Partup.server.services.google.getCity(placeId);
        var location = {};

        location.city = result.name;
        location.lat = mout.object.get(result, 'geometry.location.lat');
        location.lng = mout.object.get(result, 'geometry.location.lng');
        location.place_id = result.place_id;

        // Initialise country in case we can't find it
        location.country = null;

        // Find the country
        var addressComponents = result.address_components || [];
        addressComponents.forEach(function(component) {
            if (mout.array.contains(component.types, 'country')) {
                location.country = component.long_name;
            }
        });

        return location;
    }
};
