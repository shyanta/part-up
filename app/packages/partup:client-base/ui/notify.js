if (toastr && jQuery) {
    Partup.ui.notify = {};

    // Wrapper for Toastr
    Partup.ui.notify.info = function notifyInfo(msg) {
        toastr.info(msg);
    };

    Partup.ui.notify.warning = function notifyWarning(msg) {
        toastr.warning(msg);
    };

    Partup.ui.notify.success = function notifySuccess(msg) {
        toastr.success(msg);
    };

    Partup.ui.notify.error = function notifyError(msg) {
        toastr.error(msg);
    };

    Partup.ui.notify.iInfo = function notifyInternationalInfo(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(TAPi18nKey, TAPi18nOptions);
        this.warning(msg);
    };

    Partup.ui.notify.iWarning = function notifyInternationalWarning(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(TAPi18nKey, TAPi18nOptions);
        this.warning(msg);
    };

    Partup.ui.notify.iSuccess = function notifyInternationalSuccess(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(iKey, iOptions);
        this.success(msg);
    };

    Partup.ui.notify.iError = function notifyInternationalError(iKey, iOptions) {
        if (!iKey) return '';
        var msg = TAPi18n.__(iKey, iOptions);
        this.error(msg);
    };

    Partup.ui.notify.clear = function notifyClear() {
        toastr.clear();
    };

    // Toastr configuration
    toastr.options.tapToDismiss = false;
    toastr.options.timeOut = 3500;
    toastr.options.containerId = 'pu-notifycontainer';
    toastr.options.toastClass = 'pu-toast';
    toastr.options.iconClasses = {
        error: 'pu-toast-error',
        info: 'pu-toast-info',
        success: 'pu-toast-success',
        warning: 'pu-toast-warning'
    };
    toastr.options.iconClass = 'pu-sub-icon';
    toastr.options.positionClass = '';
    toastr.options.titleClass = 'pu-sub-title';
    toastr.options.messageClass = 'pu-sub-message';
    toastr.options.target = '.pu-app, .pu-modal';
    toastr.options.newestOnTop = true;
    toastr.options.preventDuplicates = false;
    toastr.options.progressBar = false;
    toastr.options.closeHtml = '';
    toastr.options.showMethod = 'puNotifyIn';
    toastr.options.hideMethod = 'puNotifyOut';
    toastr.options.showDuration = 600;
    toastr.options.hideDuration = 600;

    // Extend jQuery with out notification animation
    jQuery.fn.extend({
        puNotifyIn: function() {
            return this.each(function() {
                var $elm = jQuery(this);
                $elm.show(0);
                $elm.addClass('pu-state-show');
                setTimeout(function puNotifyInCompleted () {
                    $elm.addClass('pu-state-shown');
                }, toastr.options.showDuration);
            });
        },
        puNotifyOut: function(options) {
            return this.each(function() {
                var $elm = jQuery(this);
                $elm.removeClass('pu-state-show');
                setTimeout(function puNotifyOutCompleted () {
                    $elm.hide(0);
                    options.complete();
                }, toastr.options.hideDuration);
            });
        }
    });

}