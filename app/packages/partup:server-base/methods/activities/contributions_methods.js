Meteor.methods({
    /**
     * Add current user contribution to activity
     *
     * @param {string} activityId
     * @param {mixed[]} fields
     */
    'contribution.update': function (activityId, fields) {
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

                // Unarchive contribution if it was archived
                if (contribution.archived) {
                    newContribution.archived = false;
                }

                Contributions.update(contribution._id, { $set: newContribution });

                // Generate a bot message
                var update = Updates.findOneOrFail(activity.update_id);
                Updates.update(update._id, {
                    $set: {
                        'updated_at': new Date()
                    },
                    $push: {
                        'comments': {
                            _id: Random.id(),
                            content: 'bot_contributions_updated',
                            creator: {
                                _id: 'SYSTEM',
                                name: upper.profile.name
                            },
                            created_at: new Date(),
                            updated_at: new Date()
                        }
                    },
                    $inc: {
                        'comments_count': 1
                    }
                });
            } else {
                // Insert contribution
                newContribution.created_at = new Date();
                newContribution.activity_id = activityId;
                newContribution.upper_id = upper._id;
                newContribution.partup_id = activity.partup_id;
                newContribution.verified = isUpperInPartup;

                newContribution._id = Contributions.insert(newContribution);
            }

            return newContribution;

        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be updated.');
        }
    },

    /**
     * Accept a contribution from non partupper and make that user a partupper
     *
     * @param {string} contributionId
     * */
    'contribution.accept': function (contributionId) {
        var upper = Meteor.user();
        var contribution = Contributions.findOneOrFail(contributionId);
        var isUpperInPartup = Partups.findOne({ _id: contribution.partup_id, uppers: { $in: [upper._id] } }) ? true : false;

        if (!isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');
        var activity = Activities.findOne({_id: contribution.activity_id});

        try {
            // Allowing contribution means that all concept contributions by this user will be allowed
            var conceptContributions = Contributions.find({ 
                partup_id: activity.partup_id, 
                upper_id: contribution.upper_id, 
                verified: false 
            }, { fields: { _id: 1 } }).fetch();
            var conceptContributionsIdArray = _.pluck(conceptContributions, '_id');
            Contributions.update( { _id: { $in: conceptContributionsIdArray } }, { $set: { verified: true } }, { multi: true });
            Event.emit('contributions.allowed', upper._id, contribution._id);
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
    'contribution.reject': function (contributionId) {
        var upper = Meteor.user();
        var contribution = Contributions.findOneOrFail(contributionId);
        var isUpperInPartup = Partups.findOne({ _id: contribution.partup_id, uppers: { $in: [upper._id] } }) ? true : false;

        if (!isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            // Remove contribution and emit event for the notification to be triggered
            Contributions.remove(contribution._id);
            Event.emit('contributions.rejected', upper._id, contribution.activity_id, contribution.upper_id);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'An error occurred while rejecting contribution.');
        }
    },

    /**
     * Archive a Contribution
     *
     * @param {string} contributionId
     */
    'contributions.archive': function (contributionId) {
        var upper = Meteor.user();
        var contribution = Contributions.findOneOrFail(contributionId);

        if (!upper || contribution.upper_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Contributions.update(contribution._id, { $set: { archived: true } });

            return {
                _id: contribution._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Contribution [' + contributionId + '] could not be removed.');
        }
    },

    /**
     * Remove a Contribution
     *
     * @param {string} contributionId
     */
    'contributions.remove': function (contributionId) {
        var upper = Meteor.user();
        var contribution = Contributions.findOneOrFail(contributionId);

        if (!upper || contribution.upper_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Contributions.remove(contributionId);

            return {
                _id: contribution._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Contribution [' + contributionId + '] could not be removed.');
        }
    }

});
