/**
 * Publish all required data for activities in a part-up
 *
 * This subscription will first check if the current user is allowed to view the
 * requested part-up. If so, the client will be allowed access to:
 *
 * - Activities
 *   - Activity contributions
 *     - Contribution user's public profile + profile picture
 *     - Contribution ratings
 *       - Contribution rating user's public profile + profile picture
 *
 * @param {String} partupId - The part-up's id
 */
Meteor.publishComposite('activities.from_partup', function(partupId) {
    var partup = Partups.guardedFind(this.userId, {_id: partupId}, {limit:1}).fetch().pop();

    return {
        find: function() {
            return Activities.findForPartup(partup._id);
        },
        children: [
            {
                find: function(activity) {
                    return Updates.find({_id: activity.update_id}, {limit: 1});
                }
            },
            {
                find: function(activity) {
                    return Contributions.find({activity_id: activity._id});
                },
                children: [
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
                    {
                        find: function(contribution) {
                            return Ratings.find({contribution_id: contribution._id});
                        },
                        children: [
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
    };
});

