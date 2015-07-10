/**
 * Log every event fired by the application including it's arguments
 */
Event.onAny(function() {
    if (process.env.LOG_EVENTS) {
        Log.debug('Event fired: '.white + this.event.magenta, arguments);
    }
});

