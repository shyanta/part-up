Partup.ui.strings = {

    /**
     * Slugify helper
     *
     * @memberOf partup.ui
     * @param {String} string to slugify
     */
    slugify: function(stringToSlugify) {

        if(typeof stringToSlugify !== 'string') {
            return stringToSlugify;
        }

        return stringToSlugify.trim().replace(' ', '-').replace('.', '-');
        
    }

};