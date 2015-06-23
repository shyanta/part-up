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
            Partup.client.scroll.pos.get();
            Tracker.nonreactive(trigger);
        });
    }
};

Meteor.startup(function() {

    // Turn current scroll position into a reactive variable
    jQuery(window).on('scroll', function() {
        Partup.client.scroll.pos.set(window.scrollY);
    });

});
