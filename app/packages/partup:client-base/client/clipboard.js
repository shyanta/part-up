Partup.client.clipboard = {

    /**
     * Create a copy to clipboard element width callback
     *
     * @memberOf Partup.client
     * @param {Element} target element to serve as the clickable element
     * @param {String} text to copy
     * @param {Function} callback
     */
    applyToElement: function(element, text, callback) {

        // Apply clipboard click event
        $(element).clipboard({
            path: '/extra/jquery.clipboard.swf',

            copy: function() {
                callback();
                return text;
            }
        });

    }
};
