Meteor.methods({

    /**
     * Mark a notification as read
     *
     * @param {String} notificationId
     */
    'notifications.read': function(notificationId) {
        this.unblock();

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'Unauthorized.');

        Notifications.update({'_id': notificationId, 'for_upper_id': user._id}, {'$set': {'new': false}});
    }
});
