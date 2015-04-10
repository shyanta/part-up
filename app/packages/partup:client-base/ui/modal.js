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
     * @param {String} key of callback
     * @param {Object} arguments to pass to the callback
     * @param {Function} custom fallback callback
     */
    executeIntentCallback: function(key, args, customFallback) {
        var cb = _intentCallbacks[key],
            args = args || {};
        if(typeof cb === 'function') {
            cb(args);
        } else {
            if(typeof customFallback === 'function') {
                customFallback(args);
            } else {
                _defaultIntentCallback(args);
            }
        }

        delete _intentCallbacks[key];
    },

    /**
     * Modal open
     *
     * @memberOf partup.ui
     * @param {Array} arguments for Router.go()
     * @param {String} key for callback
     * @param {Function} callback
     */
    open: function(routerGoArguments, intentKey, intentCallback) {

        // Save intent callback
        _intentCallbacks[intentKey] = intentCallback;

        // Router GO
        var path = routerGoArguments[0];
        if(!path) return false;
        var params = routerGoArguments[1] || {};
        var options = routerGoArguments[2] || {};
        Router.go(path, params, options);

    }

};
