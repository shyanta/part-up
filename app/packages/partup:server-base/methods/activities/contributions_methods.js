Meteor.methods({
    /**
     * Add current user contribution to activity
     *
     * @param {string} activityId
     * @param {mixed[]} fields
     */
    'activity.contribution.update': function (activityId, fields) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);

        if (!upper) throw new Meteor.Error(401, 'Unauthorized.');

        var contribution = Contributions.findOne({ activity_id: activityId, upper_id: upper._id });
        var isUpperInPartup = Partups.findOne({ _id: activity.partup_id, uppers: { $in: [upper._id] } }) ? true : false;
        
        check(fields, Partup.schemas.forms.contribution);

        try {
            var newContribution = Partup.transformers.contribution.fromFormContribution(fields);

            if (contribution) {
                // Update contribution
                newContribution.updated_at = new Date();
                Contributions.update(contribution._id, { $set: newContribution });
            } else {
                // Insert contribution
                newContribution.created_at = new Date();
                newContribution.activity_id = activityId;
                newContribution.upper_id = upper._id;
                newContribution.partup_id = activity.partup_id;
                newContribution.verified = isUpperInPartup;

                newContribution._id = Contributions.insert(newContribution);
                Activities.update(activityId, { $push: { 'contributions': newContribution._id } });
            }

            return newContribution;

        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be updated.');
        }
    },

    /**
     * Allow a concept contribution
     *
     * @param {string} partupId
     * @param {string} userId
     * */
    'activity.contribution.allow': function (partupId, userId) {
        var upper = Meteor.user();
        var isUpperInPartup = Partups.findOne({ _id: partupId, uppers: { $in: [upper._id] } }) ? true : false;

        if (!isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            // Allowing contribution means that all concept contributions by this user will be allowed
            var conceptContributions = Contributions.find({ partup_id: partupId, upper_id: userId, verified: false }, { _id: 1 });

            Contributions.update(
                { _id: { $in: conceptContributions } },
                { $set: { verified: true } },
                { multi: true }
            );
            Event.emit('partups.contributions.allowed', upper._id, partupId, userId);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'An error occurred while allowing contributions.');
        }
    },

    /**
     * Reject a concept contribution
     *
     * @param {string} contributionId
     */
    'activity.contribution.reject': function (contributionId) {
        var upper = Meteor.user();
        var contribution = Contributions.findOneOrFail(contributionId);
        var isUpperInPartup = Partups.findOne({ _id: contribution.partup_id, uppers: { $in: [upper._id] } }) ? true : false;

        if (!isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            // Remove contribution and emit event for the notification to be triggered
            Contributions.remove(contribution._id);
            Event.emit('partups.contributions.rejected', upper._id, contribution.activity_id, contribution.upper_id);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'An error occurred while rejecting contribution.');
        }
    }

});
