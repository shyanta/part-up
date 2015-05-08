/**
 @namespace Partup notifications service
 @name Partup.services.notifications
 @memberOf partup.services
 */
Partup.services.notifications = {

    /**
     * Make a new notification
     *
     * @param  {int} options.userId
     * @param  {string} options.type
     * @param  {mixed} options.typeData
     * @param  {function} callback
     *
     * @return {Update}
     */
    send: function(options, callback) {
        var options = options || {};
        var notification = { };

        if (! options.userId) return callback(new Error('Required argument [options.userId] is missing for method [Partup.services.notifications::send]'));
        if (! options.type) return callback(new Error('Required argument [options.type] is missing for method [Partup.services.notifications::send]'));
        if (! options.typeData) return callback(new Error('Required argument [options.typeData] is missing for method [Partup.services.notifications::send]'));

        notification.for_upper_id = options.userId;
        notification.type = options.type;
        notification.type_data = options.typeData;
        notification.created_at = new Date();
        notification.new = true;

        Notifications.insert(notification, callback);
    }

};
