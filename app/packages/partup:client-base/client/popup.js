/**
 * Service to open a popup
 *
 * @class popup
 * @memberof Partup.client
 *
 * @example
 * {{#if partupIsPopupActive 'new_message'}}
 *   {{#contentFor 'PopupTitle'}}New message{{/contentFor}}
 *   {{#contentFor 'PopupContent'}}
 *     {{> My Template}}
 *   {{/contentFor}}
 * {{/if}}
 *
 */
Partup.client.popup = {

    /**
     * ReactiveVar which holds the id of the current popup.
     * If no popup is opened, the value will be null.
     *
     * @var {ReactiveVar} current
     * @memberof Partup.client.popup
     */
    current: new ReactiveVar(),

    /**
     * Open a popup
     *
     * @param {String} id   The identifier for your popup
     * @param {Function} callback   A popup-close callback
     * @memberof Partup.client.popup
     */
    open: function(id, callback) {
        if (!id || !mout.lang.isString(id)) throw 'id must be a string';

        // Open popup
        this.current.set(id);

        // Add class to body
        $('body').addClass('pu-state-popupopen');

        // Save callback
        if (callback) {
            if (!mout.lang.isFunction(callback)) throw 'callback must be a function';
            this._closeCallback = callback;
        }
    },

    /**
     * Close the current popup
     *
     * @param Arguments you want to pass to the callback to optionally passed with `open()`
     * @memberof Partup.client.popup
     */
    close: function() {
        // Get current popup
        var current = this.current.curValue;
        if (!current) throw '[Partup.client.popup.close] No current popup found';

        // Close popup
        this.current.set(null);

        // Remove class to body
        $('body').removeClass('pu-state-popupopen');

        // Save callback
        var callback = this._closeCallback;

        // Delete callback before executing, because otherwise you should not be able
        // to open a new popup within the callback
        this._closeCallback = null;

        // Execute callback
        if (mout.lang.isFunction(callback)) {
            callback.apply(window, arguments);
        }
    },

    /**
     * Close the current popup
     *
     * @param Arguments you want to pass to the callback to optionally passed with `open()`
     * @memberof Partup.client.popup
     *
     */
    _closeCallback: null
};
