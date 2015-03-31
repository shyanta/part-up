Template.WidgetResetPassword.helpers({
    formSchema: Partup.schemas.forms.resetPassword,
    placeholders: Partup.services.placeholders.resetPassword
});

Template.WidgetResetPassword.events({

});

AutoForm.hooks({
    resetPasswordForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();

            Meteor.resetPassword(Router.current().params.token, insertDoc.password, function(error) {

                if(error) {
                    Partup.ui.notify.error(error.reason);
                    this.done(new Error(error.reason));
                }

                Router.go('home');
            });
        }
    }
});
