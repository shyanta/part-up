var completed = new ReactiveVar('false');

Template.WidgetForgotPassword.helpers({
    formSchema: Partup.schemas.forms.forgotPassword,
    placeholders: Partup.services.placeholders.forgotPassword,
    completed: function() {
        return completed;
    }
});

Template.WidgetForgotPassword.events({

});

AutoForm.hooks({
    forgotPasswordForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            Accounts.forgotPassword({email: insertDoc.email}, function(error) {

                if(error) {
                    Partup.ui.notify.error(error.reason);
                    this.done(new Error(error.reason));
                }

                completed.set(true);
            });
        }
    }
});
