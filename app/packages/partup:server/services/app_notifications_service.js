var apn = Npm.require('apn'); // Apple Push Notification
var gcm = Npm.require('gcm'); // Google Cloud Messaging

var sendApnNotification, sendGcmNotification;

Meteor.startup(function() {

    /**
     * Apple Push Notification
     */
    var apnConnection = new apn.Connection({
        pfx: process.env.PUSH_APPLE_APN_PFX,
        production: true
    });

    sendApnNotification = function(device, user, message, payload, badge, collapseKey) {
        var apnDevice = new apn.Device(device.registration_id);
        var note = new apn.Notification();

        note.badge = badge;
        note.alert = message;
        note.payload = payload;

        apnConnection.pushNotification(note, apnDevice);
    };

    /**
     * Google Cloud Messaging
     */
    // var gcmConnection = new gcm.GCM(
    //     process.env.PUSH_GOOGLE_GCM_API || ''
    // );

    sendGcmNotification = function(device, user, message, payload, collapseKey) {
        var note = {
            registration_id: device.registration_id,
            collapse_key: collapseKey
        };

        forOwn(payload || {}, function(val, key){
            note['data.' + key] = val;
        });

        gcmConnection.send(note);
    };
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
     * @param message {String} - message of the notification
     * @param payload {Object} - payload for the app to receive on notification tap
     * @param collapseKey {String} - collapse notifications with the same collapseKey
     */
    send: function(userIds, filterDevices, message, payload, collapseKey) {
        userIds.forEach(function(id) {
            var user = Meteor.users.findOne(id);
            check(user, Object);

            var devices = (user.push_notification_devices || [])
                .filter(function(device) {
                    if (!filterDevices) return true;
                    return filterDevices(device, user);
                });

            if (devices.length > 0) {

                var badge;
                devices.forEach(function(device) {
                    if (device.platform === 'iOS') {
                        if (typeof badge === 'undefined') {
                            badge = User(user).calculateApplicationIconBadgeNumber();
                        }

                        sendApnNotification(device, user, message, payload, badge, collapseKey);
                    } else if (device.platform === 'Android') {
                        sendGcmNotification(device, user, message, payload, collapseKey);
                    }
                });
            }
        });
    }

};
