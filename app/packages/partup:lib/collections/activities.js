/**
 * Activities are units of work that a partup consists of
 *
 * @namespace Activities
 * @memberOf Collection
 */
Activities = new Mongo.Collection('activities');

/**
 * Find activity for an update
 *
 * @memberOf Activities
 * @param {Update} update
 * @return {Mongo.Cursor|Void}
 */
Activities.findForUpdate = function(update) {
    if (!update.isActivityUpdate()) return;

    return Activities.find({_id: update.type_data.activity_id}, {limit: 1});
};

/**
 * Find activity for contribution
 *
 * @memberOf Activities
 * @param {Contribution} contribution
 * @return {Mongo.Cursor}
 */
Activities.findForContribution = function(contribution) {
    return Activities.find({_id: contribution.activity_id}, {limit: 1});
};
