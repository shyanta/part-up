Template.WidgetRegisterOptional.helpers({
    formSchema: Partup.schemas.forms.registerOptional,
    placeholders: Partup.services.placeholders.registerOptional,
    profile: function() {
        return Meteor.user().profile;
    },
    userImage: function() {
        var user = Meteor.user();

        if (user && user.profile && user.profile.image) {
            return Images.findOne({ _id: user.profile.image });
        }
    }
});

Template.WidgetRegisterOptional.events({
    //
});

AutoForm.hooks({
    registerOptionalForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            var self = this;

            Meteor.call('users.update', insertDoc, function(error, res){
                if(error) {
                    console.log('something went wrong', error);
                    return false;
                }
                Router.go('discover');
            });

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
