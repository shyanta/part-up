/*************************************************************/
/* Partial events */
/*************************************************************/
Template.app_header.events({
    'click [data-action-start]': function() {
        Intent.go({route: 'create'}, function(slug) {
            if (slug) {
                Router.go('partup', {
                    slug: slug
                });
            } else {
                this.back();
            }
        });
    },

    'click [data-action-login]': function() {
        Intent.go({route: 'login'});
    },

    'click [data-action-register]': function() {
        Intent.go({route: 'register'});
    }
});
