/**
 @namespace Notifications
 @name Notifications
 */
Notifications = new Mongo.Collection('notifications');

/**
 * Find the notifications for a user
 * @param {User} user
 * @return {Mongo.Cursor}
 */
Notifications.findForUser = function(user, options) {
    var options = options || {};
    options.limit = options.limit || 20;
    return Notifications.find({for_upper_id: user._id}, options);
};
