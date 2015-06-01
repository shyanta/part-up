Template.DropdownProfile.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'widget-dropdown-profile.opened';

    // set default boolean values
    Session.set(this.dropdownToggleBool, false);

    ClientDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
};

Template.DropdownProfile.destroyed = function(){
    // this = template
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientDropdowns.removeOutsideDropdownClickHandler(this);
};

Template.DropdownProfile.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-logout]': function eventClickLogout (event, template) {
        Meteor.logout();
    }
});

Template.DropdownProfile.helpers({
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
