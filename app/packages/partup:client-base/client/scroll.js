/**
 * Helpers for scroll behaviour
 *
 * @class scroll
 * @memberof Partup.client
 */
var INFINITE_SCROLL_OFFSET = 800;

Partup.client.scroll = {

    /**
     * Current scroll position reactive var
     *
     * @memberof Partup.client.scroll
     */
    pos: new ReactiveVar(0),

    /**
     * Infinite scroll functionality
     *
     * @memberof Partup.client.scroll
     * @param options {Object}           Options for the infinite scroll
     * @param options.template {Blaze}   A template where the infinite scroll runs in
     * @param options.element  {Element} The container element (growing when content increases)
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
    },

    /**
     * Check if an element is in view
     *
     * @memberof Partup.client.scroll
     * @param element  {Element}
     * @returns inView {Boolean} Whether the given element is in view
     */
    inView: function(element) {
        if (!element) return false;

        // Call the this.pos.get() function to make this function reactive
        this.pos.get();

        // Get element and window positions
        var element_pos = element.getBoundingClientRect().top;
        var window_height = window.innerHeight;

        // Return whether the element is in viewport
        return element_pos > 0 && element_pos < window_height;
    }
};

Meteor.startup(function() {

    // Turn current scroll position into a reactive variable
    jQuery(window).on('scroll', function() {
        Partup.client.scroll.pos.set(window.scrollY);
    });

});
