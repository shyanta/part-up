if (process.env.PARTUP_CRON_ENABLED && process.env.PUSH_APPLE_APN_PFX) {
    var apn = Npm.require('apn');

    var feedback = new apn.Feedback({
        pfx: new Buffer(process.env.PUSH_APPLE_APN_PFX, 'base64'),
        batchFeedback: true,
        interval: Partup.constants.PUSH_APPLE_APN_CLEANUP_INTERVAL
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
