Meteor.publishComposite('notifications.for_upper', function(upperId) {
    check(upperId, String);

    this.unblock();

    var user = Meteor.users.findOne(upperId);
    if (!user) return;

    return {
        find: function() {
            return Notifications.findForUser(user);
        },
        children: [
            {find: Images.findForNotification}
        ]
    };
});
