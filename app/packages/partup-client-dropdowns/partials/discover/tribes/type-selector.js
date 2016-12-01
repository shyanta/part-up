Template.DiscoverTribesTypeSelector.onCreated(function() {
    var template = this;
    template.dropdownToggleBool = 'partial-dropdowns-networks-actions-sort.opened';
    template.dropdownOpen = new ReactiveVar(false);
    template.selectedOption = template.data.reactiveVar;
    template.selectedOption.set({
        name: TAPi18n.__('pages-app-discover-tribes-filter-type-all'),
        value: undefined
    });
});

Template.DiscoverTribesTypeSelector.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.DiscoverTribesTypeSelector.onDestroyed(function() {
    var tpl = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(tpl);
});

Template.DiscoverTribesTypeSelector.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template) {
        event.preventDefault();
        template.selectedOption.set(this);
        template.find('[data-container]').scrollTop = 0;
    }
});

Template.DiscoverTribesTypeSelector.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    selectedOption: function() {
        return Template.instance().selectedOption.get();
    },
    options: function() {
        return [
            {
                name: TAPi18n.__('pages-app-discover-tribes-filter-type-all'),
                value: undefined
            },
            {
                name: TAPi18n.__('pages-app-discover-tribes-filter-type-public'),
                value: 'public'
            },
            {
                name: TAPi18n.__('pages-app-discover-tribes-filter-type-invite'),
                value: 'invite'
            }
        ];
    },
    selected: function(input) {
        var template = Template.instance();
        return input === template.selectedOption.get();
    },
    emptyOption: function() {
        return Template.instance().emptyOption;
    }
});
