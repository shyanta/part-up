Template.WidgetDropdownProfile.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'widget-dropdown-profile.opened';

    // set default boolean values
    Session.set(this.dropdownToggleBool, false);

    ClientWidgetsDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetDropdownProfile.destroyed = function(){
    // this = template
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
}

Template.WidgetDropdownProfile.events({
    'click [data-toggle-menu]': ClientWidgetsDropdowns.dropdownClickHandler,
    'click [data-logout]': function eventClickLogout (event, template) {
        Meteor.logout();
    }
});

Template.WidgetDropdownProfile.helpers({
    notifications: function () {
        return Notifications.find();
    },

    userImage: function () {
        var user = Meteor.user();

        if (user && user.profile && user.profile.image) {
            return Images.findOne({ _id: user.profile.image });
        }
    },

    menuOpen: function(){
        return Session.get('widget-dropdown-profile.opened');
    },

    upperPartups: function(){
        return Partups.find();
    }
});
