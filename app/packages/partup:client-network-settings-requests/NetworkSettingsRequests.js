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

Template.NetworkSettingsRequests.events({
    'click [data-request-accept]': function(e, template) {
        var userId = $(e.target).closest('[data-request-accept]').data('user-id');

        Meteor.call('networks.accept', template.data.networkId, userId, function(err) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(__('network-settings-requests-accepted'));
        });
    },
    'click [data-request-reject]': function(e, template) {
        var userId = $(e.target).closest('[data-request-reject]').data('user-id');

        Meteor.call('networks.reject', template.data.networkId, userId, function(err) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(__('network-settings-requests-rejected'));
        });
    }
});
