/*************************************************************/
/* Partial events */
/*************************************************************/
Template.app_header.events({

    'click [data-action-start]': function eventActionStart () {
        var currentUrl = Router.current().url;
        Partup.client.intent.go({route: 'create'}, function(createdId) {
            if (createdId) {
                Router.go('partup', {
                    _id: createdId
                });
            } else {
                Router.go(currentUrl);
            }
        });
    },

    'click [data-action-login]': function eventActionLogin () {
        Partup.client.intent.go({route: 'login'});
    },

    'click [data-action-register]': function eventActionRegister () {
        Partup.client.intent.go({route: 'register'});
    }

});
