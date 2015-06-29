// jscs:disable
/**
 * Render a widget to view/edit a single network's uppers
 *
 * @module client-network-settings-uppers
 * @param {Number} networkId    the id of the network whose uppers are rendered
 */
// jscs:enable

Template.NetworkSettingsUppers.onCreated(function() {
    this.subscribe('network.one', this.data.networkId);
});

Template.NetworkSettingsUppers.helpers({
    network: function() {
        return Networks.findOne({_id: this.networkId});
    },
    upper: function() {
        return Meteor.users.findOne({_id: '' + this});
    }
});

Template.NetworkSettingsUppers.events({
    'click [data-upper-remove]': function(e, template) {
        var btn = $(e.target).closest('[data-upper-remove]');
        var networkId = template.data.networkId;
        var upperId = btn.data('upper-remove');

        Meteor.call('networks.remove_upper', networkId, upperId, function(err) {
            if (err && err.reason) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(__('network-settings-uppers-upper-removed'));
        });
    }
});
