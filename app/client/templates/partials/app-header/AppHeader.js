/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.PartialsAppHeader.helpers({

});


/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsAppHeader.events({

    'click [data-action-login]': function eventActionLogin () {
        var currentUrl = Router.current().url;
        Session.set('application.return-url', currentUrl);
        Router.go('login');
    },

    'click [data-action-register]': function eventActionRegister () {
        var currentUrl = Router.current().url;
        Session.set('application.return-url', currentUrl);
        Router.go('register');
    }

});
