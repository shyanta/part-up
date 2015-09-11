/**
 * Generate a notification and email when an invite gets sent
 */
Event.on('invites.inserted.activity', function(inviter, partup, activity, invitee) {
    // Set the notification details
    var notificationOptions = {
        userId: invitee._id,
        type: 'partup_activities_invited',
        typeData: {
            inviter: {
                _id: inviter._id,
                name: inviter.profile.name,
                image: inviter.profile.image
            },
            activity: {
                _id: activity._id,
                name: activity.name
            },
            partup: {
                _id: partup._id,
                name: partup.name,
                slug: partup.slug
            },
            update: {
                _id: activity.update_id
            }
        }
    };

    // Send notification
    Partup.server.services.notifications.send(notificationOptions);

    // Set the email details
    var emailOptions = {
        type: 'invite_upper_to_partup_activity',
        toAddress: User(invitee).getEmail(),
        subject: 'Uitnodiging voor de activiteit ' + activity.name + ' in Part-up ' + partup.name,
        locale: User(invitee).getLocale(),
        typeData: {
            name: User(invitee).getFirstname(),
            partupName: partup.name,
            partupDescription: partup.description,
            activityName: activity.name,
            activityDescription: activity.description,
            inviterName: inviter.profile.name,
            url: Meteor.absoluteUrl() + 'partups/' + partup.slug,
            unsubscribeOneUrl: Meteor.absoluteUrl() + 'unsubscribe-email-one/invite_upper_to_partup_activity/' + invitee.profile.settings.unsubscribe_email_token,
            unsubscribeAllUrl: Meteor.absoluteUrl() + 'unsubscribe-email-all/' + invitee.profile.settings.unsubscribe_email_token
        },
        userEmailPreferences: invitee.profile.settings.email
    };

    // Send the email
    Partup.server.services.emails.send(emailOptions);
});

/**
 * Generate an email when an invite gets sent
 */
Event.on('invites.inserted.activity.by_email', function(inviter, partup, activity, email, name, message, accessToken) {

    // Split by double newline
    var toParagraphs = function(message) {
        return message.split('\n\n');
    };

    // Interpolate email message (replace [name] with invitee name and [url] with activity url)
    var interpolate = function(message) {
        var url = Meteor.absoluteUrl() + 'partups/' + partup.slug + '?token=' + accessToken;

        return Partup.helpers.interpolateEmailMessage(message, {
            url: '<a href="' + url + '">' + url + '</a>',
            name: name
        });
    };

    // Set the email details
    var emailOptions = {
        type: 'invite_upper_to_partup_activity',
        toAddress: email,
        subject: 'Uitnodiging voor de activiteit ' + activity.name + ' in Part-up ' + partup.name,
        locale: User(inviter).getLocale(),
        typeData: {
            paragraphs: toParagraphs(interpolate(message)),
            partupName: partup.name,
            partupDescription: partup.description,
            activityName: activity.name,
            activityDescription: activity.description,
            inviterName: inviter.profile.name
        }
    };

    // Send the email
    Partup.server.services.emails.send(emailOptions);

    // Save the access token to the partup to allow access
    Partups.update(partup._id, {$addToSet: {access_tokens: accessToken}});
});
