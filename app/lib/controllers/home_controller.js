HomeController = RouteController.extend({
    layoutTemplate: 'MasterLayout',

    subscriptions: function() {
        this.subscribe('partups.all');
    },

    action: function() {
        this.render('home');
    }
});
