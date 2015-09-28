var d = Debug('event_handlers');

/**
 * Log every event fired by the application including it's arguments
 */
Event.onAny(function() {
    d('Event fired', this.event);

    if (process.env.LOG_EVENTS) {
        Log.debug('Event fired: '.white + this.event.magenta, arguments);
    }

    if (process.env.EVENT_ENDPOINT_URL && process.env.EVENT_ENDPOINT_AUTHORIZATION) {
        var data = {
            'timestamp': new Date().toISOString(),
            'eventname': this.event,
            'payload': arguments
        };
        HTTP.post(process.env.EVENT_ENDPOINT_URL, {
            data: data,
            headers: {
                'Authorization': 'Bearer ' + process.env.EVENT_ENDPOINT_AUTHORIZATION
            }
        }, function(err, result) {
            //silently ignore success or failure of posting to eventstore
        });
    }
});

