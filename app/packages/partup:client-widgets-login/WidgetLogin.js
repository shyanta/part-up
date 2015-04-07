Template.WidgetLogin.onRendered(function() {
    AutoForm.resetForm("loginForm");
});

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

            if(optionalDetailsFilledIn()) {
                goToReturnUrlOrHome()
            } else {
                Router.go('register-details');
            }

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

            if(optionalDetailsFilledIn()) {
                goToReturnUrlOrHome()
            } else {
                Router.go('register-details');
            }
        });
    }
})

/*************************************************************/
/* Widget functions */
/*************************************************************/
function optionalDetailsFilledIn() {
    var user = Meteor.user();
    if (user.profile.settings && user.profile.settings.optionalDetailsCompleted) {
        return true;
    } else {
        return false;
    }
};

function goToReturnUrlOrHome() {
    var returnUrl = Session.get('application.return-url');
    if(returnUrl) {
        Session.set('application.return-url', undefined);
        Router.go(returnUrl);
    } else {
        Router.go('home');
    }
}

AutoForm.hooks({
    loginForm: {
        beginSubmit: function() {
            Partup.ui.forms.removeAllStickyFieldErrors(this);
        },
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
                    return;
                }

                // Success
                self.done();
                if(optionalDetailsFilledIn()) {
                    goToReturnUrlOrHome();
                } else {
                    Router.go('register-details');
                }
            });

            return false;
        }
    }
});
