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
    active: new ReactiveVar(false),

    // callbacks
    onConfirm: function() {
        if (this.confirmCallback) this.confirmCallback();
        this.dismiss();
    },
    onCancel: function() {
        if (this.cancelCallback) this.cancelCallback();
        this.dismiss();
    },

    // methods
    confirm: function(options) {
        if (options.title)          this.title.set(options.title);
        if (options.message)        this.message.set(options.message);
        if (options.confirmButton)    this.confirmButton.set(options.confirmButton);
        if (options.cancelButton)     this.cancelButton.set(options.cancelButton);
        this.confirmCallback = options.onConfirm || false;
        this.cancelCallback = options.onCancel || false;
        this.active.set(true);
    },

    dismiss: function() {
        this.active.set(false);
    },

    reset: function() {
        this.title.set(this.TITLE_DEFAULT);
        this.message.set(this.MESSAGE_DEFAULT);
        this.confirmButton.set(this.CONFIRM_TEXT_DEFAULT);
        this.cancelButton.set(this.CANCEL_TEXT_DEFAULT);
        this.cancelCallback = false;
        this.confirmCallback = false;
    }
};
