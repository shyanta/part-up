SyncedCron.add({
    name: 'Send daily notification email digest',
    schedule: function(parser) {
        return parser.text(Partup.constants.DIGEST_FREQUENCY);
    },
    job: function() {
        var counter = 0;
        Meteor.users.find({
            'flags.dailyDigestEmailHasBeenSent': false,
            'profile.settings.email.dailydigest': true
        }).forEach(function(user) {
            var newNotifications = Notifications.findForUser(user, {'new':true}).fetch();
            if (newNotifications.length > 0) {

                // Compile the E-mail template and send the email
                SSR.compileTemplate('dailydigest', Assets.getText('private/emails/dailydigest.' + User(user).getLocale() + '.html'));
                var url = Meteor.absoluteUrl();

                Email.send({
                    from: Partup.constants.EMAIL_FROM,
                    to: User(user).getEmail(),
                    subject: 'Notifications Part-up.com',
                    html: SSR.render('dailydigest', {
                        name: user.profile.name,
                        notificationCount: newNotifications.length,
                        url: url
                    })
                });
                Meteor.users.update(user._id, {'$set': {'flags.dailyDigestEmailHasBeenSent': true}});
                counter++;
            }
        });
        console.log(counter + ' users were mailed with notification digest');
    }
});
