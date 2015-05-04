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
            Event.emit('activities.updated', activity, fields);

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
            Event.emit('activities.removed', activity);

            return {
                _id: activity._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be removed.');
        }
    },

    /**
     * Add current user contribution to activity
     *
     * @param {string} activityId
     * @param {mixed[]} fields
     */
    'activity.contribution.update': function (activityId, fields) {
        console.log('activity.contribution.update');
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);

        if (!upper) throw new Meteor.Error(401, 'Unauthorized.');

        var contribution = Contributions.findOne({activity_id: activityId, upper_id: upper._id});
        var isUpperInPartup = Partups.findOne({ _id: activity.partup_id, uppers: { $in: [upper._id] } }) ? true : false;
        
        check(fields, Partup.schemas.forms.contribution);

        try {
            var newContribution = Partup.transformers.contribution.fromFormContribution(fields);
            var isEmpty = !newContribution.types.want.enabled && !newContribution.types.can.amount && !newContribution.types.have.amount && !newContribution.types.have.description;

            if (contribution) {

                if (isEmpty) {
                    // Delete contribution
                    Contributions.remove(contribution._id);
                } else {
                    // Update contribution
                    newContribution.updated_at = new Date();
                    Contributions.update(contribution, {$set: newContribution});
                }

            } else if (!isEmpty) {
                // Insert contribution
                newContribution.created_at = new Date();
                newContribution.activity_id = activityId;
                newContribution.upper_id = upper._id;
                newContribution.partup_id = activity.partup_id;
                newContribution.verified = isUpperInPartup;

                newContribution._id = Contributions.insert(newContribution);
                Activities.update(activityId, {$push: {'contributions': newContribution._id}});
            }

            return newContribution;

        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be updated.');
        }
    }

});
