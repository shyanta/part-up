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
});


/**
 * Publish multiple partups for recommendations
 */

function getRecommendedIds(encryptionKey) {

  var apiRoot = process.env.API_ROOT_URL;

  if (!apiRoot) {
    console.log('ERROR: API_ROOT_URL not set.');
    return [];
  }

  try {
    var url = Npm.require('url');
    var recommendationApiUrl = url.resolve(apiRoot, '/partups/recommended/for/user/' + encryptionKey);
    var result = HTTP.get(recommendationApiUrl, {});
    return result.data.partUpIds;
  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    console.log('getRecommendedIds error: ' + e);
    return []
  }
}

function createEncryptionKey(userId, apiKey) {
  var crypto = Npm.require('crypto');
  var hash = crypto.createHash('md5');
  hash.update(apiKey);
  var key = hash.digest('hex');
  var cipher = crypto.createCipheriv('aes-128-ecb', new Buffer(key, 'hex'), new Buffer(0));
  var encrypted = cipher.update(userId, 'utf-8', 'base64') + cipher.final('base64');
  return encrypted.replace(/\+/g,'-').replace(/\//g,'_');
}

Meteor.routeComposite('/partups/recommendations', function(request, parameters) {

  var userId = parameters.query.userId;
  var apiKey = process.env.EVENT_ENDPOINT_AUTHORIZATION;

  var encryptedUpperId;
  if (!apiKey) {
    console.log('ERROR: EVENT_ENDPOINT_AUTHORIZATION not set.');
    encryptedUpperId = userId;
  } else {
    encryptedUpperId = createEncryptionKey(userId, apiKey);
  }

  var partupIds = getRecommendedIds(encryptedUpperId);

    if (partupIds.length === 0) {
      return;
    }

    return {
      find: function() {
          return Partups.guardedFind(userId, {_id: {$in: partupIds}});
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
            return Partups.guardedFind(this.userId, {network_id: networkId}, parameters);
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
});

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
 * Publish a random featured partup
 */
Meteor.publishComposite('partups.featured_one_random', function(language) {
    if (this.unblock) this.unblock();

    return {
        find: function() {
            var selector = {'featured.active': true};

            if (language) selector.language = language;

            var count = Partups.guardedFind(this.userId, selector).count();
            var random = Math.floor(Math.random() * count);

            return Partups.guardedFind(this.userId, selector, {limit: 1, skip: random});
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
}, {url: 'partups/featured_one_random/:0'});

/**
 * Publish partups for the homepage
 */
Meteor.publishComposite('partups.home', function(language) {
    if (this.unblock) this.unblock();

    return {
        find: function() {
            return Partups.findForDiscover(this.userId, {limit: 4}, {sort: 'popular'});
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
}, {url: 'partups/home/:0'});

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
