Template.PartialDropdownActivitiesActions.onCreated(function() {
    var tpl = this;
    tpl.dropdownToggleBool = 'partial-dropdowns-activities-actions.opened';
    tpl.dropdownOpen = new ReactiveVar(false, function(a, b) {

    });
    tpl.selectedOption = tpl.data.reactiveVar || new ReactiveVar('default');
});

Template.PartialDropdownActivitiesActions.onRendered(function() {
    var tpl = this;
    ClientDropdowns.addOutsideDropdownClickHandler(tpl, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.PartialDropdownActivitiesActions.destroyed = function() {
    var tpl = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(tpl);
};

Template.PartialDropdownActivitiesActions.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template) {
        var key = $(event.target).data('translate');
        template.selectedOption.set(key.replace('dropdowns-activitiesactions-option-', ''));
    }
});

Template.PartialDropdownActivitiesActions.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    selectedAction: function() {
        return __('dropdowns-activitiesactions-option-' + Template.instance().selectedOption.get());
    },
    notSelected: function(a) {
        return a !== 'dropdowns-activitiesactions-option-' + Template.instance().selectedOption.get();
    }
});
