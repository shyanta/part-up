StartPartupController = RouteController.extend({
    layoutTemplate: 'LayoutsFullpage',

    subscriptions: function() {
        //
    },

    action: function() {
        this.render('PagesStartPartup');
        Router.go('/startpartup/details');
    }
});
