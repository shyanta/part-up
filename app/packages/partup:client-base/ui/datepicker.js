Partup.ui.datepicker = {

    /**
     * Create a datepicker from a input
     *
     * @memberOf partup.ui
     * @param {Element} template
     * @param {String} input element selector
     */
    applyToInput: function(template, selector){
        Meteor.defer(function(){
            template.$(selector).datepicker({
                language: moment.locale(),
                format: "yyyy-mm-dd",
            });
        });
    }
}