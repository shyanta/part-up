var currentTitle;
Meteor.startup(function() {
    Meteor.autorun(function() {
        var user = Meteor.user();
        if (!user) return;
        var unreadNotifications = Notifications.findForUser(user, {'new': true}).count();

        Tracker.nonreactive(function(){
            SEO.set({
                title: Partup.client.notifications.createTitle(currentTitle)
            });
        });

    });
    Router.onBeforeAction(function() {
        SEO.set({
            title: Partup.client.notifications.createTitle(currentTitle)
        });
        this.next();
    });
});
Partup.client.notifications = {
    createTitle: function(string) {
        currentTitle = string;
        var user = Meteor.user();
        if (!user) return string;
        var unreadNotifications = Notifications.findForUser(user, {'new': true}).count();
        if (!unreadNotifications) return string;
        return '(' + unreadNotifications + ') ' + string;
     }
};
