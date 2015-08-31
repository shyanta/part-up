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
    check(networkSlug, String);

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
 * @param {String} networkSlug
 */
Meteor.publishComposite('networks.one.partups', function(networkSlug, parameters) {
    this.unblock();

    parameters = parameters || {};

    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch().pop();
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
 * @param {String} networkSlug
 */
Meteor.publish('networks.one.partups.count', function(networkSlug) {
    this.unblock();

    var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch().pop();
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
    this.unblock();

    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch().pop();
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
    this.unblock();

    options = options || {};
    parameters = parameters || {};
    var parameters = {
        count: true
    };

    var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch().pop();
    if (!network) return;

    var uppers = network.uppers || [];

    Counts.publish(this, 'networks.one.uppers.filterquery', Meteor.users.findMultiplePublicProfiles(uppers, options, parameters), {noWarnings: true});
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

/**
 * Publish all featured partups
 */
Meteor.publishComposite('networks.featured_all', function(language) {
    check(language, Match.Optional(String));
    this.unblock();

    return {
        find: function() {
            return Networks.findFeatured(language);
        },
        children: [
            {find: Images.findForNetwork},
            {find: function(network) {
                if (!get(network, 'featured.active')) return;
                return Meteor.users.findSinglePublicProfile(network.featured.by_upper._id);
            }, children: [
                {find: Images.findForUser}
            ]},
        ]
    };
});


/**
 * Publish all networks for admin panel
 */
Meteor.publish('networks.admin_all', function() {
    this.unblock();

    var user = Meteor.users.findOne(this.userId);
    if (!User(user).isAdmin()) return;

    return Networks.find({});
});
