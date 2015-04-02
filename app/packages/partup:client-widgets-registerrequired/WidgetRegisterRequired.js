Template.WidgetRegisterRequired.helpers({
    formSchema: Partup.schemas.forms.registerRequired,
    placeholders: Partup.services.placeholders.registerRequired,
    totalNumberOfUppers: function() {
        return Counts.get('users') + 1;
    }
});

Template.WidgetRegisterRequired.events({
    'click [data-signupfacebook]': function(event) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function(error) {

            if(error) {
                Partup.ui.notify.iError('error-method-register-' + Partup.ui.strings.slugify(error.name));
                return;
            }

            Router.go('register-details');

        });
    },
    'click [data-signuplinkedin]': function(event) {
        Meteor.loginWithLinkedin({
            requestPermissions: ['r_emailaddress']
        }, function(error) {

            if(error) {
                Partup.ui.notify.iError('error-method-register-' + Partup.ui.strings.slugify(error.name));
                return false;
            }

            Router.go('register-details');
        });
    }
})

AutoForm.hooks({
    registerRequiredForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            self.event.preventDefault();

            Accounts.createUser({
                email: insertDoc.email,
                password: insertDoc.password,
                profile: {
                    name: insertDoc.name,
                    network: insertDoc.network,
                    settings: {
                        optionalDetailsCompleted: false
                    }
                }
            }, function(error) {
                if (error) {
                    Partup.ui.notify.error(error.reason);
                    self.done(new Error(error.reason));
                }
                self.done();
                Router.go('register-details');
            })
        }
    }
});
