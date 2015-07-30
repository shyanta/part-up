/**
 @namespace Notifications
 @name Notifications
 */
Notifications = new Mongo.Collection('notifications');

/**
 * Find the notifications for a user
 *
 * @param {User} user
 * @param {Object} selector
 * @param {Object} options
 * @return {Mongo.Cursor|Void}
 */
Notifications.findForUser = function(user, selector, options) {
    if (!user) return;

    var selector = selector || {};
    var options = options || {};

    selector.for_upper_id = user._id;

    return Notifications.find(selector, options);
};
