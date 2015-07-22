/**
 * Helpers for scroll behaviour
 *
 * @class scroll
 * @memberof Partup.client
 */
var INFINITE_SCROLL_OFFSET = 2000;
var INFINITE_SCROLL_DEBOUNCE = 40;
var SCROLLING_ELEMENT_SELECTOR = '.pu-main';

Partup.client.scroll = {

    _element: null,
    _initialised: false,
    init: function(element) {
        if (Partup.client.scroll._initialised) return console.warn('scroll.js: cannot initialise multiple times');

        Partup.client.scroll._initialised = true;
        Partup.client.scroll._element = element;

        // Debounced update function
        var d = lodash.debounce(Partup.client.scroll.triggerUpdate, 10);

        // Trigger a scroll update when the user scrolls
        $(Partup.client.scroll._element).on('scroll', d);

        // Trigger a scroll update when every template is being rendered
        Template.onRendered(function() {
            Meteor.defer(d);
        });

        // Force mousewheel movement to scroll _element
        var scroller = this._element;
        var _checkedWith = null;
        var _isPrevented = false;
        $(scroller).on('mousewheel', function(e) {
            var isSame = _checkedWith === e.target;
            _isPrevented = _isPrevented && isSame || !isSame && Partup.client.elements.checkIfElementIsBelow(e.target, '.pu-js-preventmainscroll');
            _checkedWith = e.target;
            if (_isPrevented) return;

            scroller.scrollTop += e.deltaY || e.originalEvent.deltaY;
            _isPrevented = false;
        });
    },

    /**
     * Current scroll position reactive var
     *
     * @memberof Partup.client.scroll
     */
    pos: new ReactiveVar(0),

    /**
     * Current maxscroll
     *
     * @memberof Partup.client.scroll
     */
    maxScroll: function() {
        if (!this._element) return 0;

        return this._element.scrollHeight - this._element.clientHeight;
    },

    /**
     * Trigger a scroll pos update
     *
     * @memberof Partup.client.scroll
     */
    triggerUpdate: function() {
        if (!Partup.client.scroll._element) return;

        Partup.client.scroll.pos.set(Partup.client.scroll._element.scrollTop);
        Partup.client.scroll.pos.dep.changed();
    },

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

        var trigger = function(pos) {
            if (!Partup.client.scroll._element) return;

            var bottomPosition = options.element.getBoundingClientRect().bottom;
            var bottomInView = bottomPosition - Partup.client.scroll._element.clientHeight;
            if (bottomInView < INFINITE_SCROLL_OFFSET) {
                if (!options.template.view.isDestroyed) callback();
            }
        };
        var debounced_trigger = lodash.debounce(trigger, INFINITE_SCROLL_DEBOUNCE);

        options.template.autorun(function() {
            Partup.client.scroll.pos.get();
            Tracker.nonreactive(debounced_trigger);
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
        if (!Partup.client.scroll._element) return false;

        // Call the this.pos.get() function to make this function reactive
        this.pos.get();

        // Return whether the element is in viewport
        return element.offsetTop >= 0 && element.offsetTop + element.clientHeight <= this._element.clientHeight;
    },

    /**
     * Scroll to an element with optional offset
     *
     * @memberof Partup.client.scroll
     * @param element  {Element}
     * @param offset   {Number}
     * @param options  {Object}
     * @param options.duration {Number} Scroll animation duration. Defaults to zero for no animation.
     * @param options.callback {Function} Getting called when the animation ends.
     */
    to: function(element, offset, options) {
        element = element || null;
        offset = offset || 0;
        options = options || {};

        // Options
        var duration = options.duration || 0;
        var callback = typeof options.callback === 'function' ? options.callback : undefined;

        // Calculate position
        var position = 0;
        if (element) position += element.offsetTop || 0;
        position += offset;

        // Limit position
        position = Math.min(position, this.maxScroll());

        // Trigger scroll
        $(this._element).animate({
            scrollTop: position
        }, duration, 'swing', function() {
            if (callback) callback.apply(window);
        });
    }
};
