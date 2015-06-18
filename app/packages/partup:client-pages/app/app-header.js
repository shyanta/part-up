/*************************************************************/
/* Partial events */
/*************************************************************/
Template.app_header.events({

    'click [data-action-start]': function eventActionStart () {
        Partup.client.intent.go({route: 'create'}, function(createdId) {
            if (createdId) {
                Router.go('partup', {
                    _id: createdId
                });
            } else {
                Partup.client.intent.returnToOrigin('create');
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
