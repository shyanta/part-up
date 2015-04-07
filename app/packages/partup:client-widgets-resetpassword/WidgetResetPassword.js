/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetRegisterOptional.onRendered(function() {
    AutoForm.resetForm("registerOptionalForm");
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetResetPassword.helpers({
    formSchema: Partup.schemas.forms.resetPassword,
    placeholders: Partup.services.placeholders.resetPassword
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetResetPassword.events({

});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    resetPasswordForm: {
        beginSubmit: function() {
            Partup.ui.forms.removeAllStickyFieldErrors(this);
        },
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
                    return;
                }

                self.done();
                Router.go('home');
            });

            return false;
        }
    }
});
