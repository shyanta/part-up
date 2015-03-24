Template.PartialDropdownUpdatesActions.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'partial-dropdown-updates-actions.opened';
    
    // set default boolean values    
    Session.set(this.dropdownToggleBool, false);

    ClientWidgetsDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.PartialDropdownUpdatesActions.destroyed = function(){
    // this = template
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
}

Template.PartialDropdownUpdatesActions.events({
    'click [data-toggle-menu]': ClientWidgetsDropdowns.dropdownClickHandler,
    'click [data-logout]': function eventClickLogout (event, template) {
        Meteor.logout();
    }
})

Template.PartialDropdownUpdatesActions.helpers({
    menuOpen: function(){
        return Session.get('partial-dropdown-updates-actions.opened');
    },
    upperPartups: function(){
        return Partups.find();
    }
});
