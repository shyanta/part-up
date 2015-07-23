/**
 * Children of an update, used below by `updates.one` and `updates.from_partup`
 *
 * This will allow access to the following:
 *
 * - Activities
 * - Contributions
 * - Images
 * - Additionally, any update type will also be extended with any type of
 *   addtitional related information such as users and their profile pictures
 */
var updateChildren = [
    {find: Meteor.users.findForUpdate, children: [
        {find: Images.findForUser}
    ]},
    {find: Images.findForUpdate},
    {find: Activities.findForUpdate},
    {find: Contributions.findForUpdate, children: [
        {find: Activities.findForContribution},
        {find: Ratings.findForContribution, children: [
            {find: Meteor.users.findForRating, children: [
                {find: Images.findForUser}
            ]}
        ]}
    ]}
];

/**
 * Publish all required data for requested update
 *
 * This subscription will first check if the current user is allowed to view the
 * part-up this update belongs to. If so, the client will be allowed access to:
 *
 * - The update and related data
 *
 * @param {String} updateId
 */
Meteor.publishComposite('updates.one', function(updateId) {
    return {
        find: function() {
            var updateCursor = Updates.find({_id: updateId}, {limit: 1});
            if (!updateCursor.count()) return;

            var update = updateCursor.fetch()[0];

            var partupCursor = Partups.guardedFind(this.userId, {_id: update.partup_id}, {limit:1});
            if (!partupCursor.count()) return;

            return updateCursor;
        },
        children: updateChildren
    };
});

/**
 * Publish all required data for updates in a part-up
 *
 * This subscription will first check if the current user is allowed to view the
 * requested part-up. If so, the client will be allowed access to:
 *
 * - Updates, filtered by given options and related data
 *
 * @param {String} partupId - The part-up's id
 * @param {Object} options  - Possible filtering options for updates
 */
Meteor.publishComposite('updates.from_partup', function(partupId, options) {
    return {
        find: function() {
            var partupCursor = Partups.guardedFind(this.userId, {_id: partupId}, {limit:1});
            if (!partupCursor.count()) return;

            return Updates.findForUpdates(partupId, options);
        },
        children: updateChildren
    };
});
