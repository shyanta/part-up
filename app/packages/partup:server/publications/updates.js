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
    {
        // Find the user related to the update, along with their profile picture
        find: function(update) {
            return Meteor.users.findSinglePublicProfile(update.upper_id);
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
        // Find any images required for the update
        find: function(update) {
            var images = [];

            if (update.type === 'partups_image_changed') {
                images = [update.type_data.old_image, update.type_data.new_image];
            }

            if (update.type === 'partups_message_added') {
                images = update.type_data.images;
            }

            return Images.find({_id: {$in: images}});
        }
    },
    {
        // Find activity related to the update
        find: function(update) {
            if (update.isActivityUpdate()) {
                return Activities.find({_id: update.type_data.activity_id}, {limit: 1});
            }
        }
    },
    {
        // Find contribution related to the update
        find: function(update) {
            if (update.isContributionUpdate()) {
                return Contributions.find({_id: update.type_data.contribution_id}, {limit: 1});
            }
        },
        children: [
            // Backtrack and find the contribution's activity as well
            {
                find: function(contribution) {
                    return Activities.find({_id: contribution.activity_id}, {limit: 1});
                }
            },

            // Find ratings associated with the contribution
            {
                find: function(contribution) {
                    return Ratings.find({contribution_id: contribution._id});
                },
                children: [
                    // Find user associated with the rating, and their profile picture
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
    var updateCursor = Updates.find({_id: updateId}, {limit: 1});
    if (!updateCursor.count()) return;

    var update = updateCursor.fetch()[0];

    var partupCursor = Partups.guardedFind(this.userId, {_id: update.partup_id}, {limit:1});
    if (!partupCursor.count()) return;

    return {
        // Find the update
        find: function() {
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
    var partupCursor = Partups.guardedFind(this.userId, {_id: partupId}, {limit:1});
    if (!partupCursor.count()) return;

    return {
        // Find all updates, filtered by given options
        find: function() {
            return Updates.findForUpdates(partupId, options);
        },
        children: updateChildren
    };
});
