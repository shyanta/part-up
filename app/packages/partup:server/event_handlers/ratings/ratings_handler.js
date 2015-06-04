/**
 * Update the contribution update with the new rating
 */
Event.on('partups.ratings.inserted', function(userId, updateId, activityId, contributionId, ratingId) {
    if (!userId || !updateId || !activityId || !contributionId || !ratingId) return;

    var set = {
        upper_id: userId,
        type: 'partups_ratings_inserted',
        type_data: {
            activity_id: activityId,
            contribution_id: contributionId,
            rating_id: ratingId
        },
        updated_at: new Date()
    };

    Updates.update({_id: updateId}, {$set: set});
});

/**
 * Update the contribution update with the updated rating
 */
Event.on ('partups.ratings.updated', function(userId, updateId, activityId, contributionId, ratingId) {
    if (!userId || !updateId || !activityId || !contributionId || !ratingId) return;

    var set = {
        upper_id: userId,
        type: 'partups_ratings_changed',
        type_data: {
            activity_id: activityId,
            contribution_id: contributionId,
            rating_id: ratingId
        },
        updated_at: new Date()
    };

    Updates.update({_id: updateId}, {$set: set});
});
