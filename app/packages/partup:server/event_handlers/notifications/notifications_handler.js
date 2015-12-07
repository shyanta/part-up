/**
 * Check if notifications need to be grouped after inserted
 */
Event.on('partups.notifications.inserted', function(upperId, notification) {
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

    // Check if notification belongs to a group
    var notificationGroupType = null;
    var group = [];
    if (updateGroup.indexOf(notification.type) > -1) {
        notificationGroupType = 'partups_multiple_updates_since_visit';
        group = updateGroup;
    } else if (conversationGroup.indexOf(notification.type) > -1) {
        notificationGroupType = 'multiple_comments_in_conversation_since_visit';
        group = conversationGroup;
    }

    if (notificationGroupType) {
        // Set latest upper data
        var latestUpper = {};
        if (notification.type_data.supporter) latestUpper = notification.type_data.supporter;
        if (notification.type_data.creator) latestUpper = notification.type_data.creator;
        if (notification.type_data.commenter) latestUpper = notification.type_data.commenter;

        // Get unread notifications
        var query = {
            for_upper_id: notification.for_upper_id,
            type: {$in: group},
            new: true
        };
        if (group === conversationGroup) query['type_data.update._id'] = notification.type_data.update._id;
        if (group === updateGroup) query['type_data.partup._id'] = notification.type_data.partup._id;
        var unreadNotifications = Notifications.find(query, {fields: {_id: 1, type_data: 1}}).fetch();
        var notificationIds = [];
        var upperIds = [];
        unreadNotifications.forEach(function(notification) {
            if (notification.type_data.supporter) upperIds.push(notification.type_data.supporter._id);
            if (notification.type_data.creator) upperIds.push(notification.type_data.creator._id);
            if (notification.type_data.commenter) upperIds.push(notification.type_data.commenter._id);
            notificationIds.push(notification._id);
        });
        // Now check if there is already a grouped notification for this user
        query = {
            for_upper_id: notification.for_upper_id,
            type: notificationGroupType,
            new: true
        };
        if (group === conversationGroup) query['type_data.update._id'] = notification.type_data.update._id;
        if (group === updateGroup) query['type_data.partup._id'] = notification.type_data.partup._id;
        var groupNotification = Notifications.findOne(query);
        if (groupNotification) {
            // There is, so we only need to update that notification, and set grouped property to created notification
            Notifications.update(notification._id, {$set: {grouped: true}});
            Notifications.update(groupNotification._id, {
                $set: {
                    'type_data.latest_upper': latestUpper,
                    'type_data.others_count': lodash.unique(upperIds).length - 1 // Don't include latest upper
                }
            });
        } else {
            // There is no group notification, so check if we need to create one
            if (unreadNotifications.length < 3) return;

            // We need to create a group notification at this point, so flag the single notifications
            Notifications.update({_id: {$in: notificationIds}}, {$set: {grouped: true}}, {multi: true});

            // Set the data
            var newNotification = {
                for_upper_id: notification.for_upper_id,
                type: notificationGroupType,
                type_data: notification.type_data,
                created_at: new Date(),
                new: true,
                clicked: false
            };
            newNotification.type_data.latest_upper = latestUpper;
            newNotification.type_data.others_count = lodash.unique(upperIds).length - 1; // Don't include latest upper

            Notifications.insert(newNotification);
        }
    }
});
