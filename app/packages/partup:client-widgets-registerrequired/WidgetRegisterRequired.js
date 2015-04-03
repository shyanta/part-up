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
            console.log('Hi. This is partup.');

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
                // Error cases
                if (error) {
                    if(error.message === 'Email already exists [403]') {
                        self.addStickyValidationError('email', 'emailExists');
                        AutoForm.validateForm(self.formId);
                    } else {
                        Partup.ui.notify.error(error);
                    }
                    // self.done(new Error(error.message));
                    return;
                }
                
                // Success
                self.done();
                Router.go('register-details');
            });

            return false;
        }
    }
});
