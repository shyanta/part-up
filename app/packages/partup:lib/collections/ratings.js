/**
 * Ratings are user chosen numerical feedback to contributions
 *
 * @namespace Ratings
 * @memberOf Collection
 */
Ratings = new Mongo.Collection('ratings');

/**
 * Find ratings for contribution
 *
 * @memberOf Ratings
 * @param {Contribution} contribution
 * @return {Mongo.Cursor}
 */
Ratings.findForContribution = function(contribution) {
    return Ratings.find({contribution_id: contribution._id});
};
