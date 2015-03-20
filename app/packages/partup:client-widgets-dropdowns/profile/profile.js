Template.WidgetDropdownProfile.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'partials.dropdown.profile.opened';
    this.animationToggleBool = 'partials.dropdown.profile.animationDone';
    ClientWidgetsDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetDropdownProfile.destroyed = function(){
    // this = template
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    Session.set(this.animationToggleBool, false);
    ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
}

Template.WidgetDropdownProfile.events({
    'click [data-toggle-menu]': ClientWidgetsDropdowns.dropdownClickHandler,
    'click [data-logout]': function eventClickLogout (event, template) {
        Meteor.logout();
    }
})

Template.WidgetDropdownProfile.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.profile.opened');
    },
    animationDone: function(){
        return Session.get('partials.dropdown.profile.animationDone');
    }
});
