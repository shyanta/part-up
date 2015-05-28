Meteor.publish('notifications.user', function () {
    return Notifications.find({ for_upper_id: this.userId }, { limit: 20 });
});
