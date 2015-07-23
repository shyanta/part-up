/**
 * Invites can contain:
 * - Invitations to a Part-up activity
 * - Invitations to a network
 * @namespace Invites
 * @memberof Collection
 */
Invites = new Mongo.Collection('invites');

/**
 * Find invites for a user
 *
 * @memberOf Invites
 * @param {User} user
 * @return {Mongo.Cursor}
 */
Invites.findForUser = function(user) {
    return Invites.find({invitee_id: user._id});
};

/**
 * Find invites for a network
 *
 * @memberOf Invites
 * @param {Network} network
 * @return {Mongo.Cursor}
 */
Invites.findForNetwork = function(network) {
    return Invites.find({network_id: network._id});
};

/**
 * @memberof Invites
 * @public
 */
Invites.INVITE_TYPE_ACTIVITY_EMAIL = 'activity_email';

/**
 * @memberof Invites
 * @public
 */
Invites.INVITE_TYPE_NETWORK_EMAIL = 'network_email';

/**
 * @memberof Invites
 * @public
 */
Invites.INVITE_TYPE_ACTIVITY_EXISTING_UPPER = 'activity_existing_upper';

/**
 * @memberof Invites
 * @public
 */
Invites.INVITE_TYPE_NETWORK_EXISTING_UPPER = 'network_existing_upper';
