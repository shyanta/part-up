Partup.ui.forms = {

    /**
     * Add custom error to field helper
     *
     * @memberOf partup.ui
     * @param {Object} form
     * @param {String} fieldName
     * @param {String} errorReason
     */
    addCustomFieldError: function(form, fieldName, errorReason) {
        form.addStickyValidationError(fieldName, errorReason);
        AutoForm.validateForm(form.formId);
        var input = form.template.find('[data-schema-key=' + fieldName + ']');
        $(input).trigger('error');
    }

};