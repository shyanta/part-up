/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_partup.helpers({

    partup: function() {
        var partupId = Router.current().params._id;
        return Partups.findOne({_id: partupId});
    }

});
