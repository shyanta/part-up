var resetSentSuccessful = new ReactiveVar(false);

Template.WidgetForgotPassword.helpers({
    formSchema: Partup.schemas.forms.forgotPassword,
    placeholders: Partup.services.placeholders.forgotPassword,
    resetSentSuccessful: function() {
        return resetSentSuccessful.get();
    }
});

Template.WidgetForgotPassword.events({

});

AutoForm.hooks({
    forgotPasswordForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            this.event.preventDefault();
            Accounts.forgotPassword({email: insertDoc.email}, function(error) {

                if(error) {
                    Partup.ui.notify.error(error.reason);
                    self.done(new Error(error.reason));
                } else {
                    self.done();
                    resetSentSuccessful.set(true);
                }

            });
        }
    }
});
