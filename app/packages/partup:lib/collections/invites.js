/**
 * Invites can contain:
 * - Invitations to a Part-up activity
 * - Invitations to a network
 * @namespace Invites
 * @memberof Collection
 */
Invites = new Mongo.Collection('invites');

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
