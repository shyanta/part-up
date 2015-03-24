/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdates.helpers({

    'updates': function helperUpdates () {
        var partupId = Router.current().params._id;

        return Updates.find({ partup_id: partupId }).map(function (update, idx) {
            update.arrayIndex = idx;
            return update;
        });
    },

    'anotherDay': function (update, updates) {
        var previousUpdate = updates[update.arrayIndex - 1];
        var previousMoment = moment();

        if (previousUpdate) {
            previousMoment = moment(previousUpdate.time);
        }

        var currentMoment = moment(update.time);

        return previousMoment.diff(currentMoment) > 24 * 60 * 60 * 1000;
    }

});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailUpdates.events({
    //
});
