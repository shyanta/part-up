RegisterController = RouteController.extend({
    layoutTemplate: 'LayoutsFullpage',

    subscriptions: function() {
        //
    },

    action: function() {
        this.render('PagesRegister');
    }
});
