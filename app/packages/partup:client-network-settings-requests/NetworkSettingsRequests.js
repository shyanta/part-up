/**
 * Render a widget to view/edit a single network's requests
 *
 * @param {Number} networkId
 */
Template.NetworkSettingsRequests.onCreated(function() {
    this.subscribe('networks.one', this.data.networkId);
    this.subscribe('networks.one.pending_uppers', this.data.networkId);
});

Template.NetworkSettingsRequests.helpers({
    requests: function() {
        var requests = [];
        var network = Networks.findOne({_id: this.networkId});
        if (!network) return;

        var pending = network.pending_uppers || [];
        for (var i = 0; i < pending.length; i++) {
            requests.push({
                user: Meteor.users.findOne({_id: pending[i]})
            });
        }

        return requests;
    }
});

Template.NetworkSettingsUppers.events({});
