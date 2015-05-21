/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetLogin.helpers({
    formSchema: Partup.schemas.forms.login,
    placeholders: Partup.services.placeholders.login
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetLogin.events({
    'click [data-loginfacebook]': function(event) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function(error) {

            if(error) {
                Partup.ui.notify.iError('generic-error');
                return;
            }

            continueLogin();
        });
    },
    'click [data-loginlinkedin]': function(event) {
        Meteor.loginWithLinkedin({
            requestPermissions: ['r_emailaddress']
        }, function(error) {

            if(error) {
                Partup.ui.notify.iError('generic-error');
                return false;
            }

            continueLogin();
        });
    }
})

/*************************************************************/
/* Widget functions */
/*************************************************************/
var continueLogin = function() {
    var user = Meteor.user();
    if(!user) return;

    var optionalDetailsFilledIn = user.profile.settings && user.profile.settings.optionalDetailsCompleted;

    // Intent
    Partup.ui.intent.executeIntentCallback('login', [true], function () {
        if(!optionalDetailsFilledIn) {

            // Fill-in optional details
            Router.go('register-details');

        } else {

            // Fallback
            Partup.ui.intent.executeDefaultCallback();

        }
    });
};

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    loginForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(error) {

                // Error cases
                if(error && error.message) {
                    switch (error.message) {
                        case 'User not found [403]':
                            Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                            break;
                        case 'Incorrect password [403]':
                            Partup.ui.forms.addStickyFieldError(self, 'password', 'passwordIncorrect');
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
                continueLogin();
            });

            return false;
        }
    }
});
