var placeholders = {
    'email': function () {
        return __('forgotpassword-form-email-placeholder');
    }
};

/*************************************************************/
/* Widget initial */
/*************************************************************/
var resetSentSuccessful = new ReactiveVar(false);

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.Forgotpassword.helpers({
    formSchema: Partup.schemas.forms.forgotPassword,
    placeholders: placeholders,
    resetSentSuccessful: function() {
        return resetSentSuccessful.get();
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    forgotPasswordForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            Accounts.forgotPassword({email: insertDoc.email}, function(error) {

                // Error cases
                if (error && error.message) {
                    switch (error.message) {
                        case 'User not found [403]':
                            Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                            break;
                        default:
                            Partup.ui.notify.error(error.reason);
                    }
                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return false;
                }

                // Success
                self.done();
                resetSentSuccessful.set(true);

            });

            return false;
        }
    }
});
