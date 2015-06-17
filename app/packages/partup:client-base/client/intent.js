/**
 *
 * Guide to use the intent correctly
 *
 * Use this service when you want to perform a route change with an intention.
 * For example, when the user wants to access restricted content and has to login first.
 * Flow:
 * - Call Partup.client.intent.go(); (for arguments, scroll down)
 * - The return callback you provided, will be kept in memory until the user refreshes the page.
 * - Call Partup.client.intent.return(); (for arguments, scroll down)
 *     when you want the return callback to be executed.
 *     (for example: when the user has logged in)
 *     When no return callback exists the system will fall back (see priority list below)
 *
 */

var _defaultReturn = function() {
    Router.go('home');
};

var _origins = {};
var _intentCallbacks = {};

/**
 * Intent system
 *
 * @memberOf Partup.client
 */
Partup.client.intent = {

    /**
     * Go with intent
     *
     * @memberOf Partup.client.intent
     * @param {Object} arguments for Router.go() (route and params)
     * @param {Function} callback
     */
    go: function(args, callback) {
        if (!args || !args.route) return console.warn('Partup.client.intent.go: please provide a route');

        // Save origin
        var path = window.location.href.toString().split(window.location.host)[1];
        _origins[args.route] = path;

        // Save intent callback
        if (typeof callback === 'function') {
            _intentCallbacks[args.route] = callback;
        }

        // Perform router.go
        Router.go(args.route, args.params);

    },

    /**
     * Function to return to original path (saved when intent.go was called)
     * For use in your own callbacks
     *
     * @memberOf Partup.client.intent
     */
    returnToOrigin: function(route) {
        var origin = _origins[route];
        if (origin) {
            Iron.Location.go(origin);
            delete origin;
        } else {
            _defaultReturn();
        }
    },

    /**
     * Execute intent callback for route
     * Priority of return execution:
     *  1. Original callback (when intent.go was called)
     *  2. Fallback callback (when return was called)
     *  3. Router.go to original path (saved when intent.go was called)
     *  4. _defaultReturn (as defined above)
     *
     * @memberOf Partup.client
     * @param {String} original name of the route the page was opened with
     * @param {Array} arguments to pass to the callback (which callback is called, is defined in de priority above)
     * @param {Function} fallback callback
     */
    return: function(route, arguments, fallbackCallback) {
        var cb = _intentCallbacks[route];
        var arguments = arguments || {};

        if (mout.lang.isFunction(cb)) {
            cb.apply(window, arguments);
            delete cb;
        } else if (mout.lang.isFunction(fallbackCallback)) {
            fallbackCallback.apply(window, arguments);
        } else {
            this.returnToOrigin(route);
        }
    }

};
