/**
 * Publish a list of networks
 */
Meteor.publish('networks.list', function() {
    return Networks.guardedMetaFind();
});

/**
 * Publish all partups in a network
 *
 * @param {String} networkId
 */
Meteor.publishComposite('networks.one.partups', function(networkId, options) {
    options = options || {};

    return {
        find: function() {
            return Partups.findForNetwork(this.userId, options, {networkId: networkId});
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup},
            {find: function(partup) { Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

/**
 * Publish a count of all partups in a network
 *
 * @param {String} networkId
 * @param {Object} options
 */
Meteor.publish('networks.one.partups.count', function(networkId, options) {
    options = options || {};

    var parameters = {
        networkId: networkId,
        count: true
    };

    Counts.publish(this, 'networks.one.partups.filterquery', Partups.findForNetwork(this.userId, options, parameters));
});

/**
 * Publish all uppers in a network
 *
 * @param {String} networkId
 * @param {Object} options
 */
Meteor.publishComposite('networks.one.uppers', function(networkId, options) {
    return {
        find: function() {
            return Networks.guardedFind(this.userId, {_id: networkId}, {limit: 1});
        },
        children: [
            {find: Meteor.users.findUppersForNetwork, children: [
                {find: Images.findForUser}
            ]}
        ]
    };
});

/**
 * Publish a count of all uppers in a network
 *
 * @param {String} networkId
 * @param {Object} options
 */
Meteor.publish('networks.one.uppers.count', function(networkId, options) {
    options = options || {};
    parameters = parameters || {};
    var parameters = {
        count: true
    };

    var network = Networks.guardedFind(this.userId, {_id: networkId}).fetch()[0];
    var uppers = network.uppers || [];

    Counts.publish(this, 'networks.one.uppers.filterquery', Meteor.users.findMultiplePublicProfiles(uppers, options, parameters));
});

/**
 * Publish all pending uppers in a network
 *
 * @param {String} networkId
 */
Meteor.publishComposite('networks.one.pending_uppers', function(networkId) {
    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {_id: networkId}).fetch().pop();
            var pending_uppers = network.pending_uppers || [];
            var users = Meteor.users.findMultiplePublicProfiles(pending_uppers);
            return users;
        },
        children: [
            {find: Images.findForUser}
        ]
    };
});

/**
 * Publish a network
 *
 * @param {String} networkId
 */
Meteor.publishComposite('networks.one', function(networkId) {
    return {
        find: function() {
            return Networks.guardedMetaFind({_id: networkId}, {limit: 1});
        },
        children: [
            {find: Images.findForNetwork},
            {find: Invites.findForNetwork},
            {
                find: function() {
                    return Networks.guardedFind(this.userId, {_id: networkId}, {limit: 1});
                }
            }
        ]
    };
});
