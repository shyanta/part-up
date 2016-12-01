Template.DiscoverTribesSectorSelector.onCreated(function() {
    var template = this;
    template.subscribe('sectors.all');

    template.dropdownToggleBool = 'partial-dropdowns-networks-actions-sector.opened';
    template.dropdownOpen = new ReactiveVar(false);
    template.selectedOption = template.data.reactiveVar;
    template.selectedOption.set({
        name: TAPi18n.__('pages-app-discover-tribes-filter-sector-all'),
        value: undefined
    });
});

Template.DiscoverTribesSectorSelector.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.DiscoverTribesSectorSelector.onDestroyed(function() {
    var tpl = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(tpl);
});

Template.DiscoverTribesSectorSelector.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template) {
        event.preventDefault();
        template.selectedOption.set(this);
        template.find('[data-container]').scrollTop = 0;
    }
});

Template.DiscoverTribesSectorSelector.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    selectedOption: function() {
        return Template.instance().selectedOption.get();
    },
    options: function() {
        var sectors = Sectors.find().fetch();

        var selectableSectors = (sectors || []).map(function(sector, index) {
            return {
                name: sector._id,
                value: sector._id
            };
        });

        return [{
            name: TAPi18n.__('pages-app-discover-tribes-filter-sector-all'),
            value: undefined
        }].concat(selectableSectors);
    },
    selected: function(input) {
        var template = Template.instance();
        return input === template.selectedOption.get();
    },
    emptyOption: function() {
        return Template.instance().emptyOption;
    }
});
