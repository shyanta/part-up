/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesPartupDetail.helpers({

    partup: function () {
        var partupId = Router.current().params._id;
        return Partups.findOne({ _id: partupId });
    }

});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesPartupDetail.events({
    //
});
