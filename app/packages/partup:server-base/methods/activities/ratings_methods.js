Meteor.methods({

    /**
     * Insert or update a rating for a specific contribution
     *
     * @param {string} contributionId
     * @param {mixed[]} fields
     */
    'contribution.rating.upsert': function (contributionId, fields) {
        var upper = Meteor.user();
        var contribution = Contributions.findOne(contributionId);
        var rating = Ratings.findOne(ratingId);
        var isUpperInPartup = Partups.findOne({ _id: contribution.partup_id, uppers: { $in: [upper._id] } }) ? true : false;

        if (!upper || !isUpperInPartup) throw new Meteor.Error(401, 'Unauthorized.');

        check(fields, Partup.schemas.forms.rating);

        try {
            var newRating = {};

            if (rating) {
                // Update rating
                newRating = fields;
                newRating.updated_at = new Date();

                Ratings.update(rating, { $set: newRating });
            } else {
                // Insert rating
                newRating = {
                    _id: Random.id(),
                    created_at: new Date(),
                    //partup_id & activity_id
                    contribution_id: contributionId,
                    rating: fields.rating,
                    feedback: fields.feedback,
                    upper_id: fields.upper_id
                };

                newRating = Ratings.insert(newRating);
            }

            return newRating;

        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be updated.');
        }
    }

});
