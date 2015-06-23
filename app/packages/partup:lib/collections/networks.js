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
 * Check if upper is already invited to the network
 *
 * @return {Object}
 */
Network.prototype.isUpperInvited = function(upperId) {
    var invites = this.invites || [];
    var invite = false;

    _.each(invites, function(inviteObject, key) {
        if (mout.object.get(inviteObject, '_id') === upperId) {
            invite = inviteObject;
        }
    });

    return invite;
};

/**
 * Add invited Upper to Network
 *
 * @return {Boolean}
 */
Network.prototype.addInvitedUpper = function(upperId, invite) {
    Networks.update(this._id, {$pull: {invites: invite}, $push: {uppers: upperId}});
    Meteor.users.update(upperId, {$push: {networks: this._id}});
};

/**
 * Add Upper to Network
 *
 * @return {Boolean}
 */
Network.prototype.addUpper = function(upperId) {
    Networks.update(this._id, {$push: {uppers: upperId}});
    Meteor.users.update(upperId, {$push: {networks: this._id}});
};

/**
 * Add upper to pending list
 *
 * @return {Boolean}
 */
Network.prototype.addPendingUpper = function(upperId) {
    // User already added as pending upper
    if (this.pending_uppers && this.pending_uppers.indexOf(upperId) > -1) {
        return false;
    }

    Networks.update(this._id, {$push: {pending_uppers: upperId}});
};

/**
 * Accept a pending upper to the network
 *
 * @return {Boolean}
 */
Network.prototype.acceptPendingUpper = function(upperId) {
    Networks.update(this._id, {$pull: {pending_uppers: upperId}, $push: {uppers: upperId}});
    Meteor.users.update(upperId, {$push: {networks: this._id}});
};

/**
 * Leave network
 *
 * @return {Boolean}
 */
Network.prototype.leave = function(upperId) {
    Networks.update(this._id, {$pull: {uppers: upperId}});
    Meteor.users.update(upperId, {$pull: {networks: this._id}});
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
