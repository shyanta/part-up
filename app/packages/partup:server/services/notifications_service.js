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
     */
    send: function(options) {
        options = options || {};
        var notification = {};

        if (!options.userId) throw new Meteor.Error('Required argument [options.userId] is missing for method [Partup.server.services.notifications::send]');
        if (!options.type) throw new Meteor.Error('Required argument [options.type] is missing for method [Partup.server.services.notifications::send]');
        if (!options.typeData) throw new Meteor.Error('Required argument [options.typeData] is missing for method [Partup.server.services.notifications::send]');

        options = Partup.server.services.notifications.group(options);
        if (!options) {
            // The grouped notification is updated, nothing more to do here
            return;
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
     * @param  {Object} options
     *
     * @return {Object} options
     */
    group: function(options) {
        // Define the notification groups
        var updateGroup = [
            'partups_activities_inserted',
            'partups_messages_inserted',
            'partups_contributions_inserted',
            'partups_supporters_added'
        ];
        var conversationGroup = [
            'partups_new_comment_in_involved_conversation'
        ];

        // Check if notification to be sent belongs to a group
        var notificationGroupType = null;
        var group = [];
        if (updateGroup.indexOf(options.type) > -1) {
            notificationGroupType = 'partups_multiple_updates_since_visit';
            group = updateGroup;
        } else if (conversationGroup.indexOf(options.type) > -1) {
            // Check if there is already an unread notification from the same user on this topic
            var isAlreadyNotified = Notifications.findOne({
                for_upper_id: options.userId,
                new: true,
                'type_data.update._id': options.typeData.update._id,
                'type_data.commenter._id': options.typeData.commenter._id
            });
            // Nothing else to do here
            if (isAlreadyNotified) return false;

            notificationGroupType = 'multiple_comments_in_conversation_since_visit';
            group = conversationGroup;
        }

        if (notificationGroupType) {
            // Set latest upper data
            var latestUpper = {};
            if (options.typeData.supporter) latestUpper = options.typeData.supporter;
            if (options.typeData.creator) latestUpper = options.typeData.creator;
            if (options.typeData.commenter) latestUpper = options.typeData.commenter;

            // Now check if there is already a grouped notification for this user
            var groupNotification = Notifications.findOne({
                for_upper_id: options.userId,
                type: notificationGroupType,
                new: true
            });

            var countOthers = function() {
                // Something
            };

            if (groupNotification) {
                // There is, so we only need to update that notification
                Notifications.update(groupNotification._id, {
                    $set: {
                        'type_data.latest_upper': latestUpper,
                        'type_data.others_count': countOthers()
                    }
                });

                // Our work here is done, return false to escape
                return false;
            } else {
                // There is no group notification, so check if we need to create one
                var query = {
                    for_upper_id: options.userId,
                    type: {$in: group},
                    new: true
                };
                if (group === conversationGroup) query['type_data.update._id'] = options.typeData.update._id;
                var unreadNotifications = Notifications.find(query, {fields: {_id: 1}}).fetch();
                if (unreadNotifications.length > 1) {
                    // We need to create a group notification at this point, so alter the provided options
                    options.type = notificationGroupType;
                    options.typeData.latest_upper = latestUpper;
                    options.typeData.others_count = countOthers();

                    // And delete the single notifications
                    var notificationIds = [];
                    unreadNotifications.forEach(function(notification) {
                        notificationIds.push(notification._id);
                    });
                    Notifications.remove({_id: {$in: notificationIds}});
                }

                return options;
            }
        }
    }
};
