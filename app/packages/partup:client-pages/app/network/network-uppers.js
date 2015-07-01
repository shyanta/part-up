Template.app_network_uppers.onCreated(function() {

});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_network_uppers.helpers({
    network: function() {
        return Networks.findOne(this.networkId);
    }
});
/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_network_uppers.events({

});
