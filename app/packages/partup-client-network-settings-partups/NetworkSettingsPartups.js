// jscs:disable
/**
 * Render a widget to view/edit a single network's uppers
 *
 * @module client-network-settings-uppers
 * @param {Number} networkSlug    the slug of the network whose uppers are rendered
 */
// jscs:enable
Template.NetworkSettingsPartups.onCreated(function() {
    var template = this;
    var userId = Meteor.userId();

    template.searchQuery = new ReactiveVar();
    template.reactiveLabel = new ReactiveVar('No partups');

    template.subscription = template.subscribe('networks.one', template.data.networkSlug, {
        onReady: function() {
            var network = Networks.findOne({slug: template.data.networkSlug});
            template.networkId = network._id;
            if (!network) Router.pageNotFound('network');
            if (network.isClosedForUpper(userId)) Router.pageNotFound('network');
        }
    });
    template.subscribe('networks.one.partups', {slug: template.data.networkSlug});
});

Template.NetworkSettingsPartups.helpers({
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;

        var searchOptions = {
            network_id: network._id
        };
        var searchQuery = template.searchQuery.get();
        if (searchQuery) searchOptions.name = {$regex: searchQuery, $options: 'i'};
        var partups = Partups.find(searchOptions).fetch();
        template.reactiveLabel.set(partups.length + ' partups');

        var self = this;
        return {
            network: function() {
                return network;
            },
            partups: function() {
                return partups;
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
    partupPopupId: function() {
        return 'partup-' + this._id;
    },
    partupPrivacyTypes: function(network_id) {
        var partupNetwork = Networks.findOne({_id: network_id});

        var types = [{
            value: Partups.privacy_types.NETWORK_ADMINS,
            label: 'Admins'
        },{
            value: Partups.privacy_types.NETWORK_COLLEAGUES,
            label: 'Collegues'
        }];

        if (partupNetwork.colleagues_custom_a_enabled) {
            types.push({
                value: Partups.privacy_types.NETWORK_COLLEAGUES_CUSTOM_A,
                label: 'Custom A'
            });
        }

        if (partupNetwork.colleagues_custom_b_enabled) {
            types.push({
                value: Partups.privacy_types.NETWORK_COLLEAGUES_CUSTOM_B,
                label: 'Custom B'
            });
        }

        return types;
    }
});

Template.NetworkSettingsPartups.events({
    'click [data-toggle]': function(event) {
        event.preventDefault();
        $(event.currentTarget).next('[data-toggle-target]').toggleClass('pu-state-active');
        $('[data-toggle-target]').not($(event.currentTarget).next('[data-toggle-target]')[0]).removeClass('pu-state-active');
    },
    'click [data-dismiss]': function(event, template) {
        Partup.client.popup.close();
    },
    'click [data-edit]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).closest('[data-toggle-target]').toggleClass('pu-state-active');
        Partup.client.popup.open({
            id: 'partup-' + $(event.currentTarget).data('edit')
        });
    },
    'click [data-save]': function(event, template) {
        event.preventDefault();
        console.log('huh');
    }
});
