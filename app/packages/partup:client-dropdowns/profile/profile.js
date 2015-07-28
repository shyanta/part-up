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

Template.DropdownProfile.rendered = function() {
    // this = template
    this.dropdownToggleBool = 'widget-dropdowns-profile.opened';

    // set default boolean values
    Session.set(this.dropdownToggleBool, false);

    ClientDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
};

Template.DropdownProfile.destroyed = function() {
    // this = template
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientDropdowns.removeOutsideDropdownClickHandler(this);
    // $('body').removeClass('pu-state-dropdownopen');
};

Template.DropdownProfile.events({
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-logout]': function eventClickLogout (event, template) {
        Meteor.logout();
    },
    // 'mouseenter [data-clickoutside-close]': function disableBodyScroll (event, template) {
    //     $('body').addClass('pu-state-dropdownopen');
    // },
    // 'mouseleave [data-clickoutside-close]': function enableBodyScroll (event, template) {
    //     $('body').removeClass('pu-state-dropdownopen');
    // },
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
        return Notifications.find();
    },

    menuOpen: function() {
        return Session.get('widget-dropdowns-profile.opened');
    },

    upperPartups: function() {
        var userId = Meteor.userId();
        var networkId = Template.instance().currentNetwork.get() || undefined;
        return Partups.find({uppers: {$in: [userId]}, network_id: networkId});
    },

    supporterPartups: function() {
        var userId = Meteor.userId();
        var networkId = Template.instance().currentNetwork.get() || undefined;
        return Partups.find({supporters: {$in: [userId]}, network_id: networkId});
    },

    user: function() {
        return Meteor.user();
    },

    networkId: function() {
        return Template.instance().currentNetwork.get();
    },

    networks: function() {
        var userId = Meteor.userId();
        return Networks.find({uppers: {$in: [userId]}});
    },

    selectedNetwork: function() {
        var networkId = Template.instance().currentNetwork.get();
        var network = Networks.findOne({_id: networkId});
        return network;
    }
});
