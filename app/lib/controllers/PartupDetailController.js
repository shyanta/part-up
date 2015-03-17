PartupDetailController = RouteController.extend({
    layoutTemplate: 'LayoutsApp',

    subscriptions: function() {
        this.subscribe('partups');
    },

    action: function() {
        this.render('PagesPartupDetail');
    }
});
