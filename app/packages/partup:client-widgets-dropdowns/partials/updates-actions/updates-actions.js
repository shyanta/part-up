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
    'click [data-select-option]': function eventSelectOption(event, template){
        var key = $(event.target).data("translate");
        Session.set('partial-dropdown-updates-actions.selected', key);
    }
})

Template.PartialDropdownUpdatesActions.helpers({
    menuOpen: function(){
        return Session.get('partial-dropdown-updates-actions.opened');
    },
    selectedAction: function(){
        return Session.get('partial-dropdown-updates-actions.selected') ? TAPi18n.__(Session.get('partial-dropdown-updates-actions.selected')) : false;
    },
    notSelected: function(a){
        return a !== Session.get('partial-dropdown-updates-actions.selected');
    }
});