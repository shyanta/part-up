/**
 * Set the average rating on the user
 */
Event.on('partups.contributions.ratings.updated', function(userId, rating) {
    if (!userId) return;

    // TODO: Aggregation for improved speed
    var ratings = Ratings.find({rated_upper_id: rating.rated_upper_id}).fetch();
    var sumRating = ratings.reduce(function(sum, rating) { return sum + rating.rating; }, 0);
    var averageRating = sumRating / ratings.length;

    Meteor.users.update({_id: rating.rated_upper_id}, {$set: {'profile.average_rating': averageRating}});
});

/**
 * Update the contribution update with the new rating
 */
Event.on('partups.contributions.ratings.inserted', function(userId, rating) {
    if (!userId) return;

    var contribution = Contributions.findOne(rating.contribution_id);
    if (!contribution) return;

    var set = {
        upper_id: userId,
        type: 'partups_ratings_inserted',
        type_data: {
            activity_id: rating.activity_id,
            contribution_id: rating.contribution_id,
            rating_id: rating._id
        },
        updated_at: new Date()
    };

    Updates.update({_id: contribution.update_id}, {$set: set});
});

/**
 * Update the contribution update with the updated rating
 */
Event.on('partups.contributions.ratings.updated', function(userId, rating, oldRating) {
    if (!userId) return;

    var contribution = Contributions.findOne(rating.contribution_id);
    if (!contribution) return;

    var set = {
        upper_id: userId,
        type: 'partups_ratings_changed',
        type_data: {
            activity_id: rating.activity_id,
            contribution_id: rating.contribution_id,
            rating_id: rating._id
        },
        updated_at: new Date()
    };

    Updates.update({_id: contribution.update_id}, {$set: set});
});
