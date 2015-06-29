// jscs:disable
/**
 * Render login form functionality
 *
 * @module client-login
 *
 */
// jscs:enable

var formPlaceholders = {
    email: function() {
        return __('login-form-email-placeholder');
    },
    password: function() {
        return __('login-form-password-placeholder');
    }
};

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Login.helpers({
    formSchema: Partup.schemas.forms.login,
    placeholders: formPlaceholders
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Login.events({
    'click [data-createaccount]': function(event) {
        event.preventDefault();
        Partup.client.intent.go({route: 'register'}, function() {
            if (Meteor.user()) {
                continueLogin();
            } else {
                Partup.client.intent.returnToOrigin('login');
            }
        });
    },
    'click [data-loginfacebook]': function(event) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function(error) {

            if (error) {
                Partup.client.notify.error(__('login-error'));
                return;
            }

            continueLogin();
        });
    },
    'click [data-loginlinkedin]': function(event) {
        Meteor.loginWithLinkedin({
            requestPermissions: ['r_emailaddress']
        }, function(error) {

            if (error) {
                Partup.client.notify.error(__('login-error'));
                return false;
            }

            continueLogin();
        });
    }
});

/*************************************************************/
/* Widget functions */
/*************************************************************/
var continueLogin = function() {
    var user = Meteor.user();
    if (!user) return;

    // Return if intent callback is present
    Partup.client.intent.return('login', [true], function() {

        // No intent callback is present, so check if optionalDetailsCompleted
        if (mout.object.get(user, 'profile.settings.optionalDetailsCompleted')) {
            Partup.client.intent.returnToOrigin('login');
        } else {
            Partup.client.intent.go({route: 'register-details'}, function() {
                Partup.client.intent.returnToOrigin('login');
            });
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
                if (error && error.message) {
                    switch (error.message) {
                        case 'User not found [403]':
                            Partup.client.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                            break;
                        case 'Incorrect password [403]':
                            Partup.client.forms.addStickyFieldError(self, 'password', 'passwordIncorrect');
                            break;
                        default:
                            Partup.client.notify.error(error.reason);
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
