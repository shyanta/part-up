/**
 @namespace Partup helper service
 @name Partup.services.location
 @memberOf partup.services
 */
Partup.services.location = {
    /**
     * Transform a location object into a display string
     *
     * @memberOf services.location
     * @param {Object} location
     */
    locationToLocationInput: function(location) {
        return location && location.city ? location.city : '';
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

        // Find the Country
        var addressComponents = result.address_components || [];
        addressComponents.forEach(function(component) {
            if (mout.array.contains(component.types, 'country')) {
                location.country = component.long_name;
            }
        });

        return location;
    }
};
