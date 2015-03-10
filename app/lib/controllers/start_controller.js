StartController = RouteController.extend({
    layoutTemplate: 'FullPageLayout',

    subscriptions: function() {
    },

    details: function() {
        this.render('start');
    },
    activities: function() {
        this.render('start');
    }
});