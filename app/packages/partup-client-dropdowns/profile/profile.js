Template.DropdownProfile.onCreated(function() {
    var template = this;
    template.windowHeight = new ReactiveVar($(window).height());
    template.resizeHandler = function(e) {
        var windowHeight = $(window).height();
        template.windowHeight.set(windowHeight);
    };
    $(window).on('resize', template.resizeHandler);
    template.activeTab = new ReactiveVar('partners');

    // Current user
    var user = Meteor.user();

    // Partups headers for http calls
    var query = {
        token: Accounts._storedLoginToken(),
        archived: false
    };

    // Dropdown opened state + callback
    template.dropdownOpen = new ReactiveVar(false);

});

Template.DropdownProfile.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu=profile]', function() {ClientDropdowns.partupNavigationSubmenuActive.set(false);});
    Router.onBeforeAction(function(req, res, next) {
        template.dropdownOpen.set(false);
        next();
    });
});

Template.DropdownProfile.onDestroyed(function() {
    var template = this;
    $(window).off('resize', template.resizeHandler);
    ClientDropdowns.removeOutsideDropdownClickHandler(template);
});

Template.DropdownProfile.events({
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler.bind(null, 'top-level'),
    'click [data-logout]': function(event, template) {
        event.preventDefault();
        Partup.client.windowTitle.setNotificationsCount(0);
        Partup.client.user.logout();
    },
    'click [data-settings]': function(event, template) {
        event.preventDefault();
        Intent.go({route: 'profile-settings', params: {_id: Meteor.userId()}});
    },
    'click [data-tab-toggle]': function(event, template) {
        template.activeTab.set($(event.currentTarget).data('tab-toggle'));
    }
});

Template.DropdownProfile.helpers({
    notifications: function() {
        return Notifications.findForUser(Meteor.user());
    },

    activeTab: function() {
        return Template.instance().activeTab.get();
    },

    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },

    user: function() {
        return Meteor.user();
    },

    networks: function() {
        return Template.instance().results.networks.get();
    }
});
