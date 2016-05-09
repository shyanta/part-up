var apn = Npm.require('apn'); // Apple Push Notification
var gcm = Npm.require('gcm').GCM; // Google Cloud Messagings

// Bring up connection with APN
var apnConnection;
Meteor.startup(function() {
    apnConnection = new apn.Connection({
        // cert: process.env.
        // ...
    });
});

/**
 @namespace Partup server app notifications service
 @name Partup.server.services.app_notifications
 @memberof Partup.server.services
 */
Partup.server.services.app_notifications = {

    /**
     * Send app notifications to all mobile phones of a set of users
     *
     * @param userIds {Array} - users you want to deliver the notification to
     * @param filterDevices {Function} - optional filter function for devices (first arg is `device`, second arg is `user`)
     */
    send: function(userIds, filterDevices, message, payload) {
        userIds.forEach(function(id) {
            var user = Meteor.users.findOne(id);
            check(user, Object);

            var devices = (user.push_notification_devices || [])
                .filter(function(device) {
                    if (!filterDevices) return true;
                    return filterDevices(device, user);
                });

            if (devices.length > 0) {
                var badgeCount = User(user).calculateApplicationIconBadgeNumber();

                devices.forEach(function(device) {
                    if (device.platform === 'ios') {
                        // TODO: interface with APN to send notification and update icon badge number
                        // apn;
                    } else if (device.platform === 'android') {
                        // TODO: interface with GCM to send notification and update icon badge number
                        // gcm;
                    }
                });
            }
        });
    }

};
