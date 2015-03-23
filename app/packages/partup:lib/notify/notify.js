if (Meteor.isClient && toastr) {

    // Wrapper for Toastr
    Partup.notify.info = function notifyInfo(msg) {
        toastr.info(msg);
    };

    Partup.notify.iInfo = function notifyInternationalInfo(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(TAPi18nKey, TAPi18nOptions);
        this.warning(msg);
    };

    Partup.notify.warning = function notifyWarning(msg) {
        toastr.warning(msg);
    };

    Partup.notify.iWarning = function notifyInternationalWarning(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(TAPi18nKey, TAPi18nOptions);
        this.warning(msg);
    };

    Partup.notify.success = function notifySuccess(msg) {
        toastr.success(msg);
    };

    Partup.notify.iSuccess = function notifyInternationalSuccess(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(iKey, iOptions);
        this.success(msg);
    };

    Partup.notify.error = function notifyError(msg) {
        toastr.error(msg);
    };

    Partup.notify.iError = function notifyInternationalError(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(iKey, iOptions);
        this.error(msg);
    };

    Partup.notify.clear = function notifyClear() {
        toastr.clear();
    };

}