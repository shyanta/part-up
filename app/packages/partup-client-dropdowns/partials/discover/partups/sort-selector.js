Template.DiscoverPartupsSortSelector.onCreated(function() {
    var template = this;
    template.dropdownToggleBool = 'partial-dropdowns-networks-actions-sort.opened';
    template.dropdownOpen = new ReactiveVar(false);
    template.selectedOption = template.data.reactiveVar;
    template.selectedOption.set({
        name: TAPi18n.__('pages-app-discover-filter-sorting-type-newest'),
        value: 'new'
    });
});

Template.DiscoverPartupsSortSelector.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.DiscoverPartupsSortSelector.onDestroyed(function() {
    var tpl = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(tpl);
});

Template.DiscoverPartupsSortSelector.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template) {
        event.preventDefault();
        template.selectedOption.set(this);
        template.find('[data-container]').scrollTop = 0;
    }
});

Template.DiscoverPartupsSortSelector.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    selectedOption: function() {
        return Template.instance().selectedOption.get();
    },
    options: function() {
        return [
            {
                name: TAPi18n.__('pages-app-discover-filter-sorting-type-newest'),
                value: 'new'
            },
            {
                name: TAPi18n.__('pages-app-discover-filter-sorting-type-popular'),
                value: 'popular'
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
