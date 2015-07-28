Template.DropdownNotifications.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'widget-dropdowns-notifications.opened';

    // set default boolean values
    Session.set(this.dropdownToggleBool, false);

    ClientDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
};

Template.DropdownNotifications.destroyed = function(){
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientDropdowns.removeOutsideDropdownClickHandler(this);
};

Template.DropdownNotifications.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler
});

Template.DropdownNotifications.helpers({
    menuOpen: function(){
        return Session.get('widget-dropdowns-notifications.opened');
    },
    notifications: function () {
        var parameters = {sort: {created_at: -1}};
        return Notifications.findForUser(Meteor.user(), parameters);
    }
});
