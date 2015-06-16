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

        // Save intent callback
        if (typeof callback === 'function') {
            _intentCallbacks[args.route] = callback;
        } else {
            var currentRoute = Router.current();
            var routeName = currentRoute.route.getName();
            var routeParams = currentRoute.params;
            var routeOptions = currentRoute.route.options;

            _intentCallbacks[args.route] = function() {
                Router.go(routeName, routeParams, routeOptions);
            };
        }

        // Perform router.go
        Router.go(args.route, args.params, args.options);

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
     * Execute intent callback for route
     *
     * @memberOf Partup.client
     * @param {String} original name of the route the page was opened with
     * @param {Array} arguments to pass to the callback
     * @param {Function} custom fallback callback
     */
    executeIntentCallback: function(route, arguments, customFallback) {
        var cb = _intentCallbacks[route];
        var arguments = arguments || {};

        if (mout.lang.isFunction(cb)) {
            cb.apply(window, arguments);
        } else {
            if (mout.lang.isFunction(customFallback)) {
                customFallback.apply(window, arguments);
            } else {
                _defaultIntentCallback.apply(window, arguments);
            }
        }

        delete _intentCallbacks[route];
    }

};
