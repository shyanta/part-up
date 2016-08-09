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
        var name = this.profile.name;
        Meteor.call('networks.make_admin', template.data.networkSlug, this._id, function(err, res) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(TAPi18n.__('network-settings-uppers-admin-added', {
                name: name
            }));
        });
    },
    'click [data-remove-admin]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        var name = this.profile.name;
        Meteor.call('networks.remove_admin', template.data.networkSlug, this._id, function(err, res) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.warning(TAPi18n.__('network-settings-uppers-admin-removed', {
                name: name
            }));
        });
    },
    'click [data-delete]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        var name = this.profile.name;
        Meteor.call('networks.remove_upper', template.networkId, this._id, function(err, res) {
            if (err && err.reason) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.warning(TAPi18n.__('network-settings-uppers-upper-removed', {
                name: name
            }));
        });
    }
});
