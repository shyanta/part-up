var MetaInspector = Npm.require('node-metainspector');
var d = Debug('services:scrape');

/**
 @namespace Partup server scrape service
 @name Partup.server.services.scrape
 @memberof Partup.server.services
 */
Partup.server.services.scrape = {
    /**
     * Get scraped data from a URL
     * @param {String} url
     * @return {Object}
     */
    website: function(url) {
        var scraper = Meteor.wrapAsync(function(url, callback) {
            var client = new MetaInspector(url, {timeout: 5000});

            client.on('fetch', function() {
                return callback(null, client);
            });

            client.on('error', function() {
                return callback(null);
            });

            client.fetch();
        });

        return scraper(url);
    }
};
