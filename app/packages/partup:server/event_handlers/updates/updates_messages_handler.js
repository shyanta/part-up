var d = Debug('event_handlers:updates_messages_handler');

/**
 * Notify mentioned uppers
 */
Event.on('partups.messages.insert', function(upper, partup, update, message) {
    // Parse message for user mentions
    var mentions = Partup.helpers.mentions.extract(message);
    mentions.forEach(function(user) {

        // Retrieve the user from the database (ensures that the user does indeed exists!)
        user = Meteor.users.findOne(user._id);

        if (partup.isViewableByUser(user._id)) {
            // Set the notification details
            var notificationOptions = {
                userId: user._id,
                type: 'partups_user_mentioned',
                typeData: {
                    mentioning_upper: {
                        _id: upper._id,
                        name: upper.profile.name,
                        image: upper.profile.image
                    },
                    update: {
                        _id: update._id
                    },
                    partup: {
                        _id: partup._id,
                        name: partup.name,
                        slug: partup.slug
                    }
                }
            };

            // Send the notification
            Partup.server.services.notifications.send(notificationOptions);

            // Set the email details
            var emailOptions = {
                type: 'upper_mentioned_in_partup',
                toAddress: User(user).getEmail(),
                subject: 'Iemand heeft je naam genoemd in part-up ' + partup.name,
                locale: User(user).getLocale(),
                typeData: {
                    name: User(user).getFirstname(),
                    mentioningUpper: upper.profile.name,
                    partupName: partup.name,
                    url: Meteor.absoluteUrl() + 'partups/' + partup.slug + '/updates/' + update._id,
                    unsubscribeOneUrl: Meteor.absoluteUrl() + 'unsubscribe-email-one/upper_mentioned_in_partup/' + user.profile.settings.unsubscribe_email_token,
                    unsubscribeAllUrl: Meteor.absoluteUrl() + 'unsubscribe-email-all/' + user.profile.settings.unsubscribe_email_token
                },
                userEmailPreferences: user.profile.settings.email
            };

            // Send the email
            Partup.server.services.emails.send(emailOptions);
        }
    });
});
