Template.DropdownNotifications.onCreated(function() {
    var template = this;
    template.dropdownOpen = new ReactiveVar(false, function(a, b) {
        if (a === b || b) return;

        Meteor.call('notifications.all_read');
    });

    //Update the number of notifications in the title
    template.autorun(function() {
        var numberOfNotifications = Notifications.findForUser(Meteor.user(), {'new': true}).count();
        if (numberOfNotifications > 0) {
            document.title = '(' + numberOfNotifications + ')' + ' Part-up';
        } else {
            document.title = 'Part-up';
        }
    });
    template.subscribe('notifications.for_upper', Meteor.userId());
    template.limit = new ReactiveVar(10);
});
Template.DropdownNotifications.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu=notifications]');
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
        Meteor.call('notifications.clicked', notificationId);
    },
    'click [data-loadmore]': function(event, template) {
        event.preventDefault();
        template.limit.set(template.limit.get() + 10);
    }
});

Template.DropdownNotifications.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    notifications: function() {
        var limit = Template.instance().limit.get();
        var parameters = {sort: {created_at: -1}, limit: limit};
        var shownNotifications = Notifications.findForUser(Meteor.user(), {}, parameters);
        var totalNotifications = Notifications.findForUser(Meteor.user()).count();
        return {
            data: function() {
                return shownNotifications;
            },
            count: function() {
                return totalNotifications;
            },
            canLoadMore: function() {
                return limit <= totalNotifications;
            }
        }
    },
    totalNewNotifications: function() {
        return Notifications.findForUser(Meteor.user(), {'new': true});
    }
});
