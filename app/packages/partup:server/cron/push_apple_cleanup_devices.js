if (process.env.PARTUP_CRON_ENABLED && process.env.PUSH_APPLE_APN_PFX) {
    var apn = Npm.require('apn');

    var feedback = new apn.Feedback({
        pfx: process.env.PUSH_APPLE_APN_PFX,
        batchFeedback: true,
        interval: process.env.PUSH_APPLE_APN_CLEANUP_INTERVAL || 5
    });

    feedback.on('feedback', Meteor.bindEnvironment(function(devices) {
        var ids = devices.map(function(item) {
            return item.device.token.toString('hex');
        });

        Meteor.users.update({
            'push_notification_devices.registration_id': {$in: ids}
        }, {
            $pull: {
                'push_notification_devices': {
                    registration_id: {$in: ids}
                }
            }
        });
    }));
}
