/**
 * Helpers for scroll behaviour
 *
 * @memberOf Partup.client
 */
var INFINITE_SCROLL_OFFSET = 300;

Partup.client.scroll = {

    /**
     * Current scroll position reactive var
     *
     * @memberOf Partup.client.scroll
     */
    pos: new ReactiveVar(0),

    /**
     * Infinite scroll functionality
     *
     * @memberOf Partup.client.scroll
     * @param options {Object}           Options for the infinite scroll
     * @param options.template {Blaze}   A template where the infinite scroll runs in
     * @param options.element  {Element} The container element (which is growing when content increases)
     * @param callback {Function}        Infinite scroll callback
     */
    infinite: function(options, callback) {
        options = options || {};
        options.offset = options.offset || INFINITE_SCROLL_OFFSET;
        if (!options.template) return;
        if (!options.element) return;

        var trigger = function() {
            var bottomInView = options.element.getBoundingClientRect().bottom - window.innerHeight;
            if (bottomInView < INFINITE_SCROLL_OFFSET) {
                callback();
            }
        };

        options.template.autorun(function() {
            var scrollPos = Partup.client.scroll.pos.get();
            Tracker.nonreactive(trigger);
        });
    },

    /**
     * Helper to increment a reactive number variable
     *
     * @memberOf Partup.client.scroll
     * @param {Object} debounce(ms), offset(px), autorunTemplate(template, if not given, autorun is done with Tracker)
     * @param {Function} what to run when the bottom offset is reached
     */
    onBottomOffset: function(options, callback) {
        var autorunner = options.autorunTemplate || Tracker;
        var offset = options.offset || 1;

        autorunner.autorun(function(computation) {
            var bottom = Session.get('window.scrollBottomOffset');
            if (bottom < offset) {
                Tracker.nonreactive(callback);
            }
        });
    }
};

Meteor.startup(function() {

    // Turn current scroll position into a reactive variable
    $(window).on('scroll', function() {
        Partup.client.scroll.pos.set(window.scrollY);
    });

});
