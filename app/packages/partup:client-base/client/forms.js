Partup.client.forms = {


    /**
     * Add sticky error to field helper
     *
     * @memberOf Partup.client
     * @param {Object} form
     * @param {String} fieldName
     * @param {String} errorReason
     */
    addStickyFieldError: function(form, fieldName, errorReason) {
        form.addStickyValidationError(fieldName, errorReason);
    },

    /**
     * Remove sticky error from field
     *
     * @memberOf Partup.client
     * @param {Object} form
     * @param {String} fieldName
     */
    removeStickyFieldError: function(form, fieldName) {
        form.removeStickyValidationError(fieldName);
    },

    /**
     * Remove all sticky errors
     *
     * @memberOf Partup.client
     * @param {Object} form
     */
    removeAllStickyFieldErrors: function(form) {
        var templateInstanceForForm = AutoForm.templateInstanceForForm(form.formId);
        lodash.each(templateInstanceForForm._stickyErrors, function(value, key) {
            form.removeStickyValidationError(key);
        });
    }

};
