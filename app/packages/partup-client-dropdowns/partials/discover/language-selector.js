Template.DiscoverLanguageSelector.onCreated(function() {
    var template = this;
    template.dropdownToggleBool = 'partial-dropdowns-networks-actions.opened';
    template.dropdownOpen = new ReactiveVar(false);
    template.emptyOption = {
        native_name: 'All'
    };
    template.selectedOption = template.data.reactiveVar;
    template.selectedOption.set(template.emptyOption);
    template.subscribe('languages.all');
});

Template.DiscoverLanguageSelector.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.DiscoverLanguageSelector.onDestroyed(function() {
    var tpl = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(tpl);
});

Template.DiscoverLanguageSelector.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template) {
        event.preventDefault();
        template.selectedOption.set(this);
        template.find('[data-container]').scrollTop = 0;
    }
});

Template.DiscoverLanguageSelector.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    selectedOption: function() {
        return Template.instance().selectedOption.get();
    },
    options: function() {
        return Languages.find().fetch();
    },
    selected: function(input) {
        var template = Template.instance();
        return input === template.selectedOption.get();
    },
    emptyOption: function() {
        return Template.instance().emptyOption;
    }
});
