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

                // Done
                var done = function() {
                    self.done();
                    Partup.ui.modal.executeIntentCallback('reset-password');
                };

                // Try for auto login
                var email = Meteor.call('users.email.form.token', token);
                if(typeof email === 'string') {
                    Meteor.loginWithPassword(email, insertDoc.password, done);
                } else {
                    done();
                }
            });

            return false;
        }
    }
});
