Partup.ui.datepicker = {

    /**
     * Create a datepicker from a input
     *
     * @memberOf partup.ui
     * @param {Element} template
     * @param {String} input element selector
     * @param {Number} delay to give to the defer, sometimes the template needs to be redered first (especially with autoform)
     */
    applyToInput: function(template, selector, delay){
        var deferDelay = delay ? delay : 0;
        Meteor.setTimeout(function(){
            template.$(selector).datepicker({
                language: moment.locale(),
                format: "yyyy-mm-dd",
            });
        }, deferDelay);
    }
}