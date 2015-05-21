/**
 *
 * Guide to use the modal correctly
 *
 * Use this modal when you want to perform a route change with an intention.
 * For example, when the user wants to access restricted content and has to login first.
 * 
 * Flow:
 * - Call Partup.ui.modal.open(); (for arguments, scroll down)
 * - The intent callback function you provided, will be kept in memory until the user refreshes the page.
 * - Call Partup.ui.modal.executeIntentCallback(); (for arguments, scroll down)
 *     when you want the intent callback to be executed.
 *     (for example: when the user has logged in successfully)
 *     When no intentCallback exists and no fallbackCallback is provided, the _defaultIntentCallback will be executed.
 *
 */

var _defaultIntentCallback = function () {
    Router.go('home');
};

var _intentCallbacks = {};

Partup.ui.modal = {

    /**
     * Settings for modal animation
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
     * @param {String} original name of the route the modal was opened with
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
     * Modal open
     *
     * @memberOf partup.ui
     * @param {Object} arguments for Router.go() (path, params and options)
     * @param {Function} callback
     */
    open: function(args, callback) {
        if(!args || !args.route) return console.warn('Partup.ui.modal.open: please provide a route');

        // Save intent callback
        if(typeof callback === 'function') {
            _intentCallbacks[args.route] = callback;
        }

        // Perform router.go
        Router.go(args.route, args.params, args.options);

    }

};
