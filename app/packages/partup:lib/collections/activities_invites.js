/**
 Activities invites are invitations to a Part-up activity
 @namespace ActivitiesInvites
 @memberof Collection
 */
ActivitiesInvites = new Mongo.Collection('activities_invites');

/**
 * @memberof Partups
 * @public
 */
ActivitiesInvites.INVITE_TYPE_EMAIL = 'email';

/**
 * @memberof ActivitiesInvites
 * @public
 */
ActivitiesInvites.INVITE_TYPE_EXISTING_UPPER = 'existing_upper';
