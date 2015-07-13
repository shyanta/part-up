/*************************************************************/
/* Partial events */
/*************************************************************/
Template.app_header.events({

    'click [data-action-start]': function eventActionStart () {
        Intent.go({route: 'create'}, function(createdId) {
            if (createdId) {
                Router.go('partup', {
                    _id: createdId
                });
            } else {
                this.back();
            }
        });
    },

    'click [data-action-login]': function eventActionLogin () {
        Intent.go({route: 'login'});
    },

    'click [data-action-register]': function eventActionRegister () {
        Intent.go({route: 'register'});
    }

});
