Meteor.publishComposite('activities.from_partup', function(partupId) {
    var self = this;

    return {
        find: function() {
            return Partups.guardedFind(self.userId, {_id: partupId}, {limit:1});
        },
        children: [
            {
                find: function(partup) {
                    return Activities.find({partup_id: partup._id});
                },
                children: [
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
            }
        ]
    };
});

