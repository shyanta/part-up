Template.PartialDropdownActivitiesActions.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'partial-dropdown-activities-actions.opened';

    this.optionPrefix = 'dropdown-activitiesactions-option-';

    // set default boolean values
    Session.set(this.dropdownToggleBool, false);
    Session.set('partial-dropdown-activities-actions.selected', this.optionPrefix + 'default');

    // you can define a default selection here
    // Session.set('partial-dropdown-activities-actions.selected', "dropdown-activitiesactions-option-action1");

    ClientWidgetsDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.PartialDropdownActivitiesActions.destroyed = function(){
    // this = template
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
}

Template.PartialDropdownActivitiesActions.events({
    'click [data-toggle-menu]': ClientWidgetsDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template){
        var key = $(event.target).data("translate").replace(Template.instance().optionPrefix, '');
        Session.set('partial-dropdown-activities-actions.selected', Template.instance().optionPrefix + key);
    }
})

Template.PartialDropdownActivitiesActions.helpers({
    menuOpen: function(){
        return Session.get('partial-dropdown-activities-actions.opened');
    },
    selectedAction: function(){
        return Session.get('partial-dropdown-activities-actions.selected') ? TAPi18n.__(Session.get('partial-dropdown-activities-actions.selected')) : false;
    },
    notSelected: function(a){
        return a !== Session.get('partial-dropdown-activities-actions.selected');
    }
});
