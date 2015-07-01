/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_network_temp_overview.helpers({
    networks: function() {
        return Networks.find().fetch();
    }
});
