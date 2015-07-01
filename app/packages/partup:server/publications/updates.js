Meteor.publishComposite('updates.one', function(updateId) {
    return {
        find: function() {
            return Updates.find({_id: updateId});
        },
        children: [
            {
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
            }
        ]
    };
});

Meteor.publishComposite('updates.from_partup', function(partupId, options) {
    var self = this;

    return {
        find: function() {
            return Partups.guardedFind(self.userId, {_id: partupId}, {limit:1});
        },
        children: [
            {
                find: function(partup) {
                    return Updates.findForUpdates(partup._id, options);
                },
                children: [
                    {
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
                        find: function(update) {
                            if (update.isActivityUpdate()) {
                                return Activities.find({_id: update.type_data.activity_id}, {limit: 1});
                            }
                        }
                    },
                    {
                        find: function(update) {
                            if (update.isContributionUpdate()) {
                                return Contributions.find({_id: update.type_data.contribution_id}, {limit: 1});
                            }
                        },
                        children: [
                            {
                                find: function(contribution) {
                                    return Activities.find({_id: contribution.activity_id}, {limit: 1});
                                }
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
            }
        ]
    };
});
