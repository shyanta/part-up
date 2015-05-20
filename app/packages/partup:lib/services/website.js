/**
 @namespace Partup helper service
 @name Partup.services.website
 @memberOf partup.services
 */
Partup.services.website = {
    /**
     * Transform a clean url to a full url
     *
     * @memberOf services.website
     * @param {String} full url
     */
    cleanUrlToFullUrl: function(cleanUrl) {
        var fullUrl = cleanUrl;
        if(cleanUrl.indexOf('http://') !== 0 && cleanUrl.indexOf('https://') !== 0) {
            fullUrl = 'http://' + cleanUrl;
        }
        return fullUrl;
    },

    /**
     * Transform a full url to a clean url
     *
     * @memberOf services.website
     * @param {String} clean url
     */
    fullUrlToCleanUrl: function(fullUrl) {
        return fullUrl.replace(/^(http:\/\/|https:\/\/)/i, '');
    }

};