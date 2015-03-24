/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesPartupDetailActivities.helpers({
    'activities': function () {
        var partupId = Router.current().params._id;
        return Activities.find({ partup_id: partupId }, {sort: { end_date: -1 }});
    }
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesPartupDetailActivities.events({
    //
});