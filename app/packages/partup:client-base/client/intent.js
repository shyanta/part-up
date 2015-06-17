/**
 *
 * Guide to use the intent correctly
 *
 * Use this service when you want to perform a route change with an intention.
 * For example, when the user wants to access restricted content and has to login first.
 * Flow:
 * - Call Partup.client.intent.go(); (for arguments, scroll down)
 * - The intent callback function you provided, will be kept in memory until the user refreshes the page.
 * - Call Partup.client.intent.executeIntentCallback(); (for arguments, scroll down)
 *     when you want the intent callback to be executed.
 *     (for example: when the user has logged in successfully)
 *     When no intentCallback exists and no fallbackCallback is provided, the _defaultIntentCallback will be executed.
 *
 */

var _defaultIntentCallback = function() {
    Router.go('home');
};

var _origins = {};
var _intentCallbacks = {};

Partup.client.intent = {

    /**
     * Go with intent
     *
     * @memberOf Partup.client
     * @param {Object} arguments for Router.go() (path, params and options)
     * @param {Function} callback
     */
    go: function(args, callback) {
        if (!args || !args.route) return console.warn('Partup.client.intent.open: please provide a route');

        // Save origin
        _origins[args.route] = window.location.href.toString().split(window.location.host)[1];

        // Save intent callback
        if (typeof callback === 'function') {
            _intentCallbacks[args.route] = callback;
        }

        // Perform router.go
        Router.go(args.route, args.params);

    },

    /**
     * Go to origin
     *
     * @memberOf Partup.client
     */
    goToOrigin: function(route) {
        var origin = _origins[route];
        if (origin) {
            Iron.Location.go(origin);
        } else {
            _defaultIntentCallback();
        }
    },

    /**
     * Execute default callback
     *
     * @memberOf Partup.client
     * @param {Object} arguments to pass to the callback
     */
    executeDefaultCallback: function(args) {
        var args = args || {};
        _defaultIntentCallback(args);
    },

    /**
     * Execute intent callback for route (the priority is: original registered callback, custom fallback callback, go to original path, default intent callback)
     *
     * @memberOf Partup.client
     * @param {String} original name of the route the page was opened with
     * @param {Array} arguments to pass to the callback
     * @param {Function} custom fallback callback
     */
    executeIntentCallback: function(route, arguments, customFallback) {
        var cb = _intentCallbacks[route];
        var origin = _origins[route];
        var arguments = arguments || {};

        if (mout.lang.isFunction(cb)) {
            cb.apply(window, arguments);
        } else if (mout.lang.isFunction(customFallback)) {
            customFallback.apply(window, arguments);
        } else if (origin) {
            Iron.Location.go(origin);
        } else {
            _defaultIntentCallback.apply(window, arguments);
        }

        delete _intentCallbacks[route];
    }

};
