SyncedCron.add({
    name: 'Send daily notification email digest',
    schedule: function(parser) {
        return parser.text('at 09:00am every weekday');
        //return parser.text('every 30 seconds');
    },
    job: function() {
        Meteor.users.find({'flags.dailyDigestEmailHasBeenSent':{$exists: false}}).forEach(function(user) {
            console.log(user._id);
            var newNotifications = Notifications.findForUser(user, {'new':true}).fetch();
            console.log(newNotifications.length);
            if (newNotifications.length > 0) {

                // Compile the E-mail template and send the email
                SSR.compileTemplate('NotificationDigest', Assets.getText('private/emails/NotificationDigest.' + User(user).getLocale() + '.html'));
                var url = Meteor.absoluteUrl();

                Email.send({
                    from: 'Part-up <team@part-up.com>',
                    to: User(user).getEmail(),
                    subject: 'Notifications Part-up.com',
                    html: SSR.render('NotificationDigest', {
                        name: user.profile.name,
                        notificationCount: newNotifications.length,
                        url: url
                    })
                });
                Meteor.users.update(user._id, {'$set': {'flags.dailyDigestEmailHasBeenSent': true}});
            }
        });
    }
});
