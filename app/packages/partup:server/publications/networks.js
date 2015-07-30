/**
 * Publish a list of networks
 */
Meteor.publishComposite('networks.list', function() {
    this.unblock();

    return {
        find: function() {
            return Networks.guardedFind(this.userId);
        },
        children: [
            {find: Images.findForNetwork}
        ]
    };
});

/**
 * Publish a network
 *
 * @param {String} networkSlug
 */
Meteor.publishComposite('networks.one', function(networkSlug) {
    this.unblock();

    return {
        find: function() {
            return Networks.guardedMetaFind({slug: networkSlug}, {limit: 1});
        },
        children: [
            {find: Images.findForNetwork},
            {find: Invites.findForNetwork},
            {
                find: function() {
                    return Networks.guardedFind(this.userId, {slug: networkSlug}, {limit: 1});
                }
            }
        ]
    };
});

/**
 * Publish all partups in a network
 *
 * @param {String} networkId
 */
Meteor.publishComposite('networks.one.partups', function(networkId, parameters) {
    this.unblock();

    parameters = parameters || {};

    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {_id: networkId}).fetch().pop();
            if (!network) return;

            var options = {};
            if (parameters.limit) options.limit = parseInt(parameters.limit);

            return Partups.findForNetwork(network, {}, options, this.userId);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: function(partup) { return Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

/**
 * Publish a count of all partups in a network
 *
 * @param {String} networkId
 */
Meteor.publish('networks.one.partups.count', function(networkId) {
    this.unblock();

    var network = Networks.guardedFind(this.userId, {_id: networkId}).fetch().pop();
    if (!network) return;

    Counts.publish(this, 'networks.one.partups.filterquery', Partups.findForNetwork(network, {}, {}, this.userId));
});

/**
 * Publish all uppers in a network
 *
 * @param {String} networkId
 * @param {Object} options
 */
Meteor.publishComposite('networks.one.uppers', function(networkId, options) {
    this.unblock();

    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {_id: networkId}).fetch().pop();
            if (!network) return;

            return Networks.guardedFind(this.userId, {_id: network._id}, {limit: 1});
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
    this.unblock();

    options = options || {};
    parameters = parameters || {};
    var parameters = {
        count: true
    };

    var network = Networks.guardedFind(this.userId, {_id: networkId}).fetch().pop();
    if (!network) return;

    var uppers = network.uppers || [];

    Counts.publish(this, 'networks.one.uppers.filterquery', Meteor.users.findMultiplePublicProfiles(uppers, options, parameters));
});

/**
 * Publish all pending uppers in a network
 *
 * @param {String} networkSlug
 */
Meteor.publishComposite('networks.one.pending_uppers', function(networkSlug) {
    this.unblock();

    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch().pop();
            if (!network) return;

            var pending_uppers = network.pending_uppers || [];
            var users = Meteor.users.findMultiplePublicProfiles(pending_uppers);

            return users;
        },
        children: [
            {find: Images.findForUser}
        ]
    };
});
