/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_networks_overview.helpers({
    networks: function() {
        return Networks.find().fetch();
    }
});
