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
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            self.event.preventDefault();
            Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(error) {

                if(error) {
                    if(error.message == 'User not found [403]') {
                        Partup.ui.forms.addCustomFieldError(self, 'email', 'emailNotFound');
                    } else {
                        Partup.ui.notify.error(error.reason);   
                    }
                    self.done(new Error(error.reason));
                    return;
                }

                if(optionalDetailsFilledIn()) {
                    goToReturnUrlOrHome();
                } else {
                    Router.go('register-details');
                }
            });
        }
    }
});
