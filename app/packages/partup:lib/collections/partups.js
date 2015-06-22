/**
 * Declare privacy types
 */
var PUBLIC = 1;
var PRIVATE = 2;
var NETWORK_PUBLIC = 3;
var NETWORK_INVITE = 4;
var NETWORK_CLOSED = 5;

/**
 * Partup model
 */
var Partup = function(document) {
    _.extend(this, document);
};

Partup.prototype.isEditableBy = function(user) {
    var uppers = this.uppers || [];

    return user && uppers.indexOf(user._id) > -1;
};

Partup.prototype.isRemovableBy = function(user) {
    return user && this.creator_id === user._id;
};

/**
 * Check if given user is a supporter of this partup
 *
 * @param {String} userId
 * @return {Boolean}
 */
Partup.prototype.hasSupporter = function(userId) {
    return mout.lang.isString(userId) && this.supporters.indexOf(userId) > -1;
};

/**
 * Check if given user is an upper in this partup
 *
 * @param {String} userId
 * @return {Boolean}
 */
Partup.prototype.hasUpper = function(userId) {
    return mout.lang.isString(userId) && this.uppers.indexOf(userId) > -1;
};

/**
 @namespace Partups
 @name Partups
 */
Partups = new Mongo.Collection('partups', {
    transform: function(document) {
        return new Partup(document);
    }
});

/**
 * Expose privacy types
 */
Partups.PUBLIC = PUBLIC;
Partups.PRIVATE = PRIVATE;
Partups.NETWORK_PUBLIC = NETWORK_PUBLIC;
Partups.NETWORK_INVITE = NETWORK_INVITE;
Partups.NETWORK_CLOSED = NETWORK_CLOSED;

/**
 * Partups collection helpers
 */
Partups.guardedFind = function(userId, selector, options) {
    var selector = selector || {};
    var options = options || {};

    // Guard that sh!t
    var guardingSelector = {'$or': [
        // Either the partup is public or belongs to a public network
        {'privacy_type': {'$in': [Partups.PUBLIC, Partups.NETWORK_PUBLIC]}},

        // Or the user is part of the partup uppers, which means he has access anyway
        {'uppers': {'$in': [userId]}},

        // Of course the creator of a partup always has the needed rights
        {'creator_id': userId}
    ]};

    // Merge the selectors, so we still use the initial selector provided by the caller
    var finalSelector = {'$and': [guardingSelector, selector]};

    return this.find(finalSelector, options);
};
