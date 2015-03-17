HomeController = RouteController.extend({
    layoutTemplate: 'LayoutsApp',

    subscriptions: function() {
        this.subscribe('partups.all');
    },

    action: function() {
        this.render('PagesHome');
    }
});
