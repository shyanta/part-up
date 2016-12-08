Partup.client.browser = {
    isIE: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            return true;
        }

        if (/Edge/.test(navigator.userAgent)) {
            // this is Microsoft Edge
            return true;
        }

        return false;
    },

    msieversion: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');

        if (msie > 0) {// If Internet Explorer, return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
        } else {// If another browser, return 0
            return 0;
        }

    },

    isSafari: function() {
        var ua = window.navigator.userAgent;

        var is_chrome = ua.indexOf('Chrome') > -1;
        var is_safari = ua.indexOf('Safari') > -1;

        // Chrome has both "Chrome" and "Safari" in the string.
        // Safari only has "Safari".
        if (is_chrome && is_safari) {
            is_safari = false;
        }

        return is_safari;
    },
    isChromeOrSafari: function() {
        var ua = window.navigator.userAgent;

        var is_chrome = ua.indexOf('Chrome') > -1;
        var is_safari = ua.indexOf('Safari') > -1;

        // Chrome has both "Chrome" and "Safari" in the string.
        // Safari only has "Safari".
        if (is_chrome && is_safari) {
            is_safari = false;
        }

        return is_safari;
    },

    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return 'windows-phone';
        }

        if (/android/i.test(userAgent)) {
            return 'android';
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'ios';
        }

        return undefined;
    }
};
