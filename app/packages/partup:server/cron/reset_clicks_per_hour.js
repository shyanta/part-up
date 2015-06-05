SyncedCron.add({
    name: 'Reset the clicks per hour on partups',
    schedule: function(parser) {
        return parser.text('every hour starting on the 2nd minute');
    },
    job: function() {
        var hour = (new Date).getHours();

        var data = {};
        data['analytics.clicks_per_hour.' + hour] = 0;

        Partups.update({}, {$set: data}, {multi: true});
    }
});
