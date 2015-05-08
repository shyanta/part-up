/*************************************************************/
/* Widget functions */
/*************************************************************/
var getActivities = function getActivities () {
    var partupId = Router.current().params._id;

    // Get the option that is selected in the filter dropdown
    var option = Session.get('partial-dropdown-activities-actions.selected');

    return Activities.find({ partup_id: partupId }, { sort: { end_date: -1 } }).map(function (activity, idx) {
        activity.arrayIndex = idx;
        return activity;
    }).filter(function (activity, idx) {
        if (option === 'default') return true;

        if (option === 'my-activities') {
            return activity.creator_id && activity.creator_id === Meteor.user()._id;
        }

        if (option === 'no-end-date') {
            return ! activity.end_date;
        }

        return true;
    });
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
