/**
 * Children of an activity
 *
 * This will allow access to the following:
 *
 * - Activity contributions
 *   - Contribution user's public profile + profile picture
 *   - Contribution ratings
 *     - Contribution rating user's public profile + profile picture
 */
var activityChildren = [
    // Find contributions for each activity
    {
        find: function(activity) {
            return Contributions.find({activity_id: activity._id});
        },
        children: [
            // Find user's public profile + profile picture for each contribution
            {
                find: function(contribution) {
                    return Meteor.users.findSinglePublicProfile(contribution.upper_id);
                },
                children: [
                    {
                        find: function(user) {
                            return Images.find({_id: user.profile.image}, {limit: 1});
                        }
                    }
                ]
            },

            // Find ratings for each contribution
            {
                find: function(contribution) {
                    return Ratings.find({contribution_id: contribution._id});
                },
                children: [
                    // Find each rating's user's public profile + profile picture
                    {
                        find: function(rating) {
                            return Meteor.users.findSinglePublicProfile(rating.upper_id);
                        },
                        children: [
                            {
                                find: function(user) {
                                    return Images.find({_id: user.profile.image}, {limit: 1});
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

/**
 * Publish all required data for activities in a part-up
 *
 * This subscription will first check if the current user is allowed to view the
 * requested part-up. If so, the client will be allowed access to:
 *
 * - Activities, filtered by given options and related:
 *
 * @param {String} partupId - The part-up's id
 */
Meteor.publishComposite('activities.from_partup', function(partupId) {
    var partupCursor = Partups.guardedFind(this.userId, {_id: partupId}, {limit:1});
    if (!partupCursor.count()) return;

    return {
        // Find all activities in this partup
        find: function(partup) {
            return Activities.find({partup_id: partupId});
        },
        children: activityChildren
    };
});

