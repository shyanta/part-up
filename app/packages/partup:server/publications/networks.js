Meteor.publish('networks.user', function() {
    return Networks.guardedFind();
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
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup},
            {find: Networks.findForPartup, children: [
                {find: Images.findForNetwork}
            ]}
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
            return Networks.guardedFind(self.userId, {_id: networkId}, {limit: 1});
        },
        children: [
            {find: Meteor.users.findUppersForNetwork, children: [
                {find: Images.findForUser}
            ]}
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
            var network = Networks.guardedFind(self.userId, {_id: networkId}).fetch().pop();
            var pending_uppers = network.pending_uppers || [];
            var users = Meteor.users.findMultiplePublicProfiles(pending_uppers);
            return users;
        },
        children: [
            {find: Images.findForUser}
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
            {find: Images.findForNetwork},
            {
                find: function() {
                    return Networks.guardedFind(self.userId, {_id: networkId}, {limit: 1});
                }
            }
        ]
    };
});
