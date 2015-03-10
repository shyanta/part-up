HomeController = RouteController.extend({
    layoutTemplate: 'MasterLayout',

    subscriptions: function() {
        this.subscribe('partups');
    },

    action: function() {
        this.render('home');
    }
});
