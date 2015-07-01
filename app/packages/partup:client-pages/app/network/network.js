/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_network.helpers({
    network: function() {
        return Networks.findOne(this.networkId);
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_network.events({
    'click [data-join]': function(event, template) {
        Meteor.call('networks.join', template.data.networkId, function(error) {
            if (error) {
                Partup.client.notify.error(error.reason);
            } else {
                Partup.client.notify.success('joined network');
            }
        });
    }
});
