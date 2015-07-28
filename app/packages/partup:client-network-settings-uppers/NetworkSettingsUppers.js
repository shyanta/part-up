// jscs:disable
/**
 * Render a widget to view/edit a single network's uppers
 *
 * @module client-network-settings-uppers
 * @param {Number} networkSlug    the slug of the network whose uppers are rendered
 */
// jscs:enable

Template.NetworkSettingsUppers.onCreated(function() {
    this.subscribe('networks.one', this.data.networkSlug);
    this.subscribe('networks.one.uppers', this.data.networkSlug);
});

Template.NetworkSettingsUppers.helpers({
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
    },
    upper: function() {
        return Meteor.users.findOne({_id: '' + this});
    }
});

Template.NetworkSettingsUppers.events({
    'click [data-upper-remove]': function(e, template) {
        var btn = $(e.target).closest('[data-upper-remove]');
        var upperId = btn.data('upper-remove');
        var network = Networks.findOne({slug: template.data.networkSlug});

        Meteor.call('networks.remove_upper', network._id, upperId, function(err) {
            if (err && err.reason) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(__('network-settings-uppers-upper-removed'));
        });
    }
});
