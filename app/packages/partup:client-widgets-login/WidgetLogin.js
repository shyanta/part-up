Template.WidgetLogin.helpers({
    formSchema: Partup.schemas.forms.login,
    placeholders: Partup.services.placeholders.login
});

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
                Router.go('home');
            } else {
                Router.go('register-details');
            }

        });
    },
    'click [data-signuplinkedin]': function(event) {
        Meteor.loginWithLinkedin({
            requestPermissions: ['r_emailaddress']
        }, function(error) {

            if(error) {
                Partup.ui.notify.iError('generic-error');
                return false;
            }

            if(optionalDetailsFilledIn()) {
                Router.go('home');
            } else {
                Router.go('register-details');
            }
        });
    }
})

function optionalDetailsFilledIn() {
    var user = Meteor.user();
    if (user.profile.settings && user.profile.settings.optionalDetailsCompleted) {
        return true;
    } else {
        return false;
    }
}

AutoForm.hooks({
    loginForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(error) {

                if(error) {
                    Partup.ui.notify.error(error.reason);
                    //this.resetForm();
                    this.done(new Error(error.reason));
                }

                if(optionalDetailsFilledIn()) {
                    Router.go('home');
                } else {
                    Router.go('register-details');
                }
            });
        }
    }
});
