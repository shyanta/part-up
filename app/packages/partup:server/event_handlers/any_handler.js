/**
 * Log every event fired by the application including it's arguments
 */
Event.onAny(function() {
    Log.debug('Event fired: '.white + this.event.magenta, arguments);
});

