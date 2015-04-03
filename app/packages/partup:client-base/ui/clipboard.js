Partup.ui.clipboard = {

    /**
     * Create a copy to clipboard element width callback
     *
     * @memberOf partup.ui
     * @param {Element} target element to serve as the clickable copy to clipboard
     * @param {function} Callback after copy
     */
    applyToElement: function(element, copyCallBack){
        // Disables other default handlers on click (avoid issues)
        element.on('click', function(e) {
            e.preventDefault();
        });

        // Apply clipboard click event
        element.clipboard({
            path: '/extra/jquery.clipboard.swf',

            copy: function() {
                $(this).select();
                var copyText = $(this).text();
                copyCallBack();
                return copyText;
            }
        });
    }
};