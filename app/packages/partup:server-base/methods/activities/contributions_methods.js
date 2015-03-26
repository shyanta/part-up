Meteor.methods({
    /**
     * Insert a contribution in an Activity
     *
     * @param {mixed[]} fields
     */
    'activities.contributions.insert': function (activityId, fields) {
        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'Unauthorized.');

        var activity = Activities.findOneOrFail(activityId);

        try {
            var newContribution = Partup.transformers.activity.contribution.fromFormActivityContribution(fields);

            //check(newContribution, Partup.schemas.entities.activities);

            newContribution._id = Random.id();
            newContribution.created_at = Date.now();
            newContribution.updated_at = Date.now();
            newContribution.upper_id = upper._id;

            Activities.update(activityId, {$push: {'contributions': newContribution}});
            Event.emit('activities.contributions.inserted', activity.name, newContribution);

            return newContribution._id;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be inserted.');
        }
    },

    /**
     * Update a contribution in an Activity
     *
     * @param {mixed[]} fields
     */
    'activities.contributions.update': function (contributionId, fields) {
        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'Unauthorized.');
        console.log('edit');
        ////var activity = Activities.findOneOrFail(activityId);
        ////
        ////try {
        ////    var newContribution = Partup.transformers.activity.contribution.fromFormActivityContribution(fields, upper);
        ////
        ////    check(newContribution, Partup.schemas.entities.activities);
        ////
        ////    newContribution._id = Random.id();
        ////    newContribution.created_at = Date.now();
        ////    newContribution.updated_at = Date.now();
        ////    newContribution.upper_id = upper._id;
        ////
        ////    Activities.update(activityId, {$push: {'contributions': newContribution}});
        ////    Event.emit('activities.contributions.inserted', activity.name, newContribution);
        ////
        ////    return newContribution._id;
        //} catch (error) {
        //    Log.error(error);
        //    throw new Meteor.Error(400, 'Contribution could not be inserted.');
        //}
    }

});
