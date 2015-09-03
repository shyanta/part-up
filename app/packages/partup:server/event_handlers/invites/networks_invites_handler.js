/**
 * Generate a notification and email when an invite gets sent
 */
Event.on('invites.inserted.network', function(inviter, network, invitee) {
    // Set the notification details
    var notificationOptions = {
        userId: invitee._id,
        type: 'partups_networks_invited',
        typeData: {
            inviter: {
                _id: inviter._id,
                name: inviter.profile.name,
                image: inviter.profile.image
            },
            network: {
                _id: network._id,
                name: network.name,
                image: network.image,
                slug: network.slug
            }
        }
    };

    // Send notification
    Partup.server.services.notifications.send(notificationOptions);

    // Set the email details
    var emailOptions = {
        type: 'invite_upper_to_network',
        toAddress: User(invitee).getEmail(),
        subject: 'Uitnodiging voor het netwerk ' + network.name,
        locale: User(invitee).getLocale(),
        typeData: {
            name: User(invitee).getFirstname(),
            networkName: network.name,
            networkDescription: network.description,
            inviterName: inviter.profile.name,
            url: Meteor.absoluteUrl() + network.slug,
            unsubscribeOneUrl: Meteor.absoluteUrl() + 'unsubscribe-email-one/invite_upper_to_network/' + invitee.profile.settings.unsubscribe_email_token,
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
Event.on('invites.inserted.network.by_email', function(inviter, network, email, name, accessToken) {
    // Set the email details
    var emailOptions = {
        type: 'invite_upper_to_network',
        toAddress: email,
        subject: 'Uitnodiging voor het netwerk ' + network.name,
        locale: User(inviter).getLocale(),
        typeData: {
            name: name,
            networkName: network.name,
            networkDescription: network.description,
            inviterName: inviter.profile.name,
            url: Meteor.absoluteUrl() + network.slug + '?token=' + accessToken
        }
    };

    // Send the email
    Partup.server.services.emails.send(emailOptions);
});
