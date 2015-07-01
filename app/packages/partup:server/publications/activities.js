/**
 * Publish all required data for activities in a part-up
 *
 * This subscription will first check if the current user is allowed to view the
 * requested part-up. If so, the client will be allowed access to:
 *
 * - The part-up
 * - Updates, filtered by given options and related:
 *   - Activities
 *   - Contributions
 *   - Images
 *   - Additionally, any update type will also be extended with any type of
 *     addtitional related information such as users and their profile pictures
 *
 * @param {String} partupId - The part-up's id
 */
Meteor.publishComposite('activities.from_partup', function(partupId) {
    var self = this;

    return {
        // Use guarded find to check if current user has access to the part-up
        find: function() {
            return Partups.guardedFind(self.userId, {_id: partupId}, {limit:1});
        },
        children: [
            // Find all activities in this partup
            {
                find: function(partup) {
                    return Activities.find({partup_id: partup._id});
                },
                children: [
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
                ]
            }
        ]
    };
});

