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

        var isUpperInPartup = Partups.findOne({ _id: partupId, uppers: { $in: [upper._id] } }) ? true : false;
        if (!isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            var activity = Partup.transformers.activity.fromForm(fields, upper._id, partupId);

            activity._id = Activities.insert(activity);

            return {
                _id: activity._id
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

        if (! activity) {
            throw new Meteor.Error(404, 'Could not find activity.');
        }

        if (! upper || activity.creator_id != upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var updatedActivity = Partup.transformers.activity.fromForm(fields, activity.creator_id, activity.partup_id);
            updatedActivity.updated_at = new Date();

            Activities.update(activityId, { $set: updatedActivity });

            // Post system message
            Meteor.call('updates.system.message.insert', activity.update_id, 'system_activities_updated');

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

            // Post system message
            Meteor.call('updates.system.message.insert', activity.update_id, 'system_activities_removed');

            return {
                _id: activity._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be removed.');
        }
    },

    /**
     * Unarchive an Activity
     *
     * @param  {string} activityId
     */
    'activities.unarchive': function (activityId) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);

        if (!upper || activity.creator_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Activities.update(activityId, {$set: { archived: false } });

            // Post system message
            Meteor.call('updates.system.message.insert', activity.update_id, 'system_activities_unarchived');

            return {
                _id: activity._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be unarchived.');
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

            // Post system message
            Meteor.call('updates.system.message.insert', activity.update_id, 'system_activities_archived');

            return {
                _id: activity._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be archived.');
        }
    }

});
