Meteor.publishComposite('networks.all', function() {
    return {
        find: function() {
            return Networks.find({}, {fields: {description: 1, name: 1, privacy_type: 1, tags: 1, image: 1}});
        },
        children: [
            {
                find: function(network) {
                    var partups = network.partups || [];

                    return Partups.find({_id: {$in: partups}}, {fields: {name: 1, description: 1}});
                }
            }
        ]
    };
});

Meteor.publish('networks.user', function() {
    var user = Meteor.users.findSinglePublicProfile(this.userId).fetch().pop();
    var userNetworkIds = user.networks || [];
    return Networks.find({$or: [{_id: {$in: userNetworkIds}}, {privacy_type: 1}]}, {privacy_type: 1, name: 1});
});

Meteor.publish('networks.list', function() {
    return Networks.find({}, {privacy_type: 1, name: 1});
});

Meteor.publishComposite('networks.one.partups', function(networkId) {
    var self = this;

    return {
        find: function() {
            return Partups.guardedFind(self.userId, {'network._id': networkId});
        }
    };
});

Meteor.publishComposite('networks.one.uppers', function(networkId) {
    return {
        find: function() {
            var network = Networks.findOneOrFail(networkId);
            var uppers = network.uppers || [];
            return Meteor.users.findMultiplePublicProfiles(uppers);
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

Meteor.publishComposite('networks.one.pending_uppers', function(networkId) {
    return {
        find: function() {
            var network = Networks.findOneOrFail(networkId);
            var pending_uppers = network.pending_uppers || [];
            return Meteor.users.findMultiplePublicProfiles(pending_uppers);
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

Meteor.publishComposite('networks.one', function(networkId) {
    return {
        find: function() {
            return Networks.find({_id: networkId}, {limit: 1});
        },
        children: [
            {
                find: function(network) {
                    var imageId = network.image || null;
                    return Images.find({_id: imageId}, {limit: 1});
                }
            },
            {
                find: function(network) {
                    var partups = network.partups || [];
                    return Partups.find({_id: {$in: partups}});
                }
            },
            {
                find: function(network) {
                    var uppers = network.uppers || [];
                    return Meteor.users.findMultiplePublicProfiles(uppers);
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
    };
});
