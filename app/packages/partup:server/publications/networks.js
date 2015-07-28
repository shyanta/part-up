/**
 * Publish a list of networks
 */
Meteor.publishComposite('networks.list', function() {
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
 * @param {String} networkSlug
 */
Meteor.publishComposite('networks.one.partups', function(networkSlug, options) {
    options = options || {};

    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug});
            if (!network) return;

            return Partups.findForNetwork(this.userId, options, {networkId: network._id});
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
 * @param {String} networkSlug
 * @param {Object} options
 */
Meteor.publish('networks.one.partups.count', function(networkSlug, options) {
    options = options || {};

    var network = Networks.guardedFind(this.userId, {slug: networkSlug});
    if (!network) return;

    var parameters = {
        networkId: network._id,
        count: true
    };

    Counts.publish(this, 'networks.one.partups.filterquery', Partups.findForNetwork(this.userId, options, parameters));
});

/**
 * Publish all uppers in a network
 *
 * @param {String} networkSlug
 * @param {Object} options
 */
Meteor.publishComposite('networks.one.uppers', function(networkSlug, options) {
    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug});
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
 * @param {String} networkSlug
 * @param {Object} options
 */
Meteor.publish('networks.one.uppers.count', function(networkSlug, options) {
    options = options || {};
    parameters = parameters || {};
    var parameters = {
        count: true
    };

    var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch()[0];
    var uppers = network.uppers || [];

    Counts.publish(this, 'networks.one.uppers.filterquery', Meteor.users.findMultiplePublicProfiles(uppers, options, parameters));
});

/**
 * Publish all pending uppers in a network
 *
 * @param {String} networkSlug
 */
Meteor.publishComposite('networks.one.pending_uppers', function(networkSlug) {
    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch().pop();
            var pending_uppers = network.pending_uppers || [];
            var users = Meteor.users.findMultiplePublicProfiles(pending_uppers);
            return users;
        },
        children: [
            {find: Images.findForUser}
        ]
    };
});
