/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetRegisterRequired.helpers({
    formSchema: Partup.schemas.forms.registerRequired,
    placeholders: Partup.services.placeholders.registerRequired,
    totalNumberOfUppers: function() {
        var count = Counts.get('users');
        if(count)
            return count + 1;
        else
            return "";
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
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
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    registerRequiredForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var locale = Partup.helpers.parseLocale(navigator.language || navigator.userLanguage);

            Accounts.createUser({
                email: insertDoc.email,
                password: insertDoc.password,
                profile: {
                    name: insertDoc.name,
                    network: insertDoc.network,
                    settings: {
                        locale: locale,
                        optionalDetailsCompleted: false
                    }
                }
            }, function(error) {

                // Error cases
                if(error && error.message) {
                    switch (error.message) {
                        case 'Email already exists [403]':
                            Partup.ui.forms.addStickyFieldError(self, 'email', 'emailExists');
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
                Router.go('register-details');
            });

            return false;
        }
    }
});
