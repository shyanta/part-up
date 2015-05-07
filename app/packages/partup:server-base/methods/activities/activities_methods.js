Meteor.methods({
    /**
     * Insert an Activity
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'activities.insert': function (partupId, fields) {
        check(fields, Partup.schemas.forms.startActivities);

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'Unauthorized.');

        var partup = Partups.findOneOrFail(partupId);

        try {
            activity = Partup.transformers.activity.fromForm(fields, upper, partup);

            activity._id = Activities.insert(activity);

            return {
                _id: fields._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Activity could not be inserted.');
        }
    },

    /**
     * Update an Activity
     *
     * @param {string} activityId
     * @param {mixed[]} fields
     */
    'activities.update': function (activityId, fields) {
        check(fields, Partup.schemas.forms.startActivities);

        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);
        if (!upper || !activity.creator_id == upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            fields.updated_at = new Date();
            Activities.update(activityId, {$set: fields});

            return {
                _id: activity._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity could not be updated.');
        }
    },

    /**
     * Remove an Activity
     *
     * @param {string} activityId
     */
    'activities.remove': function (activityId) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);

        if (!upper || activity.creator_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Activities.remove(activityId);

            return {
                _id: activity._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be removed.');
        }
    },

    /**
     * Archive an Activity
     *
     * @param  {string} activityId
     */
    'activities.archive': function (activityId) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);

        if (!upper || activity.creator_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Activities.update(activityId, {$set: { archived: true } });

            return {
                _id: activity._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be archived.');
        }
    }

});
