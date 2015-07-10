var slugify = Npm.require('slug');

/**
 @namespace Partup server slugify service
 @name Partup.server.services.slugify
 @memberof Partup.server.services
 */
Partup.server.services.slugify = {

    /**
     * Slugify a string
     *
     * @param  {String} value
     *
     * @return {String}
     */
    slugify: function(value) {
        return slugify(value).toLowerCase();
    },

    /**
     * Generate a slug in the following form:
     *
     * {slugified-property-value}-{document-id}
     *
     * Example: lifely-s-partup-12345
     *
     * @param  {Document} document
     * @param  {string} property
     */
    slugifyDocument: function(document, property) {
        var value = document[property];
        return slugify(value).toLowerCase() + '-' + document._id;
    }

};
