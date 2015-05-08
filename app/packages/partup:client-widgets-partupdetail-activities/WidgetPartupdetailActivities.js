/*************************************************************/
/* Widget functions */
/*************************************************************/
var getActivities = function getActivities () {
    var partupId = Router.current().params._id;

    return Activities.find({ partup_id: partupId }, { sort: { end_date: -1 } });
};

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailActivities.helpers({

    'activities': function helperActivities () {
        return getActivities();
    }

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailActivities.events({
    'click [data-newactivity]': function openNewActivityPopup(event, template){
        Partup.ui.popup.open();
    }
})
