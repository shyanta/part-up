/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdates.helpers({

    'updates': function helperUpdates () {
        // Stub data
        return [
            {
                arrayIndex: 0,
                user: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
                    fullname: 'Jesse de Vries',
                },
                created_at: new Date(),
                type: 'henk'
            },
            {
                arrayIndex: 1,
                user: {
                    avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/0a7/057/33f4a9e.jpg',
                    fullname: 'Leon Smit',
                },
                created_at: new Date(1426949113548),
                type: 'henk'
            }
        ];

        // Real data
        var partupId = Router.current().params._id;

        return Updates.find({ partup_id: partupId }).map(function (update, idx) {
            update.arrayIndex = idx;
            return update;
        });
    },

    'anotherDay': function helperAnotherday (update, updates) {
        var TIME_FIELD = 'created_at';
        var previousUpdate = updates[update.arrayIndex - 1];
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
    //
});
