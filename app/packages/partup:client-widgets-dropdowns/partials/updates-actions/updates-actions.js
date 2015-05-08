Template.PartialDropdownUpdatesActions.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'partial-dropdown-updates-actions.opened';

    this.optionPrefix = 'dropdown-updatesactions-option-';

    // set default boolean values
    Session.set(this.dropdownToggleBool, false);
    Session.set('partial-dropdown-updates-actions.selected', this.optionPrefix + 'default');

    // you can define a default selection here
    // Session.set('partial-dropdown-updates-actions.selected', "dropdown-updatesactions-option-action1");

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
        var key = $(event.target).data("translate").replace(Template.instance().optionPrefix, '');
        Session.set('partial-dropdown-updates-actions.selected', Template.instance().optionPrefix + key);
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
