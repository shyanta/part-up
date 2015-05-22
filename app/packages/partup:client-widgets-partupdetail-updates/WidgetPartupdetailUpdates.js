/*************************************************************/
/* Widget functions */
/*************************************************************/
var getUpdates = function getUpdates () {
    var partupId = Router.current().params._id;

    // Get the option that is selected in the filter dropdown
    var option = Session.get('partial-dropdown-updates-actions.selected');

    return Updates.find({ partup_id: partupId }, { sort: { updated_at: -1 } }).map(function (update, idx) {
        update.arrayIndex = idx;
        return update;
    }).filter(function (update, idx) {
        if (option === 'default') return true;

        if (option === 'my-updates') {
            return update.upper_id === Meteor.user()._id;
        }

        if (option === 'activities') {
            return update.type && update.type.indexOf('activities') > -1;
        }

        if (option === 'partup-changes') {
            var isPartupChange = (  update.type.indexOf('tags') > -1 ||
                                    update.type.indexOf('end_date') > -1 ||
                                    update.type.indexOf('name') > -1 ||
                                    update.type.indexOf('description') > -1 ||
                                    update.type.indexOf('image') > -1 ||
                                    update.type.indexOf('budget') > -1
                                    );

            return update.type && isPartupChange;
        }

        if (option === 'messages') {
            return update.type && update.type.indexOf('message') > -1;
        }

        return true;
    });
};

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdates.helpers({

    'updates': function helperUpdates () {
        // return updatesVar.get(); // temp reactive var until mongo implementation
        return getUpdates();
    },

    'anotherDay': function helperAnotherday (update) {
        var TIME_FIELD = 'created_at';

        var updates = getUpdates(); //updatesVar.get(); // getUpdates()
        var currentIndex = lodash.findIndex(updates, update);
        var previousUpdate = updates[currentIndex - 1];
        var previousMoment = moment();

        if (previousUpdate) {
            previousMoment = moment(previousUpdate[TIME_FIELD]);
        }

        var currentMoment = moment(update[TIME_FIELD]);

        return previousMoment.diff(currentMoment) > 24 * 60 * 60 * 1000;
    }

});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailUpdates.events({
});
