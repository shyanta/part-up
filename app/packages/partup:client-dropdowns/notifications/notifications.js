Template.DropdownNotifications.onCreated(function() {
    var template = this;
    template.dropdownOpen = new ReactiveVar(false, function(a, b) {
        if (a === b) return;
        if (b) return;
        Meteor.call('notifications.all_read', function(error, res) {

        });
    });
});
Template.DropdownNotifications.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
    Router.onBeforeAction(function(req, res, next) {
        template.dropdownOpen.set(false);
        next();
    });
});

Template.DropdownNotifications.onDestroyed(function() {
    var template = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(template);
});

Template.DropdownNotifications.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-notification]': function(event, template) {
        template.dropdownOpen.set(false);
        var notificationId = $(event.currentTarget).data('notification');
        Meteor.call('notifications.clicked', notificationId, function(error, response) {

        });
    }
});

Template.DropdownNotifications.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    notifications: function() {
        var parameters = {sort: {created_at: -1}};
        return Notifications.findForUser(Meteor.user(), {}, parameters);
    },
    totalNewNotifications: function() {
        return Notifications.findForUser(Meteor.user(), {'new': true});
    }
});
