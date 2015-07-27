var d = Debug('event_handlers');

/**
 * Log every event fired by the application including it's arguments
 */
Event.onAny(function() {
    d('Event fired', this.event);

    if (process.env.LOG_EVENTS) {
        Log.debug('Event fired: '.white + this.event.magenta, arguments);
    }
});

