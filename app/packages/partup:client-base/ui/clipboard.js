Partup.ui.clipboard = {
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