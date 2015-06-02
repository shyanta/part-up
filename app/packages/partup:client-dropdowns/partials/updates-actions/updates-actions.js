Template.PartialDropdownUpdatesActions.onCreated(function(){
    // this = template
    var template = this;
    template.dropdownToggleBool = 'partial-dropdowns-updates-actions.opened';

    // set default boolean values
    Session.set(template.dropdownToggleBool, false);

    template.selectedOption = new ReactiveVar("dropdowns-updatesactions-option-default");
    // init options
    template.optionsPrefix = 'dropdowns-updatesactions-option-';
    // set default selected option in session
    Session.set('partial-dropdowns-updates-actions.selected', 'default');

});

Template.PartialDropdownUpdatesActions.onRendered(function(){
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.PartialDropdownUpdatesActions.destroyed = function(){
    // this = template
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    Session.set('partial-dropdowns-updates-actions.selected', 'default');
    ClientDropdowns.removeOutsideDropdownClickHandler(this);
    this.selectedOption = undefined;
};

Template.PartialDropdownUpdatesActions.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template){
        var optionsPrefix = template.optionsPrefix;

        var key = $(event.target).data("translate");

        // update selected option in dropdown
        template.selectedOption.set(key);

        // change layout
        Session.set('partial-dropdowns-updates-actions.selected', key.replace(optionsPrefix, ''));
    }
});

Template.PartialDropdownUpdatesActions.helpers({
    menuOpen: function(){
        return Session.get('partial-dropdowns-updates-actions.opened');
    },
    selectedAction: function(){
        return Template.instance().selectedOption.get() ? __(Template.instance().selectedOption.get()) : false;
    },
    notSelected: function(a){
        return a !== Template.instance().selectedOption.get();
    }
});
