/**
 * Generate a notification for an upper when getting accepted for a network
 */
Event.on('networks.accepted', function(userId, networkId, upperId) {
    var network = Networks.findOneOrFail(networkId);
    var user = Meteor.users.findOneOrFail(userId);
    var acceptedUpper = Meteor.users.findOneOrFail(upperId);
    var notificationType = 'partups_networks_accepted';

    // Send notifications to accepted upper
    var notificationOptions = {
        userId: acceptedUpper._id,
        type: notificationType,
        typeData: {
            network: {
                _id: network._id,
                name: network.name,
                image: network.image,
                slug: network.slug
            }
        }
    };

    Partup.server.services.notifications.send(notificationOptions);

    // Set the email details
    var emailOptions = {
        type: notificationType,
        toAddress: User(acceptedUpper).getEmail(),
        subject: 'You have been accepted to tribe  ' + network.name,
        locale: User(acceptedUpper).getLocale(),
        typeData: {
            name: User(acceptedUpper).getFirstname(),
            networkName: network.name,
            url: Meteor.absoluteUrl() + network.slug,
            unsubscribeOneUrl: Meteor.absoluteUrl() + 'unsubscribe-email-one/' + notificationType + '/' + acceptedUpper.profile.settings.unsubscribe_email_token,
            unsubscribeAllUrl: Meteor.absoluteUrl() + 'unsubscribe-email-all/' + acceptedUpper.profile.settings.unsubscribe_email_token
        },
        userEmailPreferences: acceptedUpper.profile.settings.email
    };

    // Send the email
    Partup.server.services.emails.send(emailOptions);
});

/**
 * Generate a notification for the network admin when a new upper is pending
 */
Event.on('networks.new_pending_upper', function(network, pendingUpper) {
    var notificationType = 'partups_networks_new_pending_upper';
    var admin = Meteor.users.findOneOrFail(network.admin_id);

    // Send notifications to network admin
    var notificationOptions = {
        userId: admin._id,
        type: notificationType,
        typeData: {
            pending_upper: {
                _id: pendingUpper._id,
                name: pendingUpper.profile.name,
                image: pendingUpper.profile.image
            },
            network: {
                _id: network._id,
                name: network.name,
                image: network.image,
                slug: network.slug + '/settings/requests'
            }
        }
    };

    Partup.server.services.notifications.send(notificationOptions);

    // Set the email details
    var emailOptions = {
        type: notificationType,
        toAddress: User(admin).getEmail(),
        subject: pendingUpper.profile.name + ' is asking for permission to join tribe ' + network.name,
        locale: User(admin).getLocale(),
        typeData: {
            name: User(admin).getFirstname(),
            pendingUpperName: pendingUpper.profile.name,
            networkName: network.name,
            url: Meteor.absoluteUrl() + network.slug + '/settings/requests',
            unsubscribeOneUrl: Meteor.absoluteUrl() + 'unsubscribe-email-one/' + notificationType + '/' + admin.profile.settings.unsubscribe_email_token,
            unsubscribeAllUrl: Meteor.absoluteUrl() + 'unsubscribe-email-all/' + admin.profile.settings.unsubscribe_email_token
        },
        userEmailPreferences: admin.profile.settings.email
    };

    // Send the email
    Partup.server.services.emails.send(emailOptions);
});
