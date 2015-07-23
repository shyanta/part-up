/**
 * Contributions are added to Activities and indicate a users involvement in an Activity
 * @namespace Contributions
 * @memberOf Collection
 */
Contributions = new Meteor.Collection('contributions');

/**
 * Find contributions for an update
 *
 * @memberOf Contributions
 * @param {Update} update
 * @return {Mongo.Cursor|Void}
 */
Contributions.findForUpdate = function(update) {
    if (!update.isContributionUpdate()) return;

    return Contributions.find({_id: update.type_data.contribution_id}, {limit: 1});
};
