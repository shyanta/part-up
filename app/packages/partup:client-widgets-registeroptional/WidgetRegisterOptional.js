Template.WidgetRegisterOptional.helpers({
    formSchema: Partup.schemas.forms.registerOptional,
    placeholders: Partup.services.placeholders.registerOptional,
    user: function() {
        return {
            name: "bla"
        };
    }
});

Template.WidgetRegisterOptional.events({
    //
});

AutoForm.hooks({
    registerOptionalForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            var self = this

            //TODO

            self.done();

            //Accounts.createUser({
            //    email: insertDoc.email,
            //    password: insertDoc.password,
            //    profile: {
            //        name: insertDoc.name,
            //        network: insertDoc.network
            //    }
            //}, function(error) {
            //    if (error) {
            //        Partup.notify.iError('generic-error');
            //        return false;
            //    }
            //    Router.go('register-details');
            //})
        }
    }
});
