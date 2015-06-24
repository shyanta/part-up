/**
 * Render a widget to view/edit a single network's uppers
 *
 * @param {Number} networkId
 */
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

Template.NetworkSettingsUppers.events({});
