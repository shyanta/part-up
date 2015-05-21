/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsAppHeader.events({

    'click [data-action-start]': function eventActionStart () {
        var currentUrl = Router.current().url;
        Partup.ui.intent.go({ route: 'start' }, function(createdId) {
            if(createdId) {
                Router.go('partup-detail', {
                    _id: createdId
                });
            } else {
                Router.go(currentUrl);
            }
        });
    },

    'click [data-action-login]': function eventActionLogin () {
        var currentUrl = Router.current().url;
        Partup.ui.intent.go({ route: 'login' }, function() {
            Router.go(currentUrl);
        });
    },

    'click [data-action-register]': function eventActionRegister () {
        var currentUrl = Router.current().url;
        Partup.ui.intent.go({ route: 'register' }, function() {
            Router.go(currentUrl);
        });
    }

});
