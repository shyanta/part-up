var placeholders = {
    'email': function () {
        return __('pages-modal-forgotpassword-form-email-placeholder');
    }
};

/*************************************************************/
/* Widget initial */
/*************************************************************/
var resetSentSuccessful = new ReactiveVar(false);

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.modal_forgotpassword.helpers({
    formSchema: Partup.schemas.forms.forgotPassword,
    placeholders: placeholders,
    resetSentSuccessful: function() {
        return resetSentSuccessful.get();
    }
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_forgotpassword.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('login');
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
