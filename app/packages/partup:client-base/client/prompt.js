/**
 * Prompt namespace, it's meant for confirmation alerts etc.
 *
 * @class prompt
 * @memberof Partup.client
 */
Partup.client.prompt = {
    // constants/default values
    TITLE_DEFAULT: 'Alert',
    MESSAGE_DEFAULT: 'Are you shure?',
    CONFIRM_TEXT_DEFAULT: 'Ok',
    CANCEL_TEXT_DEFAULT: 'Cancel',

    // reactive values
    title: new ReactiveVar(this.TITLE_DEFAULT),
    message: new ReactiveVar(this.MESSAGE_DEFAULT),
    confirmButton: new ReactiveVar(this.CONFIRM_TEXT_DEFAULT),
    cancelButton: new ReactiveVar(this.CANCEL_TEXT_DEFAULT),
    _active: new ReactiveVar(false),

    /**
     * Confirm hook, is called when the confirm button is clicked
     *
     * @memberof Partup.client.prompt
     */
    onConfirm: function() {
        if (this.confirmCallback) this.confirmCallback();
        this._dismiss();
    },

    /**
     * Cancel hook, is called when the cancel button is clicked
     *
     * @memberof Partup.client.prompt
     */
    onCancel: function() {
        if (this.cancelCallback) this.cancelCallback();
        this._dismiss();
    },

    /**
     * Call confirmation prompt with options
     *
     * @memberof Partup.client.prompt
     * @param {Object} options
     * @param {String} options.title            prompt title text
     * @param {String} options.message          prompt message text
     * @param {String} options.confirmButton    confirm button text
     * @param {String} options.cancelButton     cancel button text
     * @param {Function} options.onConfirm      confirm button click hook
     * @param {Function} options.onCancel       cancel button click hook
     */
    confirm: function(options) {
        if (options.title)          this.title.set(options.title);
        if (options.message)        this.message.set(options.message);
        if (options.confirmButton)  this.confirmButton.set(options.confirmButton);
        if (options.cancelButton)   this.cancelButton.set(options.cancelButton);
        this.confirmCallback = options.onConfirm || false;
        this.cancelCallback = options.onCancel || false;
        this._active.set(true);
    },

    // is called when the prompt is destroyed
    _dismiss: function() {
        this._active.set(false);
    },

    // resets all values to default
    _reset: function() {
        this.title.set(this.TITLE_DEFAULT);
        this.message.set(this.MESSAGE_DEFAULT);
        this.confirmButton.set(this.CONFIRM_TEXT_DEFAULT);
        this.cancelButton.set(this.CANCEL_TEXT_DEFAULT);
        this.cancelCallback = false;
        this.confirmCallback = false;
    }
};
