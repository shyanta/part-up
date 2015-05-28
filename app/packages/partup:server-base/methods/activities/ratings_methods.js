Meteor.methods({
    /**
     * Insert a rating for a specific contribution
     *
     * @param {string} contributionId
     * @param {mixed[]} fields
     */
    'ratings.insert': function (contributionId, fields) {
        var upper = Meteor.user();

        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        var contribution = Contributions.findOneOrFail(contributionId);
        var isUpperInPartup = Partups.findOne({ _id: contribution.partup_id, uppers: { $in: [upper._id] } }) ? true : false;

        if (! isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');

        check(fields, Partup.schemas.forms.rating);

        try {
            // Insert rating
            var newRating = {
                _id: Random.id(),
                created_at: new Date(),
                partup_id: contribution.partup_id,
                activity_id: contribution.activity_id,
                contribution_id: contributionId,
                rating: fields.rating,
                feedback: fields.feedback,
                upper_id: upper._id
            };

            newRating = Ratings.insert(newRating);

            Event.emit('partups.ratings.inserted', upper._id, contribution.update_id, contribution.activity_id, contribution._id, newRating._id);

            // Post system message
            Partup.services.system_messages.send(upper, contribution.update_id, 'system_ratings_inserted');

            return newRating;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be updated.');
        }
    },

    /**
     * Update a rating
     *
     * @param {string} ratingId
     * @param {mixed[]} fields
     */
    'ratings.update': function (ratingId, fields) {
        var upper = Meteor.user();
        var rating = Ratings.findOneOrFail(ratingId);
        var contribution = Contributions.findOneOrFail(rating.contribution_id);
        var isUpperInPartup = Partups.findOne({ _id: rating.partup_id, uppers: { $in: [upper._id] } }) ? true : false;

        if (!upper || !isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');

        check(fields, Partup.schemas.forms.rating);

        try {
            var newRating = {};

            if (rating) {
                // Update rating
                newRating.rating = fields.rating;
                newRating.feedback = fields.feedback;
                newRating.updated_at = new Date();

                Ratings.update(rating, { $set: newRating });

                // Post system message
                Partup.services.system_messages.send(upper, contribution.update_id, 'system_ratings_updated');

                Event.emit('partups.ratings.updated', upper._id, contribution.update_id, contribution.activity_id, contribution._id, ratingId);
            }

            return newRating;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be updated.');
        }
    }
});
