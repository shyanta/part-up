/**
 * isMobile namespace
 *
 * @class updates
 * @memberof Partup.client
 */
Partup.client.isMobile = {
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    any: function() {
        return (Partup.client.isMobile.Android() || Partup.client.isMobile.BlackBerry() || Partup.client.isMobile.iOS() || Partup.client.isMobile.Windows());
    }
};
