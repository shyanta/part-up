/**
 * Helpers for scroll behaviour
 *
 * @memberOf Partup.client
 */
Partup.client.scroll = {
    /**
     * Helper to increment a reactive number variable
     *
     * @memberOf Partup.client.scroll
     * @param {Object} debounce(ms), offset(px), autorunTemplate(template, if not given, autorun is done with Tracker)
     * @param {Function} what to run when the bottom offset is reached
     */
    onBottomOffset: function(options, callBack) {
        var autorunner = options.autorunTemplate || Tracker;
        var debounce = options.debounce || false;
        var offset = options.offset || 1;

        var trigger = function() {
            callBack();
        };
        var debouncedTrigger = lodash.debounce(trigger, debounce, true);

        autorunner.autorun(function(computation) {
            var bottom = Session.get('window.scrollBottomOffset');
            if (!computation.firstRun && bottom < offset) {
                Tracker.nonreactive(function() {
                    if (debounce) {
                        debouncedTrigger();
                    } else {
                        trigger();
                    }
                });
            }
        });
    }
};
