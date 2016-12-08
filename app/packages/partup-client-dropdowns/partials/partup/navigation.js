Template.PartupNavigationSelector.onCreated(function() {
    var template = this;
    template.dropdownToggleBool = 'partial-dropdowns-networks-actions-sort.opened';
    template.dropdownOpen = new ReactiveVar(false);

    var partupSlug = template.data.slug;

    template.options = [{
        name: TAPi18n.__('pages-app-partup-menu_updates'),
        route: 'partup',
        slug: partupSlug
    },{
        name: TAPi18n.__('pages-app-partup-menu_activities'),
        route: 'partup-activities',
        slug: partupSlug
    },{
        name: TAPi18n.__('pages-app-partup-menu_documents'),
        route: 'partup-documents',
        slug: partupSlug
    }];

    var defaultOption = template.options[0];

    if (template.data.default === 'partup') defaultOption = template.options[0];
    if (template.data.default === 'partup-activities') defaultOption = template.options[1];
    if (template.data.default === 'partup-documents') defaultOption = template.options[2];

    template.selectedOption = new ReactiveVar(defaultOption, function(oldRoute, newRoute) {
        if (oldRoute === newRoute) return;
        Router.go(newRoute.route, {slug: newRoute.slug});
    });
});

Template.PartupNavigationSelector.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.PartupNavigationSelector.onDestroyed(function() {
    var tpl = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(tpl);
});

Template.PartupNavigationSelector.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-select-option]': function eventSelectOption(event, template) {
        event.preventDefault();
        template.selectedOption.set(this);
        template.find('[data-container]').scrollTop = 0;
    }
});

Template.PartupNavigationSelector.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    selectedOption: function() {
        return Template.instance().selectedOption.get();
    },
    options: function() {
        return Template.instance().options;
    },
    selected: function(input) {
        var template = Template.instance();
        return input === template.selectedOption.get();
    },
    emptyOption: function() {
        return Template.instance().emptyOption;
    }
});
