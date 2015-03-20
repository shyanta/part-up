Template.WidgetDropdownProfile.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'partials.dropdown.profile.opened';
    
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
})

Template.WidgetDropdownProfile.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.profile.opened');
    }
    // placeholders: Partup.services.placeholders.dropdowns
});
