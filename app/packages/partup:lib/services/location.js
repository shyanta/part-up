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
        if(location) {
            return location.city;
        } else {
            return '';
        }
    },

    /**
     * Transform a location input into location object
     *
     * @memberOf services.location
     * @param {String} location_input
     */
    locationInputToLocation: function(location_input) {
        return {
            city: location_input,
            country: undefined
        };
    }

};