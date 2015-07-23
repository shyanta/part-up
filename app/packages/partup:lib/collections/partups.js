/**
 * @memberof Partups
 * @private
 */
var PUBLIC = 1;
/**
 * @memberof Partups
 * @private
 */
var PRIVATE = 2;
/**
 * @memberof Partups
 * @private
 */
var NETWORK_PUBLIC = 3;
/**
 * @memberof Partups
 * @private
 */
var NETWORK_INVITE = 4;
/**
 * @memberof Partups
 * @private
 */
var NETWORK_CLOSED = 5;

/**
 * @ignore
 */
var Partup = function(document) {
    _.extend(this, document);
};

/**
 * Check if a given user can edit this partup
 *
 * @memberof Partups
 * @param {User} user the user object
 * @return {Boolean}
 */
Partup.prototype.isEditableBy = function(user) {
    var uppers = this.uppers || [];

    return user && uppers.indexOf(user._id) > -1;
};

/**
 * Check if a given user can remove this partup
 *
 * @memberof Partups
 * @param {User} user the user object
 * @return {Boolean}
 */
Partup.prototype.isRemovableBy = function(user) {
    return user && this.creator_id === user._id;
};

/**
 * Check if given user is a supporter of this partup
 *
 * @memberof Partups
 * @param {String} userId the id of the user that should be checked
 * @return {Boolean}
 */
Partup.prototype.hasSupporter = function(userId) {
    if (!this.supporters) return false;
    return mout.lang.isString(userId) && this.supporters.indexOf(userId) > -1;
};

/**
 * Check if given user is an upper in this partup
 *
 * @memberof Partups
 * @param {String} userId the id of the user that should be checked
 * @return {Boolean}
 */
Partup.prototype.hasUpper = function(userId) {
    if (!this.uppers) return false;
    return mout.lang.isString(userId) && this.uppers.indexOf(userId) > -1;
};

/**
 * Check if given user has the right to view the partup
 *
 * @memberof Partups
 * @param {String} userId the user id of the user that should be checked
 * @return {Boolean}
 */
Partup.prototype.isViewableByUser = function(userId) {
    if (this.privacy_type === PUBLIC) return true;
    if (this.privacy_type === NETWORK_PUBLIC) return true;
    if (this.privacy_type === PRIVATE || this.privacy_type === NETWORK_INVITE || this.privacy_type === NETWORK_CLOSED) {
        if (this.hasSupporter(userId)) return true;
        if (this.hasUpper(userId)) return true;
    }
    return false;
};

/**
 * Check if a partup has ended
 *
 * @return {Boolean}
 */
Partup.prototype.hasEnded = function() {
    var now = new Date;
    var endDate = this.endDate;

    return now < endDate;
};

/**
 Partups describe collaborations between several uppers
 @namespace Partups
 */
Partups = new Mongo.Collection('partups', {
    transform: function(document) {
        return new Partup(document);
    }
});

/**
 * @memberof Partups
 * @public
 */
Partups.PUBLIC = PUBLIC;
/**
 * @memberof Partups
 * @public
 */
Partups.PRIVATE = PRIVATE;
/**
 * @memberof Partups
 * @public
 */
Partups.NETWORK_PUBLIC = NETWORK_PUBLIC;
/**
 * @memberof Partups
 * @public
 */
Partups.NETWORK_INVITE = NETWORK_INVITE;
/**
 * @memberof Partups
 * @public
 */
Partups.NETWORK_CLOSED = NETWORK_CLOSED;

/**
 * ============== PARTUPS COLLECTION HELPERS ==============
 */

/**
 * Modified version of Collection.find that makes sure the
 * user (or guest) can only retrieve authorized entities
 *
 * @memberof Partups
 * @param {String} userId
 * @param {Object} selector
 * @param {Object} options
 * @return {Cursor}
 */
Partups.guardedFind = function(userId, selector, options) {
    var selector = selector || {};
    var options = options || {};

    var user = Meteor.users.findOneOrFail(userId);

    var guardedCriterias = [
        // Either the partup is public or belongs to a public network
        {'privacy_type': {'$in': [Partups.PUBLIC, Partups.NETWORK_PUBLIC]}},
    ];

    // Some extra rules that are only applicable to users that are logged in
    if (userId) {

        // The user is part of the partup uppers, which means he has access anyway
        guardedCriterias.push({'uppers': {'$in': [userId]}});

        // Of course the creator of a partup always has the needed rights
        guardedCriterias.push({'creator_id': userId});

        // Everyone who is part of the network the partup is part of can view it
        guardedCriterias.push({'network_id': {'$in': [user.networks]}});
    }

    // Guarding selector that needs to be fulfilled
    var guardingSelector = {'$or': guardedCriterias};

    // Merge the selectors, so we still use the initial selector provided by the caller
    var finalSelector = {'$and': [guardingSelector, selector]};

    return this.find(finalSelector, options);
};

/**
 * Modified version of Collection.find that makes
 * sure the user (or guest) can only retrieve
 * fields that are publicly available
 *
 * @memberof Partups
 * @param {String} userId
 * @param {Object} selector
 * @param {Object} options
 * @return {Cursor}
 */
Partups.guardedMetaFind = function(userId, selector, options) {
    var selector = selector || {};
    var options = options || {};

    // Make sure that if the callee doesn't pass the fields
    // key used in the options parameter, we set it with
    // the _id fields, so we do not publish all fields
    // by default, which would be a security issue
    options.fields = {_id: 1};

    // The fields that should be available on each partup
    var unguardedFields = ['privacy_type'];

    unguardedFields.forEach(function(unguardedField) {
        options.fields[unguardedField] = 1;
    });

    return this.find(selector, options);
};

/**
 * Find the partups used in the discover page
 *
 * @memberof Partups
 * @param {Object} options
 * @return {Cursor}
 */
Partups.findForDiscover = function(userId, options, parameters) {
    var selector = {};

    var options = options || {};
    options.limit = options.limit ? parseInt(options.limit) : undefined;
    options.sort = options.sort || {};

    var parameters = parameters || {};

    var sort = parameters.sort || undefined;
    var query = parameters.query || undefined;
    var locationId = parameters.locationId || undefined;
    var networkId = parameters.networkId || undefined;

    if (sort) {

        // Sort the partups from the newest to the oldest
        if (sort === 'new') {
            options.sort['updated_at'] = -1;
        }

        // Sort the partups from the most popular to the least popular
        if (sort === 'popular') {
            options.sort['analytics.clicks_per_day'] = -1;
        }
    }

    // Filter the partups that are in a given location
    if (locationId) {
        selector['location.place_id'] = locationId;
    }

    // Filter the partups that are in a given network
    if (networkId) {
        selector['network_id'] = networkId;
    }

    // Filter the partups that match the search query
    if (query) {
        Log.debug('Searching for [' + query + ']');

        selector['$text'] = {$search: query};
        options.fields = {score: {$meta: 'textScore'}};

        options.sort['score'] = {$meta: 'textScore'};
    }

    return this.guardedFind(userId, selector, options);
};

/**
 * Find the partup for an update
 *
 * @memberOf Partups
 * @param {Update} update
 * @return {Mongo.Cursor|Void}
 */
Partups.findForUpdate = function(userId, update) {
    if (!update.partup_id) return;
    return this.guardedFind(userId, {_id: update.partup_id}, {limit:1});
};

/**
 * Find the partups used on the network page
 *
 * @memberof Partups
 * @param {Object} options
 * @return {Cursor}
 */
Partups.findForNetwork = function(userId, options, parameters) {
    var selector = {};
    var options = options || {};
    var parameters = parameters || {};

    options.limit = parameters.count ? undefined : parseInt(options.limit) || 20;
    selector.network_id = parameters.networkId || false;
    var sort = options.count ? undefined : options.sort || false;

    if (!parameters.count) {

        // Initialize
        options.sort = {};

        // Sort the partups from the newest to the oldest
        options.sort['updated_at'] = -1;
    }

    return this.guardedFind(userId, selector, options);
};

/**
 * Find the partups where the userid is upper
 *
 * @memberof Partups
 * @param {Object} options
 * @return {Cursor}
 */
Partups.findUpperPartups = function(userId, options, parameters) {
    var selector = {uppers: {$in: [userId]}};
    var options = options || {};
    var parameters = parameters || {};

    options.limit = parameters.count ? undefined : parseInt(options.limit) || 20;
    var sort = options.count ? undefined : options.sort || false;

    if (!parameters.count) {

        // Initialize
        options.sort = {};

        // Sort the partups from the newest to the oldest
        options.sort['updated_at'] = -1;
    }

    return this.guardedFind(userId, selector, options);
};

/**
 * Find the partups where the userid is supper
 *
 * @memberof Partups
 *
 * @param {Object} options
 *
 * @return {Cursor}
 */
Partups.findSupporterPartups = function(userId, options, parameters) {
    var selector = {supporters: {$in: [userId]}};
    var options = options || {};
    var parameters = parameters || {};

    options.limit = parameters.count ? undefined : parseInt(options.limit) || 20;
    var sort = options.count ? undefined : options.sort || false;

    if (!parameters.count) {

        // Initialize
        options.sort = {};

        // Sort the partups from the newest to the oldest
        options.sort['updated_at'] = -1;
    }

    return this.guardedFind(userId, selector, options);
};
