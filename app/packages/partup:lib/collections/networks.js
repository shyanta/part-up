/**
 * @memberof Networks
 * @private
 */
var NETWORK_PUBLIC = 1;
/**
 * @memberof Networks
 * @private
 */
var NETWORK_INVITE = 2;
/**
 * @memberof Networks
 * @private
 */
var NETWORK_CLOSED = 3;

/**
 * Network model
 * @memberof Networks
 */
var Network = function(document) {
    _.extend(this, document);
};

/**
 * Check if given user is the admin of this network
 *
 * @memberof Networks
 * @param {String} userId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.isAdmin = function(userId) {
    return mout.lang.isString(userId) && userId === this.admin_id;
};

/**
 * Check if given user is a member of this network
 *
 * @memberof Networks
 * @param {String} userId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.hasMember = function(userId) {
    var uppers = this.uppers || [];
    return mout.lang.isString(userId) && uppers.indexOf(userId) > -1;
};

/**
 * Check if given network has public access
 *
 * @memberof Networks
 * @return {Boolean}
 */
Network.prototype.isPublic = function() {
    return this.privacy_type === NETWORK_PUBLIC;
};

/**
 * Check if given network is private and for invites only
 *
 * @memberof Networks
 * @return {Boolean}
 */
Network.prototype.isInvitational = function() {
    return this.privacy_type === NETWORK_INVITE;
};

/**
 * Check if given network is private and closed
 *
 * @memberof Networks
 * @return {Boolean}
 */
Network.prototype.isClosed = function() {
    return this.privacy_type === NETWORK_CLOSED;
};

/**
 * Check if given network is closed for specific user
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */

Network.prototype.isClosedForUpper = function(upperId) {
    // if not closed return false
    if (!this.isClosed()) return false;

    // if closed and has upper return false
    if (this.hasMember(upperId)) return false;

    // if closed and does not have upper return true
    return true;
};

/**
 * Check if upper is already invited to the network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
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
 * Check if upper can invite other uppers
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.canUpperInvite = function(upperId) {
    return this.hasMember(upperId);
};

/**
 * Check if upper can join network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.canUpperJoin = function(upperId) {
    if (this.isPublic()) return true;
    if (this.isUpperInvited(upperId)) return true;
    return false;
};

/**
 * Check if upper can leave network (admins can't)
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.canUpperLeave = function(upperId) {
    return !this.isAdmin(upperId);
};

/**
 * Add invited Upper to Network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be added
 * @param {String} invite ?
 */
Network.prototype.addInvitedUpper = function(upperId, invite) {
    Networks.update(this._id, {$pull: {invites: invite}, $push: {uppers: upperId}});
    Meteor.users.update(upperId, {$push: {networks: this._id}});
};

/**
 * Add Upper to Network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be added
 */
Network.prototype.addUpper = function(upperId) {
    Networks.update(this._id, {$push: {uppers: upperId}});
    Meteor.users.update(upperId, {$push: {networks: this._id}});
};

/**
 * Add upper to pending list
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be added
 */
Network.prototype.addPendingUpper = function(upperId) {
    // User already added as pending upper
    if (this.pending_uppers && this.pending_uppers.indexOf(upperId) > -1) {
        return false;
    }

    Networks.update(this._id, {$push: {pending_uppers: upperId}});
    Meteor.users.update(upperId, {$push: {pending_networks: this._id}});
};

/**
 * Create an invite
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user that should be invited
 * @param {String} inviterId the user id of the user that has created the invitation
 */
Network.prototype.createInvite = function(upperId, inviterId) {
    var invite = {
        _id: upperId,
        invited_at: new Date(),
        invited_by_id: inviterId
    };

    Networks.update(this._id, {$push: {invites: invite}});
};

/**
 * Accept a pending upper to the network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user that should be accepted
 */
Network.prototype.acceptPendingUpper = function(upperId) {
    Networks.update(this._id, {$pull: {pending_uppers: upperId}, $push: {uppers: upperId}});
    Meteor.users.update(upperId, {$pull: {pending_networks: this._id}, $push: {networks: this._id}});
};

/**
 * Reject a pending upper
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user that should be rejected
 */
Network.prototype.rejectPendingUpper = function(upperId) {
    Networks.update(this._id, {$pull: {pending_uppers: upperId}});
    Meteor.users.update(upperId, {$pull: {pending_networks: this._id}});
};

/**
 * Leave network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user that is leaving the network
 */
Network.prototype.leave = function(upperId) {
    Networks.update(this._id, {$pull: {uppers: upperId}});
    Meteor.users.update(upperId, {$pull: {networks: this._id}});
};

/**
 Networks, also known as "Tribes" are entities that group users and partups
 @namespace Networks
 */
Networks = new Mongo.Collection('networks', {
    transform: function(document) {
        return new Network(document);
    }
});

/**
 * @memberof Networks
 * @public
 */
Networks.NETWORK_PUBLIC = NETWORK_PUBLIC;
/**
 * @memberof Networks
 * @public
 */
Networks.NETWORK_INVITE = NETWORK_INVITE;
/**
 * @memberof Networks
 * @public
 */
Networks.NETWORK_CLOSED = NETWORK_CLOSED;

/**
 * Modified version of Collection.find that makes
 * sure the user (or guest) can only retrieve
 * fields that are publicly available
 *
 * @memberof Networks
 * @param {String} userId
 * @param {Object} selector
 * @param {Object} options
 * @return {Cursor}
 */
Networks.guardedMetaFind = function(userId, selector, options) {
    var selector = selector || {};
    var options = options || {};

    // Make sure that if the callee doesn't pass the fields
    // key used in the options parameter, we set it with
    // the _id fields, so we do not publish all fields
    // by default, which would be a security issue
    options.fields = {_id: 1};

    // The fields that should be available on each network
    var unguardedFields = ['name', 'description', 'website', 'slug', 'icon', 'image', 'privacy_type'];

    unguardedFields.forEach(function(unguardedField) {
        options.fields[unguardedField] = 1;
    });

    return this.find(selector, options);
};

/**
 * Networks collection helpers
 *
 * @memberof Networks
 * @param {String} userId the user id of the current user
 * @param {Object} selector the requested selector
 * @param {Object} options options object to be passed to mongo find (limit etc.)
 * @return {Mongo.Cursor}
 */
Networks.guardedFind = function(userId, selector, options) {
    var selector = selector || {};
    var options = options || {};

    var guardedCriterias = [
        // The network is open, which means everyone can access it
        {'privacy_type': {'$in': [Networks.NETWORK_PUBLIC]}},
    ];

    // Some extra rules that are only applicable to users that are logged in
    if (userId) {
        // The user is part of the network uppers, which means he has access anyway
        guardedCriterias.push({'uppers': {'$in': [userId]}});

        // Of course the admin of a network always has the needed rights
        guardedCriterias.push({'admin_id': userId});
    }

    // Guarding selector that needs to be fulfilled
    var guardingSelector = {'$or': guardedCriterias};

    // Merge the selectors, so we still use the initial selector provided by the caller
    var finalSelector = {'$and': [guardingSelector, selector]};

    return this.find(finalSelector, options);
};
