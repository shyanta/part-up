Template.WidgetRegisterRequired.helpers({
    formSchema: Partup.schemas.forms.registerrequired,
    placeholders: Partup.services.placeholders.registerrequired,
    totalNumberOfUppers: function() {
        return 42;
    }
});

Template.WidgetRegisterRequired.events({
    'click [data-signupfacebook]': function(event) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function(error) {

            if(error) {
                Partup.notify.iError('generic-error');
                return;
            }

            Router.go('register-details');

        });
    },
    'click [data-signuplinkedin]': function(event) {
        Meteor.loginWithLinkedin({
            requestPermissions: ['email']
        }, function(error) {

            if(error) {
                Partup.notify.iError('generic-error');
                return false;
            }

            Router.go('register-details');
        });
    }
})

AutoForm.hooks({
    registerRequiredForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            var self = this

            Accounts.createUser({
                email: insertDoc.email,
                password: insertDoc.password,
                profile: {
                    name: insertDoc.name,
                    network: insertDoc.network
                }
            }, function(error) {
                if (error) {
                    Partup.notify.iError('generic-error');
                    return false;
                }
                self.done();
                Router.go('register-details');
            })
        }
    }
});
