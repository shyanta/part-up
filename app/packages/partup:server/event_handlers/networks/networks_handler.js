/**
 * Send an email and generate a notification to the invited user when invited
 */
Event.on('networks.invited', function(user, networkId, upperId) {
    var network = Networks.findOneOrFail(networkId);

    // Compile the E-mail template and send the email
    SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUserToNetwork.html'));
    var url = Meteor.absoluteUrl() + 'networks/' + network._id;
    var upper = Meteor.users.findSinglePrivateProfile(upperId).fetch()[0];
    var upperEmail = upper.emails[0].address;

    if (upperEmail) {
        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: upperEmail,
            subject: 'Uitnodiging voor Part-up netwerk ' + network.name,
            html: SSR.render('inviteUserEmail', {
                name: upper.profile.name,
                networkName: network.name,
                networkDescription: network.description,
                inviterName: user.name,
                url: url
            })
        });
    }

    var notificationOptions = {
        type: 'partups_networks_invited',
        typeData: {
            network: {
                name: network.name,
                image: network.image
            }
        }
    };

    notificationOptions.userId = upperId;

    Partup.server.services.notifications.send(notificationOptions, function(error) {
        if (error) return Log.error(error);

        Log.debug('Notification generated for User [' + upperId + '] with type [' + notificationOptions.type + '].');
    });
});

/**
 * Generate a notification for an upper when getting accepted for a network
 */
Event.on('networks.accepted', function(userId, networkId, upperId) {
    var network = Networks.findOneOrFail(networkId);

    var notificationOptions = {
        type: 'partups_networks_accepted',
        typeData: {
            network: {
                name: network.name,
                image: network.image
            }
        }
    };

    notificationOptions.userId = upperId;

    Partup.server.services.notifications.send(notificationOptions, function(error) {
        if (error) return Log.error(error);

        Log.debug('Notification generated for User [' + upperId + '] with type [' + notificationOptions.type + '].');
    });
});
