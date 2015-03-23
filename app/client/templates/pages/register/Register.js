/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesRegister.helpers({
    //
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesRegister.events({
    'click [data-signupfacebook]': function (event, template) {
        Meteor.loginWithFacebook({}, function (error) {
            if (error) throw new Meteor.Error('Facebook login failed.');

            Meteor.call('users.loggedInWithFacebook', function (error, result) {
                Router.go('home');
            });
        });
    },

    'click [data-signuplinkedin]': function (event, template) {
        Meteor.loginWithLinkedin({}, function (error) {
            if (error) throw new Meteor.Error('Linkedin login failed.');

            Router.go('home');
        });
    }
});
