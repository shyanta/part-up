/**
 * Declare privacy types
 */
var NETWORK_PUBLIC = 1;
var NETWORK_INVITE = 2;
var NETWORK_CLOSED = 3;

/**
 * Network model
 */
var Network = function(document) {
    _.extend(this, document);
};

/**
 * Check if given user is the admin of this network
 *
 * @param {String} userId
 * @return {Boolean}
 */
Network.prototype.isAdmin = function(userId) {
    return mout.lang.isString(userId) && userId === this.admin_id;
};

/**
 * Check if given user is a member of this network
 *
 * @param {String} userId
 * @return {Boolean}
 */
Network.prototype.hasMember = function(userId) {
    return mout.lang.isString(userId) && this.uppers.indexOf(userId) > -1;
};

/**
 * Check if given network has public access
 *
 * @return {Boolean}
 */
Network.prototype.isPublic = function() {
    return this.privacy_type === NETWORK_PUBLIC;
};

/**
 * Check if given network is private and for invites only
 *
 * @return {Boolean}
 */
Network.prototype.isInvitational = function() {
    return this.privacy_type === NETWORK_INVITE;
};

/**
 * Check if given network is private and closed
 *
 * @return {Boolean}
 */
Network.prototype.isClosed = function() {
    return this.privacy_type === NETWORK_CLOSED;
};

/**
 @namespace Networks
 @name Networks
 */
Networks = new Mongo.Collection('networks', {
    transform: function(document) {
        return new Network(document);
    }
});

/**
 * Expose privacy types
 */
Networks.NETWORK_PUBLIC = NETWORK_PUBLIC;
Networks.NETWORK_INVITE = NETWORK_INVITE;
Networks.NETWORK_CLOSED = NETWORK_CLOSED;

/**
 * Networks collection helpers
 */
Networks.guardedFind = function(userId, selector, options) {
    var selector = selector || {};
    var options = options || {};

    // Guard that sh!t
    var guardingSelector = {'$or': [
        // The network is open, which means everyone can access it
        {'privacy_type': {'$in': [Networks.NETWORK_PUBLIC]}},

        // Or the user is part of the network uppers, which means he has access anyway
        {'uppers': {'$in': [userId]}},

        // Of course the admin of a network always has the needed rights
        {'admin_id': userId}
    ]};

    // Merge the selectors, so we still use the initial selector provided by the caller
    var finalSelector = {'$and': [guardingSelector, selector]};

    return this.find(finalSelector, options);
};
