var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.DropdownProfile.onCreated(function() {
    var userId = Meteor.userId;

    Subs.subscribe('users.one.upperpartups', userId);
    Subs.subscribe('users.one.supporterpartups', userId);

    this.currentNetwork = new ReactiveVar();
});

Template.DropdownProfile.onRendered(function() {
    this.dropdownToggleBool = 'widget-dropdowns-profile.opened';
    Session.setDefault(this.dropdownToggleBool, false);
    ClientDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
});

Template.DropdownProfile.onDestroyed(function() {
    Session.set(this.dropdownToggleBool, false);
    ClientDropdowns.removeOutsideDropdownClickHandler(this);
});

Template.DropdownProfile.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-logout]': function eventClickLogout (event, template) {
        Meteor.logout();
    },
    'click [data-select-network]': function changeNetwork (event, template) {
        var networkId = $(event.target).data('select-network') || undefined;
        template.currentNetwork.set(networkId);
    },
    'click [data-settings]': function openSettings (event, template) {
        event.preventDefault();
        Intent.go({route: 'profile-settings', params:{_id: Meteor.userId()}});
    }
});

Template.DropdownProfile.helpers({
    notifications: function() {
        return Notifications.findForUser(Meteor.user());
    },

    menuOpen: function() {
        return Session.get('widget-dropdowns-profile.opened');
    },

    upperPartups: function() {
        var networkId = Template.instance().currentNetwork.get() || undefined;
        var user = Meteor.user();
        if (!user) return [];

        return Partups.findUpperPartupsForUser(user, {
            network_id: networkId
        });
    },

    supporterPartups: function() {
        var networkId = Template.instance().currentNetwork.get() || undefined;
        var user = Meteor.user();
        if (!user) return [];

        return Partups.findSupporterPartupsForUser(user, {
            network_id: networkId
        });
    },

    user: function() {
        return Meteor.user();
    },

    networkId: function() {
        return Template.instance().currentNetwork.get();
    },

    networks: function() {
        var user = Meteor.user();
        if (!user) return [];

        return Networks.findForUser(user);
    },

    selectedNetwork: function() {
        var networkId = Template.instance().currentNetwork.get();
        var network = Networks.findOne({_id: networkId});
        return network;
    }
});
