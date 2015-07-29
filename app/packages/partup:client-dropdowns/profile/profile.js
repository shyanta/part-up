var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.DropdownProfile.onCreated(function() {
    var template = this;
    var userId = Meteor.userId;

    Subs.subscribe('users.one.upperpartups', userId);
    Subs.subscribe('users.one.supporterpartups', userId);

    template.currentNetwork = new ReactiveVar();
    template.disableUp = new ReactiveVar(true);
    template.disableDown = new ReactiveVar(false);

});

Template.DropdownProfile.onRendered(function() {
    var template = this;
    template.dropdownToggleBool = 'widget-dropdowns-profile.opened';
    Session.setDefault(template.dropdownToggleBool, false);
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu]');

    Router.onBeforeAction(function(req, res, next) {
        Session.set(template.dropdownToggleBool, false);
        next();
    });
});

Template.DropdownProfile.onDestroyed(function() {
    var template = this;
    Session.set(template.dropdownToggleBool, false);
    ClientDropdowns.removeOutsideDropdownClickHandler(template);
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
    },
    'click [data-down]': function(event, template) {
        var list = $(template.find('[data-list]'));
        console.log('click', list);
        list.scrollTop(list.scrollTop() + 200);
        template.disableUp.set(false);
        if (list[0].scrollHeight - list.height() === list.scrollTop()){
            template.disableDown.set(true);
        }
    },
    'click [data-up]': function(event, template) {
        var list = $(template.find('[data-list]'));
        console.log('click', list.scrollTop())
        list.scrollTop(list.scrollTop() - 200);
        template.disableDown.set(false);
        if (list.scrollTop() === 0) {
            template.disableUp.set(true);
        }
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
    },
    disableUp: function() {
        return Template.instance().disableUp.get();
    },
    disableDown: function() {
        return Template.instance().disableDown.get();
    }
});
