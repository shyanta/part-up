Template.WidgetResetPassword.helpers({
    formSchema: Partup.schemas.forms.resetPassword,
    placeholders: Partup.services.placeholders.resetPassword,
});

Template.WidgetResetPassword.events({

});

AutoForm.hooks({
    resetPasswordForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            self.event.preventDefault();
            var token = Router.current().params.token;
            Accounts.resetPassword(token, insertDoc.password, function(error) {

                if(error) {
                    Partup.ui.notify.error(error.reason);
                    self.done(new Error(error.reason));
                }

                self.done();

                Router.go('home');

            });
        }
    }
});
