/**
 * Declare access levels
 */
var PUBLIC_OPEN = 1;
var PRIVATE_INVITE = 2;
var PRIVATE_CLOSED = 3;

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
    return mout.lang.isString(userId) && userId === network.admin_id;
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
    return this.access_level === PUBLIC_OPEN;
};

/**
 * Check if given network is private and for invites only
 *
 * @return {Boolean}
 */
Network.prototype.isInvitational = function() {
    return this.access_level === PRIVATE_INVITE;
};

/**
 * Check if given network is private and closed
 *
 * @return {Boolean}
 */
Network.prototype.isClosed = function() {
    return this.access_level === PRIVATE_CLOSED;
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
