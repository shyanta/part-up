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
Meteor.publishComposite('networks.one.partups', function(networkSlug, query) {
    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug}, {limit: 1}).fetch().pop();
            if (!network) return;

            var options = {
                sort: {
                    updated_at: -1
                }
            };

            if (query) {
                if (query.limit) options.limit = parseInt(query.limit) || 20;
            }

            var c = Partups.findForNetwork(network, {}, options, this.userId);
            console.log(network, {}, options, this.userId);
            return c;
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
 * @param {Object} query
 */
Meteor.publish('networks.one.partups.count', function(networkSlug, query) {
    var network = Networks.guardedFind(this.userId, {slug: networkSlug}, {limit: 1}).fetch().pop();
    if (!network) return;

    Counts.publish(this, 'networks.one.partups.filterquery', Partups.findForNetwork(network, {}, {}, this.userId));
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
