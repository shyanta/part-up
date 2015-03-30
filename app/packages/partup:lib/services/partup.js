/**
 @namespace Partup helper service
 @name partup.services.partup
 @memberOf partup.services
 */
Partup.services.partup = {
    /**
     * Transform a partup location object into a display string
     *
     * @memberOf services.partup
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
     * @memberOf services.partup
     * @param {String} location_input
     */
    locationInputToLocation: function(location_input) {
        return {
            city: location_input,
            country: undefined
        };
    }

};