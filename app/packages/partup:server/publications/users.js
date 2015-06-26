/**
 * @name Partup.publications.usersCount
 * @memberof partup.server.publications
 */
Meteor.publish('users.count', function() {
    Counts.publish(this, 'users', Meteor.users.find());
});

Meteor.publishComposite('users.one', function(userId) {
    return {
        find: function() {
            return Meteor.users.findSinglePublicProfile(userId);
        },
        children: [
            {
                find: function(user) {
                    return Images.find({_id: user.profile.image}, {limit: 1});
                }
            }
        ]
    };
});

Meteor.publishComposite('users.loggedin', function() {
    var self = this;

    return {
        find: function() {
            return Meteor.users.findSinglePrivateProfile(self.userId);
        },
        children: [
            {
                find: function(user) {
                    return Images.find({_id: user.profile.image}, {limit: 1});
                }
            },
            {
                find: function(user) {
                    var networks = user.networks || [];

                    return Networks.guardedFind(user._id, {_id: {'$in': networks}});
                }
            },
            {
                find: function(user) {
                    return Notifications.find({for_upper_id: user._id}, {limit: 20});
                },
                children: [
                    {
                        find: function(notification) {
                            var images = [];

                            if (notification.type === 'partups_supporters_added') {
                                images.push(notification.type_data.supporter.image);
                            }

                            return Images.find({_id: {$in: images}});
                        }
                    }
                ]
            }
        ]
    };
});
