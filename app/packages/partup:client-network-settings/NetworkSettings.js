/**
 * Render a form to edit a single network's settings
 *
 * @param {Number} networkId
 */
Template.NetworkSettings.onCreated(function() {
    this.subscription = this.subscribe('networks.one', this.data.networkId);
});

Template.NetworkSettings.helpers({});

Template.NetworkSettings.events({});
