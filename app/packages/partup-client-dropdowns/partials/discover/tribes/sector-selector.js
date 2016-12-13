Template.DiscoverTribesSectorSelector.onCreated(function() {
    var template = this;
    var options = [{
        name: TAPi18n.__('pages-app-discover-tribes-filter-sector-all'),
        value: undefined
    }];
    template.options = new ReactiveVar(options);
    template.subscribe('sectors.all', {
        onReady: function() {
            var sectors = Sectors.find().fetch();

            var selectableSectors = (sectors || []).map(function(sector, index) {
                return {
                    name: sector._id,
                    value: sector._id
                };
            });

            var newOptions = options.concat(selectableSectors)

            template.options.set(newOptions);
            template.selectedOption.set(newOptions[0]);
        }
    });

    template.dropdownToggleBool = 'partial-dropdowns-networks-actions-sector.opened';
    template.dropdownOpen = new ReactiveVar(false);
    template.selectedOption = template.data.reactiveVar;

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
        return Template.instance().options.get();
    },
    selected: function(input) {
        var template = Template.instance();
        return input === template.selectedOption.get();
    },
    emptyOption: function() {
        return Template.instance().emptyOption;
    }
});
