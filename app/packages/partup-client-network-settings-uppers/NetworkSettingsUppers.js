// jscs:disable
/**
 * Render a widget to view/edit a single network's uppers
 *
 * @module client-network-settings-uppers
 * @param {Number} networkSlug    the slug of the network whose uppers are rendered
 */
// jscs:enable
Template.NetworkSettingsUppers.onCreated(function() {
    var template = this;
    var userId = Meteor.userId();

    template.searchQuery = new ReactiveVar();
    template.reactiveLabel = new ReactiveVar('No uppers');

    template.subscription = template.subscribe('networks.one', template.data.networkSlug, {
        onReady: function() {
            var network = Networks.findOne({slug: template.data.networkSlug});
            template.networkId = network._id;
            if (!network) Router.pageNotFound('network');
            if (network.isClosedForUpper(userId)) Router.pageNotFound('network');
        }
    });
    template.subscribe('networks.one.uppers', {slug: template.data.networkSlug});

    template.callMethod = function(method, networkSlug, userId, userName, successKey) {
        Meteor.call(method, networkSlug, userId, function(err, res) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
            Partup.client.notify.success(TAPi18n.__(successKey, {
                name: userName
            }));
        });
    };
});

Template.NetworkSettingsUppers.helpers({
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;
        var searchOptions = {
            _id: {$in: network.uppers || []}
        };
        var searchQuery = template.searchQuery.get();
        if (searchQuery) searchOptions['profile.name'] = {$regex: searchQuery, $options: 'i'};
        var uppers = Meteor.users.find(searchOptions).fetch();
        template.reactiveLabel.set(uppers.length + ' uppers');
        var self = this;
        return {
            network: function() {
                return network;
            },
            uppers: function() {
                _.each(uppers, function(upper) {
                    upper.email = User(upper).getEmail() || false;
                    upper.isNetworkAdmin = network.isNetworkAdmin(upper._id);
                    upper.isNetworkColleague = network.isNetworkColleague(upper._id);
                    upper.isNetworkColleagueCustomA = network.isNetworkColleagueCustomA(upper._id);
                    upper.isNetworkColleagueCustomB = network.isNetworkColleagueCustomB(upper._id);
                });
                return uppers;
            },
            searchQuery: function() {
                return template.searchQuery.get();
            }
        };
    },
    form: function() {
        var template = Template.instance();
        return {
            searchInput: function() {
                return {
                    reactiveLabel: template.reactiveLabel,
                    reactiveSearchQuery: template.searchQuery
                };
            }
        };
    },
    getToken: function() {
        return Accounts._storedLoginToken();
    }
});

Template.NetworkSettingsUppers.events({
    'click [data-toggle]': function(event) {
        event.preventDefault();
        $(event.currentTarget).next('[data-toggle-target]').toggleClass('pu-state-active');
        $('[data-toggle-target]').not($(event.currentTarget).next('[data-toggle-target]')[0]).removeClass('pu-state-active');
    },
    'click [data-make-admin]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.make_admin', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-admin-added');
    },
    'click [data-make-colleague]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.make_colleague', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-colleague-added');
    },
    'click [data-make-colleague-custom-a]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.make_colleague_custom_a', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-colleague-custom-a-added');
    },
    'click [data-make-colleague-custom-b]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.make_colleague_custom_b', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-colleague-custom-b-added');
    },
    'click [data-remove-admin]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.remove_admin', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-admin-removed');
    },
    'click [data-remove-colleague]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.remove_colleague', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-colleague-removed');
    },
    'click [data-remove-colleague-custom-a]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.remove_colleague_custom_a', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-colleague-custom-a-removed');
    },
    'click [data-remove-colleague]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.remove_colleague_custom_b', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-colleague-custom-b-removed');
    },
    'click [data-delete]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        template.callMethod('networks.remove_upper', template.data.networkSlug, this._id, this.profile.name, 'network-settings-uppers-upper-removed');
    }
});
