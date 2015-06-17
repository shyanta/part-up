Partup.client.strings = {

    /**
     * Slugify helper
     *
     * @memberOf Partup.client
     * @param {String} string to slugify
     */
    slugify: function(stringToSlugify) {

        if (typeof stringToSlugify !== 'string') {
            return stringToSlugify;
        }

        return stringToSlugify
            .replace('.', '-')              // Replace . with -
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    },

    firstName: function(fullName) {
        if (fullName && fullName.match(/.*\s.*/)) {
            return fullName.split(' ')[0]
        } else {
            return fullName
        }
    },

    tagsStringToArray: function(tagString) {
        if (!tagString) return []
        return tagsArray = tagString.replace(/\s/g, '').split(',').map(function(tag) {
            return mout.string.slugify(tag);
        });
    }

};
