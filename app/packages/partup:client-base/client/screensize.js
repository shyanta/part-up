/**
 * Reactive screensize source
 *
 * @class screensize
 * @memberof Partup.client
 */

Partup.client.screensize = {

    _initialised: false,
    init: function() {
        if (Partup.client.screensize._initialised) return console.warn('screensize.js: cannot initialise multiple times');

        Partup.client.screensize._initialised = true;

        // Debounced update function
        var d = lodash.debounce(Partup.client.screensize.triggerUpdate, 10);

        // Trigger a screensize update when the user resizes the screen
        $(window).on('resize orientationchange', d);

        // First call, once
        Meteor.defer(d);
    },

    /**
     * Current screensize reactive dict
     *
     * @memberof Partup.client.screensize
     */
    current: new ReactiveDict(),

    /**
     * Trigger a screensize update
     *
     * @memberof Partup.client.screensize
     */
    triggerUpdate: function() {
        Partup.client.screensize.current.set('width', window.innerWidth);
        Partup.client.screensize.current.set('height', window.innerHeight);

        lodash.each(Partup.client.screensize.current.keyDeps, function(dep) {
            dep.changed();
        });
    }
};

Meteor.startup(function() {
    jQuery(document).ready(Partup.client.screensize.init);
});
