Meteor.publish('networks.user', function() {
    var user = Meteor.users.findSinglePublicProfile(this.userId).fetch().pop();
    var userNetworkIds = user.networks || [];
    return Networks.find({$or: [{_id: {$in: userNetworkIds}}, {privacy_type: 1}]}, {privacy_type: 1, name: 1});
});

Meteor.publish('networks.list', function() {
    return Networks.guardedMetaFind();
});

Meteor.publishComposite('networks.one.partups', function(networkId, options) {
    var self = this;
    options = options || {};

    var parameters = {
        networkId: networkId
    };

    return {
        find: function() {
            return Partups.findForNetwork(self.userId, options, parameters);
        },
        children: [
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
        ]
    };
});

Meteor.publish('networks.one.partups.count', function(networkId, options) {
    var self = this;
    options = options || {};

    var parameters = {
        networkId: networkId,
        count: true
    };

    Counts.publish(this, 'networks.one.partups.filterquery', Partups.findForNetwork(self.userId, options, parameters));
});

Meteor.publishComposite('networks.one.uppers', function(networkId, options) {
    var self = this;
    return {
        find: function() {
            var network = Networks.guardedFind(self.userId, {_id: networkId}).fetch()[0];
            var uppers = network.uppers || [];
            return Meteor.users.findMultiplePublicProfiles(uppers, options);
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

Meteor.publish('networks.one.uppers.count', function(networkId, options) {
    var self = this;
    options = options || {};
    parameters = parameters || {};
    var parameters = {
        count: true
    };

    var network = Networks.guardedFind(self.userId, {_id: networkId}).fetch()[0];
    var uppers = network.uppers || [];

    Counts.publish(this, 'networks.one.uppers.filterquery', Meteor.users.findMultiplePublicProfiles(uppers, options, parameters));
});

Meteor.publishComposite('networks.one.pending_uppers', function(networkId) {
    var self = this;

    return {
        find: function() {
            var network = Networks.guardedFind(self.userId, {_id: networkId});
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
    var self = this;

    return {
        find: function() {
            return Networks.guardedMetaFind(self.userId, {_id: networkId}, {limit: 1});
        },
        children: [
            {
                find: function() {
                    return Networks.guardedFind(self.userId, {_id: networkId}, {limit: 1});
                }
            },
            {
                find: function(network) {
                    var iconId = network.icon || null;
                    return Images.find({_id: iconId}, {limit: 1});
                }
            },
            {
                find: function(network) {
                    var imageId = network.image || null;
                    return Images.find({_id: imageId}, {limit: 1});
                }
            }
        ]
    };
});
