var partupChildren = [
    {
        find: function(partup) {
            return Images.find({_id: partup.image}, {limit: 1});
        }
    },
    {
        find: function(partup) {
            var uppers = partup.uppers || [];

            // We only want to publish the first x uppers
            uppers = uppers.slice(0, 4);

            return Meteor.users.findMultiplePublicProfiles(uppers);
        }
    },
    {
        find: function(partup) {
            var network = partup.network || {};

            return Networks.find({_id: network._id}, {limit: 1});
        },
        children: [
            {
                find: function(network) {
                    return Images.find({_id: network.image}, {limit: 1});
                }
            }
        ]
    }
];

/**
 * @name Partup.publications.usersCount
 * @memberof Partup.server.publications
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

Meteor.publishComposite('users.one.upperpartups', function(options) {
    var self = this;
    options = options || {};

    return {
        find: function() {
            return Partups.findUpperPartups(self.userId, options);
        },
        children: partupChildren
    };
});

Meteor.publish('users.one.upperpartups.count', function(options) {
    var self = this;
    options = options || {};

    var parameters = {
        count: true
    };

    Counts.publish(this, 'users.one.upperpartups.filterquery', Partups.findUpperPartups(self.userId, options, parameters));
});

Meteor.publishComposite('users.one.supporterpartups', function(options) {
    var self = this;
    options = options || {};

    return {
        find: function() {
            return Partups.findSupporterPartups(self.userId, options);
        },
        children: partupChildren
    };
});

Meteor.publish('users.one.supporterpartups.count', function(options) {
    var self = this;
    options = options || {};

    var parameters = {
        count: true
    };

    Counts.publish(this, 'users.one.supporterpartups.filterquery', Partups.findSupporterPartups(self.userId, options, parameters));
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
