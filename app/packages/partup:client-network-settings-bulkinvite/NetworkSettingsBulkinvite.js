/**
 * Invite multiple uppers to a network at once, using a CSV file
 *
 * @module client-network-settings-bulkinvite
 * @param {Number} networkSlug    the slug of the network
 */

Template.NetworkSettingsBulkinvite.helpers({
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
    }
});
