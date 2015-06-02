/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_discover.helpers({
    partups: function() {
        return Partups.find();
    }
});
