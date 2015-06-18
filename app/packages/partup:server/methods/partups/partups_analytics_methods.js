Meteor.methods({

    /**
     * Register a click on a Partup
     *
     * @param {string} partupId
     */
    'partups.analytics.click': function(partupId) {
        var partup = Partups.findOneOrFail(partupId);
        var hour = (new Date).getHours();

        var ip = this.connection.clientAddress;
        var last_ip = mout.object.get(partup, 'analytics.last_ip');

        if (ip === last_ip) return;

        var clicks_per_hour = mout.object.get(partup, 'analytics.clicks_per_hour') || (new Array(25).join('0').split('').map(parseFloat));
        var clicks_total = mout.object.get(partup, 'analytics.clicks_total') || 0;
        var clicks_per_day = mout.object.get(partup, 'analytics.clicks_per_day') || 0;

        clicks_per_hour[hour] = parseInt(clicks_per_hour[hour] + 1);
        clicks_total++;
        clicks_per_day++;

        Partups.update({_id: partupId}, {$set: {
            'analytics.clicks_total': clicks_total,
            'analytics.clicks_per_day': clicks_per_day,
            'analytics.clicks_per_hour': clicks_per_hour,
            'analytics.last_ip': ip
        }});
    }

});
