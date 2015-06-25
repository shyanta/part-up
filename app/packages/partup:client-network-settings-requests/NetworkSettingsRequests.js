/**
 * Render a widget to view/edit a single network's requests
 *
 * @param {Number} networkId
 */
Template.NetworkSettingsRequests.onCreated(function() {
    this.subscribe('network.one', this.data.networkId);
});

Template.NetworkSettingsUppers.helpers({});

Template.NetworkSettingsUppers.events({});
