/**
 * Publish multiple partups for discover
 *
 * @param {Object} parameters
 * @param {string} parameters.networkId
 * @param {string} parameters.locationId
 * @param {string} parameters.sort
 * @param {string} parameters.textSearch
 * @param {number} parameters.limit
 * @param {string} parameters.language
 */
Meteor.publish('partups.discover', function(parameters) {
    check(parameters, {
        networkId: Match.Optional(String),
        locationId: Match.Optional(String),
        sort: Match.Optional(String),
        textSearch: Match.Optional(String),
        limit: Match.Optional(Number),
        skip: Match.Optional(Number),
        language: Match.Optional(String)
    });

    var options = {};
    parameters = parameters || {};

    if (parameters.limit) options.limit = parseInt(parameters.limit);
    if (parameters.skip) options.skip = parseInt(parameters.skip);

    parameters = {
        networkId: parameters.networkId,
        locationId: parameters.locationId,
        sort: parameters.sort,
        textSearch: parameters.textSearch,
        limit: parameters.limit,
        skip: parameters.skip,
        language: (parameters.language === 'all') ? undefined : parameters.language
    };

    return Partups.findForDiscover(this.userId, options, parameters);
}, {url: '/partups/discover', httpMethod: 'post'});

/**
 * Publish multiple partups by ids
 *
 * @param {[String]} partupIds
 */
Meteor.publishComposite('partups.by_ids', function(partupIds) {
    if (_.isString(partupIds)) partupIds = _.uniq(partupIds.split(','));

    check(partupIds, [String]);

    if (this.unblock) this.unblock();

    return {
        find: function() {
            return Partups.guardedFind(this.userId, {_id: {$in: partupIds}});
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: function(partup) {
                if (!get(partup, 'featured.active')) return;
                return Meteor.users.findSinglePublicProfile(partup.featured.by_upper._id);
            }, children: [
                {find: Images.findForUser}
            ]},
            {find: function(partup) { return Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
}, {url: 'partups/by_ids/:0'});

/**
 * Publish a list of partups
 */
Meteor.publish('partups.list', function() {
    this.unblock();

    return Partups.guardedFind(this.userId, {}, {_id: 1, name: 1});
});

/**
 * Publish all featured partups (superadmins only)
 */
Meteor.publishComposite('partups.featured_all', function() {
    this.unblock();

    var user = Meteor.users.findOne(this.userId);
    if (!User(user).isAdmin()) return;

    return {
        find: function() {
            return Partups.find({'featured.active': true}, {featured: 1});
        },
        children: [
            {find: function(partup) {
                return Meteor.users.findSinglePublicProfile(partup.featured.by_upper._id);
            }, children: [
                {find: Images.findForUser}
            ]}
        ]
    };
});

/**
 * Publish a single partup
 *
 * @param {String} partupId
 * @param {String} accessToken
 */
Meteor.publishComposite('partups.one', function(partupId, accessToken) {
    check(partupId, String);
    if (accessToken) check(accessToken, String);

    this.unblock();

    return {
        find: function() {
            return Partups.guardedMetaFind({_id: partupId}, {limit: 1});
        },
        children: [
            {
                find: function() {
                    return Partups.guardedFind(this.userId, {_id: partupId}, {limit: 1}, accessToken);
                },
                children: [
                    {find: Images.findForPartup},
                    {find: function(partup) { return Networks.findForPartup(partup, this.userId); }, children: [
                        {find: Images.findForNetwork}
                    ]},
                    {find: Meteor.users.findUppersForPartup, children: [
                        {find: Images.findForUser}
                    ]},
                    {find: Meteor.users.findSupportersForPartup, children: [
                        {find: Images.findForUser}
                    ]}
                ]
            }
        ]
    };
});
