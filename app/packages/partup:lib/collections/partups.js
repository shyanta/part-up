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
    return user && (this.creator_id === user._id || User(user).isAdmin());
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
 * Check if given user is on the invite list of this partup
 *
 * @memberof Partups
 * @param {String} userId the id of the user to check against
 * @return {Boolean}
 */
Partup.prototype.hasInvitedUpper = function(userId) {
    if (!this.invites) return false;
    return mout.lang.isString(userId) && this.invites.indexOf(userId) > -1;
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
        var user = Meteor.users.findOne(userId);
        if (!user) return false;

        var networks = user.networks || [];
        if (networks.indexOf(this.network_id) > -1) return true;

        if (this.hasSupporter(userId)) return true;
        if (this.hasUpper(userId)) return true;
        if (this.hasInvitedUpper(userId)) return true;
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
 * Make the upper a supporter
 *
 * @memberof Partups
 * @param {String} upperId the user that becomes a supporter
 */
Partup.prototype.makeSupporter = function(upperId) {
    if (!this.hasUpper(upperId)) {
        Partups.update(this._id, {$addToSet: {'supporters': upperId}});
        Meteor.users.update(upperId, {$addToSet: {'supporterOf': this._id}});
    }
};

/**
 * Promote a user from supporter to partner
 *
 * @memberof Partups
 * @param {String} upperId the user that gets promoted
 */
Partup.prototype.makeSupporterPartner = function(upperId) {
    Partups.update(this._id, {$pull: {'supporters': upperId, 'invites': upperId}, $addToSet: {'uppers': upperId}});
    Meteor.users.update(upperId, {$pull: {'supporterOf': this._id}, $addToSet: {'upperOf': this._id}});
};

/**
 * Demote a user from partner to supporter
 *
 * @memberof Partups
 * @param {String} upperId the user that gets demoted
 */
Partup.prototype.makePartnerSupporter = function(upperId) {
    Partups.update(this._id, {$pull: {'uppers': upperId}, $addToSet: {'supporters': upperId}});
    Meteor.users.update(upperId, {$pull: {'upperOf': this._id}, $addToSet: {'supporterOf': this._id}});
};

/**
 * Soft delete a partup
 *
 * @memberOf Partups
 */
Partup.prototype.remove = function() {
    var supporters = partup.supporters || [];
    var uppers = partup.uppers || [];

    Meteor.users.update({_id: {$in: supporters}}, {$pull: {'supporterOf': partupId}}, {multi: true});
    Meteor.users.update({_id: {$in: uppers}}, {$pull: {'upperOf': partupId}}, {multi: true});

    Partups.update(partupId, {$set:{deleted_at: new Date}});
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

// Add indices
if (Meteor.isServer) {
    Partups._ensureIndex({'name': 'text', 'description': 'text'});
    Partups._ensureIndex('creator_id');
    Partups._ensureIndex('privacy_type');
    Partups._ensureIndex('slug');
    Partups._ensureIndex('progress');
    Partups._ensureIndex('tags');
}

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
    selector.deleted_at = selector.deleted_at || {$exists: false};

    if (Meteor.isClient) return this.find(selector, options);

    var selector = selector || {};
    var options = options || {};

    var guardedCriterias = [
        // Either the partup is public or belongs to a public network
        {'privacy_type': {'$in': [Partups.PUBLIC, Partups.NETWORK_PUBLIC]}},
    ];

    // Some extra rules that are only applicable to users that are logged in
    if (userId) {
        var user = Meteor.users.findOneOrFail(userId);
        var networks = user.networks || [];

        // The user is part of the partup uppers, which means he has access anyway
        guardedCriterias.push({'uppers': {'$in': [userId]}});

        // Of course the creator of a partup always has the needed rights
        guardedCriterias.push({'creator_id': userId});

        // Everyone who is part of the network the partup is part of can view it
        guardedCriterias.push({'network_id': {'$in': networks}});

        // Check if upper is invited, so has the rights to view a partup in a closed network
        guardedCriterias.push({'invites': {'$in': [userId]}});
    }

    var finalSelector = {};

    // MongoDB only allows 1 root $or, so we have to merge the $or from the given selector
    // with the $or values that we generate with the guarded criterias above here
    if (selector.$or) {
        finalSelector = selector;
        finalSelector.$and = [{'$or': guardedCriterias}, {'$or': selector.$or}];
        delete finalSelector.$or;
    } else {
        // Guarding selector that needs to be fulfilled
        var guardingSelector = {'$or': guardedCriterias};

        // Merge the selectors, so we still use the initial selector provided by the caller
        finalSelector = {'$and': [guardingSelector, selector]};
    }

    return this.find(finalSelector, options);
};

/**
 * Modified version of Collection.find that makes
 * sure the user (or guest) can only retrieve
 * fields that are publicly available
 *
 * @memberof Partups
 * @param {Object} selector
 * @param {Object} options
 * @return {Cursor}
 */
Partups.guardedMetaFind = function(selector, options) {
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
    var textSearch = parameters.textSearch || undefined;
    var locationId = parameters.locationId || undefined;
    var networkId = parameters.networkId || undefined;

    if (sort) {

        // Sort the partups from the newest to the oldest
        if (sort === 'new') {
            options.sort['created_at'] = -1;
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

    // Filter the partups that match the text search
    if (textSearch) {
        Log.debug('Searching for [' + textSearch + ']');

        var textSearchSelector = {$text: {$search: textSearch}};
        var tagSelector = {tags: {$in: [textSearch]}};

        options.fields = {score: {$meta: 'textScore'}};
        options.sort['score'] = {$meta: 'textScore'};

        selector.$or = [textSearchSelector, tagSelector];
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
 * Find the partups in a network
 *
 * @memberof Partups
 * @param {Network} network
 * @param {Object} selector
 * @param {Object} options
 * @param {String} loggedInUserId
 * @return {Cursor}
 */
Partups.findForNetwork = function(network, selector, options, loggedInUserId) {
    selector = selector || {};
    options = options || {};

    selector.network_id = network._id;

    return this.guardedFind(loggedInUserId, selector, options);
};

/**
 * Find the partups that a user is upper of
 *
 * @memberof Partups
 * @param {Object} user
 * @param {Object} parameters
 * @param {Number} parameters.limit
 * @param {String} parameters.sort
 * @param {Boolean} parameters.count
 * @param {String} loggedInUserId Server side only
 * @return {Cursor}
 */
Partups.findUpperPartupsForUser = function(user, parameters, loggedInUserId) {
    parameters = parameters || {};

    var upperOf = user.upperOf || [];

    var selector = {_id: {$in: upperOf}};
    var options = {};

    if (parameters.count) {
        options.count = true;
    } else {
        options.limit = parseInt(parameters.limit);
        options.sort = parameters.sort || {updated_at: -1};
    }

    if (parameters.network_id) {
        selector.network_id = parameters.network_id;
    }

    return this.guardedFind(loggedInUserId, selector, options);
};

/**
 * Find the partups that a user supporter of
 *
 * @memberof Partups
 * @param {Object} user
 * @param {Object} parameters
 * @param {Number} parameters.limit
 * @param {String} parameters.sort
 * @param {Boolean} parameters.count
 * @param {String} loggedInUserId Server side only
 * @return {Cursor}
 */
Partups.findSupporterPartupsForUser = function(user, parameters, loggedInUserId) {
    user = user || {};
    parameters = parameters || {};

    var supporterOf = user.supporterOf || [];

    var selector = {_id: {$in: supporterOf}};
    var options = {};

    if (parameters.count) {
        options.count = true;
    } else {
        options.limit = parseInt(parameters.limit);
        options.sort = parameters.sort || {updated_at: -1};
    }

    if (parameters.network_id) {
        selector.network_id = parameters.network_id;
    }

    return this.guardedFind(loggedInUserId, selector, options);
};
