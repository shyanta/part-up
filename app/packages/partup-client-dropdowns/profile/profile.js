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

    // // Placeholder for states (such as loading states)
    // template.states = {
    //     loadingUpperpartups: new ReactiveVar(false),
    //     loadingSupporterpartups: new ReactiveVar(false),
    //     loadingNetworks: new ReactiveVar(false)
    // };

    // // Placeholder for results
    // template.results = {
    //     upperpartups: new ReactiveVar([]),
    //     supporterpartups: new ReactiveVar([]),
    //     networks: new ReactiveVar([])
    // };

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

// var sortPartups = function(partups, user) {
//     return lodash.sortByOrder(partups, function(partup) {
//         var upper_data = lodash.find(partup.upper_data, '_id', user._id);
//         if (upper_data && upper_data.new_updates) {
//             return upper_data.new_updates.length;
//         } else {
//             return 0;
//         }
//     }, ['desc']);
// };

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

    // upperPartups: function() {
    //     var user = Meteor.user();
    //     if (!user) return [];

    //     var allPartups = Template.instance().results.upperpartups.get();

    //     return sortPartups(allPartups, user);
    // },

    // supporterPartups: function() {
    //     var user = Meteor.user();
    //     if (!user) return [];

    //     var allPartups = Template.instance().results.supporterpartups.get();

    //     return sortPartups(allPartups, user);
    // },

    // newUpdates: function() {
    //     if (!this.upper_data) return;
    //     var count = null;
    //     this.upper_data.forEach(function(upperData) {
    //         if (upperData._id === Meteor.userId()) {
    //             count = upperData.new_updates.length;
    //         }
    //     });
    //     return count;
    // },

    user: function() {
        return Meteor.user();
    },

    networks: function() {
        return Template.instance().results.networks.get();
    }
});
