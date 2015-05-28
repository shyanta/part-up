/*************************************************************/
/* Widget functions */
/*************************************************************/
var getActivities = function getActivities (options) {
    var partupId = Router.current().params._id;

    // Get the option that is selected in the filter dropdown
    var option = Session.get('partial-dropdown-activities-actions.selected');

    var query = { 
        partup_id: partupId,
        archived: false
    }; 
    if(options && options.archived) {
       query.archived = true; 
    }
    return Activities.find(query, { sort: { end_date: -1 } }).map(function (activity, idx) {
        activity.arrayIndex = idx;
        return activity;
    }).filter(function (activity, idx) {
        if (option === 'default') return true;

        if (option === 'my-activities') {
            return activity.creator_id && activity.creator_id === Meteor.user()._id;
        }

        if (option === 'open-activities') {
            return Contributions.find({ activity_id: activity._id }).count() === 0;
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
    },
    'archivedActivities': function helperActivities () {
        return getActivities({archived:true});
    },

    isUpper: function helperIsUpper () {
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne(Router.current().params._id);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    }

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailActivities.events({
})
