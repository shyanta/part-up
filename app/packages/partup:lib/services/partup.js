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
        return location.country;
    }

};