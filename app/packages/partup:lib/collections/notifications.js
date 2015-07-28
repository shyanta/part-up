/**
 @namespace Notifications
 @name Notifications
 */
Notifications = new Mongo.Collection('notifications');

/**
 * Find the notifications for a user
 *
 * @param {User} user
 * @param {Object} parameters
 * @param {Object} parameters.sort
 * @return {Mongo.Cursor}
 */
Notifications.findForUser = function(user, parameters) {
    var parameters = parameters || {};
    var options = {};

    if (parameters.sort) options.sort = parameters.sort;

    return Notifications.find({for_upper_id: user._id}, options);
};
