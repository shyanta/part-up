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
    var user = Meteor.users.findOne({_id: userId});
    if (!user) return false;
    return mout.lang.isString(userId) && (userId === this.admin_id || User(user).isAdmin());
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
    if (this.isPublic()) return false;
    if (this.isInvitational() && (this.hasMember(upperId) || this.isUpperInvited(upperId))) return false;
    if (this.isClosed() && this.hasMember(upperId)) return false;

    return true;
};

/**
 * Check if upper is already invited to the network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.isUpperInvited = function(upperId) {
    return !!Invites.findOne({network_id: this._id, invitee_id: upperId, type: Invites.INVITE_TYPE_NETWORK_EXISTING_UPPER});
};

/**
 * Check if the upper-invite is pending (to be accepted by admin)
 *
 * @memberof Networks
 * @param {String} userId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.isUpperInvitePending = function(userId) {
    if (!this.pending_uppers) return false;
    return mout.lang.isString(userId) && this.pending_uppers.indexOf(userId) > -1;
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
 */
Network.prototype.addInvitedUpper = function(upperId) {
    Networks.update(this._id, {$addToSet: {uppers: upperId}});
    Meteor.users.update(upperId, {$addToSet: {networks: this._id}});
};

/**
 * Add Upper to Network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be added
 */
Network.prototype.addUpper = function(upperId) {
    Networks.update(this._id, {$addToSet: {uppers: upperId}});
    Meteor.users.update(upperId, {$addToSet: {networks: this._id}});
};

/**
 * Add upper to pending list
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be added
 */
Network.prototype.addPendingUpper = function(upperId) {
    // Check if user is already added as a pending upper
    if (this.isUpperPending(upperId)) {
        return false;
    }

    Networks.update(this._id, {$addToSet: {pending_uppers: upperId}});
    Meteor.users.update(upperId, {$addToSet: {pending_networks: this._id}});
};

/**
 * Check if upper is already added to the pending list
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.isUpperPending = function(upperId) {
    return !!Networks.findOne({_id: this._id, pending_uppers: {'$in': [upperId]}});
};

/**
 * Check if upper is invited by an admin
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */
Network.prototype.isUpperInvitedByAdmin = function(upperId) {
    var invitedByAdmin = false;
    var invites = Invites.find({network_id: this._id, invitee_id: upperId});
    var self = this;

    // A user can be invited multiple times, so check all of them
    invites.forEach(function(invite) {
        // Set variable to true when matching the criteria
        if (self.isAdmin(invite.inviter_id)) invitedByAdmin = true;
    });

    return invitedByAdmin;
};

/**
 * Consume an access token to add the user as an invitee
 *
 * @memberOf Partups
 * @param {String} upperId
 * @param {String} accessToken
 */
Network.prototype.convertAccessTokenToInvite = function(upperId, accessToken) {
    Network.update(this._id, {$pull: {'access_tokens': accessToken}, $addToSet: {'invites': upperId}});
};

/**
 * Accept a pending upper to the network
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user that should be accepted
 */
Network.prototype.acceptPendingUpper = function(upperId) {
    Networks.update(this._id, {$pull: {pending_uppers: upperId}, $addToSet: {uppers: upperId}});
    Invites.remove({
        'network_id':this._id,
        'invitee_id': upperId
    });
    Meteor.users.update(upperId, {$pull: {pending_networks: this._id}, $addToSet: {networks: this._id}});
};

/**
 * Reject a pending upper
 *
 * @memberof Networks
 * @param {String} upperId the user id of the user that should be rejected
 */
Network.prototype.rejectPendingUpper = function(upperId) {
    Networks.update(this._id, {$pull: {pending_uppers: upperId}});
    Invites.remove({
        'network_id':this._id,
        'invitee_id': upperId
    });
    Meteor.users.update(upperId, {$pull: {pending_networks: this._id}});
};

/**
 * Remove all invites for a specific user for this network
 *
 * @memberof Invites
 * @param {String} upperId id of the user whose invites have to be removed
 */
Network.prototype.removeAllUpperInvites = function(upperId) {
    // Clear out the invites from Invites collection
    Invites.remove({network_id: this._id, invitee_id: upperId});

    // And don't forget the invites property of this network
    var invites = this.invites || [];
    var self = this;
    invites.forEach(function(invite) {
        if (invite._id === upperId) {
            Networks.update(self._id, {$pull: {invites: invite}});
        }
    });
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

// Add indices
if (Meteor.isServer) {
    Networks._ensureIndex('slug');
    Networks._ensureIndex('admin_id');
    Networks._ensureIndex('privacy_type');
}

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
 * @param {Object} selector
 * @param {Object} options
 * @return {Cursor}
 */
Networks.guardedMetaFind = function(selector, options) {
    var selector = selector || {};
    var options = options || {};

    // Make sure that if the callee doesn't pass the fields
    // key used in the options parameter, we set it with
    // the _id fields, so we do not publish all fields
    // by default, which would be a security issue
    options.fields = {_id: 1};

    // The fields that should be available on each network
    var unguardedFields = ['name', 'description', 'website', 'slug', 'icon', 'image', 'privacy_type', 'pending_uppers', 'invites', 'language', 'tags', 'location'];

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
    if (Meteor.isClient) return this.find(selector, options);

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

/**
 * Find the network for a partup
 *
 * @memberOf Networks
 * @param {Partup} partup
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Networks.findFeatured = function(language) {
    var selector = {'featured.active': true};
    if (language) {
        selector.language = language;
    }
    return Networks.find(selector);
};

/**
 * Find the network for a partup
 *
 * @memberOf Networks
 * @param {Partup} partup
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Networks.findForPartup = function(partup, userId) {
    return Networks.guardedFind(userId, {_id: partup.network_id}, {limit: 1});
};

/**
 * Find the networks for a user
 *
 * @memberOf Networks
 * @param {User} user
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Networks.findForUser = function(user, userId) {
    var networks = user.networks || [];
    return Networks.guardedFind(userId, {_id: {'$in': networks}});
};
