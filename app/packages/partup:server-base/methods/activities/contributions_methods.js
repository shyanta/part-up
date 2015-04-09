Meteor.methods({
    /**
     * Insert a Contribution
     *
     * @param {integer} activityId
     * @param {mixed[]} fields
     */
    'contributions.insert': function (activityId, fields) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);

        if (!upper) throw new Meteor.Error(401, 'Unauthorized.');

        check(fields, Partup.schemas.forms.contribution);

        try {
            var newContribution = Partup.transformers.contribution.fromFormContribution(fields);
            newContribution.created_at = new Date();
            newContribution.activity_id = activityId;
            newContribution.upper_id = upper._id;
            newContribution.partup_id = activity.partup_id;

            newContribution._id = Contributions.insert(newContribution);
            Activities.update(activityId, { $push: { 'contributions': newContribution._id } });

            return newContribution;
         } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be inserted.');
        }
    },

    /**
     * Update a Contribution
     *
     * @param {string} contributionId
     * @param {mixed[]} fields
     */
    'contributions.update': function (contributionId, fields) {
        var upper = Meteor.user();
        var contribution = Contributions.findOneOrFail(contributionId);

        if (!upper || contribution.upper_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        check(fields, Partup.schemas.forms.contribution);

        try {
            var updatedContribution = Partup.transformers.contribution.fromFormContribution(fields);
            updatedContribution.updated_at = new Date();

            if (!updatedContribution.types.want.enabled && !updatedContribution.types.can.enabled && !updatedContribution.types.have.enabled) {
                Contributions.remove(contributionId);
            } else {
                Contributions.update( {_id: contributionId}, { $set: updatedContribution });
            }

            return {
                _id: contributionId
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be updated.');
        }
    }
});
