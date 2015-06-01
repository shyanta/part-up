var placeholders = {
    'email': function () {
        return __('resetpassword-form-email-placeholder');
    },
    'password': function () {
        return __('resetpassword-form-password-placeholder');
    },
    'confirmPassword': function () {
        return __('resetpassword-form-confirmPassword-placeholder');
    }
};

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.modal_resetpassword.helpers({
    formSchema: Partup.schemas.forms.resetPassword,
    placeholders: placeholders
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_resetpassword.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('reset-password');
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    resetPasswordForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            var token = Router.current().params.token;
            Accounts.resetPassword(token, insertDoc.password, function(error) {
                if(error && error.message) {
                    switch (error.message) {
                        // case 'User not found [403]':
                        //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                        //     break;
                        default:
                            Partup.ui.notify.error(error.reason);
                    }
                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return false;
                }

                self.done();
                Partup.ui.intent.executeIntentCallback('reset-password');

            });

            return false;
        }
    }
});
