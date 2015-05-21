/**
 *
 * Guide to use the intent correctly
 *
 * Use this service when you want to perform a route change with an intention.
 * For example, when the user wants to access restricted content and has to login first.
 * 
 * Flow:
 * - Call Partup.ui.intent.open(); (for arguments, scroll down)
 * - The intent callback function you provided, will be kept in memory until the user refreshes the page.
 * - Call Partup.ui.intent.executeIntentCallback(); (for arguments, scroll down)
 *     when you want the intent callback to be executed.
 *     (for example: when the user has logged in successfully)
 *     When no intentCallback exists and no fallbackCallback is provided, the _defaultIntentCallback will be executed.
 *
 */

var _defaultIntentCallback = function () {
    Router.go('home');
};

var _intentCallbacks = {};

Partup.ui.intent = {

    /**
     * Settings for modal animation when a modal is in the game
     *
     * @memberOf partup.ui
     * @param {Number} open animation duration
     * @param {Number} close animation duration
     */
    settings: {
        openAnimationDuration: 400,
        closeAnimationDuration: 400
    },

    /**
     * Execute default callback
     *
     * @memberOf partup.ui
     * @param {Object} arguments to pass to the callback
     */
    executeDefaultCallback: function(args) {
        var args = args || {};
        _defaultIntentCallback(args);
    },

    /**
     * Execute intent callback for route
     *
     * @memberOf partup.ui
     * @param {String} original name of the route the page was opened with
     * @param {Array} arguments to pass to the callback
     * @param {Function} custom fallback callback
     */
    executeIntentCallback: function(route, arguments, customFallback) {
        var cb = _intentCallbacks[route],
            arguments = arguments || {};

        if(mout.lang.isFunction(cb)) {
            cb.apply(window, arguments);
        } else {
            if(mout.lang.isFunction(customFallback)) {
                customFallback.apply(window, arguments);
            } else {
                _defaultIntentCallback.apply(window, arguments);
            }
        }

        delete _intentCallbacks[route];
    },

    /**
     * Go with intent
     *
     * @memberOf partup.ui
     * @param {Object} arguments for Router.go() (path, params and options)
     * @param {Function} callback
     */
    go: function(args, callback) {
        if(!args || !args.route) return console.warn('Partup.ui.intent.open: please provide a route');

        // Save intent callback
        if(typeof callback === 'function') {
            _intentCallbacks[args.route] = callback;
        }

        // Perform router.go
        Router.go(args.route, args.params, args.options);

    }

};
