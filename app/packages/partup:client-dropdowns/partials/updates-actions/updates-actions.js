Template.PartialDropdownUpdatesActions.onCreated(function() {
    var template = this;
    template.dropdownToggleBool = 'partial-dropdowns-updates-actions.opened';
    Session.set(template.dropdownToggleBool, false);
    template.selectedOption = template.data.reactiveVar || new ReactiveVar('default');
});

Template.PartialDropdownUpdatesActions.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.PartialDropdownUpdatesActions.destroyed = function() {
    var tpl = this;
    Session.set(tpl.dropdownToggleBool, false);
    ClientDropdowns.removeOutsideDropdownClickHandler(tpl);
};

Template.PartialDropdownUpdatesActions.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template) {
        var key = $(event.target).data('translate');
        template.selectedOption.set(key.replace('dropdowns-updatesactions-option-', ''));
    }
});

Template.PartialDropdownUpdatesActions.helpers({
    menuOpen: function() {
        return Session.get('partial-dropdowns-updates-actions.opened');
    },
    selectedAction: function() {
        return __('dropdowns-updatesactions-option-' + Template.instance().selectedOption.get());
    },
    notSelected: function(a) {
        return a !== 'dropdowns-updatesactions-option-' + Template.instance().selectedOption.get();
    }
});
