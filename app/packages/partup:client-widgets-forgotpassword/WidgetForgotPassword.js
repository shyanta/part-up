/*************************************************************/
/* Widget initial */
/*************************************************************/
var resetSentSuccessful = new ReactiveVar(false);

Template.WidgetForgotPassword.onRendered(function() {
    AutoForm.resetForm("forgotPasswordForm");
});


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetForgotPassword.helpers({
    formSchema: Partup.schemas.forms.forgotPassword,
    placeholders: Partup.services.placeholders.forgotPassword,
    resetSentSuccessful: function() {
        return resetSentSuccessful.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetForgotPassword.events({

});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    forgotPasswordForm: {
        beginSubmit: function() {
            Partup.ui.forms.removeAllStickyFieldErrors(this);
        },
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            Accounts.forgotPassword({email: insertDoc.email}, function(error) {

                // Error cases
                if(error && error.message) {
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
