Meteor.publish('notifications.user', function bla() {
    return Notifications.find({ for_upper_id: this.userId });
});
