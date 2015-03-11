RegisterController = RouteController.extend({
    layoutTemplate: 'FullPageLayout',

    subscriptions: function() {
    },

    action: function() {
        this.render('register');
    }
});
