var d = Debug('services:notifications');

// Check notifications.md for all active notifications

/**
 @namespace Partup server notifications service
 @name Partup.server.services.notifications
 @memberof Partup.server.services
 */
Partup.server.services.notifications = {
    /**
     * Make a new notification
     *
     * @param  {object} options
     *
     * @return {Update}
     */
    send: function(options) {
        options = options || {};
        var notification = {};

        if (!options.userId) throw new Meteor.Error('Required argument [options.userId] is missing for method [Partup.server.services.notifications::send]');
        if (!options.type) throw new Meteor.Error('Required argument [options.type] is missing for method [Partup.server.services.notifications::send]');
        if (!options.typeData) throw new Meteor.Error('Required argument [options.typeData] is missing for method [Partup.server.services.notifications::send]');

        // Define the notification groups
        var updateGroup = [
            'partups_activities_inserted',
            'partups_messages_inserted',
            'partups_supporters_added',
            'partups_contributions_inserted',
            'partups_supporters_added'
        ];
        var conversationGroup = [
            'partups_new_comment_in_involved_conversation'
        ];

        // Check if current notification belongs to a group
        var notificationGroupType = null;
        if (!updateGroup.indexOf(options.type) < 0) notificationGroupType = 'partups_multiple_updates_since_visit';
        if (!conversationGroup.indexOf(options.type) < 0) notificationGroupType = 'multiple_comments_in_conversation_since_visit';
        if (notificationGroupType) {
            // @todo check if there is already a group notification

            var unreadNotifications = Notifications.find({
                for_upper_id: options.userId,
                type: {$in: notificationGroup},
                new: true
            }, {_id: 1});
            console.log(unreadNotifications);
            if (unreadNotifications.length > 2) {
                options = Partup.server.services.notifications.group(notificationGroup, unreadNotifications, options);
            }
        }

        notification.for_upper_id = options.userId;
        notification.type = options.type;
        notification.type_data = options.typeData;
        notification.created_at = new Date();
        notification.new = true;
        notification.clicked = false;

        d('Notification created for user [' + notification.for_upper_id + '] with type [' + notification.type + ']');

        Notifications.insert(notification);
    },

    /**
     * Group notifications of the same type
     *
     * @param  {String} notificationGroup
     * @param  {[Object]} unreadNotifications
     * @param  {Object} options
     *
     * @return {Object} newOptions
     */
    group: function(notificationGroup, unreadNotifications, options) {
        if (notificationGroup !== 'update_group' && notificationGroup !== 'conversation_group') return options;

        // Remove all unread notifications
        //

        // Set new notification type
        if (notificationGroup === 'update_group') {
            options.type = 'partups_multiple_updates_since_visit';
        } else if (notificationGroup === 'conversation_group') {
            options.type = 'multiple_comments_in_conversation_since_visit';
        }
    }
};
