/**
 * Publish multiple partups for discover
 *
 * @param {Object} parameters
 * @param {string} parameters.networkId
 * @param {string} parameters.locationId
 * @param {string} parameters.sort
 * @param {string} parameters.textSearch
 * @param {number} parameters.limit
 * @param {number} parameters.skip
 * @param {string} parameters.language
 */
Meteor.routeComposite('/partups/discover', function(request, parameters) {
    check(parameters.query, {
        networkId: Match.Optional(String),
        locationId: Match.Optional(String),
        sort: Match.Optional(String),
        textSearch: Match.Optional(String),
        limit: Match.Optional(String),
        skip: Match.Optional(String),
        language: Match.Optional(String),
        userId: Match.Optional(String)
    });

    parameters = {
        networkId: parameters.query.networkId,
        locationId: parameters.query.locationId,
        sort: parameters.query.sort,
        textSearch: parameters.query.textSearch,
        limit: parameters.query.limit,
        skip: parameters.query.skip,
        language: (parameters.query.language === 'all') ? undefined : parameters.query.language
    };

    var options = {};

    if (parameters.limit) options.limit = parseInt(parameters.limit);
    if (parameters.skip) options.skip = parseInt(parameters.skip);

    return {
        find: function() {
            return Partups.findForDiscover(this.userId, options, parameters);
        },
        children: [
            { find: Images.findForPartup },
            {
                find: Meteor.users.findUppersForPartup,
                children: [
                    { find: Images.findForUser }
                ]
            },
            {
                find: function(partup) {
                    return Networks.findForPartup(partup, this.userId);
                },
                children: [
                    { find: Images.findForNetwork }
                ]
            }
        ]
    };
});

Meteor.routeComposite('/partups/recommendations', function(request, parameters) {

    var userId = parameters.query.userId;
    var partupIds = [];
    var encryptedUpperId;

    /**
     * if we can run api locally we could let the api return local data
     * but for now we have to return dummy data to not break the recommendation flow
     */
    var dummyLocalData = {
        "partupIds": [
            "gJngF65ZWyS9f3NDE",
            "vGaxNojSerdizDPjb",
            "WxrpPuJkhafJB3gfF",
            "ASfRYBAzo2ayYk5si",
            "gJngF65ZWyS9f3NDE"
        ]
    };

    if (!Api.available) {
        console.log('WARNING: Api connection not available. For now returning dummy local recommendations');
        partupIds = dummyLocalData.partupIds;
    } else {
        var result = Api.get('/partups/recommended/for/user/' + userId);
        partupIds = result.data.partUpIds;
    }

    return {
        find: function() {
            return Partups.guardedFind(this.userId, { _id: { $in: partupIds } });
        },
        children: [
            { find: Images.findForPartup },
            {
                find: Meteor.users.findUppersForPartup,
                children: [
                    { find: Images.findForUser }
                ]
            },
            {
                find: function(partup) {
                    return Networks.findForPartup(partup, this.userId);
                },
                children: [
                    { find: Images.findForNetwork }
                ]
            }
        ]
    };

});


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
            return Partups.guardedFind(this.userId, { _id: { $in: partupIds } });
        },
        children: [
            { find: Images.findForPartup },
            {
                find: Meteor.users.findUppersForPartup,
                children: [
                    { find: Images.findForUser }
                ]
            },
            {
                find: function(partup) {
                    return Networks.findForPartup(partup, this.userId);
                },
                children: [
                    { find: Images.findForNetwork }
                ]
            }
        ]
    };
}, { url: 'partups/by_ids/:0' });

/**
 * Publish multiple partups by ids
 *
 * @param {[String]} networkSlug
 */
Meteor.publishComposite('partups.by_network_id', function(networkId, options) {
    check(networkId, String);

    var parameters = {};
    parameters.limit = options.limit || 10;

    if (this.unblock) this.unblock();

    return {
        find: function() {
            return Partups.guardedFind(this.userId, { network_id: networkId }, parameters);
        },
        children: [
            { find: Images.findForPartup },
            {
                find: Meteor.users.findUppersForPartup,
                children: [
                    { find: Images.findForUser }
                ]
            },
            {
                find: function(partup) {
                    return Networks.findForPartup(partup, this.userId);
                },
                children: [
                    { find: Images.findForNetwork }
                ]
            }
        ]
    };
});

/**
 * Publish a list of partups
 */
Meteor.publish('partups.list', function() {
    this.unblock();

    return Partups.guardedFind(this.userId, {}, { _id: 1, name: 1 });
});

/**
 * Publish partups for the homepage
 */
Meteor.publishComposite('partups.home', function(language) {
    if (this.unblock) this.unblock();

    return {
        find: function() {
            return Partups.findForDiscover(this.userId, { limit: 4 }, { sort: 'popular' });
        },
        children: [
            { find: Images.findForPartup },
            {
                find: Meteor.users.findUppersForPartup,
                children: [
                    { find: Images.findForUser }
                ]
            },
            {
                find: function(partup) {
                    return Networks.findForPartup(partup, this.userId);
                },
                children: [
                    { find: Images.findForNetwork }
                ]
            }
        ]
    };
}, { url: 'partups/home/:0' });

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
            return Partups.guardedMetaFind({ _id: partupId }, { limit: 1 });
        },
        children: [{
            find: function() {
                return Partups.guardedFind(this.userId, { _id: partupId }, { limit: 1 }, accessToken);
            },
            children: [
                { find: Images.findForPartup },
                {
                    find: function(partup) {
                        return Networks.findForPartup(partup, this.userId);
                    },
                    children: [
                        { find: Images.findForNetwork }
                    ]
                },
                {
                    find: Meteor.users.findUppersForPartup,
                    children: [
                        { find: Images.findForUser }
                    ]
                },
                {
                    find: Meteor.users.findSupportersForPartup,
                    children: [
                        { find: Images.findForUser }
                    ]
                }
            ]
        }]
    };
});